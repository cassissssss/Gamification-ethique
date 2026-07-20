import { evaluationQuestions } from "../data/questions";
import type { EvaluationAnswers,  EvaluationQuestion,  OptionId,  QuestionId } from "./evaluation.types";

const toArray = (value: EvaluationAnswers[QuestionId]): OptionId[] => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

export const hasSelected = (
  answers: EvaluationAnswers, 
  questionId: QuestionId, 
  optionId: OptionId, 
): boolean => toArray(answers[questionId]).includes(optionId);

export const hasAnySelected = (
  answers: EvaluationAnswers, 
  questionId: QuestionId, 
  optionIds: OptionId[], 
): boolean => optionIds.some((optionId) => hasSelected(answers,  questionId,  optionId));

export const isQuestionVisible = (
  questionId: QuestionId, 
  answers: EvaluationAnswers, 
): boolean => {
  switch (questionId) {
    case "Q9":
      // Décision d'intégration : Q9 (données) est toujours affichée pour éviter une dépendance à Q11/Q12,  qui arrivent après dans le parcours.
      return true;

    case "Q11":
      return hasAnySelected(answers,  "Q1",  [
        "project_open", 
        "insufficient_info", 
      ]);

    case "Q12":
      return hasAnySelected(answers,  "Q1",  [
        "project_open", 
        "insufficient_info", 
        "mechanics_envisaged", 
        "mechanic_requested", 
      ]);

    case "Q17":
      return (
        hasAnySelected(answers,  "Q12",  [
          "ranking", 
          "comparison_users", 
          "badges_trophies", 
          "rewards_benefits", 
        ]) ||
        hasAnySelected(answers,  "Q11",  ["value_contribution",  "collective_dynamic"]) ||
        hasAnySelected(answers,  "Q10",  ["symbolic_recognition",  "social_comparison"])
      );

    case "Q18":
      return (
        hasAnySelected(answers,  "Q12",  [
          "streak", 
          "notifications_reminders", 
          "rewards_benefits", 
          "levels", 
          "progress_bar", 
          "random_reward", 
        ]) ||
        hasAnySelected(answers,  "Q16",  [
          "regularity_encouraged", 
          "regularity_valued", 
          "interruption_changes_progress", 
        ])
      );

    default:
      return true;
  }
};

export const getVisibleQuestions = (
  answers: EvaluationAnswers, 
  questions: EvaluationQuestion[] = evaluationQuestions, 
): EvaluationQuestion[] => {
  return questions.filter((question) => isQuestionVisible(question.id,  answers));
};

export const removeHiddenAnswers = (answers: EvaluationAnswers): EvaluationAnswers => {
  const visibleQuestionIds = new Set(getVisibleQuestions(answers).map((question) => question.id));

  return Object.entries(answers).reduce<EvaluationAnswers>((cleanedAnswers,  [questionId,  value]) => {
    if (visibleQuestionIds.has(questionId as QuestionId)) {
      cleanedAnswers[questionId as QuestionId] = value;
    }

    return cleanedAnswers;
  },  {});
};
