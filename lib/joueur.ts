export type PlayerCard = {
  name: string
  role: string
  image: string
}

export type HeroSlide = {
  label: string
  title: string
  cta: string
  href: string
  image: string
}

export type NewsCard = {
  slug: string
  title: string
  category: string
  image: string
  excerpt: string
  dateLabel: string
  large?: boolean
  intro: string
  content: string[]
  keyPoints: string[]
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
    label: 'Evenement',
    title: 'Vertiere Cup tres prochainement. Inscrivez votre equipe, finale le 18 nov 2026.',
    cta: 'Participer',
    href: '/evenements/vertieres-cup',
    image: '/joueur/extracted/583167774_18542869372012336_2307311757000245016_n.jpg',
  },
  {
    label: 'Evenement',
    title: 'Championnat Flag Day : 1 million de gourdes à gagner  finale le 18 mai 2026.',
    cta: 'Voir le classement',
    href: '/evenements/flag-day',
    image: '/home/hero-flag-day.jpg',
  },
  {
    label: 'Elite',
    title: 'Les jeunes talents du FC TORO réunis sur le terrain, incarnant l’avenir du football haïtien.',
    cta: 'Decouvrir',
    href: '/elite',
    image: '/home/hero-elite.jpg',
  },
]

export const newsCards: NewsCard[] = [
  {
    slug: 'vertieres-cup-bientot-18-novembre-2026',
    title: 'Vertieres Cup bientot - 18 Novembre 2026',
    category: 'Evenement',
    image: '/joueur/extracted/583188241_18542486221012336_5258040509286651258_n.jpg',
    excerpt: 'Le groupe se prepare pour un rendez-vous majeur au Cap-Haitien avec une montee en intensite.',
    dateLabel: '18 Nov 2026',
    large: true,
    intro:
      'FC TORO se projette deja vers la Vertieres Cup du 18 novembre 2026 avec une preparation organisee autour du rythme, des automatismes et de la discipline collective.',
    content: [
      'Le staff augmente progressivement l intensite des seances afin que le groupe arrive avec des reperes clairs au moment du tournoi. La priorite actuelle est de construire une equipe capable de garder son identite tout en gerant la pression des grands rendez-vous.',
      'Les joueurs travaillent les sorties de balle, le pressing coordonne et la qualite des transitions. L objectif n est pas seulement d etre prets physiquement, mais aussi de lire vite les differentes situations de match.',
      'En dehors du terrain, la preparation concerne aussi l organisation, la communication et la responsabilite individuelle. La Vertieres Cup doit etre abordee comme un test collectif complet pour le club.',
    ],
    keyPoints: [
      'Competition ciblee au 18 novembre 2026',
      'Accent sur le rythme et les automatismes',
      'Preparation sportive et organisationnelle',
    ],
  },
  {
    slug: 'flag-day-tournament-en-ligne-de-mire',
    title: 'Flag Day Tournament en ligne de mire',
    category: 'Evenement',
    image: '/joueur/extracted/590428352_18546412351012336_8960891563345494800_n.jpg',
    excerpt: 'FC TORO confirme sa participation et renforce les seances pour arriver pret au tournoi.',
    dateLabel: '18 Mai 2026',
    intro:
      'Le Flag Day Tournament reste un point de passage important dans le calendrier du club, avec une attente forte autour de la maitrise collective et du comportement competitif.',
    content: [
      'Le groupe travaille avec l idee de produire un football simple, intense et lisible. Les seances recentes mettent l accent sur les enchainements rapides, la fermeture des espaces et la qualite des decisions dans les trente derniers metres.',
      'Le tournoi servira aussi a mesurer la capacite du collectif a rester stable dans les moments forts et faibles du match. Le club veut montrer de la coherence autant que du caractere.',
      'La participation a Flag Day s inscrit dans une logique de progression. Chaque rencontre doit apporter des enseignements concrets pour la suite de la saison.',
    ],
    keyPoints: [
      'Participation confirmee',
      'Travail sur l intensite et la maitrise',
      'Tournoi utilise comme etape de progression',
    ],
  },
  {
    slug: 'la-seance-du-24-fevrier-2026',
    title: 'La seance du 24 fevrier 2026',
    category: 'Entrainement',
    image: '/joueur/extracted/565186344_18534659338012336_7505322217599153961_n.jpg',
    excerpt: 'Intensite, pressing et finitions au programme. Le groupe avance avec une belle energie.',
    dateLabel: '24 Fev 2026',
    intro:
      'La seance du 24 fevrier 2026 a mis le groupe dans un contexte exigeant avec un fort volume d efforts, des repets de pressing et un travail specifique devant le but.',
    content: [
      'Le premier temps de travail a insiste sur les deplacements sans ballon, le declenchement collectif et la capacite a fermer les espaces tres vite. Le staff cherchait surtout a obtenir une reaction coordonnee des lignes.',
      'Dans un deuxieme temps, les exercices de finition ont impose du rythme et de la lucidite apres effort. Les joueurs ont du encha iner courses, appels et gestes decisifs dans peu d espace.',
      'L impression generale est positive: le groupe a montre de l engagement, mais le staff attend encore plus de precision technique dans les moments a haute intensite.',
    ],
    keyPoints: [
      'Travail pressing et coordination',
      'Atelier finition apres effort',
      'Bonne energie generale du groupe',
    ],
  },
  {
    slug: 'communique-officiel',
    title: 'Communique officiel',
    category: 'Club',
    image: '/joueur/extracted/599236964_18547431706012336_2518205431165781947_n.jpg',
    excerpt: "Le club confirme l'organisation du week-end et remercie les benevoles pour leur implication.",
    dateLabel: '22 Fev 2026',
    intro:
      'Le club confirme la tenue du programme prevu ce week-end et souligne l implication des benevoles qui accompagnent l organisation des activites.',
    content: [
      'Les horaires, les espaces de travail et les points de rassemblement restent maintenus selon le planning transmis par le staff. Les differents responsables poursuivent la coordination pour fluidifier l accueil des joueurs et des familles.',
      'FC TORO tient a mettre en avant le travail souvent invisible des personnes qui aident a installer, orienter, informer et accompagner le bon deroulement des activites. Cette chaine de soutien fait partie de la vie du club.',
      'Le communique rappelle aussi que la qualite d une structure ne depend pas uniquement du terrain, mais egalement de la rigueur collective autour de chaque rendez-vous.',
    ],
    keyPoints: [
      'Organisation du week-end maintenue',
      'Reconnaissance du role des benevoles',
      'Coordination renforcee autour des activites',
    ],
  },
  {
    slug: 'le-succes-de-la-saison-2013-14',
    title: 'Le succes de la saison 2013-14',
    category: 'Retro',
    image: '/joueur/extracted/629347230_17886988737431630_560677091584659157_n.jpg',
    excerpt: 'Retour sur une annee reference: discipline collective, identite de jeu et mental fort.',
    dateLabel: 'Archive',
    intro:
      'La saison 2013-14 reste un repere fort dans la memoire du club, autant pour la qualite du jeu produit que pour l exigence collective visible a chaque sortie.',
    content: [
      'Cette periode a marque une etape importante dans la construction de l identite FC TORO. Le groupe montrait deja une forte cohesion et une capacite a rester fidele a son plan de jeu.',
      'Le succes de cette saison ne s explique pas seulement par les resultats. Il tient aussi a l engagement quotidien, a la discipline installee autour des seances et a la confiance partagee entre joueurs et staff.',
      'Revenir sur cette annee permet de rappeler que les meilleures dynamiques se construisent sur la duree, a travers des habitudes de travail et une culture collective solide.',
    ],
    keyPoints: [
      'Saison reference pour le club',
      'Identite de jeu deja forte',
      'Discipline et mental comme base du succes',
    ],
  },
  {
    slug: 'preparation-du-week-end',
    title: 'Preparation du week-end',
    category: 'Club',
    image: '/joueur/extracted/621203459_18554581459012336_4537330016788795057_n.jpg',
    excerpt: 'Le staff ajuste les details tactiques avant la prochaine rencontre.',
    dateLabel: '21 Fev 2026',
    intro:
      'La preparation du week-end s organise autour des derniers reglages tactiques, de la gestion des temps de travail et de la clarte des consignes avant match.',
    content: [
      'Le staff cherche a reduire les zones d incertitude pour que le groupe aborde la rencontre avec une lecture simple de ses missions. Les echanges insistent sur les distances entre les lignes et les solutions de sortie.',
      'Les derniers jours avant match servent aussi a doser la charge physique. L idee est de conserver de la fraicheur tout en gardant l equipe connectee a son plan de jeu.',
      'Cette phase de preparation permet enfin de rappeler les standards du club: rigueur, ecoute et capacite a repondre ensemble quand le match change de rythme.',
    ],
    keyPoints: [
      'Reglages tactiques finaux',
      'Gestion de la fraicheur du groupe',
      'Consignes recentrees sur les standards club',
    ],
  },
  {
    slug: 'focus-academie-u15',
    title: 'Focus academie U15',
    category: 'Academie',
    image: '/joueur/extracted/575274167_18540323572012336_6438757876049095178_n.jpg',
    excerpt: 'Travail technique et maitrise du tempo au coeur de la seance.',
    dateLabel: '20 Fev 2026',
    intro:
      'La categorie U15 poursuit un travail centré sur la qualite technique, la gestion du tempo et la comprehension progressive des temps du match.',
    content: [
      'Les seances multiplient les situations ou les joueurs doivent recevoir, orienter et jouer juste en peu de touches. Le but est de rendre les prises d information plus naturelles.',
      'Le staff insiste egalement sur la maitrise du rythme: savoir accelerer, calmer et faire vivre le ballon selon le contexte. Cette lecture du tempo aide les jeunes a mieux comprendre le jeu.',
      'Le projet academie cherche a poser des fondations solides plutot qu a chercher des effets rapides. La categorie U15 reste un moment cle pour fixer ces habitudes.',
    ],
    keyPoints: [
      'Accent sur la qualite technique',
      'Travail sur le tempo du jeu',
      'Base importante du parcours academie',
    ],
  },
  {
    slug: 'esprit-collectif-renforce',
    title: 'Esprit collectif renforce',
    category: 'Entrainement',
    image: '/joueur/extracted/566965214_18535346428012336_1378637816694320324_n.jpg',
    excerpt: 'Une semaine marquee par l intensite, l entraide et la discipline.',
    dateLabel: '19 Fev 2026',
    intro:
      'La semaine a renforce l impression d un groupe plus uni, plus exigeant avec lui-meme et plus disponible dans l effort collectif.',
    content: [
      'Au fil des seances, le staff a observe davantage de communication utile, de soutien entre les joueurs et de reactions plus rapides apres perte. Ces petits details construisent une vraie dynamique.',
      'L intensite produite ne vaut que si elle reste maitrisee et mise au service du collectif. Le groupe progresse justement dans cette capacite a jouer fort sans se disperser.',
      'Ce climat de travail plus mature est encourageant pour la suite. Il devra maintenant se voir dans la competition et dans la regularite des performances.',
    ],
    keyPoints: [
      'Communication plus juste',
      'Entraide et discipline visibles',
      'Base positive pour la suite',
    ],
  },
]
