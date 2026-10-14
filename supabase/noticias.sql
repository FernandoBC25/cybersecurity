-- Notícias de cibersegurança, atualizadas todo dia pela função /api/atualizar-noticias.
-- Qualquer visitante pode ler; só o servidor (chave service_role) grava.
create table if not exists public.noticias (
  id bigint generated always as identity primary key,
  link text not null unique,
  titulo text not null,
  resumo text not null default '',
  fonte text not null default '',
  imagem text not null default '',
  publicado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists noticias_publicado_idx on public.noticias (publicado_em desc);

alter table public.noticias enable row level security;

drop policy if exists "todos leem noticias" on public.noticias;
create policy "todos leem noticias" on public.noticias
  for select using (true);
