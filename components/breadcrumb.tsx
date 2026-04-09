'use client'

import { RiArrowLeftLine } from '@remixicon/react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface BreadcrumbProps {
  label: string
  href: string
}

export function Breadcrumb({ label, href }: BreadcrumbProps) {
  return (
    <div className="absolute top-[116px] left-0 right-0 z-[150] lg:top-[78px]">
      <div className="mx-auto max-w-[1100px] px-6 py-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href={href}
            className="group inline-flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-[#ef233c] md:text-xs"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all group-hover:border-[#ef233c] group-hover:bg-[#ef233c] group-hover:text-white sm:h-8 sm:w-8">
              <RiArrowLeftLine className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span>RETOUR AUX {label}</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
