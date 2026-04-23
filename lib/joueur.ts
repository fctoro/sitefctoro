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
  { name: 'Aguero Michel', role: 'Attaquant', image: '/staff-photos/aguero-michel.jpg' },
  { name: 'Angelo Lauré', role: 'Milieu', image: '/staff-photos/angelo-lauré.jpg' },
  { name: 'Angelson Fils-Aimé', role: 'Ailier', image: '/staff-photos/angelson-fils-aimé-2.jpg' },
  { name: 'Billy Vilsaint', role: 'Defenseur', image: '/staff-photos/billy-vilsaint.jpg' },
  { name: 'Dave Olivier Julbert', role: 'Attaquant', image: '/staff-photos/dave-olivier-julbert.jpg' },
  { name: 'Meranvil Bill', role: 'Milieu', image: '/staff-photos/meranvil-bill.jpg' },
  { name: 'Taino Solh Moise', role: 'Ailier', image: '/staff-photos/taino-solh-moise.jpg' },
  { name: 'Johnlove Traine', role: 'Milieu', image: '/staff-photos/img_1770.jpg' },
]

export const heroSlides: HeroSlide[] = [
  {
    label: 'Événement',
    title: 'Vertière Cup très prochainement. Inscrivez votre équipe, finale le 18 nov 2026.',
    cta: 'Participer',
    href: '/evenements/vertieres-cup',
    image: '/joueur/extracted/583167774_18542869372012336_2307311757000245016_n.jpg',
  },
  {
    label: 'Événement',
    title: 'Championnat Flag Day : 1 million de gourdes à gagner, finale le 18 mai 2026.',
    cta: 'Voir le classement',
    href: '/evenements/flag-day',
    image: '/home/hero-flag-day-optimized.jpg',
  },
  {
    label: 'Elite',
    title: 'Les jeunes talents du FC TORO réunis sur le terrain, incarnant l’avenir du football haïtien.',
    cta: 'Decouvrir',
    href: '/elite',
    image: '/home/hero-elite-optimized.jpg',
  },
]

export const newsCards: NewsCard[] = [
  {
    slug: 'vertieres-cup-bientot-18-novembre-2026',
    title: 'Vertière Cup bientôt - 18 Novembre 2026',
    category: 'Événement',
    image: '/joueur/extracted/583188241_18542486221012336_5258040509286651258_n.jpg',
    excerpt: 'Le groupe se prépare pour un rendez-vous majeur au Cap-Haïtien avec une montée en intensité.',
    dateLabel: '18 Nov 2026',
    large: true,
    intro:
      'FC TORO se projette déjà vers la Vertière Cup du 18 novembre 2026 avec une préparation organisée autour du rythme, des automatismes et de la discipline collective.',
    content: [
      'Le staff augmente progressivement l\'intensité des séances afin que le groupe arrive avec des repères clairs au moment du tournoi. La priorité actuelle est de construire une équipe capable de garder son identité tout en gérant la pression des grands rendez-vous.',
      'Les joueurs travaillent les sorties de balle, le pressing coordonné et la qualité des transitions. L\'objectif n\'est pas seulement d\'être prêts physiquement, mais aussi de lire vite les différentes situations de match.',
      'En dehors du terrain, la préparation concerne aussi l\'organisation, la communication et la responsabilité individuelle. La Vertière Cup doit être abordée comme un test collectif complet pour le club.',
    ],
    keyPoints: [
      'Compétition ciblée au 18 novembre 2026',
      'Accent sur le rythme et les automatismes',
      'Préparation sportive et organisationnelle',
    ],
  },
  {
    slug: 'flag-day-tournament-en-ligne-de-mire',
    title: 'Flag Day Tournament en ligne de mire',
    category: 'Événement',
    image: '/joueur/extracted/590428352_18546412351012336_8960891563345494800_n.jpg',
    excerpt: 'FC TORO confirme sa participation et renforce les séances pour arriver prêt au tournoi.',
    dateLabel: '18 Mai 2026',
    intro:
      'Le Flag Day Tournament reste un point de passage important dans le calendrier du club, avec une attente forte autour de la maitrise collective et du comportement compétitif.',
    content: [
      'Le groupe travaille avec l\'idée de produire un football simple, intense et lisible. Les séances récentes mettent l\'accent sur les enchainements rapides, la fermeture des espaces et la qualité des décisions dans les trente derniers mètres.',
      'Le tournoi servira aussi à mesurer la capacité du collectif à rester stable dans les moments forts et faibles du match. Le club veut montrer de la cohérence autant que du caractère.',
      'La participation à Flag Day s\'inscrit dans une logique de progression. Chaque rencontre doit apporter des enseignements concrets pour la suite de la saison.',
    ],
    keyPoints: [
      'Participation confirmée',
      'Travail sur l\'intensité et la maitrise',
      'Tournoi utilisé comme étape de progression',
    ],
  },
  {
    slug: 'la-seance-du-24-fevrier-2026',
    title: 'La séance du 24 février 2026',
    category: 'Entrainement',
    image: '/joueur/extracted/565186344_18534659338012336_7505322217599153961_n.jpg',
    excerpt: 'Intensité, pressing et finitions au programme. Le groupe avance avec une belle énergie.',
    dateLabel: '24 Fév 2026',
    intro:
      'La séance du 24 février 2026 a mis le groupe dans un contexte exigeant avec un fort volume d\'efforts, des répétitions de pressing et un travail spécifique devant le but.',
    content: [
      'Le premier temps de travail a insisté sur les déplacements sans ballon, le déclenchement collectif et la capacité à fermer les espaces très vite. Le staff cherchait surtout à obtenir une réaction coordonnée des lignes.',
      'Dans un deuxième temps, les exercices de finition ont imposé du rythme et de la lucidité après effort. Les joueurs ont dû enchaîner courses, appels et gestes décisifs dans peu d\'espace.',
      'L\'impression générale est positive : le groupe a montré de l\'engagement, mais le staff attend encore plus de précision technique dans les moments à haute intensité.',
    ],
    keyPoints: [
      'Travail pressing et coordination',
      'Atelier finition après effort',
      'Bonne énergie générale du groupe',
    ],
  },
  {
    slug: 'communique-officiel',
    title: 'Communiqué officiel',
    category: 'Club',
    image: '/joueur/extracted/599236964_18547431706012336_2518205431165781947_n.jpg',
    excerpt: "Le club confirme l'organisation du week-end et remercie les bénévoles pour leur implication.",
    dateLabel: '22 Fév 2026',
    intro:
      'Le club confirme la tenue du programme prévu ce week-end et souligne l\'implication des bénévoles qui accompagnent l\'organisation des activités.',
    content: [
      'Les horaires, les espaces de travail et les points de rassemblement restent maintenus selon le planning transmis par le staff. Les différents responsables poursuivent la coordination pour fluidifier l\'accueil des joueurs et des familles.',
      'FC TORO tient à mettre en avant le travail souvent invisible des personnes qui aident à installer, orienter, informer et accompagner le bon déroulement des activités. Cette chaîne de soutien fait partie de la vie du club.',
      'Le communiqué rappelle aussi que la qualité d\'une structure ne dépend pas uniquement du terrain, mais également de la rigueur collective autour de chaque rendez-vous.',
    ],
    keyPoints: [
      'Organisation du week-end maintenue',
      'Reconnaissance du rôle des bénévoles',
      'Coordination renforcée autour des activités',
    ],
  },
  {
    slug: 'le-succes-de-la-saison-2013-14',
    title: 'Le succès de la saison 2013-14',
    category: 'Rétro',
    image: '/joueur/extracted/629347230_17886988737431630_560677091584659157_n.jpg',
    excerpt: 'Retour sur une année référence : discipline collective, identité de jeu et mental fort.',
    dateLabel: 'Archive',
    intro:
      'La saison 2013-14 reste un repère fort dans la mémoire du club, autant pour la qualité du jeu produit que pour l\'exigence collective visible à chaque sortie.',
    content: [
      'Cette période a marqué une étape importante dans la construction de l\'identité FC TORO. Le groupe montrait déjà une forte cohésion et une capacité à rester fidèle à son plan de jeu.',
      'Le succès de cette saison ne s\'explique pas seulement par les résultats. Il tient aussi à l\'engagement quotidien, à la discipline installée autour des séances et à la confiance partagée entre joueurs et staff.',
      'Revenir sur cette année permet de rappeler que les meilleures dynamiques se construisent sur la durée, à travers des habitudes de travail et une culture collective solide.',
    ],
    keyPoints: [
      'Saison référence pour le club',
      'Identité de jeu déjà forte',
      'Discipline et mental comme base du succès',
    ],
  },
  {
    slug: 'preparation-du-week-end',
    title: 'Préparation du week-end',
    category: 'Club',
    image: '/joueur/extracted/621203459_18554581459012336_4537330016788795057_n.jpg',
    excerpt: 'Le staff ajuste les détails tactiques avant la prochaine rencontre.',
    dateLabel: '21 Fév 2026',
    intro:
      'La préparation du week-end s\'organise autour des derniers réglages tactiques, de la gestion des temps de travail et de la clarté des consignes avant match.',
    content: [
      'Le staff cherche à réduire les zones d\'incertitude pour que le groupe aborde la rencontre avec une lecture simple de ses missions. Les échanges insistent sur les distances entre les lignes et les solutions de sortie.',
      'Les derniers jours avant match servent aussi à doser la charge physique. L\'idée est de conserver de la fraicheur tout en gardant l\'équipe connectée à son plan de jeu.',
      'Cette phase de préparation permet enfin de rappeler les standards du club : rigueur, écoute et capacité à répondre ensemble quand le match change de rythme.',
    ],
    keyPoints: [
      'Réglages tactiques finaux',
      'Gestion de la fraicheur du groupe',
      'Consignes recentrées sur les standards club',
    ],
  },
  {
    slug: 'focus-academie-u15',
    title: 'Focus académie U15',
    category: 'Académie',
    image: '/joueur/extracted/575274167_18540323572012336_6438757876049095178_n.jpg',
    excerpt: 'Travail technique et maitrise du tempo au coeur de la séance.',
    dateLabel: '20 Fév 2026',
    intro:
      'La catégorie U15 poursuit un travail centré sur la qualité technique, la gestion du tempo et la compréhension progressive des temps du match.',
    content: [
      'Les séances multiplient les situations où les joueurs doivent recevoir, orienter et jouer juste en peu de touches. Le but est de rendre les prises d\'information plus naturelles.',
      'Le staff insiste également sur la maitrise du rythme : savoir accélérer, calmer et faire vivre le ballon selon le contexte. Cette lecture du tempo aide les jeunes à mieux comprendre le jeu.',
      'Le projet académie cherche à poser des fondations solides plutôt qu\'à chercher des effets rapides. La catégorie U15 reste un moment clé pour fixer ces habitudes.',
    ],
    keyPoints: [
      'Accent sur la qualité technique',
      'Travail sur le tempo du jeu',
      'Base importante du parcours académie',
    ],
  },
  {
    slug: 'esprit-collectif-renforce',
    title: 'Esprit collectif renforcé',
    category: 'Entrainement',
    image: '/joueur/extracted/566965214_18535346428012336_1378637816694320324_n.jpg',
    excerpt: 'Une semaine marquée par l\'intensité, l\'entraide et la discipline.',
    dateLabel: '19 Fév 2026',
    intro:
      'La semaine a renforcé l\'impression d\'un groupe plus uni, plus exigeant avec lui-même et plus disponible dans l\'effort collectif.',
    content: [
      'Au fil des séances, le staff a observé davantage de communication utile, de soutien entre les joueurs et de réactions plus rapides après perte. Ces petits détails construisent une vraie dynamique.',
      'L\'intensité produite ne vaut que si elle reste maitrisée et mise au service du collectif. Le groupe progresse justement dans cette capacité à jouer fort sans se disperser.',
      'Ce climat de travail plus mature est encourageant pour la suite. Il devra maintenant se voir dans la compétition et dans la régularité des performances.',
    ],
    keyPoints: [
      'Communication plus juste',
      'Entraide et discipline visibles',
      'Base positive pour la suite',
    ],
  },
]
