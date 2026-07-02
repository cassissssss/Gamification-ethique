import type { Metadata } from 'next'
import { EvaluationGuide } from '@/components/evaluation/EvaluationGuide'
import { Questionnaire }   from '@/components/evaluation/Questionnaire'

export const metadata: Metadata = {
  title: 'Évaluation éthique',
  description: `Évaluez les mécaniques de gamification de votre projet à travers un questionnaire structuré par sections.`,
}

export default function EvaluationPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section aria-labelledby="evaluation-heading" className="mb-14">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary/60">
          Outil d'évaluation
        </p>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-xl">
            <h1
              id="evaluation-heading"
              className="mb-3 text-3xl font-semibold text-foreground md:text-4xl"
            >
              Évaluation éthique
            </h1>
            <p className="text-base leading-relaxed text-foreground/80">
              Répondez aux questions suivantes selon votre projet. Le questionnaire
              est organisé en six sections. Vos réponses génèrent un verdict
              structuré et des recommandations concrètes.
            </p>
          </div>
          <EvaluationGuide />
        </div>
      </section>
      <Questionnaire />
    </div>
  )
}