begin;

create table if not exists player_registrations (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  program text not null,
  child_first_name text not null,
  child_last_name text not null,
  child_birth_date date not null,
  child_gender text not null,
  child_address text not null,
  child_school text not null,
  child_soccer_experience text,
  guardian_name text not null,
  guardian_email text not null,
  guardian_phone text not null,
  guardian_address text,
  emergency_name text not null,
  emergency_relation text not null,
  emergency_phone text not null,
  emergency_email text,
  emergency_address text,
  uniform_top_size text not null,
  uniform_short_size text not null,
  preferred_numbers text,
  payment_plan text not null,
  payment_method text not null,
  signature_name text not null,
  consents jsonb not null,
  ordered_uniforms jsonb not null default '[]'::jsonb,
  financial_commitment_name text not null,
  financial_commitment_date date not null,
  financial_commitment_phone text not null,
  financial_commitment_signature text not null
);

create table if not exists player_registration_documents (
  id bigserial primary key,
  registration_id bigint not null references player_registrations(id) on delete cascade,
  doc_key text not null,
  filename text not null,
  content_type text,
  size_bytes integer,
  path text,
  data bytea,
  created_at timestamptz not null default now(),
  unique (registration_id, doc_key)
);

alter table player_registration_documents add column if not exists path text;
alter table player_registration_documents alter column data drop not null;

commit;
