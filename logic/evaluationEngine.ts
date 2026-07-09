import type {
  EvaluationAnswers,
  EvaluationResult,
  GlobalOrientation,
  RiskLevel,
  RiskThemeResult,
} from './evaluation.types'
import { getVisibleQuestions } from './visibilityEngine'
import { getPositiveRecommendations } from './recommendationEngine'
import { getRiskThemes } from './riskEngine'
import { getContradictions } from './contradictionEngine'
import { getMechanicsAlternatives } from './mechanicsEngine'

export function evaluateAnswers(answers: EvaluationAnswers): EvaluationResult {
  const visibleQuestions = getVisibleQuestions(answers)
  const contradictions = getContradictions(answers)
  const positiveRecommendations = getPositiveRecommendations(answers)
  const riskThemes = getRiskThemes(answers)
  const mechanicsAlternatives = getMechanicsAlternatives(answers)

  const globalOrientation = getGlobalOrientation({
    answers,
    riskThemes,
    blockingContradictionsCount: contradictions.filter(
      (contradiction) => contradiction.severity === 'blocking',
    ).length,
    warningsCount: contradictions.filter(
      (contradiction) => contradiction.severity === 'warning',
    ).length,
    mechanicsAlternativesCount: mechanicsAlternatives.length,
  })

  return {
    visibleQuestions,
    contradictions,
    positiveRecommendations,
    riskThemes,
    mechanicsAlternatives,
    globalOrientation,
  }
}

interface GlobalOrientationInput {
  answers: EvaluationAnswers
  riskThemes: RiskThemeResult[]
  blockingContradictionsCount: number
  warningsCount: number
  mechanicsAlternativesCount: number
}

function getGlobalOrientation(input: GlobalOrientationInput): GlobalOrientation {
  const {
    answers,
    riskThemes,
    blockingContradictionsCount,
    warningsCount,
    mechanicsAlternativesCount,
  } = input

  const criticalThemesCount = countRiskThemesByLevel(riskThemes, 'critical')
  const highThemesCount = countRiskThemesByLevel(riskThemes, 'high')
  const moderateThemesCount = countRiskThemesByLevel(riskThemes, 'moderate')

  if (blockingContradictionsCount > 0) {
    return {
      id: 'clarify_before_deciding',
      title: 'Clarifier le projet avant de valider la mécanique',
      summary:
        'Certaines réponses indiquent une incohérence importante. Le projet doit être clarifié avant de pouvoir recommander une mécanique de manière fiable.',
      nextStep:
        'Revenir sur les points contradictoires, préciser le rôle de la gamification et vérifier si la participation est réellement optionnelle.',
    }
  }

  if (hasUnclearProjectBasis(answers)) {
    return {
      id: 'clarify_before_deciding',
      title: 'Revenir au cadrage avant de choisir une direction',
      summary:
        'Plusieurs réponses indiquent que le besoin, l’action principale ou la direction gamifiée ne sont pas encore suffisamment définis.',
      nextStep:
        'Clarifier le besoin utilisateur, l’action à soutenir et le contexte d’usage avant de choisir une mécanique précise.',
    }
  }

  if (criticalThemesCount > 0 || highThemesCount >= 2) {
    return {
      id: 'high_vigilance_required',
      title: 'Vigilance élevée avant conception',
      summary:
        'Plusieurs signaux de vigilance sont détectés. La gamification peut être envisagée, mais elle doit être fortement encadrée et adaptée.',
      nextStep:
        'Traiter les thématiques à vigilance élevée, réduire les mécaniques les plus sensibles et privilégier des alternatives plus sobres.',
    }
  }

  if (warningsCount > 0 || highThemesCount === 1) {
    return {
      id: 'adapt_mechanics',
      title: 'Mécanique à adapter avant validation',
      summary:
        'Le projet peut contenir des mécaniques pertinentes, mais certaines réponses montrent des points à ajuster pour limiter les effets indésirables.',
      nextStep:
        'Examiner les contradictions ou signaux principaux, puis adapter les mécaniques concernées avec les alternatives proposées.',
    }
  }

  if (moderateThemesCount > 0 || mechanicsAlternativesCount > 0) {
    return {
      id: 'gamification_under_conditions',
      title: 'Gamification pertinente sous conditions',
      summary:
        'La gamification semble possible, à condition de conserver une logique claire, proportionnée et compréhensible pour l’utilisateur-rice.',
      nextStep:
        'Conserver les mécaniques utiles, expliquer leur fonctionnement et vérifier que les recommandations positives sont bien appliquées.',
    }
  }

  return {
    id: 'light_gamification_recommended',
    title: 'Gamification légère recommandée',
    summary:
      'Aucun signal fort n’a été détecté. Une gamification légère peut soutenir l’expérience si elle reste utile, transparente et non intrusive.',
    nextStep:
      'Privilégier des mécaniques simples comme le feedback, les étapes visibles ou la progression personnelle.',
  }
}

function countRiskThemesByLevel(
  riskThemes: RiskThemeResult[],
  level: RiskLevel,
): number {
  return riskThemes.filter((theme) => theme.level === level).length
}

function hasUnclearProjectBasis(answers: EvaluationAnswers): boolean {
  return (
    hasSelectedOption(answers, 'Q1', 'insufficient_info') ||
    hasSelectedOption(answers, 'Q2', 'need_unclear') ||
    hasSelectedOption(answers, 'Q4', 'action_undefined') ||
    hasSelectedOption(answers, 'Q8', 'direction_undefined') ||
    hasSelectedOption(answers, 'Q10', 'motivation_unclear')
  )
}

function hasSelectedOption(
  answers: EvaluationAnswers,
  questionId: keyof EvaluationAnswers,
  optionId: string,
): boolean {
  const answer = answers[questionId]

  if (!answer) {
    return false
  }

  if (Array.isArray(answer)) {
    return answer.includes(optionId)
  }

  return answer === optionId
}