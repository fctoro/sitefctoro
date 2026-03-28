import type { Metadata } from 'next'
import { HomeNavbar } from '@/components/home-navbar'
import VertieresCupPageContent from '@/components/vertieres-cup-page-content'

export const metadata: Metadata = {
  title: 'Vertieres Cup | FC TORO',
  description: 'Inscription equipe Vertieres Cup avec logo, staff et liste des joueurs.',
}

export default function VertieresCupPage() {
  return (
    <>
      <HomeNavbar anchorPrefix="/" />
      <VertieresCupPageContent />
    </>
  )
}
