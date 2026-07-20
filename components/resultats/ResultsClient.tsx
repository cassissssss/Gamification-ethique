'use client'

import { useEffect,  useMemo,  useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet,  SheetContent,  SheetTitle,  SheetTrigger } from '@/components/ui/sheet'
import { clearAnswers,  loadAnswers } from '@/lib/storage'
import { evaluateAnswers } from '@/logic/evaluationEngine'
import { buildAiPrompt } from '@/lib/evaluation/ai-prompt'
import type {
  ContradictionResult, 
  EvaluationAnswers, 
  EvaluationResult, 
  GlobalOrientationId, 
  MechanicAlternative, 
  OptionId, 
  PositiveRecommendation, 
  QuestionId, 
  RecommendationDeepDive, 
  RiskLevel, 
  RiskThemeResult, 
} from '@/logic/evaluation.types'

interface StoredAnswer {
  questionId: string
  selectedOptionIds: string[]
}

type CopyState = 'idle' | 'success' | 'error'

interface MechanicVisualExample {
  before: string
  after: string
}

// ─── Liste unifiée de priorités ───────────────────────────────────────────────
//
// Contradictions,  thématiques de vigilance,  mécaniques à adapter,  synergies et
// recommandations positives sont fondamentalement la même chose du point de
// vue de la lecture : un point à connaître,  avec un niveau,  un pourquoi et une
// action. On les combine donc dans UNE seule liste,  triée par niveau,  plutôt
// que de leur donner chacun un gabarit visuel différent (bloc plein écran, 
// liste numérotée,  grille de cartes,  accordéons séparés).

interface MechanicChipInfo {
  label: string
}

type PriorityItemSource = 'contradiction' | 'risk' | 'synergy' | 'mechanic' | 'recommendation'
type PriorityItemTier = 'major' | 'secondary'

interface PriorityItem {
  id: string
  level: RiskLevel
  category: string
  title: string
  why: string
  action: string
  visualExample?: MechanicVisualExample
  plainExample?: string
  deepDive?: RecommendationDeepDive
  relatedMechanics?: MechanicChipInfo[]
  source: PriorityItemSource
  tier: PriorityItemTier
}

// Une thématique de risque,  une contradiction ou une synergie sont toujours
// de vrais enjeux de conception : elles restent des fiches complètes quel
// que soit leur niveau. Une mécanique ou une recommandation positive,  en
// revanche,  ne devient une fiche complète que si sa vigilance est élevée , 
// sinon elle reste une piste compacte,  plus proche d'une bonne pratique.
function getItemTier(source: PriorityItemSource,  level: RiskLevel): PriorityItemTier {
  if (source === 'contradiction' || source === 'risk' || source === 'synergy') {
    return 'major'
  }

  return level === 'critical' || level === 'high' ? 'major' : 'secondary'
}

// Libellé court par mécanique,  affiché comme un tag discret (sans icône , 
// la hiérarchie vient de la typographie,  pas de la décoration).
const MECHANIC_CHIP_INFO: Partial<Record<OptionId,  MechanicChipInfo>> = {
  points_score: { label: 'Points' }, 
  badges_trophies: { label: 'Badges' }, 
  levels: { label: 'Niveaux' }, 
  progress_bar: { label: 'Progression' }, 
  challenges_missions: { label: 'Défis' }, 
  ranking: { label: 'Classement' }, 
  rewards_benefits: { label: 'Récompenses' }, 
  notifications_reminders: { label: 'Rappels' }, 
  streak: { label: 'Série' }, 
  personalized_goals: { label: 'Objectifs personnalisés' }, 
  visual_feedback: { label: 'Feedback' }, 
  comparison_users: { label: 'Comparaison' }, 
  random_reward: { label: 'Récompense aléatoire' }, 
}

const INITIAL_VISIBLE_ITEMS = 8

const riskLevelLabels: Record<RiskLevel,  string> = {
  none: 'Aucun signal', 
  low: 'Vigilance faible', 
  moderate: 'Vigilance modérée', 
  high: 'Vigilance élevée', 
  critical: 'Vigilance critique', 
}

// Le diagnostic global ne connaît que 5 issues (jamais "critique", ce niveau
// n'existe qu'au niveau d'une thématique ou d'une mécanique précise). On
// mappe donc chaque id vers le niveau qui reflète fidèlement son intitulé, 
// plutôt que de reprendre la sévérité du pire point du détail.
const GLOBAL_ORIENTATION_LEVEL: Record<GlobalOrientationId,  RiskLevel> = {
  clarify_before_deciding: 'moderate', 
  high_vigilance_required: 'high', 
  adapt_mechanics: 'high', 
  gamification_under_conditions: 'moderate', 
  light_gamification_recommended: 'low', 
}

// Badges de niveau très discrets (esprit Linear/Notion) : fond quasi neutre, 
// pas de contour,  la couleur n'apparaît que sur le texte et seulement à
// partir du niveau élevé.
const riskLevelStyles: Record<RiskLevel,  string> = {
  none: 'bg-foreground/5 text-foreground/60', 
  low: 'bg-foreground/5 text-foreground/60', 
  moderate: 'bg-foreground/5 text-foreground/70', 
  high: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]', 
  critical: 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]', 
}

// Fond de carte neutre,  avec une teinte à peine perceptible pour les niveaux
// élevés, la couleur de vigilance reste la seule variation chromatique.
const priorityCardStyles: Record<RiskLevel,  string> = {
  critical: 'bg-[var(--color-danger)]/[0.025] border-border', 
  high: 'bg-[var(--color-warning)]/[0.03] border-border', 
  moderate: 'bg-transparent border-border', 
  low: 'bg-transparent border-border', 
  none: 'bg-transparent border-border', 
}

const priorityLevelWeight: Record<RiskLevel,  number> = {
  critical: 5, 
  high: 4, 
  moderate: 3, 
  low: 2, 
  none: 1, 
}

const priorityLabels: Record<PositiveRecommendation['priority'],  string> = {
  high: 'Priorité haute', 
  medium: 'Priorité moyenne', 
  low: 'Priorité basse', 
}

const priorityToLevel: Record<PositiveRecommendation['priority'],  RiskLevel> = {
  high: 'high', 
  medium: 'moderate', 
  low: 'low', 
}

const severityLabels: Record<ContradictionResult['severity'],  string> = {
  blocking: 'À clarifier en priorité', 
  warning: 'Point de vigilance', 
  info: 'Information', 
}

const severityToLevel: Record<ContradictionResult['severity'],  RiskLevel> = {
  blocking: 'critical', 
  warning: 'high', 
  info: 'low', 
}

function toEvaluationAnswers(storedAnswers: StoredAnswer[]): EvaluationAnswers {
  return storedAnswers.reduce<EvaluationAnswers>((accumulator,  answer) => {
    if (!answer.questionId || answer.selectedOptionIds.length === 0) {
      return accumulator
    }

    const questionId = answer.questionId as QuestionId
    const selectedOptionIds = answer.selectedOptionIds as OptionId[]

    accumulator[questionId] =
      selectedOptionIds.length === 1 ? selectedOptionIds[0] : selectedOptionIds

    return accumulator
  },  {})
}

function getActiveRiskThemes(result: EvaluationResult): RiskThemeResult[] {
  return result.riskThemes.filter((theme) => theme.level !== 'none')
}

function getMechanicVisualExample(
  mechanic: MechanicAlternative, 
): MechanicVisualExample {
  const examples: Record<string,  MechanicVisualExample> = {
    mechanic_streak: {
      before: 'Série de 12 jours, ne perdez pas votre progression.', 
      after: 'Vous pouvez reprendre là où vous vous êtes arrêté-e.', 
    }, 
    mechanic_ranking: {
      before: 'Vous êtes 18e sur 42 participant-es.', 
      after: 'Votre progression personnelle a augmenté cette semaine.', 
    }, 
    mechanic_comparison_users: {
      before: 'Vous faites moins bien que 64% des utilisateur-rices.', 
      after: 'Objectif collectif atteint à 72%. Chaque contribution compte.', 
    }, 
    mechanic_rewards_benefits: {
      before: 'Agissez maintenant pour débloquer votre avantage.', 
      after: 'Avantage disponible après une action utile,  sans urgence artificielle.', 
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
      after: 'Étape suivante proposée,  avec accès au parcours principal conservé.', 
    }, 
    mechanic_progress_bar: {
      before: 'Plus que 5 étapes à terminer maintenant.', 
      after: 'Étape 2 sur 5, vous pouvez reprendre plus tard.', 
    }, 
    mechanic_points_score: {
      before: '+50 points pour chaque action réalisée.', 
      after: 'Action complétée,  progression mise à jour.', 
    }, 
    mechanic_challenges_missions: {
      before: 'Mission obligatoire pour continuer.', 
      after: 'Défi optionnel proposé pour explorer une fonctionnalité.', 
    }, 
    mechanic_personalized_goals: {
      before: 'Objectif imposé automatiquement.', 
      after: 'Objectif proposé,  modifiable par l’utilisateur-rice.', 
    }, 
    mechanic_visual_feedback: {
      before: 'Animation forte après chaque micro-action.', 
      after: 'Confirmation simple : votre action a été enregistrée.', 
    }, 
    mechanic_random_reward: {
      before: 'Tirage surprise à chaque connexion, tentez votre chance !', 
      after: 'Bonus fixe annoncé à l’avance,  sans effet de tirage.', 
    }, 
  }

  return (
    examples[mechanic.id] ?? {
      before: mechanic.possibleRisk, 
      after: mechanic.ethicalAlternative, 
    }
  )
}

function getPriorityItems(result: EvaluationResult): PriorityItem[] {
  const contradictionItems: PriorityItem[] = result.contradictions.map(
    (contradiction) => ({
      id: contradiction.id, 
      level: severityToLevel[contradiction.severity], 
      category: severityLabels[contradiction.severity], 
      title: contradiction.title, 
      why: contradiction.message, 
      action: contradiction.recommendation, 
      deepDive: contradiction.deepDive, 
      source: 'contradiction', 
      tier: getItemTier('contradiction',  severityToLevel[contradiction.severity]), 
    }), 
  )

  const riskItems: PriorityItem[] = getActiveRiskThemes(result).map((theme) => {
    const mechanicOptionIds = Array.from(
      new Set(
        theme.signals
          .filter((signal) => signal.questionId === 'Q12')
          .map((signal) => signal.optionId), 
      ), 
    )

    return {
      id: theme.id, 
      level: theme.level, 
      category: 'Réduire le risque', 
      title: theme.label, 
      why: theme.summary, 
      action:
        theme.recommendation ?? 'Clarifier cette thématique avant de valider la mécanique.', 
      deepDive: theme.deepDive, 
      relatedMechanics: mechanicOptionIds
        .map((optionId) => MECHANIC_CHIP_INFO[optionId])
        .filter((chip): chip is MechanicChipInfo => Boolean(chip)), 
      source: 'risk', 
      tier: getItemTier('risk',  theme.level), 
    }
  })

  const synergyItems: PriorityItem[] = result.synergyResults.map((synergy) => ({
    id: synergy.id, 
    level: synergy.level, 
    category: 'Combinaison à risque', 
    title: synergy.title, 
    why: synergy.message, 
    action: synergy.recommendation, 
    deepDive: synergy.deepDive, 
    source: 'synergy', 
    tier: getItemTier('synergy',  synergy.level), 
  }))

  const mechanicItems: PriorityItem[] = result.mechanicsAlternatives.map(
    (mechanic) => ({
      id: mechanic.id, 
      level: mechanic.baseVigilanceLevel, 
      category: 'Adapter une mécanique', 
      title: mechanic.mechanicLabel, 
      why: mechanic.possibleRisk, 
      action: mechanic.ethicalAlternative, 
      visualExample: getMechanicVisualExample(mechanic), 
      deepDive: mechanic.deepDive, 
      relatedMechanics: MECHANIC_CHIP_INFO[mechanic.mechanicOptionId]
        ? [MECHANIC_CHIP_INFO[mechanic.mechanicOptionId] as MechanicChipInfo]
        : undefined, 
      source: 'mechanic', 
      tier: getItemTier('mechanic',  mechanic.baseVigilanceLevel), 
    }), 
  )

  const recommendationItems: PriorityItem[] = result.positiveRecommendations.map(
    (recommendation) => ({
      id: recommendation.id, 
      level: priorityToLevel[recommendation.priority], 
      category: priorityLabels[recommendation.priority], 
      title: recommendation.title, 
      why: recommendation.insight, 
      action: recommendation.recommendation, 
      plainExample: recommendation.example, 
      deepDive: recommendation.deepDive, 
      source: 'recommendation', 
      tier: getItemTier('recommendation',  priorityToLevel[recommendation.priority]), 
    }), 
  )

  const allItems = [
    ...contradictionItems, 
    ...riskItems, 
    ...synergyItems, 
    ...mechanicItems, 
    ...recommendationItems, 
  ]

  // Tri stable : à niveau égal,  l’ordre d’origine est conservé (contradictions
  // avant thématiques,  avant synergies,  avant mécaniques,  avant recommandations).
  return allItems.sort(
    (first,  second) => priorityLevelWeight[second.level] - priorityLevelWeight[first.level], 
  )
}

function buildTextSummary(result: EvaluationResult): string {
  const priorityItems = getPriorityItems(result)

  return [
    `Diagnostic : ${result.globalOrientation.title}`, 
    '', 
    result.globalOrientation.summary, 
    '', 
    `Prochaine étape : ${result.globalOrientation.nextStep}`, 
    '', 
    `Points identifiés : ${priorityItems.length}`, 
    '', 
    'Plan d’action,  du plus au moins prioritaire :', 
    ...priorityItems.map((item,  index) => `${index + 1}. ${item.title}, ${item.action}`), 
  ].join('\n')
}

function DiagnosticHero({
  result, 
  priorityItems, 
  onNavigate, 
}: {
  result: EvaluationResult
  priorityItems: PriorityItem[]
  onNavigate: (id: string) => void
}) {
  // Les « principaux sujets » sont les thématiques de risque les plus
  // sévères, c'est ce qui donne le plus rapidement une idée de la nature
  // du problème,  avant même d'ouvrir une seule fiche.
  const mainSubjects = priorityItems.filter((item) => item.source === 'risk').slice(0,  3)

  const groupCounts = PLAN_GROUP_ORDER.map((group) => ({
    group, 
    count: priorityItems.filter((item) => getPlanGroup(item.level) === group).length, 
  })).filter(({ count }) => count > 0)

  // Niveau du badge : dérivé du diagnostic global affiché (son id),  pas du
  // pire point individuel de la liste, un item "critique" isolé ne doit
  // pas teinter le titre en rouge si le diagnostic global reste "élevée".
  const overallLevel = GLOBAL_ORIENTATION_LEVEL[result.globalOrientation.id]

  return (
    <section className="rounded-3xl border border-border bg-white/60 p-6 sm:p-8">
      <p className="text-xs font-medium tracking-wide text-foreground/40">Diagnostic</p>

      <div
        className={`mt-3 inline-flex w-fit rounded-full px-4 py-2 ${riskLevelStyles[overallLevel]}`}
      >
        <h1 className="text-lg font-semibold leading-snug sm:text-xl">
          {result.globalOrientation.title}
        </h1>
      </div>

      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground/70">
        {result.globalOrientation.summary}
      </p>

      {groupCounts.length > 0 && (
        <div className="mt-6 flex max-w-md flex-wrap gap-3">
          {groupCounts.map(({ group,  count }) => (
            <div key={group} className="rounded-2xl bg-foreground/5 px-4 py-3">
              <p className="text-2xl font-semibold text-foreground">{count}</p>
              <p className="text-xs text-foreground/60">{PLAN_GROUP_LABELS[group]}</p>
            </div>
          ))}
        </div>
      )}

      {mainSubjects.length > 0 && (
        <div className="mt-8">
          <p className="text-xs font-medium tracking-wide text-foreground/40">
            Extrait des recommandations
          </p>

          <ul className="mt-2 divide-y divide-border">
            {mainSubjects.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className="flex w-full items-center justify-between gap-4 py-3 text-left"
                >
                  <span className="text-[15px] font-medium text-foreground">
                    {item.title}
                  </span>

                  <span
                    className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-medium ${riskLevelStyles[item.level]}`}
                  >
                    {riskLevelLabels[item.level]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

// ─── Carte unique pour tous les points de la liste ────────────────────────────
//
// Un seul gabarit,  dont l’intensité (fond,  épaisseur du titre) diminue avec le
// niveau et le rang, pas un composant différent par type de contenu.

// ─── Groupement du plan d'action (sommaire) ───────────────────────────────────

type PlanGroup = 'priority' | 'improve' | 'good'

const PLAN_GROUP_ORDER: PlanGroup[] = ['priority',  'improve',  'good']

const PLAN_GROUP_LABELS: Record<PlanGroup,  string> = {
  priority: 'À traiter en priorité', 
  improve: 'À améliorer', 
  good: 'Bonnes pratiques', 
}

function getPlanGroup(level: RiskLevel): PlanGroup {
  if (level === 'critical' || level === 'high') {
    return 'priority'
  }

  if (level === 'moderate') {
    return 'improve'
  }

  return 'good'
}

function getItemPreview(item: PriorityItem): string {
  const count = item.relatedMechanics?.length ?? 0

  if (count > 0) {
    return count > 1 ? `${count} mécaniques concernées` : `${count} mécanique concernée`
  }

  return riskLevelLabels[item.level]
}

function ActionPlanNavList({
  items, 
  activeId, 
  onNavigate, 
}: {
  items: PriorityItem[]
  activeId: string | null
  onNavigate: (id: string) => void
}) {
  const flatIndexById = useMemo(
    () => new Map(items.map((item,  index) => [item.id,  index])), 
    [items], 
  )
  const activeIndex = activeId ? flatIndexById.get(activeId) ?? -1 : -1

  return (
    <div className="flex flex-col gap-6">
      {PLAN_GROUP_ORDER.map((group) => {
        const groupItems = items.filter((item) => getPlanGroup(item.level) === group)

        if (groupItems.length === 0) {
          return null
        }

        return (
          <div key={group}>
            <p className="mb-2 text-xs font-medium tracking-wide text-foreground/40">
              {PLAN_GROUP_LABELS[group]} ({groupItems.length})
            </p>

            <ul className="flex flex-col gap-0.5">
              {groupItems.map((item) => {
                const isActive = item.id === activeId
                const itemIndex = flatIndexById.get(item.id) ?? -1
                const isRead = activeIndex >= 0 && itemIndex < activeIndex

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.id)}
                      className={[
                        'w-full rounded-md border-l-2 px-3 py-2 text-left transition-colors', 
                        isActive
                          ? 'border-primary bg-foreground/[0.04]'
                          : 'border-transparent hover:bg-foreground/[0.03]', 
                      ].join(' ')}
                    >
                      <p
                        className={[
                          'text-sm leading-snug', 
                          isActive
                            ? 'font-medium text-foreground'
                            : isRead
                              ? 'text-foreground/40'
                              : 'text-foreground/65', 
                        ].join(' ')}
                      >
                        {item.title}
                      </p>

                      <p className="mt-0.5 text-xs text-foreground/40">
                        {getItemPreview(item)}
                      </p>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

function ActionPlanNav({
  items, 
  activeId, 
  onNavigate, 
}: {
  items: PriorityItem[]
  activeId: string | null
  onNavigate: (id: string) => void
}) {
  const [isMobileOpen,  setIsMobileOpen] = useState(false)

  if (items.length === 0) {
    return null
  }

  function handleNavigate(id: string) {
    setIsMobileOpen(false)
    onNavigate(id)
  }

  return (
    <>
      {/* Desktop : colonne sticky,  ne défile pas au-delà de la hauteur de l'écran */}
      <nav
        aria-label="Recommandations"
        className="hidden lg:sticky lg:top-28 lg:block lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pb-8"
      >
        <p className="mb-4 text-sm font-semibold text-foreground">Recommandations</p>
        <ActionPlanNavList items={items} activeId={activeId} onNavigate={handleNavigate} />
      </nav>

      {/* Mobile : bouton discret qui ouvre un tiroir avec le même contenu */}
      <div className="lg:hidden">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="mb-2 text-sm font-medium text-primary hover:opacity-80"
            >
              Recommandations
            </button>
          </SheetTrigger>

          <SheetContent side="bottom" className="overflow-y-auto">
            <SheetTitle className="mb-4">Recommandations</SheetTitle>
            <ActionPlanNavList items={items} activeId={activeId} onNavigate={handleNavigate} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

function PriorityItemCard({
  item, 
  rank, 
}: {
  item: PriorityItem
  rank: number
}) {
  const isTopItem = rank === 0

  return (
    <article
      id={item.id}
      data-priority-item-id={item.id}
      className={[
        'scroll-mt-28 rounded-2xl border p-8 sm:p-10', 
        priorityCardStyles[item.level], 
      ].join(' ')}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-medium tracking-wide text-foreground/45">
          {isTopItem ? 'À faire en premier, ' : ''}
          {item.category}
        </p>

        <span
          className={[
            'rounded-md px-2.5 py-1 text-xs font-medium', 
            riskLevelStyles[item.level], 
          ].join(' ')}
        >
          {riskLevelLabels[item.level]}
        </span>
      </div>

      <h3
        className={[
          'mt-3 font-semibold leading-snug text-foreground', 
          isTopItem ? 'text-2xl' : 'text-lg', 
        ].join(' ')}
      >
        {item.title}
      </h3>

      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-foreground/70">
        {item.why} {item.action}
      </p>

      {item.plainExample && (
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-foreground/55">
          {item.plainExample}
        </p>
      )}

      {item.relatedMechanics && item.relatedMechanics.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-xs font-medium tracking-wide text-foreground/40">
            Mécaniques concernées
          </p>

          <div className="flex flex-wrap gap-1.5">
            {item.relatedMechanics.map((chip) => (
              <span
                key={chip.label}
                className="rounded-md bg-foreground/[0.04] px-2.5 py-1 text-xs font-medium text-foreground/65"
              >
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {item.deepDive && (
        <div className="mt-8">
          <p className="mb-2 text-xs font-medium tracking-wide text-foreground/40">
            Pourquoi agir
          </p>

          <p className="max-w-2xl text-[15px] leading-relaxed text-foreground/70">
            {item.deepDive.mechanism}
          </p>
        </div>
      )}

      {item.deepDive && item.deepDive.alternatives.length > 0 && (
        <div className="mt-8">
          <p className="mb-2 text-xs font-medium tracking-wide text-foreground/40">
            Comment améliorer
          </p>

          <ul className="flex max-w-2xl flex-col gap-1.5">
            {item.deepDive.alternatives.map((alternative,  index) => (
              <li
                key={index}
                className="text-[15px] leading-relaxed text-foreground/75"
              >
                {alternative}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Le comparatif visuel reste le seul élément « encadré » de la carte :
          c'est la seule information qui gagne réellement à être mise en boîte. */}
      {item.visualExample && (
        <div className="mt-8">
          <p className="mb-2 text-xs font-medium tracking-wide text-foreground/40">
            Exemple concret
          </p>

          <div className="grid overflow-hidden rounded-lg border border-border sm:grid-cols-2">
            <div className="p-5 sm:border-r sm:border-border">
              <p className="mb-2 text-xs font-medium text-foreground/45">À éviter</p>

              <p className="text-sm leading-relaxed text-foreground/75">
                {item.visualExample.before}
              </p>
            </div>

            <div className="border-t border-border p-5 sm:border-t-0">
              <p className="mb-2 text-xs font-medium text-foreground/45">Recommandé</p>

              <p className="text-sm leading-relaxed text-foreground">
                {item.visualExample.after}
              </p>
            </div>
          </div>
        </div>
      )}

      {item.deepDive?.realWorldExample && (
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-foreground/45">
          {item.deepDive.realWorldExample}
        </p>
      )}
    </article>
  )
}

// Format compact pour les pistes secondaires : une explication courte, 
// 2-3 actions au maximum,  un exemple seulement s'il tient en peu de place.
// Volontairement plus court qu'une fiche majeure, la taille reflète
// l'importance plutôt que d'uniformiser toutes les cartes.
function CompactItemCard({ item }: { item: PriorityItem }) {
  const topAlternatives = item.deepDive?.alternatives.slice(0,  3) ?? []

  return (
    <article
      id={item.id}
      data-priority-item-id={item.id}
      className="scroll-mt-28 rounded-2xl border border-border p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-medium tracking-wide text-foreground/40">
          {item.category}
        </p>

        <span
          className={[
            'rounded-md px-2 py-0.5 text-xs font-medium', 
            riskLevelStyles[item.level], 
          ].join(' ')}
        >
          {riskLevelLabels[item.level]}
        </span>
      </div>

      <h3 className="mt-2 text-base font-semibold leading-snug text-foreground">
        {item.title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-foreground/70">
        {item.why} {item.action}
      </p>

      {topAlternatives.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1">
          {topAlternatives.map((alternative,  index) => (
            <li key={index} className="text-sm leading-relaxed text-foreground/70">
              {alternative}
            </li>
          ))}
        </ul>
      )}

      {item.visualExample && (
        <div className="mt-4 grid overflow-hidden rounded-lg border border-border text-sm sm:grid-cols-2">
          <div className="p-3 sm:border-r sm:border-border">
            <p className="mb-1 text-xs font-medium text-foreground/45">À éviter</p>
            <p className="text-foreground/70">{item.visualExample.before}</p>
          </div>

          <div className="border-t border-border p-3 sm:border-t-0">
            <p className="mb-1 text-xs font-medium text-foreground/45">Recommandé</p>
            <p className="text-foreground">{item.visualExample.after}</p>
          </div>
        </div>
      )}
    </article>
  )
}

function PriorityListSection({
  items, 
  showAll, 
  onShowAllChange, 
}: {
  items: PriorityItem[]
  showAll: boolean
  onShowAllChange: (showAll: boolean) => void
}) {
  if (items.length === 0) {
    return (
      <section className="rounded-3xl bg-white/70 p-6 ring-1 ring-border">
        <p className="text-sm leading-relaxed text-foreground/70">
          Aucun point de vigilance n’a été détecté pour ces réponses. Les
          recommandations générées restent utilisables comme pistes
          d’amélioration.
        </p>
      </section>
    )
  }

  const visibleItems = showAll ? items : items.slice(0,  INITIAL_VISIBLE_ITEMS)
  const hiddenCount = items.length - INITIAL_VISIBLE_ITEMS
  const listId = 'priority-list'

  return (
    <section aria-labelledby="priority-list-heading">
      <h2
        id="priority-list-heading"
        className="mb-4 text-xl font-semibold text-foreground"
      >
        Recommandations
      </h2>

      <div id={listId} className="flex flex-col gap-4">
        {visibleItems.map((item,  index) =>
          item.tier === 'major' ? (
            <PriorityItemCard key={item.id} item={item} rank={index} />
          ) : (
            <CompactItemCard key={item.id} item={item} />
          ), 
        )}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-6 flex justify-center">
          <Button
            variant="outline"
            onClick={() => onShowAllChange(!showAll)}
            aria-expanded={showAll}
            aria-controls={listId}
            className="gap-1.5 border-primary text-primary hover:bg-secondary"
          >
            {showAll
              ? 'Afficher moins'
              : `Afficher ${hiddenCount} point${hiddenCount > 1 ? 's' : ''} de plus`}
            <ChevronDown
              size={16}
              className={[
                'shrink-0 transition-transform duration-200', 
                showAll ? 'rotate-180' : '', 
              ].join(' ')}
              aria-hidden="true"
            />
          </Button>
        </div>
      )}
    </section>
  )
}

// Referme le rapport sur une synthèse actionnable plutôt que de laisser la
// lecture s'arrêter net après la dernière carte : les 3-4 actions les plus
// importantes,  dans l'ordre où elles ont déjà été présentées.
const CONCLUSION_ACTIONS_COUNT = 4

function ActionSummarySection({
  items, 
  copyState, 
  onCopySummary, 
  onDownloadPdf, 
  onRestart, 
}: {
  items: PriorityItem[]
  copyState: CopyState
  onCopySummary: () => void
  onDownloadPdf: () => void
  onRestart: () => void
}) {
  const topItems = items.slice(0,  CONCLUSION_ACTIONS_COUNT)

  if (topItems.length === 0) {
    return null
  }

  return (
    <section className="border-t border-border pt-10">
      <p className="text-xs font-medium tracking-wide text-foreground/40">Conclusion</p>

      <h2 className="mt-2 text-xl font-semibold text-foreground">
        Plan d’action recommandé
      </h2>

      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-foreground/70">
        {topItems.length > 1
          ? `Les ${topItems.length} actions à traiter en priorité pour ce projet :`
          : 'L’action à traiter en priorité pour ce projet :'}
      </p>

      <ol className="mt-4 flex max-w-2xl flex-col gap-2.5">
        {topItems.map((item,  index) => (
          <li key={item.id} className="flex gap-3 text-[15px] leading-relaxed">
            <span className="text-foreground/35 tabular-nums">{index + 1}.</span>
            <span className="text-foreground/80">{item.action}</span>
          </li>
        ))}
      </ol>

      {/* Les actions utilitaires arrivent ici,  une fois le rapport lu, pas
          avant,  comme un PDF qu'on lit d'abord et qu'on télécharge ensuite. */}
      <div className="mt-8 flex flex-wrap gap-3 print:hidden">
        <Button
          variant="ghost"
          onClick={onCopySummary}
          disabled={copyState === 'success'}
          className="text-sm font-medium text-foreground/70 hover:bg-foreground/[0.04]"
        >
          {copyState === 'success'
            ? 'Résumé copié'
            : copyState === 'error'
              ? 'Copie impossible'
              : 'Copier le résumé'}
        </Button>

        <Button
          variant="outline"
          onClick={onDownloadPdf}
          className="border-border text-foreground/70 hover:bg-foreground/[0.04]"
        >
          Télécharger en PDF
        </Button>

        <Button
          variant="outline"
          onClick={onRestart}
          className="border-border text-foreground/70 hover:bg-foreground/[0.04]"
        >
          Recommencer
        </Button>
      </div>
    </section>
  )
}

function AiPromptSection({ result }: { result: EvaluationResult }) {
  const [copyState,  setCopyState] = useState<CopyState>('idle')
  const [showPrompt,  setShowPrompt] = useState(false)

  const prompt = useMemo(() => buildAiPrompt(result),  [result])
  const priorityItemsCount = useMemo(() => getPriorityItems(result).length,  [result])

  async function handleCopyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopyState('success')
    } catch {
      setCopyState('error')
    } finally {
      window.setTimeout(() => {
        setCopyState('idle')
      },  3000)
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
          <h2 id="ai-prompt-heading" className="text-xl font-semibold text-foreground">
            Préparer une analyse IA
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-foreground/65">
            Sert à reformuler ou préparer une synthèse,  sans remplacer le résultat
            ci-dessus. Aucun appel API n’est fait depuis le site : pas de clé,  pas de coût.
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
            <li>• {priorityItemsCount} point(s) au total dans le plan d’action</li>
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
              className="gap-1.5 border-primary text-primary hover:bg-secondary"
              onClick={() => setShowPrompt((current) => !current)}
              aria-expanded={showPrompt}
              aria-controls={promptPanelId}
            >
              {showPrompt ? 'Masquer le prompt' : 'Voir le prompt'}
              <ChevronDown
                size={16}
                className={[
                  'shrink-0 transition-transform duration-200', 
                  showPrompt ? 'rotate-180' : '', 
                ].join(' ')}
                aria-hidden="true"
              />
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

  const [result,  setResult] = useState<EvaluationResult | null>(null)
  const [isClientContext,  setIsClientContext] = useState(false)
  const [hasLoaded,  setHasLoaded] = useState(false)
  const [copyState,  setCopyState] = useState<CopyState>('idle')
  const [showAllItems,  setShowAllItems] = useState(false)
  const [activeItemId,  setActiveItemId] = useState<string | null>(null)

  useEffect(() => {
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0,  left: 0,  behavior: 'auto' })
    })
  },  [])

  useEffect(() => {
    const storedAnswers = loadAnswers() as StoredAnswer[] | null

    if (!storedAnswers || storedAnswers.length === 0) {
      setHasLoaded(true)
      return
    }

    const evaluationAnswers = toEvaluationAnswers(storedAnswers)
    const evaluationResult = evaluateAnswers(evaluationAnswers)

    setResult(evaluationResult)
    setIsClientContext(evaluationAnswers.Q19 === 'client_argument')
    setHasLoaded(true)
  },  [])

  const priorityItems = useMemo(() => {
    if (!result) {
      return []
    }

    return getPriorityItems(result)
  },  [result])

  // Repère la carte actuellement la plus visible pour mettre en évidence
  // l'élément correspondant dans le plan d'action (technique de scrollspy :
  // une fine bande proche du haut de l'écran fait office de ligne de détection).
  useEffect(() => {
    if (priorityItems.length === 0) {
      return
    }

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-priority-item-id]'), 
    )

    if (elements.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a,  b) => a.boundingClientRect.top - b.boundingClientRect.top)

        const topEntry = visibleEntries[0]

        if (topEntry) {
          const id = topEntry.target.getAttribute('data-priority-item-id')

          if (id) {
            setActiveItemId(id)
          }
        }
      }, 
      { rootMargin: '-15% 0px -70% 0px',  threshold: 0 }, 
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  },  [priorityItems,  showAllItems])

  function handleNavigate(id: string) {
    const index = priorityItems.findIndex((item) => item.id === id)
    const isHidden = index >= INITIAL_VISIBLE_ITEMS && !showAllItems

    if (isHidden) {
      setShowAllItems(true)
    }

    // Double rAF : laisse le temps au DOM de refléter l'état déplié avant
    // de mesurer la position de la carte à atteindre (même technique que
    // le scroll de section dans le questionnaire).
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: 'smooth', 
          block: 'start', 
        })
      })
    })
  }

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
      },  3000)
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
          Vous n’avez pas encore complété le questionnaire,  ou vos réponses ont
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
      <DiagnosticHero
        result={result}
        priorityItems={priorityItems}
        onNavigate={handleNavigate}
      />

      <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:items-start">
        <ActionPlanNav
          items={priorityItems}
          activeId={activeItemId}
          onNavigate={handleNavigate}
        />

        <PriorityListSection
          items={priorityItems}
          showAll={showAllItems}
          onShowAllChange={setShowAllItems}
        />
      </div>

      <ActionSummarySection
        items={priorityItems}
        copyState={copyState}
        onCopySummary={handleCopySummary}
        onDownloadPdf={handleDownloadPdf}
        onRestart={handleRestart}
      />

      <AiPromptSection result={result} />

      {isClientContext && <ClientArgumentSection result={result} />}
    </div>
  )
}
