/**
 * clear-teams.js — Efface les équipes flagday en gérant les FK
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

async function query(sql, params = []) {
  const client = await pool.connect();
  try { return await client.query(sql, params); }
  finally { client.release(); }
}

async function main() {
  console.log('🗑️  Effacement des équipes flagday...\n');

  // Vider club_events d'abord (si cette table est liée aux équipes flagday)
  try {
    const res = await query(`DELETE FROM club_events`);
    console.log(`  ✅ club_events — ${res.rowCount} lignes supprimées`);
  } catch (err) {
    console.log(`  ⚠️  club_events : ${err.message}`);
  }

  // Maintenant effacer les équipes
  try {
    const res = await query(`DELETE FROM flagday_teams`);
    console.log(`  ✅ flagday_teams — ${res.rowCount} lignes supprimées`);
  } catch (err) {
    console.log(`  ⚠️  flagday_teams : ${err.message}`);
    // Si encore des FK, lister les contraintes
    try {
      const { rows } = await query(`
        SELECT tc.table_name, tc.constraint_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.referential_constraints rc ON tc.constraint_name = rc.constraint_name
        JOIN information_schema.table_constraints rc2 ON rc.unique_constraint_name = rc2.constraint_name
        WHERE rc2.table_name = 'flagday_teams'
      `);
      console.log('  Tables liées à flagday_teams:', rows);
    } catch(e) {}
  }

  console.log('\n✅ Terminé.');
  await pool.end();
}

main().catch(err => { console.error('❌', err.message); process.exit(1); });
