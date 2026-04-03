'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { HomeNavbar } from '@/components/home-navbar'
import { 
  RiGroupLine, 
  RiStarLine, 
  RiTrophyLine, 
  RiEyeLine 
} from '@remixicon/react'

// Importations d'images pour Intrasquad
import heroImg from '@/img/Match/FC-Toro.jpg'
import img1 from '@/img/Match/IMG_2341.jpg'
import img2 from '@/img/Match/IMG_2358.jpg'
import img3 from '@/img/Match/IMG_2453.jpg'
import img4 from '@/img/Match/IMG_2471.jpg'

export default function IntrasquadPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        {/* HERO SECTION */}
        <section className="relative h-[400px] overflow-hidden bg-[#0a1d3a] text-white md:h-[500px]">
          <Image
            src={heroImg}
            alt="Intrasquad FC TORO"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d3a] via-[#0a1d3a]/60 to-transparent" />
          
          <div className="relative z-10 mx-auto flex h-full max-w-[1100px] flex-col justify-end px-6 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">
                <span className="h-[2px] w-6 bg-[#ef233c]" />
                Événements FC TORO
              </p>
              <h1 className="mt-4 text-4xl font-black uppercase leading-[0.9] tracking-tighter drop-shadow-2xl md:text-6xl lg:text-7xl">
                INTRASQUAD<span className="text-[#ef233c]">.</span>
              </h1>
              <p className="mt-4 max-w-[600px] text-sm font-medium leading-relaxed text-white/80 sm:text-base">
                La compétition interne de l'académie pour forger l'esprit de compétition, évaluer le niveau et préparer nos athlètes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* DESCRIPTION SECTION */}
        <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1000px]">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tighter text-[#0d2d62] md:text-4xl">
                  Se mesurer pour <br />
                  <span className="text-[#ef233c]">mieux progresser.</span>
                </h2>
                <div className="mt-6 space-y-4 text-[15px] font-medium leading-relaxed text-[#445b7f]">
                  <p>
                    <strong>Intrasquad :</strong> Compétition interne à l'académie conçue pour préparer nos athlètes aux rencontres avec d'autres clubs. 
                  </p>
                  <p>
                    Ce programme permet à nos joueurs de se mesurer les uns aux autres dans un cadre compétitif, renforçant ainsi leurs compétences, leur esprit d'équipe et leur résilience.
                  </p>
                  <p>
                    Il offre également aux entraîneurs une opportunité précieuse d'évaluer le niveau de chaque joueur, d'ajuster les stratégies d'entraînement et de perfectionner les talents pour les futures compétitions interclubs.
                  </p>
                </div>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: RiTrophyLine, title: "Compétition", desc: "Cadre ultra-compétitif" },
                  { icon: RiGroupLine, title: "Esprit d'équipe", desc: "Cohésion renforcée" },
                  { icon: RiEyeLine, title: "Évaluation", desc: "Analyse des performances" },
                  { icon: RiStarLine, title: "Préparation", desc: "Prêts pour l'externe" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      viewport={{ once: true }} 
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="rounded-2xl border border-[#dbe5f2] bg-[#f8fafc] p-6 transition-all hover:border-[#ef233c]/30 hover:shadow-lg"
                    >
                      <Icon className="mb-3 h-6 w-6 text-[#ef233c]" />
                      <h3 className="text-sm font-black uppercase text-[#0a1d3a]">{item.title}</h3>
                      <p className="mt-1 text-xs font-semibold text-[#5b6f91]">{item.desc}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section className="bg-[#f8fafc] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="mb-12 text-center"
            >
              <h2 className="text-2xl font-black uppercase tracking-tighter text-[#0d2d62] md:text-3xl">
                Galerie <span className="text-[#ef233c]">Intrasquad</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Photo 1 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md lg:col-span-2 lg:aspect-auto"
              >
                <Image
                  src={img1}
                  alt="Action de match"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a1d3a]/80 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-sm font-bold uppercase tracking-widest text-white">Intensité</p>
                </div>
              </motion.div>

              {/* Photo 2 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md"
              >
                <Image
                  src={img2}
                  alt="Action de match"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              {/* Photo 3 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md"
              >
                <Image
                  src={img3}
                  alt="Action de match"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              {/* Photo 4 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md lg:col-span-2"
              >
                <Image
                  src={img4}
                  alt="Action de match"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a1d3a]/80 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-sm font-bold uppercase tracking-widest text-white">Résilience & Esprit d'équipe</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
