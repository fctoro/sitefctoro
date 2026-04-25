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

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const res = await pool.query(`
    SELECT column_name, is_nullable, column_default, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'flagday_matches'
  `);
  console.table(res.rows);
  await pool.end();
}
main();
