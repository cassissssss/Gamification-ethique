import type { Tag, VerdictLevel } from '@/types'

// ─── Tags classés par nature ──────────────────────────────────────────────────

const RISK_TAGS_HIGH: Tag[] = [
  'public_vulnerable',
  'dependance_risque',
  'consentement_flou',
  'autonomie_reduite',
]

const RISK_TAGS_MEDIUM: Tag[] = [
  'transparence_absente',
  'pression_temporelle',
  'pression_sociale',
  'motivation_extrinseque',
  'contexte_sensible',
]

const POSITIVE_TAGS: Tag[] = [
  'objectif_aligne',
  'progression_claire',
  'feedback_adequat',
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function countMatches(tags: Tag[], reference: Tag[]): number {
  return tags.filter((t) => reference.includes(t)).length
}

function hasAny(tags: Tag[], reference: Tag[]): boolean {
  return tags.some((t) => reference.includes(t))
}

// ─── Moteur de verdict ────────────────────────────────────────────────────────

export function computeVerdict(tags: Tag[]): VerdictLevel {

  // ─── retour_cadrage ───────────────────────────────────────────────────────
  // Le projet manque d'éléments fondamentaux pour être évalué
  if (tags.length === 0 || hasAny(tags, ['cadrage_insuffisant'])) {
    return 'retour_cadrage'
  }

  const highRiskCount   = countMatches(tags, RISK_TAGS_HIGH)
  const mediumRiskCount = countMatches(tags, RISK_TAGS_MEDIUM)
  const positiveCount   = countMatches(tags, POSITIVE_TAGS)

  // ─── gamification_deconseillee ────────────────────────────────────────────
  // Cumul de risques forts : 3 tags high ou plus,
  // ou 2 tags high + public vulnérable + contexte sensible
  if (
    highRiskCount >= 3 ||
    (highRiskCount >= 2 &&
      hasAny(tags, ['public_vulnerable']) &&
      hasAny(tags, ['contexte_sensible']))
  ) {
    return 'gamification_deconseillee'
  }

  // ─── gamification_pertinente ──────────────────────────────────────────────
  // Tags positifs présents, risques faibles ou absents
  if (positiveCount >= 2 && highRiskCount === 0 && mediumRiskCount <= 1) {
    return 'gamification_pertinente'
  }

  if (positiveCount >= 1 && highRiskCount === 0 && mediumRiskCount === 0) {
    return 'gamification_pertinente'
  }

  // ─── gamification_legere ──────────────────────────────────────────────────
  // Pas de risques forts, peu ou pas de risques modérés, pas de tags positifs
  if (highRiskCount === 0 && mediumRiskCount <= 1 && positiveCount === 0) {
    return 'gamification_legere'
  }

  // ─── gamification_sous_conditions ─────────────────────────────────────────
  // Cas intermédiaire : risques présents mais pas rédhibitoires
  return 'gamification_sous_conditions'
}