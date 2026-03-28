import type { Metadata } from 'next'
import { HomeNavbar } from '@/components/home-navbar'
import FlagDayPageContent from '@/components/flag-day-page-content'

export const metadata: Metadata = {
  title: 'Flag Day | FC TORO',
  description: 'Classement, resultats et prochains matchs du tournoi Flag Day.',
}

export default function FlagDayPage() {
  return (
    <>
      <HomeNavbar anchorPrefix="/" />
      <FlagDayPageContent />
    </>
  )
}
