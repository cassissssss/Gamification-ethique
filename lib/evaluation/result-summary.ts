import type { VerdictLevel, Tag, Recommendation } from '@/types'
import { verdicts } from '@/data/verdicts'
import { tagDefinitions } from '@/data/tags'

const VERDICT_EXPLANATIONS: Record<VerdictLevel, string> = {
  retour_cadrage:
    `Le projet manque encore d'éléments fondamentaux pour évaluer la pertinence d'une gamification. L'objectif, le public cible ou le type de motivation recherché ne sont pas suffisamment définis.`,
  gamification_deconseillee:
    `Plusieurs facteurs de risque importants se cumulent dans ce projet : public vulnérable, mécaniques coercitives, transparence insuffisante ou risques de dépendance.`,
  gamification_sous_conditions:
    `La gamification est envisageable dans ce projet, mais des points de vigilance ont été identifiés. Des ajustements sont nécessaires avant la mise en production.`,
  gamification_legere:
    `Le projet ne présente pas de risques majeurs, mais le contexte appelle à la discrétion. Une gamification légère est préférable aux mécaniques de compétition ou de pression.`,
  gamification_pertinente:
    `Le projet semble compatible avec une gamification éthique bien conçue. Les objectifs sont clairs et les mécaniques envisagées paraissent alignées avec les besoins des utilisateur-rices.`,
}

const MAX_RECOMMENDATIONS = 5

export function buildResultSummary(
  verdict: VerdictLevel,
  tags: Tag[],
  recommendations: Recommendation[]
): string {
  const verdictDef    = verdicts.find((v) => v.level === verdict)
  const verdictLabel  = verdictDef?.label ?? verdict
  const explanation   = VERDICT_EXPLANATIONS[verdict]

  const lines: string[] = []

  // ─── Titre ────────────────────────────────────────────────────────────────
  lines.push('ÉVALUATION ÉTHIQUE DE GAMIFICATION')
  lines.push('═'.repeat(40))
  lines.push('')

  // ─── Verdict ──────────────────────────────────────────────────────────────
  lines.push('VERDICT')
  lines.push(`→ ${verdictLabel}`)
  lines.push('')

  // ─── Pourquoi ce verdict ──────────────────────────────────────────────────
  lines.push('POURQUOI CE VERDICT ?')
  lines.push(explanation)
  lines.push('')

  // ─── Points détectés ──────────────────────────────────────────────────────
  if (tags.length > 0) {
    lines.push('POINTS DÉTECTÉS')

    for (const tag of tags) {
      const def = tagDefinitions.find((d) => d.tag === tag)
      if (def) {
        lines.push(`• ${def.label}`)
      }
    }

    lines.push('')
  }

  // ─── Recommandations ──────────────────────────────────────────────────────
  const prioritized = [
    ...recommendations.filter((r) => r.priority === 'haute'),
    ...recommendations.filter((r) => r.priority !== 'haute'),
  ].slice(0, MAX_RECOMMENDATIONS)

  if (prioritized.length > 0) {
    lines.push(`RECOMMANDATIONS PRIORITAIRES (${prioritized.length} sur ${recommendations.length})`)

    prioritized.forEach((rec, index) => {
      const priorityLabel =
        rec.priority === 'haute'   ? '[Priorité haute]'   :
        rec.priority === 'moyenne' ? '[Priorité moyenne]' :
                                     '[Priorité basse]'

      lines.push('')
      lines.push(`${index + 1}. ${rec.title} ${priorityLabel}`)
      lines.push(`   ${rec.description}`)
    })

    lines.push('')
  }

  // ─── Note finale ──────────────────────────────────────────────────────────
  lines.push('─'.repeat(40))
  lines.push(
    `Ce résultat est un support de discussion. Il ne remplace pas une analyse juridique, un test utilisateur ou une décision de projet.`
  )
  lines.push('Généré avec l\'outil Gamification Éthique — Travail de Bachelor.')

  return lines.join('\n')
}