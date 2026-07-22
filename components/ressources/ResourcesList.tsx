'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { resources, resourceCategoryLabels } from '@/data/resources'
import type { Resource, ResourceCategory } from '@/data/resources'
import { principles } from '@/data/principles'

const CATEGORY_ORDER: ResourceCategory[] = [
  'theorie',
  'dark-patterns',
  'recherche-gamification',
  'etudes-de-cas',
]

function ResourceCard({ resource }: { resource: Resource }) {
  const relatedPrincipleTitles = (resource.relatedPrinciples ?? [])
    .map((slug) => principles.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <li
      className="flex flex-col gap-2 rounded-2xl p-5"
      style={{ background: 'rgba(255,255,255,0.65)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
    >
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className={[
          'group inline-flex items-start gap-1.5 text-base font-semibold text-foreground',
          'transition-colors hover:text-primary',
          'focus-visible:rounded focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-primary',
        ].join(' ')}
      >
        <span>{resource.title}</span>
        <ArrowUpRight
          className="mt-1 h-3.5 w-3.5 shrink-0 text-foreground/30 transition-colors group-hover:text-primary"
          aria-hidden="true"
        />
      </a>

      <p className="text-xs text-foreground/50">
        {resource.authors}
        {resource.year ? ` · ${resource.year}` : ''}
        {resource.source ? ` — ${resource.source}` : ''}
      </p>

      {relatedPrincipleTitles.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1.5">
          {relatedPrincipleTitles.map((p) => (
            <Link
              key={p.slug}
              href={`/principes/${p.slug}`}
              className={[
                'rounded-full px-2.5 py-1 text-xs font-medium text-primary transition-colors',
                'hover:bg-primary/10',
              ].join(' ')}
              style={{ background: 'rgba(74,45,87,0.06)' }}
            >
              {p.title}
            </Link>
          ))}
        </div>
      )}
    </li>
  )
}

export function ResourcesList() {
  const [activeCategory, setActiveCategory] = useState<ResourceCategory | 'all'>('all')

  const visibleCategories = activeCategory === 'all' ? CATEGORY_ORDER : [activeCategory]

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          aria-pressed={activeCategory === 'all'}
          className={[
            'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
            activeCategory === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-foreground/[0.05] text-foreground/60 hover:bg-foreground/[0.09]',
          ].join(' ')}
        >
          Tout ({resources.length})
        </button>
        {CATEGORY_ORDER.map((category) => {
          const count = resources.filter((r) => r.category === category).length
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={[
                'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-foreground/[0.05] text-foreground/60 hover:bg-foreground/[0.09]',
              ].join(' ')}
            >
              {resourceCategoryLabels[category]} ({count})
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-12">
        {visibleCategories.map((category) => {
          const items = resources.filter((r) => r.category === category)
          if (items.length === 0) return null

          return (
            <section key={category} aria-labelledby={`category-${category}`}>
              <h2
                id={`category-${category}`}
                className="mb-4 text-xl font-semibold text-foreground"
              >
                {resourceCategoryLabels[category]}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {items.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}
