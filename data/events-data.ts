import { ClubFixture, ClubStandingRow } from '../types/club'

export type EventCard = {
  title: string
  slug: EventSlug
  href: string
  badge: string
  dateLabel: string
  summary: string
  image: string
  cta: string
}

export type EventSlug = 'live' | 'vertieres-cup' | 'flag-day'

export type EventReadingDetail = {
  eyebrow: string
  heading: string
  longDescription: string
  location: string
  audience: string
  primaryActionLabel: string
  secondaryActionLabel: string
  highlights: string[]
  checkpoints: Array<{
    label: string
    value: string
  }>
}

export type LiveFeedEntry = {
  label: string
  title: string
  body: string
}

export type VertieresRequirement = {
  title: string
  body: string
}

const logoFromName = (name: string, background: string, color = 'ffffff') =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name,
  )}&background=${background}&color=${color}&size=128&bold=true&format=png`

export const eventCards: EventCard[] = [
  {
    title: 'Live Diffusion',
    slug: 'live',
    href: '/evenements/live',
    badge: 'Direct club',
    dateLabel: '18 mai 2026 - 16:30',
    summary:
      'Suivre la diffusion, le flux de match et les rappels avant le coup d envoi.',
    image: '/joueur/extracted/566965214_18535346428012336_1378637816694320324_n.jpg',
    cta: 'Ouvrir le live',
  },
  {
    title: 'Vertieres Cup',
    slug: 'vertieres-cup',
    href: '/evenements/vertieres-cup',
    badge: 'Inscriptions',
    dateLabel: '18 novembre 2026',
    summary:
      'Inscrire une equipe, envoyer le logo officiel et transmettre la liste des joueurs.',
    image: '/joueur/extracted/560435029_18532793887012336_3999511270054224397_n.jpg',
    cta: 'Inscrire une equipe',
  },
  {
    title: 'Flag Day',
    slug: 'flag-day',
    href: '/evenements/flag-day',
    badge: 'Classements',
    dateLabel: '18 mai 2026',
    summary:
      'Consulter le classement, les resultats recents et les prochains matchs du tournoi.',
    image: '/joueur/extracted/583167774_18542869372012336_2307311757000245016_n.jpg',
    cta: 'Voir le classement',
  },
]

export const eventReadingDetails: Record<EventSlug, EventReadingDetail> = {
  live: {
    eyebrow: 'Lecture evenement',
    heading: 'Diffusion FC TORO en direct',
    longDescription:
      'Le module live rassemble la diffusion video, les rappels avant match et un fil rapide pour suivre les temps forts sans quitter le site.',
    location: 'Lecture en ligne sur le site officiel FC TORO',
    audience: 'Supporters, parents, joueurs et partenaires',
    primaryActionLabel: 'Voir la page live',
    secondaryActionLabel: 'Partager l evenement',
    highlights: [
      'Acces rapide au match en cours ou au prochain direct programme.',
      'Resume clair avant le coup d envoi avec lieu, horaire et adversaire.',
      'Passerelle simple pour orienter les visiteurs vers la bonne diffusion.',
    ],
    checkpoints: [
      { label: 'Competition', value: 'Flag Day Tournament 2026' },
      { label: 'Demarrage', value: '18 mai 2026 - 16:30' },
      { label: 'Lieu', value: 'Stade Sylvio Cator' },
    ],
  },
  'vertieres-cup': {
    eyebrow: 'Lecture evenement',
    heading: 'Inscription equipe Vertieres Cup',
    longDescription:
      'Cette page permet de deposer un dossier complet pour une equipe participante avec le logo officiel, les contacts du staff et la liste detaillee des joueurs.',
    location: 'Validation administrative centralisee par FC TORO',
    audience: 'Coachs, managers et responsables de delegation',
    primaryActionLabel: 'Ouvrir l inscription',
    secondaryActionLabel: 'Preparer le dossier',
    highlights: [
      'Formulaire pense pour les academies et centres de formation.',
      'Verification des elements obligatoires avant validation finale.',
      'Lecture simple des informations utiles par le staff organisateur.',
    ],
    checkpoints: [
      { label: 'Competition', value: 'Vertieres Cup' },
      { label: 'Date limite', value: '18 novembre 2026' },
      { label: 'Minimum joueurs', value: '7 joueurs renseignes' },
    ],
  },
  'flag-day': {
    eyebrow: 'Lecture evenement',
    heading: 'Classement et affiches Flag Day',
    longDescription:
      'La page Flag Day centralise le classement, les resultats deja joues et les prochaines affiches pour suivre la dynamique du tournoi avec FC TORO en evidence.',
    location: 'Tournoi suivi depuis la section evenement',
    audience: 'Supporters, staff, observateurs et equipes invitees',
    primaryActionLabel: 'Voir le classement',
    secondaryActionLabel: 'Consulter les matchs',
    highlights: [
      'Classement trie avec lecture immediate des points et de la forme recente.',
      'Resultats recents et prochains matchs disponibles au meme endroit.',
      'Focus FC TORO pour suivre le parcours du club pendant le tournoi.',
    ],
    checkpoints: [
      { label: 'Tournoi', value: 'Flag Day Tournament' },
      { label: 'Finale', value: '18 mai 2026' },
      { label: 'Equipes suivies', value: '8 clubs' },
    ],
  },
}

export const eventsOverviewStats = [
  { value: '3', label: 'Pages evenement' },
  { value: '1', label: 'Live centralise' },
  { value: '16', label: 'Equipes attendues Vertieres' },
  { value: '8', label: 'Clubs suivis Flag Day' },
]

export const liveMatchData = {
  home: { name: 'FC TORO Élite', logo: '/fc-toro-logo.png' },
  away: {
    name: 'Violette AC',
    logo: '/joueur/extracted/560388188_18531457003012336_702922180697776333_n.jpg',
  },
  competition: 'Flag Day Tournament 2026',
  status: 'Bientôt en direct',
  startsAt: '18 mai 2026 @ 16:30',
  venue: 'Stade Sylvio Cator',
  headline: 'Rejoignez-nous en direct pour suivre FC TORO et les temps forts du tournoi.',
  youtubeId: '', // Laissez vide "" pour désactiver le bouton Live
  isLive: false, // Mettre à true quand le match commence vraiment
  homeScore: null as number | null,
  awayScore: null as number | null,
}

export const IS_LIVE_ACTIVE = liveMatchData.isLive || !!liveMatchData.youtubeId

export const liveFeed: LiveFeedEntry[] = [
  {
    label: 'Avant-match',
    title: 'Les joueurs arrivent au stade',
    body: 'Le staff FC TORO installe le groupe, la mise en place vidéo et le protocole média.',
  },
  {
    label: 'Brief officiel',
    title: 'Verification des feuilles de match',
    body: 'Les arbitres valident les equipements, les bancs et l ordre de passage des equipes.',
  },
  {
    label: 'A surveiller',
    title: 'Temps fort attendu à 16:30',
    body: 'Le direct démarre avec l’entrée des joueurs puis le flux match sera mis à jour en continu.',
  },
]

export const vertieresHighlights = [
  'Tournoi structure pour academies, centres de formation et selections locales.',
  'Verification administrative avant validation definitive de l inscription.',
  'Communication club centralisee pour calendrier, convocations et horaires.',
]

export const vertieresRequirements: VertieresRequirement[] = [
  {
    title: 'Logo de l equipe',
    body: 'Envoyer le logo officiel ou un visuel representatif pour la communication du tournoi.',
  },
  {
    title: 'Liste des joueurs',
    body: 'Renseigner les noms, numeros, annees de naissance et postes des joueurs convoques.',
  },
  {
    title: 'Responsable officiel',
    body: 'Fournir le nom du coach ou manager, ainsi que son numero et son email de suivi.',
  },
  {
    title: 'Categorie et ville',
    body: 'Preciser la categorie engagee et la ville ou commune de provenance de l equipe.',
  },
]

const flagDayClubCatalog = {
  'team-fctoro': {
    id: 'team-fctoro',
    name: 'FC Toro',
    logoUrl: '/fc-toro-logo.png',
  },
  'team-aigle-noir': {
    id: 'team-aigle-noir',
    name: 'Aigle Noir',
    logoUrl: logoFromName('AN', '111827'),
  },
  'team-union-riviere': {
    id: 'team-union-riviere',
    name: 'Union Riviere',
    logoUrl: logoFromName('UR', '1d4ed8'),
  },
  'team-real-vertieres': {
    id: 'team-real-vertieres',
    name: 'Real Vertieres',
    logoUrl: logoFromName('RV', '0f766e'),
  },
  'team-cap-legend': {
    id: 'team-cap-legend',
    name: 'Cap Legend',
    logoUrl: logoFromName('CL', 'b91c1c'),
  },
  'team-etoile-nord': {
    id: 'team-etoile-nord',
    name: 'Etoile du Nord',
    logoUrl: logoFromName('EN', '9333ea'),
  },
  'team-athletique-plaine': {
    id: 'team-athletique-plaine',
    name: 'Athletique Plaine',
    logoUrl: logoFromName('AP', 'd97706'),
  },
  'team-vision-haiti': {
    id: 'team-vision-haiti',
    name: 'Vision Haiti',
    logoUrl: logoFromName('VH', '475569'),
  },
} as const

const flagDayStandingRow = (
  teamId: keyof typeof flagDayClubCatalog,
  stats: Omit<ClubStandingRow, 'teamId' | 'teamName' | 'logoUrl'>,
): ClubStandingRow => ({
  teamId,
  teamName: flagDayClubCatalog[teamId].name,
  logoUrl: flagDayClubCatalog[teamId].logoUrl,
  ...stats,
})

export const flagDayStandings: ClubStandingRow[] = [
  flagDayStandingRow('team-fctoro', {
    pts: 13,
    played: 5,
    wins: 4,
    losses: 0,
    draws: 1,
    goalsFor: 11,
    goalsAgainst: 3,
    form: ['W', 'W', 'D', 'W', 'W'],
  }),
  flagDayStandingRow('team-aigle-noir', {
    pts: 11,
    played: 5,
    wins: 3,
    losses: 0,
    draws: 2,
    goalsFor: 9,
    goalsAgainst: 4,
    form: ['W', 'D', 'W', 'D', 'W'],
  }),
  flagDayStandingRow('team-union-riviere', {
    pts: 9,
    played: 5,
    wins: 3,
    losses: 2,
    draws: 0,
    goalsFor: 8,
    goalsAgainst: 6,
    form: ['L', 'W', 'W', 'L', 'W'],
  }),
  flagDayStandingRow('team-real-vertieres', {
    pts: 8,
    played: 5,
    wins: 2,
    losses: 1,
    draws: 2,
    goalsFor: 7,
    goalsAgainst: 5,
    form: ['D', 'W', 'L', 'D', 'W'],
  }),
  flagDayStandingRow('team-cap-legend', {
    pts: 6,
    played: 5,
    wins: 2,
    losses: 3,
    draws: 0,
    goalsFor: 6,
    goalsAgainst: 8,
    form: ['W', 'L', 'L', 'W', 'L'],
  }),
  flagDayStandingRow('team-etoile-nord', {
    pts: 5,
    played: 5,
    wins: 1,
    losses: 2,
    draws: 2,
    goalsFor: 5,
    goalsAgainst: 7,
    form: ['D', 'L', 'W', 'D', 'L'],
  }),
  flagDayStandingRow('team-athletique-plaine', {
    pts: 3,
    played: 5,
    wins: 1,
    losses: 4,
    draws: 0,
    goalsFor: 4,
    goalsAgainst: 10,
    form: ['L', 'W', 'L', 'L', 'L'],
  }),
  flagDayStandingRow('team-vision-haiti', {
    pts: 2,
    played: 5,
    wins: 0,
    losses: 3,
    draws: 2,
    goalsFor: 3,
    goalsAgainst: 10,
    form: ['D', 'L', 'D', 'L', 'L'],
  }),
]

const buildFlagDayFixture = (
  id: string,
  round: string,
  kickoff: string,
  status: ClubFixture['status'],
  homeTeamId: keyof typeof flagDayClubCatalog,
  awayTeamId: keyof typeof flagDayClubCatalog,
  homeScore?: number,
  awayScore?: number,
): ClubFixture => ({
  id,
  competition: 'Flag Day Tournament',
  round,
  kickoff,
  status,
  homeTeamId,
  awayTeamId,
  homeTeamName: flagDayClubCatalog[homeTeamId].name,
  awayTeamName: flagDayClubCatalog[awayTeamId].name,
  homeLogoUrl: flagDayClubCatalog[homeTeamId].logoUrl,
  awayLogoUrl: flagDayClubCatalog[awayTeamId].logoUrl,
  homeScore,
  awayScore,
})

export const flagDayFixtures: ClubFixture[] = [
  buildFlagDayFixture(
    'fd-001',
    'Groupe A - J1',
    '2026-05-11T15:00:00',
    'FT',
    'team-fctoro',
    'team-cap-legend',
    2,
    0,
  ),
  buildFlagDayFixture(
    'fd-002',
    'Groupe A - J2',
    '2026-05-12T17:30:00',
    'FT',
    'team-aigle-noir',
    'team-union-riviere',
    1,
    1,
  ),
  buildFlagDayFixture(
    'fd-003',
    'Groupe A - J3',
    '2026-05-13T16:00:00',
    'FT',
    'team-real-vertieres',
    'team-fctoro',
    1,
    3,
  ),
  buildFlagDayFixture(
    'fd-004',
    'Groupe A - J4',
    '2026-05-14T16:30:00',
    'FT',
    'team-etoile-nord',
    'team-athletique-plaine',
    2,
    1,
  ),
  buildFlagDayFixture(
    'fd-005',
    'Groupe A - J5',
    '2026-05-16T18:00:00',
    'A venir',
    'team-fctoro',
    'team-aigle-noir',
  ),
  buildFlagDayFixture(
    'fd-006',
    'Groupe A - J5',
    '2026-05-16T20:00:00',
    'A venir',
    'team-union-riviere',
    'team-real-vertieres',
  ),
  buildFlagDayFixture(
    'fd-007',
    'Demi-finale',
    '2026-05-17T18:00:00',
    'A venir',
    'team-cap-legend',
    'team-fctoro',
  ),
  buildFlagDayFixture(
    'fd-008',
    'Finale',
    '2026-05-18T16:30:00',
    'A venir',
    'team-fctoro',
    'team-aigle-noir',
  ),
]
