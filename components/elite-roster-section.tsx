'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiPlayFill, RiCloseLine } from '@remixicon/react'

// data will be passed as props

export function EliteRosterSection({ eliteRoster = [] }: { eliteRoster?: Array<Record<string, any>> }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8">
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative aspect-video w-full max-w-[1000px] overflow-hidden rounded-[32px] bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <RiCloseLine className="h-6 w-6" />
              </button>
              <video key={activeVideo || 'video'}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              >
                <source src={activeVideo || undefined} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ef233c]/30 to-transparent" />
      <div className="pointer-events-none absolute left-[-8rem] top-20 h-64 w-64 rounded-full bg-[#1a4ea3]/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-[-6rem] h-72 w-72 rounded-full bg-[#ef233c]/8 blur-3xl" />

      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[760px]">
            <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
              Joueurs FC TORO Elite
            </p>
            <h2 className="mt-4 text-[clamp(1.65rem,3.2vw,2.8rem)] font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#0d2d62]">
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
          {eliteRoster.length === 0 ? (
            <div className="flex min-h-[220px] items-center justify-center text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#5c7297]">
              Joueurs à venir
            </div>
          ) : (
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
                      {player.photo_url && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={player.photo_url as string}
                          alt={player.name as string}
                          className="h-full w-full object-cover object-top drop-shadow-2xl mix-blend-multiply"
                        />
                      )}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(6,15,35,0)_0%,rgba(6,15,35,0.34)_100%)]" />

                    {/* Info Overlay with Stats & Video Button */}
                    <div className="absolute inset-x-0 bottom-0 z-40 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/50 to-transparent p-5 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 backdrop-blur-[1px] transition-all duration-300">
                      <div className="translate-y-0 lg:group-hover:translate-y-0 lg:translate-y-4 transition-transform duration-300">
                        <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#ef233c]">
                            Informations
                          </p>
                          <h4 className="text-base font-black uppercase leading-[1.1] text-white">
                            {player.firstname}<br />
                            <span className={isRed ? 'text-white' : 'text-[#ef233c]'}>{player.lastname}</span>
                          </h4>
                        </div>
 
                        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-white/15 pt-3">
                          <div className="space-y-0.5">
                            <p className="text-[7px] font-bold uppercase tracking-wider text-white/50">Poste</p>
                            <p className="truncate text-[9px] font-black uppercase text-white">{(player as any).position}</p>
                          </div>
                          <div className="space-y-0.5">
                          <div className="space-y-0.5">
                            <p className="text-[7px] font-bold uppercase tracking-wider text-white/50">Club</p>
                            <p className="truncate text-[9px] font-black uppercase text-white">{(player as any).club}</p>
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-[7px] font-bold uppercase tracking-wider text-white/50">Poids</p>
                            <p className="truncate text-[9px] font-black uppercase text-white">{(player as any).weight}</p>
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-[7px] font-bold uppercase tracking-wider text-white/50">Hauteur</p>
                            <p className="truncate text-[9px] font-black uppercase text-white">{(player as any).height}</p>
                          </div>
                        </div>

                        {(player as any).video_url ? (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveVideo((player as any).video_url);
                            }}
                            className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#ef233c] py-3 text-[10px] font-black uppercase tracking-[0.15em] text-white shadow-lg transition-all hover:bg-[#d91b34] hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <RiPlayFill className="h-4 w-4" />
                            Voir Session
                          </button>
                        ) : (
                          <div className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/5 py-3 text-[9px] font-black uppercase tracking-[0.15em] text-white/60">
                             Session Bientôt
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="absolute bottom-5 left-4 h-[3px] w-14 rounded-full bg-white/80" />

                    <div className="absolute inset-y-0 right-0 z-30 w-[20%] group-hover:opacity-0 transition-opacity duration-300">
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
          )}
        </div>
      </div>
    </section>
  )
}
