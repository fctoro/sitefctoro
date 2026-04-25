/**
 * seed-all.js — Réinsère toutes les données Flag Day (U9, U11, U13, U15, U17, U21)
 * Avec Logos et Matchs.
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

async function q(sql, params = []) {
  const c = await pool.connect();
  try { return await c.query(sql, params); } finally { c.release(); }
}

function toSlug(name) {
  return name.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const logoMap = {
  'Fc Toro Elite': '/logos/FC-TORO.png',
  'Fc Toro Pv': '/logos/FC-TORO.png',
  'Fc Toro PV': '/logos/FC-TORO.png',
  'FC Toro Elite': '/logos/FC-TORO.png',
  'CSP': '/logos/CSP.png',
  'CPS': '/logos/CSP.png',
  'Fc Colonne': '/logos/FC COLOGNE.png',
  'PAC': '/logos/PAC.png',
  'JACOT': '/logos/JACOT FOOTBAL PASSION.png',
  'Jacot': '/logos/JACOT FOOTBAL PASSION.png',
  'Jacot F.P': '/logos/JACOT FOOTBAL PASSION.png',
  'Jacot FP': '/logos/JACOT FOOTBAL PASSION.png',
  'Jacot F Passion': '/logos/JACOT FOOTBAL PASSION.png',
  'Valencia': '/logos/VALENCIA.png',
  'Condor EF': '/logos/CONDOR EF.png',
  'Condor': '/logos/CONDOR EF.png',
  'Condor Ef': '/logos/CONDOR EF.png',
  'FC CONDOR': '/logos/CONDOR EF.png',
  'Fc Condor': '/logos/CONDOR EF.png',
  'Conddor': '/logos/CONDOR EF.png',
  'Conddor EF': '/logos/CONDOR EF.png',
  'Conddor Ef': '/logos/CONDOR EF.png',
  'ASF': '/logos/ASF.png',
  'AST': '/logos/AST.png',
  'FC MDM': '/logos/FCDM.png',
  'Fc MDM': '/logos/FCDM.png',
  'Stars des Jeunes': '/logos/STARS DES JEUNES.png',
  'Star des Jeunes': '/logos/STARS DES JEUNES.png',
  'Star des jeunes': '/logos/STARS DES JEUNES.png',
  'Fc Seth': '/logos/FC SETH.png',
  'Fc Flambo': '/logos/FC FLAMBO.png',
  'Perfection': '/logos/PERFECTION FC.png',
  'Academie Perf': '/logos/ACADEMIE PERFECTION.png',
  'Ac. Perfection': '/logos/ACADEMIE PERFECTION.png',
  'Ac Perfection': '/logos/ACADEMIE PERFECTION.png',
  'FC Perfection': '/logos/PERFECTION FC.png',
  'FC PERFECTION': '/logos/PERFECTION FC.png',
  'Fc Perfection': '/logos/PERFECTION FC.png',
  'Idelo FC': '/logos/IDELO FC.png',
  'Idelo': '/logos/IDELO FC.png',
  'FC IDELO': '/logos/IDELO FC.png',
  'Legend EF': '/logos/FC LEGENDS.png',
  'FC Legend': '/logos/FC LEGENDS.png',
  'FC LEGEND': '/logos/FC LEGENDS.png',
  'EF.LEGEND': '/logos/FC LEGENDS.png',
  'EF LEGEND': '/logos/FC LEGENDS.png',
  'SLG': '/logos/SLG ACADEMIE.png',
  'Saint Louis de G': '/logos/SLG ACADEMIE.png',
  'Rev United': '/logos/REV UNITED.png',
  'ADE30': '/logos/ADE30.png',
  'Ade 30': '/logos/ADE30.png',
  'Violette AC': '/logos/VIOLLETE.png',
  'Violette': '/logos/VIOLLETE.png',
  'VAC': '/logos/VIOLLETE.png',
  'Aigle Noir': '/logos/AIGLE NOIR.png',
  'Aigle noir': '/logos/AIGLE NOIR.png',
  'ANAC': '/logos/AIGLE NOIR.png',
};

const getLogo = (name) => {
  if (!name) return '/placeholder-logo.png';
  const trimmed = name.trim();
  if (logoMap[trimmed]) return logoMap[trimmed];
  const lowerName = trimmed.toLowerCase();
  const found = Object.keys(logoMap).find(key => key.toLowerCase() === lowerName);
  if (found) return logoMap[found];
  return '/placeholder-logo.png';
};

// ─── TOUTES LES DONNÉES ───────────────────────────────────────────────────────
const ALL_DATA = {
  U9: {
    sortOrder: 1,
    groups: {
      A: [
        { name: 'Fc Toro Elite', pts: 9, m: 3, v: 3, n: 0, d: 0, bm: 12, bc: 0, qualified: true  },
        { name: 'Fc Colonne',    pts: 4, m: 3, v: 1, n: 1, d: 1, bm: 4,  bc: 3, qualified: true  },
        { name: 'CSP',           pts: 4, m: 3, v: 1, n: 1, d: 1, bm: 2,  bc: 6, qualified: false },
        { name: 'PAC',           pts: 0, m: 3, v: 0, n: 0, d: 3, bm: 1,  bc: 10, qualified: false },
      ],
      B: [
        { name: 'ASF',        pts: 7, m: 3, v: 2, n: 1, d: 0, bm: 2,  bc: 0, qualified: true  },
        { name: 'JACOT',      pts: 3, m: 3, v: 0, n: 3, d: 0, bm: 1,  bc: 1, qualified: true  },
        { name: 'Fc Condor',  pts: 2, m: 3, v: 0, n: 2, d: 1, bm: 1,  bc: 2, qualified: false },
        { name: 'Valencia',   pts: 2, m: 3, v: 0, n: 2, d: 1, bm: 2,  bc: 3, qualified: false },
      ],
    },
    scorers: [
      { name: 'Mathis Louis',          goals: 3, team: 'Fc Toro Elite' },
      { name: 'Angelson Fils Aime',    goals: 2, team: 'Fc Toro Elite' },
      { name: 'David Edouard Sampeur', goals: 1, team: 'ASF'           },
      { name: 'Nicolas Bazane',        goals: 1, team: 'CSP'           },
    ],
    matches: [
      // Groupe A
      { home: 'Fc Toro Elite', away: 'Fc Colonne', scoreHome: 3, scoreAway: 0, group: 'A', kickoff: '2026-02-28T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'CSP',           away: 'PAC',        scoreHome: 2, scoreAway: 1, group: 'A', kickoff: '2026-03-14T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Toro Elite', away: 'CSP',        scoreHome: 5, scoreAway: 0, group: 'A', kickoff: '2026-04-18T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'PAC',           away: 'Fc Colonne', scoreHome: 0, scoreAway: 4, group: 'A', kickoff: '2026-04-18T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Toro Elite', away: 'PAC',        scoreHome: 4, scoreAway: 0, group: 'A', kickoff: '2026-03-28T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'CSP',           away: 'Fc Colonne', scoreHome: 0, scoreAway: 0, group: 'A', kickoff: '2026-04-11T12:00:00Z', venue: 'Ste Thérèse' },
      // Groupe B
      { home: 'JACOT',     away: 'Fc Condor', scoreHome: 0, scoreAway: 0, group: 'B', kickoff: '2026-02-28T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Valencia',  away: 'ASF',       scoreHome: 0, scoreAway: 1, group: 'B', kickoff: '2026-03-14T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'JACOT',     away: 'ASF',       scoreHome: 0, scoreAway: 0, group: 'B', kickoff: '2026-03-28T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Condor', away: 'Valencia',  scoreHome: 1, scoreAway: 1, group: 'B', kickoff: '2026-04-11T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'JACOT',     away: 'Valencia',  scoreHome: 1, scoreAway: 1, group: 'B', kickoff: '2026-04-18T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'ASF',       away: 'Fc Condor', scoreHome: 1, scoreAway: 0, group: 'B', kickoff: '2026-04-18T12:00:00Z', venue: 'Ste Thérèse' },
    ]
  },
  U11: {
    sortOrder: 2,
    groups: {
      A: [
        { name: 'Fc Toro Elite', pts: 7, m: 3, v: 2, n: 1, d: 0, bm: 9, bc: 1, qualified: true  },
        { name: 'AST',           pts: 6, m: 3, v: 2, n: 0, d: 1, bm: 4, bc: 2, qualified: true  },
        { name: 'Valencia',      pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 2, bc: 8, qualified: false },
        { name: 'Fc Toro PV',    pts: 1, m: 3, v: 0, n: 1, d: 2, bm: 1, bc: 5, qualified: false },
      ],
      B: [
        { name: 'Fc MDM',           pts: 9, m: 3, v: 3, n: 0, d: 0, bm: 7, bc: 1, qualified: true  },
        { name: 'Stars des Jeunes', pts: 4, m: 3, v: 1, n: 1, d: 1, bm: 4, bc: 6, qualified: true  },
        { name: 'JACOT',            pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 6, bc: 7, qualified: false },
        { name: 'ASF',              pts: 1, m: 3, v: 0, n: 1, d: 2, bm: 2, bc: 5, qualified: false },
      ],
    },
    scorers: [
      { name: 'Momplaisir Tristen',     goals: 3, team: 'Fc Toro Elite'   },
      { name: 'Fenelon Levidson',       goals: 3, team: 'Stars des Jeunes'},
      { name: 'Jules Giovanni',         goals: 2, team: 'Fc Toro Elite'   },
      { name: 'Bolivard Rolph Davens',  goals: 2, team: 'Fc MDM'          },
    ],
    matches: [
      // Groupe A
      { home: 'Fc Toro Elite', away: 'Valencia',  scoreHome: 6, scoreAway: 0, group: 'A', kickoff: '2026-02-15T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Toro PV',    away: 'AST',       scoreHome: 0, scoreAway: 2, group: 'A', kickoff: '2026-03-07T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Toro Elite', away: 'AST',       scoreHome: 2, scoreAway: 0, group: 'A', kickoff: '2026-03-21T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Toro PV',    away: 'Valencia',  scoreHome: 0, scoreAway: 2, group: 'A', kickoff: '2026-04-04T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Toro Elite', away: 'Fc Toro PV', scoreHome: 1, scoreAway: 1, group: 'A', kickoff: '2026-04-11T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'AST',           away: 'Valencia',  scoreHome: 2, scoreAway: 0, group: 'A', kickoff: '2026-04-18T12:00:00Z', venue: 'Ste Thérèse' },
      // Groupe B
      { home: 'JACOT',   away: 'Fc MDM',           scoreHome: 1, scoreAway: 3, group: 'B', kickoff: '2026-02-15T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'ASF',     away: 'Stars des Jeunes', scoreHome: 1, scoreAway: 1, group: 'B', kickoff: '2026-03-07T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'JACOT',   away: 'Stars des Jeunes', scoreHome: 2, scoreAway: 3, group: 'B', kickoff: '2026-03-21T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'ASF',     away: 'Fc MDM',           scoreHome: 0, scoreAway: 1, group: 'B', kickoff: '2026-04-04T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'JACOT',   away: 'ASF',              scoreHome: 3, scoreAway: 1, group: 'B', kickoff: '2026-04-11T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc MDM',  away: 'Stars des Jeunes', scoreHome: 3, scoreAway: 0, group: 'B', kickoff: '2026-04-18T12:00:00Z', venue: 'Ste Thérèse' },
    ]
  },
  U13: {
    sortOrder: 3,
    groups: {
      A: [
        { name: 'Fc Toro Elite', pts: 7, m: 3, v: 2, n: 1, d: 0, bm: 7, bc: 2, qualified: true  },
        { name: 'Fc Seth',       pts: 4, m: 3, v: 1, n: 1, d: 1, bm: 3, bc: 3, qualified: true  },
        { name: 'Fc Flambo',     pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 6, bc: 6, qualified: false },
        { name: 'Fc Perfection', pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 2, bc: 7, qualified: false },
      ],
      B: [
        { name: 'ASF',      pts: 9, m: 3, v: 3, n: 0, d: 0, bm: 10, bc: 1,  qualified: true  },
        { name: 'Fc MDM',   pts: 6, m: 3, v: 2, n: 0, d: 1, bm: 7,  bc: 5,  qualified: true  },
        { name: 'PAC',      pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 3,  bc: 11, qualified: false },
        { name: 'Valencia', pts: 0, m: 3, v: 0, n: 0, d: 3, bm: 2,  bc: 5,  qualified: false },
      ],
    },
    scorers: [
      { name: 'Richemond Kerry',    goals: 4, team: 'Fc MDM'        },
      { name: 'Gamael Ricardens',   goals: 4, team: 'ASF'           },
      { name: 'Jerry Petit Homme',  goals: 3, team: 'Fc Toro Elite' },
      { name: 'Dieudonné Kenson',   goals: 2, team: 'Fc Toro Elite' },
    ],
    matches: [
      // Groupe A
      { home: 'Fc Toro Elite',  away: 'Fc Flambo',     scoreHome: 3, scoreAway: 1, group: 'A', kickoff: '2026-02-15T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Seth',        away: 'Fc Perfection', scoreHome: 0, scoreAway: 1, group: 'A', kickoff: '2026-02-22T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc Toro Elite',  away: 'Fc Perfection', scoreHome: 3, scoreAway: 0, group: 'A', kickoff: '2026-02-28T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc Seth',        away: 'Fc Flambo',     scoreHome: 2, scoreAway: 1, group: 'A', kickoff: '2026-03-07T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc Toro Elite',  away: 'Fc Seth',       scoreHome: 1, scoreAway: 1, group: 'A', kickoff: '2026-03-14T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc Flambo',      away: 'Fc Perfection', scoreHome: 4, scoreAway: 1, group: 'A', kickoff: '2026-04-11T12:00:00Z', venue: 'Thomassin' },
      // Groupe B
      { home: 'Valencia', away: 'Fc MDM', scoreHome: 2, scoreAway: 3, group: 'B', kickoff: '2026-02-21T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'PAC',      away: 'ASF',    scoreHome: 1, scoreAway: 7, group: 'B', kickoff: '2026-02-28T12:00:00Z', venue: 'Thomassin' },
      { home: 'Valencia', away: 'ASF',    scoreHome: 0, scoreAway: 1, group: 'B', kickoff: '2026-03-07T12:00:00Z', venue: 'Thomassin' },
      { home: 'PAC',      away: 'Fc MDM', scoreHome: 1, scoreAway: 4, group: 'B', kickoff: '2026-03-14T12:00:00Z', venue: 'Thomassin' },
      { home: 'Valencia', away: 'PAC',    scoreHome: 0, scoreAway: 1, group: 'B', kickoff: '2026-03-21T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc MDM',   away: 'ASF',    scoreHome: 0, scoreAway: 2, group: 'B', kickoff: '2026-04-11T12:00:00Z', venue: 'Thomassin' },
    ]
  },
  U15: {
    sortOrder: 4,
    groups: {
      A: [
        { name: 'Fc Toro Elite', pts: 9, m: 3, v: 3, n: 0, d: 0, bm: 6, bc: 0, qualified: true  },
        { name: 'Fc Idelo',      pts: 6, m: 3, v: 2, n: 0, d: 1, bm: 5, bc: 3, qualified: true  },
        { name: 'ASF',           pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 1, bc: 5, qualified: false },
        { name: 'Fc Legend',     pts: 0, m: 3, v: 0, n: 0, d: 3, bm: 1, bc: 5, qualified: false },
      ],
      B: [
        { name: 'Fc Condor',  pts: 7, m: 3, v: 2, n: 1, d: 0, bm: 8, bc: 2, qualified: true  },
        { name: 'Fc Toro PV', pts: 5, m: 3, v: 1, n: 2, d: 0, bm: 1, bc: 0, qualified: true  },
        { name: 'Fc Flambo',  pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 2, bc: 3, qualified: false },
        { name: 'Fc MDM',     pts: 1, m: 3, v: 0, n: 1, d: 2, bm: 1, bc: 7, qualified: false },
      ],
    },
    scorers: [
      { name: 'Charles Colson',   goals: 3, team: 'Fc Condor'     },
      { name: 'Jeudi Wubens',     goals: 2, team: 'ASF'           },
      { name: 'Perrin Dylan',     goals: 1, team: 'Fc Toro Elite' },
      { name: 'Messie Israel',    goals: 1, team: 'Fc Idelo'      },
    ],
    matches: [
      // Groupe A
      { home: 'Fc Toro Elite', away: 'Fc Idelo',  scoreHome: 2, scoreAway: 0, group: 'A', kickoff: '2026-02-22T12:00:00Z', venue: 'Thomassin' },
      { home: 'ASF',           away: 'Fc Legend', scoreHome: 1, scoreAway: 0, group: 'A', kickoff: '2026-03-01T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc Toro Elite', away: 'Fc Legend', scoreHome: 2, scoreAway: 0, group: 'A', kickoff: '2026-03-14T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'ASF',           away: 'Fc Idelo',  scoreHome: 0, scoreAway: 3, group: 'A', kickoff: '2026-03-22T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc Toro Elite', away: 'ASF',       scoreHome: 2, scoreAway: 0, group: 'A', kickoff: '2026-03-29T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc Idelo',      away: 'Fc Legend', scoreHome: 2, scoreAway: 1, group: 'A', kickoff: '2026-04-18T12:00:00Z', venue: 'Thomassin' },
      // Groupe B
      { home: 'Fc Flambo',  away: 'Fc MDM',     scoreHome: 1, scoreAway: 0, group: 'B', kickoff: '2026-02-21T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc Condor',  away: 'Fc Toro PV', scoreHome: 0, scoreAway: 0, group: 'B', kickoff: '2026-03-01T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc Flambo',  away: 'Fc Toro PV', scoreHome: 0, scoreAway: 1, group: 'B', kickoff: '2026-03-14T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Condor',  away: 'Fc MDM',     scoreHome: 6, scoreAway: 1, group: 'B', kickoff: '2026-03-22T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc Flambo',  away: 'Fc Condor',  scoreHome: 1, scoreAway: 2, group: 'B', kickoff: '2026-03-29T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc MDM',     away: 'Fc Toro PV', scoreHome: 0, scoreAway: 0, group: 'B', kickoff: '2026-04-18T12:00:00Z', venue: 'Thomassin' },
    ]
  },
  U17: {
    sortOrder: 5,
    groups: {
      A: [
        { name: 'Fc Toro Elite', pts: 6, m: 3, v: 2, n: 0, d: 1, bm: 5, bc: 3, qualified: true  },
        { name: 'SLG',           pts: 4, m: 3, v: 1, n: 1, d: 1, bm: 6, bc: 5, qualified: true  },
        { name: 'Idelo',         pts: 4, m: 3, v: 1, n: 1, d: 1, bm: 2, bc: 4, qualified: false },
        { name: 'Condor',        pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 4, bc: 5, qualified: false },
      ],
      B: [
        { name: 'Star des jeunes', pts: 9, m: 3, v: 3, n: 0, d: 0, bm: 4, bc: 0, qualified: true  },
        { name: 'EF Legend',       pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 2, bc: 3, qualified: true  },
        { name: 'Rev United',      pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 2, bc: 4, qualified: false },
        { name: 'Fc Seth',         pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 2, bc: 3, qualified: false },
      ],
    },
    scorers: [
      { name: 'Bob Philias',        goals: 3, team: 'SLG'             },
      { name: 'Dumay Fernando',     goals: 2, team: 'Star des jeunes' },
      { name: 'Paul Emerson',       goals: 2, team: 'Fc Toro Elite'   },
      { name: 'Charles Christopher',goals: 1, team: 'Idelo'           },
    ],
    matches: [
      // Groupe A
      { home: 'Fc Toro Elite', away: 'SLG',   scoreHome: 0, scoreAway: 3, group: 'A', kickoff: '2026-02-21T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Condor',        away: 'Idelo', scoreHome: 0, scoreAway: 1, group: 'A', kickoff: '2026-02-28T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Toro Elite', away: 'Idelo', scoreHome: 3, scoreAway: 0, group: 'A', kickoff: '2026-03-15T12:00:00Z', venue: 'Thomassin' },
      { home: 'Condor',        away: 'SLG',   scoreHome: 4, scoreAway: 2, group: 'A', kickoff: '2026-03-28T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc Toro Elite', away: 'Condor',scoreHome: 2, scoreAway: 0, group: 'A', kickoff: '2026-04-04T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'SLG',           away: 'Idelo', scoreHome: 1, scoreAway: 1, group: 'A', kickoff: '2026-04-12T12:00:00Z', venue: 'Thomassin' },
      // Groupe B
      { home: 'Star des jeunes', away: 'Rev United', scoreHome: 2, scoreAway: 0, group: 'B', kickoff: '2026-02-28T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Seth',         away: 'EF Legend',  scoreHome: 2, scoreAway: 0, group: 'B', kickoff: '2026-03-07T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Star des jeunes', away: 'EF Legend',  scoreHome: 1, scoreAway: 0, group: 'B', kickoff: '2026-02-21T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Seth',         away: 'Rev United', scoreHome: 0, scoreAway: 2, group: 'B', kickoff: '2026-03-28T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Star des jeunes', away: 'Fc Seth',    scoreHome: 1, scoreAway: 0, group: 'B', kickoff: '2026-04-04T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Rev United',      away: 'EF Legend',  scoreHome: 0, scoreAway: 2, group: 'B', kickoff: '2026-04-19T12:00:00Z', venue: 'Thomassin' },
    ]
  },
  U21: {
    sortOrder: 6,
    groups: {
      A: [
        { name: 'Ade 30',        pts: 7, m: 3, v: 2, n: 1, d: 0, bm: 4, bc: 2, qualified: true  },
        { name: 'Fc Toro Elite', pts: 6, m: 3, v: 2, n: 0, d: 1, bm: 7, bc: 2, qualified: true  },
        { name: 'SLG',           pts: 4, m: 3, v: 1, n: 1, d: 1, bm: 3, bc: 5, qualified: false },
        { name: 'Fc Flambo',     pts: 0, m: 3, v: 0, n: 0, d: 3, bm: 1, bc: 6, qualified: false },
      ],
      B: [
        { name: 'Aigle noir',    pts: 7, m: 3, v: 2, n: 1, d: 0, bm: 9, bc: 3, qualified: true  },
        { name: 'VAC',           pts: 7, m: 3, v: 2, n: 1, d: 0, bm: 4, bc: 0, qualified: true  },
        { name: 'Jacot',         pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 4, bc: 8, qualified: false },
        { name: 'Ac Perfection', pts: 0, m: 3, v: 0, n: 0, d: 3, bm: 2, bc: 8, qualified: false },
      ],
    },
    scorers: [
      { name: 'Paul Jefferson',      goals: 2, team: 'Fc Toro Elite' },
      { name: 'Jeanty Maxime',       goals: 1, team: 'VAC'           },
      { name: 'Merger Stanley',      goals: 1, team: 'Ade 30'        },
      { name: 'Thierry Danilo Luca', goals: 1, team: 'SLG'           },
    ],
    matches: [
      // Groupe A
      { home: 'Fc Toro Elite', away: 'Fc Flambo', scoreHome: 3, scoreAway: 0, group: 'A', kickoff: '2026-04-03T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Ade 30',        away: 'SLG',       scoreHome: 1, scoreAway: 1, group: 'A', kickoff: '2026-04-10T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Toro Elite', away: 'Ade 30',    scoreHome: 1, scoreAway: 2, group: 'A', kickoff: '2026-02-13T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'SLG',           away: 'Fc Flambo', scoreHome: 2, scoreAway: 1, group: 'A', kickoff: '2026-02-27T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Toro Elite', away: 'SLG',       scoreHome: 3, scoreAway: 0, group: 'A', kickoff: '2026-03-13T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Flambo',      away: 'Ade 30',    scoreHome: 0, scoreAway: 1, group: 'A', kickoff: '2026-03-25T12:00:00Z', venue: 'Ste Thérèse' },
      // Groupe B
      { home: 'VAC',   away: 'Ac Perfection', scoreHome: 1, scoreAway: 0, group: 'B', kickoff: '2026-02-20T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Jacot', away: 'Aigle noir',    scoreHome: 2, scoreAway: 4, group: 'B', kickoff: '2026-03-06T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'VAC',   away: 'Aigle noir',    scoreHome: 0, scoreAway: 0, group: 'B', kickoff: '2026-03-20T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Jacot', away: 'Ac Perfection', scoreHome: 2, scoreAway: 1, group: 'B', kickoff: '2026-03-27T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'VAC',   away: 'Jacot',         scoreHome: 3, scoreAway: 0, group: 'B', kickoff: '2026-04-08T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Ac Perfection', away: 'Aigle noir', scoreHome: 1, scoreAway: 5, group: 'B', kickoff: '2026-04-17T12:00:00Z', venue: 'Ste Thérèse' },
    ]
  },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

async function upsertTeam(name) {
  const logoUrl = getLogo(name);
  const { rows } = await q(`SELECT id FROM flagday_teams WHERE name=$1`, [name]);
  if (rows.length) {
    await q(`UPDATE flagday_teams SET logo_url=$1 WHERE id=$2`, [logoUrl, rows[0].id]);
    return rows[0].id;
  }
  const slug = toSlug(name);
  const { rows: sc } = await q(`SELECT id FROM flagday_teams WHERE slug=$1`, [slug]);
  const finalSlug = sc.length ? `${slug}-${Date.now()}` : slug;
  const { rows: ins } = await q(
    `INSERT INTO flagday_teams (name, slug, logo_url) VALUES ($1,$2,$3) RETURNING id`, [name, finalSlug, logoUrl]
  );
  return ins[0].id;
}

async function getOrCreateCompetition(cat, sortOrder) {
  const slug = `flag-day-2025-${cat.toLowerCase()}`;
  const { rows } = await q(`SELECT id FROM flagday_competitions WHERE slug=$1`, [slug]);
  if (rows.length) {
    await q(`UPDATE flagday_competitions SET is_published=true, active=true WHERE id=$1`, [rows[0].id]);
    return rows[0].id;
  }
  const { rows: ins } = await q(
    `INSERT INTO flagday_competitions (name,slug,season,age_category,is_published,active,sort_order)
     VALUES ($1,$2,'2025',$3,true,true,$4) RETURNING id`,
    [`Flag Day 2025 - ${cat}`, slug, cat, sortOrder]
  );
  return ins[0].id;
}

async function getOrCreateCategory(compId, catName) {
  const { rows } = await q(
    `SELECT id FROM flagday_categories WHERE competition_id=$1 AND name=$2`, [compId, catName]
  );
  if (rows.length) return rows[0].id;
  const { rows: ins } = await q(
    `INSERT INTO flagday_categories (competition_id,name,sort_order,active) VALUES ($1,$2,1,true) RETURNING id`,
    [compId, catName]
  );
  return ins[0].id;
}

async function upsertStanding(catId, teamId, group, row, rank) {
  const { rows } = await q(
    `SELECT id FROM flagday_standings WHERE category_id=$1 AND team_id=$2`, [catId, teamId]
  );
  if (rows.length) {
    await q(
      `UPDATE flagday_standings SET group_name=$1,stage='group',played=$2,won=$3,drawn=$4,
       lost=$5,goals_for=$6,goals_against=$7,points=$8,rank_position=$9,is_qualified=$10 WHERE id=$11`,
      [group, row.m, row.v, row.n, row.d, row.bm, row.bc, row.pts, rank, row.qualified, rows[0].id]
    );
  } else {
    await q(
      `INSERT INTO flagday_standings (category_id,team_id,group_name,stage,played,won,drawn,lost,
       goals_for,goals_against,points,rank_position,is_qualified)
       VALUES ($1,$2,$3,'group',$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [catId, teamId, group, row.m, row.v, row.n, row.d, row.bm, row.bc, row.pts, rank, row.qualified]
    );
  }
}

async function upsertScorer(catId, scorer) {
  const { rows } = await q(
    `SELECT id FROM flagday_top_scorers WHERE category_id=$1 AND player_name=$2`, [catId, scorer.name]
  );
  if (rows.length) {
    await q(`UPDATE flagday_top_scorers SET goals=$1,team_name=$2 WHERE id=$3`, [scorer.goals, scorer.team, rows[0].id]);
  } else {
    await q(
      `INSERT INTO flagday_top_scorers (category_id,player_name,goals,team_name) VALUES ($1,$2,$3,$4)`,
      [catId, scorer.name, scorer.goals, scorer.team]
    );
  }
}

async function upsertMatch(compId, match) {
  const homeId = await upsertTeam(match.home);
  const awayId = await upsertTeam(match.away);
  const round = match.round || (match.group ? `Groupe ${match.group}` : 'Match');
  const kickoff = match.kickoff || new Date().toISOString();
  const status = (match.scoreHome !== null && match.scoreHome !== undefined) ? 'finished' : 'scheduled';
  
  const { rows } = await q(
    `SELECT id FROM flagday_matches 
     WHERE competition_id=$1 AND home_team_id=$2 AND away_team_id=$3 AND round=$4`,
    [compId, homeId, awayId, round]
  );

  if (rows.length) {
    await q(
      `UPDATE flagday_matches 
       SET home_score=$1, away_score=$2, status=$3, kickoff=$4, venue=$5, notes='', featured=false, sort_order=0
       WHERE id=$6`,
      [match.scoreHome, match.scoreAway, status, kickoff, match.venue || '', rows[0].id]
    );
  } else {
    await q(
      `INSERT INTO flagday_matches (competition_id, home_team_id, away_team_id, home_score, away_score, round, status, kickoff, venue, notes, featured, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, '', false, 0)`,
      [compId, homeId, awayId, match.scoreHome, match.scoreAway, round, status, kickoff, match.venue || '']
    );
  }
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Seed complet Flag Day 2025 (Logos + Matchs)\n');

  for (const [cat, data] of Object.entries(ALL_DATA)) {
    console.log(`\n── ${cat} ──────────────────────────`);

    const compId = await getOrCreateCompetition(cat, data.sortOrder);
    const catId  = await getOrCreateCategory(compId, cat);
    console.log(`  Competition: ${compId}`);
    console.log(`  Category:    ${catId}`);

    // NETTOYAGE : Supprimer les anciens matchs et classements pour cette catégorie
    console.log('  🧹 Nettoyage des anciennes données...');
    await q(`DELETE FROM flagday_matches WHERE competition_id = $1`, [compId]);
    await q(`DELETE FROM flagday_standings WHERE category_id = $1`, [catId]);
    await q(`DELETE FROM flagday_top_scorers WHERE category_id = $1`, [catId]);

    for (const grp of ['A', 'B']) {
      const rows = data.groups[grp];
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const teamId = await upsertTeam(row.name);
        await upsertStanding(catId, teamId, grp, row, i + 1);
        console.log(`  Gr.${grp} [${i+1}] ${row.qualified ? '✅' : '  '} ${row.name.padEnd(20)} ${row.pts}pts`);
      }
    }

    for (const scorer of data.scorers) {
      await upsertScorer(catId, scorer);
      console.log(`  ⚽ ${scorer.name} (${scorer.team}) — ${scorer.goals}`);
    }

    console.log('  ⚽ Matchs...');
    // 1. Collecter les matchs déjà définis
    const existingPairs = new Set();
    for (const match of data.matches) {
      await upsertMatch(compId, match);
      if (match.group) {
        const sorted = [match.home, match.away].sort().join(' vs ');
        existingPairs.add(`${match.group}:${sorted}`);
      }
    }

  }

  console.log('\n\n✅ Seed terminé : Logos et Matchs réintégrés.');
  await pool.end();
}

main().catch(err => { console.error('\n❌', err.message); process.exit(1); });
