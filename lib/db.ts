import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL
const smgConnectionString = process.env.SMG_DATABASE_URL
 
const ssl =
  connectionString?.includes('supabase.co') ||
  connectionString?.includes('supabase.com') ||
  connectionString?.includes('pooler')

const smgSsl =
  smgConnectionString?.includes('supabase.co') ||
  smgConnectionString?.includes('supabase.com') ||
  smgConnectionString?.includes('pooler')

export const pool = new Pool({
  connectionString: connectionString || undefined,
  ssl: ssl ? { rejectUnauthorized: false } : undefined,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
})

export const smgPool = new Pool({
  connectionString: smgConnectionString || undefined,
  ssl: smgSsl ? { rejectUnauthorized: false } : undefined,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
})

if (!connectionString) {
  console.log('[DB-SITE] DATABASE_URL non définie. Les appels DB seront ignorés ou utiliseront localhost.')
}

// Database error logging
pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err)
})

smgPool.on('error', (err) => {
  console.error('Unexpected error on idle SMG database client', err)
})

const dbHost = (() => {
  if (!connectionString) return 'localhost'

  try {
    return new URL(connectionString).hostname || 'localhost'
  } catch {
    return 'localhost'
  }
})()
console.log(`[DB-SITE] Tentative de connexion à : ${dbHost}`)

pool.on('connect', () => {
  if (!(globalThis as any).__dbLogged) {
    console.log(`[DB-SITE] Connexion établie sur : ${dbHost}`)
    ;(globalThis as any).__dbLogged = true
  }
})

let hasEnsuredPlayersTables = false
let hasEnsuredFansTable = false

export async function ensurePlayersTables() {
  if (hasEnsuredPlayersTables) return

  await smgPool.query(`
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

  await smgPool.query(`alter table player_registrations add column if not exists ordered_uniforms jsonb not null default '[]'::jsonb;`)
  await smgPool.query(`alter table player_registrations add column if not exists financial_commitment_name text;`)
  await smgPool.query(`alter table player_registrations add column if not exists financial_commitment_date date;`)
  await smgPool.query(`alter table player_registrations add column if not exists financial_commitment_phone text;`)
  await smgPool.query(`alter table player_registrations add column if not exists financial_commitment_signature text;`)

  await smgPool.query(`update player_registrations set ordered_uniforms = '[]'::jsonb where ordered_uniforms is null;`)

  await smgPool.query(`
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

  await smgPool.query(`alter table player_registration_documents add column if not exists path text;`)
  await smgPool.query(`alter table player_registration_documents alter column data drop not null;`)

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

let hasEnsuredDetectionsTable = false

export async function ensureDetectionsTable() {
  if (hasEnsuredDetectionsTable) return

  await smgPool.query(`
    create table if not exists detection_registrations (
      id bigserial primary key,
      created_at timestamptz not null default now(),
      nom text not null,
      prenom text not null,
      sexe text not null,
      date_naissance date not null,
      lieu_naissance text not null,
      telephone text not null,
      email text,
      zone_residence text not null,
      pied_dominant text not null,
      club_actuel text,
      niveau_actuel text not null,
      experience_competitive text not null,
      comment_identifie jsonb not null default '[]'::jsonb,
      parent_nom text not null,
      parent_lien text not null,
      parent_telephone text not null,
      parent_email text,
      urgence_nom text not null,
      urgence_telephone text not null,
      photo_recente_url text,
      numero_detection text
    );
  `)

  hasEnsuredDetectionsTable = true
}

let hasEnsuredSiteMessagesTable = false

export async function ensureSiteMessagesTable() {
  if (hasEnsuredSiteMessagesTable) return

  await pool.query(`
    create table if not exists site_messages (
      id bigserial primary key,
      created_at timestamptz not null default now(),
      type text not null,
      name text not null,
      email text,
      phone text,
      message text,
      payload jsonb,
      is_read boolean not null default false
    );
  `)

  hasEnsuredSiteMessagesTable = true
}

