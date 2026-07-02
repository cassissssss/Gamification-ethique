import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { principles } from '@/data/principles'
import { tagDefinitions } from '@/data/tags'
import type { Tag } from '@/types'

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

function TagBadge({ tag }: { tag: Tag }) {
  const definition = tagDefinitions.find((d) => d.tag === tag)
  if (!definition) return null
  return (
    <span
      title={definition.description}
      className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-primary"
      style={{
        background: 'rgba(217,208,227,0.5)',
        boxShadow:  '0 0 0 1px rgba(74,45,87,0.15)',
      }}
    >
      {definition.label}
    </span>
  )
}

export default async function PrincipleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug }   = await params
  const principe   = principles.find((p) => p.slug === slug)
  if (!principe) notFound()

  const currentIndex = principles.findIndex((p) => p.slug === slug)
  const prevPrincipe = principles[currentIndex - 1] ?? null
  const nextPrincipe = principles[currentIndex + 1] ?? null
  const paragraphs   = principe.content.split('\n\n').map((p) => p.trim()).filter(Boolean)

  return (
    <div className="flex flex-col">

      {/* ── En-tête ───────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="principe-heading"
        className="w-full"
        style={{ background: 'rgba(231,225,218,0.4)' }}
      >
        <div className="mx-auto max-w-6xl px-6 py-14">
          <Link
            href="/principes"
            className={[
              'mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60',
              'transition-colors hover:text-primary',
              'focus-visible:rounded focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
            ].join(' ')}
          >
            ← Tous les principes
          </Link>
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary/60">
              Principe
            </p>
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

            {/* Contenu long */}
            <section aria-labelledby="contenu-heading">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/40">
                Ce principe signifie que…
              </p>
              <div className="flex flex-col gap-4">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-base leading-relaxed text-foreground/80">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Exemples */}
            {principe.examples && principe.examples.length > 0 && (
              <section aria-labelledby="exemples-heading">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/40">
                  Exemples de bonnes pratiques
                </p>
                <h2 id="exemples-heading" className="mb-6 text-2xl font-semibold text-foreground">
                  Exemples
                </h2>
                <ul className="flex flex-col gap-3">
                  {principe.examples.map((example, index) => (
                    <li
                      key={index}
                      className="flex gap-4 rounded-2xl p-4"
                      style={{ background: 'rgba(255,255,255,0.65)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
                    >
                      <span className="mt-0.5 shrink-0 text-sm font-semibold text-primary" aria-hidden="true">✓</span>
                      <p className="text-sm leading-relaxed text-foreground/80">{example}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Risques */}
            {principe.risks && principe.risks.length > 0 && (
              <section aria-labelledby="risques-heading">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/40">
                  Points de vigilance
                </p>
                <h2 id="risques-heading" className="mb-6 text-2xl font-semibold text-foreground">
                  Risques à surveiller
                </h2>
                <ul className="flex flex-col gap-3">
                  {principe.risks.map((risk, index) => (
                    <li
                      key={index}
                      className="flex gap-4 rounded-2xl p-4"
                      style={{
                        background: 'rgba(181,98,10,0.06)',
                        boxShadow:  '0 0 0 1px rgba(181,98,10,0.15)',
                      }}
                    >
                      <span
                        className="mt-0.5 shrink-0 text-sm font-semibold"
                        style={{ color: 'var(--color-warning)' }}
                        aria-hidden="true"
                      >
                        ⚠
                      </span>
                      <p className="text-sm leading-relaxed text-foreground/80">{risk}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Navigation précédent / suivant */}
            <nav
              aria-label="Navigation entre les principes"
              className="grid gap-3 pt-8 sm:grid-cols-2"
              style={{ borderTop: '1px solid rgba(217,208,227,0.6)' }}
            >
              {prevPrincipe ? (
                <Link
                  href={`/principes/${prevPrincipe.slug}`}
                  className={[
                    'flex flex-col gap-1.5 rounded-2xl p-4',
                    'transition-all hover:shadow-md',
                    'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  ].join(' ')}
                  style={{ background: 'rgba(255,255,255,0.55)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
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
                  style={{ background: 'rgba(255,255,255,0.55)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
                >
                  <span className="text-xs text-foreground/50">Principe suivant →</span>
                  <span className="text-sm font-semibold text-primary">{nextPrincipe.title}</span>
                </Link>
              ) : <div />}
            </nav>
          </div>

          {/* ── Colonne latérale ────────────────────────────────────────── */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-24">

            {/* Tags associés */}
            {principe.relatedTags && principe.relatedTags.length > 0 && (
              <div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(231,225,218,0.5)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
              >
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/50">
                  Tags associés
                </p>
                <div className="flex flex-wrap gap-2">
                  {principe.relatedTags.map((tag) => <TagBadge key={tag} tag={tag} />)}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-foreground/60">
                  Ces tags peuvent être activés lors de l'évaluation si les
                  réponses correspondent aux risques décrits par ce principe.
                </p>
              </div>
            )}

            {/* CTA */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'rgba(231,225,218,0.5)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
            >
              <p className="mb-2 text-base font-semibold text-foreground">Évaluer votre projet</p>
              <p className="mb-5 text-sm leading-relaxed text-foreground/70">
                Ce principe est intégré dans le framework d'évaluation.
                Répondez au questionnaire pour obtenir un verdict et des
                recommandations adaptés à votre projet.
              </p>
              <div className="flex flex-col gap-2">
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
                  href="/principes"
                  className={[
                    'inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground/70',
                    'transition-colors hover:bg-white/50 hover:text-foreground',
                    'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  ].join(' ')}
                >
                  Voir tous les principes
                </Link>
              </div>
            </div>

            {/* Index */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'rgba(231,225,218,0.5)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
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