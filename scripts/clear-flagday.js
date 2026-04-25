/**
 * clear-flagday.js — Efface toutes les données des tables flagday
 */
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [key, ...vals] = line.split('=');
    if (key && vals.length) process.env[key.trim()] = vals.join('=').trim();
  });
}
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function query(sql) {
  const client = await pool.connect();
  try { return await client.query(sql); }
  finally { client.release(); }
}

async function main() {
  console.log('🗑️  Effacement des données flagday...\n');

  // Ordre important : enfants avant parents (FK constraints)
  const steps = [
    { table: 'flagday_top_scorers', label: 'Buteurs' },
    { table: 'flagday_standings',   label: 'Classements' },
    { table: 'flagday_matches',     label: 'Matchs' },
    { table: 'flagday_categories',  label: 'Catégories' },
    { table: 'flagday_competitions',label: 'Compétitions' },
    { table: 'flagday_teams',       label: 'Équipes' },
  ];

  for (const step of steps) {
    try {
      const res = await query(`DELETE FROM ${step.table}`);
      console.log(`  ✅ ${step.label} (${step.table}) — ${res.rowCount} lignes supprimées`);
    } catch (err) {
      console.log(`  ⚠️  ${step.table} — ${err.message}`);
    }
  }

  console.log('\n✅ Toutes les données flagday ont été effacées.');
  await pool.end();
}

main().catch(err => { console.error('❌', err.message); process.exit(1); });
