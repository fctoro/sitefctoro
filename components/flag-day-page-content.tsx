'use client'

import { useState } from 'react' // trigger refresh
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { RiCalendarEventLine, RiTrophyLine, RiShieldStarLine, RiMedalLine, RiFlagLine, RiUser3Line, RiFootballLine, RiFireLine } from '@remixicon/react'

// Stats Data
import ChampionsLeagueBracket from './ChampionsLeagueBracket'
import { getLogo, StandingsRow, Scorer, MatchResult, BracketMatch } from '@/data/flag-day-stats'

// Hero Background — Victoire avec confettis (spectaculaire)
const heroBgImg = '/flag-day/hero-champion.jpg'
// Image de victoire sur scène
const heroStageImg = '/flag-day/victory-stage.jpg'
// Section description — Équipe au stade
const descriptionImg = '/flag-day/img-1802.jpg'
// Galerie
const galleryImg1 = '/flag-day/team-white.jpg'   // Équipe blanche
const galleryImg2 = '/flag-day/team-pose.jpg'    // Pose officielle
const galleryImg3 = '/flag-day/flag-bearers.jpg' // Porteurs de drapeau
const galleryImg4 = '/flag-day/action-match.jpg' // Action de jeu

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

type CmsData = {
  competitions: any[]
  categories: any[]
  matches: any[]
  standings: any[]
  scorers: any[]
}

export default function FlagDayPageContent({ cmsData }: { cmsData?: CmsData }) {
  // 1. Catégories standards (On ne veut plus de statique, mais on garde les onglets pour la navigation)
  const categories = ['U9', 'U11', 'U13', 'U15', 'U17', 'U21']

  const [activeCategory, setActiveCategory] = useState<string>(categories[0])
  const [activeMatchGroup, setActiveMatchGroup] = useState<'A' | 'B' | 'ALL'>('ALL')

  // 2. Préparer les données de la catégorie active
  const activeCompetition = cmsData?.competitions.find(c => 
    c.age_category?.trim().toUpperCase() === activeCategory.trim().toUpperCase()
  )
  const activeCmsCat = cmsData?.categories.find(c => c.competition_id === activeCompetition?.id)
  
  const cmsStandingsRaw = activeCmsCat ? cmsData?.standings.filter(s => s.category_id === activeCmsCat.id) : []
  const cmsScorersRaw = activeCompetition ? cmsData?.scorers : [] // Déjà filtrés et agrégés par page.tsx
  const cmsMatchesRaw = activeCompetition ? cmsData?.matches.filter(m => m.competition_id === activeCompetition.id) : []

  // Formatter et TRIER les standings CMS
  const sortStandings = (list: any[]) => {
    return [...list].sort((a, b) => b.pts - a.pts || b.df - a.df || b.bm - a.bm)
  }

  const formattedCmsStandings = {
    A: sortStandings(cmsStandingsRaw?.filter(s => s.group_name === 'A').map(s => ({
      name: s.team.name, pts: s.points, m: s.played, v: s.won, n: s.drawn, d: s.lost, bm: s.goals_for, bc: s.goals_against, df: s.goals_for - s.goals_against, pl: s.is_qualified ? 'Q' : ''
    })) || []),
    B: sortStandings(cmsStandingsRaw?.filter(s => s.group_name === 'B').map(s => ({
      name: s.team.name, pts: s.points, m: s.played, v: s.won, n: s.drawn, d: s.lost, bm: s.goals_for, bc: s.goals_against, df: s.goals_for - s.goals_against, pl: s.is_qualified ? 'Q' : ''
    })) || [])
  }

  // Gérer la priorité (UNIQUEMENT CMS)
  const isCmsActive = !!activeCompetition

  // Calculer les qualifiés CMS
  const cmsQualified = {
    A: cmsStandingsRaw?.filter(s => s.group_name === 'A' && s.is_qualified).map(s => s.team.name).join(' --- '),
    B: cmsStandingsRaw?.filter(s => s.group_name === 'B' && s.is_qualified).map(s => s.team.name).join(' --- ')
  }

  const currentData = {
    groups: isCmsActive ? formattedCmsStandings : { A: [], B: [] },
    scorers: isCmsActive 
      ? (cmsScorersRaw ?? []).map(s => ({ name: s.player_name, goals: s.goals, team: s.team_name })) 
      : [],
    qualified: (isCmsActive && (cmsQualified.A || cmsQualified.B)) ? cmsQualified : { A: '', B: '' }
  }

  // 3. Fusionner les matchs (Priorité CMS totale)
  const formattedCmsMatches = cmsMatchesRaw?.map(m => ({
    home: m.home_team.name,
    away: m.away_team.name,
    scoreHome: m.home_score,
    scoreAway: m.away_score,
    group: m.round.includes('Groupe A') ? 'A' : (m.round.includes('Groupe B') ? 'B' : 'A')
  })) || []

  const currentMatches = isCmsActive 
    ? formattedCmsMatches.filter(m => activeMatchGroup === 'ALL' || m.group === activeMatchGroup)
    : []

  const hasData = isCmsActive

  const rankLabel = (idx: number) => {
    if (idx === 0) return { label: '1er', color: 'text-[#f5b041]', medal: '🥇' }
    if (idx === 1) return { label: '2ème', color: 'text-[#a8b2c1]', medal: '🥈' }
    if (idx === 2) return { label: '3ème', color: 'text-[#cd7f32]', medal: '🥉' }
    return { label: (idx + 1) + 'ème', color: 'text-[#6a7f9f]', medal: '' }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0a1d3a] max-w-full overflow-x-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[650px] overflow-hidden bg-[#0a1d3a] text-white md:h-[800px] lg:h-screen lg:min-h-[700px]">
        {/* Background Image — Vraie photo de victoire FC TORO */}
        <div className="absolute inset-0">
          <Image
            src={heroBgImg}
            alt="FC TORO Flag Day Champion"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Overlay sombre progressif pour lisibilité du texte */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d3a] via-[#0a1d3a]/50 to-[#0a1d3a]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1d3a]/70 via-transparent to-transparent" />
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
            {/* Image side — Vraie photo de l'équipe FC TORO au stade */}
            <div className="relative h-[420px] w-full overflow-hidden lg:h-full">
              <Image 
                src={descriptionImg}
                alt="FC TORO — Équipe Flag Day Tournament" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8">
                <p className="text-xl font-black uppercase text-white drop-shadow-lg">FC TORO — Champions</p>
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

      {/* ═══════ BRACKET — ROUTE TO THE FINAL ═══════ */}
      <ChampionsLeagueBracket cmsMatches={cmsData?.matches} />

      {/* ═══════ SECTION MATCHS ═══════ */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">Flag Day Tournament</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-[0.9] tracking-tighter text-[#0a1d3a]">
                Résultats <br />
                <span className="text-[#1a4ea3]">des Matchs.</span>
              </h2>
            </div>

            {/* Sélecteur catégorie matchs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setActiveMatchGroup('ALL') }}
                  className={`relative rounded-full px-5 py-2 text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-[#1a4ea3] text-white shadow-[0_6px_18px_rgba(26,78,163,0.3)]'
                      : 'bg-[#f0f4f9] text-[#445b7f] hover:bg-[#e0e8f5] hover:text-[#0a1d3a]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              {!hasData ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20 bg-[#f7f9fc] rounded-3xl border-2 border-dashed border-[#d7dfec]">
                  <RiFlagLine className="h-12 w-12 text-[#94a3b8] mb-4" />
                  <p className="text-lg font-black uppercase tracking-widest text-[#64748b]">Pas de championnat disponible</p>
                  <p className="text-sm text-[#94a3b8] mt-2 font-medium">Revenez bientôt pour suivre les résultats de cette catégorie.</p>
                </div>
              ) : currentMatches.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20 bg-[#f7f9fc] rounded-3xl border border-[#d7dfec]">
                  <RiCalendarEventLine className="h-10 w-10 text-[#1a4ea3]/50 mb-3" />
                  <p className="text-md font-black uppercase tracking-widest text-[#1a4ea3]">Matchs à venir</p>
                  <p className="text-xs text-[#64748b] mt-1 font-bold">Le tirage a été effectué, restez connectés pour les scores.</p>
                </div>
              ) : currentMatches.map((match: any, idx: number) => {
                const grp = match.group
                const homeWin = match.scoreHome > match.scoreAway
                const awayWin = match.scoreAway > match.scoreHome
                const isDraw = match.scoreHome === match.scoreAway
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.06 }}
                    className="relative overflow-hidden rounded-2xl bg-[#f7f9fc] border border-[#d7dfec] shadow-sm hover:shadow-md hover:border-[#b0c4de] transition-all duration-300"
                  >
                    <div className="p-4">

                      {/* ── En-tête carte : Groupe + Full Time */}
                      <div className="mb-3 flex items-center justify-between">
                        {/* Badge Groupe */}
                        <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-widest ${
                          grp === 'A'
                            ? 'bg-[#ef233c]/10 text-[#ef233c] border border-[#ef233c]/20'
                            : 'bg-[#1a4ea3]/10 text-[#1a4ea3] border border-[#1a4ea3]/20'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${grp === 'A' ? 'bg-[#ef233c]' : 'bg-[#1a4ea3]'}`} />
                          Gr. {grp}
                        </span>
                        {/* Badge Full Time */}
                        <span className="rounded-full bg-[#0a1d3a]/6 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-[#0a1d3a]/40">
                          FT
                        </span>
                      </div>

                      {/* ── Matchup ── */}
                      <div className="flex items-center justify-between gap-1">

                        {/* Équipe domicile */}
                        <div className="flex flex-1 flex-col items-center gap-2.5">
                          <div className={`relative h-16 w-16 rounded-full bg-white p-2 shadow-lg ring-2 transition-all duration-300 ${
                            homeWin
                              ? 'ring-[#22c55e] shadow-[0_0_18px_rgba(34,197,94,0.2)]'
                              : awayWin
                              ? 'ring-[#d7dfec] opacity-55'
                              : 'ring-[#d7dfec]'
                          }`}>
                            <Image
                              src={getLogo(match.home)}
                              alt={match.home}
                              fill
                              sizes="64px"
                              className="object-contain p-1.5"
                            />
                            {homeWin && (
                              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#22c55e] text-[8px] font-black text-white shadow">W</span>
                            )}
                          </div>
                          <p className={`text-center text-[9px] font-black uppercase leading-tight max-w-[64px] ${
                            homeWin ? 'text-[#0a1d3a]' : awayWin ? 'text-[#0a1d3a]/30' : 'text-[#445b7f]'
                          }`}>{match.home}</p>
                        </div>

                        {/* Score + VS */}
                        <div className="flex flex-col items-center shrink-0 px-1">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[26px] font-black tabular-nums leading-none ${
                              homeWin ? 'text-[#0a1d3a]' : awayWin ? 'text-[#0a1d3a]/25' : 'text-[#445b7f]'
                            }`}>{match.scoreHome}</span>
                            <span className="text-xs font-black text-[#0a1d3a]/15">:</span>
                            <span className={`text-[26px] font-black tabular-nums leading-none ${
                              awayWin ? 'text-[#0a1d3a]' : homeWin ? 'text-[#0a1d3a]/25' : 'text-[#445b7f]'
                            }`}>{match.scoreAway}</span>
                          </div>
                          <span className="mt-0.5 text-[8px] font-black uppercase tracking-[0.12em] text-[#0a1d3a]/25">
                            {isDraw ? 'NUL' : 'VS'}
                          </span>
                        </div>

                        {/* Équipe extérieure */}
                        <div className="flex flex-1 flex-col items-center gap-2.5">
                          <div className={`relative h-16 w-16 rounded-full bg-white p-2 shadow-lg ring-2 transition-all duration-300 ${
                            awayWin
                              ? 'ring-[#22c55e] shadow-[0_0_18px_rgba(34,197,94,0.2)]'
                              : homeWin
                              ? 'ring-[#d7dfec] opacity-55'
                              : 'ring-[#d7dfec]'
                          }`}>
                            <Image
                              src={getLogo(match.away)}
                              alt={match.away}
                              fill
                              sizes="64px"
                              className="object-contain p-1.5"
                            />
                            {awayWin && (
                              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#22c55e] text-[8px] font-black text-white shadow">W</span>
                            )}
                          </div>
                          <p className={`text-center text-[9px] font-black uppercase leading-tight max-w-[64px] ${
                            awayWin ? 'text-[#0a1d3a]' : homeWin ? 'text-[#0a1d3a]/30' : 'text-[#445b7f]'
                          }`}>{match.away}</p>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                )
              })}

            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════ STATISTIQUES & CLASSEMENTS ═══════ */}
      <section className="bg-[#f0f4f9] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">Résultats</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-[0.9] tracking-tighter text-[#0a1d3a]">
                Statistiques & <br />
                <span className="text-[#1a4ea3]">Classements.</span>
              </h2>
            </div>

            {/* Sélecteur de catégories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative overflow-hidden rounded-full px-5 py-2 text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-[#0a1d3a] text-white shadow-[0_6px_18px_rgba(10,29,58,0.3)]'
                      : 'bg-white text-[#445b7f] hover:bg-[#e7edf6] hover:text-[#0a1d3a] shadow-sm'
                  }`}
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeCatStats"
                      className="absolute inset-0 bg-[#0a1d3a]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + '-stats'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid gap-8 xl:grid-cols-3"
            >
              {!hasData ? (
                <div className="xl:col-span-3 flex flex-col items-center justify-center py-32 bg-white rounded-[32px] border-2 border-dashed border-[#e2e8f0] shadow-sm">
                  <RiTrophyLine className="h-16 w-16 text-[#cbd5e1] mb-6" />
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-[#1e293b]">Pas de statistiques disponibles</h3>
                  <p className="text-[#94a3b8] mt-2 font-medium max-w-md text-center">Les classements et statistiques seront publiés dès le début de la compétition.</p>
                </div>
              ) : (
                <>
                  {/* ── CLASSEMENTS (2/3 de l'espace) */}
                  <div className="xl:col-span-2 space-y-8">

                {/* TABLE GROUPE A */}
                {(['A', 'B'] as const).map((grp) => (
                  <div key={grp} className="overflow-hidden rounded-[20px] bg-white shadow-[0_2px_20px_rgba(10,29,58,0.07)]">
                    <div className={`flex items-center gap-3 px-6 py-4 ${grp === 'A' ? 'bg-[#ef233c]' : 'bg-[#1a4ea3]'}`}>
                      <RiShieldStarLine className="h-5 w-5 text-white" />
                      <h3 className="font-black uppercase tracking-widest text-white">Groupe {grp} — {activeCategory}</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="bg-[#f7f9fc] text-[10px] font-black uppercase tracking-wider text-[#8fa3bf]">
                            <th className="w-10 px-4 py-3 text-center">#</th>
                            <th className="px-4 py-3">Équipe</th>
                            <th className="px-3 py-3 text-center font-black text-[#0a1d3a]">Pts</th>
                            <th className="px-2 py-3 text-center">J</th>
                            <th className="px-2 py-3 text-center">V</th>
                            <th className="px-2 py-3 text-center">N</th>
                            <th className="px-2 py-3 text-center">D</th>
                            <th className="px-2 py-3 text-center">BM</th>
                            <th className="px-2 py-3 text-center">BC</th>
                            <th className="px-3 py-3 text-center">+/-</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentData.groups[grp].map((row: StandingsRow, idx: number) => {
                            const isToro = row.name.toLowerCase().includes('toro')
                            return (
                              <tr
                                key={idx}
                                className={`border-t border-[#f0f4f9] transition-colors hover:bg-[#f7f9fc] ${isToro ? 'bg-[#eff4ff]' : ''}`}
                              >
                                {/* Rang */}
                                <td className="px-4 py-3.5 text-center">
                                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-black ${
                                    idx === 0 ? 'bg-[#f5b041] text-white' :
                                    idx === 1 ? 'bg-[#a8b2c1] text-white' :
                                    idx === 2 ? 'bg-[#cd7f32] text-white' :
                                    'bg-[#f0f4f9] text-[#6a7f9f]'
                                  }`}>
                                    {idx + 1}
                                  </span>
                                </td>
                                {/* Équipe */}
                                <td className="px-4 py-3.5">
                                  <div className="flex items-center gap-3">
                                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-white shadow-sm p-0.5">
                                      <Image
                                        src={getLogo(row.name)}
                                        alt={row.name}
                                        fill
                                        sizes="32px"
                                        className="object-contain p-0.5"
                                      />
                                    </div>
                                    <div>
                                      <p className={`text-[13px] font-black ${isToro ? 'text-[#1a4ea3]' : 'text-[#0a1d3a]'}`}>{row.name}</p>
                                      {isToro && <p className="text-[10px] font-bold text-[#ef233c]">HOME</p>}
                                    </div>
                                  </div>
                                </td>
                                {/* Stats */}
                                <td className="px-3 py-3.5 text-center">
                                  <span className="inline-flex h-8 min-w-[32px] items-center justify-center rounded-lg bg-[#0a1d3a] px-2 text-sm font-black text-white">
                                    {row.pts}
                                  </span>
                                </td>
                                <td className="px-2 py-3.5 text-center text-[13px] text-[#445b7f]">{row.m}</td>
                                <td className="px-2 py-3.5 text-center text-[13px] font-bold text-[#22c55e]">{row.v}</td>
                                <td className="px-2 py-3.5 text-center text-[13px] text-[#445b7f]">{row.n}</td>
                                <td className="px-2 py-3.5 text-center text-[13px] font-bold text-[#ef233c]">{row.d}</td>
                                <td className="px-2 py-3.5 text-center text-[13px] text-[#445b7f]">{row.bm}</td>
                                <td className="px-2 py-3.5 text-center text-[13px] text-[#445b7f]">{row.bc}</td>
                                <td className={`px-3 py-3.5 text-center text-[13px] font-black ${row.df > 0 ? 'text-[#22c55e]' : row.df < 0 ? 'text-[#ef233c]' : 'text-[#6a7f9f]'}`}>
                                  {row.df > 0 ? '+' + row.df : row.df}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── COLONNE DROITE : BUTEURS + QUALIFIÉES */}
              <div className="space-y-6">

                {/* ── CLASSEMENT BUTEURS PREMIUM */}
                <div className="overflow-hidden rounded-[20px] bg-[#0a1d3a] shadow-[0_8px_40px_rgba(10,29,58,0.25)]">
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ef233c]">
                        <RiFireLine className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Catégorie {activeCategory}</p>
                        <h3 className="text-base font-black uppercase text-white">Top Buteurs</h3>
                      </div>
                    </div>
                    <RiFootballLine className="h-6 w-6 text-white/20" />
                  </div>

                  {/* Liste buteurs */}
                  <div className="divide-y divide-white/5 px-4 py-3">
                    {currentData.scorers.map((scorer: Scorer, idx: number) => {
                      const rank = rankLabel(idx)
                      const isFirst = idx === 0
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          className={`flex items-center gap-3 rounded-xl px-3 py-3.5 transition-colors ${isFirst ? 'bg-white/5' : 'hover:bg-white/5'}`}
                        >
                          {/* Rang médaille */}
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                            idx === 0 ? 'bg-[#f5b041] text-[#0a1d3a]' :
                            idx === 1 ? 'bg-[#8a909a] text-white' :
                            idx === 2 ? 'bg-[#a0654a] text-white' :
                            'bg-white/10 text-white/50'
                          }`}>
                            {idx + 1}
                          </div>

                          {/* Icône personne */}
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                            <RiUser3Line className="h-4 w-4 text-white/60" />
                          </div>

                          {/* Infos joueur */}
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-[12px] font-black uppercase text-white">{scorer.name}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <div className="relative h-4 w-4 shrink-0 overflow-hidden rounded-full bg-white p-0.5">
                                <Image
                                  src={getLogo(scorer.team)}
                                  alt={scorer.team}
                                  fill sizes="16px"
                                  className="object-contain"
                                />
                              </div>
                              <span className="truncate text-[10px] font-bold text-white/40 uppercase">{scorer.team}</span>
                            </div>
                          </div>

                          {/* Buts */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <RiFootballLine className="h-4 w-4 text-[#22c55e]" />
                            <span className={`text-xl font-black tabular-nums ${
                              idx === 0 ? 'text-[#f5b041]' : 'text-white'
                            }`}>
                              {scorer.goals}
                            </span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>


                    </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}