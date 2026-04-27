'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics-client'

export function ArticleTracker({ title, slug }: { title: string; slug: string }) {
  useEffect(() => {
    trackEvent('view_article_detail', 'view', { title, slug })
  }, [title, slug])

  return null
}
