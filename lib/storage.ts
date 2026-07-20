import type { Answer } from '@/types/principle'

const KEYS = {
  answers:   'gamification_ethique_answers', 
  guideSeen: 'gamification_ethique_guide_seen', 
} as const

// ─── Réponses ─────────────────────────────────────────────────────────────────

export function saveAnswers(answers: Answer[]): void {
  try {
    localStorage.setItem(KEYS.answers,  JSON.stringify(answers))
  } catch (error) {
    console.error('[storage] Impossible de sauvegarder les réponses :',  error)
  }
}

export function loadAnswers(): Answer[] | null {
  try {
    const raw = localStorage.getItem(KEYS.answers)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    return parsed as Answer[]
  } catch (error) {
    console.error('[storage] Impossible de charger les réponses :',  error)
    return null
  }
}

export function clearAnswers(): void {
  try {
    localStorage.removeItem(KEYS.answers)
  } catch (error) {
    console.error('[storage] Impossible de supprimer les réponses :',  error)
  }
}

// ─── Guide d'utilisation ──────────────────────────────────────────────────────

export function hasSeenGuide(): boolean {
  try {
    return localStorage.getItem(KEYS.guideSeen) === 'true'
  } catch (error) {
    console.error('[storage] Impossible de lire l\'état du guide :',  error)
    return false
  }
}

export function markGuideAsSeen(): void {
  try {
    localStorage.setItem(KEYS.guideSeen,  'true')
  } catch (error) {
    console.error('[storage] Impossible de marquer le guide comme vu :',  error)
  }
}

export function resetGuideSeen(): void {
  try {
    localStorage.removeItem(KEYS.guideSeen)
  } catch (error) {
    console.error('[storage] Impossible de réinitialiser l\'état du guide :',  error)
  }
}