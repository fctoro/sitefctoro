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
  if (!dbUrl) {
    console.error('DATABASE_URL not found');
    return;
  }
  const client = new Client({
    connectionString: dbUrl,
  });
  await client.connect();
  
  console.log('Updating CPS logo...');
  await client.query("UPDATE flagday_teams SET logo_url = '/logos/CSP.png' WHERE name ILIKE 'CPS'");
  
  console.log('Updating Condor logos...');
  await client.query("UPDATE flagday_teams SET logo_url = '/logos/CONDOR EF.png' WHERE name ILIKE '%Condor%'");
  
  const res = await client.query("SELECT name, logo_url FROM flagday_teams WHERE name ILIKE '%CPS%' OR name ILIKE '%Condor%'");
  console.log('Verification:');
  console.log(JSON.stringify(res.rows, null, 2));
  
  await client.end();
}

run().catch(console.error);
