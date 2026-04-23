import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Suspense } from 'react'
import { Analytics } from '@vercel/analytics/next'
import Footer from '@/components/footer'
import { SiteRuntimeManager } from '@/components/site-runtime-manager'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FC TORO | MACHE SOU YO',
  description: ' ',
  generator: 'v0.app',
  icons: {
    icon: '/fc-toro-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} font-sans antialiased text-zinc-900`}>
        <Suspense fallback={null}>
          <SiteRuntimeManager />
        </Suspense>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
