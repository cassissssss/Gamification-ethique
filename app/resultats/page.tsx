import type { Metadata } from 'next'
import { ResultsClient } from '@/components/resultats/ResultsClient'

export const metadata: Metadata = {
  title: 'Résultats',
  description: `Résultats de votre évaluation éthique de gamification.`,
}

export default function ResultatsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section aria-labelledby="resultats-heading" className="mb-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary/60">
          Votre évaluation
        </p>
        <h1
          id="resultats-heading"
          className="text-3xl font-semibold text-foreground md:text-4xl"
        >
          Résultats
        </h1>
      </section>
      <ResultsClient />
    </div>
  )
}