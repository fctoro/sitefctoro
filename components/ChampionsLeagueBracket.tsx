'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { getLogo, BracketData } from '@/data/flag-day-stats'

const categories = ['U9', 'U11', 'U13', 'U15', 'U17', 'U21']

export default function ChampionsLeagueBracket({ cmsMatches }: { cmsMatches?: any[] }) {
  const [activeTab, setActiveTab] = useState('U9')
  
  // Extraire les matchs de phase finale du CMS pour la catégorie active
  // On cherche "Quart", "1/4", "Demi", "Finale"
  const bracketMatches = cmsMatches?.filter(m => 
    m.round.includes(activeTab) && 
    (m.round.toLowerCase().includes("quart") || 
     m.round.toLowerCase().includes("1/4") || 
     m.round.toLowerCase().includes("demi") || 
     m.round.toLowerCase().includes("finale"))
  ) || []
  
  // Quarts
  const qf1 = bracketMatches.find(m => m.round.includes("Quart 1") || m.round.includes("1/4-1"))
  const qf2 = bracketMatches.find(m => m.round.includes("Quart 2") || m.round.includes("1/4-2"))
  const qf3 = bracketMatches.find(m => m.round.includes("Quart 3") || m.round.includes("1/4-3"))
  const qf4 = bracketMatches.find(m => m.round.includes("Quart 4") || m.round.includes("1/4-4"))

  // Demis
  const sf1 = bracketMatches.find(m => m.round.includes("Demi-finale 1"))
  const sf2 = bracketMatches.find(m => m.round.includes("Demi-finale 2"))
  
  // Finale
  const finalMatch = bracketMatches.find(m => m.round.includes("Finale") && !m.round.toLowerCase().includes("demi") && !m.round.toLowerCase().includes("quart"))

  const getWinner = (m: any) => {
    if (!m || m.status !== 'finished') return null;
    return m.home_score >= m.away_score ? m.home_team.name : m.away_team.name;
  }

  // Gagnants CMS pour les Quarts (avancent en Demi)
  const cmsSf1Home = getWinner(qf1)
  const cmsSf1Away = getWinner(qf2)
  const cmsSf2Home = getWinner(qf3)
  const cmsSf2Away = getWinner(qf4)

  // Gagnants CMS pour les Demis (avancent en Finale)
  const cmsFinalHome = getWinner(sf1)
  const cmsFinalAway = getWinner(sf2)
  
  // Champion CMS
  const cmsChampion = getWinner(finalMatch)

  // State for interactive bracket
  const [selections, setSelections] = useState<Record<string, { 
    sf1Home: string | null; 
    sf1Away: string | null; 
    sf2Home: string | null; 
    sf2Away: string | null;
    finalHome: string | null; 
    finalAway: string | null; 
    champion: string | null 
  }>>({})

  const currentSelection = selections[activeTab] || {
    sf1Home: null,
    sf1Away: null,
    sf2Home: null,
    sf2Away: null,
    finalHome: null,
    finalAway: null,
    champion: null,
  }

  // Final teams taking into account CMS + Selections
  const sf1Home = cmsSf1Home || currentSelection.sf1Home || (sf1?.home_team?.name) || null
  const sf1Away = cmsSf1Away || currentSelection.sf1Away || (sf1?.away_team?.name) || null
  const sf2Home = cmsSf2Home || currentSelection.sf2Home || (sf2?.home_team?.name) || null
  const sf2Away = cmsSf2Away || currentSelection.sf2Away || (sf2?.away_team?.name) || null

  const finalHome = cmsFinalHome || currentSelection.finalHome || (finalMatch?.home_team?.name) || null
  const finalAway = cmsFinalAway || currentSelection.finalAway || (finalMatch?.away_team?.name) || null
  const champion = cmsChampion || currentSelection.champion || null

  const handleAdvanceToSemi = (team: string, matchIndex: 1 | 2 | 3 | 4) => {
    setSelections(prev => {
      const current = prev[activeTab] || { sf1Home: null, sf1Away: null, sf2Home: null, sf2Away: null, finalHome: null, finalAway: null, champion: null }
      let next = { ...current }
      
      const isRemoving = matchIndex === 1 ? current.sf1Home === team : 
                         matchIndex === 2 ? current.sf1Away === team :
                         matchIndex === 3 ? current.sf2Home === team :
                         current.sf2Away === team;

      if (isRemoving) {
        if (matchIndex === 1) next.sf1Home = null
        if (matchIndex === 2) next.sf1Away = null
        if (matchIndex === 3) next.sf2Home = null
        if (matchIndex === 4) next.sf2Away = null
        // cascade removals
        if (next.finalHome === team) next.finalHome = null
        if (next.finalAway === team) next.finalAway = null
        if (next.champion === team) next.champion = null
      } else {
        if (matchIndex === 1) next.sf1Home = team
        if (matchIndex === 2) next.sf1Away = team
        if (matchIndex === 3) next.sf2Home = team
        if (matchIndex === 4) next.sf2Away = team
      }
      return { ...prev, [activeTab]: next }
    })
  }

  const handleAdvanceToFinal = (team: string, slot: 'home' | 'away') => {
    setSelections(prev => {
      const current = prev[activeTab] || { sf1Home: null, sf1Away: null, sf2Home: null, sf2Away: null, finalHome: null, finalAway: null, champion: null }
      let next = { ...current }
      const isRemoving = slot === 'home' ? current.finalHome === team : current.finalAway === team;
      
      if (isRemoving) {
        if (slot === 'home') next.finalHome = null
        if (slot === 'away') next.finalAway = null
        if (next.champion === team) next.champion = null
      } else {
        if (slot === 'home') next.finalHome = team
        if (slot === 'away') next.finalAway = team
      }
      return { ...prev, [activeTab]: next }
    })
  }

  const handleAdvanceToChampion = (team: string) => {
    if (!team) return;
    setSelections(prev => {
      const current = prev[activeTab] || { sf1Home: null, sf1Away: null, sf2Home: null, sf2Away: null, finalHome: null, finalAway: null, champion: null }
      return {
        ...prev,
        [activeTab]: { ...current, champion: current.champion === team ? null : team }
      }
    })
  }

  const resetCategory = () => {
    setSelections(prev => {
      const next = { ...prev }; delete next[activeTab]; return next;
    })
  }

  // ---- Components ----
  const BracketTeamBox = ({ 
    team, onClick, isWinner, isSelectable, placeholder
  }: { 
    team: string | null; onClick?: () => void; isWinner: boolean; isSelectable?: boolean; placeholder?: string;
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
        {isWinner && (
           <motion.div layoutId={`winner-glow-${activeTab}-${team}`} className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
        )}
      </div>
    )
  }

  return (
    <section className="relative min-h-[600px] w-full bg-[#0a0e2e] pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden mt-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#131d4f] via-[#0a0e2e] to-[#040614]" />
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#1a4ea3]/20 to-transparent blur-3xl opacity-50" />
      
      <div className="relative mx-auto max-w-[1400px] z-10 mt-12">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center">
            <div className="mb-6 mx-auto h-32 w-32 flex items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(26,78,163,0.3)] relative overflow-hidden p-4">
               <Image src="/flag-day/logo.png" alt="Flag Day Logo" fill className="object-contain p-2" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Phase Finale
            </h2>
            <p className="mt-3 text-sm font-bold text-[#4a5f8a] uppercase tracking-[0.3em] text-center">
              En route pour la finale le 18 mai 2026 (Parc Sainte-Thérèse)
            </p>
          </motion.div>
        </div>

        <div className="mb-14 flex flex-wrap justify-center gap-3 relative z-20">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveTab(cat)} className={`relative px-6 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-full overflow-hidden ${activeTab === cat ? 'text-white' : 'text-[#4a5f8a] hover:text-white'}`}>
              {activeTab === cat && <motion.div layoutId="active-tab-uefa" className="absolute inset-0 bg-gradient-to-r from-[#1a4ea3] to-[#2563eb] border border-[#3b82f6] shadow-[0_0_20px_rgba(59,130,246,0.6)]" style={{ borderRadius: 9999 }} />}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-end mb-4">
           <button onClick={resetCategory} className="text-[10px] uppercase tracking-wider font-bold text-[#4a5f8a] hover:text-white transition-colors border border-[#1a2b5e] hover:border-[#4a5f8a] rounded-md px-3 py-1.5 bg-[#0a0e2e]">
             Reset {activeTab}
           </button>
        </div>

        <div className="relative mt-4">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               transition={{ duration: 0.4, ease: "easeOut" }}
               className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4 items-center"
             >
                {/* 1/4 FINALES GAUCHE */}
                <div className="space-y-12">
                   {/* QF 1 */}
                   <div className="space-y-2">
                     <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#4a72d9]/60 block text-center">1/4 Finale 1</span>
                     <BracketTeamBox team={qf1?.home_team?.name || ''} onClick={() => handleAdvanceToSemi(qf1?.home_team?.name, 1)} isWinner={sf1Home === qf1?.home_team?.name} isSelectable />
                     <BracketTeamBox team={qf1?.away_team?.name || ''} onClick={() => handleAdvanceToSemi(qf1?.away_team?.name, 1)} isWinner={sf1Home === qf1?.away_team?.name} isSelectable />
                   </div>
                   {/* QF 2 */}
                   <div className="space-y-2">
                     <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#4a72d9]/60 block text-center">1/4 Finale 2</span>
                     <BracketTeamBox team={qf2?.home_team?.name || ''} onClick={() => handleAdvanceToSemi(qf2?.home_team?.name, 2)} isWinner={sf1Away === qf2?.home_team?.name} isSelectable />
                     <BracketTeamBox team={qf2?.away_team?.name || ''} onClick={() => handleAdvanceToSemi(qf2?.away_team?.name, 2)} isWinner={sf1Away === qf2?.away_team?.name} isSelectable />
                   </div>
                </div>

                {/* 1/2 FINALE GAUCHE */}
                <div className="space-y-4">
                   <div className="text-center">
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4a72d9]">Demi Finale 1</span>
                   </div>
                   <BracketTeamBox team={sf1Home} onClick={() => handleAdvanceToFinal(sf1Home!, 'home')} isWinner={finalHome === sf1Home && sf1Home !== null} isSelectable={sf1Home !== null} placeholder="Winner 1/4-1" />
                   <BracketTeamBox team={sf1Away} onClick={() => handleAdvanceToFinal(sf1Away!, 'home')} isWinner={finalHome === sf1Away && sf1Away !== null} isSelectable={sf1Away !== null} placeholder="Winner 1/4-2" />
                </div>

                {/* FINALE */}
                <div className="flex flex-col items-center space-y-8">
                   <div className="w-full max-w-[320px] mx-auto bg-[#0a0e2e]/80 border border-[#1a2b5e] rounded-lg p-3 backdrop-blur-sm shadow-2xl">
                      <div className="text-center mb-4">
                        <span className="text-[12px] font-black uppercase tracking-[0.3em] text-[#f0b429] drop-shadow-[0_0_8px_rgba(240,180,41,0.5)]">Finale</span>
                      </div>
                      <BracketTeamBox team={finalHome} onClick={() => handleAdvanceToChampion(finalHome!)} isWinner={champion === finalHome && champion !== null} isSelectable={finalHome !== null} placeholder="Winner SF1" />
                      <div className="flex items-center gap-2 py-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1a2b5e] to-transparent" />
                        <span className="text-[10px] font-black text-[#4a5f8a]">VS</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1a2b5e] to-transparent" />
                      </div>
                      <BracketTeamBox team={finalAway} onClick={() => handleAdvanceToChampion(finalAway!)} isWinner={champion === finalAway && champion !== null} isSelectable={finalAway !== null} placeholder="Winner SF2" />
                   </div>
                   
                   {champion && (
                      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="w-[280px] bg-gradient-to-b from-[#1a4ea3] to-[#0f1738] p-4 rounded-2xl text-center shadow-[0_0_40px_rgba(26,78,163,0.5)] border border-white/10">
                         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f0b429] mb-4">Champion {activeTab}</p>
                         <div className="h-20 w-20 mx-auto bg-white rounded-full p-2 mb-4">
                            <img src={getLogo(champion)} alt={champion} className="h-full w-full object-contain" />
                         </div>
                         <p className="text-xl font-black uppercase text-white">{champion}</p>
                      </motion.div>
                   )}
                </div>

                {/* 1/2 FINALE DROITE */}
                <div className="space-y-4">
                   <div className="text-center">
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4a72d9]">Demi Finale 2</span>
                   </div>
                   <BracketTeamBox team={sf2Home} onClick={() => handleAdvanceToFinal(sf2Home!, 'away')} isWinner={finalAway === sf2Home && sf2Home !== null} isSelectable={sf2Home !== null} placeholder="Winner 1/4-3" />
                   <BracketTeamBox team={sf2Away} onClick={() => handleAdvanceToFinal(sf2Away!, 'away')} isWinner={finalAway === sf2Away && sf2Away !== null} isSelectable={sf2Away !== null} placeholder="Winner 1/4-4" />
                </div>

                {/* 1/4 FINALES DROITE */}
                <div className="space-y-12">
                   {/* QF 3 */}
                   <div className="space-y-2">
                     <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#4a72d9]/60 block text-center">1/4 Finale 3</span>
                     <BracketTeamBox team={qf3?.home_team?.name || ''} onClick={() => handleAdvanceToSemi(qf3?.home_team?.name, 3)} isWinner={sf2Home === qf3?.home_team?.name} isSelectable />
                     <BracketTeamBox team={qf3?.away_team?.name || ''} onClick={() => handleAdvanceToSemi(qf3?.away_team?.name, 3)} isWinner={sf2Home === qf3?.away_team?.name} isSelectable />
                   </div>
                   {/* QF 4 */}
                   <div className="space-y-2">
                     <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#4a72d9]/60 block text-center">1/4 Finale 4</span>
                     <BracketTeamBox team={qf4?.home_team?.name || ''} onClick={() => handleAdvanceToSemi(qf4?.home_team?.name, 4)} isWinner={sf2Away === qf4?.home_team?.name} isSelectable />
                     <BracketTeamBox team={qf4?.away_team?.name || ''} onClick={() => handleAdvanceToSemi(qf4?.away_team?.name, 4)} isWinner={sf2Away === qf4?.away_team?.name} isSelectable />
                   </div>
                </div>
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
