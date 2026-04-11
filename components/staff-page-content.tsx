'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function StaffPageContent({ staffMembers }: { staffMembers: any[] }) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        {staffMembers.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            Aucun membre du staff trouvé. Ajouter du staff depuis le CMS.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {staffMembers.map((member, index) => (
              <StaffMemberCard key={member.id || member.name} member={member} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function StaffMemberCard({ member, index }: { member: any; index: number }) {
  const imageUrl = member.image || member.photo_url || '/images/user/user-01.jpg'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="flex flex-col items-center"
    >
      <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-[#f1f5f9] shadow-[0_15px_45px_rgba(10,29,58,0.08)]">
        <img
          src={imageUrl}
          alt={member.name}
          className="h-full w-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-110"
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
