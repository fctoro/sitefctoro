'use client'

import { RiArrowLeftLine } from '@remixicon/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Fragment } from 'react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  theme?: 'light' | 'dark'
}

export function Breadcrumb({ items, theme = 'dark' }: BreadcrumbProps) {

  return (
    <div className="absolute top-[124px] left-0 right-0 z-[150] lg:top-[78px]">
      <div className="mx-auto max-w-[1100px] px-6 py-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className={`flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] md:text-xs ${
            theme === 'light' ? 'text-[#0a1d3a]/60' : 'text-white/60'
          }`}
        >
          <div className="flex flex-wrap items-center gap-1.5">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <Fragment key={item.label}>
                  {isLast ? (
                    <span className={theme === 'light' ? 'text-[#0a1d3a]' : 'text-white'}>{item.label}</span>
                  ) : (
                    <>
                      {item.href ? (
                        <Link href={item.href} className="transition-colors hover:text-[#ef233c]">
                          {item.label}
                        </Link>
                      ) : (
                        <span className={theme === 'light' ? 'text-[#0a1d3a]' : 'text-white'}>
                          {item.label}
                        </span>
                      )}
                      <span className={theme === 'light' ? 'text-[#0a1d3a]/40' : 'text-white/40'}>/</span>
                    </>
                  )}
                </Fragment>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
