import 'server-only'

import type { NewsCard } from '@/lib/joueur'
import { resolveCmsImage } from '@/lib/utils'
import { supabaseAdmin } from '@/lib/supabase'

type ArticleRow = {
  slug: string | null
  title_fr: string | null
  excerpt_fr: string | null
  content_fr: string | null
  category: string | null
  published_at: string | Date | null
  cover_image: string | null
}

const ARTICLE_SELECT = `
  select
    slug,
    title_fr,
    excerpt_fr,
    content_fr,
    category,
    published_at,
    cover_image
  from articles
`

function mapArticleRow(row: ArticleRow): NewsCard | null {
  if (!row.slug || !row.title_fr) {
    return null
  }

  return {
    title: row.title_fr,
    slug: row.slug,
    excerpt: row.excerpt_fr || '',
    image: resolveCmsImage(row.cover_image),
    category: row.category || 'Actualité',
    dateLabel: row.published_at ? new Date(row.published_at).toLocaleDateString('fr-FR') : '',
    intro: row.excerpt_fr || row.content_fr || '',
    content: row.content_fr ? [row.content_fr] : row.excerpt_fr ? [row.excerpt_fr] : [],
    keyPoints: [],
  }
}

export async function getPublishedCmsArticles(): Promise<NewsCard[]> {
  if (process.env.NODE_ENV !== 'production') {
    return []
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('slug,title_fr,excerpt_fr,content_fr,category,published_at,cover_image')
      .eq('status', 'published')
      .order('published_at', { ascending: false, nullsFirst: false })

    if (error) {
      throw error
    }

    return (data ?? [])
      .map(mapArticleRow)
      .filter((article): article is NewsCard => article !== null)
  } catch (error) {
    console.error('[ARTICLES] Impossible de recuperer les articles publies.', error)
    return []
  }
}

export async function getPublishedCmsArticleBySlug(slug: string): Promise<NewsCard | null> {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('slug,title_fr,excerpt_fr,content_fr,category,published_at,cover_image')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()

    if (error) {
      throw error
    }

    return data ? mapArticleRow(data) : null
  } catch (error) {
    console.error(`[ARTICLES] Impossible de recuperer l'article "${slug}".`, error)
    return null
  }
}
