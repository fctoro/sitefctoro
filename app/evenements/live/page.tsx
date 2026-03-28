import type { Metadata } from 'next'
import { HomeNavbar } from '@/components/home-navbar'
import LivePageContent from '@/components/live-page-content'

export const metadata: Metadata = {
  title: 'Live | FC TORO',
  description: 'Page de diffusion live FC TORO avec flux de match et partage rapide.',
}

export default function LivePage() {
  return (
    <>
      <HomeNavbar anchorPrefix="/" />
      <LivePageContent />
    </>
  )
}
