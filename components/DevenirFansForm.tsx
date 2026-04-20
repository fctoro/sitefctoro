'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const DEPARTEMENTS = [
  'Artibonite',
  'Centre',
  "Grand'Anse",
  'Nippes',
  'Nord',
  'Nord-Est',
  'Nord-Ouest',
  'Ouest',
  'Sud',
  'Sud-Est'
]

export default function DevenirFansForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <section className="relative overflow-hidden bg-[#0a1d3a] py-24 sm:py-32 h-full">
         <div className="absolute inset-0 top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#1a4ea3]/20 to-transparent blur-3xl opacity-50 pointer-events-none" />
         
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="mx-auto max-w-3xl"
        >
          <div className="text-center mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">
              Rejoignez la famille
            </span>
            <h2 className="mt-3 text-3xl font-black uppercase leading-tight tracking-tighter text-white md:text-5xl">
              Devenir <span className="text-[#1a4ea3] drop-shadow-[0_0_10px_rgba(26,78,163,0.5)]">Fan</span>
            </h2>
            <p className="mt-4 text-[15px] font-medium leading-relaxed text-[#8da2c0] max-w-xl mx-auto">
              Soutenez le FC TORO et participez à l'aventure ! Inscrivez-vous pour recevoir nos actualités, invitations exclusives et bien plus.
            </p>
          </div>

          <div className="bg-[#0f2854] border border-[#1a3875] shadow-2xl rounded-3xl p-8 md:p-12 backdrop-blur-xl">
             {isSubmitted ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="text-center py-12"
               >
                 <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                   <motion.svg 
                     initial={{ scale: 0.5, rotate: -45 }}
                     animate={{ scale: 1, rotate: 0 }}
                     className="h-10 w-10" 
                     fill="none" 
                     viewBox="0 0 24 24" 
                     stroke="currentColor"
                   >
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                   </motion.svg>
                 </div>
                 <h3 className="text-2xl font-black uppercase text-white mb-2">Bienvenue !</h3>
                 <p className="text-[#8da2c0]">Votre demande a été enregistrée avec succès. Merci pour votre soutien au FC TORO.</p>
                 <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-xs font-black uppercase tracking-wider text-emerald-400 hover:text-white transition-colors"
                 >
                    Retourner au formulaire
                 </button>
               </motion.div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* Nom */}
                   <div className="space-y-2">
                     <label htmlFor="nom" className="block text-[11px] font-black uppercase tracking-wider text-[#8da2c0]">
                       Nom <span className="text-[#ef233c]">*</span>
                     </label>
                     <input
                       type="text"
                       id="nom"
                       required
                       className="w-full rounded-xl border border-[#1a3875] bg-[#0a1d3a] px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#ef233c] focus:outline-none focus:ring-1 focus:ring-[#ef233c] transition-colors"
                       placeholder="Votre nom"
                     />
                   </div>

                   {/* Prénom */}
                   <div className="space-y-2">
                     <label htmlFor="prenom" className="block text-[11px] font-black uppercase tracking-wider text-[#8da2c0]">
                       Prénom <span className="text-[#ef233c]">*</span>
                     </label>
                     <input
                       type="text"
                       id="prenom"
                       required
                       className="w-full rounded-xl border border-[#1a3875] bg-[#0a1d3a] px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#ef233c] focus:outline-none focus:ring-1 focus:ring-[#ef233c] transition-colors"
                       placeholder="Votre prénom"
                     />
                   </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Numéro */}
                    <div className="space-y-2">
                      <label htmlFor="numero" className="block text-[11px] font-black uppercase tracking-wider text-[#8da2c0]">
                        Numéro de téléphone <span className="text-[#ef233c]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="numero"
                        required
                        className="w-full rounded-xl border border-[#1a3875] bg-[#0a1d3a] px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#ef233c] focus:outline-none focus:ring-1 focus:ring-[#ef233c] transition-colors"
                        placeholder="+509 XXXX XXXX"
                      />
                    </div>
                    
                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-[11px] font-black uppercase tracking-wider text-[#8da2c0]">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full rounded-xl border border-[#1a3875] bg-[#0a1d3a] px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#ef233c] focus:outline-none focus:ring-1 focus:ring-[#ef233c] transition-colors"
                        placeholder="exemple@email.com"
                      />
                    </div>
                 </div>

                 {/* Département */}
                 <div className="space-y-2">
                   <label htmlFor="departement" className="block text-[11px] font-black uppercase tracking-wider text-[#8da2c0]">
                     Département <span className="text-[#ef233c]">*</span>
                   </label>
                   <div className="relative">
                      <select
                        id="departement"
                        required
                        defaultValue=""
                        className="w-full appearance-none rounded-xl border border-[#1a3875] bg-[#0a1d3a] px-4 py-3 text-sm text-white focus:border-[#ef233c] focus:outline-none focus:ring-1 focus:ring-[#ef233c] transition-colors"
                      >
                        <option value="" disabled className="text-white/30">Sélectionnez votre département</option>
                        {DEPARTEMENTS.map((dep) => (
                          <option key={dep} value={dep} className="text-black">{dep}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8da2c0]">
                         <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                         </svg>
                      </div>
                   </div>
                 </div>

                 {/* Adresse */}
                 <div className="space-y-2">
                   <label htmlFor="adresse" className="block text-[11px] font-black uppercase tracking-wider text-[#8da2c0]">
                     Adresse complète <span className="text-[#ef233c]">*</span>
                   </label>
                   <textarea
                     id="adresse"
                     required
                     rows={3}
                     className="w-full rounded-xl border border-[#1a3875] bg-[#0a1d3a] px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#ef233c] focus:outline-none focus:ring-1 focus:ring-[#ef233c] transition-colors resize-none"
                     placeholder="Votre adresse (Rue, Ville, etc.)"
                   />
                 </div>

                 <button
                   type="submit"
                   disabled={isSubmitting}
                   className="relative mt-8 w-full overflow-hidden rounded-xl bg-[#ef233c] px-6 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_4px_20px_rgba(239,35,60,0.4)] transition-all hover:bg-[#d91e34] hover:shadow-[0_4px_25px_rgba(239,35,60,0.6)] disabled:opacity-70"
                 >
                   {isSubmitting ? 'Envoi en cours...' : 'Rejoindre le FC TORO'}
                 </button>
               </form>
             )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
