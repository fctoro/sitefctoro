const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
let connectionString = '';
envContent.split('\n').forEach(line => {
  if (line.startsWith('DATABASE_URL=')) {
    connectionString = line.split('=')[1].trim().replace(/['"]/g, '');
  }
});

const ssl =
  connectionString?.includes('supabase.co') ||
  connectionString?.includes('supabase.com') ||
  connectionString?.includes('pooler');

const pool = new Pool({
  connectionString,
  ssl: ssl ? { rejectUnauthorized: false } : undefined,
});

async function run() {
  console.log("Starting cleanup...");
  try {
    const res1 = await pool.query(`
      DELETE FROM fan_registrations a USING fan_registrations b
      WHERE a.id > b.id AND a.email = b.email
    `);
    console.log(`Deleted ${res1.rowCount} duplicate fan_registrations.`);

    const res2 = await pool.query(`
      DELETE FROM site_messages a USING site_messages b
      WHERE a.id > b.id AND a.email = b.email AND a.type = 'fan' AND b.type = 'fan'
    `);
    console.log(`Deleted ${res2.rowCount} duplicate site_messages of type fan.`);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}
run();
