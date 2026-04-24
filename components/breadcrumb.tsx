'use client'

import { RiArrowLeftLine } from '@remixicon/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Fragment } from 'react'

export interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const backHref = items.length > 1 ? items[items.length - 2].href : (items[0]?.href || '/');

  return (
    <div className="absolute top-[124px] left-0 right-0 z-[150] lg:top-[78px]">
      <div className="mx-auto max-w-[1100px] px-6 py-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 md:text-xs"
        >
          <Link
            href={backHref}
            className="group flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all hover:border-[#ef233c] hover:bg-[#ef233c] hover:text-white sm:h-8 sm:w-8"
          >
            <RiArrowLeftLine className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
          
          <div className="flex flex-wrap items-center gap-1.5">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <Fragment key={item.label}>
                  {isLast ? (
                    <span className="text-white">{item.label}</span>
                  ) : (
                    <>
                      <Link href={item.href} className="transition-colors hover:text-[#ef233c]">
                        {item.label}
                      </Link>
                      <span className="text-white/40">/</span>
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
