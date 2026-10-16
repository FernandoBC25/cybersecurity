-- Comunidade e foto de perfil. Rode uma vez no Supabase: SQL Editor > New query > colar > Run.
-- Rode depois do schema.sql. Pode ser executado de novo sem problema.

-- ---------------------------------------------------------------------
-- Perfis públicos: nome e versão da foto, visíveis para quem está logado.
-- (public.usuarios continua privada porque guarda o email.)
-- ---------------------------------------------------------------------
create table if not exists public.perfis (
  id uuid primary key references auth.users (id) on delete cascade,
  nome text not null,
  avatar_versao bigint not null default 0
);

alter table public.perfis enable row level security;

drop policy if exists "logados leem perfis" on public.perfis;
create policy "logados leem perfis" on public.perfis
  for select to authenticated using (true);

drop policy if exists "dono altera o proprio perfil" on public.perfis;
create policy "dono altera o proprio perfil" on public.perfis
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

insert into public.perfis (id, nome)
select id, nome from public.usuarios
on conflict (id) do nothing;

-- A cada cadastro, cria a linha em usuarios e em perfis.
create or replace function public.criar_usuario()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.usuarios (id, nome, email)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', ''), new.email);
  insert into public.perfis (id, nome)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', ''));
  return new;
end;
$$;

-- ---------------------------------------------------------------------
-- Publicações, comentários (com respostas) e curtidas
-- ---------------------------------------------------------------------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  autor_id uuid not null default auth.uid() references public.perfis (id) on delete cascade,
  categoria text not null check (categoria in ('geral', 'duvidas', 'tutoriais', 'projetos', 'noticias')),
  texto text not null check (char_length(texto) between 1 and 5000),
  imagem_path text,
  destaque boolean not null default false,
  criado_em timestamptz not null default now()
);

create table if not exists public.comentarios (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  parent_id uuid references public.comentarios (id) on delete cascade,
  autor_id uuid not null default auth.uid() references public.perfis (id) on delete cascade,
  texto text not null check (char_length(texto) between 1 and 2000),
  criado_em timestamptz not null default now()
);

create table if not exists public.curtidas_posts (
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  primary key (post_id, user_id)
);

create index if not exists comentarios_post_idx on public.comentarios (post_id);
create index if not exists posts_criado_idx on public.posts (criado_em desc);

alter table public.posts enable row level security;
alter table public.comentarios enable row level security;
alter table public.curtidas_posts enable row level security;

-- posts: todos os logados leem; só o autor cria/edita/apaga; "destaque" só pelo painel.
drop policy if exists "logados leem posts" on public.posts;
create policy "logados leem posts" on public.posts
  for select to authenticated using (true);
drop policy if exists "autor cria post" on public.posts;
create policy "autor cria post" on public.posts
  for insert to authenticated with check (autor_id = auth.uid() and destaque = false);
drop policy if exists "autor edita post" on public.posts;
create policy "autor edita post" on public.posts
  for update to authenticated using (autor_id = auth.uid()) with check (autor_id = auth.uid() and destaque = false);
drop policy if exists "autor apaga post" on public.posts;
create policy "autor apaga post" on public.posts
  for delete to authenticated using (autor_id = auth.uid());

-- comentarios
drop policy if exists "logados leem comentarios" on public.comentarios;
create policy "logados leem comentarios" on public.comentarios
  for select to authenticated using (true);
drop policy if exists "autor cria comentario" on public.comentarios;
create policy "autor cria comentario" on public.comentarios
  for insert to authenticated with check (autor_id = auth.uid());
drop policy if exists "autor apaga comentario" on public.comentarios;
create policy "autor apaga comentario" on public.comentarios
  for delete to authenticated using (autor_id = auth.uid());

-- curtidas
drop policy if exists "logados leem curtidas" on public.curtidas_posts;
create policy "logados leem curtidas" on public.curtidas_posts
  for select to authenticated using (true);
drop policy if exists "usuario curte" on public.curtidas_posts;
create policy "usuario curte" on public.curtidas_posts
  for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "usuario descurte" on public.curtidas_posts;
create policy "usuario descurte" on public.curtidas_posts
  for delete to authenticated using (user_id = auth.uid());

-- ---------------------------------------------------------------------
-- Storage: fotos de perfil e imagens de publicações.
-- Buckets públicos (leitura por URL); só o dono escreve na própria pasta <user_id>/.
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('avatars', 'avatars', true, 5242880, array['image/webp', 'image/png', 'image/jpeg']),
  ('post-images', 'post-images', true, 5242880, array['image/webp', 'image/png', 'image/jpeg'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

do $$
declare b text;
begin
  foreach b in array array['avatars', 'post-images'] loop
    execute format('drop policy if exists "%s: leitura" on storage.objects', b);
    execute format('create policy "%s: leitura" on storage.objects for select
      using (bucket_id = %L)', b, b);
    execute format('drop policy if exists "%s: dono envia" on storage.objects', b);
    execute format('create policy "%s: dono envia" on storage.objects for insert to authenticated
      with check (bucket_id = %L and (storage.foldername(name))[1] = auth.uid()::text)', b, b);
    execute format('drop policy if exists "%s: dono atualiza" on storage.objects', b);
    execute format('create policy "%s: dono atualiza" on storage.objects for update to authenticated
      using (bucket_id = %L and (storage.foldername(name))[1] = auth.uid()::text)
      with check (bucket_id = %L and (storage.foldername(name))[1] = auth.uid()::text)', b, b, b);
    execute format('drop policy if exists "%s: dono apaga" on storage.objects', b);
    execute format('create policy "%s: dono apaga" on storage.objects for delete to authenticated
      using (bucket_id = %L and (storage.foldername(name))[1] = auth.uid()::text)', b, b);
  end loop;
end $$;
