export type QuestionId =
  | "Q1"
  | "Q2"
  | "Q3"
  | "Q4"
  | "Q5"
  | "Q6"
  | "Q7"
  | "Q8"
  | "Q9"
  | "Q10"
  | "Q11"
  | "Q12"
  | "Q13"
  | "Q14"
  | "Q15"
  | "Q16";

export type QuestionType = "radio" | "checkbox";

export type EvaluationSection =
  | "Mode d'utilisation"
  | "Besoin et intention"
  | "Public et contexte"
  | "Direction de gamification"
  | "Transparence et contrôle"
  | "Temporalité et visibilité";

export type EvaluationTag = string;
export type OptionId = string;

export type EvaluationAnswerValue = OptionId | OptionId[] | undefined;

export type EvaluationAnswers = Partial<Record<QuestionId, EvaluationAnswerValue>>;

export interface EvaluationOption {
  id: OptionId;
  label: string;
  tags: EvaluationTag[];
  isExclusive?: boolean;
}

export interface EvaluationQuestion {
  id: QuestionId;
  section: EvaluationSection;
  title: string;
  type: QuestionType;
  maxSelections: number;
  options: EvaluationOption[];
  note?: string;
  recommendationEffect?: string;
}

export interface VisibleQuestion extends EvaluationQuestion {
  isVisible: true;
}

/**
 * Format utilisé pour sauvegarder les réponses dans le localStorage
 * et les relire sur la page de résultats.
 */
export interface StoredEvaluationAnswer {
  questionId: QuestionId;
  selectedOptionIds: OptionId[];
}

/**
 * Niveau de priorité utilisé pour les recommandations.
 */
export type ResultPriority = "low" | "medium" | "high";

/**
 * Niveau de vigilance utilisé dans la pondération cumulative.
 */
export type RiskLevel = "none" | "low" | "moderate" | "high" | "critical";

/**
 * Thématiques de vigilance issues de la matrice.
 */
export type RiskThemeId =
  | "social_comparison"
  | "autonomy_control"
  | "data_profile"
  | "temporal_pressure"
  | "commercial_conversion"
  | "sensitive_context";

/**
 * Signal de vigilance généré par une réponse.
 */
export interface RiskSignal {
  id: string;
  themeId: RiskThemeId;
  questionId: QuestionId;
  optionId: OptionId;
  weight: number;
  message: string;
}

/**
 * Résultat calculé pour une thématique de vigilance.
 */
export interface RiskThemeResult {
  id: RiskThemeId;
  label: string;
  score: number;
  level: RiskLevel;
  signals: RiskSignal[];
  summary: string;
  recommendation?: string;
}

/**
 * Recommandation positive générée par les réponses.
 * Elle sert à proposer une piste utile, même sans risque élevé.
 */
export interface PositiveRecommendation {
  id: string;
  title: string;
  insight: string;
  recommendation: string;
  priority: ResultPriority;
  sourceQuestionId?: QuestionId;
  sourceOptionId?: OptionId;
  relatedTags?: EvaluationTag[];
  example?: string;
}

/**
 * Niveau d'importance d'une contradiction.
 */
export type ContradictionSeverity = "info" | "warning" | "blocking";

/**
 * Contradiction ou incohérence détectée entre plusieurs réponses.
 */
export interface ContradictionResult {
  id: string;
  title: string;
  message: string;
  recommendation: string;
  severity: ContradictionSeverity;
  sourceQuestionIds: QuestionId[];
  sourceOptionIds?: OptionId[];
}

/**
 * Alternative proposée pour une mécanique gamifiée.
 */
export interface MechanicAlternative {
  id: string;
  mechanicOptionId: OptionId;
  mechanicLabel: string;
  relevantUse: string;
  possibleRisk: string;
  baseVigilanceLevel: RiskLevel;
  ethicalAlternative: string;
  interfaceExample?: string;
  relatedThemeIds: RiskThemeId[];
}

/**
 * Orientation globale donnée à la fin de l'analyse.
 * Elle ne dit pas "éthique" ou "pas éthique", mais donne une direction actionnable.
 */
export type GlobalOrientationId =
  | "clarify_before_deciding"
  | "light_gamification_recommended"
  | "gamification_under_conditions"
  | "adapt_mechanics"
  | "high_vigilance_required";

export interface GlobalOrientation {
  id: GlobalOrientationId;
  title: string;
  summary: string;
  nextStep: string;
}

/**
 * Résultat final retourné par evaluationEngine.ts.
 */
export interface EvaluationResult {
  visibleQuestions: EvaluationQuestion[];
  contradictions: ContradictionResult[];
  positiveRecommendations: PositiveRecommendation[];
  riskThemes: RiskThemeResult[];
  mechanicsAlternatives: MechanicAlternative[];
  globalOrientation: GlobalOrientation;
}