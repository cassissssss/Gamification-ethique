import type {
  EvaluationAnswers,
  PositiveRecommendation,
  QuestionId,
  OptionId,
  ResultPriority,
} from './evaluation.types'

interface RecommendationRule {
  id: string
  questionId: QuestionId
  optionId: OptionId
  title: string
  insight: string
  recommendation: string
  priority: ResultPriority
  example?: string
}

function getSelectedOptionIds(
  answers: EvaluationAnswers,
  questionId: QuestionId,
): OptionId[] {
  const answer = answers[questionId]

  if (!answer) {
    return []
  }

  return Array.isArray(answer) ? answer : [answer]
}

function hasSelectedOption(
  answers: EvaluationAnswers,
  questionId: QuestionId,
  optionId: OptionId,
): boolean {
  return getSelectedOptionIds(answers, questionId).includes(optionId)
}

const recommendationRules: RecommendationRule[] = [
  // ─── Q1 — Mode d'utilisation ────────────────────────────────────────────────
  {
    id: 'rec_mode_project_open',
    questionId: 'Q1',
    optionId: 'project_open',
    title: 'Explorer plusieurs directions avant de choisir une mécanique',
    insight:
      'Le projet est encore ouvert. C’est le bon moment pour comparer plusieurs approches sans partir directement sur une mécanique précise.',
    recommendation:
      'Commencer par clarifier le besoin utilisateur, puis comparer des mécaniques légères comme la progression, le feedback ou les étapes visibles.',
    priority: 'medium',
  },
  {
    id: 'rec_mode_client_recommendation',
    questionId: 'Q1',
    optionId: 'client_recommendation',
    title: 'Préparer une recommandation argumentée',
    insight:
      'Le résultat devra probablement être compris par une équipe ou un client, pas seulement par la personne qui remplit le questionnaire.',
    recommendation:
      'Formuler les résultats sous forme d’arguments simples : besoin identifié, mécanique proposée, point de vigilance et alternative possible.',
    priority: 'high',
  },
  {
    id: 'rec_mode_insufficient_info',
    questionId: 'Q1',
    optionId: 'insufficient_info',
    title: 'Revenir au cadrage avant de choisir une mécanique',
    insight:
      'Le projet manque encore d’informations pour choisir une direction gamifiée de manière fiable.',
    recommendation:
      'Clarifier d’abord l’objectif, le public, l’action principale et le contexte d’usage avant de recommander une mécanique.',
    priority: 'high',
  },

  // ─── Q2 — Besoin identifié ──────────────────────────────────────────────────
  {
    id: 'rec_need_understand',
    questionId: 'Q2',
    optionId: 'understand_what_to_do',
    title: 'Prioriser le guidage plutôt que la récompense',
    insight:
      'Le besoin principal concerne la compréhension de l’action à réaliser.',
    recommendation:
      'Privilégier une aide contextuelle, des étapes visibles ou un feedback clair plutôt qu’un système de points ou de récompenses.',
    priority: 'high',
    example: 'Une checklist courte, une étape active mise en évidence ou une aide affichée au bon moment.',
  },
  {
    id: 'rec_need_early_dropoff',
    questionId: 'Q2',
    optionId: 'early_dropoff',
    title: 'Identifier le moment d’abandon avant d’ajouter une mécanique',
    insight:
      'Le besoin concerne les utilisateur·rices qui quittent le parcours tôt.',
    recommendation:
      'Analyser d’abord où le parcours bloque, puis proposer une mécanique légère de progression, d’encouragement ou d’aide à la reprise.',
    priority: 'high',
    example: 'Un message de reprise, une progression sauvegardée ou un retour visuel après une première action.',
  },
  {
    id: 'rec_need_progress',
    questionId: 'Q2',
    optionId: 'progress_cues',
    title: 'Rendre la progression compréhensible',
    insight:
      'Le besoin principal est de donner plus de repères sur l’avancement.',
    recommendation:
      'Utiliser une progression individuelle claire, compréhensible et non comparative.',
    priority: 'high',
    example: 'Une barre d’étapes, un indicateur “2 étapes sur 5” ou une carte de parcours.',
  },
  {
    id: 'rec_need_participation',
    questionId: 'Q2',
    optionId: 'participation',
    title: 'Encourager la participation sans la forcer',
    insight:
      'Le projet cherche à encourager une participation active.',
    recommendation:
      'Proposer des actions simples, optionnelles et valorisées par un retour utile plutôt que par une pression sociale.',
    priority: 'medium',
    example: 'Une contribution visible, un feedback de participation ou un objectif collectif non compétitif.',
  },
  {
    id: 'rec_need_return',
    questionId: 'Q2',
    optionId: 'return_experience',
    title: 'Favoriser le retour sans créer de pression',
    insight:
      'Le projet cherche à encourager le retour dans l’expérience.',
    recommendation:
      'Prévoir une reprise simple, un rappel modéré et une continuité de progression sans pénalité forte en cas d’absence.',
    priority: 'high',
    example: 'Un message “reprendre où vous en étiez” plutôt qu’un streak perdu.',
  },
  {
    id: 'rec_need_engagement_indicator',
    questionId: 'Q2',
    optionId: 'engagement_indicator',
    title: 'Relier l’indicateur d’engagement à une valeur utilisateur',
    insight:
      'Le besoin est lié à un indicateur d’engagement ou de participation.',
    recommendation:
      'Vérifier que l’indicateur suivi correspond aussi à une valeur réelle pour l’utilisateur·rice, et pas uniquement à une métrique interne.',
    priority: 'high',
  },
  {
    id: 'rec_need_unclear',
    questionId: 'Q2',
    optionId: 'need_unclear',
    title: 'Clarifier le besoin avant de concevoir la mécanique',
    insight:
      'Le besoin n’est pas encore suffisamment défini.',
    recommendation:
      'Revenir au problème utilisateur : que doit mieux comprendre, faire, terminer ou reprendre l’utilisateur·rice ?',
    priority: 'high',
  },

  // ─── Q4 — Action principale ─────────────────────────────────────────────────
  {
    id: 'rec_action_understand_step',
    questionId: 'Q4',
    optionId: 'understand_step',
    title: 'Accompagner la compréhension de l’étape',
    insight:
      'L’action principale consiste à comprendre une étape.',
    recommendation:
      'Privilégier des repères visuels, une explication progressive ou une aide contextuelle.',
    priority: 'medium',
  },
  {
    id: 'rec_action_complete_task',
    questionId: 'Q4',
    optionId: 'complete_task',
    title: 'Donner un feedback de validation simple',
    insight:
      'L’action principale consiste à compléter une tâche.',
    recommendation:
      'Prévoir un retour clair après l’action, sans transformer chaque tâche en compétition ou en récompense artificielle.',
    priority: 'medium',
    example: 'Un état “terminé”, une confirmation visuelle ou une étape validée.',
  },
  {
    id: 'rec_action_progress_path',
    questionId: 'Q4',
    optionId: 'progress_path',
    title: 'Structurer le parcours en étapes lisibles',
    insight:
      'L’action principale concerne la progression dans un parcours.',
    recommendation:
      'Utiliser des étapes visibles, des jalons ou une progression personnelle compréhensible.',
    priority: 'medium',
  },
  {
    id: 'rec_action_contribute',
    questionId: 'Q4',
    optionId: 'contribute',
    title: 'Valoriser la contribution sans classement',
    insight:
      'L’action principale consiste à participer ou contribuer.',
    recommendation:
      'Mettre en avant l’impact ou l’utilité de la contribution plutôt qu’un rang entre participant·es.',
    priority: 'medium',
  },
  {
    id: 'rec_action_return_regularly',
    questionId: 'Q4',
    optionId: 'return_regularly',
    title: 'Prévoir une logique de retour douce',
    insight:
      'L’action principale consiste à revenir régulièrement.',
    recommendation:
      'Utiliser des rappels modérés, désactivables et utiles, sans perte excessive en cas d’interruption.',
    priority: 'high',
  },
  {
    id: 'rec_action_share_invite',
    questionId: 'Q4',
    optionId: 'share_invite',
    title: 'Garder le partage volontaire',
    insight:
      'L’action principale consiste à partager ou inviter d’autres personnes.',
    recommendation:
      'Rendre le partage explicitement volontaire et éviter les mécanismes qui poussent à inviter pour obtenir un avantage important.',
    priority: 'high',
  },
  {
    id: 'rec_action_convert',
    questionId: 'Q4',
    optionId: 'convert',
    title: 'Vérifier la finalité commerciale',
    insight:
      'L’action principale est liée à un achat, une réservation ou une conversion.',
    recommendation:
      'S’assurer que la mécanique aide réellement l’utilisateur·rice à décider, et ne crée pas uniquement une pression artificielle à l’action.',
    priority: 'high',
  },
  {
    id: 'rec_action_undefined',
    questionId: 'Q4',
    optionId: 'action_undefined',
    title: 'Définir l’action principale',
    insight:
      'L’action principale n’est pas encore définie.',
    recommendation:
      'Identifier l’action concrète à soutenir avant de choisir une mécanique : comprendre, terminer, progresser, contribuer, revenir ou convertir.',
    priority: 'high',
  },

  // ─── Q8 — Direction gamifiée ────────────────────────────────────────────────
  {
    id: 'rec_direction_guidance',
    questionId: 'Q8',
    optionId: 'guidance',
    title: 'Concevoir une gamification comme aide au guidage',
    insight:
      'La direction envisagée vise à aider l’utilisateur·rice à comprendre quoi faire.',
    recommendation:
      'Favoriser des repères, étapes ou messages contextuels plutôt qu’une mécanique de compétition.',
    priority: 'medium',
  },
  {
    id: 'rec_direction_personal_progress',
    questionId: 'Q8',
    optionId: 'personal_progress',
    title: 'Privilégier une progression personnelle',
    insight:
      'La direction envisagée repose sur la progression personnelle.',
    recommendation:
      'Afficher une progression compréhensible, privée par défaut et liée à des étapes significatives.',
    priority: 'high',
  },
  {
    id: 'rec_direction_feedback',
    questionId: 'Q8',
    optionId: 'feedback_after_action',
    title: 'Utiliser le feedback comme soutien',
    insight:
      'La direction envisagée consiste à donner un retour après une action.',
    recommendation:
      'Prévoir un feedback utile, compréhensible et proportionné à l’action réalisée.',
    priority: 'medium',
  },
  {
    id: 'rec_direction_optional_challenges',
    questionId: 'Q8',
    optionId: 'optional_challenges',
    title: 'Garder les défis optionnels',
    insight:
      'La direction envisagée repose sur des objectifs ou défis.',
    recommendation:
      'Présenter les défis comme des possibilités, sans bloquer le parcours principal si l’utilisateur·rice ne souhaite pas y participer.',
    priority: 'high',
  },
  {
    id: 'rec_direction_collective',
    questionId: 'Q8',
    optionId: 'collective_dynamic',
    title: 'Favoriser une dynamique collective non compétitive',
    insight:
      'La direction envisagée cherche à créer une dynamique collective.',
    recommendation:
      'Préférer un objectif commun, une contribution partagée ou une coopération plutôt qu’un classement individuel.',
    priority: 'high',
  },
  {
    id: 'rec_direction_steps',
    questionId: 'Q8',
    optionId: 'visible_steps',
    title: 'Structurer l’expérience avec des étapes visibles',
    insight:
      'La direction envisagée consiste à rendre le parcours plus lisible.',
    recommendation:
      'Utiliser des étapes visibles, des jalons ou une checklist courte pour aider l’utilisateur·rice à se situer.',
    priority: 'medium',
  },
  {
    id: 'rec_direction_undefined',
    questionId: 'Q8',
    optionId: 'direction_undefined',
    title: 'Comparer plusieurs directions possibles',
    insight:
      'La direction gamifiée n’est pas encore définie.',
    recommendation:
      'Comparer plusieurs familles de solutions : guidage, progression, feedback, contribution, défi optionnel ou dynamique collective.',
    priority: 'medium',
  },

  // ─── Q10 — Motivation ───────────────────────────────────────────────────────
  {
    id: 'rec_motivation_utility',
    questionId: 'Q10',
    optionId: 'service_utility',
    title: 'Renforcer la valeur utile du service',
    insight:
      'La motivation principale repose sur l’utilité du service.',
    recommendation:
      'Faire en sorte que la mécanique rende cette utilité plus visible, sans devenir la raison principale d’utiliser le service.',
    priority: 'medium',
  },
  {
    id: 'rec_motivation_progress_understanding',
    questionId: 'Q10',
    optionId: 'progress_understanding',
    title: 'Motiver par la compréhension de l’avancement',
    insight:
      'La motivation recherchée vient de la compréhension de la progression.',
    recommendation:
      'Afficher une progression claire, stable et compréhensible, sans comparaison sociale inutile.',
    priority: 'medium',
  },
  {
    id: 'rec_motivation_personal_goal',
    questionId: 'Q10',
    optionId: 'personal_goal',
    title: 'Soutenir un objectif personnel',
    insight:
      'La motivation recherchée est liée à l’atteinte d’un objectif personnel.',
    recommendation:
      'Permettre à l’utilisateur·rice de comprendre, ajuster ou suivre son propre objectif.',
    priority: 'medium',
  },
  {
    id: 'rec_motivation_symbolic_recognition',
    questionId: 'Q10',
    optionId: 'symbolic_recognition',
    title: 'Utiliser une reconnaissance symbolique sobre',
    insight:
      'La motivation recherchée repose sur une reconnaissance symbolique.',
    recommendation:
      'Limiter cette reconnaissance à des moments significatifs, sans multiplier les badges ou trophées artificiels.',
    priority: 'medium',
  },
  {
    id: 'rec_motivation_concrete_reward',
    questionId: 'Q10',
    optionId: 'concrete_reward',
    title: 'Encadrer les récompenses concrètes',
    insight:
      'La motivation recherchée repose sur une récompense concrète.',
    recommendation:
      'Vérifier que la récompense ne remplace pas la valeur réelle de l’action et ne pousse pas à agir uniquement pour obtenir l’avantage.',
    priority: 'high',
  },
  {
    id: 'rec_motivation_social_comparison',
    questionId: 'Q10',
    optionId: 'social_comparison',
    title: 'Remplacer la comparaison par un repère personnel',
    insight:
      'La motivation recherchée repose sur une comparaison avec les autres.',
    recommendation:
      'Étudier une alternative basée sur la progression personnelle, les objectifs individuels ou une contribution collective.',
    priority: 'high',
  },
  {
    id: 'rec_motivation_frequent_return',
    questionId: 'Q10',
    optionId: 'frequent_return',
    title: 'Modérer les mécaniques de retour fréquent',
    insight:
      'La motivation recherchée repose sur le retour fréquent dans l’expérience.',
    recommendation:
      'Prévoir une logique de retour utile, désactivable et sans pénalité excessive en cas d’absence.',
    priority: 'high',
  },
  {
    id: 'rec_motivation_unclear',
    questionId: 'Q10',
    optionId: 'motivation_unclear',
    title: 'Clarifier la motivation attendue',
    insight:
      'Le type de motivation recherché n’est pas encore clarifié.',
    recommendation:
      'Déterminer si l’expérience doit surtout aider à comprendre, progresser, participer, revenir ou recevoir une reconnaissance.',
    priority: 'medium',
  },

  // ─── Q11 — Transparence ─────────────────────────────────────────────────────
  {
    id: 'rec_rules_visible',
    questionId: 'Q11',
    optionId: 'rules_visible',
    title: 'Maintenir des règles visibles',
    insight:
      'Les règles sont prévues comme visibles et accessibles.',
    recommendation:
      'Conserver cette transparence et prévoir une formulation simple des règles de progression, récompense ou participation.',
    priority: 'medium',
  },
  {
    id: 'rec_rules_contextual',
    questionId: 'Q11',
    optionId: 'rules_contextual',
    title: 'Expliquer les règles au bon moment',
    insight:
      'Les règles sont présentées à certains moments du parcours.',
    recommendation:
      'S’assurer que l’utilisateur·rice reçoit l’explication avant que la mécanique influence son action ou son résultat.',
    priority: 'medium',
  },
  {
    id: 'rec_rules_progressive',
    questionId: 'Q11',
    optionId: 'rules_progressive',
    title: 'Utiliser une transparence progressive',
    insight:
      'Les règles sont expliquées progressivement.',
    recommendation:
      'Présenter les informations au fur et à mesure, tout en gardant un accès simple à une explication complète.',
    priority: 'medium',
  },
  {
    id: 'rec_rules_low_visibility',
    questionId: 'Q11',
    optionId: 'rules_low_visibility',
    title: 'Rendre le fonctionnement plus compréhensible',
    insight:
      'Le fonctionnement est principalement automatisé ou peu visible.',
    recommendation:
      'Ajouter une explication accessible sur ce qui est mesuré, calculé ou déclenché par la mécanique.',
    priority: 'high',
  },
  {
    id: 'rec_transparency_undefined',
    questionId: 'Q11',
    optionId: 'transparency_undefined',
    title: 'Définir la manière d’expliquer la mécanique',
    insight:
      'La présentation du fonctionnement n’est pas encore définie.',
    recommendation:
      'Prévoir dès la conception comment les règles seront expliquées : texte court, info-bulle, exemple ou état visible.',
    priority: 'high',
  },

  // ─── Q12 — Contrôle utilisateur ─────────────────────────────────────────────
  {
    id: 'rec_control_optional',
    questionId: 'Q12',
    optionId: 'optional_participation',
    title: 'Conserver une participation optionnelle',
    insight:
      'La participation est prévue comme optionnelle.',
    recommendation:
      'Vérifier que cette optionnalité reste réelle dans le parcours et qu’aucune fonctionnalité importante ne dépend uniquement de la mécanique.',
    priority: 'medium',
  },
  {
    id: 'rec_control_adjustable',
    questionId: 'Q12',
    optionId: 'adjustable_settings',
    title: 'Permettre l’ajustement de la mécanique',
    insight:
      'Certains paramètres peuvent être ajustés.',
    recommendation:
      'Conserver cette possibilité et rendre les réglages faciles à trouver, comprendre et modifier.',
    priority: 'medium',
  },
  {
    id: 'rec_control_ignorable',
    questionId: 'Q12',
    optionId: 'ignorable_without_blocking',
    title: 'Préserver un parcours non bloquant',
    insight:
      'La mécanique peut être ignorée sans bloquer le parcours.',
    recommendation:
      'Maintenir un accès clair au service principal, même si l’utilisateur·rice ne participe pas à la mécanique.',
    priority: 'medium',
  },
  {
    id: 'rec_control_main_path',
    questionId: 'Q12',
    optionId: 'main_path',
    title: 'Vérifier l’impact sur le parcours principal',
    insight:
      'La mécanique fait partie du parcours principal.',
    recommendation:
      'S’assurer qu’elle aide réellement à accomplir l’action principale et qu’elle ne devient pas un obstacle ou une contrainte inutile.',
    priority: 'high',
  },
  {
    id: 'rec_control_dependent_elements',
    questionId: 'Q12',
    optionId: 'dependent_elements',
    title: 'Prévoir une alternative si des éléments dépendent de la mécanique',
    insight:
      'Certains éléments dépendent de l’interaction avec la mécanique.',
    recommendation:
      'Identifier ce qui dépend de la mécanique et prévoir une alternative ou un accès non gamifié lorsque c’est nécessaire.',
    priority: 'high',
  },
  {
    id: 'rec_control_undefined',
    questionId: 'Q12',
    optionId: 'control_undefined',
    title: 'Clarifier le niveau de contrôle utilisateur',
    insight:
      'Le niveau de contrôle utilisateur n’est pas encore défini.',
    recommendation:
      'Déterminer si la mécanique sera optionnelle, paramétrable, ignorable ou intégrée au parcours principal.',
    priority: 'high',
  },
]

export function getPositiveRecommendations(
  answers: EvaluationAnswers,
): PositiveRecommendation[] {
  const recommendations = recommendationRules
    .filter((rule) => hasSelectedOption(answers, rule.questionId, rule.optionId))
    .map<PositiveRecommendation>((rule) => ({
      id: rule.id,
      title: rule.title,
      insight: rule.insight,
      recommendation: rule.recommendation,
      priority: rule.priority,
      sourceQuestionId: rule.questionId,
      sourceOptionId: rule.optionId,
      example: rule.example,
    }))

  return sortRecommendationsByPriority(recommendations)
}

function sortRecommendationsByPriority(
  recommendations: PositiveRecommendation[],
): PositiveRecommendation[] {
  const priorityWeight: Record<ResultPriority, number> = {
    high: 3,
    medium: 2,
    low: 1,
  }

  return [...recommendations].sort(
    (first, second) =>
      priorityWeight[second.priority] - priorityWeight[first.priority],
  )
}