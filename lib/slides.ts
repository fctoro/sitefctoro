import 'server-only'

import { heroSlides as fallbackSlides, type HeroSlide } from '@/lib/joueur'
import { pool } from '@/lib/db'
import { resolveCmsImage } from '@/lib/utils'

type HeroSlideRow = {
  badge: string | null
  title: string | null
  btn_label: string | null
  btn_url: string | null
  image_url: string | null
}

function normalizeSlideText(value?: string | null) {
  return value
    ?.trim()
    .replace(/\bElite\b/g, 'Élite')
    .replace(/\bELITE\b/g, 'ÉLITE')
    .replace(/\bDECOUVRIR\b/g, 'DÉCOUVRIR')
}

function normalizeSlideUrl(url: string | null | undefined, fallbackUrl: string) {
  const value = url?.trim()

  if (!value) {
    return fallbackUrl
  }

  if (value.startsWith('/')) {
    return value
  }

  try {
    const parsed = new URL(value)

    if (parsed.hostname === 'fctoro.com' || parsed.hostname === 'www.fctoro.com') {
      return `${parsed.pathname}${parsed.search}${parsed.hash}` || fallbackUrl
    }

    return value
  } catch {
    return fallbackUrl
  }
}

function mapHeroSlide(row: HeroSlideRow, index: number): HeroSlide | null {
  const fallback = fallbackSlides[index] || fallbackSlides[0]
  const title = row.title?.trim()

  if (!title) {
    return null
  }

  const image = resolveCmsImage(row.image_url?.trim()) || fallback.image

  return {
    label: normalizeSlideText(row.badge) || fallback.label,
    title: normalizeSlideText(title) || title,
    cta: normalizeSlideText(row.btn_label) || fallback.cta,
    href: normalizeSlideUrl(row.btn_url, fallback.href),
    image,
  }
}

export async function getActiveHeroSlides(): Promise<HeroSlide[]> {
  if (!process.env.DATABASE_URL) {
    return fallbackSlides
  }

  try {
    const { rows } = await pool.query<HeroSlideRow>(`
      select
        badge,
        title,
        btn_label,
        btn_url,
        image_url
      from hero_slides
      where coalesce(is_active, false) = true
      order by sort_order asc nulls last, created_at asc
    `)

    const slides = rows
      .map(mapHeroSlide)
      .filter((slide): slide is HeroSlide => slide !== null)

    return slides.length > 0 ? slides : fallbackSlides
  } catch (error) {
    console.error('[SLIDES] Impossible de recuperer les slides hero.', error)
    return fallbackSlides
  }
}
