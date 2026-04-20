'use client'

import Link from 'next/link'
import { IS_LIVE_ACTIVE } from '@/data/events-data'

export function LiveButton() {
  const isActive = IS_LIVE_ACTIVE

  return (
    <Link
      href="/evenements/live"
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:scale-[1.02] active:scale-[0.98] ${
        isActive
          ? 'bg-[#ef233c] shadow-[0_10px_20px_rgba(239,35,60,0.32)] hover:bg-[#d71931]'
          : 'bg-[#27272a]/60 border border-white/10 hover:bg-[#27272a]/80 text-white/50'
      }`}
    >
      <span className="relative flex h-2 w-2">
        {/* L'animation de cercle qui pulse (seulement si Live est actif) */}
        {isActive && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80 opacity-75" />
        )}
        {/* Le point central fixe */}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            isActive ? 'bg-white' : 'bg-white/20'
          }`}
        />
      </span>
      Live
    </Link>
  )
}
