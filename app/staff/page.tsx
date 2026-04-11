import type { Metadata } from 'next'
import Image from 'next/image'
import { HomeNavbar } from '@/components/home-navbar'
import { Breadcrumb } from '@/components/breadcrumb'
import StaffPageContent from '@/components/staff-page-content'
import { supabase } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Staff | FC TORO',
  description: "L'organisation et l'équipe technique du FC TORO. Une équipe dévouée au développement des jeunes talents.",
}

const staticStaffMembers = [
  {
    name: 'Patrick Bonnefil',
    role: 'Administration',
    image: '/stafftoro/Mr. Bonnefil.jpg.jpeg',
  },
  {
    name: 'Samuel Bellevue',
    role: 'Staff Technique',
    image: '/stafftoro/Samuel Bellevue.jpg.jpeg',
  },
  {
    name: 'Antoinette Anilus',
    role: 'Administration',
    image: '/stafftoro/Antoinette Anilus.jpg.jpeg',
  },
  {
    name: 'Fevilien James',
    role: 'Staff Technique',
    image: '/stafftoro/Fevilien James.jpg.jpeg',
  },
  {
    name: 'Louis Nico',
    role: 'Staff Technique',
    image: '/stafftoro/Louis Nico.jpg.jpeg',
  },
  {
    name: 'Lucner Jean',
    role: 'Staff Technique',
    image: '/stafftoro/Lucner Jean.jpg.jpeg',
  },
  {
    name: 'Mme Jessica',
    role: 'Administration',
    image: '/stafftoro/Mme-Jessica.jpg.jpeg',
  },
  {
    name: 'Neil Moise',
    role: 'Staff Technique',
    image: '/stafftoro/Neil Moise.jpg.jpeg',
  },
  {
    name: 'Valdony Point Du Jour',
    role: 'Staff Technique',
    image: '/stafftoro/Valdony Point Du Jour.jpg.jpeg',
  },
]

// Composant Server Rendering pour la page Staff (pas de framer-motion ici directement)
export default async function StaffPage() {
  // Récupérer le staff dynamique depuis la base de données
  const { data: cmsStaff } = await supabase
    .from('club_staff')
    .select('*')
    .order('start_date', { ascending: true })

  // Reformater le staff dynamique pour qu'il corresponde au format statique
  const dynamicStaff = (cmsStaff || []).map((dbStaff) => ({
    name: dbStaff.name,
    role: dbStaff.role,
    photo_url: dbStaff.photo_url, 
    id: dbStaff.id,
  }))

  const allStaff = [...staticStaffMembers, ...dynamicStaff]

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="relative pt-[116px] lg:pt-[78px]">
        <Breadcrumb label="CLUB" href="/le-club" />
        {/* Header Section */}
        <section className="relative overflow-hidden bg-[#0a1d3a] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-40">
          <Image src="/staff-team.jpg" alt="Team FC TORO Saison" fill priority style={{ objectPosition: 'center -140px' }} className="object-cover opacity-40" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d3a] via-[#0a1d3a]/60 to-[#0a1d3a]/30" />
          <div className="relative z-10 mx-auto max-w-[1100px] text-center">
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">
                L'organisation
              </p>
              <h1 className="mt-4 text-4xl font-black uppercase tracking-tight md:text-6xl lg:text-7xl">
                Staff <span className="text-[#ef233c]">FC TORO.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-[700px] text-lg font-medium text-white/70">
                Une équipe dévouée au développement des jeunes talents et à l'excellence opérationnelle du club.
              </p>
            </div>
          </div>
        </section>

        {/* Staff Grid (Client Component avec Animations) */}
        <StaffPageContent staffMembers={allStaff} />

      </main>
    </div>
  )
}
