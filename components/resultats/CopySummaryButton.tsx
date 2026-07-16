'use client'

import { useState } from 'react'
import { Check, Copy, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buildResultSummary } from '@/lib/evaluation/result-summary'
import type { VerdictLevel, Tag, Recommendation } from '@/types/principle'

type CopyState = 'idle' | 'success' | 'error'

interface CopySummaryButtonProps {
  verdict:         VerdictLevel
  tags:            Tag[]
  recommendations: Recommendation[]
}

export function CopySummaryButton({ verdict, tags, recommendations }: CopySummaryButtonProps) {
  const [copyState, setCopyState] = useState<CopyState>('idle')

  async function handleCopy() {
    const summary = buildResultSummary(verdict, tags, recommendations)
    try {
      await navigator.clipboard.writeText(summary)
      setCopyState('success')
    } catch {
      setCopyState('error')
    } finally {
      setTimeout(() => setCopyState('idle'), 3000)
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Button
        variant="ghost"
        onClick={handleCopy}
        disabled={copyState === 'success'}
        className={[
          'gap-2 text-foreground/70 text-sm font-semibold',
          'hover:bg-white/60 hover:text-foreground',
          'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
          'disabled:opacity-60',
        ].join(' ')}
      >
        {copyState === 'success' ? (
          <>
            <Check size={15} aria-hidden="true" />
            Résumé copié
          </>
        ) : copyState === 'error' ? (
          <>
            <AlertCircle size={15} aria-hidden="true" />
            Échec de la copie
          </>
        ) : (
          <>
            <Copy size={15} aria-hidden="true" />
            Copier le résumé
          </>
        )}
      </Button>

      {copyState === 'error' && (
        <p className="text-sm text-[var(--color-danger)]" role="alert">
          La copie a échoué. Vérifiez les permissions du navigateur.
        </p>
      )}
    </div>
  )
}