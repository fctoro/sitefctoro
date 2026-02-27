export type PlayerCard = {
  name: string
  role: string
  image: string
}

export type HeroSlide = {
  label: string
  title: string
  cta: string
  image: string
}

export type NewsCard = {
  title: string
  category: string
  image: string
  excerpt: string
  dateLabel: string
  large?: boolean
}

export const playerCards: PlayerCard[] = [
  { name: 'Jean Pierre', role: 'Attaquant', image: '/joueur/extracted/591149277_18545355826012336_6701584250153829576_n.jpg' },
  { name: 'Mikael Saintil', role: 'Milieu', image: '/joueur/extracted/558873526_18531024070012336_2541038537932974445_n.jpg' },
  { name: 'Nixon Louis', role: 'Defenseur', image: '/joueur/extracted/560388188_18531457003012336_702922180697776333_n.jpg' },
  { name: 'Dylan Toro', role: 'Ailier', image: '/joueur/extracted/487859566_18496314202012336_4490722394926427967_n.jpg' },
  { name: 'Ruben Alexis', role: 'Capitaine', image: '/joueur/extracted/634150827_18560832649012336_7495873752742897530_n.jpg' },
  { name: 'Kelvin Marcel', role: 'Gardien', image: '/joueur/extracted/636967631_18560895763012336_6262024514087135809_n.jpg' },
  { name: 'Junior Lafleur', role: 'Futsal', image: '/joueur/extracted/641694175_18567320974012336_5379991601628482744_n.jpg' },
  { name: 'Matheo Charles', role: 'Arriere', image: '/joueur/extracted/621203459_18554581459012336_4537330016788795057_n.jpg' },
  { name: 'Samuel Dorval', role: 'Milieu', image: '/joueur/extracted/575274167_18540323572012336_6438757876049095178_n.jpg' },
  { name: 'Bryan Celestin', role: 'Defenseur', image: '/joueur/extracted/622486917_18554464078012336_4014982399909732243_n.jpg' },
  { name: 'Lenny Martin', role: 'Ailier', image: '/joueur/extracted/566965214_18535346428012336_1378637816694320324_n.jpg' },
  { name: 'Theo Basile', role: 'Capitaine', image: '/joueur/extracted/560435029_18532793887012336_3999511270054224397_n.jpg' },
  { name: 'Noah Laurent', role: 'Gardien', image: '/joueur/extracted/568745333_18536029291012336_2541205262935954829_n.jpg' },
]

export const heroSlides: HeroSlide[] = [
  {
    label: 'Equipe Pro',
    title: 'Notre stade. Notre force.',
    cta: 'Voir l equipe',
    image: '/joueur/extracted/542448727_18525142066012336_8843479393054800058_n.jpg',
  },
  {
    label: 'Supporters',
    title: 'Une ville derriere son club',
    cta: 'Vivre l ambiance',
    image: '/joueur/extracted/583167774_18542869372012336_2307311757000245016_n.jpg',
  },
  {
    label: 'Academie',
    title: 'Le futur commence ici',
    cta: 'Decouvrir',
    image: '/joueur/extracted/482698652_18490519879012336_3363810591939939336_n.jpg',
  },
]

export const newsCards: NewsCard[] = [
  {
    title: 'FC TORO - Dernieres nouvelles',
    category: 'Club',
    image: '/joueur/extracted/583188241_18542486221012336_5258040509286651258_n.jpg',
    excerpt: 'Le groupe poursuit sa progression avec des seances intenses et une bonne cohesion collective.',
    dateLabel: '26 Fev 2026',
    large: true,
  },
  {
    title: 'Ambiance supporters en tribune',
    category: 'Supporters',
    image: '/joueur/extracted/590428352_18546412351012336_8960891563345494800_n.jpg',
    excerpt: 'Retour en images sur une journee forte avec une presence supporters qui porte le groupe.',
    dateLabel: '25 Fev 2026',
  },
  {
    title: 'La seance du 24 fevrier 2026',
    category: 'Entrainement',
    image: '/joueur/extracted/565186344_18534659338012336_7505322217599153961_n.jpg',
    excerpt: 'Intensite, pressing et finitions au programme. Le groupe avance avec une belle energie.',
    dateLabel: '24 Fev 2026',
  },
  {
    title: 'Communique officiel',
    category: 'Club',
    image: '/joueur/extracted/599236964_18547431706012336_2518205431165781947_n.jpg',
    excerpt: "Le club confirme l'organisation du week-end et remercie les benevoles pour leur implication.",
    dateLabel: '22 Fev 2026',
  },
  {
    title: 'Le succes de la saison 2013-14',
    category: 'Retro',
    image: '/joueur/extracted/629347230_17886988737431630_560677091584659157_n.jpg',
    excerpt: 'Retour sur une annee reference: discipline collective, identite de jeu et mental fort.',
    dateLabel: 'Archive',
  },
  {
    title: 'Preparation du week-end',
    category: 'Club',
    image: '/joueur/extracted/621203459_18554581459012336_4537330016788795057_n.jpg',
    excerpt: 'Le staff ajuste les details tactiques avant la prochaine rencontre.',
    dateLabel: '21 Fev 2026',
  },
  {
    title: 'Focus academie U15',
    category: 'Academie',
    image: '/joueur/extracted/575274167_18540323572012336_6438757876049095178_n.jpg',
    excerpt: 'Travail technique et maitrise du tempo au coeur de la seance.',
    dateLabel: '20 Fev 2026',
  },
  {
    title: 'Esprit collectif renforce',
    category: 'Entrainement',
    image: '/joueur/extracted/566965214_18535346428012336_1378637816694320324_n.jpg',
    excerpt: 'Une semaine marquee par l intensite, l entraide et la discipline.',
    dateLabel: '19 Fev 2026',
  },
]
