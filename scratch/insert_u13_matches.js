
const { pool } = require('../lib/db');

async function q(sql, params = []) {
  const c = await pool.connect();
  try { return await c.query(sql, params); } finally { c.release(); }
}

const MAIN_COMP_ID = 'c972aad9-67d1-4afa-82a5-03e9daacf269';
const CAT_ID = '07f35327-b612-42ee-b90d-899e7a4d5e7c';

async function getTeamId(name) {
  const res = await q('SELECT id FROM flagday_teams WHERE name ILIKE $1', [name]);
  if (res.rows.length) return res.rows[0].id;
  return null;
}

const matches = [
  // Group A
  { home: 'Fc Toro Elite',  away: 'Fc Flambo',     scoreH: 3, scoreA: 1, date: '2026-02-15', time: '15:30', round: 'U13 Groupe A', venue: 'Ste Thérèse' },
  { home: 'Fc Seth',        away: 'Fc Perfection', scoreH: 0, scoreA: 1, date: '2026-02-22', time: '10:00', round: 'U13 Groupe A', venue: 'Thomassin' },
  { home: 'Fc Toro Elite',  away: 'Fc Perfection', scoreH: 3, scoreA: 0, date: '2026-02-28', time: '11:30', round: 'U13 Groupe A', venue: 'Thomassin' },
  { home: 'Fc Seth',        away: 'Fc Flambo',     scoreH: 2, scoreA: 1, date: '2026-03-07', time: '10:00', round: 'U13 Groupe A', venue: 'Thomassin' },
  { home: 'Fc Toro Elite',  away: 'Fc Seth',       scoreH: 1, scoreA: 1, date: '2026-03-14', time: '10:00', round: 'U13 Groupe A', venue: 'Thomassin' },
  { home: 'Fc Flambo',      away: 'Fc Perfection', scoreH: 4, scoreA: 1, date: '2026-04-11', time: '10:00', round: 'U13 Groupe A', venue: 'Thomassin' },
  // Group B
  { home: 'Valencia', away: 'Fc MDM', scoreH: 2, scoreA: 3, date: '2026-02-21', time: '11:30', round: 'U13 Groupe B', venue: 'Ste Thérèse' },
  { home: 'PAC',      away: 'ASF',    scoreH: 1, scoreA: 7, date: '2026-02-28', time: '10:00', round: 'U13 Groupe B', venue: 'Thomassin' },
  { home: 'Valencia', away: 'ASF',    scoreH: 0, scoreA: 1, date: '2026-03-07', time: '11:30', round: 'U13 Groupe B', venue: 'Thomassin' },
  { home: 'PAC',      away: 'Fc MDM', scoreH: 1, scoreA: 4, date: '2026-03-14', time: '11:30', round: 'U13 Groupe B', venue: 'Thomassin' },
  { home: 'Valencia', away: 'PAC',    scoreH: 0, scoreA: 1, date: '2026-03-21', time: '10:00', round: 'U13 Groupe B', venue: 'Thomassin' },
  { home: 'Fc MDM',   away: 'ASF',    scoreH: 0, scoreA: 2, date: '2026-04-11', time: '11:00', round: 'U13 Groupe B', venue: 'Thomassin' },
];

async function run() {
  try {
    console.log('Cleaning existing U13 matches...');
    await q('DELETE FROM flagday_matches WHERE category_id = $1', [CAT_ID]);

    console.log('Inserting new U13 matches...');
    for (const m of matches) {
      const hId = await getTeamId(m.home);
      const aId = await getTeamId(m.away);
      if (hId && aId) {
        const kickoff = `${m.date}T${m.time.includes('h') ? m.time.replace('h', ':') : m.time}:00`;
        await q(
          `INSERT INTO flagday_matches (competition_id, category_id, home_team_id, away_team_id, home_score, away_score, round, status, kickoff, venue)
           VALUES ($1, $2, $3, $4, $5, $6, $7, 'finished', $8, $9)`,
          [MAIN_COMP_ID, CAT_ID, hId, aId, m.scoreH, m.scoreA, m.round, kickoff, m.venue]
        );
      } else {
        console.warn(`Skipping match: ${m.home} vs ${m.away} (Team not found)`);
      }
    }
    console.log('Done!');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

run();
