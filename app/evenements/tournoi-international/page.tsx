'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { HomeNavbar } from '@/components/home-navbar'
import { 
  RiGlobalLine, 
  RiFireLine,
  RiTrophyLine,
  RiFlightTakeoffLine,
  RiStarLine
} from '@remixicon/react'

// Importations d'images pour le Tournoi International
import heroImg from '@/img/Elite/IMG_7306.jpg'
import potomacImg from '@/img/Elite/IMG_5150.jpg'
import orlandoImg from '@/img/Orlando/IMG_9640.JPG'
import eliteImg from '@/img/Elite/IMG_7396.jpg'
import barcaImg from '@/img/Match/IMG_2453.jpg' // Using a match photo for the Barca highlight

export default function TournoiInternationalPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        {/* HERO SECTION */}
        <section className="relative h-[450px] overflow-hidden bg-[#0a1d3a] text-white md:h-[600px]">
          <Image
            src={heroImg}
            alt="Tournoi International FC TORO"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d3a] via-[#0a1d3a]/40 to-transparent" />
          
          <div className="relative z-10 mx-auto flex h-full max-w-[1100px] flex-col justify-end px-6 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#ffc107]">
                <span className="h-[2px] w-6 bg-[#ffc107]" />
                The Haitian Sensation
              </p>
              <h1 className="mt-4 text-4xl font-black uppercase leading-[0.9] tracking-tighter drop-shadow-2xl md:text-6xl lg:text-7xl">
                Tournois<br />
                <span className="text-[#ef233c]">Internationaux.</span>
              </h1>
              <p className="mt-5 max-w-[650px] text-sm font-medium leading-relaxed text-white/90 sm:text-lg">
                Sur la scène internationale, FC Toro se distingue comme une académie engagée dans le développement et l'exposition de ses talents.
              </p>
            </motion.div>
          </div>
        </section>

        {/* TOURNAMENTS GRID SECTION */}
        <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="mb-14 text-center"
            >
              <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tighter text-[#0d2d62] md:text-5xl">
                À la conquête<br /> du monde<span className="text-[#ef233c]">.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-[700px] text-base font-medium leading-relaxed text-[#445b7f]">
                Le club a participé à des tournois de référence tels que les championnats POTOMAC (Washington D.C.), le Disney Presidents Day Soccer Festival (Orlando), l'Hispaniola Cup (République Dominicaine) ainsi que le Tournoi International de Vall d'Uixó (Espagne).
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: RiGlobalLine, title: "Washington D.C.", label: "POTOMAC" },
                { icon: RiTrophyLine, title: "Orlando", label: "Disney Presidents Day" },
                { icon: RiFireLine, title: "Rép. Dominicaine", label: "Hispaniola Cup" },
                { icon: RiFlightTakeoffLine, title: "Espagne", label: "Vall d'Uixó" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex flex-col items-center justify-center rounded-2xl border border-[#dbe5f2] bg-gradient-to-br from-[#f8fafc] to-white p-8 text-center transition-all hover:-translate-y-1 hover:border-[#ef233c]/30 hover:shadow-xl"
                  >
                    <Icon className="h-8 w-8 text-[#ef233c]" />
                    <h3 className="mt-4 text-[11px] font-black uppercase tracking-widest text-[#ef233c]">{item.title}</h3>
                    <p className="mt-2 text-sm font-bold text-[#0a1d3a]">{item.label}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* HIGHLIGHT SECTION: BARCA */}
        <section className="relative overflow-hidden bg-[#0a1d3a] px-4 py-24 text-white sm:px-6 lg:px-8">
          <div className="absolute inset-0 z-0">
            <Image
              src={barcaImg}
              alt="Victoire contre Barcelone"
              fill
              className="object-cover opacity-20 filter grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1d3a] via-[#0a1d3a]/90 to-[#ef233c]/20" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1100px]">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#ffc107]/10 px-4 py-1.5 border border-[#ffc107]/20">
                  <RiStarLine className="h-4 w-4 text-[#ffc107]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#ffc107]">Moment Marquant</span>
                </div>
                
                <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tighter md:text-5xl">
                  Victoire Historique <br />
                  <span className="text-white">contre le <span className="text-[#ef233c]">FC Barcelone</span>.</span>
                </h2>
                
                <p className="mt-6 text-base font-medium leading-relaxed text-white/80">
                  Notre équipe U15 a réalisé une performance exceptionnelle en battant l'équipe élite du FC Barcelone (1-0), confirmant le potentiel incroyable et le niveau compétitif supérieur de FC Toro sur la scène mondiale.
                </p>
                
                <div className="mt-8 flex gap-4">
                  <div className="flex flex-col">
                    <span className="text-4xl font-black text-[#ffc107]">1 <span className="text-white/30">-</span> 0</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Score final</span>
                  </div>
                  <div className="flex flex-col border-l border-white/10 pl-4">
                    <span className="text-xl font-black uppercase text-white mt-2">Équipe U15</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Catégorie</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6 }}
                className="relative aspect-square overflow-hidden rounded-[2rem] shadow-2xl border border-white/10 lg:aspect-auto lg:h-[500px]"
              >
                <Image
                  src={eliteImg}
                  alt="Équipe U15 Elite"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* FUTURE VISIONS & SPECIAL OLYMPICS */}
        <section className="bg-[#f8fafc] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
             <div className="grid gap-12 md:grid-cols-2">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                  className="rounded-[2rem] bg-white p-8 shadow-[0_15px_40px_rgba(10,29,58,0.06)] border border-[#dbe5f2]"
                >
                  <RiGlobalLine className="mb-6 h-10 w-10 text-[#1a4ea3]" />
                  <h3 className="text-2xl font-black uppercase leading-tight text-[#0a1d3a]">Special Olympics</h3>
                  <p className="mt-4 text-[15px] font-medium leading-relaxed text-[#445b7f]">
                    FC Toro s'est également illustré à travers des initiatives internationales engagées comme les <strong>Special Olympics à Dubaï et à Orlando</strong>, renforçant considérablement son engagement sportif et social au-delà des frontières.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="rounded-[2rem] bg-[#ef233c] p-8 text-white shadow-[0_15px_40px_rgba(239,35,60,0.2)]"
                >
                  <RiFlightTakeoffLine className="mb-6 h-10 w-10 text-white" />
                  <div className="mb-2 inline-block rounded bg-black/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">Juin 2026</div>
                  <h3 className="text-2xl font-black uppercase leading-tight">MIC Tournament</h3>
                  <p className="mt-4 text-[15px] font-medium leading-relaxed text-white/90">
                    FC Toro franchira une nouvelle étape spectaculaire avec sa participation au <strong>MIC Tournament à Punta Cana</strong>, une plateforme internationale majeure pour la visibilité et la progression de ses joueurs d'élite.
                  </p>
                </motion.div>
             </div>
          </div>
        </section>

        {/* CONCLUSION */}
        <section className="bg-white px-4 py-20 text-center sm:px-6 lg:px-8">
           <div className="mx-auto max-w-[800px]">
             <motion.div
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
             >
                <h2 className="text-2xl font-black uppercase leading-tight tracking-tighter text-[#0d2d62] md:text-3xl">
                  Ambassadeurs du talent Haïtien
                </h2>
                <div className="mt-6 space-y-4 text-[15px] font-medium leading-relaxed text-[#445b7f]">
                  <p>
                    À travers ces expériences uniques, FC Toro s'est imposé comme une référence émergente du football jeunesse, reconnu mondialement pour son intensité, sa discipline et son identité forte.
                  </p>
                  <p className="text-lg font-bold italic text-[#ef233c]">
                    Surnommée "The Haitian Sensation", l'académie continue de marquer les esprits sur chaque terrain.
                  </p>
                  <p>
                    Nos joueurs, ambassadeurs du talent haïtien, incarnent une nouvelle génération fièrement prête à performer, évoluer et briller à l'échelle internationale.
                  </p>
                </div>
             </motion.div>
           </div>
        </section>

      </main>
    </div>
  )
}
