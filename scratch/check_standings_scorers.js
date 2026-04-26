const { pool } = require('../lib/db');
async function run() {
  const c = await pool.connect();
  try {
    const standings = await c.query(`
      SELECT cat.name as category, s.group_name, t.name as team_name, s.played, s.points 
      FROM flagday_standings s 
      JOIN flagday_categories cat ON s.category_id = cat.id 
      JOIN flagday_teams t ON s.team_id = t.id 
      WHERE cat.competition_id = (SELECT id FROM flagday_competitions WHERE slug = 'flag-day-2026') 
      ORDER BY cat.name, s.group_name, s.points DESC
    `);
    const scorers = await c.query(`
      SELECT cat.name as category, ts.player_name, ts.goals, ts.team_name 
      FROM flagday_top_scorers ts 
      JOIN flagday_categories cat ON ts.category_id = cat.id 
      WHERE cat.competition_id = (SELECT id FROM flagday_competitions WHERE slug = 'flag-day-2026') 
      ORDER BY cat.name, ts.goals DESC
    `);
    console.log('--- CLASSEMENTS (STANDINGS) ---');
    standings.rows.forEach(r => console.log(`${r.category} | Grp ${r.group_name} | ${r.team_name} | Pts: ${r.points}`));
    console.log('\n--- BUTEURS (SCORERS) ---');
    scorers.rows.forEach(r => console.log(`${r.category} | ${r.player_name} (${r.team_name}) | Buts: ${r.goals}`));
  } finally {
    c.release();
    process.exit(0);
  }
}
run();
