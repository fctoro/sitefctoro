'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { HomeNavbar } from '@/components/home-navbar'
import casaImage from '@/img/Casa.png'
import {
  RiBasketballLine,
  RiBuilding4Fill,
  RiFootballLine,
  RiHealthBookLine,
  RiHotelBedLine,
  RiMapPin2Line,
  RiRestaurantLine,
  RiShieldStarLine,
  RiTrophyLine,
  RiWaterFlashLine,
} from '@remixicon/react'

const casaData = {
  title: 'CASA',
  introEyebrow: 'Caribbean Sports Academy',
  introTitle: 'Un centre pense pour faire grandir les jeunes talents',
  text:
    "CASA est un projet de centre de developpement sportif imagine a La Chapelle, dans le Nord d'Haiti, en bord de mer du cote de Limonade. Le centre est pense comme un espace de progression complet, ou la formation sportive, l'encadrement humain et la discipline de vie se rejoignent pour offrir aux jeunes un avenir plus fort, plus stable et plus ambitieux.",
  introDetails: [
    {
      label: 'Localisation',
      value: "La Chapelle, Nord d'Haiti",
    },
    {
      label: 'Cadre',
      value: 'Bord de mer, cote Limonade',
    },
    {
      label: 'Mission',
      value: 'Former des jeunes sportifs et citoyens',
    },
  ],
  centerEyebrow: 'Infrastructures',
  centerTitle: 'Le Centre Sportif de CASA',
  centerBody: [
    "Le centre sportif CASA est pense comme une installation sportive et recreative complete, capable d'elargir la capacite de formation au football tout en installant un cadre de vie plus stable autour des joueurs.",
    "Le projet vise aussi a creer un environnement utile pour les membres du club, les familles et les jeunes qui evoluent dans plusieurs categories de progression.",
  ],
  centerKicker: 'Une fois termine',
  outro:
    'CASA ambitionne de favoriser les echanges sportifs regionaux et internationaux.',
}

const infraItems = [
  {
    label: 'Terrains de football.',
    icon: RiFootballLine,
  },
  {
    label: 'Installations pour la natation.',
    icon: RiWaterFlashLine,
  },
  {
    label: 'Terrains de basketball.',
    icon: RiBasketballLine,
  },
  {
    label: 'Espaces pour le volleyball.',
    icon: RiBasketballLine,
  },
  {
    label: 'Dortoirs pour les athletes.',
    icon: RiHotelBedLine,
  },
  {
    label: 'Cafeteria.',
    icon: RiRestaurantLine,
  },
  {
    label: 'Services medicaux.',
    icon: RiHealthBookLine,
  },
]

const supportInfraItems = [
  {
    label: 'Dortoirs pour les athletes',
    icon: RiHotelBedLine,
  },
  {
    label: 'Services medicaux',
    icon: RiHealthBookLine,
  },
  {
    label: 'Terrains de football',
    icon: RiBuilding4Fill,
  },
]

export default function CasaPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative h-[220px] overflow-hidden bg-[#0a1d3a] text-white md:h-[300px]">
          <Image
            src={casaImage}
            alt="CASA Projects"
            fill
            priority
            className="object-cover opacity-50 transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a1d3a] to-transparent" />
          <div className="absolute bottom-0 left-0 h-1 w-full bg-[#ef233c]/80" />

          <div className="relative z-10 mx-auto flex h-full max-w-[1100px] flex-col justify-center px-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">
                Infrastructures
              </p>
              <h1 className="text-3xl font-black uppercase leading-[0.8] tracking-tighter drop-shadow-2xl md:text-5xl">
                {casaData.title}
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute left-[-7rem] top-10 h-56 w-56 rounded-full bg-[#ef233c]/8 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-[-5rem] h-64 w-64 rounded-full bg-[#1a4ea3]/10 blur-3xl" />

          <div className="relative mx-auto max-w-[1120px]">
            <div className="grid gap-8 lg:grid-cols-[1.18fr_0.82fr]">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                viewport={{ once: true, amount: 0.28 }}
                className="relative overflow-hidden rounded-[36px] border border-[#dbe5f2] bg-[linear-gradient(145deg,#ffffff_0%,#f7faff_100%)] p-8 shadow-[0_24px_60px_rgba(10,29,58,0.08)] sm:p-10 md:p-12"
              >
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#1a4ea3]/8 blur-3xl" />

                <p className="text-[11px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
                  {casaData.introEyebrow}
                </p>

                <h2 className="mt-5 max-w-[720px] text-[clamp(2rem,4vw,3.8rem)] font-black uppercase leading-[0.86] tracking-[-0.06em] text-[#0d2d62]">
                  {casaData.introTitle}
                </h2>

                <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#0d2d62] px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[0_14px_30px_rgba(10,29,58,0.18)]">
                  <RiMapPin2Line className="h-4 w-4 text-[#ef233c]" />
                  La Chapelle, Haiti
                </div>

                <p className="mt-8 max-w-[720px] text-base font-medium leading-8 text-[#445b7f] sm:text-lg">
                  {casaData.text}
                </p>
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                viewport={{ once: true, amount: 0.28 }}
                className="relative overflow-hidden rounded-[32px] bg-[#0a2347] p-8 text-white shadow-[0_24px_60px_rgba(10,29,58,0.18)]"
              >
                <div className="absolute right-[-2rem] top-[-2rem] opacity-10">
                  <RiShieldStarLine className="h-36 w-36" />
                </div>

                <div className="relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#ef233c]">
                    <RiBuilding4Fill className="h-7 w-7" />
                  </div>

                  <p className="mt-6 text-[11px] font-black uppercase tracking-[0.28em] text-white/55">
                    Vision CASA
                  </p>
                  <h3 className="mt-3 text-2xl font-black uppercase leading-[0.95] text-white">
                    Un projet structure pour construire plus qu'un terrain.
                  </h3>

                  <div className="mt-8 space-y-4">
                    {casaData.introDetails.map((detail) => (
                      <div
                        key={detail.label}
                        className="rounded-[22px] border border-white/10 bg-white/6 px-5 py-4 backdrop-blur-sm"
                      >
                        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ef233c]">
                          {detail.label}
                        </p>
                        <p className="mt-2 text-base font-semibold leading-relaxed text-white/88">
                          {detail.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        <section className="bg-[#f8fafc] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.02fr] lg:items-center">
              <div className="relative">
                <div className="overflow-hidden rounded-[28px] shadow-[0_20px_38px_rgba(10,29,58,0.14)]">
                  <Image
                    src={casaImage}
                    alt="Centre sportif CASA"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
              </div>

              <div className="space-y-5">
                <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
                  {casaData.centerEyebrow}
                </p>
                <h2 className="text-[clamp(1.6rem,3.1vw,2.65rem)] font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#0d2d62]">
                  {casaData.centerTitle}
                </h2>
                <div className="space-y-4 text-sm font-medium leading-relaxed text-[#445b7f] sm:text-[15px]">
                  {casaData.centerBody.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  <div className="rounded-[26px] bg-[#f7f7f8] p-6 shadow-[0_14px_28px_rgba(10,29,58,0.05)]">
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ef233c]">
                      {casaData.centerKicker}
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {infraItems.map((item) => {
                        const Icon = item.icon

                        return (
                          <div
                            key={item.label}
                            className="flex min-h-[92px] items-center gap-3 rounded-[18px] bg-white px-4 py-4 shadow-[0_10px_20px_rgba(10,29,58,0.04)]"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ef233c]/10 text-[#ef233c]">
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

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {supportInfraItems.map((item) => {
                const Icon = item.icon

                return (
                  <article
                    key={item.label}
                    className="rounded-[24px] border border-[#dbe5f2] bg-white p-6 shadow-[0_14px_28px_rgba(10,29,58,0.06)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ef233c]/10 text-[#ef233c]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-black uppercase leading-tight text-[#0a1d3a]">
                        {item.label}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="relative mt-24 overflow-hidden rounded-[40px] bg-[#0a2347] p-16 text-center text-white shadow-2xl">
              <div className="absolute right-0 top-0 p-10 opacity-5">
                <RiShieldStarLine className="h-60 w-60" />
              </div>

              <RiTrophyLine className="relative z-10 mx-auto mb-10 h-16 w-16 text-[#ef233c]" />

              <p className="relative z-10 mx-auto max-w-4xl text-3xl font-black uppercase leading-[0.9] drop-shadow-lg md:text-4xl">
                {casaData.outro}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
