const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) return
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/)
  for (const line of lines) {
    if (!line || line.startsWith('#')) continue
    const idx = line.indexOf('=')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim()
    if (!process.env[key]) {
      process.env[key] = value
    }
  }
}

loadEnv()

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error('DATABASE_URL is missing')
  process.exit(1)
}

const ssl =
  connectionString.includes('supabase.co') ||
  connectionString.includes('supabase.com') || connectionString.includes('pooler')
    ? { rejectUnauthorized: false }
    : undefined

const pool = new Pool({ connectionString, ssl })

async function run() {
  const client = await pool.connect()
  try {
    await client.query('begin')
    await client.query(`
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
    `)
    await client.query(`alter table player_registrations add column if not exists ordered_uniforms jsonb not null default '[]'::jsonb;`)
    await client.query(`alter table player_registrations add column if not exists financial_commitment_name text;`)
    await client.query(`alter table player_registrations add column if not exists financial_commitment_date date;`)
    await client.query(`alter table player_registrations add column if not exists financial_commitment_phone text;`)
    await client.query(`alter table player_registrations add column if not exists financial_commitment_signature text;`)
    await client.query(`update player_registrations set ordered_uniforms = '[]'::jsonb where ordered_uniforms is null;`)
    await client.query(`
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
    await client.query(`alter table player_registration_documents add column if not exists path text;`)
    await client.query(`alter table player_registration_documents alter column data drop not null;`)

    await client.query(`
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
    await client.query('commit')
    console.log('Tables created or already exist.')
  } catch (error) {
    await client.query('rollback')
    console.error('Failed to create tables:', error)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

run()
