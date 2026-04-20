import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL
 
const ssl = connectionString?.includes('supabase.com') || connectionString?.includes('pooler')

export const pool = new Pool({
  connectionString: connectionString || undefined,
  ssl: ssl ? { rejectUnauthorized: false } : undefined,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
})

// Database error logging
pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err)
})

let hasEnsuredPlayersTables = false
let hasEnsuredFansTable = false

export async function ensurePlayersTables() {
  if (hasEnsuredPlayersTables) return

  await pool.query(`
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
      consents jsonb not null
    );
  `)

  await pool.query(`
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
  `)

  await pool.query(`alter table player_registration_documents add column if not exists path text;`)
  await pool.query(`alter table player_registration_documents alter column data drop not null;`)

  hasEnsuredPlayersTables = true
}

export async function ensureFansTable() {
  if (hasEnsuredFansTable) return

  await pool.query(`
    create table if not exists fan_registrations (
      id bigserial primary key,
      created_at timestamptz not null default now(),
      first_name text not null,
      last_name text not null,
      phone text not null,
      email text not null,
      department text not null,
      address text not null,
      consent_contact boolean not null default false
    );
  `)

  hasEnsuredFansTable = true
}
