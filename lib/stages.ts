export type StageBlock = {
  title: string
  items: string[]
}

export type StageOpening = {
  slug: string
  title: string
  category: string
  type: string
  location: string
  ageGroup: string
  languages: string[]
  publishedBy: string
  publishedAt: string
  supervisor: string
  startDate: string
  contractType: string
  image: string
  summary: string
  intro: string[]
  mission: string[]
  responsibilities: StageBlock[]
  requirements: StageBlock[]
}

export const stageOpenings: StageOpening[] = [
  {
    slug: 'assistant-coach-u13',
    title: 'Assistant Coach U13',
    category: 'Coaching',
    type: 'Stage',
    location: 'Petion-Ville, Haiti',
    ageGroup: 'U13',
    languages: ['Creole', 'Francais'],
    publishedBy: 'Equipe technique FC TORO',
    publishedAt: 'March 27, 2026',
    supervisor: 'Responsable Academie',
    startDate: 'Juin 2026',
    contractType: 'Stage de 3 mois',
    image: '/joueur/extracted/583167774_18542869372012336_2307311757000245016_n.jpg',
    summary:
      'Accompagner les seances U13, soutenir les coachs principaux et renforcer les fondamentaux techniques des jeunes joueurs.',
    intro: [
      'FC TORO cherche un profil de terrain capable d accompagner le groupe U13 dans un cadre structure, exigeant et bienveillant.',
      'Le stage permet de vivre le quotidien du club, d observer la planification technique et de participer activement au developpement des jeunes.',
    ],
    mission: [
      'Ce role soutient la mise en place des exercices, la gestion du groupe et la qualite des transitions pendant les seances.',
      'Le stagiaire contribue aussi a la preparation des matchs, au suivi individuel et a la transmission des valeurs du club.',
    ],
    responsibilities: [
      {
        title: 'Responsabilites principales',
        items: [
          'Assister le coach principal sur les seances U13 et les matchs de week-end.',
          'Aider a l installation du materiel et au rythme des ateliers techniques.',
          'Observer les joueurs et remonter les points de progression au staff.',
          'Encourager la discipline, la ponctualite et la concentration du groupe.',
        ],
      },
      {
        title: 'Vie de club',
        items: [
          'Participer aux reunions techniques courtes avant et apres les seances.',
          'Representer l identite FC TORO dans les interactions avec joueurs et parents.',
          'Contribuer aux temps forts du club pendant les tournois et activites academie.',
        ],
      },
    ],
    requirements: [
      {
        title: 'Profil recherche',
        items: [
          'Bonne base en pedagogie sportive ou en football de formation.',
          'Capacite a communiquer clairement avec des jeunes joueurs.',
          'Interet marque pour l apprentissage du coaching de terrain.',
          'Disponibilite sur plusieurs fins de journee et certains week-ends.',
        ],
      },
    ],
  },
  {
    slug: 'analyste-video-performance',
    title: 'Analyste Video Performance',
    category: 'Performance',
    type: 'Stage',
    location: 'Petion-Ville, Haiti',
    ageGroup: 'Elite',
    languages: ['Creole', 'Francais', 'Anglais'],
    publishedBy: 'Cellule performance FC TORO',
    publishedAt: 'March 24, 2026',
    supervisor: 'Coordinateur Performance',
    startDate: 'Mai 2026',
    contractType: 'Stage de 4 mois',
    image: '/joueur/extracted/591149277_18545355826012336_6701584250153829576_n.jpg',
    summary:
      'Structurer la video match et entrainement pour aider le staff a mieux lire le jeu et accompagner la progression individuelle.',
    intro: [
      'Le programme Elite a besoin d un regard rigoureux sur la video pour mieux preparer les matchs et capitaliser sur les seances.',
      'Ce stage s adresse a un profil organise, curieux et capable de transformer des observations en retours utiles.',
    ],
    mission: [
      'Le stagiaire aide au derush des videos, a la preparation de clips courts et a la production de sequences exploitables par le staff.',
      'Le role consiste aussi a ordonner l information pour rendre la lecture plus rapide et plus claire apres les matchs.',
    ],
    responsibilities: [
      {
        title: 'Analyse et traitement',
        items: [
          'Classer les sequences match par phases de jeu et situations clefs.',
          'Produire des clips courts pour les feedbacks d equipe et les suivis individuels.',
          'Identifier des tendances sur la sortie de balle, les transitions et les duels.',
        ],
      },
      {
        title: 'Collaboration staff',
        items: [
          'Echanger regulierement avec le staff technique sur les priorites video.',
          'Participer a la preparation des supports de debrief et pre-match.',
          'Maintenir une bibliotheque video propre et facile a consulter.',
        ],
      },
    ],
    requirements: [
      {
        title: 'Profil recherche',
        items: [
          'Interet fort pour l analyse tactique et la lecture du jeu.',
          'Aisance avec l organisation de fichiers et les outils video.',
          'Capacite a synthese, rigueur et confidentialite.',
          'Connaissance du football de formation ou competitif appreciee.',
        ],
      },
    ],
  },
  {
    slug: 'community-manager-matchday',
    title: 'Community Manager Matchday',
    category: 'Media',
    type: 'Stage',
    location: 'Petion-Ville, Haiti',
    ageGroup: 'Club',
    languages: ['Creole', 'Francais'],
    publishedBy: 'Media club FC TORO',
    publishedAt: 'March 20, 2026',
    supervisor: 'Responsable Communication',
    startDate: 'Avril 2026',
    contractType: 'Stage de 3 mois',
    image: '/joueur/extracted/634150827_18560832649012336_7495873752742897530_n.jpg',
    summary:
      'Animer les reseaux du club pendant les seances, les matchs et les activites communautaires avec une ligne editoriale forte.',
    intro: [
      'FC TORO veut renforcer sa presence digitale avec un contenu plus regulier, plus propre et plus proche du terrain.',
      'Le stage permet de participer a la couverture des temps forts du club et a la valorisation des jeunes talents.',
    ],
    mission: [
      'Le stagiaire contribue a la prise de contenu, a la redaction de captions et a la publication rapide des moments importants.',
      'Il aide aussi a maintenir une coherence visuelle et editoriale sur les canaux du club.',
    ],
    responsibilities: [
      {
        title: 'Contenu et diffusion',
        items: [
          'Capturer photos, reels et stories sur les matchs et entrainements.',
          'Rediger des textes courts, clairs et alignes avec l identite FC TORO.',
          'Programmer ou publier les contenus prioritaires selon le calendrier du club.',
        ],
      },
      {
        title: 'Coordination',
        items: [
          'Echanger avec le staff et les coachs pour recuperer les infos fiables.',
          'Mettre en valeur joueurs, staff, sponsors et projets du club.',
          'Suivre les retours d audience et proposer des formats plus efficaces.',
        ],
      },
    ],
    requirements: [
      {
        title: 'Profil recherche',
        items: [
          'Bonne sensibilite image, video courte et narration digitale.',
          'Capacite a travailler vite les jours de match.',
          'Orthographe correcte et sens du detail.',
          'Interet reel pour le football, la jeunesse et l image de club.',
        ],
      },
    ],
  },
  {
    slug: 'coordinateur-stage-vacances',
    title: 'Coordinateur Stage Vacances',
    category: 'Operations',
    type: 'Stage',
    location: 'Petion-Ville, Haiti',
    ageGroup: 'U11-U17',
    languages: ['Creole', 'Francais'],
    publishedBy: 'Operations FC TORO',
    publishedAt: 'March 18, 2026',
    supervisor: 'Direction du club',
    startDate: 'Juillet 2026',
    contractType: 'Mission saisonniere',
    image: '/joueur/extracted/542448727_18525142066012336_8843479393054800058_n.jpg',
    summary:
      'Organiser les stages vacances du club avec une logistique fiable, un accueil propre et un lien fluide avec les familles.',
    intro: [
      'Pendant les periodes de vacances, FC TORO met en place des formats intensifs pour accelerer les acquis techniques et la vie collective.',
      'Le coordinateur stage accompagne la mise en route et la qualite operationnelle de ces programmes.',
    ],
    mission: [
      'Le role assure la fluidite entre planning, accueil, communication et execution terrain.',
      'Il soutient les coachs et la direction pour offrir une experience serieuse et rassurante aux familles.',
    ],
    responsibilities: [
      {
        title: 'Organisation',
        items: [
          'Centraliser les listes participants, les horaires et les informations pratiques.',
          'Coordonner l accueil quotidien, le pointage et la circulation des groupes.',
          'Verifier la disponibilite du materiel, des espaces et des besoins du staff.',
        ],
      },
      {
        title: 'Suivi familles',
        items: [
          'Repondre aux questions courantes des parents avant et pendant les stages.',
          'Partager les rappels utiles et les consignes logistiques.',
          'Contribuer a une experience club claire, ponctuelle et professionnelle.',
        ],
      },
    ],
    requirements: [
      {
        title: 'Profil recherche',
        items: [
          'Bonne organisation, aisance relationnelle et sens du service.',
          'Capacite a gerer plusieurs priorites dans la meme journee.',
          'Experience en evenementiel, sport ou coordination appreciee.',
          'Disponibilite forte pendant la periode vacances.',
        ],
      },
    ],
  },
  {
    slug: 'assistant-scouting-developpement',
    title: 'Assistant Scouting & Developpement',
    category: 'Scouting',
    type: 'Stage',
    location: 'Petion-Ville, Haiti',
    ageGroup: 'U15-U20',
    languages: ['Creole', 'Francais'],
    publishedBy: 'Scouting FC TORO',
    publishedAt: 'March 16, 2026',
    supervisor: 'Responsable Detection',
    startDate: 'Mai 2026',
    contractType: 'Stage de 3 mois',
    image: '/joueur/extracted/621203459_18554581459012336_4537330016788795057_n.jpg',
    summary:
      'Observer les profils, structurer les notes de terrain et aider la cellule detection a mieux suivre les potentiels du club.',
    intro: [
      'FC TORO veut consolider sa capacite a reperer, suivre et comprendre les profils en progression.',
      'Ce stage s adresse a une personne attentive, rigoureuse et proche de la realite du terrain.',
    ],
    mission: [
      'Le stagiaire accompagne les observations en entrainement et en competition, puis structure les retours dans un format clair.',
      'Il aide aussi a identifier les signaux utiles pour la suite du parcours academie, Elite ou detection externe.',
    ],
    responsibilities: [
      {
        title: 'Observation',
        items: [
          'Prendre des notes de terrain sur les comportements, le rythme et la lecture du jeu.',
          'Suivre les profils sur plusieurs seances pour eviter les lectures trop rapides.',
          'Mettre en avant les points forts, les axes de progression et le potentiel.',
        ],
      },
      {
        title: 'Reporting',
        items: [
          'Rassembler les informations dans un format simple et exploitable.',
          'Partager des retours synthetiques avec le responsable detection.',
          'Maintenir une base de suivi propre sur les profils observes.',
        ],
      },
    ],
    requirements: [
      {
        title: 'Profil recherche',
        items: [
          'Bonne culture football et capacite d observation.',
          'Patience, rigueur et sens de la nuance dans l evaluation.',
          'Aisance ecrite pour formaliser les retours.',
          'Volonte d apprendre les standards FC TORO en detection.',
        ],
      },
    ],
  },
  {
    slug: 'preparateur-physique-junior',
    title: 'Preparateur Physique Junior',
    category: 'Performance',
    type: 'Stage',
    location: 'Petion-Ville, Haiti',
    ageGroup: 'Elite-U17',
    languages: ['Creole', 'Francais'],
    publishedBy: 'Performance FC TORO',
    publishedAt: 'March 14, 2026',
    supervisor: 'Responsable Performance',
    startDate: 'Mai 2026',
    contractType: 'Stage de 4 mois',
    image: '/joueur/extracted/575274167_18540323572012336_6438757876049095178_n.jpg',
    summary:
      'Soutenir les seances de preparation physique, le retour a l effort et la prevention dans un cadre de formation exigeant.',
    intro: [
      'La progression des joueurs passe aussi par une meilleure culture de l effort, de la recuperation et de la prevention.',
      'Ce stage aide a structurer les routines physiques en lien avec les besoins du terrain et l age des joueurs.',
    ],
    mission: [
      'Le stagiaire assiste la planification physique et contribue au bon deroulement des routines avant, pendant et apres les seances.',
      'Il collabore avec le staff pour rendre la charge de travail plus lisible et plus adaptee au profil des groupes.',
    ],
    responsibilities: [
      {
        title: 'Terrain',
        items: [
          'Assister l echauffement, les routines motrices et les activations.',
          'Suivre la qualite d execution et corriger les details simples.',
          'Aider a installer les ateliers lies a la vitesse, coordination et gainage.',
        ],
      },
      {
        title: 'Suivi',
        items: [
          'Reporter les observations sur la fatigue, la disponibilite et la recuperation.',
          'Participer a la mise en place d habitudes de prevention et d hygiene sportive.',
          'Contribuer a une culture performance simple, claire et applicable.',
        ],
      },
    ],
    requirements: [
      {
        title: 'Profil recherche',
        items: [
          'Base solide en preparation physique ou sciences du sport.',
          'Capacite a communiquer sur le terrain avec energie et clarte.',
          'Interet pour la formation des jeunes et la progression long terme.',
          'Disponibilite reguliere en semaine.',
        ],
      },
    ],
  },
]

export const getStageBySlug = (slug: string) =>
  stageOpenings.find((opening) => opening.slug === slug)
