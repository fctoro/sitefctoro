'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { INTRO_SESSION_KEY } from '@/lib/site-session'

export function SiteRuntimeManager() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) return

    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  useEffect(() => {
    if (pathname !== '/') {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, 'true')
    }

    const hash = window.location.hash

    if (hash) {
      const targetId = decodeURIComponent(hash.slice(1))
      const target = document.getElementById(targetId)

      if (target) {
        const topOffset = window.innerWidth >= 1024 ? 88 : 126

        window.requestAnimationFrame(() => {
          const top = window.scrollY + target.getBoundingClientRect().top - topOffset
          window.scrollTo({ top: Math.max(top, 0), behavior: 'auto' })
        })

        return
      }
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    })
  }, [pathname, searchParams])

  return null
}
