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
  { home: 'Fc Toro Elite', away: 'Fc Flambo', scoreH: 3, scoreA: 0, date: '2026-04-03', time: '17:00', round: 'U21 Groupe A', venue: 'Ste Thérèse' },
  { home: 'Ade 30',        away: 'SLG',       scoreH: 1, scoreA: 1, date: '2026-04-10', time: '17:00', round: 'U21 Groupe A', venue: 'Ste Thérèse' },
  { home: 'Fc Toro Elite', away: 'Ade 30',    scoreH: 1, scoreA: 2, date: '2026-02-13', time: '16:30', round: 'U21 Groupe A', venue: 'Ste Thérèse' },
  { home: 'SLG',           away: 'Fc Flambo', scoreH: 2, scoreA: 1, date: '2026-02-27', time: '17:00', round: 'U21 Groupe A', venue: 'Ste Thérèse' },
  { home: 'Fc Toro Elite', away: 'SLG',       scoreH: 3, scoreA: 0, date: '2026-03-13', time: '17:00', round: 'U21 Groupe A', venue: 'Ste Thérèse' },
  { home: 'Fc Flambo',     away: 'Ade 30',    scoreH: 0, scoreA: 1, date: '2026-03-25', time: '17:00', round: 'U21 Groupe A', venue: 'Ste Thérèse' },
  // Group B
  { home: 'VAC',           away: 'Ac Perfection', scoreH: 1, scoreA: 0, date: '2026-02-20', time: '17:00', round: 'U21 Groupe B', venue: 'Ste Thérèse' },
  { home: 'Jacot',         away: 'Aigle noir',    scoreH: 2, scoreA: 4, date: '2026-03-06', time: '17:00', round: 'U21 Groupe B', venue: 'Ste Thérèse' },
  { home: 'VAC',           away: 'Aigle noir',    scoreH: 0, scoreA: 0, date: '2026-03-20', time: '17:00', round: 'U21 Groupe B', venue: 'Ste Thérèse' },
  { home: 'Jacot',         away: 'Ac Perfection', scoreH: 2, scoreA: 1, date: '2026-03-27', time: '17:00', round: 'U21 Groupe B', venue: 'Ste Thérèse' },
  { home: 'VAC',           away: 'Jacot',         scoreH: 3, scoreA: 0, date: '2026-04-08', time: '17:00', round: 'U21 Groupe B', venue: 'Ste Thérèse' },
  { home: 'Ac Perfection', away: 'Aigle noir',    scoreH: 1, scoreA: 5, date: '2026-04-17', time: '17:00', round: 'U21 Groupe B', venue: 'Ste Thérèse' },
];

async function run() {
  try {
    const { rows: comps } = await q("SELECT id FROM flagday_competitions WHERE slug = 'flag-day-2026'");
    if (!comps.length) throw new Error("No competition found");
    const compId = comps[0].id;
    
    const { rows: cats } = await q("SELECT id FROM flagday_categories WHERE competition_id = $1 AND name = 'U21'", [compId]);
    if (!cats.length) throw new Error("No U21 category found");
    const catId = cats[0].id;

    console.log('Cleaning existing U21 matches...');
    await q('DELETE FROM flagday_matches WHERE category_id = $1', [catId]);

    console.log('Inserting new U21 matches...');
    for (const m of matches) {
      let hId = await getTeamId(m.home);
      let aId = await getTeamId(m.away);

      if (!hId && m.home === 'Ade 30') hId = await getTeamId('ADE30');
      if (!aId && m.away === 'Ade 30') aId = await getTeamId('ADE30');

      if (!hId && m.home === 'SLG') hId = await getTeamId('Saint Louis de G');
      if (!aId && m.away === 'SLG') aId = await getTeamId('Saint Louis de G');

      if (!hId && m.home === 'Aigle noir') hId = await getTeamId('Aigle Noir');
      if (!aId && m.away === 'Aigle noir') aId = await getTeamId('Aigle Noir');

      if (!hId && m.home === 'VAC') hId = await getTeamId('Violette AC');
      if (!aId && m.away === 'VAC') aId = await getTeamId('Violette AC');

      if (!hId && m.home === 'Ac Perfection') hId = await getTeamId('Academie Perf');
      if (!aId && m.away === 'Ac Perfection') aId = await getTeamId('Academie Perf');

      if (!hId && m.home === 'Jacot') hId = await getTeamId('Jacot F.P');
      if (!aId && m.away === 'Jacot') aId = await getTeamId('Jacot F.P');


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
