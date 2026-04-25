/**
 * seed-u9.js — Insère les données U9 dans la DB
 */
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [key, ...vals] = line.split('=');
    if (key && vals.length) process.env[key.trim()] = vals.join('=').trim();
  });
}
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function query(sql, params = []) {
  const client = await pool.connect();
  try { return await client.query(sql, params); }
  finally { client.release(); }
}

function toSlug(name) {
  return name.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const U9_DATA = {
  groups: {
    A: [
      { name: 'Fc Toro Elite', pts: 6, m: 2, v: 2, n: 0, d: 0, bm: 7, bc: 0, df: 7,  qualified: true  },
      { name: 'CSP',           pts: 4, m: 2, v: 1, n: 1, d: 0, bm: 2, bc: 1, df: 1,  qualified: true  },
      { name: 'Fc Colonne',    pts: 1, m: 2, v: 0, n: 1, d: 1, bm: 0, bc: 3, df: -3, qualified: false },
      { name: 'PAC',           pts: 0, m: 2, v: 0, n: 0, d: 2, bm: 1, bc: 6, df: -5, qualified: false },
    ],
    B: [
      { name: 'ASF',      pts: 4, m: 2, v: 1, n: 1, d: 0, bm: 1, bc: 0, df: 1,  qualified: true  },
      { name: 'Jacot FP', pts: 2, m: 2, v: 0, n: 2, d: 0, bm: 0, bc: 0, df: 0,  qualified: true  },
      { name: 'Condor EF',pts: 1, m: 1, v: 0, n: 1, d: 0, bm: 0, bc: 0, df: 0,  qualified: false },
      { name: 'Valencia', pts: 0, m: 1, v: 0, n: 0, d: 1, bm: 0, bc: 1, df: -1, qualified: false },
    ],
  },
  scorers: [
    { name: 'Mathis Louis',          goals: 3, team: 'Fc Toro Elite' },
    { name: 'Angelson Fils Aime',    goals: 2, team: 'Fc Toro Elite' },
    { name: 'David Edouard Sampeur', goals: 1, team: 'ASF'           },
    { name: 'Nicolas Bazane',        goals: 1, team: 'CSP'           },
  ],
};

async function upsertTeam(name) {
  const { rows: existing } = await query(`SELECT id FROM flagday_teams WHERE name = $1`, [name]);
  if (existing.length > 0) return existing[0].id;
  const slug = toSlug(name);
  const { rows: slugCheck } = await query(`SELECT id FROM flagday_teams WHERE slug = $1`, [slug]);
  const finalSlug = slugCheck.length > 0 ? `${slug}-${Date.now()}` : slug;
  const { rows } = await query(`INSERT INTO flagday_teams (name, slug) VALUES ($1, $2) RETURNING id`, [name, finalSlug]);
  return rows[0].id;
}

async function main() {
  console.log('🚀 Seed U9...\n');

  // 1. Competition
  const slug = 'flag-day-2025-u9';
  let compId;
  const { rows: existComp } = await query(`SELECT id FROM flagday_competitions WHERE slug = $1`, [slug]);
  if (existComp.length > 0) {
    compId = existComp[0].id;
    await query(`UPDATE flagday_competitions SET is_published=true, active=true WHERE id=$1`, [compId]);
    console.log(`  ✔ Competition existante : ${compId}`);
  } else {
    const { rows } = await query(
      `INSERT INTO flagday_competitions (name, slug, season, age_category, is_published, active, sort_order)
       VALUES ('Flag Day 2025 - U9','flag-day-2025-u9','2025','U9',true,true,0) RETURNING id`
    );
    compId = rows[0].id;
    console.log(`  ✔ Competition créée : ${compId}`);
  }

  // 2. Category
  let catId;
  const { rows: existCat } = await query(
    `SELECT id FROM flagday_categories WHERE competition_id=$1 AND name='U9'`, [compId]
  );
  if (existCat.length > 0) {
    catId = existCat[0].id;
    console.log(`  ✔ Category existante : ${catId}`);
  } else {
    const { rows } = await query(
      `INSERT INTO flagday_categories (competition_id, name, sort_order, active) VALUES ($1,'U9',1,true) RETURNING id`,
      [compId]
    );
    catId = rows[0].id;
    console.log(`  ✔ Category créée : ${catId}`);
  }

  // 3. Teams + Standings
  for (const group of ['A', 'B']) {
    const rows = U9_DATA.groups[group];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const teamId = await upsertTeam(row.name);

      const { rows: existStanding } = await query(
        `SELECT id FROM flagday_standings WHERE category_id=$1 AND team_id=$2`, [catId, teamId]
      );
      if (existStanding.length > 0) {
        await query(
          `UPDATE flagday_standings SET group_name=$1, stage='group', played=$2, won=$3, drawn=$4,
           lost=$5, goals_for=$6, goals_against=$7, points=$8, rank_position=$9, is_qualified=$10
           WHERE id=$11`,
          [group, row.m, row.v, row.n, row.d, row.bm, row.bc, row.pts, i+1, row.qualified, existStanding[0].id]
        );
      } else {
        await query(
          `INSERT INTO flagday_standings (category_id, team_id, group_name, stage, played, won, drawn, lost,
           goals_for, goals_against, points, rank_position, is_qualified)
           VALUES ($1,$2,$3,'group',$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
          [catId, teamId, group, row.m, row.v, row.n, row.d, row.bm, row.bc, row.pts, i+1, row.qualified]
        );
      }
      console.log(`  Groupe ${group} [${i+1}] ${row.qualified ? '✅' : '  '} ${row.name} — ${row.pts} pts`);
    }
  }

  // 4. Scorers
  console.log('\n  📊 Buteurs...');
  for (const scorer of U9_DATA.scorers) {
    const { rows: existScorer } = await query(
      `SELECT id FROM flagday_top_scorers WHERE category_id=$1 AND player_name=$2`, [catId, scorer.name]
    );
    if (existScorer.length > 0) {
      await query(`UPDATE flagday_top_scorers SET goals=$1, team_name=$2 WHERE id=$3`, [scorer.goals, scorer.team, existScorer[0].id]);
    } else {
      await query(
        `INSERT INTO flagday_top_scorers (category_id, player_name, goals, team_name) VALUES ($1,$2,$3,$4)`,
        [catId, scorer.name, scorer.goals, scorer.team]
      );
    }
    console.log(`    ⚽ ${scorer.name} (${scorer.team}) — ${scorer.goals} buts`);
  }

  console.log('\n✅ U9 terminé !');
  await pool.end();
}

main().catch(err => { console.error('❌', err.message); process.exit(1); });
