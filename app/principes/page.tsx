import type { Metadata } from 'next'
import Link from 'next/link'
import { principles } from '@/data/principles'
import { PrincipleCard } from '@/components/principes/PrincipleCard'

export const metadata: Metadata = {
  title: 'Principes',
  description: `Les huit principes d'une gamification éthique qui servent de repères concrets pour la conception et les recommandations.`,
}

export default function PrincipesPage() {
  return (
    <div className="flex flex-col">

      {/* ── Introduction ──────────────────────────────────────────────────── */}
      <section aria-labelledby="principes-heading" className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-primary/60">
            Principes
          </p>
          <h1
            id="principes-heading"
            className="mb-6 text-4xl font-semibold leading-tight text-foreground md:text-5xl"
          >
            Les principes d'une
            <br />
            <span className="text-primary">gamification éthique</span>
          </h1>
          <p className="text-base leading-relaxed text-foreground/80">
            Ces huit principes constituent le cadre de référence de l'outil.
            Chacun correspond à une dimension éthique à considérer lors de
            la conception d'une expérience gamifiée. Ils servent à relier
            les recommandations à des repères concrets de conception.
          </p>
        </div>
      </section>

      {/* ── Grille ────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="grille-heading"
        className="w-full"
        style={{ background: 'rgba(231,225,218,0.35)' }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 id="grille-heading" className="sr-only">Liste des principes</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principe) => (
              <li key={principe.slug}>
                <PrincipleCard principe={principe} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Pourquoi ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="pourquoi-heading" className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
          <div>
            <h2 id="pourquoi-heading" className="mb-5 text-3xl font-semibold text-foreground">
              Pourquoi ces principes ?
            </h2>
            <div className="flex flex-col gap-4 text-base leading-relaxed text-foreground/80">
              <p>
                Ces principes ne sont pas des règles absolues à suivre à la
                lettre. Ils servent de repères pour nommer les risques, arbitrer
                les choix d'interface et justifier les recommandations auprès
                d'une équipe ou d'un client.
              </p>
              <p>
                Chaque recommandation générée par l'outil est liée à un principe.
                Cela permet de comprendre d'où vient la recommandation, à quelle
                dimension éthique elle répond, et comment l'approfondir.
              </p>
              <p>
                Les principes sont aussi utiles en dehors de l'outil : ils peuvent
                servir de base pour une revue de conception, un brief client ou
                une discussion en équipe sur les compromis à faire.
              </p>
            </div>
          </div>

          <aside
            aria-label="Navigation vers l'évaluation"
            className="flex flex-col gap-4 rounded-2xl p-6 lg:self-start"
            style={{ background: 'rgba(231,225,218,0.5)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
          >
            <p className="text-base font-semibold text-foreground">Ces principes dans l'outil</p>
            <p className="text-sm leading-relaxed text-foreground/70">
              Dans les résultats de l'évaluation, chaque recommandation
              affiche un lien vers le principe associé. Vous pouvez
              approfondir un point précis directement depuis la page résultats.
            </p>
            <div
              className="flex flex-col gap-2 pt-4"
              style={{ borderTop: '1px solid rgba(217,208,227,0.6)' }}
            >
              <Link
                href="/evaluation"
                className={[
                  'inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold',
                  'bg-primary text-primary-foreground transition-opacity hover:opacity-90',
                  'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
                ].join(' ')}
              >
                Lancer l'évaluation
              </Link>
              <Link
                href="/comprendre"
                className={[
                  'inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground/70',
                  'transition-colors hover:bg-white/60 hover:text-foreground',
                  'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
                ].join(' ')}
              >
                Comprendre la démarche
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}