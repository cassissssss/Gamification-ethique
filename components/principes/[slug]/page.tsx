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

  return {
    title: principe.title,
    description: principe.shortDescription,
  }
}

function TagBadge({ tag }: { tag: Tag }) {
  const definition = tagDefinitions.find((t) => t.tag === tag)
  if (!definition) return null

  return (
    <span className="inline-flex items-center rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-primary">
      {definition.label}
    </span>
  )
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

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">

      {/* Fil d'Ariane */}
      <nav
        aria-label="Fil d'Ariane"
        className="mb-10 flex items-center gap-2 text-xs text-foreground/50"
      >
        <Link href="/principes" className="transition-colors hover:text-primary">
          Principes
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-foreground/80">{principe.title}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-[1fr_280px]">

        {/* Contenu principal */}
        <article aria-labelledby="principe-heading">

          {/* En-tête */}
          <header className="mb-10">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary/70">
              Principe
            </p>
            <h1
              id="principe-heading"
              className="mb-4 text-3xl font-semibold text-foreground md:text-4xl"
            >
              {principe.title}
            </h1>
            <p className="text-lg leading-relaxed text-foreground/80">
              {principe.shortDescription}
            </p>
          </header>

          {/* Contenu long */}
          <section aria-labelledby="contenu-heading" className="mb-10">
            <h2
              id="contenu-heading"
              className="mb-4 text-lg font-semibold text-foreground"
            >
              Comprendre ce principe
            </h2>
            <div className="flex flex-col gap-4">
              {principe.content.split('\n\n').map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm leading-relaxed text-foreground/80"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Exemples */}
          {principe.examples && principe.examples.length > 0 && (
            <section aria-labelledby="exemples-heading" className="mb-10">
              <h2
                id="exemples-heading"
                className="mb-4 text-lg font-semibold text-foreground"
              >
                Bonnes pratiques
              </h2>
              <ul className="flex flex-col gap-3">
                {principe.examples.map((example, index) => (
                  <li
                    key={index}
                    className="flex gap-3 rounded-lg border border-border bg-secondary p-4 text-sm leading-relaxed text-foreground/80"
                  >
                    <span
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    {example}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Risques */}
          {principe.risks && principe.risks.length > 0 && (
            <section aria-labelledby="risques-heading" className="mb-10">
              <h2
                id="risques-heading"
                className="mb-4 text-lg font-semibold text-foreground"
              >
                Points de vigilance
              </h2>
              <ul className="flex flex-col gap-3">
                {principe.risks.map((risk, index) => (
                  <li
                    key={index}
                    className="flex gap-3 rounded-lg border border-border bg-background p-4 text-sm leading-relaxed text-foreground/80"
                  >
                    <span
                      className="mt-0.5 shrink-0"
                      style={{ color: 'var(--color-warning)' }}
                      aria-hidden="true"
                    >
                      ⚠
                    </span>
                    {risk}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        {/* Colonne latérale */}
        <aside className="flex flex-col gap-6">

          {/* Tags associés */}
          {principe.relatedTags && principe.relatedTags.length > 0 && (
            <div className="rounded-xl border border-border bg-secondary p-5">
              <h2 className="mb-3 text-sm font-semibold text-foreground">
                Tags associés
              </h2>
              <div className="flex flex-wrap gap-2">
                {principe.relatedTags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
            </div>
          )}

          {/* CTA évaluation */}
          <div className="rounded-xl border border-border bg-secondary p-5">
            <h2 className="mb-2 text-sm font-semibold text-foreground">
              Évaluer votre projet
            </h2>
            <p className="mb-4 text-xs leading-relaxed text-foreground/70">
              Ces principes sont intégrés dans l'outil d'évaluation éthique.
            </p>
            <Link
              href="/evaluation"
              className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Lancer l'évaluation
            </Link>
          </div>
        </aside>
      </div>

      {/* Navigation entre principes */}
      <nav
        aria-label="Navigation entre les principes"
        className="mt-16 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:justify-between"
      >
        {prevPrincipe ? (
          <Link
            href={`/principes/${prevPrincipe.slug}`}
            className="flex flex-col gap-1 rounded-lg border border-border bg-secondary p-4 transition-colors hover:bg-muted sm:max-w-[45%]"
          >
            <span className="text-xs text-foreground/50">← Principe précédent</span>
            <span className="text-sm font-medium text-primary">{prevPrincipe.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextPrincipe ? (
          <Link
            href={`/principes/${nextPrincipe.slug}`}
            className="flex flex-col gap-1 rounded-lg border border-border bg-secondary p-4 text-right transition-colors hover:bg-muted sm:max-w-[45%]"
          >
            <span className="text-xs text-foreground/50">Principe suivant →</span>
            <span className="text-sm font-medium text-primary">{nextPrincipe.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  )
}