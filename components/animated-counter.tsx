'use client'

import { useEffect, useRef } from 'react'
import { animate, useInView, useMotionValue, useTransform, motion } from 'framer-motion'

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  suffix?: string
  label: string
}

export function AnimatedCounter({ from = 0, to, duration = 4.0, suffix = '+', label }: AnimatedCounterProps) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration,
        ease: "easeOut",
      })
      return controls.stop
    }
  }, [isInView, to, count, duration])

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-1 sm:p-2 h-full">
      <div className="flex items-center text-white">
        <motion.span className="text-[1.1rem] sm:text-[1.3rem] font-black tracking-tighter leading-none">
          {rounded}
        </motion.span>
        <span className="text-[0.8rem] sm:text-[1rem] font-black text-[#ef233c] ml-0.5">{suffix}</span>
      </div>
      <p className="mt-1 text-[7px] sm:text-[9px] font-black uppercase tracking-[0.15em] text-white/50 whitespace-nowrap">
        {label}
      </p>
    </div>
  )
}
