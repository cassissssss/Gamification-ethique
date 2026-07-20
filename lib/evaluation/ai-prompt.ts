import type { EvaluationResult,  RiskThemeResult } from '@/logic/evaluation.types'

const MAX_RECOMMENDATIONS = 5
const MAX_CONTRADICTIONS = 4
const MAX_RISK_THEMES = 6
const MAX_MECHANICS = 5
const MAX_SYNERGIES = 4

function getActiveRiskThemes(result: EvaluationResult): RiskThemeResult[] {
  return result.riskThemes.filter((theme) => theme.level !== 'none')
}

export function buildAiPrompt(result: EvaluationResult): string {
  const contradictions = result.contradictions
    .slice(0,  MAX_CONTRADICTIONS)
    .map((contradiction,  index) => {
      return `${index + 1}. ${contradiction.title}
   Ce que cela indique : ${contradiction.message}
   À faire : ${contradiction.recommendation}`
    })
    .join('\n\n')

  const riskThemes = getActiveRiskThemes(result)
    .slice(0,  MAX_RISK_THEMES)
    .map((theme,  index) => {
      const signals = theme.signals
        .slice(0,  3)
        .map((signal) => `   - ${signal.message}`)
        .join('\n')

      return `${index + 1}. ${theme.label} (${theme.level})
   Résumé : ${theme.summary}
   À faire : ${theme.recommendation ?? 'À clarifier.'}
${signals ? `   Signaux :\n${signals}` : ''}`
    })
    .join('\n\n')

  const recommendations = result.positiveRecommendations
    .slice(0,  MAX_RECOMMENDATIONS)
    .map((recommendation,  index) => {
      return `${index + 1}. ${recommendation.title}
   Ce que cela indique : ${recommendation.insight}
   À faire : ${recommendation.recommendation}
   ${recommendation.example ? `Exemple : ${recommendation.example}` : ''}`
    })
    .join('\n\n')

  const mechanics = result.mechanicsAlternatives
    .slice(0,  MAX_MECHANICS)
    .map((mechanic,  index) => {
      return `${index + 1}. ${mechanic.mechanicLabel}
   Risque possible : ${mechanic.possibleRisk}
   Alternative : ${mechanic.ethicalAlternative}
   ${mechanic.interfaceExample ? `Exemple : ${mechanic.interfaceExample}` : ''}`
    })
    .join('\n\n')

  const synergies = result.synergyResults
    .slice(0,  MAX_SYNERGIES)
    .map((synergy,  index) => {
      return `${index + 1}. ${synergy.title} (${synergy.level})
   Ce que cela indique : ${synergy.message}
   À faire : ${synergy.recommendation}`
    })
    .join('\n\n')

  return `Tu es un-e spécialiste UX et gamification éthique. Tu aides une équipe projet à relire un résultat généré par un framework.

Important :
- Le framework a déjà produit le résultat principal.
- Tu ne dois pas remplacer ce résultat ni le contredire.
- Ton rôle est d’aider à reformuler,  à préparer une synthèse client et à proposer des questions à vérifier.
- Tu dois rester neutre,  clair et actionnable.
- Ne dis pas simplement "éthique" ou "pas éthique".

---

RÉSULTAT DU FRAMEWORK

Résultat principal :
${result.globalOrientation.title}

Résumé :
${result.globalOrientation.summary}

À faire maintenant :
${result.globalOrientation.nextStep}

Points à clarifier :
${contradictions || '(aucun point particulier)'}

Points de vigilance :
${riskThemes || '(aucun point de vigilance spécifique)'}

Combinaisons à risque amplifié :
${synergies || '(aucune combinaison particulière détectée)'}

Pistes recommandées :
${recommendations || '(aucune piste spécifique)'}

Mécaniques à adapter :
${mechanics || '(aucune mécanique spécifique)'}

---

CE QUE TU DOIS PRODUIRE

Réponds avec exactement 5 sections,  dans cet ordre :

1. LECTURE DU RÉSULTAT
Explique en 2 à 3 phrases ce que le résultat veut dire concrètement pour l’équipe projet. Ne répète pas mot pour mot le résultat du framework.

2. ANGLES MORTS POSSIBLES
Liste 2 à 4 points à vérifier. Utilise des formulations prudentes comme "il serait utile de vérifier si..." ou "un point à explorer serait...".

3. QUESTIONS À POSER
Propose 3 à 5 questions concrètes à poser au client ou à l’équipe avant de continuer.

4. AJUSTEMENTS UX
Propose 2 à 4 ajustements d’interface ou de conception. Chaque proposition doit être simple,  réaliste et actionnable.

5. POINTS À VÉRIFIER
Liste 2 à 3 éléments à valider avant décision : test utilisateur,  accessibilité,  données,  contexte d’usage,  revue interne,  etc.

Contraintes de rédaction :
- vocabulaire professionnel mais simple ;
- phrases courtes ;
- pas de ton alarmiste ;
- pas de culpabilisation ;
- pas de conseil juridique définitif ;
- pas d’introduction ni de conclusion en dehors des 5 sections.`
}
