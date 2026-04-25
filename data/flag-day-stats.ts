export const logoMap: Record<string, string> = {
  'Fc Toro Elite': '/logos/FC-TORO.png',
  'Fc Toro Pv': '/logos/FC-TORO.png',
  'Fc Toro PV': '/logos/FC-TORO.png',
  'FC Toro Elite': '/logos/FC-TORO.png',
  'CSP': '/logos/CSP.png',
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
  'Idelo FC': '/logos/IDELO FC.png',
  'Idelo': '/logos/IDELO FC.png',
  'Legend EF': '/logos/FC LEGENDS.png',
  'FC Legend': '/logos/FC LEGENDS.png',
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

export const getLogo = (name: string) => logoMap[name] || '/placeholder-logo.png';

export type StandingsRow = { name: string; pts: number; m: number; v: number; n: number; d: number; bm: number; bc: number; df: number; pl: string };
export type Scorer = { name: string; goals: number; team: string };
export type CategoryData = {
  groups: { A: StandingsRow[]; B: StandingsRow[] };
  scorers: Scorer[];
  qualified: { A: string; B: string };
};

export const flagDayStatsData: Record<string, CategoryData> = {
  U9: {
    groups: {
      A: [
        { name: 'Fc Toro Elite', pts: 6, m: 2, v: 2, n: 0, d: 0, bm: 7, bc: 0, df: 7, pl: '1er' },
        { name: 'CSP', pts: 4, m: 2, v: 1, n: 1, d: 0, bm: 2, bc: 1, df: 1, pl: '2eme' },
        { name: 'Fc Colonne', pts: 1, m: 2, v: 0, n: 1, d: 1, bm: 0, bc: 3, df: -3, pl: '3eme' },
        { name: 'PAC', pts: 0, m: 2, v: 0, n: 0, d: 2, bm: 1, bc: 6, df: -5, pl: '4eme' },
      ],
      B: [
        { name: 'ASF', pts: 4, m: 2, v: 1, n: 1, d: 0, bm: 1, bc: 0, df: 1, pl: '1er' },
        { name: 'Jacot FP', pts: 2, m: 2, v: 0, n: 2, d: 0, bm: 0, bc: 0, df: 0, pl: '2eme' },
        { name: 'Condor EF', pts: 1, m: 1, v: 0, n: 1, d: 0, bm: 0, bc: 0, df: 0, pl: '3eme' },
        { name: 'Valencia', pts: 0, m: 1, v: 0, n: 0, d: 1, bm: 0, bc: 1, df: -1, pl: '4eme' },
      ],
    },
    scorers: [
      { name: 'Mathis Louis', goals: 3, team: 'Fc Toro Elite' },
      { name: 'Angelson Fils Aime', goals: 2, team: 'Fc Toro Elite' },
      { name: 'David Edouard Sampeur', goals: 1, team: 'ASF' },
      { name: 'Nicolas Bazane', goals: 1, team: 'CSP' },
    ],
    qualified: { A: 'FC Toro Elite --- CSP', B: 'ASF' },
  },
  U11: {
    groups: {
      A: [
        { name: 'Fc Toro Elite', pts: 6, m: 2, v: 2, n: 0, d: 0, bm: 8, bc: 0, df: 8, pl: '1er' },
        { name: 'AST', pts: 3, m: 2, v: 1, n: 0, d: 1, bm: 2, bc: 2, df: 0, pl: '2eme' },
        { name: 'Fc Toro PV', pts: 1, m: 2, v: 0, n: 1, d: 1, bm: 0, bc: 2, df: -2, pl: '3eme' },
        { name: 'Valencia', pts: 1, m: 2, v: 0, n: 1, d: 1, bm: 0, bc: 6, df: -6, pl: '4eme' },
      ],
      B: [
        { name: 'FC MDM', pts: 6, m: 2, v: 2, n: 0, d: 0, bm: 4, bc: 1, df: 3, pl: '1er' },
        { name: 'Star des Jeunes', pts: 4, m: 2, v: 1, n: 1, d: 0, bm: 4, bc: 3, df: 1, pl: '2eme' },
        { name: 'ASF', pts: 1, m: 2, v: 0, n: 1, d: 1, bm: 1, bc: 2, df: -1, pl: '3eme' },
        { name: 'Jacot F Passion', pts: 0, m: 2, v: 0, n: 0, d: 2, bm: 3, bc: 6, df: -3, pl: '4eme' },
      ],
    },
    scorers: [
      { name: 'Momplaisir Tristen', goals: 3, team: 'Fc Toro Elite' },
      { name: 'Fenelon Levidson', goals: 3, team: 'Star des Jeunes' },
      { name: 'Jules Giovanni', goals: 2, team: 'Fc Toro Elite' },
      { name: 'Bolivard Rolph Davens', goals: 2, team: 'FC MDM' },
    ],
    qualified: { A: 'Fc Toro Elite ---- AST', B: 'Star des Jeunes --- FC MDM' },
  },
  U13: {
    groups: {
      A: [
        { name: 'Fc Toro Elite', pts: 7, m: 3, v: 2, n: 1, d: 0, bm: 7, bc: 2, df: 5, pl: '1er' },
        { name: 'Fc Seth', pts: 4, m: 3, v: 1, n: 1, d: 1, bm: 3, bc: 3, df: 0, pl: '2eme' },
        { name: 'Perfection', pts: 3, m: 2, v: 1, n: 0, d: 1, bm: 1, bc: 3, df: -2, pl: '3eme' },
        { name: 'Fc Flambo', pts: 0, m: 2, v: 0, n: 0, d: 2, bm: 2, bc: 5, df: -3, pl: '4eme' },
      ],
      B: [
        { name: 'ASF', pts: 6, m: 2, v: 2, n: 0, d: 0, bm: 8, bc: 1, df: 7, pl: '1er' },
        { name: 'FC MDM', pts: 6, m: 2, v: 2, n: 0, d: 0, bm: 7, bc: 3, df: 4, pl: '2eme' },
        { name: 'PAC', pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 3, bc: 11, df: -8, pl: '3eme' },
        { name: 'Valencia', pts: 0, m: 3, v: 0, n: 0, d: 3, bm: 2, bc: 5, df: -3, pl: '4eme' },
      ],
    },
    scorers: [
      { name: 'Richemond Kerry', goals: 4, team: 'FC MDM' },
      { name: 'Gamael Ricardens', goals: 4, team: 'ASF' },
      { name: 'Jerry Petit Homme', goals: 3, team: 'Fc Toro Elite' },
      { name: 'Dieudonne Kenson', goals: 2, team: 'Fc Toro Elite' },
    ],
    qualified: { A: 'Fc Toro Elite---Fc Seth', B: 'FC MDM---ASF---PAC' },
  },
  U15: {
    groups: {
      A: [
        { name: 'Fc Toro Elite', pts: 6, m: 3, v: 2, n: 0, d: 1, bm: 4, bc: 2, df: 2, pl: '1er' },
        { name: 'ASF', pts: 6, m: 3, v: 2, n: 0, d: 1, bm: 3, bc: 3, df: 0, pl: '2eme' },
        { name: 'Idelo FC', pts: 3, m: 2, v: 1, n: 0, d: 1, bm: 3, bc: 2, df: 1, pl: '3eme' },
        { name: 'Legend EF', pts: 0, m: 2, v: 0, n: 0, d: 2, bm: 0, bc: 3, df: -3, pl: '4eme' },
      ],
      B: [
        { name: 'Condor', pts: 7, m: 3, v: 2, n: 1, d: 0, bm: 8, bc: 2, df: 6, pl: '1er' },
        { name: 'Fc Toro PV', pts: 4, m: 2, v: 0, n: 1, d: 0, bm: 1, bc: 0, df: 1, pl: '2eme' },
        { name: 'Fc Flambo', pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 2, bc: 3, df: -1, pl: '3eme' },
        { name: 'Fc MDM', pts: 0, m: 2, v: 0, n: 0, d: 2, bm: 1, bc: 7, df: -6, pl: '4eme' },
      ],
    },
    scorers: [
      { name: 'Charles Colson', goals: 3, team: 'Condor EF' },
      { name: 'Jeudi Wubens', goals: 2, team: 'ASF' },
      { name: 'Perrin Dylan', goals: 1, team: 'Fc Toro Elite' },
      { name: 'Messie Israel', goals: 1, team: 'Idelo' },
    ],
    qualified: { A: 'Fc Toro Elite ---ASF', B: 'Condor EF---Fc Toro Pv' },
  },
  U17: {
    groups: {
      A: [
        { name: 'Fc Toro Elite', pts: 6, m: 3, v: 2, n: 0, d: 1, bm: 4, bc: 3, df: 1, pl: '1er' },
        { name: 'SLG', pts: 3, m: 2, v: 1, n: 0, d: 1, bm: 5, bc: 4, df: 1, pl: '2eme' },
        { name: 'Condor EF', pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 4, bc: 4, df: 0, pl: '3eme' },
        { name: 'Idelo', pts: 3, m: 2, v: 1, n: 0, d: 1, bm: 1, bc: 3, df: -2, pl: '4eme' },
      ],
      B: [
        { name: 'Star des Jeunes', pts: 9, m: 3, v: 3, n: 0, d: 0, bm: 4, bc: 0, df: 4, pl: '1er' },
        { name: 'Rev United', pts: 3, m: 2, v: 1, n: 0, d: 1, bm: 2, bc: 2, df: 0, pl: '2eme' },
        { name: 'Fc Seth', pts: 3, m: 3, v: 1, n: 0, d: 2, bm: 2, bc: 3, df: 1, pl: '3eme' },
        { name: 'Legend EF', pts: 0, m: 2, v: 0, n: 0, d: 2, bm: 0, bc: 3, df: -3, pl: '4eme' },
      ],
    },
    scorers: [
      { name: 'Bob Philias', goals: 3, team: 'SLG' },
      { name: 'Dumay Fernando', goals: 2, team: 'Star des Jeunes' },
      { name: 'Paul Emerson', goals: 2, team: 'Fc Toro Elite' },
      { name: 'Charles Christopher', goals: 1, team: 'Idelo FC' },
    ],
    qualified: { A: 'Fc Toro Elite', B: 'Star des Jeunes' },
  },
  U21: {
    groups: {
      A: [
        { name: 'Fc Toro Elite', pts: 6, m: 3, v: 2, n: 0, d: 1, bm: 7, bc: 2, df: 5, pl: '1er' },
        { name: 'ADE30', pts: 6, m: 2, v: 2, n: 0, d: 0, bm: 3, bc: 1, df: 2, pl: '2eme' },
        { name: 'Saint Louis de G', pts: 3, m: 2, v: 1, n: 0, d: 1, bm: 2, bc: 4, df: -2, pl: '3eme' },
        { name: 'Fc Flambo', pts: 0, m: 3, v: 0, n: 0, d: 3, bm: 1, bc: 6, df: -5, pl: '4eme' },
      ],
      B: [
        { name: 'Aigle Noir', pts: 4, m: 2, v: 1, n: 1, d: 0, bm: 4, bc: 2, df: 2, pl: '1er' },
        { name: 'Violette AC', pts: 4, m: 2, v: 1, n: 1, d: 0, bm: 1, bc: 0, df: 1, pl: '2eme' },
        { name: 'Academie Perf', pts: 3, m: 2, v: 1, n: 0, d: 1, bm: 2, bc: 2, df: 0, pl: '3eme' },
        { name: 'Jacot F.P', pts: 0, m: 2, v: 0, n: 0, d: 2, bm: 3, bc: 6, df: -3, pl: '4eme' },
      ],
    },
    scorers: [
      { name: 'Paul Jefferson', goals: 2, team: 'Fc Toro Elite' },
      { name: 'Jeanty Maxime', goals: 1, team: 'Violette AC' },
      { name: 'Merger Stanley', goals: 1, team: 'ADE30' },
      { name: 'Thierry Danilo Luca', goals: 1, team: 'SLG' },
    ],
    qualified: { A: 'Fc Toro Elite --- ADE30', B: 'Violette AC ---- ANAC' },
  },
};

export type MatchResult = { home: string; away: string; scoreHome: number; scoreAway: number; group: 'A' | 'B' };

export const flagDayMatches: Record<string, MatchResult[]> = {
  U9: [
    { home: 'Fc Toro Elite', away: 'Fc Colonne', scoreHome: 4, scoreAway: 0, group: 'A' },
    { home: 'CSP', away: 'PAC', scoreHome: 2, scoreAway: 1, group: 'A' },
    { home: 'Fc Toro Elite', away: 'PAC', scoreHome: 3, scoreAway: 0, group: 'A' },
    { home: 'CSP', away: 'Fc Colonne', scoreHome: 0, scoreAway: 0, group: 'A' },
    { home: 'ASF', away: 'Jacot FP', scoreHome: 1, scoreAway: 0, group: 'B' },
    { home: 'Condor EF', away: 'Valencia', scoreHome: 0, scoreAway: 0, group: 'B' },
    { home: 'ASF', away: 'Condor EF', scoreHome: 0, scoreAway: 0, group: 'B' },
    { home: 'Jacot FP', away: 'Valencia', scoreHome: 0, scoreAway: 1, group: 'B' },
  ],
  U11: [
    { home: 'Fc Toro Elite', away: 'Fc Toro PV', scoreHome: 5, scoreAway: 0, group: 'A' },
    { home: 'AST', away: 'Valencia', scoreHome: 2, scoreAway: 0, group: 'A' },
    { home: 'Fc Toro Elite', away: 'Valencia', scoreHome: 3, scoreAway: 0, group: 'A' },
    { home: 'AST', away: 'Fc Toro PV', scoreHome: 0, scoreAway: 0, group: 'A' },
    { home: 'FC MDM', away: 'Jacot F Passion', scoreHome: 3, scoreAway: 1, group: 'B' },
    { home: 'Star des Jeunes', away: 'ASF', scoreHome: 3, scoreAway: 1, group: 'B' },
    { home: 'FC MDM', away: 'ASF', scoreHome: 1, scoreAway: 0, group: 'B' },
    { home: 'Star des Jeunes', away: 'Jacot F Passion', scoreHome: 1, scoreAway: 2, group: 'B' },
  ],
  U13: [
    { home: 'Fc Toro Elite', away: 'Fc Flambo', scoreHome: 4, scoreAway: 0, group: 'A' },
    { home: 'Fc Seth', away: 'Perfection', scoreHome: 2, scoreAway: 0, group: 'A' },
    { home: 'Fc Toro Elite', away: 'Fc Seth', scoreHome: 2, scoreAway: 2, group: 'A' },
    { home: 'Fc Flambo', away: 'Perfection', scoreHome: 2, scoreAway: 1, group: 'A' },
    { home: 'ASF', away: 'PAC', scoreHome: 6, scoreAway: 0, group: 'B' },
    { home: 'FC MDM', away: 'Valencia', scoreHome: 5, scoreAway: 0, group: 'B' },
    { home: 'ASF', away: 'FC MDM', scoreHome: 2, scoreAway: 2, group: 'B' },
    { home: 'PAC', away: 'Valencia', scoreHome: 3, scoreAway: 2, group: 'B' },
  ],
  U15: [
    { home: 'Fc Toro Elite', away: 'ASF', scoreHome: 2, scoreAway: 1, group: 'A' },
    { home: 'Idelo FC', away: 'Legend EF', scoreHome: 3, scoreAway: 0, group: 'A' },
    { home: 'Fc Toro Elite', away: 'Idelo FC', scoreHome: 2, scoreAway: 0, group: 'A' },
    { home: 'ASF', away: 'Legend EF', scoreHome: 2, scoreAway: 0, group: 'A' },
    { home: 'Condor', away: 'Fc MDM', scoreHome: 5, scoreAway: 0, group: 'B' },
    { home: 'Fc Toro PV', away: 'Fc Flambo', scoreHome: 1, scoreAway: 0, group: 'B' },
    { home: 'Condor', away: 'Fc Flambo', scoreHome: 2, scoreAway: 1, group: 'B' },
    { home: 'Condor', away: 'Fc Toro PV', scoreHome: 1, scoreAway: 0, group: 'B' },
  ],
  U17: [
    { home: 'Fc Toro Elite', away: 'Condor EF', scoreHome: 2, scoreAway: 1, group: 'A' },
    { home: 'SLG', away: 'Idelo', scoreHome: 3, scoreAway: 0, group: 'A' },
    { home: 'Fc Toro Elite', away: 'Idelo', scoreHome: 1, scoreAway: 0, group: 'A' },
    { home: 'Condor EF', away: 'SLG', scoreHome: 2, scoreAway: 2, group: 'A' },
    { home: 'Star des Jeunes', away: 'Fc Seth', scoreHome: 2, scoreAway: 0, group: 'B' },
    { home: 'Rev United', away: 'Legend EF', scoreHome: 2, scoreAway: 0, group: 'B' },
    { home: 'Star des Jeunes', away: 'Legend EF', scoreHome: 1, scoreAway: 0, group: 'B' },
    { home: 'Fc Seth', away: 'Rev United', scoreHome: 2, scoreAway: 0, group: 'B' },
  ],
  U21: [
    { home: 'Fc Toro Elite', away: 'Fc Flambo', scoreHome: 4, scoreAway: 0, group: 'A' },
    { home: 'ADE30', away: 'Saint Louis de G', scoreHome: 2, scoreAway: 1, group: 'A' },
    { home: 'Fc Toro Elite', away: 'ADE30', scoreHome: 1, scoreAway: 3, group: 'A' },
    { home: 'Fc Flambo', away: 'Saint Louis de G', scoreHome: 1, scoreAway: 1, group: 'A' },
    { home: 'Aigle Noir', away: 'Jacot F.P', scoreHome: 3, scoreAway: 1, group: 'B' },
    { home: 'Violette AC', away: 'Academie Perf', scoreHome: 1, scoreAway: 0, group: 'B' },
    { home: 'Aigle Noir', away: 'Violette AC', scoreHome: 1, scoreAway: 0, group: 'B' },
    { home: 'Academie Perf', away: 'Jacot F.P', scoreHome: 2, scoreAway: 2, group: 'B' },
  ],
};

// Route to the Final bracket
export type BracketMatch = { home: string; away: string; scoreHome: number | null; scoreAway: number | null };
export type BracketData = { semiFinals: BracketMatch[]; final: BracketMatch; champion: string | null };

export const flagDayBracket: Record<string, BracketData> = {
  U9: {
    semiFinals: [
      { home: '', away: '', scoreHome: null, scoreAway: null },
      { home: '', away: '', scoreHome: null, scoreAway: null },
    ],
    final:    { home: 'À déterminer', away: 'À déterminer', scoreHome: null, scoreAway: null },
    champion: null,
  },
  U11: {
    semiFinals: [
      { home: '', away: '', scoreHome: null, scoreAway: null },
      { home: '', away: '', scoreHome: null, scoreAway: null },
    ],
    final:    { home: 'À déterminer', away: 'À déterminer', scoreHome: null, scoreAway: null },
    champion: null,
  },
  U13: {
    semiFinals: [
      { home: '', away: '', scoreHome: null, scoreAway: null },
      { home: '', away: '', scoreHome: null, scoreAway: null },
    ],
    final:    { home: 'À déterminer', away: 'À déterminer', scoreHome: null, scoreAway: null },
    champion: null,
  },
  U15: {
    semiFinals: [
      { home: '', away: '', scoreHome: null, scoreAway: null },
      { home: '', away: '', scoreHome: null, scoreAway: null },
    ],
    final:    { home: 'À déterminer', away: 'À déterminer', scoreHome: null, scoreAway: null },
    champion: null,
  },
  U17: {
    semiFinals: [
      { home: '', away: '', scoreHome: null, scoreAway: null },
      { home: '', away: '', scoreHome: null, scoreAway: null },
    ],
    final:    { home: 'À déterminer', away: 'À déterminer', scoreHome: null, scoreAway: null },
    champion: null,
  },
  U21: {
    semiFinals: [
      { home: '', away: '', scoreHome: null, scoreAway: null },
      { home: '', away: '', scoreHome: null, scoreAway: null },
    ],
    final:    { home: 'À déterminer', away: 'À déterminer', scoreHome: null, scoreAway: null },
    champion: null,
  },
};
