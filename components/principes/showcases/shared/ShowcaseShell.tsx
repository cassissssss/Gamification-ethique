import { ArrowRight } from 'lucide-react'

interface ShowcaseShellProps {
  /** Phrase d'intro au-dessus du bloc. Omise si le contexte l'explique déjà. */
  intro?: string
  /** Contenu de l'écran de gauche (état initial). */
  before: React.ReactNode
  /** Contenu de l'écran de droite (après application du principe). */
  after: React.ReactNode
  /** Libellés au-dessus de chaque écran. */
  beforeLabel?: string
  afterLabel?: string
  /** Légende des principes illustrés, affichée juste au-dessus des écrans. */
  legend?: React.ReactNode
  /**
   * Quand true : les labels passent au-dessus de la zone violette (plutôt
   * que dedans), et les écrans s'alignent pile sur ses bords haut/bas —
   * utile quand l'écran lui-même n'a pas de bordure haute/basse et doit se
   * fondre avec le contour de la zone (effet "recadré").
   */
  flush?: boolean
  /** Largeur des écrans en px, utilisée pour centrer les labels au-dessus en mode flush. */
  cardWidth?: number
  /**
   * Ajoute un padding bas symétrique au padding haut (mode par défaut
   * uniquement) — à activer au cas par cas quand l'écran a besoin de plus
   * d'air en dessous, sans changer le comportement des autres fiches.
   */
  extraBottomSpace?: boolean
}

/**
 * Coquille partagée par tous les mockups "En pratique" des fiches principes.
 * Chaque fiche ne fournit que son propre contenu (before/after) — la phrase
 * d'intro, les labels, le fond et la flèche de transformation sont communs,
 * pour éviter de dupliquer cette structure sur les 8 principes.
 */
export function ShowcaseShell({
  intro,
  before,
  after,
  beforeLabel = 'Interface initiale',
  afterLabel = 'Application du principe',
  legend,
  flush = false,
  cardWidth = 320,
  extraBottomSpace = false,
}: ShowcaseShellProps) {
  if (flush) {
    return (
      <div>
        {intro && <p className="mb-4 max-w-lg text-sm leading-relaxed text-foreground/70">{intro}</p>}
        {legend && <div className="mb-5">{legend}</div>}

        <div className="flex flex-nowrap items-start justify-center gap-6">
          <p
            className="shrink-0 text-center text-xs font-medium tracking-wide text-foreground/40"
            style={{ width: cardWidth }}
          >
            {beforeLabel}
          </p>
          <span className="w-4 shrink-0" aria-hidden="true" />
          <p
            className="shrink-0 text-center text-xs font-medium tracking-wide text-foreground/40"
            style={{ width: cardWidth }}
          >
            {afterLabel}
          </p>
        </div>

        <div className="mt-3 flex flex-nowrap justify-center gap-6 rounded-3xl bg-[rgba(217,208,227,0.4)] px-6">
          <div className="shrink-0">{before}</div>
          <div className="shrink-0 self-center" aria-hidden="true">
            <ArrowRight className="h-4 w-4 text-foreground/25" />
          </div>
          <div className="shrink-0">{after}</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {intro && <p className="mb-4 max-w-lg text-sm leading-relaxed text-foreground/70">{intro}</p>}
      {legend && <div className="mb-5">{legend}</div>}

      <div className={`flex flex-nowrap items-start justify-center gap-6 rounded-3xl bg-[rgba(217,208,227,0.4)] px-6 pt-8 ${extraBottomSpace ? 'pb-8' : ''}`}>
        <div className="shrink-0">
          <p className="mb-3 text-center text-xs font-medium tracking-wide text-foreground/40">
            {beforeLabel}
          </p>
          {before}
        </div>

        <div className="shrink-0 self-center pt-8" aria-hidden="true">
          <ArrowRight className="h-4 w-4 text-foreground/25" />
        </div>

        <div className="shrink-0">
          <p className="mb-3 text-center text-xs font-medium tracking-wide text-foreground/40">
            {afterLabel}
          </p>
          {after}
        </div>
      </div>
    </div>
  )
}
