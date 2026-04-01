'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { HomeNavbar } from '@/components/home-navbar'
import patricImage from '@/img/staf/patric.jpg'
import nillImage from '@/img/staf/nill.jpg'
import {
  RiArrowRightLine,
  RiBasketballLine,
  RiBuildingLine,
  RiFlashlightLine,
  RiFootballLine,
  RiFocusLine,
  RiGroupLine,
  RiHeartPulseLine,
  RiHeartsLine,
  RiKeyLine,
  RiLightbulbLine,
  RiRestaurantLine,
  RiRoadMapLine,
  RiShieldStarLine,
  RiTShirtLine,
  RiTrophyLine,
  RiUserLine,
  RiWaterFlashLine,
} from '@remixicon/react'

const staffMoments = [
  {
    title: 'Direction terrain',
    body: 'Le staff encadre les groupes avec une présence régulière et une lecture plus précise du travail à mener.',
    image: '/home/staff-direction.jpg',
  },
  {
    title: 'Travail quotidien',
    body: 'Les séances, les corrections et la progression sont suivies de près pour garder une vraie cohérence.',
    image: '/home/staff-field.jpg',
  },
  {
    title: 'Accompagnement',
    body: 'Le cadre FC TORO repose sur une organisation plus claire, plus exigeante et plus stable autour des joueurs.',
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

const sportsCenterFeatures = [
  {
    label: 'Un stade de football de taille professionnelle avec une capacité de 1000 personnes.',
    icon: RiBuildingLine,
  },
  {
    label: 'Deux champs de football de 9v9.',
    icon: RiFootballLine,
  },
  {
    label: 'Une salle de gym et un centre de thérapie physique.',
    icon: RiHeartPulseLine,
  },
  {
    label: 'Un terrain de basketball / futsal / volleyball.',
    icon: RiBasketballLine,
  },
  {
    label: 'Une piste de patinage.',
    icon: RiRoadMapLine,
  },
  {
    label: 'Une piscine.',
    icon: RiWaterFlashLine,
  },
  {
    label: 'Des vestiaires.',
    icon: RiTShirtLine,
  },
  {
    label: 'Une cafétéria.',
    icon: RiRestaurantLine,
  },
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
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
                  Notre histoire en 2026
                </p>
                <h2 className="text-[clamp(1.65rem,3.2vw,2.9rem)] font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#0d2d62]">
                  D'un petit départ
                  <br />
                  à une vraie structure club.
                </h2>

                <div className="space-y-4 text-sm font-medium leading-relaxed text-[#445b7f] sm:text-[15px]">
                  <p>
                    FC TORO a été créé le 1er septembre 2012 comme une petite structure de football
                    amateur destinée à offrir un environnement positif à trois enfants. Avec le temps,
                    cette base simple est devenue un projet beaucoup plus large, porté par une vraie
                    exigence de formation.
                  </p>
                  <p>
                    En 2026, le club accompagne plus de 500 joueurs à travers plusieurs sections :
                    académie, football féminin, groupe Elite, Ti Toro et les projets de
                    progression qui prolongent le parcours des joueurs.
                  </p>
                  <p>
                    Le travail du staff repose sur une méthode plus claire, une meilleure lecture des
                    profils et une recherche constante d'opportunités utiles pour les joueurs qui
                    veulent progresser vers un niveau plus élevé.
                  </p>
                  <p>
                    FC TORO avance avec une idée simple : construire un cadre sérieux, former
                    proprement et donner aux jeunes un espace de progression durable.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 sm:grid-rows-[1fr_1fr]">
                <article className="relative min-h-[260px] overflow-hidden rounded-[28px] bg-[#0a1d3a] shadow-[0_18px_36px_rgba(10,29,58,0.14)] sm:row-span-2">
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
                    <p className="mt-3 text-sm leading-relaxed text-white/78">{staffMoments[0].body}</p>
                  </div>
                </article>

                {staffMoments.slice(1).map((item) => (
                  <article
                    key={item.title}
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
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f8fafc] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1260px]">
            <div className="grid gap-10 lg:grid-cols-[1.16fr_0.84fr] lg:items-center">
              <div className="relative lg:order-1">
                <div className="overflow-hidden rounded-[28px] shadow-[0_20px_38px_rgba(10,29,58,0.14)]">
                  <Image
                    src={patricImage}
                    alt="Patrick FC TORO"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
              </div>

              <div className="space-y-6 lg:order-2 lg:pl-4">
                <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
                  Vision
                </p>
                <h2 className="text-[clamp(1.65rem,3.2vw,2.8rem)] font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#0d2d62]">
                  L'Académie
                  <br />
                  FC TORO
                </h2>

                <div className="space-y-4 text-sm font-medium leading-relaxed text-[#445b7f] sm:text-[15px]">
                  <p>
                    FC TORO est un club de football et une académie pour les filles et les
                    garçons de 5 à 19 ans, avec une ambition claire : accompagner le développement
                    complet des jeunes à travers le football.
                  </p>
                  <p>
                    Le programme propose un niveau d'entraînement adapté au rythme, au niveau et à
                    la motivation de chaque joueur, tout en donnant aux profils les plus performants
                    un cadre plus exigeant pour pousser leurs qualités plus loin.
                  </p>
                  <p>
                    Dédié à la création et à l'entretien d'un espace favorable à l'émergence des
                    talents, FC TORO reste attentif aux opportunités qui permettent d'élever les
                    standards de formation et d'ouvrir de nouvelles perspectives aux joueurs.
                  </p>
                  <p>
                    Le club fonctionne aussi comme une structure sociale qui investit dans les jeunes
                    à travers les familles, les groupes et l'environnement qui accompagne leur
                    progression.
                  </p>
                  <p>
                    Tout au long de l'année, les joueurs reçoivent une formation diversifiée pour
                    renforcer les bases techniques, la communication, l'approche collective, le
                    leadership et le comportement dans les moments de pression et de compétition.
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
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.02fr] lg:items-center">
              <div className="relative">
                <div className="overflow-hidden rounded-[28px] shadow-[0_20px_38px_rgba(10,29,58,0.14)]">
                  <Image
                    src={nillImage}
                    alt="Centre sportif FC TORO"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
              </div>

              <div className="space-y-5">
                <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
                  Infrastructures
                </p>
                <h2 className="text-[clamp(1.6rem,3.1vw,2.65rem)] font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#0d2d62]">
                  Le Centre Sportif de
                  <br />
                  FC TORO
                </h2>
                <div className="space-y-4 text-sm font-medium leading-relaxed text-[#445b7f] sm:text-[15px]">
                  <p>
                    Le centre sportif FC TORO est une installation sportive et récréative complète
                    qui permettra non seulement d'élargir notre capacité de formation au football,
                    mais aussi de créer un environnement récréatif pour tous les membres de la
                    famille FC TORO, y compris les frères et sœurs, les parents et les amis.
                  </p>
                  <p>
                    Plusieurs terrains de football sur une seule propriété faciliteront également
                    l'organisation des familles avec des enfants dans diverses catégories.
                  </p>

                  <div className="rounded-[26px] bg-[#f7f7f8] p-6 shadow-[0_14px_28px_rgba(10,29,58,0.05)]">
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ef233c]">
                      Une fois terminé
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {sportsCenterFeatures.map((item) => {
                        const Icon = item.icon

                        return (
                          <div
                            key={item.label}
                            className="flex items-start gap-3 rounded-[18px] bg-white px-4 py-4 shadow-[0_10px_20px_rgba(10,29,58,0.04)]"
                          >
                            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ef233c]/10 text-[#ef233c]">
                              <Icon className="h-5 w-5" />
                            </div>
                            <p className="text-sm font-semibold leading-relaxed text-[#2f405f]">
                              {item.label}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f8fafc] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
                  Structure actuelle
                </p>
                <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.5rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-[#0d2d62]">
                  Les projets FC TORO
                  <br />
                  en 2026.
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
      </main>
    </div>
  )
}
