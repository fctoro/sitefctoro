'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { HomeNavbar } from '@/components/home-navbar'
import {
  RiShieldStarLine,
  RiFocusLine,
  RiUserLine,
  RiHeartsLine,
  RiFlashlightLine,
  RiLightbulbLine,
  RiGroupLine,
  RiKeyLine,
  RiCommunityLine,
} from '@remixicon/react'

const values = [
  {
    label: 'Discipline',
    desc: 'Faire les choses correctement même lorsque personne ne regarde.',
    icon: RiShieldStarLine,
  },
  {
    label: 'Respect',
    desc: 'Respecter les coachs, les coéquipiers et les adversaires.',
    icon: RiGroupLine,
  },
  {
    label: 'Courage',
    desc: 'Oser essayer et apprendre de ses erreurs.',
    icon: RiFocusLine,
  },
  {
    label: 'Humilité',
    desc: "Rester ouvert à l'apprentissage.",
    icon: RiLightbulbLine,
  },
  {
    label: 'Passion',
    desc: "Jouer avec le coeur et l'envie de progresser.",
    icon: RiHeartsLine,
  },
  {
    label: 'Confiance',
    desc: 'Croire en soi et en son équipe.',
    icon: RiUserLine,
  },
  {
    label: 'Maîtrise de soi',
    desc: 'Garder son calme et sa lucidité sous pression.',
    icon: RiFlashlightLine,
  },
  {
    label: 'Responsabilité',
    desc: 'Représenter FC TORO avec dignité.',
    icon: RiKeyLine,
  },
  {
    label: 'Contribution citoyenne',
    desc: 'Aider les autres et contribuer positivement à la communauté.',
    icon: RiCommunityLine,
  },
]

export default function NotreHistoirePage() {
  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative h-[220px] overflow-hidden bg-[#0a1d3a] text-white md:h-[300px]">
          <Image
            src="/joueur/extracted/583167774_18542869372012336_2307311757000245016_n.jpg"
            alt="FC TORO Stadium"
            fill
            priority
            className="object-cover opacity-50 transition-transform duration-1000 hover:scale-105"
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
                Patrimoine & Vision
              </p>
              <h1 className="text-4xl font-black uppercase leading-[0.8] tracking-tighter drop-shadow-2xl md:text-6xl">
                Le Club
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="space-y-6">
                <h2 className="text-xl font-black uppercase tracking-tight text-[#ef233c]">
                  Notre histoire
                </h2>

                <div className="space-y-4 text-sm font-semibold leading-relaxed text-[#445b7f]">
                  <p>
                    FC TORO est né d'une vision simple : utiliser le football
                    comme un outil de formation sportive et de développement
                    citoyen pour les jeunes.
                  </p>
                  <p>
                    Le club a été fondé avec la volonté de créer un espace où
                    les enfants et les adolescents peuvent grandir à travers le
                    sport, apprendre la discipline, développer la confiance et
                    construire un esprit d'équipe.
                  </p>
                  <p>
                    Dès les premières années, cette vision a été portée par des
                    passionnés de football et d'éducation, dont Sasha, qui a
                    joué un rôle important dans la création et l'orientation du
                    projet.
                  </p>
                  <p>
                    Aujourd'hui, après plus de 14 ans d'existence, FC TORO est
                    devenu un cadre reconnu de formation pour les jeunes joueurs
                    en Haïti.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] shadow-xl">
                  <Image
                    src="/joueur/extracted/542448727_18525142066012336_8843479393054800058_n.jpg"
                    alt="Football Match"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f8fafc] px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[700px] text-center">
            <RiShieldStarLine className="mx-auto mb-6 h-10 w-10 text-[#ef233c]" />
            <h2 className="mb-6 text-2xl font-black uppercase leading-tight md:text-3xl">
              Philosophie - Former des joueurs et des citoyens
            </h2>
            <p className="text-base font-bold italic leading-relaxed text-[#445b7f]">
              À FC TORO, le football est un espace d'apprentissage où les jeunes
              développent discipline, confiance, respect et sens du collectif.
              Nous appelons nos joueurs les Guerriers Invincibles, des jeunes
              capables de faire face aux défis, d'apprendre de leurs erreurs et
              de progresser avec détermination.
            </p>
          </div>
        </section>

        <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-2xl font-black uppercase leading-tight">
                Valeurs
              </h2>
              <p className="text-sm font-black italic text-[#ef233c]">
                "Le talent peut faire briller un joueur, mais ce sont les
                valeurs qui construisent un parcours durable."
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
                    <h4 className="mb-2 text-lg font-black uppercase leading-tight">
                      {value.label}
                    </h4>
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
