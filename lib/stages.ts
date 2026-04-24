import { pool } from './db'

export type StageBlock = {
  title: string
  items: string[]
}

export type StageOpening = {
  id: string
  slug: string
  title: string
  category: string
  type: string
  location: string
  ageGroup: string
  languages: string[]
  publishedBy: string
  publishedAt: string
  supervisor: string
  startDate: string
  contractType: string
  image: string
  summary: string
  intro: string[]
  mission: string[]
  responsibilities: StageBlock[]
  requirements: StageBlock[]
}

function mapRowToStageOpening(row: any): StageOpening {
  return {
    id: row.id || '',
    slug: row.slug || '',
    title: row.title || '',
    category: row.category || '',
    type: row.stage_type || 'Stage',
    location: row.location || '',
    ageGroup: row.main_group || '',
    languages: typeof row.languages === 'string' 
      ? row.languages.split(',').map((l: string) => l.trim()).filter(Boolean) 
      : [],
    publishedBy: row.department || '',
    publishedAt: row.published_at 
      ? new Date(row.published_at).toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' }) 
      : '',
    supervisor: row.supervisor || '',
    startDate: row.start_date instanceof Date 
      ? row.start_date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) 
      : (row.start_date || ''),
    contractType: row.duration || '',
    image: row.cover_image || '/images/grid-image/image-01.png',
    summary: row.excerpt || '',
    intro: (row.about_club || '').split('\n').map((s: string) => s.trim()).filter(Boolean),
    mission: (row.about_mission || '').split('\n').map((s: string) => s.trim()).filter(Boolean),
    responsibilities: [
      {
        title: 'Responsabilites principales',
        items: (row.responsibilities || '').split('\n').map((s: string) => s.trim()).filter(Boolean)
      },
      {
        title: 'Vie de club',
        items: (row.club_life || '').split('\n').map((s: string) => s.trim()).filter(Boolean)
      }
    ].filter(g => g.items.length > 0),
    requirements: [
      {
        title: 'Profil recherche',
        items: (row.profile_searched || '').split('\n').map((s: string) => s.trim()).filter(Boolean)
      }
    ].filter(g => g.items.length > 0)
  };
}

export async function getStageOpenings(): Promise<StageOpening[]> {
  try {
    const { rows } = await pool.query("SELECT * FROM stages WHERE status = 'published' ORDER BY created_at DESC");
    return rows.map(mapRowToStageOpening);
  } catch (err) {
    console.error("Error fetching stages:", err);
    return [];
  }
}

export async function getStageBySlug(slug: string): Promise<StageOpening | undefined> {
  try {
    const { rows } = await pool.query("SELECT * FROM stages WHERE slug = $1 AND status = 'published' LIMIT 1", [slug]);
    if (rows.length === 0) return undefined;
    return mapRowToStageOpening(rows[0]);
  } catch (err) {
    console.error("Error fetching stage by slug:", err);
    return undefined;
  }
}
