'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { verdicts } from '@/data/verdicts'
import type { VerdictLevel,  VerdictTone } from '@/types/principle'

// Ordre d'affichage en échelle : du plus préoccupant au plus favorable , 
// donne une vraie hiérarchie de lecture plutôt qu'une liste plate.
const VERDICT_SCALE_ORDER: VerdictLevel[] = [
  'gamification_deconseillee', 
  'retour_cadrage', 
  'gamification_sous_conditions', 
  'gamification_legere', 
  'gamification_pertinente', 
]

// Résumé d'une phrase par verdict, répond à « quand ce niveau sort-il ? »
// sans avoir à lire la description complète pour s'en faire une idée.
const VERDICT_WHEN: Record<VerdictLevel,  string> = {
  gamification_deconseillee:     'Risques éthiques majeurs', 
  retour_cadrage:                'Informations insuffisantes', 
  gamification_sous_conditions:  'Ajustements nécessaires', 
  gamification_legere:           'Peu de risques', 
  gamification_pertinente:       'Contexte favorable', 
}

const toneColor: Record<VerdictTone,  string> = {
  neutral:  '#4A2D57', 
  positive: 'var(--color-positive)', 
  warning:  'var(--color-warning)', 
  danger:   'var(--color-danger)', 
  info:     'var(--color-info)', 
}

export function VerdictsAccordion() {
  const [openLevel,  setOpenLevel] = useState<VerdictLevel | null>(null)

  return (
    <ul className="rounded-3xl border border-border bg-white/60 px-6">
      {VERDICT_SCALE_ORDER.map((level) => {
        const verdict = verdicts.find((v) => v.level === level)
        if (!verdict) return null

        const isOpen = openLevel === level

        return (
          <li key={level} className="border-b border-border last:border-b-0">
            <button
              type="button"
              onClick={() => setOpenLevel(isOpen ? null : level)}
              aria-expanded={isOpen}
              aria-controls={`verdict-panel-${level}`}
              className={[
                'flex w-full items-center gap-4 py-5 text-left', 
                'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary', 
              ].join(' ')}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: toneColor[verdict.tone] }}
                aria-hidden="true"
              />
              <span
                className="w-48 shrink-0 text-base font-semibold sm:w-56"
                style={{ color: toneColor[verdict.tone] }}
              >
                {verdict.label}
              </span>
              <span className="flex-1 text-sm text-foreground/60">
                {VERDICT_WHEN[level]}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-foreground/40 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            {isOpen && (
              <div id={`verdict-panel-${level}`} className="pb-5 pl-[1.625rem]">
                <p className="max-w-2xl text-sm leading-relaxed text-foreground/80">
                  {verdict.description}
                </p>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
