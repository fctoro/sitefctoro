'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { RiCalendarEventLine, RiShieldStarLine, RiTeamLine, RiFlagLine } from '@remixicon/react'

// Fixtures imports
import { flagDayFixtures } from '@/data/events-data'
import { ClubFixture } from '@/types/club'

const heroImg = '/flag-day/champion.png'
const flagImg2 = '/flag-day/img-1644.jpg'
const flagImg3 = '/flag-day/img-1802.jpg'
const flagImg4 = '/flag-day/mg-0004.jpg'

// Helpers for Fixtures
const formatKickoffDate = (kickoff: string) =>
  new Intl.DateTimeFormat('fr-FR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  }).format(new Date(kickoff))

const formatKickoffTime = (kickoff: string) =>
  new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(kickoff))

export default function FlagDayPageContent() {
  const recentFixtures: ClubFixture[] = [...flagDayFixtures]
    .filter((fixture) => fixture.status === 'FT')
    .sort((a, b) => new Date(b.kickoff).getTime() - new Date(a.kickoff).getTime())
    .slice(0, 4)

  const upcomingFixtures: ClubFixture[] = [...flagDayFixtures]
    .filter((fixture) => fixture.status === 'A venir')
    .sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime())
    .slice(0, 4)

  return (
    <div className="bg-[#f2f2f4] text-[#0a1d3a]">
      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[650px] overflow-hidden bg-[#0a1d3a] text-white md:h-[800px] lg:h-screen lg:min-h-[700px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={heroImg}
            alt="Flag Day Champion"
            fill
            priority
            className="object-cover object-top opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d3a] via-[#0a1d3a]/30 to-transparent" />
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#0a1d3a]/60 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1200px] flex-col justify-end px-4 pb-20 sm:px-6 lg:px-8 lg:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="mb-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1a4ea3] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                <RiFlagLine className="h-4 w-4" /> Fête du Drapeau
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
                <RiCalendarEventLine className="h-4 w-4 text-[#1a4ea3]" /> 18 Mai
              </span>
            </div>

            <h1 className="text-[clamp(3.5rem,7vw,7rem)] font-black uppercase leading-[0.85] tracking-tighter text-white drop-shadow-2xl">
              Flag Day <br />
              <span className="text-[#ef233c]">Tournament.</span>
            </h1>
            
            <p className="mt-8 text-lg font-medium leading-relaxed text-white/80 sm:text-xl lg:max-w-2xl">
              Célébrons le patriotisme et l'unité haïtienne. Une compétition prestigieuse où la passion du football rassemble la jeunesse de demain.
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
                alt="Jeunesse et Fierté" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <p className="text-xl font-black uppercase text-white shadow-xl">Symbole de Fierté</p>
                <p className="text-sm font-bold text-[#ef233c]">Unité & Résistance</p>
              </div>
            </div>
            
            {/* Text side */}
            <div className="p-8 md:p-12 lg:p-16">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a4ea3]">Formation & Valeurs</p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-[0.95] tracking-tighter text-[#0a1d3a] md:text-4xl">
                Un hommage au<br />
                <span className="text-[#ef233c]">Drapeau Haïtien.</span>
              </h2>
              
              <div className="mt-8 space-y-5 text-[15px] font-medium leading-relaxed text-[#445b7f]">
                <p>
                  <strong>FlagDay Tournament</strong> est un tournoi de jeunes par FULMOUN PRODUCTION qui se déroule sous le leadership du FC TORO, en hommage à la Fête du Drapeau Haïtien. Cet événement rassemble des équipes de jeunes talents venus de différentes régions du pays pour célébrer non seulement la passion du football, mais aussi l'esprit patriotique et la fierté nationale.
                </p>
                <p>
                  En tant que pilier de la formation de la jeunesse, FC TORO s'engage chaque année à organiser ce tournoi autour du <strong>18 mai</strong>, date marquant la création du drapeau haïtien, symbole d'unité et de résistance.
                </p>
                <p>
                  Lors de cette compétition, les jeunes athlètes sont mis au défi de se surpasser tout en apprenant l'importance de la cohésion, de la discipline et du respect de l'adversaire. Le FlagDay Tournament est également une plateforme d'échanges culturels et sportifs, où chaque participant a la chance de montrer son talent devant un public de supporters passionnés.
                </p>
                <p className="font-bold text-[#0a1d3a] border-l-4 border-[#ef233c] pl-4 italic">
                  Cette initiative contribue ainsi à développer le football de jeunes en Haïti et à insuffler des valeurs de solidarité et de détermination qui transcendent le terrain.
                </p>
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
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1a4ea3]">Immersion</p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-[0.9] tracking-tighter text-[#0a1d3a] md:text-5xl">
              Vivre la <span className="text-[#1a4ea3]">Passion.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-[#5b6f91]">
              Joie, détermination et fraternité s'emparent des terrains pour honorer nos couleurs à travers le sport.
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
              <Image src={flagImg4} alt="Atmosphère Flag Day" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
              <div className="absolute bottom-0 left-0 p-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1a4ea3]">Célébration</p>
                <p className="mt-2 text-2xl font-black uppercase text-white">Le football comme lien communautaire</p>
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
              <Image src={flagImg2} alt="Jeunes Talents" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[#0a1d3a]/20 transition-colors duration-300 group-hover:bg-transparent" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative h-[280px] overflow-hidden rounded-[2rem]"
            >
              <Image src={flagImg3} alt="Action de match" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
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
              <Image src={heroImg} alt="Équipe rassemblée" fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1a4ea3]">Cohésion</p>
                <p className="mt-2 text-2xl font-black uppercase text-white">L'esprit d'équipe récompensé</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ FIXTURES (MATCHS RECENTS & A VENIR) ═══════ */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">Évolution</p>
            <h2 className="mt-4 text-3xl font-black uppercase leading-[0.9] tracking-tighter text-[#0a1d3a]">
              Performances & <br />
              <span className="text-[#1a4ea3]">Affiches à Suivre.</span>
            </h2>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Résultats récents */}
            <section className="rounded-[28px] border border-[#d7dfec] bg-[#fbfcff] p-6 shadow-[0_14px_30px_rgba(10,29,58,0.06)] md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <RiShieldStarLine className="h-6 w-6 text-[#1a4ea3]" />
                <h3 className="text-xl font-black uppercase text-[#0a1d3a]">Résultats récents</h3>
              </div>
              
              <div className="space-y-4">
                {recentFixtures.map((fixture) => (
                  <article
                    key={fixture.id}
                    className="group rounded-2xl border border-[#e7edf6] bg-white p-4 transition-colors hover:border-[#1a4ea3]/30"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#6a7f9f]">
                        {fixture.round} - {fixture.competition}
                      </p>
                      <p className="text-[11px] font-bold tracking-wider text-[#6a7f9f]">
                        {formatKickoffDate(fixture.kickoff)}
                      </p>
                    </div>
                    <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4">
                      <div className="flex min-w-0 items-center justify-end gap-3">
                        <span className="truncate text-right text-sm font-black uppercase text-[#0a1d3a]">
                          {fixture.homeTeamName}
                        </span>
                        <Image src={fixture.homeLogoUrl} alt={fixture.homeTeamName} width={28} height={28} className="h-7 w-7 shrink-0 rounded-full object-cover shadow-sm" />
                      </div>

                      <div className="flex h-10 min-w-[70px] items-center justify-center rounded-lg bg-[#f0f4f9] px-3 font-black text-[#1a4ea3] shadow-inner">
                        {fixture.homeScore} - {fixture.awayScore}
                      </div>

                      <div className="flex min-w-0 items-center gap-3">
                        <Image src={fixture.awayLogoUrl} alt={fixture.awayTeamName} width={28} height={28} className="h-7 w-7 shrink-0 rounded-full object-cover shadow-sm" />
                        <span className="min-w-0 truncate text-sm font-black uppercase text-[#0a1d3a]">
                          {fixture.awayTeamName}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Prochains matchs */}
            <section className="rounded-[28px] border border-[#d7dfec] bg-[#fbfcff] p-6 shadow-[0_14px_30px_rgba(10,29,58,0.06)] md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <RiTeamLine className="h-6 w-6 text-[#ef233c]" />
                  <h3 className="text-xl font-black uppercase text-[#0a1d3a]">Prochains matchs</h3>
                </div>
              </div>

              <div className="space-y-4">
                {upcomingFixtures.map((fixture) => (
                  <article
                    key={fixture.id}
                    className="group rounded-2xl border border-[#e7edf6] bg-white p-4 transition-colors hover:border-[#ef233c]/30"
                  >
                    <div className="flex items-center justify-between gap-3 border-b border-[#f0f4f9] pb-3">
                      <div className="flex flex-col">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#6a7f9f]">
                          {fixture.round} - {fixture.competition}
                        </p>
                        <p className="mt-1 text-[12px] font-bold text-[#ef233c]">
                          {formatKickoffDate(fixture.kickoff)} - {formatKickoffTime(fixture.kickoff)}
                        </p>
                      </div>
                      <span className="rounded-full bg-[#ffe9ed] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#c81f34]">
                        À venir
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4">
                      <div className="flex min-w-0 items-center justify-end gap-3">
                        <span className="truncate text-right text-sm font-black uppercase text-[#0a1d3a]">
                          {fixture.homeTeamName}
                        </span>
                        <Image src={fixture.homeLogoUrl} alt={fixture.homeTeamName} width={28} height={28} className="h-7 w-7 shrink-0 rounded-full object-cover shadow-sm" />
                      </div>

                      <span className="text-sm font-black uppercase text-[#6a7f9f]">vs</span>

                      <div className="flex min-w-0 items-center gap-3">
                        <Image src={fixture.awayLogoUrl} alt={fixture.awayTeamName} width={28} height={28} className="h-7 w-7 shrink-0 rounded-full object-cover shadow-sm" />
                        <span className="min-w-0 truncate text-sm font-black uppercase text-[#0a1d3a]">
                          {fixture.awayTeamName}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}
