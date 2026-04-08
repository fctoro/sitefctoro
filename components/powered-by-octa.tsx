'use client'

import Image from 'next/image'

export function PoweredByOcta() {
  return (
    <a
      href="https://octacore-ht.netlify.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center gap-0 rounded-full border border-white/10 bg-white/5 p-[5px_12px_5px_10px] transition-all duration-500 hover:border-[#ef233c]/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(239,35,60,0.15)]"
    >
      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 transition-colors duration-400 group-hover:text-white/70">
        POWERED BY
      </span>
      
      {/* Container for logo and wordmark with reveal effect */}
      <div className="flex items-center overflow-hidden">
        <div className="relative z-10 flex h-6 w-9 items-center justify-center transition-transform duration-500 ease-out group-hover:-translate-x-0.5">
          <Image
            src="/octacore/Logomark.png"
            alt="Octacore logo"
            width={18}
            height={18}
            className="h-4 w-auto transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-rotate-[360deg]"
          />
        </div>

        <div className="max-w-0 opacity-0 transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:max-w-[120px] group-hover:opacity-100 group-hover:ml-1">
          <div className="flex items-center gap-2 pr-1">
            <div className="h-3 w-px bg-white/20" />
            <Image
              src="/octacore/Wordmark-White.png"
              alt="Octacore"
              width={75}
              height={14}
              className="h-[11px] w-auto brightness-0 invert"
            />
          </div>
        </div>
      </div>
    </a>
  )
}

