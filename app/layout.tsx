import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://gamification.espinasse.ch'),

  title: {
    default: 'Gamification Éthique',
    template: '%s | Gamification Éthique',
  },

  description:
    "Framework permettant d'évaluer les risques éthiques des mécaniques de gamification avant leur intégration dans une interface numérique.",

  applicationName: 'Gamification Éthique',

  keywords: [
    'gamification',
    'éthique',
    'framework',
    'UX',
    'UI',
    'dark patterns',
    'conception éthique',
    'interfaces numériques',
    'travail de bachelor',
  ],

  authors: [
    {
      name: 'Christel Espinasse',
    },
  ],

  creator: 'Christel Espinasse',

  publisher: 'Christel Espinasse',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    url: 'https://gamification.espinasse.ch',
    siteName: 'Gamification Éthique',
    title: 'Gamification Éthique',
    description:
      "Framework permettant d'évaluer les risques éthiques des mécaniques de gamification avant leur intégration dans une interface numérique.",
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Gamification Éthique',
    description:
      "Framework permettant d'évaluer les risques éthiques des mécaniques de gamification.",
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={lexend.variable}>
      <body
        className="flex min-h-screen flex-col"
        style={{
          background: `
            radial-gradient(circle at top left, rgba(217,208,227,0.65) 0%, transparent 36%),
            radial-gradient(circle at bottom right, rgba(231,225,218,0.85) 0%, transparent 42%),
            #F8F4EF
          `,
          backgroundAttachment: 'fixed',
        }}
      >
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}