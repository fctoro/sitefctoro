
const { pool } = require('../lib/db');
async function run() {
  try {
    const res = await pool.query(`
      SELECT m.id, m.home_team_id, m.away_team_id, m.round,
             t1.name as home_name, t2.name as away_name,
             array_agg(s1.category_id) as home_cats,
             array_agg(s2.category_id) as away_cats
      FROM flagday_matches m
      JOIN flagday_teams t1 ON t1.id = m.home_team_id
      JOIN flagday_teams t2 ON t2.id = m.away_team_id
      JOIN flagday_standings s1 ON s1.team_id = m.home_team_id
      JOIN flagday_standings s2 ON s2.team_id = m.away_team_id
      WHERE m.category_id IS NULL OR m.category_id = '202da22e-cbf9-4848-a309-b971a1b65616' -- exclude the U9 I just fixed if they were mixed
      GROUP BY m.id, m.home_team_id, m.away_team_id, m.round, t1.name, t2.name
    `);
    
    // Actually, let's just find the common categories for each match
    const matches = await pool.query(`
      SELECT m.id, t1.name as home, t2.name as away, 
             array_agg(DISTINCT c.name) as shared_categories
      FROM flagday_matches m
      JOIN flagday_teams t1 ON t1.id = m.home_team_id
      JOIN flagday_teams t2 ON t2.id = m.away_team_id
      JOIN flagday_standings s1 ON s1.team_id = m.home_team_id
      JOIN flagday_standings s2 ON s2.team_id = m.away_team_id
      JOIN flagday_categories c ON c.id = s1.category_id
      WHERE s1.category_id = s2.category_id
      GROUP BY m.id, t1.name, t2.name
    `);
    
    console.log('Match Resolution Check:');
    matches.rows.forEach(m => {
      console.log(`${m.home} vs ${m.away}: ${m.shared_categories.join(', ')}`);
    });
    
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}
run();
