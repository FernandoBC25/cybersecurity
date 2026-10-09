const express = require('express');
const axios = require('axios');
const cron = require('node-cron');
const cors = require('cors');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'news.json');
const PROJECT_ROOT = path.join(__dirname, '..');

const sources = [
  {
    name: 'BleepingComputer',
    url: 'https://www.bleepingcomputer.com/feed/'
  },
  {
    name: 'The Hacker News',
    url: 'https://feeds.feedburner.com/TheHackersNews?format=xml'
  },
  {
    name: 'Krebs on Security',
    url: 'https://krebsonsecurity.com/feed/'
  }
];

const securityKeywords = [
  'cibersegurança',
  'cybersecurity',
  'segurança digital',
  'segurança da informação',
  'segurança da rede',
  'segurança em nuvem',
  'phishing',
  'ransomware',
  'malware',
  'vulnerabilidade',
  'zero-day',
  'ataque cibernético',
  'ataque cyber',
  'dados vazados',
  'data breach',
  'breach',
  'privacidade',
  'engenharia social',
  'ddos',
  'exploit',
  'botnet',
  'firewall',
  'endpoint',
  'cloud security',
  'segurança de rede',
  'segurança em aplicativos',
  'segurança de dados',
  'hackers',
  'cyber'
];

const excludedBroadTerms = [
  'educação digital',
  'tecnologia',
  'internet',
  'inteligência artificial',
  'ia',
  'ai',
  'automação',
  'escola',
  'aprendizagem'
];

const imageCatalog = {
  ciberseguranca: [
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80'
  ],
  educacao: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
  ],
  ia: [
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80'
  ],
  tecnologia: [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80'
  ],
  dados: [
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
  ],
  default: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
  ]
};

function pickImageForNews(text) {
  const normalized = (text || '').toLowerCase();

  if (normalized.includes('cibersegurança') || normalized.includes('segurança digital') || normalized.includes('phishing')) {
    return imageCatalog.ciberseguranca[Math.abs(normalized.length) % imageCatalog.ciberseguranca.length];
  }

  if (normalized.includes('educação') || normalized.includes('escola') || normalized.includes('aprendizagem')) {
    return imageCatalog.educacao[Math.abs(normalized.length) % imageCatalog.educacao.length];
  }

  if (normalized.includes('ia') || normalized.includes('inteligência artificial') || normalized.includes('ai')) {
    return imageCatalog.ia[Math.abs(normalized.length) % imageCatalog.ia.length];
  }

  if (normalized.includes('dados') || normalized.includes('privacidade')) {
    return imageCatalog.dados[Math.abs(normalized.length) % imageCatalog.dados.length];
  }

  if (normalized.includes('tecnologia') || normalized.includes('internet')) {
    return imageCatalog.tecnologia[Math.abs(normalized.length) % imageCatalog.tecnologia.length];
  }

  return imageCatalog.default[Math.abs(normalized.length) % imageCatalog.default.length];
}

app.use(cors());
app.use(express.static(PROJECT_ROOT));

function isRelevant(item) {
  const text = `${item.title || ''} ${item.description || ''}`.toLowerCase();
  const hasNoise = /(sugestão de reportagem|leia a íntegra|envie para o g1|mande para o g1|acesso ao final da reportagem|reportagem completa)/i.test(text);
  if (hasNoise) return false;

  const hasSecurityKeyword = securityKeywords.some(keyword => text.includes(keyword));
  if (!hasSecurityKeyword) return false;

  const hasBroadTechContent = excludedBroadTerms.some(keyword => text.includes(keyword)) && !hasSecurityKeyword;
  return !hasBroadTechContent;
}

function formatRssDate(rawDate) {
  const value = String(rawDate || '').trim();

  if (!value) {
    return new Date().toISOString();
  }

  const parsedDate = new Date(value);
  if (!Number.isNaN(parsedDate.getTime())) {
    return parsedDate.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  return value.replace(/\s+-\d{4}\b/g, '').trim();
}

function sanitizeText(text) {
  return String(text || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\b(?:Envie|Mande|Compartilhe|Enviar|Mande para|Envie para|Foto|Crédito|Reprodução|Fonte|tem alguma sugestão de reportagem|Tem alguma sugestão de reportagem|Sugestão de reportagem|sugestão de reportagem|Leia a íntegra|Leia a notícia completa|Leia a reportagem completa|Leia a íntegra ao final da reportagem|leia a íntegra ao final da reportagem|Acesse a íntegra|acesse a íntegra)\s*(?:para\s+o\s+)?(?:g1|globo|agência brasil|agencia brasil)?\s*[:;.-]?\s*/gi, ' ')
    .replace(/\b(?:g1|globo|agência brasil|agencia brasil)\b/gi, ' ')
    .replace(/\b(?:[A-Za-z0-9-]+\.)+(?:com|com\.br|org|net|gov|edu)(?:\/[A-Za-z0-9._\/-]+)?\b/gi, ' ')
    .replace(/\b[A-Z][a-z]+\s+[A-Z][a-z]+\/[A-Za-z0-9._-]+\b/g, ' ')
    .replace(/\(\s*\?\s*\)/g, '')
    .replace(/\?\s*\./g, '.')
    .replace(/\?\s*\?/g, '?')
    .replace(/\s*\?\s*$/g, '')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, ' ')
    .replace(/[\u2600-\u27BF\uFE0F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function translateText(text) {
  const original = String(text || '').trim();
  if (!original) return original;

  const chunks = [];
  let remaining = original;
  while (remaining.length > 1200) {
    let splitAt = remaining.lastIndexOf(' ', 1200);
    if (splitAt < 600) splitAt = remaining.indexOf(' ', 1200);
    if (splitAt < 0) splitAt = 1200;
    chunks.push(remaining.slice(0, splitAt).trim());
    remaining = remaining.slice(splitAt).trim();
  }
  if (remaining) chunks.push(remaining);

  const translatedChunks = [];
  for (const chunk of chunks) {
    const response = await axios.get('https://translate.googleapis.com/translate_a/single', {
      params: {
        client: 'gtx',
        sl: 'auto',
        tl: 'pt-BR',
        dt: 't',
        q: chunk
      },
      timeout: 20000
    });

    const translated = response.data?.[0]
      ?.map((segment) => segment[0])
      .filter(Boolean)
      .join('');

    if (!translated) throw new Error('A tradução retornou um texto vazio.');
    translatedChunks.push(translated);
  }

  return translatedChunks.join(' ')
    .replace(/\bviolações de dados\b/gi, match => match[0] === match[0].toUpperCase() ? 'Vazamentos de dados' : 'vazamentos de dados')
    .replace(/\bviolação de dados\b/gi, match => match[0] === match[0].toUpperCase() ? 'Vazamento de dados' : 'vazamento de dados')
    .replace(/\bregisto\b/gi, 'registro')
    .replace(/\bregistados\b/gi, 'registrados')
    .replace(/\bregistadas\b/gi, 'registradas')
    .replace(/\bregistada\b/gi, 'registrada')
    .replace(/\bregistado\b/gi, 'registrado')
    .replace(/\butilizadores\b/gi, 'usuários')
    .replace(/\butilizador\b/gi, 'usuário')
    .replace(/\bficheiros\b/gi, 'arquivos')
    .replace(/\bficheiro\b/gi, 'arquivo')
    .replace(/\btelemóvel\b/gi, 'celular')
    .replace(/\becrã\b/gi, 'tela');
}

async function fetchArticleContent(url, fallback) {
  const allowedHosts = [
    'bleepingcomputer.com',
    'www.bleepingcomputer.com',
    'thehackernews.com',
    'www.thehackernews.com',
    'krebsonsecurity.com',
    'www.krebsonsecurity.com'
  ];

  try {
    const parsedUrl = new URL(url);
    if (!allowedHosts.includes(parsedUrl.hostname)) return { content: fallback, fullText: false };

    const response = await axios.get(url, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml'
      }
    });
    const $ = cheerio.load(response.data);
    $('script, style, noscript, nav, footer, aside, form, button').remove();

    const articleBody = $('[itemprop="articleBody"], .articleBody, .article-body, .articlebody, #articlebody, .entry-content, .post-content').first();
    const paragraphs = articleBody.find('p')
      .filter((_, paragraph) => !$(paragraph).closest('.cz-related-article-wrapp, .related-article, .related-articles, .sponsored-content, .article-ad').length)
      .map((_, paragraph) => sanitizeText($(paragraph).text()))
      .get()
      .filter(paragraph => paragraph.length >= 35 && !/^(join|register|sign up|subscribe)\b/i.test(paragraph));
    const content = paragraphs.join('\n\n');

    return content.length >= 300
      ? { content, fullText: true }
      : { content: fallback, fullText: false };
  } catch (error) {
    console.log(`Erro ao buscar matéria completa: ${error.message}`);
    return { content: fallback, fullText: false };
  }
}

async function translateNews(article) {
  try {
    const title = await translateText(article.title);
    const description = await translateText(article.description);
    article.title = title;
    article.description = description;
    article.content = article.description;
    article.language = 'pt-BR';
  } catch (error) {
    article.language = 'original';
    console.log(`Erro ao traduzir "${article.title}":`, error.message);
  }

  return article;
}

function normalizeNews(rawItems) {
  return rawItems
    .map((item) => {
      const title = sanitizeText(item.title || 'Sem título');
      const description = sanitizeText(item.description || '');
      const content = description || 'Notícia relevante sobre cibersegurança.';

      return {
        title,
        description: content,
        content,
        link: item.link || '#',
        source: item.source || 'Fonte desconhecida',
        image: pickImageForNews(`${title} ${content}`),
        publishedAt: formatRssDate(item.pubDate || item.publishedAt || new Date().toISOString())
      };
    })
    .filter(Boolean)
    .filter(isRelevant)
    .slice(0, 8);
}

async function fetchRssFeed(url) {
  const response = await axios.get(url, {
    timeout: 15000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      'Accept': 'application/rss+xml, application/xml, text/xml, */*'
    }
  });
  const xml = response.data;

  const matches = [...xml.matchAll(/<item>(.*?)<\/item>/gs)];

  return matches.map((match) => {
    const block = match[1];
    const title = (block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/s) || block.match(/<title>(.*?)<\/title>/s) || [null, ''])[1];
    const description = (block.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/s) || block.match(/<description>(.*?)<\/description>/s) || [null, ''])[1];
    const link = (block.match(/<link>(.*?)<\/link>/s) || [null, ''])[1];
    const pubDate = (block.match(/<pubDate>(.*?)<\/pubDate>/s) || [null, ''])[1];

    return {
      title: title ? title.replace(/<!\[CDATA\[|\]\]>/g, '').trim() : '',
      description: description ? description.replace(/<!\[CDATA\[|\]\]>/g, '').trim() : '',
      link: link ? link.trim() : '#',
      pubDate: pubDate || new Date().toISOString(),
      source: 'RSS'
    };
  });
}

async function updateNews() {
  try {
    let allNews = [];

    for (const source of sources) {
      try {
        const items = await fetchRssFeed(source.url);
        allNews = allNews.concat(
          items.map((item) => ({ ...item, source: source.name }))
        );
      } catch (error) {
        console.log(`Erro ao buscar ${source.name}:`, error.message);
      }
    }

    const selectedNews = normalizeNews(allNews)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    const filtered = await Promise.all(selectedNews.slice(0, 8).map(async (article) => {
      const { content, fullText } = await fetchArticleContent(article.link, article.content);
      article.description = content;
      article.content = content;
      article.fullText = fullText;
      return translateNews(article);
    }));

    fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf8');
    console.log(`Notícias atualizadas: ${filtered.length}`);
    return filtered;
  } catch (error) {
    console.error('Erro ao atualizar notícias:', error.message);
    return [];
  }
}

app.get('/api/news', (req, res) => {
  if (!fs.existsSync(DATA_FILE)) {
    return res.json([]);
  }

  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  try {
    const data = JSON.parse(raw);
    res.json(data);
  } catch (error) {
    res.json([]);
  }
});

cron.schedule('0 6,12,18 * * *', () => {
  updateNews();
});

app.listen(PORT, async () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  await updateNews();
});
