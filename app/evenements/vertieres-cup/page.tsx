import type { Metadata } from 'next'
import { HomeNavbar } from '@/components/home-navbar'
import { Breadcrumb } from '@/components/breadcrumb'
import VertieresCupPageContent from '@/components/vertieres-cup-page-content'

export const metadata: Metadata = {
  title: 'Vertieres Cup | FC TORO',
  description: 'Inscription equipe Vertieres Cup avec logo, staff et liste des joueurs.',
}

export default function VertieresCupPage() {
  return (
    <>
      <HomeNavbar anchorPrefix="/" />
      <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Événements' }, { label: 'Vertières Cup', href: '/evenements/vertieres-cup' }]} />
      <VertieresCupPageContent />
    </>
  )
}
