
const { pool } = require('../lib/db');

async function run() {
  const catId = '202da22e-cbf9-4848-a309-b971a1b65616';
  const compId = 'c972aad9-67d1-4afa-82a5-03e9daacf269';

  const matches = [
    // Group A
    { home: 'Fc Toro Elite', away: 'Fc Colonne', date: '2026-02-28', time: '10:30', scoreH: 3, scoreA: 0, round: 'U9 Groupe A' },
    { home: 'CSP', away: 'PAC', date: '2026-03-14', time: '10:30', scoreH: 2, scoreA: 1, round: 'U9 Groupe A' },
    { home: 'Fc Toro Elite', away: 'CSP', date: '2026-04-18', time: '10:30', scoreH: 5, scoreA: 0, round: 'U9 Groupe A' },
    { home: 'PAC', away: 'Fc Colonne', date: '2026-04-18', time: '10:30', scoreH: 0, scoreA: 4, round: 'U9 Groupe A' },
    { home: 'Fc Toro Elite', away: 'PAC', date: '2026-03-28', time: '10:30', scoreH: 4, scoreA: 0, round: 'U9 Groupe A' },
    { home: 'CSP', away: 'Fc Colonne', date: '2026-04-11', time: '10:30', scoreH: 0, scoreA: 0, round: 'U9 Groupe A' },
    // Group B
    { home: 'JACOT', away: 'Fc Condor', date: '2026-02-28', time: '10:30', scoreH: 0, scoreA: 0, round: 'U9 Groupe B' },
    { home: 'Valencia', away: 'ASF', date: '2026-03-14', time: '10:30', scoreH: 0, scoreA: 1, round: 'U9 Groupe B' },
    { home: 'JACOT', away: 'ASF', date: '2026-03-28', time: '10:30', scoreH: 0, scoreA: 0, round: 'U9 Groupe B' },
    { home: 'Fc Condor', away: 'Valencia', date: '2026-04-11', time: '10:30', scoreH: 1, scoreA: 1, round: 'U9 Groupe B' },
    { home: 'JACOT', away: 'Valencia', date: '2026-04-18', time: '10:30', scoreH: 1, scoreA: 1, round: 'U9 Groupe B' },
    { home: 'ASF', away: 'Fc Condor', date: '2026-04-18', time: '10:30', scoreH: 1, scoreA: 0, round: 'U9 Groupe B' },
  ];

  async function getTeamId(name) {
    const res = await pool.query('SELECT id FROM flagday_teams WHERE name ILIKE $1', [name]);
    if (res.rows.length === 0) throw new Error(`Team not found: ${name}`);
    return res.rows[0].id;
  }

  try {
    console.log('Cleaning existing U9 matches...');
    await pool.query('DELETE FROM flagday_matches WHERE category_id = $1', [catId]);

    console.log('Inserting new U9 matches...');
    for (const m of matches) {
      const homeId = await getTeamId(m.home);
      const awayId = await getTeamId(m.away);
      const kickoff = `${m.date}T${m.time}:00`;
      
      await pool.query(`
        INSERT INTO flagday_matches (competition_id, category_id, round, kickoff, status, home_team_id, away_team_id, home_score, away_score, venue)
        VALUES ($1, $2, $3, $4, 'finished', $5, $6, $7, $8, 'Ste Thérèse')
      `, [compId, catId, m.round, kickoff, homeId, awayId, m.scoreH, m.scoreA]);
    }
    console.log('Done!');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

run();
