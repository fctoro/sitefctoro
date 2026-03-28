'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { HomeNavbar } from '@/components/home-navbar'
import {
  RiShieldStarLine,
  RiTrophyLine,
  RiBuilding4Fill,
  RiHotelBedLine,
  RiRestaurantLine,
  RiHealthBookLine,
  RiMapPin2Line,
} from '@remixicon/react'

const casaData = {
  title: 'CASA',
  text:
    "CASA est un projet de centre de développement sportif situé à La Chapelle dans le Nord d'Haïti, bord de mer de Limonade. Le projet vise à créer un environnement structuré dédié à la formation sportive et citoyenne des jeunes.",
  infraTitle: 'Infrastructures prévues :',
  infraItems: [
    'Terrains de football',
    'Installations pour la natation',
    'Terrains de basketball',
    'Terrains de volleyball',
    'Dortoirs pour les athlètes',
    'Cafétéria',
    'Services médicaux',
  ],
  outro:
    'CASA ambitionne de favoriser les échanges sportifs régionaux et internationaux.',
}

const infraIcons = [
  RiBuilding4Fill,
  RiShieldStarLine,
  RiBuilding4Fill,
  RiShieldStarLine,
  RiHotelBedLine,
  RiRestaurantLine,
  RiHealthBookLine,
]

export default function CasaPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative h-[220px] overflow-hidden bg-[#0a1d3a] text-white md:h-[300px]">
          <Image
            src="/joueur/extracted/629347230_17886988737431630_560677091584659157_n.jpg"
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
              <h1 className="text-4xl font-black uppercase leading-[0.8] tracking-tighter drop-shadow-2xl md:text-7xl">
                {casaData.title}
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[900px] space-y-12">
            <div className="mb-10 flex items-center gap-4">
              <RiMapPin2Line className="h-10 w-10 text-[#ef233c]" />
              <h2 className="text-3xl font-black uppercase tracking-tight text-[#ef233c]">
                Caribbean Sports Academy
              </h2>
            </div>

            <p className="border-l-4 border-[#ef233c] pl-8 text-2xl font-black italic leading-relaxed text-[#445b7f]">
              {casaData.text}
            </p>
          </div>
        </section>

        <section className="bg-[#f8fafc] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <h3 className="mb-16 text-center text-5xl font-black uppercase leading-[0.9]">
              {casaData.infraTitle}
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {casaData.infraItems.map((item, idx) => {
                const Icon = infraIcons[idx] || RiShieldStarLine

                return (
                  <div
                    key={item}
                    className="group rounded-3xl border border-gray-100 bg-white p-8 transition-all hover:-translate-y-2 hover:shadow-xl"
                  >
                    <Icon className="mb-6 h-10 w-10 text-[#ef233c] transition-transform group-hover:scale-110" />
                    <p className="text-lg font-black uppercase leading-tight text-[#0a1d3a]">
                      {item}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="relative mt-24 overflow-hidden rounded-[40px] bg-[#0a2347] p-16 text-center text-white shadow-2xl">
              <div className="absolute right-0 top-0 p-10 opacity-5">
                <RiShieldStarLine className="h-60 w-60" />
              </div>

              <RiTrophyLine className="relative z-10 mx-auto mb-10 h-16 w-16 text-[#ef233c]" />

              <p className="relative z-10 mx-auto max-w-4xl text-4xl font-black uppercase leading-[0.9] drop-shadow-lg md:text-5xl">
                {casaData.outro}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
