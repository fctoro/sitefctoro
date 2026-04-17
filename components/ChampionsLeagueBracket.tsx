'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { getLogo, BracketData } from '@/data/flag-day-stats'

const categories = ['U9', 'U11', 'U13', 'U15', 'U17', 'U21']

export default function ChampionsLeagueBracket({ cmsMatches }: { cmsMatches?: any[] }) {
  const [activeTab, setActiveTab] = useState('U9')
  
  // Extraire les matchs de phase finale du CMS pour la catégorie active
  const bracketMatches = cmsMatches?.filter(m => m.round.includes(activeTab) && (m.round.includes("Demi") || m.round.includes("Finale"))) || []
  
  const sf1 = bracketMatches.find(m => m.round.includes("Demi-finale 1"))
  const sf2 = bracketMatches.find(m => m.round.includes("Demi-finale 2"))
  const finalMatch = bracketMatches.find(m => m.round.includes("Finale") && !m.round.includes("Demi"))

  // Équipes des demi-finales CMS UNIQUEMENT
  const semi1Home = sf1?.home_team?.name || ''
  const semi1Away = sf1?.away_team?.name || ''
  const semi2Home = sf2?.home_team?.name || ''
  const semi2Away = sf2?.away_team?.name || ''

  // Résultats CMS pour les demi-finales
  const getWinner = (m: any) => {
    if (!m || m.status !== 'finished') return null;
    return m.home_score >= m.away_score ? m.home_team.name : m.away_team.name;
  }
  
  const cmsFinalHome = getWinner(sf1)
  const cmsFinalAway = getWinner(sf2)
  const cmsChampion = getWinner(finalMatch)

  // State for interactive bracket: user clicks to advance
  // map: [category] -> { finalHome, finalAway, champion }
  const [selections, setSelections] = useState<Record<string, { finalHome: string | null; finalAway: string | null; champion: string | null }>>({})

  const currentSelection = selections[activeTab] || {
    finalHome: null,
    finalAway: null,
    champion: null,
  }

  // Derived match info
  // If the data already has a final set, we can use it, but since we want interactive, we override 
  // with user selections. However, if user hasn't selected, maybe we fallback to the default bracket if it's already played?
  // The user prompt: "Cases des rounds suivants vides par défaut. Cliquer sur une équipe la désigne vainqueur".
  
  const finalHome = cmsFinalHome || currentSelection.finalHome || (finalMatch?.home_team?.name) || null
  const finalAway = cmsFinalAway || currentSelection.finalAway || (finalMatch?.away_team?.name) || null
  const champion = cmsChampion || currentSelection.champion || null
  
  const handleAdvanceToFinal = (team: string, slot: 'home' | 'away') => {
    setSelections(prev => {
      const current = prev[activeTab] || { finalHome: null, finalAway: null, champion: null }
      const isRemoving = slot === 'home' ? current.finalHome === team : current.finalAway === team;
      
      let nextState = { ...current }
      if (isRemoving) {
        if (slot === 'home') nextState.finalHome = null
        if (slot === 'away') nextState.finalAway = null
        // If we remove from final, they also get removed from champion
        if (nextState.champion === team) nextState.champion = null
      } else {
        if (slot === 'home') nextState.finalHome = team
        if (slot === 'away') nextState.finalAway = team
      }
      return { ...prev, [activeTab]: nextState }
    })
  }

  const handleAdvanceToChampion = (team: string) => {
    if (!team) return;
    setSelections(prev => {
      const current = prev[activeTab] || { finalHome: null, finalAway: null, champion: null }
      const isRemoving = current.champion === team;
      return {
        ...prev,
        [activeTab]: {
          ...current,
          champion: isRemoving ? null : team
        }
      }
    })
  }

  const resetCategory = () => {
    setSelections(prev => {
      const next = { ...prev }
      delete next[activeTab]
      return next
    })
  }

  // ---- Components ----
  const BracketTeamBox = ({ 
    team, 
    onClick, 
    isWinner,
    isSelectable,
    placeholder
  }: { 
    team: string | null; 
    onClick?: () => void; 
    isWinner: boolean;
    isSelectable?: boolean;
    placeholder?: string;
  }) => {
    const empty = !team;
    
    return (
      <div 
        onClick={isSelectable ? onClick : undefined}
        className={`relative flex items-center justify-between overflow-hidden rounded-md border p-2 transition-all duration-300
          ${isSelectable && team ? 'cursor-pointer hover:bg-[#1a2b5e] hover:border-[#4a72d9]' : ''}
          ${empty ? 'bg-[#0a0e2e]/50 border-[#1a2b5e] border-dashed' : isWinner ? 'bg-[#1a4ea3] border-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-[#0f1738] border-[#1a2b5e]'}
        `}
      >
        <div className="flex items-center gap-3">
          <div className={`h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-white/10 p-1
            ${empty ? 'opacity-20' : 'opacity-100 ring-1 ring-white/20'}
            ${isWinner ? 'ring-2 ring-[#f0b429]' : ''}`}>
             {team ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={getLogo(team)} alt={team} className="h-full w-full object-contain" />
              ) : (
                <div className="h-4 w-4 rounded-full bg-white/20" />
              )}
          </div>
          {team ? (
            <span className={`text-[11px] font-black uppercase tracking-wide text-white`}>{team}</span>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4a5f8a]">{placeholder || "..."}</span>
          )}
        </div>
        {/* Glow effect for winner inside the box */}
        {isWinner && (
           <motion.div layoutId={`winner-glow-${activeTab}-${team}`} className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
        )}
      </div>
    )
  }

  return (
    <section className="relative min-h-[600px] w-full bg-[#0a0e2e] pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden mt-12">
      {/* Background UEFA vibes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#131d4f] via-[#0a0e2e] to-[#040614]" />
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#1a4ea3]/20 to-transparent blur-3xl opacity-50" />
      
      <div className="relative mx-auto max-w-[1300px] z-10 mt-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="mb-6 mx-auto h-32 w-32 flex items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(26,78,163,0.3)] relative overflow-hidden p-4">
               <Image 
                  src="/flag-day/logo.png" 
                  alt="Flag Day Logo" 
                  fill 
                  className="object-contain p-2" 
               />
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              La Finale Approche
            </h2>
            <p className="mt-3 text-sm font-bold text-[#4a5f8a] uppercase tracking-[0.3em] text-center">
              En route pour la finale le 18 mai 2026 <br className="md:hidden" />(Parc Sainte-Thérèse)
            </p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-14 flex flex-wrap justify-center gap-3 relative z-20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative px-6 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-full overflow-hidden ${
                activeTab === cat
                  ? 'text-white'
                  : 'text-[#4a5f8a] hover:text-white'
              }`}
            >
              {activeTab === cat && (
                <motion.div 
                  layoutId="active-tab-uefa"
                  className="absolute inset-0 bg-gradient-to-r from-[#1a4ea3] to-[#2563eb] border border-[#3b82f6] shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                  style={{ borderRadius: 9999 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Reset Button */}
        <div className="flex justify-end mb-4">
           <button 
             onClick={resetCategory}
             className="text-[10px] uppercase tracking-wider font-bold text-[#4a5f8a] hover:text-white transition-colors border border-[#1a2b5e] hover:border-[#4a5f8a] rounded-md px-3 py-1.5 bg-[#0a0e2e]"
           >
             Reset {activeTab}
           </button>
        </div>

        {/* BRACKET LAYOUT */}
        <div className="relative mt-4">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               transition={{ duration: 0.4, ease: "easeOut" }}
               className="grid grid-cols-1 lg:grid-cols-[1fr_80px_1.5fr_80px_1fr] gap-6 lg:gap-0"
             >
                {/* ── LEFT COLUMN: SEMI-FINAL 1 ── */}
                <div className="flex flex-col justify-center space-y-4 relative z-10 lg:pr-4">
                   <div className="text-center md:text-left mb-2">
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4a72d9]">Semi Final 1</span>
                   </div>
                   <BracketTeamBox 
                     team={semi1Home} 
                     onClick={() => handleAdvanceToFinal(semi1Home, 'home')}
                     isWinner={finalHome === semi1Home}
                     isSelectable
                   />
                   <BracketTeamBox 
                     team={semi1Away} 
                     onClick={() => handleAdvanceToFinal(semi1Away, 'home')}
                     isWinner={finalHome === semi1Away}
                     isSelectable
                   />
                </div>

                {/* ── LEFT CONNECTORS (SVG) ── */}
                <div className="hidden lg:block relative z-0">
                  <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                    {/* Path from top card to center */}
                    <path d="M 0 35% L 40% 35% L 40% 50% L 100% 50%" fill="none" stroke="#1a2b5e" strokeWidth="2" />
                    {/* Path from bottom card to center */}
                    <path d="M 0 85% L 40% 85% L 40% 50% L 100% 50%" fill="none" stroke="#1a2b5e" strokeWidth="2" />
                    {/* Glow/active paths */}
                    {finalHome === semi1Home && (
                      <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} d="M 0 35% L 40% 35% L 40% 50% L 100% 50%" fill="none" stroke="#3b82f6" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    )}
                    {finalHome === semi1Away && (
                      <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} d="M 0 85% L 40% 85% L 40% 50% L 100% 50%" fill="none" stroke="#3b82f6" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    )}
                  </svg>
                </div>

                {/* ── CENTER COLUMN: FINAL & CHAMPION ── */}
                <div className="flex flex-col items-center justify-center space-y-6 lg:space-y-12 relative z-10 lg:px-4 mt-8 lg:mt-0">
                   {/* FINAL MATCH */}
                   <div className="w-full max-w-[320px] mx-auto">
                     <div className="text-center mb-2">
                       <span className="text-[12px] font-black uppercase tracking-[0.3em] text-[#f0b429] drop-shadow-[0_0_8px_rgba(240,180,41,0.5)]">Final - 18 Mai 2026</span>
                     </div>
                     <div className="space-y-1 bg-[#0a0e2e]/80 border border-[#1a2b5e] rounded-lg p-3 backdrop-blur-sm shadow-2xl">
                        <BracketTeamBox 
                          team={finalHome} 
                          onClick={() => handleAdvanceToChampion(finalHome!)}
                          isWinner={champion === finalHome && champion !== null}
                          isSelectable={finalHome !== null}
                          placeholder="Winner SF1"
                        />
                        <div className="flex items-center gap-2 py-1">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1a2b5e] to-transparent" />
                          <span className="text-[8px] font-bold text-[#4a5f8a]">VS</span>
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1a2b5e] to-transparent" />
                        </div>
                        <BracketTeamBox 
                          team={finalAway} 
                          onClick={() => handleAdvanceToChampion(finalAway!)}
                          isWinner={champion === finalAway && champion !== null}
                          isSelectable={finalAway !== null}
                          placeholder="Winner SF2"
                        />
                     </div>
                   </div>

                   {/* VERTICAL CONNECTOR & CHAMPION */}
                   {champion && (
                     <div className="flex flex-col items-center">
                        <div className="h-4 w-px bg-gradient-to-b from-[#3b82f6] to-transparent shadow-[0_0_10px_#3b82f6]" />
                        
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8, y: -20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          className="mt-2 w-[280px] rounded-2xl bg-gradient-to-b from-[#1a4ea3] to-[#0f1738] p-1 shadow-[0_0_40px_rgba(26,78,163,0.5)] relative group"
                        >
                          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay rounded-2xl" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                          
                          <div className="bg-[#0a0e2e]/80 rounded-[14px] p-6 text-center backdrop-blur-md relative z-10 border border-white/5">
                            <motion.div
                               initial={{ rotate: -15, scale: 0.5 }}
                               animate={{ rotate: 0, scale: 1 }}
                               transition={{ type: 'spring', damping: 10, delay: 0.2 }}
                            >
                               {/* Replace icon with literal SVG trophy for better colors */}
                               <svg viewBox="0 0 24 24" fill="currentColor" className="mx-auto mb-3 h-10 w-10 text-[#f0b429] drop-shadow-[0_0_15px_rgba(240,180,41,0.6)]">
                                  <path d="M12 2a1 1 0 0 1 1 1v1h4a2 2 0 0 1 2 2v2.793a6.002 6.002 0 0 1-5 5.917V18h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h3v-3.29A6.002 6.002 0 0 1 5 8.793V6a2 2 0 0 1 2-2h4V3a1 1 0 0 1 1-1zm5 4H7v2.793a4.001 4.001 0 0 0 3.86 3.996h2.28A4.001 4.001 0 0 0 17 8.793V6z"/>
                               </svg>
                            </motion.div>
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#f0b429]/80 drop-shadow-sm mb-3">
                              Champion {activeTab}
                            </p>
                            
                            <div className="relative mx-auto h-20 w-20 rounded-full border border-white/20 bg-white/5 p-2 shadow-inner">
                              <motion.div
                                layoutId={`champion-logo-${activeTab}`}
                                className="h-full w-full"
                              >
                                 <div className="h-full w-full rounded-full bg-white p-1">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={getLogo(champion)} alt={champion} className="h-full w-full object-contain rounded-full" />
                                 </div>
                              </motion.div>
                            </div>
                            <p className="mt-4 text-lg font-black uppercase tracking-wide text-white drop-shadow-md">
                              {champion}
                            </p>
                          </div>
                        </motion.div>
                     </div>
                   )}
                </div>

                {/* ── RIGHT CONNECTORS (SVG) ── */}
                <div className="hidden lg:block relative z-0">
                  <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                    {/* Path from center to top card */}
                    <path d="M 0 50% L 60% 50% L 60% 35% L 100% 35%" fill="none" stroke="#1a2b5e" strokeWidth="2" />
                    {/* Path from center to bottom card */}
                    <path d="M 0 50% L 60% 50% L 60% 85% L 100% 85%" fill="none" stroke="#1a2b5e" strokeWidth="2" />
                    {/* Glow/active paths */}
                    {finalAway === semi2Home && (
                      <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} d="M 0 50% L 60% 50% L 60% 35% L 100% 35%" fill="none" stroke="#3b82f6" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    )}
                    {finalAway === semi2Away && (
                      <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} d="M 0 50% L 60% 50% L 60% 85% L 100% 85%" fill="none" stroke="#3b82f6" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    )}
                  </svg>
                </div>

                {/* ── RIGHT COLUMN: SEMI-FINAL 2 ── */}
                <div className="flex flex-col justify-center space-y-4 relative z-10 lg:pl-4 mt-8 lg:mt-0">
                   <div className="text-center md:text-right mb-2">
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4a72d9]">Semi Final 2</span>
                   </div>
                   <BracketTeamBox 
                     team={semi2Home} 
                     onClick={() => handleAdvanceToFinal(semi2Home, 'away')}
                     isWinner={finalAway === semi2Home}
                     isSelectable
                   />
                   <BracketTeamBox 
                     team={semi2Away} 
                     onClick={() => handleAdvanceToFinal(semi2Away, 'away')}
                     isWinner={finalAway === semi2Away}
                     isSelectable
                   />
                </div>

             </motion.div>
           </AnimatePresence>
        </div>
      </div>
{/* Support pour animation Shimmer */}
<style dangerouslySetInnerHTML={{__html: `
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
`}} />
    </section>
  )
}
