import type { Tag, Recommendation } from '@/types'
import { recommendations } from '@/data/recommendations'

const PRIORITY_ORDER: Record<Recommendation['priority'], number> = {
  haute:   0,
  moyenne: 1,
  basse:   2,
}

export function computeRecommendations(tags: Tag[]): Recommendation[] {
  if (tags.length === 0) return []

  const tagSet = new Set(tags)

  const matched = recommendations.filter((rec) => tagSet.has(rec.tag))

  return matched.sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
  )
}