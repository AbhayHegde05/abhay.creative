-- Supabase schema for the Design-portfolio Cloudflare Worker backend.
-- Run this in Supabase Dashboard -> SQL Editor -> Run, or via the Supabase CLI.
-- Table names MUST match backend/index.js:
--   handleContact -> table "contact"
--   handleHire    -> table "hire"

-- ===================== contact =====================
create table if not exists public.contact (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  subject     text,
  message     text not null,
  created_at  timestamptz default now()
);

-- ===================== hire =====================
create table if not exists public.hire (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  service     text not null,
  budget      text,
  timeline    text,
  details     text,
  created_at  timestamptz default now()
);

-- ===================== Row Level Security =====================
-- If you use the SUPABASE_KEY = anon/public key, enable RLS and add an
-- INSERT policy so the Worker can write. If you use the service_role key,
-- RLS is bypassed and you can leave it disabled.

alter table public.contact enable row level security;
alter table public.hire    enable row level security;

drop policy if exists "allow anon insert contact" on public.contact;
create policy "allow anon insert contact"
  on public.contact for insert
  to anon
  with check (true);

drop policy if exists "allow anon insert hire" on public.hire;
create policy "allow anon insert hire"
  on public.hire for insert
  to anon
  with check (true);
