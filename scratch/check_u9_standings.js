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
  
  const res = await client.query(`
    SELECT s.group_name as G, s.rank_position as R, t.name as team, s.is_qualified as Q 
    FROM flagday_standings s 
    JOIN flagday_teams t ON t.id = s.team_id 
    JOIN flagday_categories c ON c.id = s.category_id 
    WHERE c.name = 'U9'
    ORDER BY s.group_name, s.rank_position
  `);
  console.table(res.rows);
  
  await client.end();
}

run().catch(console.error);
