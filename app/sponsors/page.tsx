'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { HomeNavbar } from '@/components/home-navbar'
import {
  RiShieldStarLine,
  RiTrophyLine,
  RiHandHeartLine,
  RiGlobalLine,
  RiGroupLine,
} from '@remixicon/react'

const sponsors = [
  { id: 'spon1', name: 'Partenaire 1', logo: '/sponsors/spon1.png' },
  { id: 'spon2', name: 'Partenaire 2', logo: '/sponsors/spon2.png' },
  { id: 'spon3', name: 'Partenaire 3', logo: '/sponsors/spon3.png' },
  { id: 'spon4', name: 'Partenaire 4', logo: '/sponsors/spon4.png' },
  { id: 'spon5', name: 'Partenaire 5', logo: '/sponsors/spon5.png' },
  { id: 'spon6', name: 'Partenaire 6', logo: '/sponsors/spon6.jpg' },
  { id: 'spon7', name: 'Partenaire 7', logo: '/sponsors/spon7.png' },
]

const supportItems = [
  'Le soutien aux programmes sportifs',
  "L'organisation des competitions",
  'Le developpement des initiatives educatives',
]

const sponsorIcons = [RiGlobalLine, RiTrophyLine, RiGroupLine]

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative h-[220px] overflow-hidden bg-[#0a1d3a] text-white md:h-[300px]">
          <Image
            src="/joueur/extracted/634150827_18560832649012336_7495873752742897530_n.jpg"
            alt="Sponsors"
            fill
            priority
            className="object-cover opacity-40 transition-transform duration-1000 hover:scale-105"
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
                Partenaires Strategiques
              </p>
              <h1 className="text-3xl font-black uppercase leading-[0.8] tracking-tighter drop-shadow-2xl md:text-5xl">
                Sponsors & Partners
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-gray-100 bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[900px] space-y-12">
            <div className="mb-6 flex items-center gap-4">
              <RiHandHeartLine className="h-9 w-9 text-[#ef233c]" />
              <h2 className="text-xl font-black uppercase leading-none tracking-tight text-[#ef233c]">
                Sponsors & Partners
              </h2>
            </div>

            <p className="border-l-4 border-[#ef233c] pl-8 text-base font-bold italic leading-relaxed text-[#445b7f]">
              FC TORO remercie ses partenaires et sponsors qui contribuent au
              developpement du club et a l'organisation de ses activites
              sportives.
            </p>

            <div className="relative overflow-hidden pt-10">
              <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent" />
              <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent" />

              <motion.div
                initial={{ x: 0 }}
                animate={{ x: '-50%' }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="flex w-max items-center gap-16 md:gap-24"
              >
                {[...sponsors, ...sponsors].map((s, idx) => (
                  <div
                    key={idx}
                    className="shrink-0 opacity-80 transition-all duration-300 hover:opacity-100"
                  >
                    <Image
                      src={s.logo}
                      alt={s.name}
                      width={130}
                      height={70}
                      className="h-8 w-auto object-contain md:h-10"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-[#f8fafc] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-14 grid gap-8 md:grid-cols-3">
              {supportItems.map((item, idx) => {
                const Icon = sponsorIcons[idx] || RiShieldStarLine

                return (
                  <div
                    key={item}
                    className="rounded-[40px] border border-gray-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-xl"
                  >
                    <Icon className="mx-auto mb-6 h-12 w-12 text-[#ef233c]" />
                    <h4 className="mb-4 text-2xl font-black uppercase leading-tight">
                      {item}
                    </h4>
                  </div>
                )
              })}
            </div>

            <div className="relative overflow-hidden rounded-[40px] bg-[#0a2347] p-10 text-center text-white shadow-2xl">
              <div className="absolute right-0 top-0 p-10 opacity-5">
                <RiShieldStarLine className="h-60 w-60" />
              </div>

              <RiHandHeartLine className="relative z-10 mx-auto mb-10 h-16 w-16 text-[#ef233c]" />

              <p className="relative z-10 mx-auto mb-10 max-w-4xl text-2xl font-black uppercase leading-[0.9] drop-shadow-lg md:text-3xl">
                FC TORO est ouvert aux collaborations avec des entreprises et
                organisations partageant les memes valeurs.
              </p>

              <a
                href="mailto:footballclubtoro@gmail.com"
                className="relative z-10 inline-flex items-center rounded-full bg-[#ef233c] px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all hover:scale-105 hover:bg-[#ff3f5c] active:scale-95"
              >
                Devenir Partenaire
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
