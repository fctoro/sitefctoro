import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { RiArrowDownSLine } from '@remixicon/react'

type InscriptionFormCardProps = {
  eyebrow: string
  title: string
  description: string
  badges: string[]
  children: ReactNode
}

type InscriptionFormSectionProps = {
  index: string
  title: string
  description?: string
  children: ReactNode
}

type InscriptionFieldProps = {
  label: string
  helper?: string
  required?: boolean
  children: ReactNode
}

const fieldBaseClassName =
  'h-14 w-full rounded-[20px] border border-[#d8e1ef] bg-white px-5 text-[15px] font-semibold text-[#0a1d3a] shadow-[0_8px_18px_rgba(10,29,58,0.04)] outline-none transition-all placeholder:text-[#8ea2bf] focus:border-[#1f4ea1] focus:bg-white focus:shadow-[0_0_0_4px_rgba(31,78,161,0.08)]'

export function InscriptionFormCard({
  eyebrow,
  title,
  description,
  badges,
  children,
}: InscriptionFormCardProps) {
  return (
    <div className="rounded-[38px] border border-[#dbe5f2] bg-[linear-gradient(180deg,#ffffff_0%,#f7faff_100%)] p-6 shadow-[0_22px_48px_rgba(10,29,58,0.08)] sm:p-8 lg:p-10">
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-[#d9e5f4] bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#5c7293]"
          >
            {badge}
          </span>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">{eyebrow}</p>
        <h3 className="mt-3 text-[clamp(2rem,3vw,2.8rem)] font-black uppercase leading-[0.94] text-[#0a1d3a]">
          {title}
        </h3>
        <p className="mt-3 max-w-[560px] text-sm font-medium leading-relaxed text-[#5b6f91] sm:text-[15px]">
          {description}
        </p>
      </div>

      <div className="mt-8 space-y-8">{children}</div>
    </div>
  )
}

export function InscriptionFormSection({
  index,
  title,
  description,
  children,
}: InscriptionFormSectionProps) {
  return (
    <section className="border-t border-[#e7edf6] pt-8 first:border-t-0 first:pt-0">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#0a2347] text-sm font-black text-white">
          {index}
        </div>
        <div className="min-w-0">
          <h4 className="text-lg font-black uppercase leading-tight text-[#0a1d3a]">{title}</h4>
          {description ? (
            <p className="mt-1 text-sm font-medium leading-relaxed text-[#6d82a3]">{description}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 space-y-6">{children}</div>
    </section>
  )
}

export function InscriptionField({
  label,
  helper,
  required = false,
  children,
}: InscriptionFieldProps) {
  return (
    <div className="space-y-2.5">
      <label className="block text-[11px] font-black uppercase tracking-[0.16em] text-[#587193]">
        {label}
        {required ? <span className="text-[#ef233c]"> *</span> : null}
      </label>
      {children}
      {helper ? <p className="text-xs font-semibold leading-relaxed text-[#7c8fad]">{helper}</p> : null}
    </div>
  )
}

export function InscriptionInput(props: ComponentPropsWithoutRef<'input'>) {
  return <input {...props} className={`${fieldBaseClassName} ${props.className ?? ''}`.trim()} />
}

export function InscriptionSelect(props: ComponentPropsWithoutRef<'select'>) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`${fieldBaseClassName} appearance-none pr-12 text-[#445b7f] ${props.className ?? ''}`.trim()}
      />
      <RiArrowDownSLine className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7e92af]" />
    </div>
  )
}

export function InscriptionTextarea(props: ComponentPropsWithoutRef<'textarea'>) {
  return (
    <textarea
      {...props}
      className={`min-h-[144px] w-full resize-none rounded-[24px] border border-[#d8e1ef] bg-white px-5 py-4 text-[15px] font-semibold text-[#0a1d3a] shadow-[0_8px_18px_rgba(10,29,58,0.04)] outline-none transition-all placeholder:text-[#8ea2bf] focus:border-[#1f4ea1] focus:bg-white focus:shadow-[0_0_0_4px_rgba(31,78,161,0.08)] ${props.className ?? ''}`.trim()}
    />
  )
}

export function InscriptionConsent({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[24px] border border-[#e4ebf6] bg-white/90 p-4 shadow-[0_8px_16px_rgba(10,29,58,0.03)]">
      <label className="flex items-start gap-3 text-sm font-semibold leading-relaxed text-[#445b7f]">
        <input type="checkbox" className="mt-1 h-4 w-4 rounded border-[#c7d4e7] text-[#ef233c]" />
        <span>{children}</span>
      </label>
    </div>
  )
}

export function InscriptionSubmit({
  label,
  note,
}: {
  label: string
  note: string
}) {
  return (
    <div className="rounded-[26px] border border-[#dbe6f3] bg-[#eef4ff] p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1f4ea1]">Traitement du dossier</p>
      <p className="mt-2 text-sm font-semibold leading-relaxed text-[#5b6f91]">{note}</p>
      <button className="mt-5 w-full rounded-[20px] bg-[#ef233c] py-5 text-base font-black uppercase tracking-[0.18em] text-white shadow-[0_18px_30px_rgba(239,35,60,0.28)] transition-all hover:translate-y-[-1px] hover:bg-[#ff3f5c] active:translate-y-0">
        {label}
      </button>
    </div>
  )
}
