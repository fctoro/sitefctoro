import 'server-only'

import { pool } from '@/lib/db'
import { resolveCmsImage } from '@/lib/utils'

export type StaffMember = {
  id?: string
  name: string
  role: string
  photo_url: string
}

const staticStaff: StaffMember[] = [
  { name: 'Patrick Bonnefil', role: 'Staff', photo_url: '/stafftoro/Mr. Bonnefil.jpg.jpeg' },
  { name: 'Mme Jessica', role: 'Staff', photo_url: '/stafftoro/Mme-Jessica.jpg.jpeg' },
  { name: 'Antoinette Anilus', role: 'Staff', photo_url: '/stafftoro/Antoinette Anilus.jpg.jpeg' },
  { name: 'Fevilien James', role: 'Staff', photo_url: '/stafftoro/Fevilien James.jpg.jpeg' },
  { name: 'Louis Nico', role: 'Staff', photo_url: '/stafftoro/Louis Nico.jpg.jpeg' },
  { name: 'Lucner Jean', role: 'Staff', photo_url: '/stafftoro/Lucner Jean.jpg.jpeg' },
  { name: 'Neil Moise', role: 'Staff', photo_url: '/stafftoro/Neil Moise.jpg.jpeg' },
  { name: 'Samuel Bellevue', role: 'Staff', photo_url: '/stafftoro/Samuel Bellevue.jpg.jpeg' },
  { name: 'Valdony Point Du Jour', role: 'Staff', photo_url: '/stafftoro/Valdony Point Du Jour.jpg.jpeg' },
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

function normalizeName(value: string) {
  return value.trim().toLowerCase()
}

export async function getStaffMembers(): Promise<StaffMember[]> {
  if (!process.env.DATABASE_URL) {
    return staticStaff
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
        photo_url: resolveCmsImage(member.photo_url) || '/placeholder-user.jpg',
      }))

    const dynamicNames = new Set(dynamicStaff.map((member) => normalizeName(member.name)))
    const missingStaticStaff = staticStaff.filter((member) => !dynamicNames.has(normalizeName(member.name)))

    return [...dynamicStaff, ...missingStaticStaff]
  } catch (error) {
    console.error('[STAFF] Impossible de recuperer le staff du club.', error)
    return staticStaff
  }
}
