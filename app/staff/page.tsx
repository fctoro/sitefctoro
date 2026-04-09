'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { HomeNavbar } from '@/components/home-navbar'
import { Breadcrumb } from '@/components/breadcrumb'

const staffMembers = [
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

export default function StaffPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="relative pt-[116px] lg:pt-[78px]">
        <Breadcrumb label="CLUB" href="/le-club" />
        {/* Header Section */}
        <section className="relative overflow-hidden bg-[#0a1d3a] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
          <div className="absolute inset-0 select-none opacity-[0.05]">
            <p className="whitespace-nowrap text-[25vw] font-black uppercase italic leading-none">
              STAFF
            </p>
          </div>
          <div className="relative z-10 mx-auto max-w-[1100px] text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">
                L'organisation
              </p>
              <h1 className="mt-4 text-4xl font-black uppercase tracking-tight md:text-6xl lg:text-7xl">
                Staff <span className="text-[#ef233c]">FC TORO.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-[700px] text-lg font-medium text-white/70">
                Une équipe dévouée au développement des jeunes talents et à l'excellence opérationnelle du club.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Staff Grid */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {staffMembers.map((member, index) => (
                <StaffMemberCard key={member.name} member={member} index={index} />
              ))}
            </div>
          </div>
        </section>


      </main>
    </div>
  )
}

function StaffMemberCard({ member, index }: { member: any; index: number }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="flex flex-col items-center"
    >
      <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-[#f1f5f9] shadow-[0_15px_45px_rgba(10,29,58,0.08)]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          priority
          onLoad={() => setIsLoaded(true)}
          className={`object-cover transition-all duration-1000 ease-in-out group-hover:scale-110 ${
            isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-lg'
          }`}
        />
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-2xl font-black uppercase tracking-tight text-[#0a1d3a]">
          {member.name}
        </h3>
        <div className="mt-2 flex items-center justify-center gap-2">
           <span className="h-px w-4 bg-[#ef233c]" />
           <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ef233c]">
             {member.role}
           </p>
           <span className="h-px w-4 bg-[#ef233c]" />
        </div>
      </div>
    </motion.div>
  )
}
