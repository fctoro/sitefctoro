import { pool } from '../lib/db';

async function check() {
  const { rows } = await pool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'flagday_%'`);
  console.log(rows);
  process.exit(0);
}

check().catch(err => { console.error(err); process.exit(1); });
