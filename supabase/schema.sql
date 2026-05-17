create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.page_events (
  id bigint generated always as identity primary key,
  path text not null,
  session_id text not null,
  user_id uuid references auth.users(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.tool_events (
  id bigint generated always as identity primary key,
  tool text not null,
  path text,
  status text not null default 'success' check (status in ('success', 'error')),
  session_id text,
  user_id uuid references auth.users(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  error_message text,
  created_at timestamptz not null default now()
);

create table if not exists public.tool_limits (
  user_id uuid not null references auth.users(id) on delete cascade,
  tool text not null,
  usage_date date not null,
  count integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, tool, usage_date)
);

alter table public.profiles enable row level security;
alter table public.page_events enable row level security;
alter table public.tool_events enable row level security;
alter table public.tool_limits enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "tool_events_select_own" on public.tool_events;
create policy "tool_events_select_own"
on public.tool_events for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "tool_limits_select_own" on public.tool_limits;
create policy "tool_limits_select_own"
on public.tool_limits for select
to authenticated
using (auth.uid() = user_id);

create index if not exists page_events_created_at_idx on public.page_events (created_at desc);
create index if not exists page_events_path_idx on public.page_events (path);
create index if not exists tool_events_created_at_idx on public.tool_events (created_at desc);
create index if not exists tool_events_tool_idx on public.tool_events (tool);
create index if not exists profiles_created_at_idx on public.profiles (created_at desc);
