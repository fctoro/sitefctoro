import type { Metadata } from 'next'
import { HomeNavbar } from '@/components/home-navbar'
import { Breadcrumb } from '@/components/breadcrumb'
import FlagDayPageContent from '@/components/flag-day-page-content'
import { getFlagDayCmsData } from '@/lib/flag-day'

export const metadata: Metadata = {
  title: 'Flag Day | FC TORO',
  description: 'Classement, resultats et prochains matchs du tournoi Flag Day.',
}

export const dynamic = 'force-dynamic'

export default async function FlagDayPage() {
  const cmsData = await getFlagDayCmsData()

  return (
    <>
      <HomeNavbar anchorPrefix="/" />
      <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Evenements' }, { label: 'Flag Day', href: '/evenements/flag-day' }]} />
      <FlagDayPageContent cmsData={cmsData} />
    </>
  )
}
