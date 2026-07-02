"use client";

import { useEffect, useMemo, useState } from "react";
import { evaluationQuestions, evaluationSections } from "../data/questions";
import {
  getVisibleQuestions,
  removeHiddenAnswers,
} from "@/logic/visibilityEngine";
import type {
  EvaluationAnswers,
  EvaluationQuestion,
  OptionId,
  QuestionId,
} from "@/logic/evaluation.types";

const toArray = (value: EvaluationAnswers[QuestionId]): OptionId[] => {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
};

export const useEvaluationForm = (initialAnswers: EvaluationAnswers = {}) => {
  const [answers, setAnswers] = useState<EvaluationAnswers>(initialAnswers);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const visibleQuestions = useMemo(() => {
    return getVisibleQuestions(answers);
  }, [answers]);

  const visibleSections = useMemo(() => {
    const sections = new Set(
      visibleQuestions.map((question) => question.section),
    );

    return evaluationSections.filter((section) => sections.has(section));
  }, [visibleQuestions]);

  useEffect(() => {
    setCurrentSectionIndex((currentIndex) => {
      if (visibleSections.length === 0) {
        return 0;
      }

      return Math.min(currentIndex, visibleSections.length - 1);
    });
  }, [visibleSections.length]);

  const currentSection =
    visibleSections[currentSectionIndex] ?? visibleSections[0];

  const currentQuestions = useMemo(() => {
    return visibleQuestions.filter(
      (question) => question.section === currentSection,
    );
  }, [currentSection, visibleQuestions]);

  const setRadioAnswer = (questionId: QuestionId, optionId: OptionId) => {
    setAnswers((previousAnswers) =>
      removeHiddenAnswers({
        ...previousAnswers,
        [questionId]: optionId,
      }),
    );
  };

  const toggleCheckboxAnswer = (
    question: EvaluationQuestion,
    optionId: OptionId,
  ) => {
    setAnswers((previousAnswers) => {
      const currentValues = toArray(previousAnswers[question.id]);
      const selectedOption = question.options.find(
        (option) => option.id === optionId,
      );
      const alreadySelected = currentValues.includes(optionId);

      let nextValues: OptionId[];

      if (alreadySelected) {
        nextValues = currentValues.filter((value) => value !== optionId);
      } else if (selectedOption?.isExclusive) {
        nextValues = [optionId];
      } else {
        const exclusiveOptionIds = question.options
          .filter((option) => option.isExclusive)
          .map((option) => option.id);

        const valuesWithoutExclusiveOptions = currentValues.filter(
          (value) => !exclusiveOptionIds.includes(value),
        );

        const hasReachedMaxSelections =
          question.maxSelections > 0 &&
          valuesWithoutExclusiveOptions.length >= question.maxSelections;

        if (hasReachedMaxSelections) {
          return previousAnswers;
        }

        nextValues = [...valuesWithoutExclusiveOptions, optionId];
      }

      return removeHiddenAnswers({
        ...previousAnswers,
        [question.id]: nextValues,
      });
    });
  };

  const goToNextSection = () => {
    setCurrentSectionIndex((index) =>
      Math.min(index + 1, visibleSections.length - 1),
    );
  };

  const goToPreviousSection = () => {
    setCurrentSectionIndex((index) => Math.max(index - 1, 0));
  };

  return {
    answers,
    currentSection,
    currentSectionIndex,
    currentQuestions,
    setRadioAnswer,
    toggleCheckboxAnswer,
    goToNextSection,
    goToPreviousSection,
    isFirstSection: currentSectionIndex === 0,
    isLastSection: currentSectionIndex === visibleSections.length - 1,
    progress:
      visibleSections.length === 0
        ? 0
        : (currentSectionIndex + 1) / visibleSections.length,
    questions: evaluationQuestions,
    visibleQuestions,
    visibleSections,
  };
};