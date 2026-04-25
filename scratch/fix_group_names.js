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
  
  await client.query("UPDATE flagday_standings SET group_name = 'A' WHERE group_name = 'Groupe A'");
  await client.query("UPDATE flagday_standings SET group_name = 'B' WHERE group_name = 'Groupe B'");
  
  console.log('Group names A and B have been standardized in the database.');
  
  await client.end();
}

run().catch(console.error);
