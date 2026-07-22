import type { Metadata } from 'next'
import Link from 'next/link'
import { ResourcesList } from '@/components/ressources/ResourcesList'

export const metadata: Metadata = {
  title: 'Ressources',
  description: `Les sources théoriques, articles et études de cas qui ont servi de base au framework d'évaluation éthique de gamification.`,
}

export default function RessourcesPage() {
  return (
    <div className="flex flex-col">

      {/* ── Introduction ──────────────────────────────────────────────────── */}
      <section aria-labelledby="ressources-heading" className="mx-auto w-full max-w-[68rem] px-6 py-20">
        <div className="max-w-2xl">
          <h1
            id="ressources-heading"
            className="mb-6 text-4xl font-semibold leading-tight text-foreground md:text-5xl"
          >
            Une bibliothèque de
            <br />
            <span className="text-primary">ressources</span>
          </h1>
          <p className="text-base leading-relaxed text-foreground/80">
            Que vous souhaitiez comprendre les fondements du framework ou approfondir certains sujets, 
            cette page rassemble les ressources qui ont contribué à la réalisation du questionnaire.
            

          </p>
        </div>
      </section>

      {/* ── Liste filtrable ───────────────────────────────────────────────── */}
      <section aria-labelledby="liste-heading" className="mx-auto w-full max-w-[68rem] px-6 py-16">
        <h2 id="liste-heading" className="sr-only">Liste des ressources</h2>
        <ResourcesList />
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="cta-ressources-heading" className="w-full py-4">
        <div className="mx-auto max-w-[56rem] px-6">
          <div
            className="rounded-[2rem] px-8 py-16 text-center sm:px-16"
            style={{ background: 'rgba(74,45,87,0.06)' }}
          >
            <h2
              id="cta-ressources-heading"
              className="text-3xl font-semibold leading-tight text-foreground md:text-4xl"
            >
              Voir comment ces sources
              <br />
              nourrissent l'outil
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-foreground/70">
              Chaque principe du framework est directement relié à une ou
              plusieurs de ces références.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/principes"
                className={[
                  'inline-flex items-center rounded-xl px-8 py-4 text-base font-semibold',
                  'bg-primary text-primary-foreground transition-opacity hover:opacity-90',
                  'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
                ].join(' ')}
              >
                Voir les principes
              </Link>
              <Link
                href="/evaluation"
                className={[
                  'inline-flex items-center rounded-xl px-8 py-4 text-base font-semibold text-primary',
                  'transition-all hover:bg-white/60',
                  'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
                ].join(' ')}
                style={{ boxShadow: '0 0 0 1.5px rgba(74,45,87,0.4)' }}
              >
                Lancer l'évaluation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
