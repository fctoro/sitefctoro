'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { HomeNavbar } from '@/components/home-navbar'
import { sponsors } from '@/lib/sponsors'
import {
  RiShieldStarLine,
  RiTrophyLine,
  RiHandHeartLine,
  RiGlobalLine,
  RiGroupLine,
} from '@remixicon/react'

import { Breadcrumb } from '@/components/breadcrumb'

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
        <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Sponsors', href: '/sponsors' }]} />
        <section className="relative h-[220px] overflow-hidden bg-[#0a1d3a] text-white md:h-[280px]">
          <Image
            src="/home/staff-direction.jpg"
            alt="Sponsors"
            fill
            priority
            className="object-cover opacity-[0.35] transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#0a1d3a] to-transparent" />
          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#ef233c] via-[#ef233c]/60 to-transparent" />

          <div className="relative z-10 mx-auto flex h-full max-w-[1100px] flex-col justify-center px-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">
                Partenaires Stratégiques
              </p>
              <h1 className="text-3xl font-black uppercase leading-[0.8] tracking-tighter drop-shadow-2xl md:text-5xl">
                Sponsors & Partners
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-[#eef2f6] bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1000px]">
            <div className="mb-12 flex flex-col items-center text-center">
              <RiHandHeartLine className="mb-4 h-6 w-6 text-[#ef233c]" />
              <h2 className="mb-4 text-xl font-black uppercase leading-none tracking-tight text-[#0a1d3a] md:text-2xl">
                Nos Partenaires
              </h2>
              <p className="max-w-[600px] text-[13px] font-medium leading-relaxed text-[#5b6f91] sm:text-sm">
                FC TORO remercie ses partenaires et sponsors qui contribuent au développement du club et à l'organisation de ses activités sportives. Leur soutien est essentiel à notre réussite.
              </p>
            </div>

            <div className="relative overflow-hidden py-4">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

              <motion.div
                initial={{ x: 0 }}
                animate={{ x: '-50%' }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="flex w-max items-center gap-14 md:gap-20"
              >
                {[...sponsors, ...sponsors].map((s, idx) => (
                  <div
                    key={idx}
                    className="shrink-0 transition-transform duration-300 hover:scale-105"
                  >
                    <Image
                      src={s.logo}
                      alt={s.name}
                      width={120}
                      height={60}
                      className="h-7 w-auto object-contain md:h-10"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-[#f8fafc] to-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14 grid gap-6 sm:grid-cols-3"
            >
              {supportItems.map((item, idx) => {
                const Icon = sponsorIcons[idx] || RiShieldStarLine

                return (
                  <div
                    key={item}
                    className="group rounded-2xl border border-[#eef2f6] bg-white p-7 shadow-[0_4px_20px_rgba(10,29,58,0.02)] transition-all duration-300 hover:border-[#ef233c]/20 hover:shadow-[0_10px_30px_rgba(239,35,60,0.06)]"
                  >
                    <div className="mb-4 inline-flex items-center justify-center rounded-full bg-[#ef233c]/5 p-3 transition-colors group-hover:bg-[#ef233c]/10">
                      <Icon className="h-5 w-5 text-[#ef233c]" />
                    </div>
                    <h4 className="text-[13px] font-bold uppercase leading-relaxed text-[#0a1d3a]">
                      {item}
                    </h4>
                  </div>
                )
              })}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-[28px] bg-[#0a1d3a] p-10 text-center text-white shadow-2xl md:p-14 lg:p-16"
            >
              <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 opacity-5">
                <RiShieldStarLine className="h-96 w-96 text-white" />
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,35,60,0.15)_0%,transparent_60%)]" />

              <div className="relative z-10 flex flex-col items-center">
                <span className="mb-5 inline-flex items-center justify-center rounded-full bg-white/10 p-3 backdrop-blur-sm">
                  <RiHandHeartLine className="h-5 w-5 text-[#ef233c]" />
                </span>

                <h3 className="mb-6 max-w-2xl text-[clamp(1.1rem,2vw,1.6rem)] font-black uppercase leading-tight tracking-tight shadow-black drop-shadow-md">
                  FC TORO est ouvert aux collaborations avec des entreprises partageant les mêmes valeurs.
                </h3>

                <p className="mb-8 max-w-[500px] text-sm font-medium leading-relaxed text-white/70">
                  Associez votre image à un projet fort, éducatif et sportif, et participez à la progression de la jeunesse haïtienne.
                </p>

                <a
                  href="mailto:footballclubtoro@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ef233c] px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-[0_8px_20px_rgba(239,35,60,0.3)] transition-all hover:bg-[#ff3f5c] hover:shadow-[0_12px_25px_rgba(239,35,60,0.4)]"
                >
                  Devenir Partenaire
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
