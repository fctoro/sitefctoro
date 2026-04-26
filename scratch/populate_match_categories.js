
const { pool } = require('../lib/db');
async function run() {
  try {
    console.log('Populating category_id in flagday_matches...');
    
    // Strategy: Update matches where both teams share exactly ONE category in the same competition.
    const res = await pool.query(`
      WITH MatchCategories AS (
        SELECT m.id as match_id, s1.category_id, count(*) OVER(PARTITION BY m.id) as cat_count
        FROM flagday_matches m
        JOIN flagday_standings s1 ON s1.team_id = m.home_team_id
        JOIN flagday_standings s2 ON s2.team_id = m.away_team_id
        WHERE s1.category_id = s2.category_id
      )
      UPDATE flagday_matches m
      SET category_id = mc.category_id
      FROM MatchCategories mc
      WHERE m.id = mc.match_id AND mc.cat_count = 1
    `);
    console.log(`Updated ${res.rowCount} matches with unique category match.`);

    // For the remaining ambiguous matches (cat_count > 1), try to see if one of the categories matches a keyword in the teams names or something?
    // Actually, let's just see how many are left.
    const remaining = await pool.query('SELECT count(*) FROM flagday_matches WHERE category_id IS NULL');
    console.log(`Remaining matches without category: ${remaining.rows[0].count}`);

    if (remaining.rows[0].count > 0) {
       // Try to pick the category that matches the home team's name if it contains U9, U11 etc? 
       // Or just pick the first category they share.
       const res2 = await pool.query(`
         WITH MatchCategories AS (
           SELECT DISTINCT ON (m.id) m.id as match_id, s1.category_id
           FROM flagday_matches m
           JOIN flagday_standings s1 ON s1.team_id = m.home_team_id
           JOIN flagday_standings s2 ON s2.team_id = m.away_team_id
           WHERE s1.category_id = s2.category_id AND m.category_id IS NULL
         )
         UPDATE flagday_matches m
         SET category_id = mc.category_id
         FROM MatchCategories mc
         WHERE m.id = mc.match_id
       `);
       console.log(`Updated ${res2.rowCount} more matches by picking the first shared category.`);
    }

  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}
run();
