import 'server-only'

import { pool } from '@/lib/db'
import { resolveCmsImage } from '@/lib/utils'

export type StaffMember = {
  id?: string
  name: string
  role: string
  photo_url: string
}

const optimizedStaffPhotoMap: Record<string, string> = {
  'patrick bonnefil': '/staff-photos/mr.-bonnefil.jpg',
  'mr bonnefil': '/staff-photos/mr.-bonnefil.jpg',
  'mme jessica': '/staff-photos/mme-jessica.jpg',
  jessica: '/staff-photos/mme-jessica.jpg',
  'antoinette anilus': '/staff-photos/antoinette-anilus.jpg',
  'atoinette anilus': '/staff-photos/antoinette-anilus.jpg',
  'fevilien james': '/staff-photos/fevilien-james.jpg',
  'louis nico': '/staff-photos/louis-nico.jpg',
  nico: '/staff-photos/louis-nico.jpg',
  'lucner jean': '/staff-photos/lucner-jean.jpg',
  'neil moise': '/staff-photos/neil-moise.jpg',
  neil: '/staff-photos/neil-moise.jpg',
  'samuel bellevue': '/staff-photos/samuel-bellevue.jpg',
  'valdony point du jour': '/staff-photos/valdony-point-du-jour.jpg',
  'pierre richard': '/staff-photos/c-pierre-richard.jpg',
  sherlo: '/staff-photos/c-sherlo.jpg',
  wildor: '/staff-photos/c-wildor.jpg',
  brunel: '/staff-photos/m-brunel.jpg',
  erns: '/staff-photos/m-erns.jpg',
  'sammuel saint claire': '/staff-photos/sammuel-saint-claire.jpg',
  sheelove: '/staff-photos/sheelove-2.jpg',
}

const staticStaff: StaffMember[] = [
  { name: 'Patrick Bonnefil', role: 'Staff', photo_url: '/staff-photos/mr.-bonnefil.jpg' },
  { name: 'Mme Jessica', role: 'Staff', photo_url: '/staff-photos/mme-jessica.jpg' },
  { name: 'Antoinette Anilus', role: 'Staff', photo_url: '/staff-photos/antoinette-anilus.jpg' },
  { name: 'Fevilien James', role: 'Staff', photo_url: '/staff-photos/fevilien-james.jpg' },
  { name: 'Louis Nico', role: 'Staff', photo_url: '/staff-photos/louis-nico.jpg' },
  { name: 'Lucner Jean', role: 'Staff', photo_url: '/staff-photos/lucner-jean.jpg' },
  { name: 'Neil Moise', role: 'Staff', photo_url: '/staff-photos/neil-moise.jpg' },
  { name: 'Samuel Bellevue', role: 'Staff', photo_url: '/staff-photos/samuel-bellevue.jpg' },
  { name: 'Valdony Point Du Jour', role: 'Staff', photo_url: '/staff-photos/valdony-point-du-jour.jpg' },
  { name: 'Pierre Richard', role: 'Staff', photo_url: '/staff-photos/c-pierre-richard.jpg' },
  { name: 'Sherlo', role: 'Staff', photo_url: '/staff-photos/c-sherlo.jpg' },
  { name: 'Wildor', role: 'Staff', photo_url: '/staff-photos/c-wildor.jpg' },
  { name: 'Brunel', role: 'Staff', photo_url: '/staff-photos/m-brunel.jpg' },
  { name: 'Erns', role: 'Staff', photo_url: '/staff-photos/m-erns.jpg' },
  { name: 'Sammuel Saint-Claire', role: 'Staff', photo_url: '/staff-photos/sammuel-saint-claire.jpg' },
  { name: 'Sheelove', role: 'Staff', photo_url: '/staff-photos/sheelove-2.jpg' },
]

type StaffRow = {
  id: string
  name: string | null
  role: string | null
  photo_url: string | null
}

function normalizeLookupValue(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\b(mme|mr|mrs|madame|monsieur)\b/g, ' ')
    .replace(/[^a-z]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

function extractPhotoStem(url?: string | null) {
  const segment = (url || '').split('?')[0].split('#')[0].split('/').pop() || ''
  let stem = segment

  while (/\.(jpg|jpeg|png|webp|gif)$/i.test(stem)) {
    stem = stem.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '')
  }

  return stem
}

function resolveStaffPhoto(name: string, photoUrl?: string | null) {
  const lookupCandidates = [
    normalizeLookupValue(name),
    normalizeLookupValue(extractPhotoStem(photoUrl)),
  ].filter(Boolean)

  const optimizedPhoto = lookupCandidates
    .map((candidate) => optimizedStaffPhotoMap[candidate])
    .find(Boolean)

  return optimizedPhoto || resolveCmsImage(photoUrl) || '/placeholder-user.jpg'
}

function getStaffDedupKeys(member: StaffMember) {
  return [
    normalizeLookupValue(member.name),
    normalizeLookupValue(extractPhotoStem(member.photo_url)),
  ].filter(Boolean)
}

function mergeStaffMembers(primary: StaffMember[], secondary: StaffMember[]) {
  const seen = new Set<string>()
  const merged: StaffMember[] = []

  const pushUnique = (member: StaffMember) => {
    const keys = getStaffDedupKeys(member)

    if (keys.some((key) => seen.has(key))) {
      return
    }

    keys.forEach((key) => seen.add(key))
    merged.push(member)
  }

  primary.forEach(pushUnique)
  secondary.forEach(pushUnique)

  return merged
}

export async function getStaffMembers(): Promise<StaffMember[]> {
  if (!process.env.DATABASE_URL) {
    return mergeStaffMembers(staticStaff, [])
  }

  try {
    const { rows } = await pool.query<StaffRow>(`
      select
        id,
        name,
        role,
        photo_url
      from club_staff
      order by name asc
    `)

    const dynamicStaff = rows
      .filter((member) => Boolean(member.name?.trim()))
      .map((member) => ({
        id: member.id,
        name: member.name?.trim() || 'Staff',
        role: member.role?.trim() || 'Staff',
        photo_url: resolveStaffPhoto(member.name?.trim() || 'Staff', member.photo_url),
      }))

    return mergeStaffMembers(dynamicStaff, staticStaff)
  } catch (error) {
    console.error('[STAFF] Impossible de recuperer le staff du club.', error)
    return mergeStaffMembers(staticStaff, [])
  }
}
