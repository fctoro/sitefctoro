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
  
  console.log('--- TABLE SCHEMAS ---');
  const res = await client.query(`
    SELECT table_name, column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name LIKE 'flagday_%'
    ORDER BY table_name, ordinal_position
  `);
  
  const tables = {};
  res.rows.forEach(row => {
    if (!tables[row.table_name]) tables[row.table_name] = [];
    tables[row.table_name].push(row.column_name);
  });
  
  console.log(JSON.stringify(tables, null, 2));
  
  await client.end();
}

run().catch(console.error);
