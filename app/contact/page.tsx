'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { HomeNavbar } from '@/components/home-navbar'
import {
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiWhatsappLine,
} from '@remixicon/react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative h-[220px] overflow-hidden bg-[#0a1d3a] text-white md:h-[300px]">
          <Image
            src="/joueur/extracted/566965214_18535346428012336_1378637816694320324_n.jpg"
            alt="Contact FC TORO"
            fill
            priority
            className="object-cover opacity-50 transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a1d3a] to-transparent" />
          <div className="absolute bottom-0 left-0 h-1 w-full bg-[#ef233c]/80" />

          <div className="relative z-10 mx-auto flex h-full max-w-[1100px] flex-col justify-center px-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">
                Service Clients
              </p>
              <h1 className="text-4xl font-black uppercase leading-[0.8] tracking-tighter drop-shadow-2xl md:text-7xl">
                Contact
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid gap-16 md:grid-cols-2">
              <div className="space-y-12">
                <div className="inline-flex items-center gap-4 rounded-full bg-[#ef233c] px-6 py-3 text-sm font-black uppercase tracking-widest text-white">
                  Contactez-nous
                </div>

                <h2 className="text-5xl font-black uppercase leading-[0.9] text-[#0a1d3a]">
                  Pour toute information concernant les inscriptions ou les
                  activites du club, veuillez contacter l equipe FC TORO.
                </h2>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="space-y-4 rounded-3xl border border-gray-100 bg-gray-50 p-10">
                    <RiPhoneLine className="h-10 w-10 text-[#ef233c]" />
                    <h4 className="text-xl font-black uppercase leading-tight">
                      Telephone
                    </h4>
                    <p className="font-bold text-[#445b7f]">+509 2817-8676</p>
                    <div className="flex items-center gap-2 pt-2 text-xs font-bold uppercase tracking-tight text-[#25D366]">
                      <RiWhatsappLine className="h-5 w-5" />
                      <span>Disponible</span>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-3xl border border-gray-100 bg-gray-50 p-10">
                    <RiMailLine className="h-10 w-10 text-[#ef233c]" />
                    <h4 className="text-xl font-black uppercase leading-tight">
                      Email
                    </h4>
                    <p className="break-all font-bold text-[#445b7f]">
                      footballclubtoro@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8 rounded-[40px] bg-[#0a2347] p-10 text-white shadow-xl">
                  <RiMapPinLine className="h-12 w-12 shrink-0 text-[#ef233c]" />
                  <p className="text-xl font-bold leading-relaxed">
                    Football Club TORO, 7 Rue Rigaud, Petion-Ville, Haiti
                  </p>
                </div>
              </div>

              <div className="rounded-[50px] border border-gray-100 bg-[#f8fafc] p-12 shadow-sm">
                <h3 className="mb-10 text-center text-3xl font-black uppercase">
                  Envoyez un message
                </h3>

                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Nom"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-4 font-bold focus:border-[#ef233c] focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Prenom"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-4 font-bold focus:border-[#ef233c] focus:outline-none"
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-4 font-bold focus:border-[#ef233c] focus:outline-none"
                  />

                  <textarea
                    rows={5}
                    placeholder="Message"
                    className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-6 py-4 font-bold focus:border-[#ef233c] focus:outline-none"
                  />

                  <button className="w-full rounded-2xl bg-[#ef233c] py-5 text-lg font-black uppercase tracking-widest text-white shadow-xl transition-all hover:scale-[1.02] hover:bg-[#ff3f5c] active:scale-[0.98]">
                    Envoyer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
