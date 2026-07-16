import type {
  MechanicAlternative,
  EvaluationAnswers,
  OptionId,
  RecommendationDeepDive,
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
  deepDive?: RecommendationDeepDive
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
    deepDive: {
      mechanism:
        'Un score, même sans classement, incite naturellement à optimiser pour le nombre plutôt que pour la valeur de l’action — un glissement bien documenté en psychologie de la motivation (substitution d’un objectif extrinsèque à l’objectif réel).',
      alternatives: [
        'Remplacer le score cumulatif par un indicateur d’état (« à jour », « complété ») plutôt qu’un nombre qui grimpe indéfiniment.',
        'Si un score doit rester visible, le contextualiser (« 3 leçons terminées cette semaine ») plutôt que de l’afficher comme une valeur brute et permanente.',
        'Éviter tout affichage comparatif du score par défaut — le rendre consultable, mais pas mis en avant.',
      ],
      realWorldExample:
        'Duolingo affiche des XP, mais les contextualise toujours par leçon plutôt que comme un score global mis en avant en continu.',
    },
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
    deepDive: {
      mechanism:
        'Un badge attribué trop souvent perd sa fonction de reconnaissance et devient un simple accusé de réception déguisé — l’utilisateur-rice cesse d’y accorder de la valeur, ce qui pousse à en ajouter toujours plus pour maintenir l’effet (fuite en avant classique du design à récompenses).',
      alternatives: [
        'Réserver les badges aux étapes qui représentent un vrai jalon, pas chaque micro-action.',
        'Les rendre privés par défaut, avec un partage optionnel plutôt qu’automatique.',
        'Accompagner chaque badge d’une explication de ce qu’il représente concrètement, pas seulement d’une icône.',
      ],
      realWorldExample:
        'Strava attribue des badges pour des jalons réels (premier semi-marathon, record personnel) plutôt que pour chaque sortie enregistrée.',
    },
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
    deepDive: {
      mechanism:
        'Un système de niveaux fonctionne comme un filtre implicite : dès qu’il conditionne l’accès à une fonctionnalité utile, la progression cesse d’être un repère pour devenir une contrainte — l’utilisateur-rice n’avance plus pour son bénéfice mais pour lever un blocage artificiel.',
      alternatives: [
        'Garantir que le service principal reste accessible à tous les niveaux, sans fonctionnalité essentielle réservée à un palier supérieur.',
        'Expliquer explicitement ce que chaque niveau signifie et permet, plutôt que de le laisser comme un simple nombre.',
        'Proposer un moyen de revenir à un niveau antérieur ou de le masquer pour qui ne veut pas s’en préoccuper.',
      ],
    },
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
    deepDive: {
      mechanism:
        'L’effet Zeigarnik (une tâche inachevée reste plus présente à l’esprit qu’une tâche terminée) rend une barre presque pleine particulièrement efficace pour pousser à terminer dans l’instant — ce qui est utile pour un formulaire court, mais problématique si ça pousse à écourter une vraie réflexion.',
      alternatives: [
        'Afficher le nombre d’étapes restantes en plus du pourcentage, pour donner une estimation honnête du temps encore nécessaire.',
        'Permettre explicitement de sauvegarder et reprendre plus tard, visible dès le début du parcours.',
        'Éviter les barres qui ne reflètent pas la réalité (ex. progression accélérée artificiellement au début pour donner une impression de rapidité).',
      ],
    },
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
    deepDive: {
      mechanism:
        'Un défi transforme une action anodine en performance évaluée — ce qui peut être motivant ponctuellement, mais devient épuisant si chaque interaction du produit est reformulée en mission à accomplir plutôt qu’en usage normal.',
      alternatives: [
        'Limiter le nombre de défis actifs simultanément pour éviter l’effet de liste de tâches jamais terminée.',
        'Rendre chaque défi entièrement ignorable sans perte ni rappel insistant.',
        'Réserver les défis aux fonctionnalités secondaires à découvrir, jamais au parcours principal.',
      ],
    },
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
    deepDive: {
      mechanism:
        'Un classement crée mécaniquement des perdant·es : par construction, la moitié des participant·es se retrouve sous la médiane, quel que soit leur effort réel. Pour cette majorité, l’effet motivationnel s’inverse et devient décourageant plutôt que stimulant.',
      alternatives: [
        'Remplacer le classement global par une comparaison à soi-même dans le temps (« mieux que la semaine dernière »).',
        'Si une dimension collective est souhaitée, utiliser un objectif de groupe atteint ensemble plutôt qu’un rang individuel.',
        'Si un classement doit être conservé, le rendre optionnel (opt-in) et limité à un petit groupe choisi (amis, équipe), jamais à l’ensemble des utilisateur-rices par défaut.',
      ],
      realWorldExample:
        'Fitbit propose des défis entre amis opt-in plutôt qu’un classement public par défaut de tous les utilisateurs.',
    },
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
    deepDive: {
      mechanism:
        'Une récompense externe répétée peut, à terme, remplacer la motivation intrinsèque plutôt que la renforcer (effet de surjustification, documenté depuis les années 1970 en psychologie de la motivation) : l’utilisateur-rice agit pour l’avantage, plus pour la valeur de l’action elle-même.',
      alternatives: [
        'Réserver les récompenses à des actions rares et significatives, jamais à chaque interaction courante.',
        'Annoncer la récompense à l’avance plutôt que de la réserver en surprise, pour éviter tout effet de dépendance.',
        'Vérifier que retirer la récompense ne ferait pas disparaître toute motivation à agir — si oui, c’est le signe que la mécanique masque un manque de valeur réelle du produit.',
      ],
    },
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
    deepDive: {
      mechanism:
        'Une notification qui interrompt sans lien avec une intention exprimée par l’utilisateur-rice est perçue comme une sollicitation externe, pas un service — c’est l’un des signaux les plus cités dans les études sur la fatigue numérique et le désinstallation d’applications.',
      alternatives: [
        'Ne notifier que ce que l’utilisateur-rice a explicitement demandé à suivre, jamais par défaut sur tout.',
        'Espacer automatiquement les rappels si l’utilisateur-rice ne les ouvre pas, plutôt que de maintenir la même fréquence.',
        'Proposer un réglage simple et visible (pas enfoui dans un sous-menu) pour ajuster ou couper les rappels.',
      ],
      realWorldExample:
        'Fitbit laisse choisir précisément quels rappels recevoir (mouvement, sommeil, objectifs) plutôt que d’imposer un flux unique.',
    },
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
    deepDive: {
      mechanism:
        'Un streak fonctionne par aversion à la perte plus que par motivation positive : au bout de quelques jours, ce n’est plus l’envie de continuer qui pousse à revenir, mais la peur de perdre ce qui a déjà été accumulé — un des ressorts les plus efficaces, et les plus documentés comme problématiques, du design comportemental.',
      alternatives: [
        'Proposer un système de « gel » de série (freeze) utilisable un nombre limité de fois par mois, pour absorber les pauses normales de la vie.',
        'Remplacer la remise à zéro brutale par une dégradation douce (ex. la série diminue mais ne disparaît pas complètement).',
        'Afficher un message de reprise neutre ou encourageant plutôt qu’un message de perte culpabilisant.',
      ],
      realWorldExample:
        'Duolingo propose des « streak freezes » achetables ou gagnables pour absorber une pause sans perdre toute la série.',
    },
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
    deepDive: {
      mechanism:
        'Un objectif « personnalisé » sans explication devient une boîte noire : l’utilisateur-rice ne peut ni le challenger ni le comprendre, ce qui érode la confiance dès qu’il semble décalé (trop ambitieux, trop facile, ou hors-sujet).',
      alternatives: [
        'Expliquer en une phrase simple pourquoi cet objectif précis est proposé (« basé sur vos 3 dernières sessions »).',
        'Permettre de modifier ou de réinitialiser l’objectif à tout moment, sans justification à donner.',
        'Ne jamais utiliser des données sensibles (santé, localisation précise) pour personnaliser sans consentement explicite et spécifique.',
      ],
    },
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
    deepDive: {
      mechanism:
        'Un feedback disproportionné (confettis, sons, animations) pour une action banale crée un décalage qui, répété, finit par être perçu comme manipulateur plutôt que gratifiant — l’intensité du feedback doit rester proportionnée à l’importance réelle de l’action.',
      alternatives: [
        'Réserver les animations marquées aux étapes réellement importantes, pas à chaque clic.',
        'Proposer un mode sobre (réduction des animations) accessible facilement pour qui le préfère.',
        'Vérifier que le feedback confirme l’action sans orienter systématiquement vers une action suivante non demandée.',
      ],
    },
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
    deepDive: {
      mechanism:
        'Dire à quelqu’un qu’il fait moins bien qu’un pourcentage d’autres personnes n’apporte aucune information actionnable — ça ne dit pas quoi améliorer, seulement que l’on est « en dessous », ce qui a un effet démotivant démontré chez une partie significative des utilisateur-rices.',
      alternatives: [
        'Remplacer « vous faites moins bien que X% » par une progression personnelle dans le temps.',
        'Si une dimension collective est utile, utiliser une moyenne anonymisée ou un objectif de groupe plutôt qu’un rang individuel.',
        'Ne jamais afficher de comparaison négative par défaut — la rendre, au mieux, consultable sur demande explicite.',
      ],
      realWorldExample:
        'Steam affiche un pourcentage de joueurs ayant débloqué un succès, de façon informative et non comparative individuellement — sans jamais dire « vous êtes moins bon que ».',
    },
  },
  {
    id: 'mechanic_random_reward',
    mechanicOptionId: 'random_reward',
    mechanicLabel: 'Récompense aléatoire ou surprise',
    relevantUse:
      'Créer un moment de surprise ponctuel dans une expérience déjà utile.',
    possibleRisk:
      'Le renforcement à ratio variable est un des mécanismes les plus documentés comme addictif (proche des loot boxes), avec un effet renforcé chez un public jeune.',
    baseVigilanceLevel: 'critical',
    ethicalAlternative:
      'Proposer une récompense prévisible et transparente : probabilités affichées si un aléa est conservé, ou remplacement par un bonus fixe et annoncé.',
    interfaceExample:
      'Un bonus annoncé à l’avance avec sa valeur exacte, sans effet de tirage ni suspense visuel.',
    relatedThemeIds: ['temporal_pressure', 'sensitive_context'],
    deepDive: {
      mechanism:
        'Ce mécanisme active un renforcement à ratio variable (Skinner, 1957) — le schéma de conditionnement comportemental le plus puissant connu, celui des machines à sous. Ce n’est pas une comparaison rhétorique : la Belgique et les Pays-Bas qualifient déjà des mécaniques similaires de jeux de hasard, et le régulateur britannique (CMA) surveille activement ces pratiques au-delà du seul jeu vidéo.',
      alternatives: [
        'Remplacer par une récompense garantie et de valeur constante, sans tirage.',
        'Annoncer clairement la nature de la prochaine récompense avant que l’action ne soit réalisée.',
        'Si un aléa est conservé, afficher les probabilités exactes (ex. « 70% de chances d’obtenir X »).',
        'Conserver un effet de surprise uniquement esthétique : l’animation surprend, mais la valeur ou la nature du gain est toujours connue à l’avance.',
      ],
      realWorldExample:
        'Fitbit annonce à l’avance la nature du badge obtenu à un palier donné ; Duolingo affiche la valeur exacte de chaque récompense de série avant de la débloquer.',
    },
  },
]

export function getMechanicsAlternatives(
  answers: EvaluationAnswers,
): MechanicAlternative[] {
  const selectedMechanicOptionIds = getSelectedOptionIds(answers, 'Q12')

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
      deepDive: rule.deepDive,
    }))
    .sort(sortMechanicsByVigilance)
}

function getSelectedOptionIds(
  answers: EvaluationAnswers,
  questionId: 'Q12',
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
