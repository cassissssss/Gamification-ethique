import { evaluationQuestions } from "../data/questions";
import type { EvaluationAnswers, EvaluationQuestion, OptionId, QuestionId } from "./evaluation.types";

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
): boolean => optionIds.some((optionId) => hasSelected(answers, questionId, optionId));

export const isQuestionVisible = (
  questionId: QuestionId,
  answers: EvaluationAnswers,
): boolean => {
  switch (questionId) {
    case "Q7":
      // Décision d'intégration : Q7 est toujours affichée pour éviter une dépendance à Q8/Q9, qui arrivent après dans le parcours.
      return true;

    case "Q8":
      return hasAnySelected(answers, "Q1", [
        "project_open",
        "insufficient_info",
        "client_recommendation",
      ]);

    case "Q9":
  return hasAnySelected(answers, "Q1", [
    "project_open",
    "insufficient_info",
    "mechanics_envisaged",
    "mechanic_requested",
    "client_recommendation",
  ]);

    case "Q15":
      return (
        hasAnySelected(answers, "Q9", [
          "ranking",
          "comparison_users",
          "badges_trophies",
          "rewards_benefits",
        ]) ||
        hasAnySelected(answers, "Q8", ["value_contribution", "collective_dynamic"]) ||
        hasAnySelected(answers, "Q10", ["symbolic_recognition", "social_comparison"])
      );

    case "Q16":
      return (
        hasAnySelected(answers, "Q9", [
          "streak",
          "notifications_reminders",
          "rewards_benefits",
          "levels",
          "progress_bar",
        ]) ||
        hasAnySelected(answers, "Q14", [
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
  return questions.filter((question) => isQuestionVisible(question.id, answers));
};

export const removeHiddenAnswers = (answers: EvaluationAnswers): EvaluationAnswers => {
  const visibleQuestionIds = new Set(getVisibleQuestions(answers).map((question) => question.id));

  return Object.entries(answers).reduce<EvaluationAnswers>((cleanedAnswers, [questionId, value]) => {
    if (visibleQuestionIds.has(questionId as QuestionId)) {
      cleanedAnswers[questionId as QuestionId] = value;
    }

    return cleanedAnswers;
  }, {});
};
