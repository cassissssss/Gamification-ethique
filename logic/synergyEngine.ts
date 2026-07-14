import type {
  EvaluationAnswers,
  OptionId,
  QuestionId,
  RiskLevel,
  SynergyResult,
} from './evaluation.types'

/**
 * Contrairement à la matrice de pondération (qui additionne des signaux
 * indépendants), ce moteur capture des combinaisons précises de réponses
 * dont le risque combiné dépasse la simple somme des signaux pris
 * séparément — l'effet est multiplicatif, pas additif.
 */
interface SynergyRule {
  id: string
  title: string
  message: string
  recommendation: string
  level: RiskLevel
  sourceQuestionIds: QuestionId[]
  matches: (answers: EvaluationAnswers) => boolean
}

function getSelectedOptionIds(
  answers: EvaluationAnswers,
  questionId: QuestionId,
): OptionId[] {
  const answer = answers[questionId]

  if (!answer) {
    return []
  }

  return Array.isArray(answer) ? answer : [answer]
}

function hasSelectedOption(
  answers: EvaluationAnswers,
  questionId: QuestionId,
  optionId: OptionId,
): boolean {
  return getSelectedOptionIds(answers, questionId).includes(optionId)
}

function hasAnySelectedOption(
  answers: EvaluationAnswers,
  questionId: QuestionId,
  optionIds: OptionId[],
): boolean {
  const selectedOptionIds = getSelectedOptionIds(answers, questionId)

  return optionIds.some((optionId) => selectedOptionIds.includes(optionId))
}

const temporalPressureMechanicOptionIds: OptionId[] = [
  'streak',
  'notifications_reminders',
  'random_reward',
]

const synergyRules: SynergyRule[] = [
  {
    id: 'synergy_ranking_streak_random_reward',
    title: 'Classement, série de jours et récompense aléatoire combinés',
    message:
      'Comparaison sociale, pression temporelle et renforcement à ratio variable combinés : chacune de ces mécaniques est déjà sensible seule, mais leur combinaison crée une boucle de compulsion nettement plus forte que la somme de leurs scores individuels.',
    recommendation:
      'Justification écrite obligatoire si cette combinaison est maintenue ; recommander de retirer au moins une des trois mécaniques.',
    level: 'critical',
    sourceQuestionIds: ['Q12'],
    matches: (answers) =>
      hasSelectedOption(answers, 'Q12', 'ranking') &&
      hasSelectedOption(answers, 'Q12', 'streak') &&
      hasSelectedOption(answers, 'Q12', 'random_reward'),
  },
  {
    id: 'synergy_streak_notifications_interruption_loss',
    title: 'Rappels et série de jours couplés à une perte réelle',
    message:
      'Rappel actif et série à maintenir, couplés à une perte tangible en cas d’interruption : la pression au retour n’est plus seulement symbolique, elle a une conséquence concrète, ce qui renforce fortement la compulsion.',
    recommendation:
      'Exiger une règle de reprise sans perte significative (voir Q18) avant de valider cette combinaison.',
    level: 'critical',
    sourceQuestionIds: ['Q12', 'Q16'],
    matches: (answers) =>
      hasSelectedOption(answers, 'Q12', 'streak') &&
      hasSelectedOption(answers, 'Q12', 'notifications_reminders') &&
      hasSelectedOption(answers, 'Q16', 'interruption_changes_progress'),
  },
  {
    id: 'synergy_health_impact_temporal_pressure',
    title: 'Enjeu de santé et mécanique de pression temporelle',
    message:
      'Dans un contexte à enjeu de santé ou de sécurité, une mécanique de pression temporelle ou de dépendance n’a pas le même poids que dans un contexte de loisir : le même mécanisme devient nettement plus risqué.',
    recommendation:
      'Reconsidérer en priorité toute mécanique de pression temporelle dans ce contexte ; privilégier des alternatives non compulsives.',
    level: 'critical',
    sourceQuestionIds: ['Q8', 'Q12'],
    matches: (answers) =>
      hasSelectedOption(answers, 'Q8', 'health_safety_impact') &&
      hasAnySelectedOption(answers, 'Q12', temporalPressureMechanicOptionIds),
  },
  {
    id: 'synergy_ranking_young_audience_visible',
    title: 'Classement visible pour un public jeune',
    message:
      'Comparaison sociale publique et visible, appliquée à un public en développement : le risque de découragement ou de pression sociale est amplifié par rapport à un public adulte.',
    recommendation:
      'Recommander un classement privé ou une comparaison à soi-même plutôt qu’aux autres pour ce public.',
    level: 'high',
    sourceQuestionIds: ['Q6', 'Q12', 'Q17'],
    matches: (answers) =>
      hasSelectedOption(answers, 'Q12', 'ranking') &&
      hasSelectedOption(answers, 'Q6', 'young_audience') &&
      hasSelectedOption(answers, 'Q17', 'ranking_comparison'),
  },
]

export function getSynergyResults(answers: EvaluationAnswers): SynergyResult[] {
  return synergyRules
    .filter((rule) => rule.matches(answers))
    .map((rule) => ({
      id: rule.id,
      title: rule.title,
      message: rule.message,
      recommendation: rule.recommendation,
      level: rule.level,
      sourceQuestionIds: rule.sourceQuestionIds,
    }))
    .sort(sortSynergiesByLevel)
}

function sortSynergiesByLevel(first: SynergyResult, second: SynergyResult): number {
  const levelWeight: Record<RiskLevel, number> = {
    critical: 5,
    high: 4,
    moderate: 3,
    low: 2,
    none: 1,
  }

  return levelWeight[second.level] - levelWeight[first.level]
}
