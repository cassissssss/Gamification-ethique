import type { Answer,  Tag } from '@/types/principle'
import { evaluationQuestions } from '@/data/questions'

export function computeTags(answers: Answer[]): Tag[] {
  const tagSet = new Set<Tag>()

  for (const answer of answers) {
    const question = evaluationQuestions.find((q) => q.id === answer.questionId)

    if (!question) {
      continue
    }

    for (const optionId of answer.selectedOptionIds) {
      const option = question.options.find((o) => o.id === optionId)

      if (!option) {
        continue
      }

      for (const tag of option.tags) {
        tagSet.add(tag as unknown as Tag)
      }
    }
  }

  return Array.from(tagSet)
}