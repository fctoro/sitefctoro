const fs = require('fs');
let content = fs.readFileSync('components/flag-day-page-content.tsx', 'utf8');

// Bracket components to append
const bracketCode = `
// ─────────────────────────────────────────────────────────────────────────────
// BRACKET COMPONENT - Route to the Final
// ─────────────────────────────────────────────────────────────────────────────
function BracketTeam({ name, score, isWinner, isPending }) {
  return (
    <div className={\`flex items-center gap-2 rounded-xl px-3 py-2.5 transition-all \${
      isPending
        ? 'bg-[#f0f4f9] border border-dashed border-[#c5d0e0]'
        : isWinner
        ? 'bg-[#0a1d3a] border border-[#1a4ea3] shadow-[0_2px_12px_rgba(26,78,163,0.2)]'
        : 'bg-[#f7f9fc] border border-[#d7dfec]'
    }\`}>
      <div className={\`relative h-8 w-8 shrink-0 rounded-full bg-white p-0.5 shadow-sm ring-1 \${isWinner ? 'ring-[#f0b429]' : 'ring-[#d7dfec]'}\`}>
        <img src={getLogo(name)} alt={name} className="h-full w-full rounded-full object-contain" />
      </div>
      <span className={\`flex-1 text-[10px] font-black uppercase leading-tight \${
        isPending ? 'text-[#8a9ab5]' : isWinner ? 'text-white' : 'text-[#0a1d3a]'
      }\`}>{name}</span>
      {score !== null && (
        <span className={\`text-sm font-black tabular-nums \${isWinner ? 'text-[#f0b429]' : 'text-[#8a9ab5]'}\`}>{score}</span>
      )}
    </div>
  )
}

function BracketMatchCard({ match, label, isChampionship }) {
  const homeWin = match.scoreHome !== null && match.scoreAway !== null && match.scoreHome > match.scoreAway
  const awayWin = match.scoreHome !== null && match.scoreAway !== null && match.scoreAway > match.scoreHome
  const isPending = match.scoreHome === null
  return (
    <div className={\`rounded-2xl \${isChampionship ? 'ring-2 ring-[#f0b429] shadow-[0_4px_24px_rgba(240,180,41,0.12)] p-1' : ''}\`}>
      <div className={\`mb-1.5 \${isChampionship ? 'text-center' : ''}\`}>
        <span className={\`text-[8px] font-black uppercase tracking-[0.2em] \${isChampionship ? 'text-[#f0b429]' : 'text-[#8a9ab5]'}\`}>{label}</span>
      </div>
      <div className="space-y-1.5">
        <BracketTeam name={match.home} score={match.scoreHome} isWinner={homeWin} isPending={isPending} />
        <div className="flex items-center gap-2 px-2">
          <div className="h-px flex-1 bg-[#e0e8f5]" />
          <span className="text-[8px] font-black text-[#8a9ab5]">VS</span>
          <div className="h-px flex-1 bg-[#e0e8f5]" />
        </div>
        <BracketTeam name={match.away} score={match.scoreAway} isWinner={awayWin} isPending={isPending} />
      </div>
    </div>
  )
}

function BracketSection() {
  const categories = ['U9', 'U11', 'U13', 'U15', 'U17', 'U21']
  const [activeTab, setActiveTab] = useState('U9')
  const bracket = flagDayBracket[activeTab]

  return (
    <section className="bg-[#f7f9fc] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1100px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0a1d3a] shadow-lg">
              <RiTrophyLine className="h-7 w-7 text-[#f0b429]" />
            </div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">Flag Day Tournament</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-[0.9] tracking-tighter text-[#0a1d3a]">
            Route to <br /><span className="text-[#1a4ea3]">the Final.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm font-medium text-[#5b6f91]">
            Les phases finales de chaque categorie - demi-finales, finale et champion.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={\`rounded-full px-5 py-2 text-xs font-black uppercase tracking-wider transition-all duration-300 \${
                activeTab === cat
                  ? 'bg-[#0a1d3a] text-white shadow-[0_4px_14px_rgba(10,29,58,0.25)]'
                  : 'bg-white text-[#445b7f] border border-[#d7dfec] hover:border-[#0a1d3a] hover:text-[#0a1d3a]'
              }\`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-white border border-[#e0e8f5] shadow-sm p-6 sm:p-10"
          >
            <div className="flex flex-col items-stretch gap-8 lg:flex-row lg:items-center lg:gap-4">

              <div className="flex-1">
                <BracketMatchCard match={bracket.semiFinals[0]} label="Demi-finale 1" />
              </div>

              <div className="flex lg:w-8 items-center justify-center">
                <div className="hidden lg:block h-px w-full bg-[#d7dfec]" />
                <div className="lg:hidden h-8 w-px bg-[#d7dfec] mx-auto" />
              </div>

              <div className="flex flex-col items-center gap-5 lg:w-[280px] lg:shrink-0">
                <BracketMatchCard match={bracket.final} label="Finale" isChampionship />
                <div className="w-full rounded-2xl bg-gradient-to-br from-[#0a1d3a] to-[#1a4ea3] p-4 text-center shadow-[0_4px_24px_rgba(10,29,58,0.2)]">
                  <RiTrophyLine className="mx-auto mb-2 h-7 w-7 text-[#f0b429]" />
                  <p className="text-[8px] font-black uppercase tracking-[0.25em] text-white/50">Champion {activeTab}</p>
                  {bracket.champion ? (
                    <div className="mt-2.5 flex flex-col items-center gap-2">
                      <div className="relative h-12 w-12 rounded-full bg-white p-1 ring-2 ring-[#f0b429] shadow-md">
                        <img src={getLogo(bracket.champion)} alt={bracket.champion} className="h-full w-full rounded-full object-contain" />
                      </div>
                      <p className="text-sm font-black uppercase text-white">{bracket.champion}</p>
                    </div>
                  ) : (
                    <p className="mt-2 text-xs font-bold text-white/40">En cours...</p>
                  )}
                </div>
              </div>

              <div className="flex lg:w-8 items-center justify-center">
                <div className="hidden lg:block h-px w-full bg-[#d7dfec]" />
                <div className="lg:hidden h-8 w-px bg-[#d7dfec] mx-auto" />
              </div>

              <div className="flex-1">
                <BracketMatchCard match={bracket.semiFinals[1]} label="Demi-finale 2" />
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
`;

// Check if already added
if (content.includes('BracketSection')) {
  // Already added the call in the JSX, now just check if component is defined
  if (!content.includes('function BracketSection')) {
    // Add component code at end
    fs.writeFileSync('components/flag-day-page-content.tsx', content + bracketCode, 'utf8');
    console.log('BracketSection components added successfully.');
  } else {
    console.log('BracketSection already defined, skipping.');
  }
} else {
  console.log('BracketSection call not found in JSX.');
}
