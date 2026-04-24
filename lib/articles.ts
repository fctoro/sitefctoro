import 'server-only'

import type { NewsCard } from '@/lib/joueur'
import { pool } from '@/lib/db'
import { resolveCmsImage } from '@/lib/utils'

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
    category: row.category || 'Actualite',
    dateLabel: row.published_at ? new Date(row.published_at).toLocaleDateString('fr-FR') : '',
    intro: row.excerpt_fr || row.content_fr || '',
    content: row.content_fr ? [row.content_fr] : row.excerpt_fr ? [row.excerpt_fr] : [],
    keyPoints: [],
  }
}

export async function getPublishedCmsArticles(): Promise<NewsCard[]> {
  if (!process.env.DATABASE_URL) {
    return []
  }

  try {
    const { rows } = await pool.query<ArticleRow>(
      `${ARTICLE_SELECT}
       where status = $1
       order by published_at desc nulls last`,
      ['published'],
    )

    return rows
      .map(mapArticleRow)
      .filter((article): article is NewsCard => article !== null)
  } catch (error) {
    console.error('[ARTICLES] Impossible de recuperer les articles publies.', error)
    return []
  }
}

export async function getPublishedCmsArticleBySlug(slug: string): Promise<NewsCard | null> {
  if (!process.env.DATABASE_URL) {
    return null
  }

  try {
    const { rows } = await pool.query<ArticleRow>(
      `${ARTICLE_SELECT}
       where slug = $1 and status = $2
       limit 1`,
      [slug, 'published'],
    )

    return rows.length > 0 ? mapArticleRow(rows[0]) : null
  } catch (error) {
    console.error(`[ARTICLES] Impossible de recuperer l'article "${slug}".`, error)
    return null
  }
}
