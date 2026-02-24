import type { Metadata } from 'next'
import StandingsPageContent from '../../components/standings-page-content'

export const metadata: Metadata = {
  title: 'Classement | FC TORO',
  description: 'Classement et resultats de championnat du club',
}

export default function StandingsPage() {
  return <StandingsPageContent />
}
