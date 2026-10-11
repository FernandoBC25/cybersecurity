const express = require('express');
const axios = require('axios');
const cron = require('node-cron');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'news.json');

const sources = [
  {
    name: 'G1',
    url: 'https://g1.globo.com/rss/g1/tecnologia/'
  },
  {
    name: 'Agência Brasil',
    url: 'https://agenciabrasil.ebc.com.br/rss/educacao/feed.xml'
  },
  {
    name: 'Jornal Nacional',
    url: 'https://g1.globo.com/rss/g1/educacao/'
  }
];

const keywords = [
  'educação digital',
  'cibersegurança',
  'tecnologia',
  'segurança digital',
  'internet segura'
];

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

function isRelevant(item) {
  const text = `${item.title || ''} ${item.description || ''}`.toLowerCase();
  return keywords.some(keyword => text.includes(keyword));
}

function normalizeNews(rawItems) {
  return rawItems
    .map((item) => ({
      title: item.title || 'Sem título',
      description: (item.description || '').replace(/<[^>]*>/g, '').trim(),
      link: item.link || '#',
      source: item.source || 'Fonte desconhecida',
      publishedAt: item.pubDate || new Date().toISOString()
    }))
    .filter(Boolean)
    .filter(isRelevant)
    .slice(0, 8);
}

async function fetchRssFeed(url) {
  const response = await axios.get(url, { timeout: 15000 });
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

    const filtered = normalizeNews(allNews)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

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
