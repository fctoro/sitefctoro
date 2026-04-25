const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) process.env[key.trim()] = value.trim();
  });
}

async function check() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  
  const { rows: comps } = await pool.query("SELECT id, name FROM flagday_competitions WHERE name LIKE '%U9%'");
  console.log('Competitions:', comps);
  
  if (comps.length > 0) {
    const compId = comps[0].id;
    const { rows: matches } = await pool.query("SELECT count(*) FROM flagday_matches WHERE competition_id = $1", [compId]);
    console.log(`Matches for ${comps[0].name}:`, matches[0].count);
    
    const { rows: cats } = await pool.query("SELECT id FROM flagday_categories WHERE competition_id = $1", [compId]);
    if (cats.length > 0) {
      const { rows: st } = await pool.query("SELECT count(*) FROM flagday_standings WHERE category_id = $1", [cats[0].id]);
      console.log(`Standings for ${comps[0].name}:`, st[0].count);
    }
  }
  
  await pool.end();
}

check();
