import type { Metadata } from 'next'
import { principles } from '@/data/principles'
import { PrincipleCard } from '@/components/principes/PrincipleCard'

export const metadata: Metadata = {
  title: 'Principes',
  description:
    `Les huit principes de gamification éthique qui constituent le cadre de référence de l'outil.`,
}

export default function PrincipesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">

      {/* En-tête */}
      <section aria-labelledby="principes-heading" className="max-w-2xl mb-16">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary/70">
          Les fondements
        </p>
        <h1
          id="principes-heading"
          className="mb-6 text-3xl font-semibold text-foreground md:text-4xl"
        >
          Principes de gamification éthique
        </h1>
        <p className="text-base leading-relaxed text-foreground/80">
          Ces huit principes constituent le cadre de référence de l'outil.
          Chacun correspond à une dimension éthique à considérer lors de la
          conception d'une expérience gamifiée.
        </p>
      </section>

      <section aria-label="Liste des principes">
  <div className="grid gap-6 md:grid-cols-2">
    {principles.map((principle) => (
      <PrincipleCard key={principle.slug} principe={principle} />
    ))}
  </div>
</section>
    </div>
  )
}