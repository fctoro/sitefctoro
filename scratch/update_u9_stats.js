const { Client } = require('pg');
const fs = require('fs');

function getEnv(key) {
  try {
    const env = fs.readFileSync('.env.local', 'utf8');
    const lines = env.split('\n');
    for (const line of lines) {
      if (line.startsWith(key + '=')) {
        return line.split('=')[1].trim().replace(/^"|"$/g, '');
      }
    }
  } catch (e) {}
  return process.env[key];
}

async function run() {
  const dbUrl = getEnv('DATABASE_URL');
  const client = new Client({ connectionString: dbUrl });
  await client.connect();

  async function getOrCreateCategory(name) {
    const res = await client.query('SELECT id FROM flagday_categories WHERE name = $1', [name]);
    if (res.rows.length > 0) return res.rows[0].id;
    const insert = await client.query('INSERT INTO flagday_categories (name, slug) VALUES ($1, $2) RETURNING id', [name, name.toLowerCase()]);
    return insert.rows[0].id;
  }

  async function getOrCreateTeam(name) {
    const res = await client.query('SELECT id FROM flagday_teams WHERE name ILIKE $1', [name]);
    if (res.rows.length > 0) return res.rows[0].id;
    const insert = await client.query('INSERT INTO flagday_teams (name, slug) VALUES ($1, $2) RETURNING id', [name, name.toLowerCase().replace(/\s+/g, '-')]);
    return insert.rows[0].id;
  }

  const categoryId = await getOrCreateCategory('U9');
  console.log('Category U9 ID:', categoryId);

  // Clear existing data for U9
  await client.query('DELETE FROM flagday_standings WHERE category_id = $1', [categoryId]);
  await client.query('DELETE FROM flagday_top_scorers WHERE category_id = $1', [categoryId]);

  // --- STANDINGS ---
  const standings = [
    // Group A
    { name: 'Fc Toro Elite', group: 'Groupe A', pts: 6, m: 2, v: 2, n: 0, d: 0, bm: 7, bc: 0, rank: 1, qual: true },
    { name: 'CSP', pts: 4, group: 'Groupe A', m: 2, v: 1, n: 1, d: 0, bm: 2, bc: 1, rank: 2, qual: true },
    { name: 'Fc Colonne', group: 'Groupe A', pts: 1, m: 2, v: 0, n: 1, d: 1, bm: 0, bc: 3, rank: 3, qual: false },
    { name: 'PAC', group: 'Groupe A', pts: 0, m: 2, v: 0, n: 0, d: 2, bm: 1, bc: 6, rank: 4, qual: false },
    // Group B
    { name: 'ASF', group: 'Groupe B', pts: 4, m: 2, v: 1, n: 1, d: 0, bm: 1, bc: 0, rank: 1, qual: true },
    { name: 'Jacot FP', group: 'Groupe B', pts: 2, m: 2, v: 0, n: 2, d: 0, bm: 0, bc: 0, rank: 2, qual: false },
    { name: 'Condor EF', group: 'Groupe B', pts: 1, m: 1, v: 0, n: 1, d: 0, bm: 0, bc: 0, rank: 3, qual: false },
    { name: 'Valencia', group: 'Groupe B', pts: 0, m: 1, v: 0, n: 0, d: 1, bm: 0, bc: 1, rank: 4, qual: false }
  ];

  for (const s of standings) {
    const teamId = await getOrCreateTeam(s.name);
    await client.query(`
      INSERT INTO flagday_standings 
      (category_id, team_id, group_name, played, won, drawn, lost, goals_for, goals_against, points, rank_position, is_qualified)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `, [categoryId, teamId, s.group, s.m, s.v, s.n, s.d, s.bm, s.bc, s.pts, s.rank, s.qual]);
  }
  console.log('Standings updated.');

  // --- SCORERS ---
  const scorers = [
    { name: 'Mathis Louis', goals: 3, team: 'Fc Toro Elite' },
    { name: 'Angelson Fils Aime', goals: 2, team: 'Fc Toro Elite' },
    { name: 'David Edouard Sampeur', goals: 1, team: 'ASF' },
    { name: 'Nicolas Bazane', goals: 1, team: 'CSP' }
  ];

  for (const sc of scorers) {
    await client.query(`
      INSERT INTO flagday_top_scorers (category_id, player_name, team_name, goals)
      VALUES ($1, $2, $3, $4)
    `, [categoryId, sc.name, sc.team, sc.goals]);
  }
  console.log('Scorers updated.');

  await client.end();
}

run().catch(console.error);
