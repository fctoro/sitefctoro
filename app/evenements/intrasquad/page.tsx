'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { HomeNavbar } from '@/components/home-navbar'
import { 
  RiGroupLine, 
  RiStarLine, 
  RiTrophyLine, 
  RiEyeLine,
  RiShieldStarLine
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
          <div className="absolute inset-0 bg-[#0a1d3a]">
            {/* Text Banner Background */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-[0.05] select-none">
              <p className="whitespace-nowrap text-[20vw] font-black uppercase italic leading-none text-white">
                INTRASQUAD
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d3a] via-[#0a1d3a]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-[#ef233c] via-[#ef233c]/50 to-transparent" />
          
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

        {/* DESCRIPTION SECTION (Modified to emphasize text) */}
        <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1000px]">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block rounded-xl bg-[#ef233c]/10 px-3 py-1 mb-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#ef233c]">Concept</p>
                </div>
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

        {/* REPLACED GALLERY WITH TEXT CARDS */}
        <section className="bg-[#f8fafc] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="mb-12 text-center"
            >
              <h2 className="text-2xl font-black uppercase tracking-tighter text-[#0d2d62] md:text-3xl">
                Objectifs <span className="text-[#ef233c]">Stratégiques</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Intensité",
                  body: "Mettre les joueurs dans des conditions de match réelles pour tester leur réactivité sous pression."
                },
                {
                  title: "Coordination",
                  body: "Affiner les mouvements collectifs et la communication entre les différentes lignes de jeu."
                },
                {
                  title: "Mental",
                  body: "Développer la gagne et la résilience face à des adversaires qui connaissent parfaitement votre jeu."
                },
                {
                  title: "Détection",
                  body: "Identifier les profils prêts à franchir le cap de l'équipe Elite ou des sélections."
                },
                {
                  title: "Tactique",
                  body: "Expérimenter de nouveaux systèmes de jeu dans un environnement contrôlé mais compétitif."
                },
                {
                  title: "Émulation",
                  body: "Créer une saine concurrence au sein de l'académie pour pousser chaque talent vers le haut."
                }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-3xl border border-[#dce5f2] bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-[#ef233c]/20 hover:shadow-xl"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
                    <RiShieldStarLine className="h-16 w-16" />
                  </div>
                  <h3 className="text-lg font-black uppercase text-[#0d2d62] group-hover:text-[#ef233c] transition-colors">
                    {card.title}
                  </h3>
                  <div className="mt-4 h-1 w-8 bg-[#ef233c]/20 group-hover:w-16 transition-all" />
                  <p className="mt-4 text-sm font-medium leading-relaxed text-[#445b7f]">
                    {card.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
