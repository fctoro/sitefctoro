/**
 * seed-flagday.js
 * Insère toutes les données Flag Day (U11, U13, U15, U17, U21) dans la base Supabase.
 * Usage: node scripts/seed-flagday.js
 */

// Lire .env.local manuellement
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

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ─── DONNÉES ──────────────────────────────────────────────────────────────────

const CATEGORIES = ['U11', 'U13', 'U15', 'U17', 'U21'];

const DATA = {
  U11: {
    groups: {
      A: [
        { name: 'Fc Toro Elite', pts: 6, m: 2, v: 2, n: 0, d: 0, bm: 8, bc: 0, df: 8,  qualified: true  },
        { name: 'AST',           pts: 3, m: 2, v: 1, n: 0, d: 1, bm: 2, bc: 2, df: 0,  qualified: true  },
        { name: 'Fc Toro PV',    pts: 1, m: 2, v: 0, n: 1, d: 1, bm: 0, bc: 2, df: -2, qualified: false },
        { name: 'Valencia',      pts: 1, m: 2, v: 0, n: 1, d: 1, bm: 0, bc: 6, df: -6, qualified: false },
      ],
      B: [
        { name: 'FC MDM',          pts: 6, m: 2, v: 2, n: 0, d: 0, bm: 4, bc: 1, df: 3,  qualified: true  },
        { name: 'Star des Jeunes', pts: 4, m: 2, v: 1, n: 1, d: 0, bm: 4, bc: 3, df: 1,  qualified: true  },
        { name: 'ASF',             pts: 1, m: 2, v: 0, n: 1, d: 1, bm: 1, bc: 2, df: -1, qualified: false },
        { name: 'Jacot F Passion', pts: 0, m: 2, v: 0, n: 0, d: 2, bm: 3, bc: 6, df: -3, qualified: false },
      ],
    },
    scorers: [
      { name: 'Momplaisir Tristen',  goals: 3, team: 'Fc Toro Elite'   },
      { name: 'Fenelon Levidson',    goals: 3, team: 'Star des Jeunes' },
      { name: 'Jules Giovanni',      goals: 2, team: 'Fc Toro Elite'   },
      { name: 'Bolivard Rolph Davens', goals: 2, team: 'FC MDM'        },
    ],
  },
  U13: {
    groups: {
      A: [
        { name: 'Fc Toro Elite', pts: 7, m: 3, v: 2, n: 1, d: 0, bm: 7, bc: 2,  df: 5,  qualified: true  },
        { name: 'Fc Seth',       pts: 4, m: 3, v: 1, n: 1, d: 1, bm: 3, bc: 3,  df: 0,  qualified: true  },
        { name: 'Perfection',    pts: 3, m: 2, v: 1, n: 0, d: 1, bm: 1, bc: 3,  df: -2, qualified: false },
        { name: 'Fc Flambo',     pts: 0, m: 2, v: 0, n: 0, d: 2, bm: 2, bc: 5,  df: -3, qualified: false },
      ],
      B: [
        { name: 'ASF',     pts: 6, m: 2, v: 2, n: 0, d: 0, bm: 8, bc: 1,  df: 7,  qualified: true  },
        { name: 'FC MDM',  pts: 6, m: 2, v: 2, n: 0, d: 0, bm: 7, bc: 3,  df: 4,  qualified: true  },
        { name: 'PAC',     pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 3, bc: 11, df: -8, qualified: true  },
        { name: 'Valencia',pts: 0, m: 3, v: 0, n: 0, d: 3, bm: 2, bc: 5,  df: -3, qualified: false },
      ],
    },
    scorers: [
      { name: 'Richemond Kerry',    goals: 4, team: 'FC MDM'       },
      { name: 'Gamael Ricardens',   goals: 4, team: 'ASF'          },
      { name: 'Jerry Petit Homme',  goals: 3, team: 'Fc Toro Elite'},
      { name: 'Dieudonne Kenson',   goals: 2, team: 'Fc Toro Elite'},
    ],
  },
  U15: {
    groups: {
      A: [
        { name: 'Fc Toro Elite', pts: 6, m: 3, v: 2, n: 0, d: 1, bm: 4, bc: 2, df: 2,  qualified: true  },
        { name: 'ASF',           pts: 6, m: 3, v: 2, n: 0, d: 1, bm: 3, bc: 3, df: 0,  qualified: true  },
        { name: 'Idelo FC',      pts: 3, m: 2, v: 1, n: 0, d: 1, bm: 3, bc: 2, df: 1,  qualified: false },
        { name: 'Legend EF',     pts: 0, m: 2, v: 0, n: 0, d: 2, bm: 0, bc: 3, df: -3, qualified: false },
      ],
      B: [
        { name: 'Condor',    pts: 7, m: 3, v: 2, n: 1, d: 0, bm: 8, bc: 2, df: 6,  qualified: true  },
        { name: 'Fc Toro PV',pts: 4, m: 2, v: 0, n: 1, d: 0, bm: 1, bc: 0, df: 1,  qualified: true  },
        { name: 'Fc Flambo', pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 2, bc: 3, df: -1, qualified: false },
        { name: 'Fc MDM',    pts: 0, m: 2, v: 0, n: 0, d: 2, bm: 1, bc: 7, df: -6, qualified: false },
      ],
    },
    scorers: [
      { name: 'Charles Colson', goals: 3, team: 'Condor EF'    },
      { name: 'Jeudi Wubens',   goals: 2, team: 'ASF'          },
      { name: 'Perrin Dylan',   goals: 1, team: 'Fc Toro Elite'},
      { name: 'Messie Israel',  goals: 1, team: 'Idelo'        },
    ],
  },
  U17: {
    groups: {
      A: [
        { name: 'Fc Toro Elite', pts: 6, m: 3, v: 2, n: 0, d: 1, bm: 4, bc: 3, df: 1,  qualified: true  },
        { name: 'SLG',           pts: 3, m: 2, v: 1, n: 0, d: 1, bm: 5, bc: 4, df: 1,  qualified: false },
        { name: 'Condor EF',     pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 4, bc: 4, df: 0,  qualified: false },
        { name: 'Idelo',         pts: 3, m: 2, v: 1, n: 0, d: 1, bm: 1, bc: 3, df: -2, qualified: false },
      ],
      B: [
        { name: 'Star des Jeunes', pts: 9, m: 3, v: 3, n: 0, d: 0, bm: 4, bc: 0, df: 4,  qualified: true  },
        { name: 'Rev United',      pts: 3, m: 2, v: 1, n: 0, d: 1, bm: 2, bc: 2, df: 0,  qualified: false },
        { name: 'Fc Seth',         pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 2, bc: 3, df: 1,  qualified: false },
        { name: 'Legend EF',       pts: 0, m: 2, v: 0, n: 0, d: 2, bm: 0, bc: 3, df: -3, qualified: false },
      ],
    },
    scorers: [
      { name: 'Bob Philias',         goals: 3, team: 'SLG'             },
      { name: 'Dumay Fernando',       goals: 2, team: 'Star des Jeunes' },
      { name: 'Paul Emerson',         goals: 2, team: 'Fc Toro Elite'   },
      { name: 'Charles Christopher',  goals: 1, team: 'Idelo FC'        },
    ],
  },
  U21: {
    groups: {
      A: [
        { name: 'Fc Toro Elite',  pts: 6, m: 3, v: 2, n: 0, d: 1, bm: 7, bc: 2, df: 5,  qualified: true  },
        { name: 'ADE30',          pts: 6, m: 2, v: 2, n: 0, d: 0, bm: 3, bc: 1, df: 2,  qualified: true  },
        { name: 'Saint Louis de G',pts: 3, m: 2, v: 1, n: 0, d: 1, bm: 2, bc: 4, df: -2, qualified: false },
        { name: 'Fc Flambo',      pts: 0, m: 3, v: 0, n: 0, d: 3, bm: 1, bc: 6, df: -5, qualified: false },
      ],
      B: [
        { name: 'Aigle Noir',    pts: 4, m: 2, v: 1, n: 1, d: 0, bm: 4, bc: 2, df: 2,  qualified: true  },
        { name: 'Violette AC',   pts: 4, m: 2, v: 1, n: 1, d: 0, bm: 1, bc: 0, df: 1,  qualified: true  },
        { name: 'Academie Perf', pts: 3, m: 2, v: 1, n: 0, d: 1, bm: 2, bc: 2, df: 0,  qualified: false },
        { name: 'Jacot F.P',     pts: 0, m: 2, v: 0, n: 0, d: 2, bm: 3, bc: 6, df: -3, qualified: false },
      ],
    },
    scorers: [
      { name: 'Paul Jefferson',     goals: 2, team: 'Fc Toro Elite' },
      { name: 'Jeanty Maxime',      goals: 1, team: 'Violette AC'   },
      { name: 'Merger Stanley',     goals: 1, team: 'ADE30'         },
      { name: 'Thierry Danilo Luca',goals: 1, team: 'SLG'           },
    ],
  },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

async function query(sql, params = []) {
  const client = await pool.connect();
  try {
    return await client.query(sql, params);
  } finally {
    client.release();
  }
}

function toSlug(name) {
  return name.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function upsertTeam(name) {
  const slug = toSlug(name);
  // Try SELECT first to avoid conflict issues
  const { rows: existing } = await query(
    `SELECT id FROM flagday_teams WHERE name = $1`, [name]
  );
  if (existing.length > 0) return existing[0].id;

  // Check slug conflict and make unique if needed
  const { rows: slugCheck } = await query(
    `SELECT id FROM flagday_teams WHERE slug = $1`, [slug]
  );
  const finalSlug = slugCheck.length > 0 ? `${slug}-${Date.now()}` : slug;

  const { rows } = await query(
    `INSERT INTO flagday_teams (name, slug) VALUES ($1, $2) RETURNING id`,
    [name, finalSlug]
  );
  return rows[0].id;
}

async function getOrCreateCompetition(category) {
  const slug = `flag-day-2025-${category.toLowerCase()}`;
  const { rows } = await query(
    `INSERT INTO flagday_competitions (name, slug, season, age_category, is_published, active, sort_order)
     VALUES ($1, $2, '2025', $3, true, true, $4)
     ON CONFLICT (slug) DO UPDATE SET
       name = EXCLUDED.name,
       age_category = EXCLUDED.age_category,
       is_published = true,
       active = true
     RETURNING id`,
    [`Flag Day 2025 - ${category}`, slug, category, CATEGORIES.indexOf(category) + 1]
  );
  return rows[0].id;
}

async function getOrCreateCategory(competitionId, categoryName) {
  // Vérifier si existe déjà
  const { rows: existing } = await query(
    `SELECT id FROM flagday_categories WHERE competition_id = $1 AND name = $2`,
    [competitionId, categoryName]
  );
  if (existing.length > 0) return existing[0].id;

  const { rows } = await query(
    `INSERT INTO flagday_categories (competition_id, name, sort_order, active)
     VALUES ($1, $2, 1, true) RETURNING id`,
    [competitionId, categoryName]
  );
  return rows[0].id;
}

async function upsertStanding(categoryId, teamId, group, data, rank) {
  const { rows: existing } = await query(
    `SELECT id FROM flagday_standings WHERE category_id = $1 AND team_id = $2`,
    [categoryId, teamId]
  );

  if (existing.length > 0) {
    await query(
      `UPDATE flagday_standings SET
         group_name = $1, stage = 'group', played = $2, won = $3, drawn = $4,
         lost = $5, goals_for = $6, goals_against = $7, points = $8,
         rank_position = $9, is_qualified = $10
       WHERE id = $11`,
      [group, data.m, data.v, data.n, data.d, data.bm, data.bc,
       data.pts, rank, data.qualified, existing[0].id]
    );
  } else {
    await query(
      `INSERT INTO flagday_standings
         (category_id, team_id, group_name, stage, played, won, drawn, lost,
          goals_for, goals_against, points, rank_position, is_qualified)
       VALUES ($1,$2,$3,'group',$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [categoryId, teamId, group, data.m, data.v, data.n, data.d,
       data.bm, data.bc, data.pts, rank, data.qualified]
    );
  }
}

async function upsertScorer(categoryId, playerName, goals, teamName) {
  const { rows: existing } = await query(
    `SELECT id FROM flagday_top_scorers WHERE category_id = $1 AND player_name = $2`,
    [categoryId, playerName]
  );
  if (existing.length > 0) {
    await query(
      `UPDATE flagday_top_scorers SET goals = $1, team_name = $2 WHERE id = $3`,
      [goals, teamName, existing[0].id]
    );
  } else {
    await query(
      `INSERT INTO flagday_top_scorers (category_id, player_name, goals, team_name)
       VALUES ($1, $2, $3, $4)`,
      [categoryId, playerName, goals, teamName]
    );
  }
}

// ─── TABLES DDL ───────────────────────────────────────────────────────────────

async function ensureTables() {
  console.log('📦 Vérification / création des tables...');

  await query(`
    CREATE TABLE IF NOT EXISTS flagday_teams (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name       TEXT NOT NULL UNIQUE,
      logo_url   TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS flagday_competitions (
      id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name         TEXT,
      slug         TEXT UNIQUE,
      season       TEXT,
      age_category TEXT,
      description  TEXT,
      logo_url     TEXT,
      is_published BOOLEAN DEFAULT false,
      active       BOOLEAN DEFAULT true,
      sort_order   INTEGER,
      status       TEXT DEFAULT 'active',
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS flagday_categories (
      id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      competition_id UUID NOT NULL REFERENCES flagday_competitions(id) ON DELETE CASCADE,
      name           TEXT,
      sort_order     INTEGER,
      active         BOOLEAN DEFAULT true,
      UNIQUE (competition_id, name)
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS flagday_matches (
      id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      competition_id UUID NOT NULL REFERENCES flagday_competitions(id) ON DELETE CASCADE,
      home_team_id   UUID REFERENCES flagday_teams(id),
      away_team_id   UUID REFERENCES flagday_teams(id),
      home_score     INTEGER,
      away_score     INTEGER,
      round          TEXT,
      kickoff        TIMESTAMPTZ,
      status         TEXT DEFAULT 'finished',
      venue          TEXT,
      notes          TEXT,
      featured       BOOLEAN DEFAULT false,
      sort_order     INTEGER,
      created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS flagday_standings (
      id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      category_id    UUID NOT NULL REFERENCES flagday_categories(id) ON DELETE CASCADE,
      team_id        UUID NOT NULL REFERENCES flagday_teams(id),
      group_name     TEXT,
      stage          TEXT,
      played         INTEGER DEFAULT 0,
      won            INTEGER DEFAULT 0,
      drawn          INTEGER DEFAULT 0,
      lost           INTEGER DEFAULT 0,
      goals_for      INTEGER DEFAULT 0,
      goals_against  INTEGER DEFAULT 0,
      points         INTEGER DEFAULT 0,
      rank_position  INTEGER,
      is_qualified   BOOLEAN DEFAULT false,
      UNIQUE (category_id, team_id)
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS flagday_top_scorers (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      category_id UUID NOT NULL REFERENCES flagday_categories(id) ON DELETE CASCADE,
      player_name TEXT NOT NULL,
      goals       INTEGER DEFAULT 0,
      team_name   TEXT,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (category_id, player_name)
    )
  `);

  console.log('✅ Tables prêtes.\n');
}

// ─── SEED ─────────────────────────────────────────────────────────────────────

async function seedCategory(cat) {
  console.log(`\n🏆 Traitement de la catégorie : ${cat}`);
  const catData = DATA[cat];

  // 1. Competition
  const competitionId = await getOrCreateCompetition(cat);
  console.log(`  ✔ Competition ID : ${competitionId}`);

  // 2. Category
  const categoryId = await getOrCreateCategory(competitionId, cat);
  console.log(`  ✔ Category ID    : ${categoryId}`);

  // 3. Teams + Standings
  for (const group of ['A', 'B']) {
    const rows = catData.groups[group];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const teamId = await upsertTeam(row.name);
      await upsertStanding(categoryId, teamId, group, row, i + 1);
      const q = row.qualified ? '✅ Qualifié' : '  ';
      console.log(`  Groupe ${group} [${i+1}] ${q} ${row.name} — ${row.pts} pts`);
    }
  }

  // 4. Scorers
  console.log(`  📊 Insertion des buteurs...`);
  for (const scorer of catData.scorers) {
    await upsertScorer(categoryId, scorer.name, scorer.goals, scorer.team);
    console.log(`    ⚽ ${scorer.name} (${scorer.team}) — ${scorer.goals} buts`);
  }
}

async function main() {
  console.log('🚀 Démarrage du seed Flag Day...\n');

  try {
    await ensureTables();

    for (const cat of CATEGORIES) {
      await seedCategory(cat);
    }

    console.log('\n\n✅ Seed terminé avec succès pour : ' + CATEGORIES.join(', '));
  } catch (err) {
    console.error('\n❌ Erreur :', err.message);
    console.error(err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
