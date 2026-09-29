-- Enable pgvector extension
create extension if not exists vector;

-- Repository metadata (also the render cache for the Projects grid)
create table if not exists repos (
  id            text primary key,              -- GitHub node id
  name          text not null,
  full_name     text not null,
  description   text,
  url           text not null,
  homepage_url  text,
  primary_language text,
  languages     jsonb default '[]',            -- [{name, color, size}]
  topics        text[] default '{}',
  stars         int  default 0,
  forks         int  default 0,
  is_pinned     boolean default false,
  is_archived   boolean default false,
  pushed_at     timestamptz,
  latest_commit jsonb,                         -- {message, date, sha}
  readme_hash   text,                          -- sha256 of cleaned README
  synced_at     timestamptz default now()
);
create index if not exists repos_ordering_idx on repos (is_pinned desc, stars desc, pushed_at desc);

-- Retrieval chunks (repo READMEs + static knowledge)
create table if not exists chunks (
  id            uuid primary key default gen_random_uuid(),
  source_type   text not null check (source_type in ('repo','profile','experience','skills','faq')),
  source_id     text not null,                 -- repos.id or static key
  title         text not null,                 -- e.g. "my-repo > Architecture"
  content       text not null,
  content_hash  text not null,
  metadata      jsonb default '{}',            -- {repo, topics, language, section, url}
  embedding     vector(1536) not null,
  updated_at    timestamptz default now(),
  unique (source_type, source_id, content_hash)
);
create index if not exists chunks_embedding_idx on chunks using hnsw (embedding vector_cosine_ops);
create index if not exists chunks_source_idx on chunks (source_type, source_id);

-- Sync run audit log
create table if not exists sync_runs (
  id uuid primary key default gen_random_uuid(),
  trigger text,
  started_at timestamptz default now(),
  finished_at timestamptz,
  repos_seen int default 0,
  chunks_added int default 0,
  chunks_removed int default 0,
  error text
);

-- Similarity search function
create or replace function match_chunks(
  query_embedding vector(1536),
  match_count int default 6,
  min_similarity float default 0.25
) returns table (
  id uuid,
  title text,
  content text,
  metadata jsonb,
  source_type text,
  similarity float
)
language sql stable as $$
  select
    c.id,
    c.title,
    c.content,
    c.metadata,
    c.source_type,
    1 - (c.embedding <=> query_embedding) as similarity
  from chunks c
  where 1 - (c.embedding <=> query_embedding) > min_similarity
  order by c.embedding <=> query_embedding
  limit match_count;
$$;

-- RLS policies: public can read repos; chunks are server-only
alter table repos enable row level security;
alter table chunks enable row level security;
alter table sync_runs enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'repos' and policyname = 'public read repos'
  ) then
    create policy "public read repos" on repos for select using (true);
  end if;
end
$$;
