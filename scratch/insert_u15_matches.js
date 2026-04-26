const { pool } = require('../lib/db');

async function q(sql, params = []) {
  const c = await pool.connect();
  try { return await c.query(sql, params); } finally { c.release(); }
}

async function getTeamId(name) {
  const res = await q('SELECT id FROM flagday_teams WHERE name ILIKE $1', [name]);
  if (res.rows.length) return res.rows[0].id;
  return null;
}

const matches = [
  // Group A
  { home: 'Fc Toro Elite', away: 'Idelo FC',  scoreH: 2, scoreA: 0, date: '2026-02-22', time: '10:00', round: 'U15 Groupe A', venue: 'Thomassin' },
  { home: 'ASF',           away: 'Legend EF', scoreH: 1, scoreA: 0, date: '2026-03-01', time: '10:00', round: 'U15 Groupe A', venue: 'Thomassin' },
  { home: 'Fc Toro Elite', away: 'Legend EF', scoreH: 2, scoreA: 0, date: '2026-03-14', time: '10:30', round: 'U15 Groupe A', venue: 'Ste Thérèse' },
  { home: 'ASF',           away: 'Idelo FC',  scoreH: 0, scoreA: 3, date: '2026-03-22', time: '10:00', round: 'U15 Groupe A', venue: 'Thomassin' },
  { home: 'Fc Toro Elite', away: 'ASF',       scoreH: 2, scoreA: 0, date: '2026-03-29', time: '10:00', round: 'U15 Groupe A', venue: 'Thomassin' },
  { home: 'Idelo FC',      away: 'Legend EF', scoreH: 2, scoreA: 1, date: '2026-04-18', time: '10:00', round: 'U15 Groupe A', venue: 'Thomassin' },
  // Group B
  { home: 'Fc Flambo', away: 'Fc MDM',     scoreH: 1, scoreA: 0, date: '2026-02-21', time: '10:00', round: 'U15 Groupe B', venue: 'Thomassin' },
  { home: 'Condor',    away: 'Fc Toro PV', scoreH: 0, scoreA: 0, date: '2026-03-01', time: '11:00', round: 'U15 Groupe B', venue: 'Thomassin' },
  { home: 'Fc Flambo', away: 'Fc Toro PV', scoreH: 0, scoreA: 1, date: '2026-03-14', time: '12:00', round: 'U15 Groupe B', venue: 'Ste Thérèse' },
  { home: 'Condor',    away: 'Fc MDM',     scoreH: 6, scoreA: 1, date: '2026-03-22', time: '11:00', round: 'U15 Groupe B', venue: 'Thomassin' },
  { home: 'Fc Flambo', away: 'Condor',     scoreH: 1, scoreA: 2, date: '2026-03-29', time: '11:00', round: 'U15 Groupe B', venue: 'Thomassin' },
  { home: 'Fc MDM',    away: 'Fc Toro PV', scoreH: 0, scoreA: 0, date: '2026-04-18', time: '11:00', round: 'U15 Groupe B', venue: 'Thomassin' },
];

async function run() {
  try {
    const { rows: comps } = await q("SELECT id FROM flagday_competitions WHERE slug = 'flag-day-2026'");
    if (!comps.length) throw new Error("No competition found");
    const compId = comps[0].id;
    
    const { rows: cats } = await q("SELECT id FROM flagday_categories WHERE competition_id = $1 AND name = 'U15'", [compId]);
    if (!cats.length) throw new Error("No U15 category found");
    const catId = cats[0].id;

    console.log('Cleaning existing U15 matches...');
    await q('DELETE FROM flagday_matches WHERE category_id = $1', [catId]);

    console.log('Inserting new U15 matches...');
    for (const m of matches) {
      let hId = await getTeamId(m.home);
      let aId = await getTeamId(m.away);

      if (!hId && m.home === 'Legend EF') hId = await getTeamId('Fc Legend');
      if (!aId && m.away === 'Legend EF') aId = await getTeamId('Fc Legend');
      
      if (!hId && m.home === 'Condor') hId = await getTeamId('Fc Condor');
      if (!aId && m.away === 'Condor') aId = await getTeamId('Fc Condor');

      if (!hId && m.home === 'Idelo FC') hId = await getTeamId('Fc Idelo');
      if (!aId && m.away === 'Idelo FC') aId = await getTeamId('Fc Idelo');

      if (!hId || !aId) {
        console.warn(`Skipping match: ${m.home} vs ${m.away} (Team not found, home=${hId}, away=${aId})`);
        continue;
      }
      
      const kickoff = `${m.date}T${m.time}:00`;
      await q(
        `INSERT INTO flagday_matches (competition_id, category_id, home_team_id, away_team_id, home_score, away_score, round, status, kickoff, venue)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'finished', $8, $9)`,
        [compId, catId, hId, aId, m.scoreH, m.scoreA, m.round, kickoff, m.venue]
      );
    }
    console.log('Done!');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

run();
