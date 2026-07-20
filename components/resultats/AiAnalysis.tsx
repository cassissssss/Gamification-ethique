'use client'

import { useState } from 'react'
import { AlertCircle,  ChevronDown,  ChevronUp,  Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { EvaluationResult } from '@/logic/evaluation.types'

interface AiAnalysisProps {
  result: EvaluationResult
}

type AnalysisState = 'idle' | 'loading' | 'success' | 'error'

const SECTION_TITLES = [
  'Lecture du résultat', 
  'Angles morts possibles', 
  'Questions à poser', 
  'Ajustements UX', 
  'Points à vérifier', 
]

function parseSection(text: string,  sectionNumber: number): string | null {
  const patterns = [
    new RegExp(`${sectionNumber}\\..+?\\n([\\s\\S]*?)(?=\\n${sectionNumber + 1}\\.|$)`), 
    new RegExp(`${sectionNumber}\\..+?\\n([\\s\\S]*?)(?=\\n\\n${sectionNumber + 1}|$)`), 
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)

    if (match?.[1]) {
      return match[1].trim()
    }
  }

  return null
}

function AnalysisSection({
  title, 
  content, 
}: {
  title: string
  content: string
}) {
  return (
    <article className="rounded-2xl bg-white/70 p-5 ring-1 ring-primary/10">
      <h4 className="mb-2 text-sm font-semibold text-primary">{title}</h4>

      <div className="whitespace-pre-line text-sm leading-relaxed text-foreground/75">
        {content}
      </div>
    </article>
  )
}

export function AiAnalysis({ result }: AiAnalysisProps) {
  const [state,  setState] = useState<AnalysisState>('idle')
  const [analysis,  setAnalysis] = useState<string | null>(null)
  const [errorMsg,  setErrorMsg] = useState<string | null>(null)
  const [isMock,  setIsMock] = useState(false)
  const [collapsed,  setCollapsed] = useState(false)

  async function handleLaunch() {
    setState('loading')
    setErrorMsg(null)

    try {
      const response = await fetch('/api/analyse-ia',  {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ result }), 
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMsg(data.error ?? `Une erreur est survenue (${response.status}).`)
        setState('error')
        return
      }

      setAnalysis(data.analysis)
      setIsMock(data.mock === true)
      setState('success')
      setCollapsed(false)
    } catch {
      setErrorMsg('Impossible de contacter le serveur. Vérifiez votre connexion.')
      setState('error')
    }
  }

  const sections = analysis
    ? SECTION_TITLES.map((title,  index) => ({
        title, 
        content: parseSection(analysis,  index + 1) ?? '', 
      })).filter((section) => section.content.length > 0)
    : []

  return (
    <section
      aria-labelledby="ai-heading"
      className="rounded-[2rem] bg-[#D9D0E3]/45 p-6 ring-1 ring-primary/15"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary/60">
            IA
          </p>

          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-primary" aria-hidden="true" />

            <h2 id="ai-heading" className="text-2xl font-semibold text-foreground">
              Reformulation par IA
            </h2>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/70">
            L’IA intervient après le résultat du questionnaire. Elle peut aider à
            reformuler les points importants,  préparer une synthèse client et
            proposer des questions à vérifier.
          </p>
        </div>

        {state === 'success' && (
          <button
            type="button"
            onClick={() => setCollapsed((current) => !current)}
            aria-label={collapsed ? 'Déplier l’analyse IA' : 'Réduire l’analyse IA'}
            className="rounded-xl p-2 text-foreground/50 transition hover:bg-white/50 hover:text-foreground"
          >
            {collapsed ? (
              <ChevronDown size={18} aria-hidden="true" />
            ) : (
              <ChevronUp size={18} aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      <div className="mt-6">
        {state === 'idle' && (
          <div className="grid gap-5 rounded-3xl bg-white/60 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold text-foreground">
                Ce que l’IA recevra
              </p>

              <ul className="flex flex-col gap-1 text-sm leading-relaxed text-foreground/65">
                <li>• Résultat principal : {result.globalOrientation.title}</li>
                <li>• {result.contradictions.length} point(s) à clarifier</li>
                <li>
                  • {result.riskThemes.filter((theme) => theme.level !== 'none').length}{' '}
                  thématique(s) en vigilance
                </li>
                <li>• {result.mechanicsAlternatives.length} mécanique(s) à adapter</li>
                <li>• {result.positiveRecommendations.length} piste(s) générée(s)</li>
              </ul>
            </div>

            <Button
              onClick={handleLaunch}
              className="gap-2 bg-primary text-primary-foreground hover:opacity-90"
            >
              <Sparkles size={15} aria-hidden="true" />
              Lancer l’analyse IA
            </Button>
          </div>
        )}

        {state === 'loading' && (
          <div className="flex items-center gap-3 rounded-3xl bg-white/60 p-5">
            <span
              className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-primary border-t-transparent"
              aria-hidden="true"
            />

            <p className="text-sm text-foreground/70">
              Analyse en cours…
            </p>
          </div>
        )}

        {state === 'error' && (
          <div className="flex flex-col gap-4">
            <div
              role="alert"
              className="flex items-start gap-3 rounded-3xl bg-[var(--color-danger)]/10 p-5 ring-1 ring-[var(--color-danger)]/25"
            >
              <AlertCircle
                size={17}
                className="mt-0.5 shrink-0 text-[var(--color-danger)]"
                aria-hidden="true"
              />

              <p className="text-sm font-medium text-[var(--color-danger)]">
                {errorMsg}
              </p>
            </div>

            <Button
              variant="ghost"
              onClick={handleLaunch}
              className="self-start text-foreground/70 hover:bg-white/50"
            >
              Réessayer
            </Button>
          </div>
        )}

        {state === 'success' && !collapsed && (
          <div className="flex flex-col gap-5">
            {isMock && (
              <div className="rounded-2xl bg-white/65 p-4 ring-1 ring-primary/15">
                <p className="text-sm leading-relaxed text-foreground/70">
                  Analyse simulée : aucune clé API n’est configurée. Le bloc
                  permet de tester l’interface avant le branchement réel.
                </p>
              </div>
            )}

            {sections.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {sections.map((section) => (
                  <AnalysisSection
                    key={section.title}
                    title={section.title}
                    content={section.content}
                  />
                ))}
              </div>
            ) : (
              <article className="rounded-2xl bg-white/70 p-5 ring-1 ring-primary/10">
                <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/75">
                  {analysis}
                </p>
              </article>
            )}

            <Button
              variant="ghost"
              onClick={handleLaunch}
              className="self-start gap-2 text-sm text-foreground/60 hover:bg-white/50"
            >
              <Sparkles size={13} aria-hidden="true" />
              Relancer l’analyse
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}