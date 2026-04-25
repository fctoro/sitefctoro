'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HomeNavbar } from '@/components/home-navbar'

import { Breadcrumb } from '@/components/breadcrumb'

/* ─────────────────────────────────────── Icons ─────────────────────────────────────── */

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 shrink-0 text-[#ef233c]">
      <path
        d="M6.62 10.79a15.06 15.06 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.32.56 3.57.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.06 21 3 13.94 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.19 2.45.56 3.57a1 1 0 0 1-.24 1.02l-2.2 2.2Z"
        fill="currentColor"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 shrink-0 text-[#ef233c]">
      <path
        d="M4 6h16a2 2 0 0 1 2 2v.4l-10 6.25L2 8.4V8a2 2 0 0 1 2-2Zm18 4.35-9.47 5.92a1 1 0 0 1-1.06 0L2 10.35V16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.65Z"
        fill="currentColor"
      />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 shrink-0 text-[#ef233c]">
      <path
        d="M12 22s7-6.36 7-12a7 7 0 1 0-14 0c0 5.64 7 12 7 12Zm0-9a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
        fill="currentColor"
      />
    </svg>
  )
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 text-[#25d366]">
      <path
        d="M12.04 2C6.5 2 2 6.4 2 11.84c0 1.91.57 3.78 1.64 5.38L2.5 22l4.95-1.28a10.15 10.15 0 0 0 4.59 1.09c5.54 0 10.04-4.4 10.04-9.84C22.08 6.4 17.58 2 12.04 2Zm0 17.95c-1.46 0-2.9-.37-4.17-1.06l-.3-.17-2.93.76.78-2.83-.19-.3a7.86 7.86 0 0 1-1.22-4.18c0-4.35 3.62-7.89 8.03-7.89 4.43 0 8.03 3.54 8.03 7.89 0 4.35-3.6 7.88-8.03 7.88Zm4.4-5.95c-.24-.12-1.41-.69-1.63-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.17-.71-.63-1.2-1.41-1.34-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.28-.74-1.75-.2-.47-.41-.4-.56-.41h-.48c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 1.99 0 1.17.86 2.3.98 2.46.12.16 1.68 2.67 4.16 3.64.59.23 1.05.37 1.41.47.59.16 1.12.14 1.54.08.47-.07 1.41-.58 1.61-1.14.2-.56.2-1.03.14-1.13-.06-.1-.22-.16-.46-.28Z"
        fill="currentColor"
      />
    </svg>
  )
}

/* ─────────────────────────────────────── Page ─────────────────────────────────────── */

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [submitSuccess])

  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Contact', href: '/contact' }]} />

        {/* ── Hero – compact banner ── */}
        <section className="relative h-[175px] overflow-hidden sm:h-[195px]">
          <Image
            src="/TEAMPICTURES/Billy Vilsaint.jpg.jpeg"
            alt="Contact FC TORO"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_5%]"
          />
          {/* strong dark overlay left → transparent right */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,14,38,0.88)_0%,rgba(6,14,38,0.72)_40%,rgba(6,14,38,0.42)_70%,rgba(6,14,38,0.18)_100%)]" />
          {/* subtle blue tint overall */}
          <div className="absolute inset-0 bg-[rgba(10,29,58,0.22)]" />

          <div className="relative z-10 flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-[1340px] justify-center">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.38em] text-[#ef233c] sm:text-[10px]">
                  Service Clients
                </p>
                <h1 className="mt-1.5 text-[clamp(2rem,4vw,3rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-white">
                  Contact
                </h1>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Main content ── */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid gap-12 lg:grid-cols-[1fr_480px] lg:gap-16 xl:gap-20">

              {/* ── Left column – info ── */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-10"
              >
                {/* Badge + heading */}
                <div>
                  <span className="inline-block rounded-full border border-[#ef233c]/25 bg-[#ef233c]/8 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-[#ef233c]">
                    Contactez-nous
                  </span>
                  <h2 className="mt-5 text-[clamp(1.5rem,2.8vw,2.4rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-[#0a1d3a]">
                    Pour toute information
                    <br />
                    concernant les inscriptions
                    <br />
                    ou les activites du club.
                  </h2>
                  <p className="mt-4 max-w-[500px] text-sm font-medium leading-relaxed text-[#5b6f91] sm:text-base">
                    Veuillez contacter l&apos;equipe FC TORO via le telephone, l&apos;email ou
                    directement via le formulaire de contact.
                  </p>
                </div>

                {/* Contact cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Phone */}
                  <article className="rounded-[24px] border border-[#dce5f2] bg-white p-6 shadow-[0_14px_28px_rgba(10,29,58,0.05)] transition-transform duration-300 hover:-translate-y-1">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ef233c]/8 ring-1 ring-[#ef233c]/15">
                      <PhoneIcon />
                    </div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#5b6f91]">
                      Telephone
                    </h3>
                    <a
                      id="contact-phone-link"
                      href="tel:+50928178676"
                      className="mt-2 block text-lg font-black text-[#0a1d3a] transition-colors hover:text-[#ef233c]"
                    >
                      +509 2817-8676
                    </a>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25d366]/10 px-3 py-1.5 text-[11px] font-bold text-[#1a9e4e]">
                      <WhatsappIcon />
                      <span>WhatsApp disponible</span>
                    </div>
                  </article>

                  {/* Email */}
                  <article className="rounded-[24px] border border-[#dce5f2] bg-white p-6 shadow-[0_14px_28px_rgba(10,29,58,0.05)] transition-transform duration-300 hover:-translate-y-1">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ef233c]/8 ring-1 ring-[#ef233c]/15">
                      <MailIcon />
                    </div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#5b6f91]">
                      Email
                    </h3>
                    <a
                      id="contact-email-link"
                      href="mailto:footballclubtoro@gmail.com"
                      className="mt-2 block whitespace-nowrap text-[11px] font-black tracking-tight text-[#0a1d3a] transition-colors hover:text-[#ef233c] min-[375px]:text-[12px] sm:text-[14px]"
                    >
                      footballclubtoro@gmail.com
                    </a>
                  </article>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 rounded-[24px] border border-[#dce5f2] bg-white p-6 shadow-[0_14px_28px_rgba(10,29,58,0.05)]">
                  <div className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#ef233c]/8 ring-1 ring-[#ef233c]/15">
                    <MapPinIcon />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5b6f91]">
                      Adresse
                    </p>
                    <p className="mt-2 text-base font-bold text-[#0a1d3a]">
                      Football Club TORO
                    </p>
                    <p className="text-sm font-medium text-[#5b6f91]">
                      7 Rue Rigaud, Petion-Ville, Haiti
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* ── Right column – form ── */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="rounded-[32px] border border-[#dce5f2] bg-white p-8 shadow-[0_24px_50px_rgba(10,29,58,0.09)] sm:p-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ef233c]">
                    Formulaire
                  </p>
                  <h3 className="mt-3 text-2xl font-black uppercase leading-tight tracking-[-0.04em] text-[#0a1d3a] sm:text-3xl">
                    Envoyez un message
                  </h3>
                  <p className="mt-2 text-sm font-medium text-[#5b6f91]">
                    Notre equipe vous repondra dans les plus brefs delais.
                  </p>

                  <form
                    id="contact-form"
                    className="mt-8 space-y-5"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsSubmitting(true);
                      setSubmitError(null);
                      setSubmitSuccess(false);
                      const formData = new FormData(e.currentTarget);
                      const data = Object.fromEntries(formData.entries());
                      try {
                        const response = await fetch('/api/contact', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(data),
                        });
                        if (!response.ok) throw new Error('Erreur lors de l\'envoi');
                        setSubmitSuccess(true);
                        (e.target as HTMLFormElement).reset();
                      } catch (err: any) {
                        setSubmitError(err.message || 'Une erreur est survenue');
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                  >
                    {submitSuccess && (
                      <div className="rounded-xl border border-[#25d366]/20 bg-[#25d366]/10 p-4 text-sm font-medium text-[#1a9e4e]">
                        Votre message a bien été envoyé. Nous vous répondrons très vite.
                      </div>
                    )}
                    {submitError && (
                      <div className="rounded-xl border border-[#ef233c]/20 bg-[#ef233c]/10 p-4 text-sm font-medium text-[#ef233c]">
                        {submitError}
                      </div>
                    )}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-nom"
                          className="block text-[11px] font-black uppercase tracking-[0.18em] text-[#5b6f91]"
                        >
                          Nom
                        </label>
                        <input
                          id="contact-nom"
                          type="text"
                          name="nom"
                          required
                          placeholder="Votre nom"
                          className="w-full rounded-xl border border-[#dce5f2] bg-[#f8fafc] px-4 py-3 text-sm font-semibold text-[#0a1d3a] placeholder:text-[#b0bdd0] outline-none transition-all focus:border-[#ef233c]/50 focus:ring-2 focus:ring-[#ef233c]/12"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-prenom"
                          className="block text-[11px] font-black uppercase tracking-[0.18em] text-[#5b6f91]"
                        >
                          Prenom
                        </label>
                        <input
                          id="contact-prenom"
                          type="text"
                          name="prenom"
                          required
                          placeholder="Votre prenom"
                          className="w-full rounded-xl border border-[#dce5f2] bg-[#f8fafc] px-4 py-3 text-sm font-semibold text-[#0a1d3a] placeholder:text-[#b0bdd0] outline-none transition-all focus:border-[#ef233c]/50 focus:ring-2 focus:ring-[#ef233c]/12"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-email"
                          className="block text-[11px] font-black uppercase tracking-[0.18em] text-[#5b6f91]"
                        >
                          Email
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          required
                          placeholder="votre@email.com"
                          className="w-full rounded-xl border border-[#dce5f2] bg-[#f8fafc] px-4 py-3 text-sm font-semibold text-[#0a1d3a] placeholder:text-[#b0bdd0] outline-none transition-all focus:border-[#ef233c]/50 focus:ring-2 focus:ring-[#ef233c]/12"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-phone"
                          className="block text-[11px] font-black uppercase tracking-[0.18em] text-[#5b6f91]"
                        >
                          Numero
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          required
                          placeholder="+509 XXXX XXXX"
                          className="w-full rounded-xl border border-[#dce5f2] bg-[#f8fafc] px-4 py-3 text-sm font-semibold text-[#0a1d3a] placeholder:text-[#b0bdd0] outline-none transition-all focus:border-[#ef233c]/50 focus:ring-2 focus:ring-[#ef233c]/12"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-message"
                        className="block text-[11px] font-black uppercase tracking-[0.18em] text-[#5b6f91]"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Votre message..."
                        className="w-full resize-none rounded-xl border border-[#dce5f2] bg-[#f8fafc] px-4 py-3 text-sm font-semibold text-[#0a1d3a] placeholder:text-[#b0bdd0] outline-none transition-all focus:border-[#ef233c]/50 focus:ring-2 focus:ring-[#ef233c]/12"
                      />
                    </div>

                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full overflow-hidden rounded-xl bg-[#ef233c] py-3.5 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_10px_26px_rgba(239,35,60,0.28)] transition-all duration-300 hover:bg-[#d71931] hover:shadow-[0_14px_32px_rgba(239,35,60,0.36)] active:scale-[0.98] disabled:opacity-70"
                    >
                      <span className="relative z-10">{isSubmitting ? 'Envoi...' : 'Envoyer le message'}</span>
                      {/* shimmer */}
                      {!isSubmitting && <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-18deg] bg-white/20 transition-transform duration-700 group-hover:translate-x-[120%]" />}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
