'use client'

import { useEffect, useState } from 'react'
import { EliteRosterSection } from '@/components/elite-roster-section'

type EliteRosterCard = {
  name: string
  firstname: string
  lastname: string
  position: string
  club: string
  weight: string
  height: string
  photo_url: string
  video_url: string | null
  number: number
  tone: 'blue' | 'red'
}

type EliteRosterApiSectionProps = {
  initialEliteRoster?: EliteRosterCard[]
}

export function EliteRosterApiSection({
  initialEliteRoster = [],
}: EliteRosterApiSectionProps) {
  const [eliteRoster, setEliteRoster] = useState<EliteRosterCard[]>(initialEliteRoster)
  const [isLoading, setIsLoading] = useState(initialEliteRoster.length === 0)

  useEffect(() => {
    if (initialEliteRoster.length > 0) {
      return
    }

    const controller = new AbortController()
    let isMounted = true

    const loadEliteRoster = async () => {
      try {
        const response = await fetch('/api/elite', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Elite API error: ${response.status}`)
        }

        const payload = (await response.json()) as { eliteRoster?: EliteRosterCard[] }
        if (isMounted) {
          setEliteRoster(Array.isArray(payload.eliteRoster) ? payload.eliteRoster : [])
        }
      } catch (error) {
        if (isMounted && (error as Error).name !== 'AbortError') {
          console.error('[ELITE] Impossible de recuperer le roster via l API.', error)
          setEliteRoster([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadEliteRoster()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [initialEliteRoster.length])

  return <EliteRosterSection eliteRoster={eliteRoster} isLoading={isLoading} />
}
