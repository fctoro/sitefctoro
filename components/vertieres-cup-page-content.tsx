'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { RiMapPinLine, RiCalendarEventLine, RiTrophyLine, RiGlobalLine, RiMap2Line } from '@remixicon/react'

// Import images
import heroImg from '@/img/vertiere cup/IMG-20241021-WA0021.jpg'
import match1 from '@/img/Match/FC-Toro.jpg'
import match2 from '@/img/Match/IMG_2341.jpg'
import tournoi1 from '@/img/Elite/IMG_5150.jpg'
import atmos1 from '@/img/Match/IMG_2453.jpg'
import teamImg from '@/img/Match/IMG_2471.jpg'

export default function VertieresCupPageContent() {
  return (
    <div className="bg-[#f2f2f4] text-[#0a1d3a]">
      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[650px] overflow-hidden bg-[#0a1d3a] text-white md:h-[800px] lg:h-screen lg:min-h-[700px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={heroImg}
            alt="Vertières Cup"
            fill
            priority
            className="object-cover object-center opacity-60 mix-blend-overlay"
          />
          {/* Fallback image if heroImg doesn't load well as background */}
          <div className="absolute inset-0 bg-[#0a1d3a]/60" />
          <Image
            src={match1}
            alt="Action de jeu Vertieres Cup"
            fill
            className="object-cover object-top opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d3a] via-[#0a1d3a]/60 to-transparent" />
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#0a1d3a]/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1200px] flex-col justify-end px-4 pb-20 sm:px-6 lg:px-8 lg:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="mb-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ef233c] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                <RiTrophyLine className="h-4 w-4" /> Tournoi Emblématique
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
                <RiMapPinLine className="h-4 w-4 text-[#ef233c]" /> Bord de Mer de Limonade
              </span>
            </div>

            <h1 className="text-[clamp(3.5rem,7vw,7rem)] font-black uppercase leading-[0.85] tracking-tighter text-white drop-shadow-2xl">
              Vertières <br />
              <span className="text-[#ef233c]">Cup.</span>
            </h1>
            
            <p className="mt-8 text-lg font-medium leading-relaxed text-white/80 sm:text-xl lg:max-w-2xl">
              Célébrons le courage et l'héritage historique d'Haïti à travers le football. Là où la compétition sportive rencontre le patriotisme.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════ L'ÉVÉNEMENT (DESCRIPTION) ═══════ */}
      <section className="relative -mt-10 z-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-[2rem] bg-white shadow-2xl md:grid md:grid-cols[1fr_1.5fr] lg:grid-cols-2 lg:items-center"
          >
            {/* Image side */}
            <div className="relative h-[400px] w-full lg:h-full">
              <Image 
                src={heroImg} 
                alt="Affiche Vertieres Cup" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <p className="text-xl font-black uppercase text-white shadow-xl">Héritage Historique</p>
                <p className="text-sm font-bold text-[#ef233c]">18 Novembre</p>
              </div>
            </div>
            
            {/* Text side */}
            <div className="p-8 md:p-12 lg:p-16">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ef233c]">L'histoire s'écrit ici</p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-[0.95] tracking-tighter text-[#0a1d3a] md:text-4xl">
                Un hommage à<br />
                <span className="text-[#ef233c]">L'Indépendance.</span>
              </h2>
              
              <div className="mt-8 space-y-5 text-[15px] font-medium leading-relaxed text-[#445b7f]">
                <p>
                  <strong>VERTIERES CUP</strong> est un tournoi de football emblématique à Bord de Mer de Limonade - Nord Haïti, organisé par <strong>FULMOUN PRODUCTION</strong>, sous le leadership du <strong>FC TORO</strong>, qui célèbre le courage et l'héritage historique d'Haïti en hommage à la bataille de Vertières, un moment clé de la lutte pour l'indépendance.
                </p>
                <p>
                  Ce tournoi réunit les jeunes athlètes les plus prometteurs du pays, offrant une plateforme unique où compétition sportive et patriotisme s'entremêlent. Le tournoi prévoit d'accueillir des équipes de différentes régions, permettant aux jeunes de mesurer leurs compétences tout en renforçant leur esprit d'équipe et leur fierté nationale.
                </p>
                <p>
                  Le tournoi sert aussi de tremplin pour identifier et soutenir les talents émergents, favorisant leur intégration dans des programmes de formations avancés.
                </p>
                <p className="text-[#0a1d3a] font-bold">
                  Vertières Cup offre à la communauté l'opportunité de se rassembler et de célébrer une date historique dans un cadre dynamique et festif.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded bg-[#f2f4f8] px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#0a1d3a]">
                  <RiGlobalLine className="h-4 w-4 text-[#ef233c]" /> #FOOTTOURISME
                </span>
                <span className="inline-flex items-center gap-2 rounded bg-[#f2f4f8] px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#0a1d3a]">
                  <RiMap2Line className="h-4 w-4 text-[#ef233c]" /> #FOOTCULTURE
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ IMMERSION / GALLERY COMPÉTITION ═══════ */}
      <section className="bg-[#f2f2f4] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-14 text-center"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">Immersion</p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-[0.9] tracking-tighter text-[#0a1d3a] md:text-5xl">
              Vivre <span className="text-[#ef233c]">L'Événement.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-[#5b6f91]">
              De l'intensité sur le terrain à la ferveur dans les gradins, découvrez l'atmosphère unique de la Vertières Cup.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Grande image (2 cols / 2 rows) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative h-[400px] overflow-hidden rounded-[2rem] sm:col-span-2 lg:row-span-2 lg:h-[600px]"
            >
              <Image src={match2} alt="Atmosphère Vertières Cup" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
              <div className="absolute bottom-0 left-0 p-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#ef233c]">Action</p>
                <p className="mt-2 text-2xl font-black uppercase text-white">L'intensité d'une grande compétition</p>
              </div>
            </motion.div>

            {/* Images classiques */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative h-[280px] overflow-hidden rounded-[2rem]"
            >
              <Image src={tournoi1} alt="Bord de mer Limonade" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[#0a1d3a]/20 transition-colors duration-300 group-hover:bg-transparent" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative h-[280px] overflow-hidden rounded-[2rem]"
            >
              <Image src={atmos1} alt="Ferveur Vertieres" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[#0a1d3a]/20 transition-colors duration-300 group-hover:bg-transparent" />
            </motion.div>

            {/* Image large */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative h-[350px] overflow-hidden rounded-[2rem] sm:col-span-2 lg:col-span-3"
            >
              <Image src={teamImg} alt="Équipe rassemblée" fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#ef233c]">Rassemblement</p>
                <p className="mt-2 text-2xl font-black uppercase text-white">Un tremplin pour les talents émergents</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ CONCLUSION ═══════ */}
      <section className="bg-white px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[800px]">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <RiMapPinLine className="mx-auto h-12 w-12 text-[#ef233c]" />
            <h2 className="mt-6 text-3xl font-black uppercase leading-[0.95] tracking-tighter text-[#0a1d3a] md:text-5xl">
              Rendez-vous à <br />
              <span className="text-[#ef233c]">Bord de Mer de Limonade</span>.
            </h2>
            <p className="mt-6 text-base font-semibold leading-relaxed text-[#5b6f91]">
              Venez vivre un moment inoubliable où sport, culture, patriotisme et tourisme se rencontrent. Le FC TORO et FULMOUN PRODUCTION vous attendent pour construire l'histoire, ensemble.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
