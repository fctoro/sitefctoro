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
  
  const cat = await client.query("SELECT id FROM flagday_categories WHERE name = 'U9'");
  if (cat.rows.length > 0) {
    const catId = cat.rows[0].id;
    // Clear automated match scorers for this category
    await client.query(`
      DELETE FROM flagday_match_scorers 
      WHERE match_id IN (
        SELECT id FROM flagday_matches 
        WHERE competition_id IN (
          SELECT competition_id FROM flagday_categories WHERE id = $1
        )
      )
    `, [catId]);
    console.log('Automated match scorers for U9 have been deleted.');
  }
  
  await client.end();
}

run().catch(console.error);
