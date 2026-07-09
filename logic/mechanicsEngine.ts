import type {
  EvaluationAnswers,
  MechanicAlternative,
  OptionId,
  RiskLevel,
  RiskThemeId,
} from './evaluation.types'

interface MechanicAlternativeRule {
  id: string
  mechanicOptionId: OptionId
  mechanicLabel: string
  relevantUse: string
  possibleRisk: string
  baseVigilanceLevel: RiskLevel
  ethicalAlternative: string
  interfaceExample?: string
  relatedThemeIds: RiskThemeId[]
}

const mechanicAlternativeRules: MechanicAlternativeRule[] = [
  {
    id: 'mechanic_points_score',
    mechanicOptionId: 'points_score',
    mechanicLabel: 'Points ou score',
    relevantUse:
      'Donner un retour simple sur une action réalisée ou rendre une progression plus visible.',
    possibleRisk:
      'Les points peuvent déplacer la motivation vers l’accumulation de score plutôt que vers la valeur réelle de l’action.',
    baseVigilanceLevel: 'moderate',
    ethicalAlternative:
      'Utiliser les points comme un feedback discret et contextualisé, sans classement automatique ni récompense excessive.',
    interfaceExample:
      'Afficher un retour du type “action complétée” ou “progression mise à jour” plutôt qu’un score central permanent.',
    relatedThemeIds: ['social_comparison', 'temporal_pressure'],
  },
  {
    id: 'mechanic_badges_trophies',
    mechanicOptionId: 'badges_trophies',
    mechanicLabel: 'Badges ou trophées',
    relevantUse:
      'Marquer une étape importante, valoriser un accomplissement ou rendre visible une progression terminée.',
    possibleRisk:
      'Les badges peuvent devenir artificiels s’ils sont trop fréquents, trop visibles ou utilisés comme marqueurs de statut.',
    baseVigilanceLevel: 'moderate',
    ethicalAlternative:
      'Limiter les badges à des moments significatifs et les rendre privés par défaut lorsque la comparaison n’est pas nécessaire.',
    interfaceExample:
      'Un badge discret affiché dans un récapitulatif personnel après une étape réellement importante.',
    relatedThemeIds: ['social_comparison'],
  },
  {
    id: 'mechanic_levels',
    mechanicOptionId: 'levels',
    mechanicLabel: 'Niveaux',
    relevantUse:
      'Structurer une progression longue ou aider l’utilisateur-rice à comprendre son avancement dans un parcours.',
    possibleRisk:
      'Les niveaux peuvent créer une hiérarchie, un statut ou une pression à progresser, surtout s’ils conditionnent l’accès à certaines fonctionnalités.',
    baseVigilanceLevel: 'moderate',
    ethicalAlternative:
      'Utiliser les niveaux comme repères de parcours, sans bloquer inutilement l’accès au service principal.',
    interfaceExample:
      'Des paliers de progression personnels avec une explication claire de ce que chaque étape signifie.',
    relatedThemeIds: ['autonomy_control', 'data_profile'],
  },
  {
    id: 'mechanic_progress_bar',
    mechanicOptionId: 'progress_bar',
    mechanicLabel: 'Barre de progression',
    relevantUse:
      'Aider l’utilisateur-rice à se situer dans un parcours, un formulaire, une formation ou une action en plusieurs étapes.',
    possibleRisk:
      'Une barre de progression peut devenir frustrante si elle donne une impression d’obligation ou si elle cache la complexité réelle du parcours.',
    baseVigilanceLevel: 'low',
    ethicalAlternative:
      'Afficher une progression claire, honnête et stable, sans pression artificielle à terminer immédiatement.',
    interfaceExample:
      'Une indication simple comme “Étape 2 sur 5” avec la possibilité de revenir en arrière.',
    relatedThemeIds: ['autonomy_control', 'data_profile'],
  },
  {
    id: 'mechanic_challenges_missions',
    mechanicOptionId: 'challenges_missions',
    mechanicLabel: 'Défis ou missions',
    relevantUse:
      'Proposer des objectifs courts pour encourager une action ponctuelle ou guider une exploration.',
    possibleRisk:
      'Les défis peuvent créer une pression à participer ou transformer une action simple en performance.',
    baseVigilanceLevel: 'moderate',
    ethicalAlternative:
      'Rendre les défis optionnels, proportionnés et non nécessaires pour accéder au service principal.',
    interfaceExample:
      'Une suggestion du type “Vous pouvez essayer cette action” plutôt qu’une mission obligatoire.',
    relatedThemeIds: ['autonomy_control', 'temporal_pressure'],
  },
  {
    id: 'mechanic_ranking',
    mechanicOptionId: 'ranking',
    mechanicLabel: 'Classement',
    relevantUse:
      'Créer une dynamique compétitive dans un contexte où la comparaison est attendue, comprise et acceptable.',
    possibleRisk:
      'Un classement peut générer de la comparaison sociale, du découragement, une pression de performance ou une focalisation excessive sur le rang.',
    baseVigilanceLevel: 'high',
    ethicalAlternative:
      'Remplacer le classement par une progression personnelle, un objectif collectif ou des paliers non comparatifs.',
    interfaceExample:
      'Afficher “votre progression cette semaine” ou “objectif collectif atteint à 72%” plutôt qu’un top utilisateurs.',
    relatedThemeIds: ['social_comparison', 'sensitive_context'],
  },
  {
    id: 'mechanic_rewards_benefits',
    mechanicOptionId: 'rewards_benefits',
    mechanicLabel: 'Récompenses ou avantages',
    relevantUse:
      'Valoriser une action importante ou remercier une participation ponctuelle.',
    possibleRisk:
      'Les récompenses peuvent déplacer la motivation vers l’avantage obtenu et créer une pression commerciale ou comportementale.',
    baseVigilanceLevel: 'high',
    ethicalAlternative:
      'Limiter les récompenses aux actions significatives et expliquer clairement leur rôle sans pousser à agir uniquement pour l’avantage.',
    interfaceExample:
      'Un avantage ponctuel annoncé clairement après une action utile, sans urgence artificielle ni rareté forcée.',
    relatedThemeIds: ['commercial_conversion', 'temporal_pressure'],
  },
  {
    id: 'mechanic_notifications_reminders',
    mechanicOptionId: 'notifications_reminders',
    mechanicLabel: 'Notifications ou rappels',
    relevantUse:
      'Aider l’utilisateur-rice à reprendre une action, ne pas oublier une étape ou revenir à un moment utile.',
    possibleRisk:
      'Les notifications peuvent capter l’attention, créer une pression au retour ou devenir intrusives si elles sont trop fréquentes.',
    baseVigilanceLevel: 'moderate',
    ethicalAlternative:
      'Rendre les rappels utiles, espacés, désactivables et liés à une vraie intention utilisateur.',
    interfaceExample:
      'Un rappel paramétrable du type “me le rappeler plus tard” plutôt qu’une relance répétée automatique.',
    relatedThemeIds: ['temporal_pressure', 'autonomy_control'],
  },
  {
    id: 'mechanic_streak',
    mechanicOptionId: 'streak',
    mechanicLabel: 'Streak ou série d’actions',
    relevantUse:
      'Encourager une régularité légère lorsque le rythme est réellement utile pour l’utilisateur-rice.',
    possibleRisk:
      'Les streaks peuvent créer une peur de perdre la série, de la culpabilisation ou une pression à revenir même lorsque ce n’est pas utile.',
    baseVigilanceLevel: 'high',
    ethicalAlternative:
      'Prévoir une reprise sans pénalité forte, une pause possible ou une logique de continuité souple.',
    interfaceExample:
      'Afficher “vous pouvez reprendre quand vous voulez” plutôt que “série perdue”.',
    relatedThemeIds: ['temporal_pressure', 'sensitive_context'],
  },
  {
    id: 'mechanic_personalized_goals',
    mechanicOptionId: 'personalized_goals',
    mechanicLabel: 'Objectifs personnalisés',
    relevantUse:
      'Adapter une progression ou un parcours à la situation, au niveau ou au besoin de l’utilisateur-rice.',
    possibleRisk:
      'La personnalisation peut devenir opaque si l’utilisateur-rice ne comprend pas quelles données sont utilisées ou comment les objectifs sont définis.',
    baseVigilanceLevel: 'moderate',
    ethicalAlternative:
      'Expliquer les critères de personnalisation et permettre à l’utilisateur-rice d’ajuster ou refuser certains objectifs.',
    interfaceExample:
      'Un objectif modifiable avec une info-bulle expliquant pourquoi il est proposé.',
    relatedThemeIds: ['data_profile', 'autonomy_control'],
  },
  {
    id: 'mechanic_visual_feedback',
    mechanicOptionId: 'visual_feedback',
    mechanicLabel: 'Feedback visuel après action',
    relevantUse:
      'Confirmer qu’une action a été comprise, enregistrée ou complétée.',
    possibleRisk:
      'Le feedback peut devenir excessif s’il survalorise chaque micro-action ou cherche à pousser systématiquement vers l’action suivante.',
    baseVigilanceLevel: 'low',
    ethicalAlternative:
      'Utiliser un feedback clair, proportionné et utile, sans animation ou encouragement excessif.',
    interfaceExample:
      'Une confirmation simple comme “Votre réponse a été enregistrée” ou “Étape terminée”.',
    relatedThemeIds: ['autonomy_control'],
  },
  {
    id: 'mechanic_comparison_users',
    mechanicOptionId: 'comparison_users',
    mechanicLabel: 'Comparaison entre utilisateur-rices',
    relevantUse:
      'Donner un repère collectif lorsque la comparaison est pertinente, volontaire et comprise.',
    possibleRisk:
      'La comparaison peut créer de la pression, du découragement ou une hiérarchie sociale implicite.',
    baseVigilanceLevel: 'high',
    ethicalAlternative:
      'Remplacer la comparaison directe par une progression personnelle, une moyenne anonymisée ou un objectif collectif.',
    interfaceExample:
      'Afficher une contribution collective ou une progression personnelle plutôt qu’un score comparé aux autres.',
    relatedThemeIds: ['social_comparison', 'sensitive_context'],
  },
]

export function getMechanicsAlternatives(
  answers: EvaluationAnswers,
): MechanicAlternative[] {
  const selectedMechanicOptionIds = getSelectedOptionIds(answers, 'Q9')

  return mechanicAlternativeRules
    .filter((rule) => selectedMechanicOptionIds.includes(rule.mechanicOptionId))
    .map((rule) => ({
      id: rule.id,
      mechanicOptionId: rule.mechanicOptionId,
      mechanicLabel: rule.mechanicLabel,
      relevantUse: rule.relevantUse,
      possibleRisk: rule.possibleRisk,
      baseVigilanceLevel: rule.baseVigilanceLevel,
      ethicalAlternative: rule.ethicalAlternative,
      interfaceExample: rule.interfaceExample,
      relatedThemeIds: rule.relatedThemeIds,
    }))
    .sort(sortMechanicsByVigilance)
}

function getSelectedOptionIds(
  answers: EvaluationAnswers,
  questionId: 'Q9',
): OptionId[] {
  const answer = answers[questionId]

  if (!answer) {
    return []
  }

  return Array.isArray(answer) ? answer : [answer]
}

function sortMechanicsByVigilance(
  first: MechanicAlternative,
  second: MechanicAlternative,
): number {
  const levelWeight: Record<RiskLevel, number> = {
    critical: 5,
    high: 4,
    moderate: 3,
    low: 2,
    none: 1,
  }

  return (
    levelWeight[second.baseVigilanceLevel] -
    levelWeight[first.baseVigilanceLevel]
  )
}