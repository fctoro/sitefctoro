'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

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

export function EliteRosterSection() {
  return (
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
  )
}