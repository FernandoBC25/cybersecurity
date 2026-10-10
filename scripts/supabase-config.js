// Dados do projeto Supabase (Project Settings > API). A chave "anon" é pública por padrão.
const SUPABASE_URL = 'https://okqphqnmpxdnmanvsqlo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_iPzG7GQSAHO84gNNAcSYag_yoVJhoG3';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
