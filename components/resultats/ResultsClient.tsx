'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { clearAnswers, loadAnswers } from '@/lib/storage'
import { evaluateAnswers } from '@/logic/evaluationEngine'
import { buildAiPrompt } from '@/lib/evaluation/ai-prompt'
import type {
  ContradictionResult,
  EvaluationAnswers,
  EvaluationResult,
  MechanicAlternative,
  OptionId,
  PositiveRecommendation,
  QuestionId,
  RiskLevel,
  RiskThemeResult,
} from '@/logic/evaluation.types'

interface StoredAnswer {
  questionId: string
  selectedOptionIds: string[]
}

type CopyState = 'idle' | 'success' | 'error'

interface ActionItem {
  id: string
  source: 'contradiction' | 'risk' | 'recommendation' | 'mechanic'
  eyebrow: string
  title: string
  why: string
  action: string
  example?: string
}

interface MechanicVisualExample {
  before: string
  after: string
}

const MAX_ACTION_ITEMS = 4
const INITIAL_RECOMMENDATIONS_VISIBLE = 3

const riskLevelLabels: Record<RiskLevel, string> = {
  none: 'Aucun signal',
  low: 'Vigilance faible',
  moderate: 'Vigilance modérée',
  high: 'Vigilance élevée',
  critical: 'Vigilance critique',
}

const riskLevelStyles: Record<RiskLevel, string> = {
  none: 'bg-white/70 text-foreground/65 ring-black/10',
  low: 'bg-white/70 text-foreground/70 ring-black/10',
  moderate:
    'bg-[var(--color-warning)]/10 text-[var(--color-warning)] ring-[var(--color-warning)]/30',
  high:
    'bg-[var(--color-warning)]/15 text-[var(--color-warning)] ring-[var(--color-warning)]/40',
  critical:
    'bg-[var(--color-danger)]/10 text-[var(--color-danger)] ring-[var(--color-danger)]/35',
}

const priorityLabels: Record<PositiveRecommendation['priority'], string> = {
  high: 'Priorité haute',
  medium: 'Priorité moyenne',
  low: 'Priorité basse',
}

// Chaque niveau reste visuellement distinct (pas seulement par le texte),
// via une fine bande de couleur sur le bord de la carte plutôt qu'un
// badge plein — moins de « boîtes dans des boîtes » sur la page.
const priorityAccentStyles: Record<
  PositiveRecommendation['priority'],
  { bar: string; text: string }
> = {
  high: {
    bar: 'shadow-[inset_3px_0_0_0_var(--color-danger)]',
    text: 'text-[var(--color-danger)]',
  },
  medium: {
    bar: 'shadow-[inset_3px_0_0_0_var(--color-warning)]',
    text: 'text-[var(--color-warning)]',
  },
  low: {
    bar: 'shadow-[inset_3px_0_0_0_var(--color-neutral)]',
    text: 'text-[var(--color-neutral)]',
  },
}

// Priorité haute → basse, pour que les pistes les plus importantes
// apparaissent toujours en premier dans la section (avant les 3 visibles
// par défaut, et dans le reste une fois « Afficher plus » ouvert).
const priorityOrder: Record<PositiveRecommendation['priority'], number> = {
  high: 0,
  medium: 1,
  low: 2,
}

const severityLabels: Record<ContradictionResult['severity'], string> = {
  blocking: 'À clarifier en priorité',
  warning: 'Point de vigilance',
  info: 'Information',
}

const actionSourceLabels: Record<ActionItem['source'], string> = {
  contradiction: 'Clarifier',
  risk: 'Réduire le risque',
  recommendation: 'Action',
  mechanic: 'Adapter',
}

function toEvaluationAnswers(storedAnswers: StoredAnswer[]): EvaluationAnswers {
  return storedAnswers.reduce<EvaluationAnswers>((accumulator, answer) => {
    if (!answer.questionId || answer.selectedOptionIds.length === 0) {
      return accumulator
    }

    const questionId = answer.questionId as QuestionId
    const selectedOptionIds = answer.selectedOptionIds as OptionId[]

    accumulator[questionId] =
      selectedOptionIds.length === 1 ? selectedOptionIds[0] : selectedOptionIds

    return accumulator
  }, {})
}

function getActiveRiskThemes(result: EvaluationResult): RiskThemeResult[] {
  return result.riskThemes.filter((theme) => theme.level !== 'none')
}

function countThemesByLevel(
  riskThemes: RiskThemeResult[],
  levels: RiskLevel[],
): number {
  return riskThemes.filter((theme) => levels.includes(theme.level)).length
}

function getTopRiskThemes(result: EvaluationResult): RiskThemeResult[] {
  const levelWeight: Record<RiskLevel, number> = {
    critical: 5,
    high: 4,
    moderate: 3,
    low: 2,
    none: 1,
  }

  return [...getActiveRiskThemes(result)]
    .sort((first, second) => {
      if (levelWeight[second.level] !== levelWeight[first.level]) {
        return levelWeight[second.level] - levelWeight[first.level]
      }

      return second.score - first.score
    })
    .slice(0, 3)
}

function getMechanicVisualExample(
  mechanic: MechanicAlternative,
): MechanicVisualExample {
  const examples: Record<string, MechanicVisualExample> = {
    mechanic_streak: {
      before: '🔥 Série de 12 jours — ne perdez pas votre progression.',
      after: 'Vous pouvez reprendre là où vous vous êtes arrêté·e.',
    },
    mechanic_ranking: {
      before: 'Vous êtes 18e sur 42 participant·es.',
      after: 'Votre progression personnelle a augmenté cette semaine.',
    },
    mechanic_comparison_users: {
      before: 'Vous faites moins bien que 64% des utilisateur·rices.',
      after: 'Objectif collectif atteint à 72%. Chaque contribution compte.',
    },
    mechanic_rewards_benefits: {
      before: 'Agissez maintenant pour débloquer votre avantage.',
      after: 'Avantage disponible après une action utile, sans urgence artificielle.',
    },
    mechanic_notifications_reminders: {
      before: 'Revenez maintenant pour ne pas perdre votre avancée.',
      after: 'Souhaitez-vous recevoir un rappel plus tard ?',
    },
    mechanic_badges_trophies: {
      before: 'Badge affiché publiquement après chaque micro-action.',
      after: 'Badge discret dans un récapitulatif personnel.',
    },
    mechanic_levels: {
      before: 'Niveau insuffisant pour accéder à cette fonctionnalité.',
      after: 'Étape suivante proposée, avec accès au parcours principal conservé.',
    },
    mechanic_progress_bar: {
      before: 'Plus que 5 étapes à terminer maintenant.',
      after: 'Étape 2 sur 5 — vous pouvez reprendre plus tard.',
    },
    mechanic_points_score: {
      before: '+50 points pour chaque action réalisée.',
      after: 'Action complétée, progression mise à jour.',
    },
    mechanic_challenges_missions: {
      before: 'Mission obligatoire pour continuer.',
      after: 'Défi optionnel proposé pour explorer une fonctionnalité.',
    },
    mechanic_personalized_goals: {
      before: 'Objectif imposé automatiquement.',
      after: 'Objectif proposé, modifiable par l’utilisateur·rice.',
    },
    mechanic_visual_feedback: {
      before: 'Animation forte après chaque micro-action.',
      after: 'Confirmation simple : votre action a été enregistrée.',
    },
  }

  return (
    examples[mechanic.id] ?? {
      before: mechanic.possibleRisk,
      after: mechanic.ethicalAlternative,
    }
  )
}

function getActionPlan(result: EvaluationResult): ActionItem[] {
  const contradictionActions: ActionItem[] = result.contradictions
    .filter((contradiction) => contradiction.severity !== 'info')
    .map((contradiction) => ({
      id: contradiction.id,
      source: 'contradiction',
      eyebrow: severityLabels[contradiction.severity],
      title: contradiction.title,
      why: contradiction.message,
      action: contradiction.recommendation,
    }))

  const riskActions: ActionItem[] = getTopRiskThemes(result).map((theme) => ({
    id: theme.id,
    source: 'risk',
    eyebrow: riskLevelLabels[theme.level],
    title: theme.label,
    why: theme.summary,
    action:
      theme.recommendation ??
      'Clarifier cette thématique avant de valider la mécanique.',
  }))

  const recommendationActions: ActionItem[] = result.positiveRecommendations
    .filter((recommendation) => recommendation.priority === 'high')
    .map((recommendation) => ({
      id: recommendation.id,
      source: 'recommendation',
      eyebrow: priorityLabels[recommendation.priority],
      title: recommendation.title,
      why: recommendation.insight,
      action: recommendation.recommendation,
      example: recommendation.example,
    }))

  const mechanicActions: ActionItem[] = result.mechanicsAlternatives
    .filter(
      (mechanic) =>
        mechanic.baseVigilanceLevel === 'high' ||
        mechanic.baseVigilanceLevel === 'critical',
    )
    .map((mechanic) => ({
      id: mechanic.id,
      source: 'mechanic',
      eyebrow: riskLevelLabels[mechanic.baseVigilanceLevel],
      title: `Adapter : ${mechanic.mechanicLabel}`,
      why: mechanic.possibleRisk,
      action: mechanic.ethicalAlternative,
      example: mechanic.interfaceExample,
    }))

  return [
    ...contradictionActions,
    ...riskActions,
    ...mechanicActions,
    ...recommendationActions,
  ].slice(0, MAX_ACTION_ITEMS)
}

function buildTextSummary(result: EvaluationResult): string {
  const activeRiskThemes = getActiveRiskThemes(result)
  const actionPlan = getActionPlan(result)

  return [
    `Diagnostic : ${result.globalOrientation.title}`,
    '',
    result.globalOrientation.summary,
    '',
    `Prochaine étape : ${result.globalOrientation.nextStep}`,
    '',
    `Contradictions détectées : ${result.contradictions.length}`,
    `Thématiques en vigilance : ${activeRiskThemes.length}`,
    `Mécaniques à adapter : ${result.mechanicsAlternatives.length}`,
    '',
    'Plan d’action recommandé :',
    ...actionPlan.map((item, index) => {
      return `${index + 1}. ${item.title} — ${item.action}`
    }),
  ].join('\n')
}

function MetricCard({
  value,
  label,
  tone = 'default',
}: {
  value: number
  label: string
  tone?: 'default' | 'warning'
}) {
  return (
    <div
      className={[
        'rounded-2xl px-4 py-3 ring-1',
        tone === 'warning'
          ? 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] ring-[var(--color-warning)]/30'
          : 'bg-white/70 text-foreground ring-border',
      ].join(' ')}
    >
      <p className="text-2xl font-semibold leading-none">{value}</p>
      <p className="mt-1 text-xs leading-snug opacity-70">{label}</p>
    </div>
  )
}

function DiagnosticHero({ result }: { result: EvaluationResult }) {
  const activeRiskThemes = getActiveRiskThemes(result)
  const highRiskThemesCount = countThemesByLevel(result.riskThemes, [
    'high',
    'critical',
  ])

  return (
    <section className="rounded-[2rem] bg-secondary p-6 ring-1 ring-border sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">
            Résultat principal
          </p>

          <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {result.globalOrientation.title}
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/75">
            {result.globalOrientation.summary}
          </p>

          <div className="mt-6 rounded-2xl bg-white/75 p-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
              Prochaine étape
            </p>

            <p className="text-sm leading-relaxed text-foreground/80">
              {result.globalOrientation.nextStep}
            </p>
          </div>
        </div>

        <div className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <MetricCard
            value={result.contradictions.length}
            label="point(s) à clarifier"
            tone={result.contradictions.length > 0 ? 'warning' : 'default'}
          />

          <MetricCard
            value={activeRiskThemes.length}
            label="thématique(s) en vigilance"
            tone={highRiskThemesCount > 0 ? 'warning' : 'default'}
          />

          <MetricCard
            value={result.mechanicsAlternatives.length}
            label="mécanique(s) à adapter"
          />

          <MetricCard
            value={result.positiveRecommendations.length}
            label="action(s) générée(s)"
          />
        </div>
      </div>
    </section>
  )
}

function ActionPlanSection({ actions }: { actions: ActionItem[] }) {
  return (
    <section aria-labelledby="action-plan-heading">
      <div className="mb-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
          Plan d’action
        </p>

        <h2 id="action-plan-heading" className="text-2xl font-semibold text-foreground">
          Les points à traiter en premier
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/65">
          Ces points indiquent ce qu’il faudrait vérifier ou ajuster avant de présenter 
          la proposition à une équipe ou à un client.
        </p>
      </div>

      {actions.length === 0 ? (
        <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-border">
          <p className="text-sm leading-relaxed text-foreground/70">
            Aucun point prioritaire n’a été détecté. Les recommandations peuvent
            être utilisées comme pistes d’amélioration.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {actions.map((action, index) => (
            <article
              key={action.id}
              className="rounded-3xl bg-white/75 p-5 ring-1 ring-border"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground">
                    {index + 1}
                  </span>

                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
                      {actionSourceLabels[action.source]} · {action.eyebrow}
                    </span>

                    <h3 className="mt-1 text-lg font-semibold leading-snug text-foreground">
                      {action.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/65">
                    Ce que cela indique
                  </p>

                  <p className="text-sm leading-relaxed text-foreground/70">
                    {action.why}
                  </p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
                    À faire
                  </p>

                  <p className="text-sm leading-relaxed text-foreground/80">
                    {action.action}
                  </p>

                  {action.example && (
                    <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                      <span className="font-semibold text-foreground/75">
                        Exemple :
                      </span>{' '}
                      {action.example}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

function RecommendationsSection({
  recommendations,
  excludedIds = [],
}: {
  recommendations: PositiveRecommendation[]
  excludedIds?: string[]
}) {
  const [showAll, setShowAll] = useState(false)

  // Triées par priorité (haute → basse) : les pistes les plus importantes
  // restent en tête, y compris parmi les 3 affichées par défaut.
  const filteredRecommendations = recommendations
    .filter((recommendation) => !excludedIds.includes(recommendation.id))
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

  const visibleRecommendations = showAll
    ? filteredRecommendations
    : filteredRecommendations.slice(0, INITIAL_RECOMMENDATIONS_VISIBLE)

  const hasMore = filteredRecommendations.length > INITIAL_RECOMMENDATIONS_VISIBLE
  const hiddenCount = filteredRecommendations.length - INITIAL_RECOMMENDATIONS_VISIBLE
  const gridId = 'recommendations-grid'

  return (
    <section aria-labelledby="recommendations-heading">
      <div className="mb-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
          Recommandations
        </p>

        <h2 id="recommendations-heading" className="text-2xl font-semibold text-foreground">
          Autres pistes utiles
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/65">
          Ces pistes complètent le plan d’action. Elles peuvent aider à affiner la proposition.
        </p>
      </div>

      {filteredRecommendations.length === 0 ? (
        <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-border">
          <p className="text-sm leading-relaxed text-foreground/70">
            Aucune action spécifique n’a été générée pour ces réponses.
          </p>
        </div>
      ) : (
        <>
          <div id={gridId} className="grid gap-4 lg:grid-cols-3">
            {visibleRecommendations.map((recommendation) => {
              const accent = priorityAccentStyles[recommendation.priority]
              const titleId = `rec-title-${recommendation.id}`

              return (
                <article
                  key={recommendation.id}
                  aria-labelledby={titleId}
                  className={[
                    'flex flex-col gap-2 rounded-3xl bg-white/75 p-5 ring-1 ring-border',
                    accent.bar,
                  ].join(' ')}
                >
                  {/* 1. Priorité en premier, en texte simple sur la bande
                      de couleur du bord — se voit sans ajouter de pastille. */}
                  <p
                    className={[
                      'text-xs font-semibold uppercase tracking-[0.14em]',
                      accent.text,
                    ].join(' ')}
                  >
                    {priorityLabels[recommendation.priority]}
                  </p>

                  {/* 2. Titre : ce qu’est la piste. */}
                  <h3
                    id={titleId}
                    className="text-base font-semibold leading-snug text-foreground"
                  >
                    {recommendation.title}
                  </h3>

                  {/* 3. Constat : pourquoi cette piste est pertinente. */}
                  <p className="text-sm leading-relaxed text-foreground/70">
                    {recommendation.insight}
                  </p>

                  {/* 4. Action + exemple regroupés, séparés par une simple
                      ligne plutôt qu’une boîte colorée pleine. */}
                  <div className="mt-1 border-t border-border pt-3">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
                      À faire
                    </p>

                    <p className="text-sm leading-relaxed text-foreground/80">
                      {recommendation.recommendation}
                    </p>

                    {recommendation.example && (
                      <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                        <span className="font-semibold text-foreground/75">
                          Exemple :
                        </span>{' '}
                        {recommendation.example}
                      </p>
                    )}
                  </div>
                </article>
              )
            })}
          </div>

          {hasMore && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowAll((current) => !current)}
                aria-expanded={showAll}
                aria-controls={gridId}
                className="border-primary text-primary hover:bg-secondary"
              >
                {showAll
                  ? 'Afficher moins'
                  : `Afficher ${hiddenCount} piste${hiddenCount > 1 ? 's' : ''} de plus`}
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

function MechanicExampleCard({
  mechanic,
}: {
  mechanic: MechanicAlternative
}) {
  const visualExample = getMechanicVisualExample(mechanic)

  return (
    <article className="rounded-[1.75rem] bg-white/75 p-5 ring-1 ring-border">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
            Mécanique
          </p>

          <h3 className="text-lg font-semibold text-foreground">
            {mechanic.mechanicLabel}
          </h3>
        </div>

        <span
          className={[
            'rounded-full px-3 py-1 text-xs font-semibold ring-1',
            riskLevelStyles[mechanic.baseVigilanceLevel],
          ].join(' ')}
        >
          {riskLevelLabels[mechanic.baseVigilanceLevel]}
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/65">
              Risque principal
            </p>

            <p className="text-sm leading-relaxed text-foreground/70">
              {mechanic.possibleRisk}
            </p>
          </div>

          <div className="border-t border-border pt-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
              Alternative recommandée
            </p>

            <p className="text-sm leading-relaxed text-foreground/80">
              {mechanic.ethicalAlternative}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-[#F8F4EF] p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
            Exemple visuel
          </p>

          <div className="grid gap-3">
            <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-border">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-warning)]">
                À éviter
              </p>

              <p className="text-sm leading-relaxed text-foreground/75">
                {visualExample.before}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-4 ring-1 ring-primary/20">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Alternative
              </p>

              <p className="text-sm leading-relaxed text-foreground/80">
                {visualExample.after}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function MechanicsSection({
  mechanicsAlternatives,
}: {
  mechanicsAlternatives: MechanicAlternative[]
}) {
  if (mechanicsAlternatives.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="mechanics-heading">
      <div className="mb-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
          Mécaniques
        </p>

        <h2 id="mechanics-heading" className="text-2xl font-semibold text-foreground">
          Mécaniques sélectionnées : risques et alternatives
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/65">
          Chaque mécanique sélectionnée est accompagnée d’un risque possible, 
          d’une alternative plus sobre et d’un exemple visuel.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {mechanicsAlternatives.map((mechanic) => (
          <MechanicExampleCard key={mechanic.id} mechanic={mechanic} />
        ))}
      </div>
    </section>
  )
}

function AiPromptSection({ result }: { result: EvaluationResult }) {
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const [showPrompt, setShowPrompt] = useState(false)

  const prompt = useMemo(() => buildAiPrompt(result), [result])
  const actionPlan = getActionPlan(result)

  async function handleCopyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopyState('success')
    } catch {
      setCopyState('error')
    } finally {
      window.setTimeout(() => {
        setCopyState('idle')
      }, 3000)
    }
  }

  const promptPanelId = 'ai-prompt-output'

  return (
    <section
      aria-labelledby="ai-prompt-heading"
      className="rounded-[2rem] bg-white/70 p-6 ring-1 ring-border"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
            Analyse approfondie
          </p>

          <h2 id="ai-prompt-heading" className="text-2xl font-semibold text-foreground">
            Préparer une analyse IA
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            Le résultat principal vient du questionnaire. Le prompt sert ensuite
            à utiliser une IA externe pour reformuler, préparer une synthèse
            client ou faire ressortir des questions à vérifier.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-foreground/60">
            Aucun appel API n’est lancé depuis le site. Il n’y a donc pas de clé
            à gérer et pas de coût lié à l’utilisation du site.
          </p>
        </div>

        <div className="rounded-3xl bg-white/70 p-5">
          <p className="mb-3 text-sm font-semibold text-foreground">
            Ce que le prompt reprend
          </p>

          <ul className="flex flex-col gap-2 text-sm leading-relaxed text-foreground/65">
            <li>• Résultat principal : {result.globalOrientation.title}</li>
            <li>• {result.contradictions.length} point(s) à clarifier</li>
            <li>• {getActiveRiskThemes(result).length} thématique(s) en vigilance</li>
            <li>• {result.mechanicsAlternatives.length} mécanique(s) à adapter</li>
            <li>• {actionPlan.length} action(s) prioritaire(s)</li>
          </ul>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              type="button"
              className="bg-primary text-primary-foreground hover:opacity-90"
              onClick={handleCopyPrompt}
              disabled={copyState === 'success'}
            >
              {copyState === 'success'
                ? 'Prompt copié'
                : copyState === 'error'
                  ? 'Copie impossible'
                  : 'Copier le prompt IA'}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="border-primary text-primary hover:bg-secondary"
              onClick={() => setShowPrompt((current) => !current)}
              aria-expanded={showPrompt}
              aria-controls={promptPanelId}
            >
              {showPrompt ? 'Masquer le prompt' : 'Voir le prompt'}
            </Button>
          </div>
        </div>
      </div>

      {showPrompt && (
        <div
          id={promptPanelId}
          className="mt-6 rounded-3xl bg-white/70 p-5 ring-1 ring-primary/10"
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-foreground">
              Prompt généré
            </p>

            <p className="text-xs text-foreground/65">
              À coller dans l’outil IA utilisé par l’équipe.
            </p>
          </div>

          <pre
            tabIndex={0}
            role="region"
            aria-label="Contenu du prompt généré"
            className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-2xl bg-[#F8F4EF] p-4 text-xs leading-relaxed text-foreground/75 ring-1 ring-border focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {prompt}
          </pre>
        </div>
      )}
    </section>
  )
}

function RiskDetailsSection({
  riskThemes,
  excludedIds = [],
}: {
  riskThemes: RiskThemeResult[]
  excludedIds?: string[]
}) {
  const activeRiskThemes = riskThemes.filter(
    (theme) => theme.level !== 'none' && !excludedIds.includes(theme.id),
  )

  if (activeRiskThemes.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="risk-details-heading">
      <div className="mb-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
          Détails
        </p>

        <h2 id="risk-details-heading" className="text-2xl font-semibold text-foreground">
          Pourquoi ce résultat ?
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/65">
          Les points déjà traités dans le plan d’action ne sont pas répétés ici.
          Le reste est replié pour garder une lecture simple.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {activeRiskThemes.map((theme) => (
          <details
            key={theme.id}
            className="rounded-3xl bg-white/75 p-5 ring-1 ring-border open:bg-white"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {theme.label}
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-foreground/65">
                  {theme.summary}
                </p>
              </div>

              <span
                className={[
                  'shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1',
                  riskLevelStyles[theme.level],
                ].join(' ')}
              >
                {riskLevelLabels[theme.level]}
              </span>
            </summary>

            <div className="mt-4 border-t border-border pt-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
                Recommandation
              </p>

              <p className="text-sm leading-relaxed text-foreground/80">
                {theme.recommendation}
              </p>
            </div>

            {theme.signals.length > 0 && (
              <ul className="mt-4 flex flex-col gap-2">
                {theme.signals.map((signal) => (
                  <li
                    key={signal.id}
                    className="rounded-2xl bg-white/60 p-3 text-xs leading-relaxed text-foreground/65"
                  >
                    {signal.message}
                  </li>
                ))}
              </ul>
            )}
          </details>
        ))}
      </div>
    </section>
  )
}

function ContradictionsDetailsSection({
  contradictions,
  excludedIds = [],
}: {
  contradictions: ContradictionResult[]
  excludedIds?: string[]
}) {
  const visibleContradictions = contradictions.filter(
    (contradiction) => !excludedIds.includes(contradiction.id),
  )

  if (visibleContradictions.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="contradictions-heading">
      <div className="mb-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
          Contradictions
        </p>

        <h2 id="contradictions-heading" className="text-2xl font-semibold text-foreground">
          Incohérences à vérifier
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/65">
          Ces réponses semblent aller dans des directions différentes. 
          Elles méritent d’être vérifiées avant de finaliser la recommandation.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {visibleContradictions.map((contradiction) => (
          <details
            key={contradiction.id}
            className="rounded-3xl bg-white/75 p-5 ring-1 ring-border open:bg-white"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {contradiction.title}
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-foreground/65">
                  {contradiction.message}
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-[var(--color-warning)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-warning)] ring-1 ring-[var(--color-warning)]/30">
                {severityLabels[contradiction.severity]}
              </span>
            </summary>

            <div className="mt-4 border-t border-border pt-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
                Recommandation
              </p>

              <p className="text-sm leading-relaxed text-foreground/80">
                {contradiction.recommendation}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}

function ClientArgumentSection({ result }: { result: EvaluationResult }) {
  return (
    <section
      aria-labelledby="client-argument-heading"
      className="rounded-[2rem] bg-secondary/80 p-6 ring-1 ring-border"
    >
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
        Synthèse client
      </p>

      <h2 id="client-argument-heading" className="text-2xl font-semibold text-foreground">
        Argument utilisable avec un client ou une équipe
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-foreground/75">
        {result.globalOrientation.summary} La prochaine étape consiste à{' '}
        {result.globalOrientation.nextStep.charAt(0).toLowerCase()}
        {result.globalOrientation.nextStep.slice(1)}
      </p>
    </section>
  )
}

export function ResultsClient() {
  const router = useRouter()

  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [copyState, setCopyState] = useState<CopyState>('idle')

  useEffect(() => {
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    })
  }, [])

  useEffect(() => {
    const storedAnswers = loadAnswers() as StoredAnswer[] | null

    if (!storedAnswers || storedAnswers.length === 0) {
      setHasLoaded(true)
      return
    }

    const evaluationAnswers = toEvaluationAnswers(storedAnswers)
    const evaluationResult = evaluateAnswers(evaluationAnswers)

    setResult(evaluationResult)
    setHasLoaded(true)
  }, [])

  const actionPlan = useMemo(() => {
    if (!result) {
      return []
    }

    return getActionPlan(result)
  }, [result])

  async function handleCopySummary() {
    if (!result) {
      return
    }

    try {
      await navigator.clipboard.writeText(buildTextSummary(result))
      setCopyState('success')
    } catch {
      setCopyState('error')
    } finally {
      window.setTimeout(() => {
        setCopyState('idle')
      }, 3000)
    }
  }

  function handleRestart() {
    clearAnswers()
    router.push('/evaluation')
  }

  function handleDownloadPdf() {
    window.print()
  }

  if (!hasLoaded) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-sm text-foreground/65">Chargement des résultats…</p>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-border bg-secondary p-8 text-center">
        <p className="mb-2 text-base font-semibold text-foreground">
          Aucune évaluation trouvée
        </p>

        <p className="mb-6 text-sm leading-relaxed text-foreground/70">
          Vous n’avez pas encore complété le questionnaire, ou vos réponses ont
          été effacées.
        </p>

        <Button
          onClick={() => router.push('/evaluation')}
          className="bg-primary text-primary-foreground hover:opacity-90"
        >
          Aller à l’évaluation
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
      <DiagnosticHero result={result} />

      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-border py-4">
        <p className="max-w-2xl text-sm leading-relaxed text-foreground/60">
          Le résultat vient des réponses au questionnaire. Le prompt IA sert ensuite
          à préparer une synthèse ou des questions, sans remplacer le résultat
          principal.
        </p>

        <div className="flex flex-wrap gap-3 print:hidden">
          <Button
            variant="ghost"
            onClick={handleCopySummary}
            disabled={copyState === 'success'}
            className="text-sm font-semibold text-foreground/70 hover:bg-white/60"
          >
            {copyState === 'success'
              ? 'Résumé copié'
              : copyState === 'error'
                ? 'Copie impossible'
                : 'Copier le résumé'}
          </Button>

          <Button
            variant="outline"
            onClick={handleDownloadPdf}
            className="border-primary text-primary hover:bg-secondary"
          >
            Télécharger en PDF
          </Button>

          <Button
            variant="outline"
            onClick={handleRestart}
            className="border-primary text-primary hover:bg-secondary"
          >
            Recommencer
          </Button>
        </div>
      </div>

      <ActionPlanSection actions={actionPlan} />

      <MechanicsSection mechanicsAlternatives={result.mechanicsAlternatives} />

      <RecommendationsSection
        recommendations={result.positiveRecommendations}
        excludedIds={actionPlan.map((action) => action.id)}
      />

      <RiskDetailsSection
        riskThemes={result.riskThemes}
        excludedIds={actionPlan.map((action) => action.id)}
      />

      <ContradictionsDetailsSection
        contradictions={result.contradictions}
        excludedIds={actionPlan.map((action) => action.id)}
      />

      {/* Analyse IA en fin de page : c’est un outil pour aller plus loin,
          pas un résultat en soi — le texte du bloc le dit déjà lui-même. */}
      <AiPromptSection result={result} />

      <ClientArgumentSection result={result} />
    </div>
  )
}