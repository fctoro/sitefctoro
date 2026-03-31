'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { HomeNavbar } from '@/components/home-navbar'
import {
  RiCheckLine,
  RiShieldStarLine,
  RiFireLine,
  RiFocusLine,
} from '@remixicon/react'

const eliteData = {
  title: 'FC TORO ELITE - Le pont entre formation et excellence',
  intro:
    "Le programme FC TORO Elite est né d'un besoin clair : offrir une continuité aux joueurs talentueux issus de l'académie et de l'école de football FC TORO. Trop souvent, le passage entre la formation des jeunes et le football adulte laisse un vide. Notre responsabilité est de combler cet écart. L'Équipe Elite représente cette réponse.",
  section1: {
    title: 'Une Plateforme de Transition',
    text:
      "FC TORO Elite est une structure dédiée à accompagner les joueurs dans leur évolution vers un niveau supérieur. C'est un espace où :",
    items: [
      'Le talent est structuré',
      'Le potentiel est affiné',
      "La compétition devient un terrain d'apprentissage",
    ],
    outro:
      'Le programme agit comme un accélérateur de développement, préparant les joueurs à :',
    outroItems: [
      'Intégrer le projet CASA (Caribbean Sports Academy)',
      'Accéder aux sélections nationales',
      'Rejoindre les clubs de première division et le football professionnel',
    ],
  },
  section2: {
    title: 'Une Identité Forte',
    quote: '"Nous ne copions pas. Nous créons."',
    text:
      "Le développement ne se limite pas à la performance immédiate. Il s'appuie sur des fondations durables :",
    items: ['Identité > Résultat', 'Processus > Performance', 'Valeurs > Talent'],
  },
  section3: {
    title: 'Le Code Toro',
    quote: '"Ce n\'est pas un simple symbole. C\'est un standard."',
    text:
      "L'équipe Elite incarne un niveau d'exigence supérieur, symbolisé par Le Code Toro. Basé sur trois piliers fondamentaux :",
    items: [
      'Présence - calme, concentration, maîtrise de soi',
      'Maîtrise - contrôle, précision, intelligence du jeu',
      "Émergence - évolution consciente vers le haut niveau",
    ],
  },
  section4: {
    title: 'Une Vision à Long Terme',
    text:
      "L'Équipe Elite est la vitrine du club et la fondation du futur. Elle s'inscrit dans une vision structurée :",
    items: [
      'Stabiliser un groupe compétitif',
      'Construire une culture professionnelle',
      'Exposer les joueurs à des compétitions semi-professionnelles',
      "Créer une identité reconnue à l'échelle nationale",
    ],
  },
  section5: {
    title: "Plus qu'une équipe, un Mouvement",
    text:
      "FC TORO Elite n'est pas seulement une équipe. C'est un passage. Un seuil. Une transformation. Un espace où les joueurs deviennent :",
    items: ['Plus conscients', 'Plus responsables', 'Plus complets'],
    outro: 'Et surtout, prêts.',
  },
}

const eliteRoster = [
  { name: 'Andre Rayoholdy', image: '/elite/contract/andre-rayoholdy.png', tone: 'blue' },
  { name: 'Fils-Aime Garryson', image: '/elite/contract/fils-aime-garryson.png', tone: 'red' },
  { name: 'Jacquet Feguens', image: '/elite/contract/jacquet-feguens.png', tone: 'blue' },
  { name: 'Jhon-Love Estime', image: '/elite/contract/jhon-love-estime.png', tone: 'red' },
  { name: 'Joseph Jean-Wood', image: '/elite/contract/joseph-jean-wood.png', tone: 'blue' },
  { name: 'Meranvil Bill', image: '/elite/contract/meranvil-bill.png', tone: 'red' },
  { name: 'Metellus Rozales', image: '/elite/contract/metellus-rozales.png', tone: 'blue' },
  { name: 'Orelus Andy', image: '/elite/contract/orelus-andy.png', tone: 'red' },
  { name: 'Paul Jefferson', image: '/elite/contract/paul-jefferson.png', tone: 'blue' },
  { name: 'Samon Christopher', image: '/elite/contract/samon-christopher.png', tone: 'red' },
]

export default function ElitePage() {
  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative h-[220px] overflow-hidden bg-[#0a1d3a] text-white md:h-[300px]">
          <Image
            src="/joueur/extracted/591149277_18545355826012336_6701584250153829576_n.jpg"
            alt="FC TORO ELITE"
            fill
            priority
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1d3a] via-[#0a1d3a]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#ef233c] via-[#ef233c]/50 to-transparent" />

          <div className="relative z-10 mx-auto flex h-full max-w-[1100px] flex-col justify-center px-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">
                Excellence & Performance
              </p>
              <h1 className="text-4xl font-black uppercase leading-[0.8] tracking-tighter drop-shadow-2xl md:text-6xl">
                {eliteData.title}
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[900px]">
            <div className="flex flex-col items-center gap-12 md:flex-row">
              <div className="flex-1">
                <h2 className="mb-6 text-xl font-black uppercase tracking-tight text-[#ef233c]">
                  Introduction
                </h2>
                <p className="text-lg font-medium leading-relaxed text-[#445b7f]">
                  {eliteData.intro}
                </p>
              </div>

              <div className="relative h-[350px] w-full rotate-2 overflow-hidden rounded-3xl shadow-2xl md:w-[350px]">
                <Image
                  src="/joueur/extracted/634150827_18560832649012336_7495873752742897530_n.jpg"
                  alt="Elite Training"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ef233c]/30 to-transparent" />
          <div className="pointer-events-none absolute left-[-8rem] top-20 h-64 w-64 rounded-full bg-[#1a4ea3]/8 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-[-6rem] h-72 w-72 rounded-full bg-[#ef233c]/8 blur-3xl" />

          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-[760px]">
                <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
                  Joueurs FC TORO Elite
                </p>
                <h2 className="mt-4 text-[clamp(2rem,4vw,3.6rem)] font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#0d2d62]">
                  10 joueurs faisant
                  <br />
                  partie de FC TORO Elite.
                </h2>
              </div>

              <p className="max-w-[480px] text-sm leading-relaxed text-[#5c7297] sm:text-base">
                Quelques joueurs faisant partie du groupe FC TORO Elite.
              </p>
            </div>

            <div className="mt-12 rounded-[36px] border border-[#e3ebf7] bg-[linear-gradient(180deg,#ffffff_0%,#f7faff_100%)] p-4 shadow-[0_24px_70px_rgba(10,29,58,0.08)] sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {eliteRoster.map((player, index) => {
                  const isRed = player.tone === 'red'

                  return (
                    <motion.article
                      key={player.name}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: index * 0.03 }}
                      viewport={{ once: true, amount: 0.18 }}
                      className="group"
                    >
                      <div
                        className={`relative aspect-[0.78] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_18px_38px_rgba(10,29,58,0.18)] transition-transform duration-300 group-hover:-translate-y-1 ${
                          isRed
                            ? 'bg-[linear-gradient(180deg,#ff304c_0%,#d71131_100%)]'
                            : 'bg-[linear-gradient(180deg,#1b63d2_0%,#0f377d_100%)]'
                        }`}
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.32),rgba(255,255,255,0)_45%)]" />
                        <div
                          className={`absolute inset-y-0 right-0 z-20 w-[20%] border-l border-white/16 ${
                            isRed
                              ? 'bg-[linear-gradient(180deg,#f63f5f_0%,#c81131_100%)]'
                              : 'bg-[linear-gradient(180deg,#2f79ee_0%,#0e3f96_100%)]'
                          }`}
                        />
                        <div className="absolute inset-y-0 right-[20%] z-20 w-px bg-white/12" />

                        <div className="absolute bottom-0 left-[-4%] right-[18%] top-3 z-10">
                          <Image
                            src={player.image}
                            alt={player.name}
                            fill
                            sizes="(min-width: 1024px) 18vw, (min-width: 640px) 42vw, 92vw"
                            className="object-contain object-bottom drop-shadow-[0_18px_28px_rgba(5,15,35,0.32)] scale-[1.08]"
                          />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(6,15,35,0)_0%,rgba(6,15,35,0.34)_100%)]" />

                        <div className="absolute bottom-5 left-4 h-[3px] w-14 rounded-full bg-white/80" />

                        <div className="absolute inset-y-0 right-0 z-30 w-[20%]">
                          <div className="absolute left-1/2 top-1/2 w-[260px] -translate-x-1/2 -translate-y-1/2 -rotate-90 text-center transition-transform duration-300 group-hover:scale-[1.12]">
                            <span className="block whitespace-nowrap text-[0.62rem] font-black uppercase tracking-[0.12em] text-white transition-[letter-spacing] duration-300 group-hover:tracking-[0.16em] sm:text-[0.72rem]">
                              {player.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f8fafc] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid gap-16 md:grid-cols-2">
              <div className="space-y-8">
                <div className="inline-block rounded-2xl bg-[#ef233c]/10 p-4">
                  <RiShieldStarLine className="h-10 w-10 text-[#ef233c]" />
                </div>
                <h3 className="text-2xl font-black uppercase leading-none">
                  {eliteData.section1.title}
                </h3>
                <p className="text-base text-[#445b7f]">{eliteData.section1.text}</p>

                <ul className="space-y-4">
                  {eliteData.section1.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 font-bold">
                      <RiCheckLine className="h-6 w-6 text-[#ef233c]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative overflow-hidden rounded-[40px] bg-[#0a2347] p-10 text-white shadow-xl">
                <div className="absolute right-0 top-0 p-10 opacity-10">
                  <RiShieldStarLine className="h-40 w-40" />
                </div>

                <h4 className="relative z-10 mb-8 text-2xl font-black">
                  {eliteData.section1.outro}
                </h4>

                <div className="relative z-10 space-y-6">
                  {eliteData.section1.outroItems.map((item, idx) => (
                    <div
                      key={item}
                      className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ef233c] text-[10px] font-black">
                        {idx + 1}
                      </span>
                      <p className="font-semibold text-white/90">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 -rotate-90 select-none text-[15vw] font-black uppercase text-gray-50">
            IDENTITY
          </div>

          <div className="relative z-10 mx-auto max-w-[800px] text-center">
            <RiFireLine className="mx-auto mb-6 h-12 w-12 text-[#ef233c]" />
            <h3 className="mb-8 text-2xl font-black uppercase md:text-3xl">
              {eliteData.section2.title}
            </h3>
            <p className="mb-10 text-xl font-black italic text-[#ef233c] md:text-2xl">
              {eliteData.section2.quote}
            </p>
            <p className="mb-12 text-base text-[#445b7f]">{eliteData.section2.text}</p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {eliteData.section2.items.map((item) => (
                <div
                  key={item}
                  className="group rounded-2xl border-2 border-gray-100 p-8 transition-colors hover:border-[#ef233c]"
                >
                  <p className="text-xl font-black transition-colors group-hover:text-[#ef233c]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0a1d3a] px-4 py-24 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid items-center gap-20 md:grid-cols-2">
              <div className="relative">
                <div className="relative aspect-square w-full overflow-hidden rounded-[40px] border-8 border-white/5">
                  <Image
                    src="/joueur/extracted/542448727_18525142066012336_8843479393054800058_n.jpg"
                    alt="Code Toro Football"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#ef233c] px-4 py-2 text-xs font-black uppercase tracking-widest">
                  <RiFocusLine className="h-4 w-4" /> The Toro Code
                </div>

                <h3 className="text-3xl font-black uppercase leading-tight">
                  {eliteData.section3.title}
                </h3>

                <p className="border-l-4 border-[#ef233c] pl-6 text-lg italic leading-relaxed text-white/70">
                  {eliteData.section3.quote}
                </p>

                <p className="text-base text-white/60">{eliteData.section3.text}</p>

                <div className="space-y-4">
                  {eliteData.section3.items.map((item) => (
                    <div key={item} className="flex items-center gap-4">
                      <div className="h-2 w-12 rounded-full bg-[#ef233c]" />
                      <span className="text-xl font-black uppercase tracking-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
              <div>
                <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-[#ef233c]">
                  Strategie
                </p>
                <h3 className="text-3xl font-black uppercase leading-[0.9]">
                  {eliteData.section4.title}
                </h3>
              </div>

              <p className="max-w-md border-l-2 border-gray-200 pl-6 text-base font-medium text-[#445b7f]">
                {eliteData.section4.text}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {eliteData.section4.items.map((item, idx) => (
                <div
                  key={item}
                  className="rounded-3xl border border-gray-100 bg-[#f8fafc] p-10 transition-all hover:-translate-y-2 hover:shadow-xl"
                >
                  <span className="mb-6 block text-4xl font-black text-gray-200">
                    0{idx + 1}
                  </span>
                  <p className="text-xl font-black uppercase leading-tight">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(135deg,#ef233c,#d11b34)] px-4 py-24 text-center text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[800px]">
            <h3 className="mb-10 text-3xl font-black uppercase leading-none md:text-5xl">
              {eliteData.section5.title}
            </h3>

            <p className="mb-12 text-lg font-medium text-white/90 md:text-xl">
              {eliteData.section5.text}
            </p>

            <div className="mb-12 flex flex-wrap justify-center gap-6">
              {eliteData.section5.items.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white px-8 py-4 text-xl font-black uppercase text-[#ef233c] shadow-lg"
                >
                  {item}
                </div>
              ))}
            </div>

            <p className="select-none text-3xl font-black uppercase tracking-[0.2em] opacity-30 md:text-4xl">
              {eliteData.section5.outro}
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
