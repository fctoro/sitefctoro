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
  { name: 'Nixon Louis', role: 'Défenseur', image: '/joueur/extracted/560388188_18531457003012336_702922180697776333_n.jpg' },
  { name: 'Dylan Toro', role: 'Ailier', image: '/joueur/extracted/487859566_18496314202012336_4490722394926427967_n.jpg' },
  { name: 'Ruben Alexis', role: 'Capitaine', image: '/joueur/extracted/634150827_18560832649012336_7495873752742897530_n.jpg' },
  { name: 'Aguero Michel', role: 'Attaquant', image: '/staff-photos/aguero-michel.jpg' },
  { name: 'Angelo Lauré', role: 'Milieu', image: '/staff-photos/angelo-lauré.jpg' },
  { name: 'Angelson Fils-Aimé', role: 'Ailier', image: '/staff-photos/angelson-fils-aimé-2.jpg' },
  { name: 'Billy Vilsaint', role: 'Défenseur', image: '/staff-photos/billy-vilsaint.jpg' },
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
    label: 'Élite',
    title: "Les jeunes talents du FC TORO réunis sur le terrain, incarnant l’avenir du football haïtien.",
    cta: 'Découvrir',
    href: '/elite',
    image: '/home/hero-elite-optimized.jpg',
  },
]

// Les actualités affichées sur le site viennent uniquement de la base de données.
export const newsCards: NewsCard[] = []
