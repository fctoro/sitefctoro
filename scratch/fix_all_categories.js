
const { pool } = require('../lib/db');

async function q(sql, params = []) {
  const c = await pool.connect();
  try { return await c.query(sql, params); } finally { c.release(); }
}

function toSlug(name) {
  return name.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

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
      { home: 'Fc Toro Elite', away: 'Fc Colonne', scoreHome: 3, scoreAway: 0, group: 'A', kickoff: '2026-02-28T10:30:00Z', venue: 'Ste Thérèse' },
      { home: 'CSP',           away: 'PAC',        scoreHome: 2, scoreAway: 1, group: 'A', kickoff: '2026-03-14T10:30:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Toro Elite', away: 'CSP',        scoreHome: 5, scoreAway: 0, group: 'A', kickoff: '2026-04-18T10:30:00Z', venue: 'Ste Thérèse' },
      { home: 'PAC',           away: 'Fc Colonne', scoreHome: 0, scoreAway: 4, group: 'A', kickoff: '2026-04-18T10:30:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Toro Elite', away: 'PAC',        scoreHome: 4, scoreAway: 0, group: 'A', kickoff: '2026-03-28T10:30:00Z', venue: 'Ste Thérèse' },
      { home: 'CSP',           away: 'Fc Colonne', scoreHome: 0, scoreAway: 0, group: 'A', kickoff: '2026-04-11T10:30:00Z', venue: 'Ste Thérèse' },
      { home: 'JACOT',     away: 'Fc Condor', scoreHome: 0, scoreAway: 0, group: 'B', kickoff: '2026-02-28T10:30:00Z', venue: 'Ste Thérèse' },
      { home: 'Valencia',  away: 'ASF',       scoreHome: 0, scoreAway: 1, group: 'B', kickoff: '2026-03-14T10:30:00Z', venue: 'Ste Thérèse' },
      { home: 'JACOT',     away: 'ASF',       scoreHome: 0, scoreAway: 0, group: 'B', kickoff: '2026-03-28T10:30:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Condor', away: 'Valencia',  scoreHome: 1, scoreAway: 1, group: 'B', kickoff: '2026-04-11T10:30:00Z', venue: 'Ste Thérèse' },
      { home: 'JACOT',     away: 'Valencia',  scoreHome: 1, scoreAway: 1, group: 'B', kickoff: '2026-04-18T10:30:00Z', venue: 'Ste Thérèse' },
      { home: 'ASF',       away: 'Fc Condor', scoreHome: 1, scoreAway: 0, group: 'B', kickoff: '2026-04-18T10:30:00Z', venue: 'Ste Thérèse' },
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
      { home: 'Fc Toro Elite', away: 'Valencia',  scoreHome: 6, scoreAway: 0, group: 'A', kickoff: '2026-02-15T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Toro PV',    away: 'AST',       scoreHome: 0, scoreAway: 2, group: 'A', kickoff: '2026-03-07T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Toro Elite', away: 'AST',       scoreHome: 2, scoreAway: 0, group: 'A', kickoff: '2026-03-21T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Toro PV',    away: 'Valencia',  scoreHome: 0, scoreAway: 2, group: 'A', kickoff: '2026-04-04T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Toro Elite', away: 'Fc Toro PV', scoreHome: 1, scoreAway: 1, group: 'A', kickoff: '2026-04-11T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'AST',           away: 'Valencia',  scoreHome: 2, scoreAway: 0, group: 'A', kickoff: '2026-04-18T12:00:00Z', venue: 'Ste Thérèse' },
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
      { home: 'Fc Toro Elite',  away: 'Fc Flambo',     scoreHome: 3, scoreAway: 1, group: 'A', kickoff: '2026-02-15T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Seth',        away: 'Fc Perfection', scoreHome: 0, scoreAway: 1, group: 'A', kickoff: '2026-02-22T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc Toro Elite',  away: 'Fc Perfection', scoreHome: 3, scoreAway: 0, group: 'A', kickoff: '2026-02-28T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc Seth',        away: 'Fc Flambo',     scoreHome: 2, scoreAway: 1, group: 'A', kickoff: '2026-03-07T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc Toro Elite',  away: 'Fc Seth',       scoreHome: 1, scoreAway: 1, group: 'A', kickoff: '2026-03-14T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc Flambo',      away: 'Fc Perfection', scoreHome: 4, scoreAway: 1, group: 'A', kickoff: '2026-04-11T12:00:00Z', venue: 'Thomassin' },
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
      { home: 'Fc Toro Elite', away: 'Fc Idelo',  scoreHome: 2, scoreAway: 0, group: 'A', kickoff: '2026-02-22T12:00:00Z', venue: 'Thomassin' },
      { home: 'ASF',           away: 'Fc Legend', scoreHome: 1, scoreAway: 0, group: 'A', kickoff: '2026-03-01T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc Toro Elite', away: 'Fc Legend', scoreHome: 2, scoreAway: 0, group: 'A', kickoff: '2026-03-14T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'ASF',           away: 'Fc Idelo',  scoreHome: 0, scoreAway: 3, group: 'A', kickoff: '2026-03-22T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc Toro Elite', away: 'ASF',       scoreHome: 2, scoreAway: 0, group: 'A', kickoff: '2026-03-29T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc Idelo',      away: 'Fc Legend', scoreHome: 2, scoreAway: 1, group: 'A', kickoff: '2026-04-18T12:00:00Z', venue: 'Thomassin' },
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
      { home: 'Fc Toro Elite', away: 'SLG',   scoreHome: 0, scoreAway: 3, group: 'A', kickoff: '2026-02-21T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Condor',        away: 'Idelo', scoreHome: 0, scoreAway: 1, group: 'A', kickoff: '2026-02-28T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Toro Elite', away: 'Idelo', scoreHome: 3, scoreAway: 0, group: 'A', kickoff: '2026-03-15T12:00:00Z', venue: 'Thomassin' },
      { home: 'Condor',        away: 'SLG',   scoreHome: 4, scoreAway: 2, group: 'A', kickoff: '2026-03-28T12:00:00Z', venue: 'Thomassin' },
      { home: 'Fc Toro Elite', away: 'Condor',scoreHome: 2, scoreAway: 0, group: 'A', kickoff: '2026-04-04T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'SLG',           away: 'Idelo', scoreHome: 1, scoreAway: 1, group: 'A', kickoff: '2026-04-12T12:00:00Z', venue: 'Thomassin' },
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
      { home: 'Fc Toro Elite', away: 'Fc Flambo', scoreHome: 3, scoreAway: 0, group: 'A', kickoff: '2026-04-03T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Ade 30',        away: 'SLG',       scoreHome: 1, scoreAway: 1, group: 'A', kickoff: '2026-04-10T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Toro Elite', away: 'Ade 30',    scoreHome: 1, scoreAway: 2, group: 'A', kickoff: '2026-02-13T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'SLG',           away: 'Fc Flambo', scoreHome: 2, scoreAway: 1, group: 'A', kickoff: '2026-02-27T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Toro Elite', away: 'SLG',       scoreHome: 3, scoreAway: 0, group: 'A', kickoff: '2026-03-13T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Fc Flambo',      away: 'Ade 30',    scoreHome: 0, scoreAway: 1, group: 'A', kickoff: '2026-03-25T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'VAC',   away: 'Ac Perfection', scoreHome: 1, scoreAway: 0, group: 'B', kickoff: '2026-02-20T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Jacot', away: 'Aigle noir',    scoreHome: 2, scoreAway: 4, group: 'B', kickoff: '2026-03-06T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'VAC',   away: 'Aigle noir',    scoreHome: 0, scoreAway: 0, group: 'B', kickoff: '2026-03-20T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Jacot', away: 'Ac Perfection', scoreHome: 2, scoreAway: 1, group: 'B', kickoff: '2026-03-27T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'VAC',   away: 'Jacot',         scoreHome: 3, scoreAway: 0, group: 'B', kickoff: '2026-04-08T12:00:00Z', venue: 'Ste Thérèse' },
      { home: 'Ac Perfection', away: 'Aigle noir', scoreHome: 1, scoreAway: 5, group: 'B', kickoff: '2026-04-17T12:00:00Z', venue: 'Ste Thérèse' },
    ]
  },
};

async function getOrCreateCompetition(cat, sortOrder) {
  const slug = `flag-day-2026-${cat.toLowerCase()}`;
  const { rows } = await q(`SELECT id FROM flagday_competitions WHERE slug=$1`, [slug]);
  if (rows.length) {
    await q(`UPDATE flagday_competitions SET is_published=true, active=true, age_category=$2 WHERE id=$1`, [rows[0].id, cat]);
    return rows[0].id;
  }
  const { rows: ins } = await q(
    `INSERT INTO flagday_competitions (name,slug,season,age_category,is_published,active,sort_order)
     VALUES ($1,$2,'2026',$3,true,true,$4) RETURNING id`,
    [`Flag Day 2026 - ${cat}`, slug, cat, sortOrder]
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

async function getTeamId(name) {
  const { rows } = await q('SELECT id FROM flagday_teams WHERE name ILIKE $1', [name]);
  if (rows.length) return rows[0].id;
  const slug = toSlug(name);
  const { rows: ins } = await q('INSERT INTO flagday_teams (name, slug) VALUES ($1, $2) RETURNING id', [name, slug]);
  return ins[0].id;
}

async function run() {
  try {
    console.log('🚀 Fixing all categories...');
    
    // First, cleanup existing data to avoid mess
    console.log('  🧹 Cleaning matches and standings...');
    await q('DELETE FROM flagday_matches');
    await q('DELETE FROM flagday_standings');
    await q('DELETE FROM flagday_top_scorers');
    // Note: We don't delete competitions as they might be referenced elsewhere, but we will reuse them.

    for (const [cat, data] of Object.entries(ALL_DATA)) {
      console.log(`\n── ${cat} ──────────────────────────`);
      const compId = await getOrCreateCompetition(cat, data.sortOrder);
      const catId = await getOrCreateCategory(compId, cat);

      for (const grp of ['A', 'B']) {
        const rows = data.groups[grp];
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const teamId = await getTeamId(row.name);
          await q(
            `INSERT INTO flagday_standings (category_id, team_id, group_name, stage, played, won, drawn, lost, goals_for, goals_against, points, rank_position, is_qualified)
             VALUES ($1,$2,$3,'group',$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
            [catId, teamId, grp, row.m, row.v, row.n, row.d, row.bm, row.bc, row.pts, i+1, row.qualified]
          );
        }
      }

      for (const scorer of data.scorers) {
        await q(
          `INSERT INTO flagday_top_scorers (category_id, player_name, goals, team_name) VALUES ($1,$2,$3,$4)`,
          [catId, scorer.name, scorer.goals, scorer.team]
        );
      }

      for (const match of data.matches) {
        const homeId = await getTeamId(match.home);
        const awayId = await getTeamId(match.away);
        const round = `${cat} Groupe ${match.group}`;
        await q(
          `INSERT INTO flagday_matches (competition_id, category_id, home_team_id, away_team_id, home_score, away_score, round, status, kickoff, venue)
           VALUES ($1, $2, $3, $4, $5, $6, $7, 'finished', $8, $9)`,
          [compId, catId, homeId, awayId, match.scoreHome, match.scoreAway, round, match.kickoff, match.venue]
        );
      }
    }
    console.log('\n✅ Done!');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

run();
