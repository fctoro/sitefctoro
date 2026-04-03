'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { HomeNavbar } from '@/components/home-navbar'
import patricImage from '@/img/staf/patric.jpg'
import {
  RiArrowRightLine,
  RiCalendarLine,
  RiEyeLine,
  RiFireLine,
  RiFlashlightLine,
  RiFocusLine,
  RiGlobalLine,
  RiGroupLine,
  RiHeartsLine,
  RiKeyLine,
  RiLightbulbLine,
  RiMedalLine,
  RiShieldStarLine,
  RiStarLine,
  RiTrophyLine,
  RiUserLine,
} from '@remixicon/react'

const staffMoments = [
  {
    title: 'Direction terrain',
    body: 'Une présence claire pour guider le travail quotidien.',
    image: '/home/staff-direction.jpg',
  },
  {
    title: 'Travail quotidien',
    body: 'Des séances suivies avec rigueur et cohérence.',
    image: '/home/staff-field.jpg',
  },
  {
    title: 'Accompagnement',
    body: 'Un cadre stable pour accompagner chaque progression.',
    image: '/home/staff-support.jpg',
  },
]

const currentProjects = [
  {
    label: 'Académie',
    title: 'Garçons',
    body: 'Des catégories structurées pour accompagner la progression technique, tactique et humaine des jeunes joueurs.',
  },
  {
    label: 'Académie',
    title: 'Filles',
    body: 'Un cadre de travail adapté pour renforcer la progression, la régularité et la confiance des jeunes joueuses.',
  },
  {
    label: 'Projet',
    title: 'FC TORO Elite',
    body: 'Le groupe Elite sert de passerelle vers une exigence plus haute et une lecture plus mature du jeu.',
  },
  {
    label: 'Programme',
    title: 'Ti Toro',
    body: "Une entrée ludique dans le football pour les plus petits, avec des séances pensées pour l'éveil moteur et le plaisir.",
  },
  {
    label: 'Projet',
    title: 'CASA',
    body: 'Une orientation vers des opportunités de progression plus larges pour les profils qui veulent viser plus haut.',
  },
]

const values = [
  {
    label: 'Discipline',
    desc: 'Faire juste, même dans les détails simples du quotidien.',
    icon: RiShieldStarLine,
  },
  {
    label: 'Respect',
    desc: 'Respecter les coachs, les coéquipiers, les familles et les adversaires.',
    icon: RiGroupLine,
  },
  {
    label: 'Concentration',
    desc: 'Rester présent, lucide et impliqué dans le travail.',
    icon: RiFocusLine,
  },
  {
    label: 'Curiosité',
    desc: "Rester ouvert à l'apprentissage et aux corrections du staff.",
    icon: RiLightbulbLine,
  },
  {
    label: 'Passion',
    desc: 'Jouer avec envie, énergie et plaisir de progresser.',
    icon: RiHeartsLine,
  },
  {
    label: 'Confiance',
    desc: "Grandir avec assurance sans perdre l'humilité du travail.",
    icon: RiUserLine,
  },
  {
    label: 'Maîtrise de soi',
    desc: 'Garder son calme et son équilibre dans les moments difficiles.',
    icon: RiFlashlightLine,
  },
  {
    label: 'Responsabilité',
    desc: 'Représenter FC TORO avec sérieux sur le terrain et en dehors.',
    icon: RiKeyLine,
  },
  {
    label: 'Progression',
    desc: 'Chercher à faire mieux à chaque cycle de travail.',
    icon: RiTrophyLine,
  },
]

const missionItems = [
  { icon: RiUserLine, title: 'Développement complet', desc: 'Développer des joueurs techniquement et mentalement solides.' },
  { icon: RiShieldStarLine, title: 'Environnement structuré', desc: 'Offrir un environnement structuré, discipliné et inspirant.' },
  { icon: RiLightbulbLine, title: 'Éducation par le sport', desc: 'Utiliser le football comme un outil d\'éducation et de formation.' },
  { icon: RiStarLine, title: 'Opportunités', desc: 'Créer des opportunités vers le haut niveau et l\'avenir professionnel.' },
  { icon: RiGlobalLine, title: 'Écosystème durable', desc: 'Construire un écosystème durable autour du sport, de la culture et de la communauté.' },
]

const philosophyItems = [
  { icon: RiFlashlightLine, title: 'Win the day', desc: 'Discipline et engagement quotidien.' },
  { icon: RiFocusLine, title: 'Force & Conscience', desc: 'Équilibre entre force et conscience.' },
  { icon: RiShieldStarLine, title: 'Guerrier Invincible', desc: 'La mentalité du Guerrier Invincible.' },
  { icon: RiTrophyLine, title: 'Progression continue', desc: 'Progression continue avant le résultat.' },
  { icon: RiHeartsLine, title: 'Miroir de la vie', desc: 'Le football comme miroir de la vie.' },
]

const programItems = [
  { icon: RiGroupLine, title: 'École de Football', age: '2 à 19 ans', desc: 'Initiation, développement technique et plaisir du jeu.' },
  { icon: RiStarLine, title: 'Programme Elite', age: 'Haut potentiel', desc: 'Parcours de performance pour joueurs à haut potentiel.' },
  { icon: RiFireLine, title: 'Bootcamp Pré-saison', age: 'Tous niveaux', desc: 'Préparation physique et mentale intensive.' },
  { icon: RiEyeLine, title: 'Gardiens & Vision', age: 'Spécialisé', desc: 'Travail ciblé sur les réflexes, la prise de décision et la lecture du jeu.' },
  { icon: RiFlashlightLine, title: 'Power Zone', age: 'Rooftop', desc: 'Séances intensives axées sur la force, l\'endurance et l\'explosivité.' },
]

const competitionItems = [
  { title: 'Flagday', desc: 'Tournoi phare du club, dynamique et fédérateur.', accent: '#ef233c', href: '/evenements/flag-day' },
  { title: 'Vertières Cup', desc: 'Compétition mêlant sport, tourisme, culture et identité nationale.', accent: '#1a4ea3', href: '/evenements/vertieres-cup' },
  { title: 'Intrasquad', desc: 'Formats de tournois internes compétitifs favorisant le développement.', accent: '#ef233c', href: '/evenements/intrasquad' },
]

const ecosystemItems = [
  { title: 'Fulmoun Production', desc: 'Média, contenu et storytelling.', tag: 'Média' },
  { title: 'Snoizz', desc: 'Expérience food & lifestyle.', tag: 'Lifestyle' },
  { title: 'Merchandising', desc: 'Produits identitaires et culture club.', tag: 'Produits' },
  { title: 'CASA', desc: 'Vision long terme : un campus complet de formation.', tag: 'Campus' },
]

const timelineEvents = [
  { year: '2012', title: 'Création de FC Toro', desc: 'Naissance du club avec une vision claire : utiliser le football comme outil de formation et de développement.' },
  { year: '2015', title: 'Structuration de l\'académie', desc: 'Expansion des catégories et mise en place d\'un cadre de formation structuré pour accompagner chaque profil.' },
  { year: '2019', title: 'Programmes compétitifs', desc: 'Développement des programmes de compétition pour élever le niveau des joueurs et structurer leur parcours.' },
  { year: '2020', title: 'Identité & Méthodologie', desc: 'Renforcement de l\'identité du club et consolidation de la méthodologie de formation unique FC TORO.' },
  { year: '2022', title: 'Écosystème renforcé', desc: 'Développement du média, des événements et de la production autour du club pour créer un impact plus large.' },
  { year: '2023', title: 'Projets structurants', desc: 'Lancement de la Vertières Cup. Relance du programme féminin « Girl Squad ». 7 joueurs ont intégré la FHF pour remporter le U14 – CFU Challenge et couronnés « Prince des Caraïbes ».', featured: true },
  { year: '2025', title: 'Projet CASA', desc: 'Pause de première pierre : un campus complet de formation pour ancrer la vision de FC TORO dans le long terme.' },
  { year: '2026', title: 'Vision d\'expansion', desc: 'Digitalisation et structuration Elite pour une nouvelle ère de développement et d\'excellence.' },
]

export default function NotreHistoirePage() {
  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative h-[220px] overflow-hidden bg-[#0a1d3a] text-white md:h-[320px]">
          <Image
            src="/home/staff-direction.jpg"
            alt="Staff FC TORO"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1d3a] via-[#0a1d3a]/65 to-transparent" />
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#ef233c] via-[#ef233c]/55 to-transparent" />

          <div className="relative z-10 mx-auto flex h-full max-w-[1100px] flex-col justify-center px-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">
                Histoire & identité
              </p>
              <h1 className="text-3xl font-black uppercase leading-[0.82] tracking-tighter drop-shadow-2xl md:text-5xl">
                Le Club
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <p className="text-xs font-black uppercase tracking-[0.32em] text-[#ef233c] sm:text-sm">
                  Notre histoire
                </p>
                <h2 className="text-[clamp(1.65rem,3.2vw,2.9rem)] font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#0d2d62]">
                  D&apos;une initiative simple
                  <br />
                  à une vision qui grandit.
                </h2>

                <div className="space-y-4 text-sm font-medium leading-relaxed text-[#445b7f] sm:text-[15px]">
                  <p>
                    FC TORO est né le 1er septembre 2012 avec une intention simple mais forte :
                    offrir à quelques enfants un espace sain pour jouer, apprendre et évoluer dans
                    de bonnes conditions. Ce qui n&apos;était au départ qu&apos;une petite structure de
                    football amateur est devenu, avec le temps, un projet plus ambitieux et mieux
                    organisé.
                  </p>
                  <p>
                    Au fil des années, le club a construit un parcours plus lisible pour accompagner
                    les joueurs à chaque étape de leur développement : académie, football féminin,
                    groupe Elite, Ti Toro et projets de progression pensés pour prolonger leur
                    évolution.
                  </p>
                  <p>
                    Cette progression repose sur un travail de staff plus structuré, une lecture plus
                    fine des profils et une volonté constante d&apos;ouvrir des opportunités concrètes
                    aux jeunes qui veulent aller plus loin.
                  </p>
                  <p>
                    Aujourd&apos;hui, FC TORO avance avec une conviction claire : bâtir un cadre sérieux,
                    transmettre de bonnes habitudes et offrir aux joueurs un environnement durable
                    pour grandir comme sportifs et comme personnes.
                  </p>
                </div>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2 sm:grid-rows-[1fr_1fr]">
                <motion.article
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative min-h-[260px] overflow-hidden rounded-[28px] bg-[#0a1d3a] shadow-[0_18px_36px_rgba(10,29,58,0.14)] sm:row-span-2"
                >
                  <Image
                    src={staffMoments[0].image}
                    alt={staffMoments[0].title}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,43,0.08)_18%,rgba(7,19,43,0.84)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff9daa]">
                      Staff
                    </p>
                    <h3 className="mt-2 text-2xl font-black uppercase leading-[0.94]">
                      {staffMoments[0].title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/78">
                      {staffMoments[0].body}
                    </p>
                  </div>
                </motion.article>

                {staffMoments.slice(1).map((item, i) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 + 0.15 }}
                    className="relative min-h-[200px] overflow-hidden rounded-[24px] bg-[#0a1d3a] shadow-[0_16px_30px_rgba(10,29,58,0.12)]"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 18vw, 100vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,43,0.12)_20%,rgba(7,19,43,0.88)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <h3 className="text-lg font-black uppercase leading-tight">{item.title}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-white/78">{item.body}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f8fafc] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1260px]">
            <div className="grid gap-10 lg:grid-cols-[1.16fr_0.84fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative lg:order-1"
              >
                <div className="overflow-hidden rounded-[28px] shadow-[0_20px_38px_rgba(10,29,58,0.14)]">
                  <Image
                    src={patricImage}
                    alt="Patrick FC TORO"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-6 lg:order-2 lg:pl-4"
              >
                <p className="text-xs font-black uppercase tracking-[0.32em] text-[#ef233c] sm:text-sm">
                  Vision
                </p>
                <h2 className="text-[clamp(1.65rem,3.2vw,2.8rem)] font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#0d2d62]">
                  Devenir un modèle
                  <br />
                  d&apos;excellence.
                </h2>

                <div className="space-y-4 text-sm font-medium leading-relaxed text-[#445b7f] sm:text-[15px]">
                  <p>
                    Devenir un modèle d&apos;excellence dans le développement des jeunes en Haïti et
                    dans la Caraïbe.
                  </p>
                  <p>
                    FC TORO voit le football comme un outil de transformation personnelle et
                    collective, où chaque joueur développe discipline, confiance et responsabilité.
                  </p>
                  <p className="font-black uppercase tracking-[0.06em] text-[#ef233c]">
                    Notre vision : former une génération capable d&apos;impacter positivement la
                    société.
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/inscription/joueur"
                      className="inline-flex items-center gap-2 rounded-full bg-[#ef233c] px-6 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#d71931]"
                    >
                      Voir comment devenir joueur
                      <RiArrowRightLine className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/*
        <section className="bg-[#f8fafc] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
                  Structure actuelle
                </p>
                <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.5rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-[#0d2d62]">
                  Les projets FC TORO
                </h2>
              </div>

              <p className="max-w-[460px] text-sm font-medium leading-relaxed text-[#5b6f91] sm:text-[15px]">
                Une organisation plus lisible autour de la formation, de la progression et des
                passerelles qui structurent le parcours des joueurs.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {currentProjects.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[26px] border border-[#dbe5f2] bg-white p-6 shadow-[0_14px_28px_rgba(10,29,58,0.06)]"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ef233c]">
                    {item.label}
                  </p>
                  <h3 className="mt-3 text-xl font-black uppercase leading-[0.95] text-[#0a1d3a]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-[#5b6f91]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        */}

        {false && (
        <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[760px] text-center">
            <RiShieldStarLine className="mx-auto mb-6 h-10 w-10 text-[#ef233c]" />
            <h2 className="mb-5 text-xl font-black uppercase leading-tight md:text-2xl">
              Former avec exigence
            </h2>
            <p className="text-base font-semibold italic leading-relaxed text-[#445b7f]">
              À FC TORO, le football sert à encadrer, faire progresser et installer de bonnes
              habitudes de travail. Le club cherche à former des joueurs plus stables, plus
              concentrés et mieux préparés pour la suite de leur parcours.
            </p>
          </div>
        </section>
        )}

        {false && (
        <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-xl font-black uppercase leading-tight md:text-2xl">Valeurs</h2>
              <p className="text-sm font-black italic text-[#ef233c]">
                "La progression durable repose autant sur le cadre que sur le talent."
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value) => {
                const Icon = value.icon

                return (
                  <div
                    key={value.label}
                    className="group rounded-2xl border border-gray-100 bg-[#f8fafc] p-6 transition-all hover:border-[#ef233c] hover:shadow-xl"
                  >
                    <Icon className="mb-4 h-7 w-7 text-[#ef233c] transition-transform group-hover:scale-110" />
                    <h3 className="mb-2 text-lg font-black uppercase leading-tight">{value.label}</h3>
                    <p className="text-[13px] font-medium leading-relaxed text-[#445b7f]">
                      {value.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        )}

        {/* ═══════ MISSION ═══════ */}
        <section className="relative overflow-hidden bg-[#0a1d3a] px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="relative z-10 mx-auto max-w-[1100px]">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14 text-center">
              <p className="text-xs font-black uppercase tracking-[0.32em] text-[#ef233c] sm:text-sm">Mission</p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-[0.9] tracking-tighter md:text-4xl">
                Notre Mission<span className="text-[#ef233c]">.</span>
              </h2>
            </motion.div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
              {missionItems.map((item, i) => {
                const Icon = item.icon
                const desktopLayoutClass =
                  i === 3
                    ? 'lg:col-span-2 lg:col-start-2'
                    : i === 4
                      ? 'lg:col-span-2 lg:col-start-4'
                      : 'lg:col-span-2'

                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`group rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#ef233c]/30 hover:bg-white/[0.08] ${desktopLayoutClass}`}>
                    <Icon className="mb-4 h-7 w-7 text-[#ef233c] transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="mb-2 text-base font-black uppercase leading-tight">{item.title}</h3>
                    <p className="text-sm font-medium leading-relaxed text-white/60">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ═══════ PHILOSOPHIE ═══════ */}
        <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="relative z-10 mx-auto max-w-[1100px]">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <p className="text-xs font-black uppercase tracking-[0.32em] text-[#ef233c] sm:text-sm">Philosophie</p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-[0.9] tracking-tighter text-[#0d2d62] md:text-4xl">
                Notre Approche<span className="text-[#ef233c]">.</span>
              </h2>
              <p className="mt-4 max-w-[600px] text-sm font-medium leading-relaxed text-[#445b7f]">
                Notre approche repose sur une vision unique du développement du joueur. Nous formons des individus et des citoyens de demain.
              </p>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {philosophyItems.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="group relative overflow-hidden rounded-2xl border border-[#dbe5f2] bg-gradient-to-br from-[#f8fafc] to-white p-6 shadow-[0_8px_24px_rgba(10,29,58,0.06)] transition-all duration-300 hover:border-[#ef233c]/30 hover:shadow-[0_16px_40px_rgba(239,35,60,0.1)]">
                    <Icon className="mb-3 h-6 w-6 text-[#ef233c]" />
                    <h3 className="text-sm font-black uppercase leading-tight text-[#0a1d3a]">{item.title}</h3>
                    <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#5b6f91]">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ═══════ PROGRAMMES ═══════ */}
        <section className="bg-[#f8fafc] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1180px]">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <p className="text-xs font-black uppercase tracking-[0.32em] text-[#ef233c] sm:text-sm">Programmes</p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-[0.9] tracking-tighter text-[#0d2d62] md:text-4xl">
                Nos Programmes<span className="text-[#ef233c]">.</span>
              </h2>
              <p className="mt-4 max-w-[620px] text-sm font-medium leading-relaxed text-[#445b7f]">
                FC Toro propose un parcours structuré adapté à chaque niveau. Chaque programme est conçu pour accompagner le joueur dans sa progression globale.
              </p>
            </motion.div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
              {programItems.map((item, i) => {
                const Icon = item.icon
                const desktopLayoutClass =
                  i === 3
                    ? 'lg:col-span-2 lg:col-start-2'
                    : i === 4
                      ? 'lg:col-span-2 lg:col-start-4'
                      : 'lg:col-span-2'

                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`group relative overflow-hidden rounded-[22px] border border-[#dbe5f2] bg-white p-7 shadow-[0_14px_28px_rgba(10,29,58,0.06)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(10,29,58,0.12)] ${desktopLayoutClass}`}>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#ef233c]/8 px-3 py-1.5">
                      <Icon className="h-4 w-4 text-[#ef233c]" />
                      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#ef233c]">{item.age}</span>
                    </div>
                    <h3 className="text-xl font-black uppercase leading-tight text-[#0a1d3a]">{item.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-[#5b6f91]">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ═══════ COMPÉTITIONS ═══════ */}
        <section className="relative overflow-hidden bg-[#0a1d3a] px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="relative z-10 mx-auto max-w-[1100px]">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14 text-center">
              <p className="text-xs font-black uppercase tracking-[0.32em] text-[#ef233c] sm:text-sm">Compétitions</p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-[0.9] tracking-tighter md:text-4xl">
                Nos Événements<span className="text-[#ef233c]">.</span>
              </h2>
              <p className="mt-4 text-sm font-medium text-white/50">
                Des plateformes d&apos;expression, de visibilité et de progression.
              </p>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-3">
              {competitionItems.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08]">
                  <RiTrophyLine className="mb-5 h-8 w-8" style={{ color: item.accent }} />
                  <h3 className="text-2xl font-black uppercase leading-tight">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-white/55">{item.desc}</p>
                  <div className="mt-auto flex w-full justify-center pt-6">
                    <Link
                      href={item.href}
                      aria-label={`Voir ${item.title}`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white transition-all duration-300 hover:border-white/35 hover:bg-white/12"
                    >
                      <RiArrowRightLine className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ ÉCOSYSTÈME ═══════ */}
        <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <p className="text-xs font-black uppercase tracking-[0.32em] text-[#ef233c] sm:text-sm">Écosystème</p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-[0.9] tracking-tighter text-[#0d2d62] md:text-4xl">
                Au-delà du football<span className="text-[#ef233c]">.</span>
              </h2>
              <p className="mt-4 max-w-[650px] text-sm font-medium leading-relaxed text-[#445b7f]">
                Un écosystème où chaque activité contribue à financer et renforcer la mission sociale et sportive du club : un modèle intégré combinant sport, culture, business et impact social.
              </p>
            </motion.div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {ecosystemItems.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group rounded-[22px] border border-[#dbe5f2] bg-gradient-to-br from-[#f8fafc] to-white p-6 shadow-[0_10px_28px_rgba(10,29,58,0.06)] transition-all duration-300 hover:border-[#ef233c]/25 hover:shadow-[0_16px_40px_rgba(239,35,60,0.08)]">
                  <span className="inline-block rounded-full bg-[#ef233c]/8 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#ef233c]">{item.tag}</span>
                  <h3 className="mt-4 text-lg font-black uppercase leading-tight text-[#0a1d3a]">{item.title}</h3>
                  <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#5b6f91]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ TIMELINE — PREMIUM DESIGN ═══════ */}
        <section className="relative overflow-hidden bg-[#0a1d3a] px-4 py-24 sm:px-6 lg:px-8">
          {/* Subtle gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,35,60,0.05)_0%,transparent_70%)]" />

          <div className="relative z-10 mx-auto max-w-[1000px]">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "0px 0px -100px 0px" }} 
              transition={{ duration: 0.8, ease: "easeOut" }} 
              className="mb-24 text-center"
            >
              <p className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">
                <span className="h-[2px] w-6 bg-[#ef233c]" />
                Notre Évolution
                <span className="h-[2px] w-6 bg-[#ef233c]" />
              </p>
              <h2 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white md:text-5xl lg:text-6xl">
                L'Histoire<br />
                <span className="text-[#ef233c]">FC TORO</span>.
              </h2>
            </motion.div>

            {/* Timeline container */}
            <div className="relative">
              {/* Background Line */}
              <div className="absolute bottom-0 left-[27px] top-4 w-[2px] bg-white/10 md:left-1/2 md:-translate-x-[1px]" />

              {/* Events */}
              {timelineEvents.map((event, index) => {
                const isLeft = index % 2 === 0
                return (
                  <div key={event.year} className="relative mb-12 flex w-full flex-col md:mb-20 md:flex-row md:justify-between md:odd:flex-row-reverse">
                    
                    {/* Center Node / Dot */}
                    <div className="absolute left-[13px] top-0 z-20 flex h-8 w-8 items-center justify-center md:left-1/2 md:-translate-x-1/2">
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "0px 0px -150px 0px" }}
                        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                        className={`h-4 w-4 rounded-full ${event.featured ? 'bg-[#ffc107] shadow-[0_0_15px_rgba(255,193,7,0.6)]' : 'bg-[#ef233c] shadow-[0_0_15px_rgba(239,35,60,0.6)]'}`}
                      />
                      {/* Pulse effect */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 1 }}
                        whileInView={{ scale: 2.5, opacity: 0 }}
                        viewport={{ once: true, margin: "0px 0px -150px 0px" }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                        className={`absolute inset-0 rounded-full ${event.featured ? 'bg-[#ffc107]' : 'bg-[#ef233c]'}`}
                      />
                    </div>

                    {/* Card Container */}
                    <div className="ml-16 md:ml-0 md:w-[calc(50%-48px)]">
                      <motion.div
                        initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className={`group relative overflow-hidden rounded-2xl border bg-white/[0.02] p-6 backdrop-blur-sm transition-colors hover:bg-white/[0.04] ${event.featured ? 'border-[#ffc107]/30' : 'border-white/10'}`}
                      >
                        {/* Interactive glow on hover */}
                        <div className="absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          <div className={`absolute inset-0 bg-gradient-to-r ${event.featured ? 'from-[#ffc107]/10 to-transparent' : 'from-[#ef233c]/10 to-transparent'}`} />
                        </div>

                        <div className="relative z-10">
                          <span className={`inline-block text-2xl font-black italic tracking-tight ${event.featured ? 'text-[#ffc107]' : 'text-[#ef233c]'}`}>
                            {event.year}
                          </span>
                          <h3 className="mt-2 text-xl font-bold uppercase leading-tight text-white">{event.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-white/60">{event.desc}</p>
                          
                          {event.featured && (
                            <div className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row sm:flex-wrap">
                              <span className="inline-flex items-center gap-1.5 rounded bg-white/5 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#ffc107]">
                                <RiTrophyLine className="h-3.5 w-3.5" /> Prince des Caraïbes
                              </span>
                              <span className="inline-flex items-center gap-1.5 rounded bg-white/5 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                                <RiGroupLine className="h-3.5 w-3.5 text-[#ef233c]" /> Girl Squad
                              </span>
                              <span className="inline-flex items-center gap-1.5 rounded bg-white/5 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                                <RiMedalLine className="h-3.5 w-3.5 text-[#3b82f6]" /> CFU U14
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>

                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ═══════ VISION (Dernier) ═══════ */}
        {false && (
        <section className="relative overflow-hidden bg-[#0a1d3a] px-4 py-24 text-white sm:px-6 lg:px-8">
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#ef233c]/[0.04] blur-[150px]" />

          <div className="relative z-10 mx-auto max-w-[800px] text-center">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">
                <span className="h-[2px] w-8 bg-[#ef233c]" />
                Vision
                <span className="h-[2px] w-8 bg-[#ef233c]" />
              </p>
              <h2 className="mt-6 text-3xl font-black uppercase leading-[0.9] tracking-tighter md:text-5xl">
                Construire<br />l&apos;avenir<span className="text-[#ef233c]">.</span>
              </h2>
              <p className="mt-6 text-base font-medium leading-relaxed text-white/60 sm:text-lg">
                FC TORO va au-delà du football pour former des individus complets, construire un écosystème durable et créer un impact social positif en Haïti et dans la Caraïbe.
              </p>
              <p className="mt-4 text-sm font-black italic text-[#ef233c]/80">
                &quot;Le talent peut faire briller un joueur, mais ce sont les valeurs qui construisent un parcours durable.&quot;
              </p>
              <div className="mt-10">
                <Link
                  href="/inscription/joueur"
                  className="inline-flex items-center gap-3 rounded-full bg-[#ef233c] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-white shadow-[0_10px_30px_rgba(239,35,60,0.3)] transition-all duration-300 hover:bg-[#d71931] hover:shadow-[0_14px_40px_rgba(239,35,60,0.4)]"
                >
                  Rejoindre FC TORO
                  <RiArrowRightLine className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
        )}

        <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="mb-3 text-xl font-black uppercase leading-tight md:text-2xl">Valeurs</h2>
              <p className="text-sm font-black italic text-[#ef233c]">
                "La progression durable repose autant sur le cadre que sur le talent."
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value, i) => {
                const Icon = value.icon

                return (
                  <motion.div
                    key={value.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="group rounded-2xl border border-gray-100 bg-[#f8fafc] p-6 transition-all duration-300 hover:border-[#ef233c] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(239,35,60,0.12)]"
                  >
                    <Icon className="mb-4 h-7 w-7 text-[#ef233c] transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="mb-2 text-lg font-black uppercase leading-tight">{value.label}</h3>
                    <p className="text-[13px] font-medium leading-relaxed text-[#445b7f]">
                      {value.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
