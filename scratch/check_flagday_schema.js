
const { pool } = require('./lib/db');
async function check() {
  const tables = ['flagday_competitions', 'flagday_categories', 'flagday_matches', 'flagday_standings', 'flagday_top_scorers'];
  for (const table of tables) {
    const res = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${table}'`);
    console.log(`${table}:`, res.rows.map(r => r.column_name));
  }
  process.exit(0);
}
check();
