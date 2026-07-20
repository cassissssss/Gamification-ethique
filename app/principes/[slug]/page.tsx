import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { principles } from '@/data/principles'
import {
  Lightbulb,
  BookOpen,
  LibraryBig,
} from 'lucide-react'
import { PrincipleExample } from '@/components/principes/PrincipleExample'
import { ProgressionShowcase } from '@/components/principes/ProgressionShowcase'
import { RareteUrgenceShowcase } from '@/components/principes/RareteUrgenceShowcase'
import { TransparenceShowcase } from '@/components/principes/TransparenceShowcase'
import { AutonomieShowcase } from '@/components/principes/AutonomieShowcase'
import { FeedbackShowcase } from '@/components/principes/FeedbackShowcase'
import { RecompensesShowcase } from '@/components/principes/RecompensesShowcase'
import { ComparaisonSocialeShowcase } from '@/components/principes/ComparaisonSocialeShowcase'
import { ChoixContraintShowcase } from '@/components/principes/ChoixContraintShowcase'

export async function generateStaticParams() {
  return principles.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const principe = principles.find((p) => p.slug === slug)
  if (!principe) return { title: 'Principe introuvable' }
  return { title: principe.title, description: principe.shortDescription }
}

export default async function PrincipleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const principe = principles.find((p) => p.slug === slug)
  if (!principe) notFound()

  const currentIndex = principles.findIndex((p) => p.slug === slug)
  const prevPrincipe = principles[currentIndex - 1] ?? null
  const nextPrincipe = principles[currentIndex + 1] ?? null
  const paragraphs = principe.content.split('\n\n').map((p) => p.trim()).filter(Boolean)

  return (
    <div className="flex flex-col">

      {/* ── En-tête ───────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="principe-heading"
        className="w-full"
        style={{ background: 'rgba(231, 225, 218, 0.4)' }}
      >
        <div className="mx-auto max-w-6xl px-6 py-14">

          {/* Fil d'Ariane */}
          <nav
            aria-label="Fil d'Ariane"
            className="mb-8 flex items-center gap-2 text-xs text-foreground/50"
          >
            <Link href="/principes" className="transition-colors hover:text-primary">
              Principes
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-foreground/80">{principe.title}</span>
          </nav>

          <div className="max-w-2xl">
            <h1
              id="principe-heading"
              className="mb-5 text-4xl font-semibold leading-tight text-foreground md:text-5xl"
            >
              {principe.title}
            </h1>
            <p className="text-lg leading-relaxed text-foreground/80">
              {principe.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* ── Contenu ───────────────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-16 lg:grid-cols-[1fr_300px] lg:items-start">

          {/* Colonne principale */}
          <div className="flex flex-col gap-14">

            {/* En pratique — l'élément central de la page. La définition
                complète (3 paragraphes) est réduite à 1-2 phrases en légende
                sous la démo : la démo montre déjà "pourquoi", le texte n'a
                plus qu'à nommer le principe, pas à le ré-expliquer. */}
            <section aria-labelledby="en-pratique-heading">
              <div className="mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <h2
                  id="en-pratique-heading"
                  className="text-2xl font-semibold text-foreground"
                >
                  En pratique
                </h2>
              </div>
              <p className="mb-6 max-w-2xl text-base leading-relaxed text-foreground/70">
                {paragraphs[0]}
              </p>
              {principe.slug === 'progression' ? (
                <ProgressionShowcase />
              ) : principe.slug === 'rarete-urgence' ? (
                <RareteUrgenceShowcase />
              ) : principe.slug === 'transparence' ? (
                <TransparenceShowcase />
              ) : principe.slug === 'autonomie' ? (
                <AutonomieShowcase />
              ) : principe.slug === 'feedback' ? (
                <FeedbackShowcase />
              ) : principe.slug === 'recompenses' ? (
                <RecompensesShowcase />
              ) : principe.slug === 'comparaison-sociale' ? (
                <ComparaisonSocialeShowcase />
              ) : principe.slug === 'choix-contraint' ? (
                <ChoixContraintShowcase />
              ) : (
                <PrincipleExample slug={principe.slug} />
              )}
            </section>

            {/* Pourquoi c'est important — allégé visuellement (callout
                compact, pas une section à part entière) : la démo a déjà
                montré l'essentiel, ceci n'ajoute que le fondement théorique. */}
            <section aria-labelledby="importance-heading" className="border-l-2 border-border pl-5">
              <p
                id="importance-heading"
                className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/40"
              >
                Pourquoi c'est important
              </p>
              <p className="text-sm leading-relaxed text-foreground/70">{principe.why}</p>
            </section>

            {/* Passez à l'évaluation — la question d'évaluation et le CTA
                réunis en un seul bloc de clôture, au lieu d'être éclatés
                entre le bas de la colonne et la sidebar. */}
            <section
              aria-labelledby="evaluation-heading"
              className="rounded-2xl p-6"
              style={{ background: 'rgba(74, 45, 87, 0.06)', boxShadow: '0 0 0 1px rgba(74, 45, 87, 0.15)' }}
            >
              <div className="flex gap-4">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p
                    id="evaluation-heading"
                    className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary/70"
                  >
                    Question d'évaluation
                  </p>
                  <p className="text-base font-medium leading-relaxed text-foreground">
                    {principe.evaluationQuestion}
                  </p>
                </div>
              </div>
              <Link
                href="/evaluation"
                className={[
                  'mt-5 inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold',
                  'bg-primary text-primary-foreground transition-opacity hover:opacity-90',
                  'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
                ].join(' ')}
              >
                Lancer l'évaluation
              </Link>
            </section>

            {/* Références */}
            <section aria-labelledby="references-heading">
              <div className="mb-4 flex items-center gap-2">
                <LibraryBig className="h-4 w-4 text-primary" />
                <h2 id="references-heading" className="text-lg font-semibold text-foreground">
                  Références
                </h2>
              </div>
              <ul className="flex flex-col gap-4">
                {principe.references.map((ref, index) => (
                  <li key={index} className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium text-foreground/50">
                      {ref.authors} · {ref.year}
                    </span>
                    {ref.url ? (
  <a
    href={ref.url}
    className="text-sm font-semibold text-foreground underline decoration-foreground/20 underline-offset-2 hover:text-primary"
    target="_blank"
    rel="noreferrer"
  >
    {ref.title}
  </a>
) : (
  <span className="text-sm font-semibold text-foreground">{ref.title}</span>
)}
                  </li>
                ))}
              </ul>
            </section>

            {/* Navigation précédent / suivant */}
            <nav
              aria-label="Navigation entre les principes"
              className="grid gap-3 pt-8 sm:grid-cols-2"
              style={{ borderTop: '1px solid rgba(217, 208, 227, 0.6)' }}
            >
              {prevPrincipe ? (
                <Link
                  href={`/principes/${prevPrincipe.slug}`}
                  className={[
                    'flex flex-col gap-1.5 rounded-2xl p-4',
                    'transition-all hover:shadow-md',
                    'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  ].join(' ')}
                  style={{ background: 'rgba(255, 255, 255, 0.55)', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
                >
                  <span className="text-xs text-foreground/50">← Principe précédent</span>
                  <span className="text-sm font-semibold text-primary">{prevPrincipe.title}</span>
                </Link>
              ) : <div />}

              {nextPrincipe ? (
                <Link
                  href={`/principes/${nextPrincipe.slug}`}
                  className={[
                    'flex flex-col gap-1.5 rounded-2xl p-4 text-right',
                    'transition-all hover:shadow-md',
                    'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  ].join(' ')}
                  style={{ background: 'rgba(255, 255, 255, 0.55)', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
                >
                  <span className="text-xs text-foreground/50">Principe suivant →</span>
                  <span className="text-sm font-semibold text-primary">{nextPrincipe.title}</span>
                </Link>
              ) : <div />}
            </nav>
          </div>

          {/* ── Colonne latérale ────────────────────────────────────────── */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-24">

            {/* Index */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'rgba(231, 225, 218, 0.5)', boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)' }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/50">
                Tous les principes
              </p>
              <nav aria-label="Index des principes">
                <ul className="flex flex-col gap-1">
                  {principles.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/principes/${p.slug}`}
                        aria-current={p.slug === slug ? 'page' : undefined}
                        className={[
                          'block rounded-lg px-3 py-2 text-sm transition-colors',
                          'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-primary',
                          p.slug === slug
                            ? 'font-semibold text-primary bg-[#D9D0E3]/50'
                            : 'text-foreground/70 hover:bg-white/50 hover:text-foreground',
                        ].join(' ')}
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
