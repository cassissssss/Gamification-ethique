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
  title: {
    default: 'Gamification Éthique',
    template: '%s | Gamification Éthique',
  },
  description:
    `Évaluez si une mécanique de gamification est pertinente, risquée ou déconseillée dans votre projet numérique.`,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={lexend.variable}>
      <body
        className="flex min-h-screen flex-col"
        style={{
          background: `
            radial-gradient(circle at top left,     rgba(217,208,227,0.65) 0%, transparent 36%),
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