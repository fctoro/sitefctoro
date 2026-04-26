
const { pool } = require('../lib/db');
async function run() {
  try {
    const res = await pool.query(`
      SELECT m.id, s1.category_id 
      FROM flagday_matches m 
      JOIN flagday_standings s1 ON s1.team_id = m.home_team_id 
      JOIN flagday_standings s2 ON s2.team_id = m.away_team_id 
      WHERE s1.category_id = s2.category_id
    `);
    console.log('Total matches in DB:', (await pool.query('SELECT count(*) FROM flagday_matches')).rows[0].count);
    console.log('Matches where both teams share a category:', res.rowCount);
    
    // Check for duplicates (a match appearing in multiple categories because both teams are in multiple categories)
    const counts = {};
    res.rows.forEach(r => counts[r.id] = (counts[r.id] || 0) + 1);
    const duplicates = Object.values(counts).filter(c => c > 1).length;
    console.log('Matches with multiple common categories:', duplicates);
    
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}
run();
