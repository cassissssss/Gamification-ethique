// ─── Tags ─────────────────────────────────────────────────────────────────────

export type Tag =
  | 'public_vulnerable'
  | 'dependance_risque'
  | 'transparence_absente'
  | 'autonomie_reduite'
  | 'pression_temporelle'
  | 'pression_sociale'
  | 'motivation_extrinseque'
  | 'consentement_flou'
  | 'progression_claire'
  | 'feedback_adequat'
  | 'objectif_aligne'
  | 'contexte_sensible'
  | 'cadrage_insuffisant'

// ─── Verdicts ─────────────────────────────────────────────────────────────────

export type VerdictLevel =
  | 'retour_cadrage'
  | 'gamification_deconseillee'
  | 'gamification_legere'
  | 'gamification_sous_conditions'
  | 'gamification_pertinente'

export type VerdictTone =
  | 'neutral'
  | 'positive'
  | 'warning'
  | 'danger'
  | 'info'

  // ─── Mechanic ─────────────────────────────────────────────────────────────────

  export type PrincipleMechanic =
  | 'points'
  | 'badges'
  | 'levels'
  | 'leaderboards'
  | 'streaks'
  | 'rewards'
  | 'challenges'
  | 'notifications'
  | 'progress'
  | 'missions'

// ─── Questions ────────────────────────────────────────────────────────────────

export interface ShowIfCondition {
  questionId: string
  optionIds: string[]
}

export interface Option {
  id: string
  label: string
  tags: Tag[]
}

export interface Question {
  id: string
  text: string
  helpText?: string
  type: 'single' | 'multiple'
  options: Option[]
  section?: string
  maxSelections?: number
  showIf?: ShowIfCondition[]
}

export interface Answer {
  questionId: string
  selectedOptionIds: string[]
}

// ─── Résultats ────────────────────────────────────────────────────────────────

export interface Recommendation {
  id: string
  tag: Tag
  priority: 'haute' | 'moyenne' | 'basse'
  title: string
  description: string
  principleSlug?: string
}

export interface EvaluationResult {
  tags: Tag[]
  verdict: VerdictLevel
  recommendations: Recommendation[]
}

// ─── Principes ────────────────────────────────────────────────────────────────

export interface PrincipleReference {
  title: string
  authors: string
  year: number
  url?: string
}

export interface Principe {
  slug: string
  title: string

  /**
   * Phrase affichée sous le titre
   */
  shortDescription: string

  /**
   * Dans quels cas ce principe est important ?
   */
  whenToUse: string

  /**
   * Pourquoi ce principe est important ?
   */
  why: string

  /**
   * Explication du principe
   */
  content: string

  /**
   * Conséquence d'une mauvaise conception
   */
  impact: string

  /**
   * Mécaniques concernées
   */
  relatedMechanics: PrincipleMechanic[]

  /**
   * Les idées essentielles
   */
  takeaways: string[]

  /**
   * Bonnes pratiques
   */
  goodPractices: string[]

  /**
   * Erreurs fréquentes
   */
  avoid: string[]

  /**
   * Question pour aider l'évaluation
   */
  evaluationQuestion: string

  references: PrincipleReference[]

  relatedTags: Tag[]
}

// ─── Verdict (définition éditoriale) ──────────────────────────────────────────

export interface VerdictDefinition {
  level: VerdictLevel
  label: string
  description: string
  tone: VerdictTone
  icon?: string
}

// ─── Tag (définition éditoriale) ──────────────────────────────────────────────

export interface TagDefinition {
  tag: Tag
  label: string
  description: string
}