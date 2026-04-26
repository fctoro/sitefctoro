
const { pool } = require('../lib/db');

async function q(sql, params = []) {
  const c = await pool.connect();
  try { return await c.query(sql, params); } finally { c.release(); }
}

const MAIN_COMP_ID = 'c972aad9-67d1-4afa-82a5-03e9daacf269';

async function run() {
  try {
    console.log('🚀 Reverting to single competition model...');
    
    // 1. Point all categories to the main competition
    await q(`UPDATE flagday_categories SET competition_id = $1`, [MAIN_COMP_ID]);
    
    // 2. Point all matches to the main competition
    await q(`UPDATE flagday_matches SET competition_id = $1`, [MAIN_COMP_ID]);
    
    // 3. Delete the extra competitions
    await q(`DELETE FROM flagday_competitions WHERE id != $1`, [MAIN_COMP_ID]);
    
    // 4. Update the main competition name if needed
    await q(`UPDATE flagday_competitions SET name = 'Flag Day 2026', age_category = '' WHERE id = $1`, [MAIN_COMP_ID]);

    console.log('✅ Revert complete. Now updating U11 matches from image...');
    
    const u11CatId = (await q("SELECT id FROM flagday_categories WHERE name = 'U11'")).rows[0].id;
    
    const u11Matches = [
      // Group A
      { home: 'Fc Toro Elite', away: 'Valencia', scoreH: 6, scoreA: 0, date: '2026-02-15', time: '15:00', round: 'U11 Groupe A' },
      { home: 'Fc Toro PV',    away: 'AST',      scoreH: 0, scoreA: 2, date: '2026-03-07', time: '11:30', round: 'U11 Groupe A' },
      { home: 'Fc Toro Elite', away: 'AST',      scoreH: 2, scoreA: 0, date: '2026-03-21', time: '11:30', round: 'U11 Groupe A' },
      { home: 'Fc Toro PV',    away: 'Valencia', scoreH: 0, scoreA: 2, date: '2026-04-04', time: '10:30', round: 'U11 Groupe A' },
      { home: 'Fc Toro Elite', away: 'Fc Toro PV', scoreH: 1, scoreA: 1, date: '2026-04-11', time: '11:30', round: 'U11 Groupe A' },
      { home: 'AST',           away: 'Valencia', scoreH: 2, scoreA: 0, date: '2026-04-18', time: '10:30', round: 'U11 Groupe A' },
      // Group B
      { home: 'JACOT',           away: 'Fc MDM',           scoreH: 1, scoreA: 3, date: '2026-02-15', time: '15:00', round: 'U11 Groupe B' },
      { home: 'ASF',             away: 'Stars des Jeunes', scoreH: 1, scoreA: 1, date: '2026-03-07', time: '11:30', round: 'U11 Groupe B' },
      { home: 'JACOT',           away: 'Stars des Jeunes', scoreH: 2, scoreA: 3, date: '2026-03-21', time: '11:30', round: 'U11 Groupe B' },
      { home: 'ASF',             away: 'Fc MDM',           scoreH: 0, scoreA: 1, date: '2026-04-04', time: '10:30', round: 'U11 Groupe B' },
      { home: 'JACOT',           away: 'ASF',              scoreH: 3, scoreA: 1, date: '2026-04-11', time: '11:30', round: 'U11 Groupe B' },
      { home: 'Fc MDM',          away: 'Stars des Jeunes', scoreH: 3, scoreA: 0, date: '2026-04-18', time: '10:30', round: 'U11 Groupe B' },
    ];

    async function getTeamId(name) {
      const res = await q('SELECT id FROM flagday_teams WHERE name ILIKE $1', [name]);
      if (res.rows.length) return res.rows[0].id;
      return null;
    }

    // Delete existing U11 matches in the main competition
    await q('DELETE FROM flagday_matches WHERE category_id = $1', [u11CatId]);

    for (const m of u11Matches) {
      const hId = await getTeamId(m.home);
      const aId = await getTeamId(m.away);
      if (hId && aId) {
        const kickoff = `${m.date}T${m.time.includes('h') ? m.time.replace('h', ':') : m.time}:00`;
        await q(
          `INSERT INTO flagday_matches (competition_id, category_id, home_team_id, away_team_id, home_score, away_score, round, status, kickoff, venue)
           VALUES ($1, $2, $3, $4, $5, $6, $7, 'finished', $8, 'Ste Thérèse')`,
          [MAIN_COMP_ID, u11CatId, hId, aId, m.scoreH, m.scoreA, m.round, kickoff]
        );
      }
    }

    console.log('✅ Done!');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

run();
