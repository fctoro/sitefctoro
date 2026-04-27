'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackEvent } from '@/lib/analytics-client'

/**
 * Composant qui suit automatiquement les changements de page.
 * À inclure dans le RootLayout.
 */
export function AnalyticsProvider() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Suit la vue de page à chaque changement de route
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    trackEvent(`page_view_${pathname.replace(/\//g, '_') || 'home'}`, 'view', {
      fullUrl: url,
    })
  }, [pathname, searchParams])

  return null
}
