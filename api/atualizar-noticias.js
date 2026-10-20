// Busca as notícias de cibersegurança nos feeds RSS públicos e grava no Supabase.
// Roda todo dia pelo cron da Vercel (ver vercel.json). Não precisa de chave de API de notícias.
const SOURCES = [
  { name: 'BleepingComputer', url: 'https://www.bleepingcomputer.com/feed/' },
  { name: 'The Hacker News', url: 'https://feeds.feedburner.com/TheHackersNews?format=xml' },
  { name: 'Krebs on Security', url: 'https://krebsonsecurity.com/feed/' }
];

const IMAGES = [
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80'
];

const ITEMS_PER_RUN = 8;
const USER_AGENT = 'Mozilla/5.0 (compatible; OlhoDigitalNoticias/1.0)';

const decodeEntities = (text) => text
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
  .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

const cleanText = (raw) => decodeEntities(String(raw || '')
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/<[^>]*>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim());

function parseFeed(xml, source) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, block]) => {
    const field = (tag) => (block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`)) || [])[1] || '';
    return {
      title: cleanText(field('title')),
      link: cleanText(field('link')),
      summary: cleanText(field('description')).slice(0, 320),
      source: source.name,
      publishedAt: new Date(cleanText(field('pubDate')) || Date.now())
    };
  }).filter((item) => item.title && /^https?:\/\//.test(item.link) && !Number.isNaN(item.publishedAt.getTime()));
}

// Tenta o tradutor do Google e, se falhar, o MyMemory (gratuito, sem chave).
// Se os dois falharem, o texto original é mantido.
async function translate(text) {
  if (!text) return text;
  const attempts = [
    async () => {
      const response = await fetch('https://translate.googleapis.com/translate_a/single?' + new URLSearchParams({
        client: 'gtx', sl: 'auto', tl: 'pt-BR', dt: 't', q: text
      }), { signal: AbortSignal.timeout(8000) });
      const data = await response.json();
      return (data?.[0] || []).map((segment) => segment[0]).join('');
    },
    async () => {
      const response = await fetch('https://api.mymemory.translated.net/get?' + new URLSearchParams({
        q: text, langpair: 'en|pt-BR'
      }), { signal: AbortSignal.timeout(8000) });
      const data = await response.json();
      return data?.responseData?.translatedText || '';
    }
  ];
  for (const attempt of attempts) {
    try {
      const translated = (await attempt()).trim();
      if (translated && translated.toLowerCase() !== text.toLowerCase()) return translated;
    } catch {
      // tenta o próximo serviço
    }
  }
  return text;
}

async function fetchAllNews() {
  const results = await Promise.allSettled(SOURCES.map(async (source) => {
    const response = await fetch(source.url, { headers: { 'User-Agent': USER_AGENT }, signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error(`${source.name}: HTTP ${response.status}`);
    return parseFeed(await response.text(), source);
  }));
  const items = results.flatMap((result) => (result.status === 'fulfilled' ? result.value : []));
  return items.sort((a, b) => b.publishedAt - a.publishedAt).slice(0, ITEMS_PER_RUN);
}

async function saveNews(rows) {
  const supabaseUrl = process.env.SUPABASE_URL || 'https://okqphqnmpxdnmanvsqlo.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY não configurada na Vercel.');
  const response = await fetch(`${supabaseUrl}/rest/v1/noticias?on_conflict=link`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal'
    },
    body: JSON.stringify(rows)
  });
  if (!response.ok) throw new Error(`Supabase respondeu HTTP ${response.status}: ${await response.text()}`);
}

module.exports = async function handler(req, res) {
  if (process.env.CRON_SECRET && req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ erro: 'Não autorizado.' });
  }

  try {
    const items = await fetchAllNews();
    const rows = [];
    for (const [index, item] of items.entries()) {
      rows.push({
        link: item.link,
        titulo: await translate(item.title),
        resumo: await translate(item.summary),
        fonte: item.source,
        imagem: IMAGES[index % IMAGES.length],
        publicado_em: item.publishedAt.toISOString(),
        atualizado_em: new Date().toISOString()
      });
    }
    if (rows.length) await saveNews(rows);
    res.status(200).json({ atualizadas: rows.length });
  } catch (error) {
    console.error('Erro ao atualizar notícias:', error);
    res.status(500).json({ erro: error.message });
  }
};
