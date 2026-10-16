-- Rode este arquivo uma vez no Supabase: SQL Editor > New query > colar > Run.
-- As senhas ficam no Supabase Auth (auth.users), criptografadas.
-- Esta tabela guarda o nome de cada usuário cadastrado.

create table if not exists public.usuarios (
  id uuid primary key references auth.users (id) on delete cascade,
  nome text not null,
  email text not null,
  criado_em timestamptz not null default now()
);

alter table public.usuarios enable row level security;

drop policy if exists "usuario le o proprio cadastro" on public.usuarios;
create policy "usuario le o proprio cadastro" on public.usuarios
  for select using (auth.uid() = id);

-- Cria a linha em public.usuarios automaticamente a cada cadastro.
create or replace function public.criar_usuario()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.usuarios (id, nome, email)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', ''), new.email);
  return new;
end;
$$;

drop trigger if exists ao_criar_usuario on auth.users;
create trigger ao_criar_usuario
  after insert on auth.users
  for each row execute function public.criar_usuario();

-- =====================================================================
-- Dados do usuário que antes ficavam só no localStorage do navegador.
-- Todas as tabelas têm RLS: cada usuário só enxerga e altera as próprias linhas.
-- =====================================================================

-- Progresso e avaliação de cada curso (antes: fundamentosProgress, phishingRating...).
create table if not exists public.progresso_cursos (
  user_id uuid not null references auth.users (id) on delete cascade,
  curso text not null,
  iniciado boolean not null default false,
  progresso smallint not null default 0 check (progresso between 0 and 100),
  nota smallint check (nota between 1 and 5),
  atualizado_em timestamptz not null default now(),
  primary key (user_id, curso)
);

-- Preferências (tema, fonte, espaçamento, conteúdos) em um único JSON.
create table if not exists public.configuracoes (
  user_id uuid primary key references auth.users (id) on delete cascade,
  preferencias jsonb not null default '{}'::jsonb,
  atualizado_em timestamptz not null default now()
);

-- Atividade: curtidas, salvos, comentários e vídeos vistos.
create table if not exists public.atividade (
  user_id uuid not null references auth.users (id) on delete cascade,
  area text not null check (area in ('community', 'news', 'learning')),
  acao text not null check (acao in ('likes', 'saves', 'comments', 'videos')),
  item_id text not null,
  dados jsonb not null default '{}'::jsonb,
  atualizado_em timestamptz not null default now(),
  primary key (user_id, area, acao, item_id)
);

alter table public.progresso_cursos enable row level security;
alter table public.configuracoes enable row level security;
alter table public.atividade enable row level security;

do $$
declare t text;
begin
  foreach t in array array['progresso_cursos', 'configuracoes', 'atividade'] loop
    execute format('drop policy if exists "dono acessa os proprios dados" on public.%I', t);
    execute format(
      'create policy "dono acessa os proprios dados" on public.%I for all
         using (auth.uid() = user_id) with check (auth.uid() = user_id)', t);
  end loop;
end $$;
