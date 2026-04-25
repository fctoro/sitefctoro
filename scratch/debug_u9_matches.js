const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [key, ...vals] = line.split('=');
    if (key && vals.length) process.env[key.trim()] = vals.join('=').trim();
  });
}
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function checkMatches() {
  const { rows } = await pool.query(`
    SELECT m.id, c.name as comp_name, h.name as home, a.name as away, m.home_score, m.away_score, m.round, m.status, m.kickoff
    FROM flagday_matches m
    JOIN flagday_competitions c ON m.competition_id = c.id
    JOIN flagday_teams h ON m.home_team_id = h.id
    JOIN flagday_teams a ON m.away_team_id = a.id
    WHERE c.age_category = 'U9'
    ORDER BY m.round, m.kickoff
  `);
  console.table(rows);
  await pool.end();
}

checkMatches();
