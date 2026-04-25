const { Client } = require('pg');
const fs = require('fs');

function getEnv(key) {
  try {
    const env = fs.readFileSync('.env.local', 'utf8');
    const lines = env.split('\n');
    for (const line of lines) {
      if (line.startsWith(key + '=')) {
        return line.split('=')[1].trim().replace(/^"|"$/g, '');
      }
    }
  } catch (e) {}
  return process.env[key];
}

async function run() {
  const dbUrl = getEnv('DATABASE_URL');
  const client = new Client({ connectionString: dbUrl });
  await client.connect();
  
  console.log('--- VERIFYING STANDINGS (U9) ---');
  const res = await client.query(`
    SELECT s.group_name, t.name as team_name, s.points, s.played, s.won, s.drawn, s.lost, s.goals_for, s.goals_against, s.rank_position, s.is_qualified
    FROM flagday_standings s 
    JOIN flagday_teams t ON t.id = s.team_id 
    JOIN flagday_categories c ON c.id = s.category_id 
    WHERE c.name = 'U9'
    ORDER BY s.group_name, s.rank_position
  `);
  console.table(res.rows);
  
  console.log('\n--- VERIFYING SCORERS (U9) ---');
  const scorers = await client.query(`
    SELECT player_name, team_name, goals
    FROM flagday_top_scorers ts 
    JOIN flagday_categories c ON c.id = ts.category_id 
    WHERE c.name = 'U9'
    ORDER BY goals DESC
  `);
  console.table(scorers.rows);
  
  await client.end();
}

run().catch(console.error);
