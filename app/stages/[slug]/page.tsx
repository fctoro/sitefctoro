import Image from 'next/image'
import { notFound } from 'next/navigation'
import { HomeNavbar } from '@/components/home-navbar'
import { getStageBySlug } from '@/lib/stages'

type StageDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

const languageLevels = ['Debutant', 'Intermediaire', 'Avance', 'Courant']

export default async function StageDetailPage({ params }: StageDetailPageProps) {
  const { slug } = await params
  const stage = getStageBySlug(slug)

  if (!stage) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative h-[240px] overflow-hidden bg-[#0a1d3a] text-white md:h-[320px]">
          <Image
            src={stage.image}
            alt={stage.title}
            fill
            priority
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,29,58,0.92)_0%,rgba(10,29,58,0.55)_48%,rgba(10,29,58,0.88)_100%)]" />
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#ef233c] via-[#ef233c]/60 to-transparent" />

          <div className="relative z-10 mx-auto flex h-full max-w-[1100px] flex-col justify-center px-6">
            <p className="text-[10px] font-black uppercase tracking-[0.36em] text-[#ef233c]">
              Stage FC TORO
            </p>
            <h1 className="mt-4 max-w-[900px] text-4xl font-black leading-[0.9] tracking-[-0.05em] md:text-6xl">
              {stage.title}
            </h1>
            <p className="mt-3 max-w-[720px] text-sm font-medium leading-relaxed text-white/82 md:text-base">
              {stage.summary}
            </p>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-[1100px] rounded-[28px] bg-white p-6 shadow-[0_18px_42px_rgba(10,29,58,0.06)] sm:p-10">
            <div className="border-b border-[#e7edf5] pb-6">
              <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-black tracking-[-0.05em] text-[#0a1d3a]">
                {stage.title}
              </h2>
              <p className="mt-3 text-sm font-medium text-[#556b8d]">
                By {stage.publishedBy} / {stage.publishedAt}
              </p>

              <div className="mt-6 grid gap-2 text-sm font-medium text-[#445b7f] sm:grid-cols-2">
                <p>
                  <span className="font-black text-[#0a1d3a]">Superviseur:</span> {stage.supervisor}
                </p>
                <p>
                  <span className="font-black text-[#0a1d3a]">Lieu:</span> {stage.location}
                </p>
                <p>
                  <span className="font-black text-[#0a1d3a]">Debut:</span> {stage.startDate}
                </p>
                <p>
                  <span className="font-black text-[#0a1d3a]">Type:</span> {stage.contractType}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-[#445b7f]">
              <div>
                <p className="font-black text-[#0a1d3a]">A propos du club:</p>
                {stage.intro.map((paragraph) => (
                  <p key={paragraph} className="mt-3">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div>
                <p className="font-black text-[#0a1d3a]">A propos de la mission:</p>
                {stage.mission.map((paragraph) => (
                  <p key={paragraph} className="mt-3">
                    {paragraph}
                  </p>
                ))}
              </div>

              {stage.responsibilities.map((block) => (
                <div key={block.title}>
                  <p className="font-black text-[#0a1d3a]">{block.title}:</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {stage.requirements.map((block) => (
                <div key={block.title}>
                  <p className="font-black text-[#0a1d3a]">{block.title}:</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="border-t border-[#e7edf5] pt-6 text-sm font-medium text-[#445b7f]">
                <p>
                  <span className="font-black text-[#0a1d3a]">Categorie:</span> {stage.category}
                </p>
                <p className="mt-2">
                  <span className="font-black text-[#0a1d3a]">Engagement:</span> {stage.type}
                </p>
                <p className="mt-2">
                  <span className="font-black text-[#0a1d3a]">Groupe principal:</span> {stage.ageGroup}
                </p>
                <p className="mt-2">
                  <span className="font-black text-[#0a1d3a]">Langues utiles:</span> {stage.languages.join(', ')}
                </p>
              </div>
            </div>

            <div className="mt-12 rounded-[26px] border border-[#d9e2ee] bg-[#fcfdff] p-6 sm:p-8">
              <h3 className="text-3xl font-black tracking-[-0.04em] text-[#0a1d3a]">
                Postuler pour ce stage
              </h3>

              <form className="mt-8 space-y-6">
                <div>
                  <label className="text-sm font-medium text-[#445b7f]">
                    Nom complet <span className="text-[#ef233c]">*</span>
                  </label>
                  <input className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]" />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-[#445b7f]">
                      Prenom <span className="text-[#ef233c]">*</span>
                    </label>
                    <input className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#445b7f]">
                      Nom <span className="text-[#ef233c]">*</span>
                    </label>
                    <input className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]" />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-[#445b7f]">
                      Email <span className="text-[#ef233c]">*</span>
                    </label>
                    <input type="email" className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#445b7f]">
                      Telephone <span className="text-[#ef233c]">*</span>
                    </label>
                    <input className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#445b7f]">
                    Localisation (Ville, Pays) <span className="text-[#ef233c]">*</span>
                  </label>
                  <input className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]" />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#445b7f]">
                    Upload CV / Resume <span className="text-[#ef233c]">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="mt-2 block w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 text-sm text-[#445b7f]"
                  />
                  <p className="mt-2 text-xs text-[#7b8fab]">
                    Types autorises: .pdf, .doc, .docx
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#445b7f]">
                    Upload lettre de motivation <span className="text-[#ef233c]">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="mt-2 block w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 text-sm text-[#445b7f]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#445b7f]">
                    Pourquoi voulez-vous rejoindre FC TORO ? <span className="text-[#ef233c]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-[#445b7f]">
                    Etes-vous disponible pour les entrainements et activites matchday ?{' '}
                    <span className="text-[#ef233c]">*</span>
                  </p>
                  <div className="mt-3 flex gap-6 text-sm text-[#445b7f]">
                    <label className="inline-flex items-center gap-2">
                      <input type="radio" name="availability" />
                      Oui
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input type="radio" name="availability" />
                      Non
                    </label>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-[#445b7f]">
                      Comment avez-vous connu cette opportunite ? <span className="text-[#ef233c]">*</span>
                    </label>
                    <select className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]">
                      <option>Selectionner</option>
                      <option>Instagram</option>
                      <option>Facebook</option>
                      <option>Recommandation</option>
                      <option>Site officiel</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#445b7f]">
                      Si vous etes recommande, indiquez le nom
                    </label>
                    <input className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]" />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <label className="text-sm font-medium text-[#445b7f]">
                      Niveau de Creole <span className="text-[#ef233c]">*</span>
                    </label>
                    <select className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]">
                      <option>Selectionner</option>
                      {languageLevels.map((level) => (
                        <option key={`creole-${level}`}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#445b7f]">
                      Niveau de Francais <span className="text-[#ef233c]">*</span>
                    </label>
                    <select className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]">
                      <option>Selectionner</option>
                      {languageLevels.map((level) => (
                        <option key={`french-${level}`}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#445b7f]">
                      Niveau d Anglais
                    </label>
                    <select className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]">
                      <option>Selectionner</option>
                      {languageLevels.map((level) => (
                        <option key={`english-${level}`}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <label className="flex w-full items-start gap-3 text-sm text-[#445b7f]">
                  <input type="checkbox" className="mt-1" />
                  <span>
                    En utilisant ce formulaire, vous acceptez la collecte et le traitement de vos donnees
                    pour cette candidature. <span className="text-[#ef233c]">*</span>
                  </span>
                </label>

                <button className="inline-flex w-fit rounded-full bg-[#0a1d3a] px-8 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#ef233c]">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
