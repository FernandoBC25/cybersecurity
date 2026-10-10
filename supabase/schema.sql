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
