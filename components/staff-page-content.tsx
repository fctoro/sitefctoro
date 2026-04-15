'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

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
  const displayRole = member.role || "Staff";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="flex flex-col items-center"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[40px] bg-gray-100 shadow-md transition-transform duration-300 hover:-translate-y-2">
        {member.photo_url ? (
          <img
            src={member.photo_url}
            alt={member.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 font-medium text-gray-400">
            {member.name}
          </div>
        )}
      </div>
      <div className="mt-5 text-center">
        <h3 className="text-xl font-black uppercase md:text-2xl tracking-tight text-[#0a1d3a]">
          {member.name}
        </h3>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ef233c] flex items-center justify-center gap-2">
          <span className="w-4 h-[1px] bg-[#ef233c]"></span>
          {displayRole}
          <span className="w-4 h-[1px] bg-[#ef233c]"></span>
        </p>
      </div>
    </motion.div>
  )
}
