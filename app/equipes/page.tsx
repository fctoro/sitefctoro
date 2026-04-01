'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { HomeNavbar } from '@/components/home-navbar'
import { playerCards } from '@/lib/joueur'
import { RiStarSFill } from '@remixicon/react'

const featuredPlayers = playerCards.slice(0, 5)
const rosterPlayers = playerCards.slice(5)
const featuredUnits = ['U11', 'U13', 'U15', 'U17', 'U20']
const featuredDetails = [
  { focus: 'Percussion', note: 'Profil offensif direct' },
  { focus: 'Projection', note: 'Volume et intensite' },
  { focus: 'Lecture', note: 'Duels et anticipation' },
  { focus: 'Connexion', note: 'Lien entre les lignes' },
  { focus: 'Leadership', note: 'Cadre et presence' },
]

export default function EquipesPage() {
  const [activePlayer, setActivePlayer] = useState(featuredPlayers[2]?.name ?? featuredPlayers[0].name)
  const activeHeroPlayer = featuredPlayers.find((player) => player.name === activePlayer) ?? featuredPlayers[0]

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050816] text-white">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[70px]">
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(32,93,255,0.18),transparent_28%),linear-gradient(180deg,#07101f_0%,#040914_55%,#02050d_100%)] px-4 pb-6 pt-5 sm:px-6 lg:px-8 lg:pb-8 lg:pt-5">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff244a] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#3f7bff] to-transparent" />
          <div className="pointer-events-none absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-[#ff244a]/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-8 right-10 h-48 w-48 rounded-full bg-[#3f7bff]/10 blur-[120px]" />

          <div className="relative z-10 mx-auto flex max-w-[1380px] flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 flex justify-center pt-3 sm:mb-4 sm:pt-3 lg:mb-4 lg:pt-4"
            >
              <div className="text-center">
                <h1 className="max-w-[92vw] text-[0.78rem] font-black uppercase leading-[1.2] tracking-[0.16em] text-white/92 sm:max-w-none sm:text-[0.95rem] sm:tracking-[0.18em] lg:text-[clamp(1rem,1.9vw,1.45rem)] lg:leading-[1.05] lg:tracking-[0.22em]">
                  Les joueurs. Devant. L impact derriere.
                </h1>
              </div>
            </motion.div>

            <div className="relative isolate">
              <div className="pointer-events-none absolute inset-x-0 top-[8%] z-0 hidden items-center justify-between px-4 lg:flex">
                <span className="text-[clamp(3rem,8vw,8.5rem)] font-black uppercase leading-none tracking-[-0.1em] text-white/[0.05]">
                  FC
                </span>
                <span className="text-[clamp(3rem,8vw,8.5rem)] font-black uppercase leading-none tracking-[-0.1em] text-white/[0.05]">
                  TORO
                </span>
              </div>

              <div className="pointer-events-none absolute left-[22%] top-[54%] z-10 hidden h-[220px] w-[8px] -rotate-[14deg] bg-[#ff244a] shadow-[0_0_36px_rgba(255,36,74,0.8)] lg:block" />
              <div className="pointer-events-none absolute right-[16%] top-[57%] z-10 hidden h-[180px] w-[8px] rotate-[26deg] bg-[#ff244a] shadow-[0_0_36px_rgba(255,36,74,0.8)] lg:block" />

              <div className="pointer-events-none absolute inset-x-0 bottom-[7%] z-10">
                <div className="mx-auto h-px w-full max-w-[1100px] bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                <p className="mt-1 select-none text-center text-[clamp(3.2rem,12vw,9.5rem)] font-black uppercase leading-none tracking-[-0.12em] text-white/92">
                  TORO
                </p>
                <div className="mx-auto mt-2 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.38em] text-white/58">
                  <span>Equipe Premiere</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff244a]" />
                  <span>{activeHeroPlayer.role}</span>
                </div>
              </div>

              <div className="relative z-20 mx-auto grid h-[54svh] min-h-[410px] w-full max-w-[1320px] grid-cols-5 gap-[2px] lg:h-[60svh] lg:min-h-[560px]">
                {featuredPlayers.map((player, index) => (
                  <motion.button
                    key={player.name}
                    type="button"
                    initial={{ opacity: 0, y: 42, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 1.05,
                      delay: 0.22 + index * 0.14,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onMouseEnter={() => setActivePlayer(player.name)}
                    onFocus={() => setActivePlayer(player.name)}
                    className={`group relative overflow-hidden border-x border-white/10 text-left transition-all duration-500 ${
                      activePlayer === player.name
                        ? 'z-20 sm:z-30 sm:shadow-[0_0_40px_rgba(255,36,74,0.16)]'
                        : 'z-20 sm:hover:z-30'
                    }`}
                  >
                    <Image
                      src={player.image}
                      alt={player.name}
                      fill
                      sizes="(min-width: 1024px) 20vw, 50vw"
                      className={`object-cover transition-transform duration-700 ${
                        activePlayer === player.name ? 'scale-100 sm:scale-[1.06]' : 'scale-100 sm:group-hover:scale-[1.03]'
                      }`}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,15,0.18)_0%,rgba(4,7,15,0.24)_36%,rgba(4,7,15,0.82)_78%,rgba(4,7,15,0.98)_100%)]" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-70" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#ff244a] to-transparent opacity-95" />

                    <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
                      <span className="border border-white/14 bg-black/25 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-white/84 backdrop-blur">
                        {featuredUnits[index] ?? 'U'}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/70">
                        {player.role}
                      </p>
                      <p className="mt-2 text-[clamp(1.15rem,1.8vw,2.4rem)] font-black uppercase leading-[0.88] tracking-[-0.06em] text-white">
                        {player.name}
                      </p>
                    </div>

                    <div className="absolute inset-0 z-20 hidden translate-y-full flex-col justify-end bg-[linear-gradient(180deg,rgba(4,7,15,0)_0%,rgba(79,8,23,0.05)_16%,rgba(239,35,60,0.16)_34%,rgba(239,35,60,0.52)_56%,rgba(204,18,48,0.84)_78%,rgba(118,7,28,0.97)_100%)] p-4 opacity-0 backdrop-blur-[1.5px] transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
                      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/72">
                        Details joueur
                      </p>
                      <p className="mt-2 text-[1.05rem] font-black uppercase leading-none tracking-[-0.04em] text-white">
                        {player.name}
                      </p>

                      <div className="mt-4 space-y-2 border-t border-white/20 pt-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/86">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-white/60">Categorie</span>
                          <span>{featuredUnits[index] ?? 'U'}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-white/60">Poste</span>
                          <span>{player.role}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-white/60">Focus</span>
                          <span>{featuredDetails[index]?.focus ?? 'Progression'}</span>
                        </div>
                      </div>

                      <p className="mt-3 text-[11px] font-semibold leading-relaxed text-white/84">
                        {featuredDetails[index]?.note ?? 'Profil en progression'}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

          </div>
        </section>

        <section className="relative px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="mx-auto max-w-[1380px]">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#3f7bff]">
                  Roster Lab
                </p>
                <h2 className="mt-3 text-[clamp(1.7rem,3.2vw,3.2rem)] font-black uppercase leading-[0.88] tracking-[-0.04em] text-white">
                  Effectif
                </h2>
              </div>
              <p className="max-w-[540px] text-sm font-medium leading-relaxed text-white/58 sm:text-[15px]">
                Une lecture plus nette de l effectif avec la meme matiere visuelle: photos reelles, roles
                visibles, contraste fort et lignes de structure au-dessus et au-dessous.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
              {rosterPlayers.map((player, index) => (
                <motion.article
                  key={player.name}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] sm:rounded-[28px] sm:p-3"
                >
                  <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#3f7bff] to-transparent" />
                  <div className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-[#ff244a] to-transparent" />

                  <div className="relative h-[250px] overflow-hidden rounded-[18px] sm:h-[360px] sm:rounded-[22px]">
                    <Image
                      src={player.image}
                      alt={player.name}
                      fill
                      sizes="(min-width: 1280px) 22vw, (min-width: 640px) 48vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,15,0.08)_0%,rgba(4,7,15,0.28)_45%,rgba(4,7,15,0.95)_100%)]" />
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-black/25 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.16em] text-white/80 backdrop-blur sm:left-4 sm:top-4 sm:gap-2 sm:px-3 sm:text-[10px] sm:tracking-[0.18em]">
                      <RiStarSFill className="h-3 w-3 text-[#ff244a] sm:h-3.5 sm:w-3.5" />
                      Core Squad
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5">
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-[0.16em] text-[#8fb2ff] sm:text-[10px] sm:tracking-[0.2em]">
                          {player.role}
                        </p>
                        <h3 className="mt-1.5 text-[1.15rem] font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:mt-2 sm:text-[1.9rem]">
                          {player.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
