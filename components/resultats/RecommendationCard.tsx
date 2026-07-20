import Link from 'next/link'
import type { Recommendation } from '@/types/principle'

interface RecommendationCardProps {
  recommendation: Recommendation
  index:          number
}

const priorityConfig: Record<
  Recommendation['priority'], 
  { label: string; dotColor: string; badgeBg: string; badgeColor: string; badgeShadow: string }
> = {
  haute: {
    label:       'Priorité haute', 
    dotColor:    'var(--color-danger)', 
    badgeBg:     'rgba(139, 26, 26, 0.08)', 
    badgeColor:  'var(--color-danger)', 
    badgeShadow: '0 0 0 1px rgba(139, 26, 26, 0.25)', 
  }, 
  moyenne: {
    label:       'Priorité moyenne', 
    dotColor:    'var(--color-warning)', 
    badgeBg:     'rgba(181, 98, 10, 0.08)', 
    badgeColor:  'var(--color-warning)', 
    badgeShadow: '0 0 0 1px rgba(181, 98, 10, 0.25)', 
  }, 
  basse: {
    label:       'Priorité basse', 
    dotColor:    '#9CA3AF', 
    badgeBg:     'rgba(156, 163, 175, 0.12)', 
    badgeColor:  '#6B7280', 
    badgeShadow: '0 0 0 1px rgba(156, 163, 175, 0.3)', 
  }, 
}

export function RecommendationCard({ recommendation,  index }: RecommendationCardProps) {
  const config = priorityConfig[recommendation.priority]

  return (
    <article
      aria-labelledby={`rec-title-${recommendation.id}`}
      className="flex flex-col gap-4 rounded-2xl p-5 transition-all duration-150"
      style={{
        background:  'rgba(255, 255, 255, 0.65)', 
        boxShadow:   '0 1px 4px rgba(0, 0, 0, 0.06)', 
      }}
    >
      {/* En-tête */}
      <div className="flex items-center justify-between gap-3">
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-foreground/60"
          style={{ background: 'rgba(231, 225, 218, 0.8)' }}
          aria-hidden="true"
        >
          {index + 1}
        </span>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            background:  config.badgeBg, 
            color:       config.badgeColor, 
            boxShadow:   config.badgeShadow, 
          }}
          aria-label={config.label}
        >
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: config.dotColor }}
            aria-hidden="true"
          />
          {config.label}
        </span>
      </div>

      {/* Titre */}
      <h3
        id={`rec-title-${recommendation.id}`}
        className="text-base font-semibold leading-snug text-foreground"
      >
        {recommendation.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-foreground/80">
        {recommendation.description}
      </p>

      {/* Lien principe */}
      {recommendation.principleSlug && (
        <div
          className="pt-3"
          style={{ borderTop: '1px solid rgba(217, 208, 227, 0.5)' }}
        >
          <Link
            href={`/principes/${recommendation.principleSlug}`}
            className={[
              'inline-flex items-center gap-1 text-sm font-semibold text-primary', 
              'transition-opacity hover:opacity-70', 
              'focus-visible:rounded focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary', 
            ].join(' ')}
          >
            Voir le principe associé →
          </Link>
        </div>
      )}
    </article>
  )
}