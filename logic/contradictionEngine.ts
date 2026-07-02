import type {
  ContradictionResult,
  ContradictionSeverity,
  EvaluationAnswers,
  OptionId,
  QuestionId,
} from './evaluation.types'

interface ContradictionRule {
  id: string
  title: string
  message: string
  recommendation: string
  severity: ContradictionSeverity
  sourceQuestionIds: QuestionId[]
  sourceOptionIds: OptionId[]
  matches: (answers: EvaluationAnswers) => boolean
}

const mechanicOptionIds: OptionId[] = [
  'points_score',
  'badges_trophies',
  'levels',
  'progress_bar',
  'challenges_missions',
  'ranking',
  'rewards_benefits',
  'notifications_reminders',
  'streak',
  'personalized_goals',
  'visual_feedback',
  'comparison_users',
]

const trackingMechanicOptionIds: OptionId[] = [
  'levels',
  'progress_bar',
  'ranking',
  'personalized_goals',
  'streak',
]

const recurringMechanicOptionIds: OptionId[] = [
  'notifications_reminders',
  'streak',
]

const strongMechanicOptionIds: OptionId[] = [
  'ranking',
  'comparison_users',
  'streak',
  'rewards_benefits',
]

const contradictionRules: ContradictionRule[] = [
  {
    id: 'contradiction_need_unclear_mechanics_defined',
    title: 'La mécanique semble choisie avant le besoin',
    message:
      'Le besoin est encore en cours de clarification, mais une ou plusieurs mécaniques sont déjà envisagées.',
    recommendation:
      'Clarifier d’abord le problème utilisateur à résoudre, puis vérifier si les mécaniques choisies répondent réellement à ce besoin.',
    severity: 'warning',
    sourceQuestionIds: ['Q2', 'Q9'],
    sourceOptionIds: ['need_unclear', ...mechanicOptionIds],
    matches: (answers) =>
      hasSelectedOption(answers, 'Q2', 'need_unclear') &&
      hasAnySelectedOption(answers, 'Q9', mechanicOptionIds),
  },
  {
    id: 'contradiction_action_undefined_mechanics_defined',
    title: 'L’action principale n’est pas encore définie',
    message:
      'L’action principale à accompagner n’est pas encore définie, mais des mécaniques sont déjà envisagées.',
    recommendation:
      'Définir l’action principale avant de valider une mécanique : comprendre, terminer, progresser, contribuer, revenir, partager ou convertir.',
    severity: 'warning',
    sourceQuestionIds: ['Q4', 'Q9'],
    sourceOptionIds: ['action_undefined', ...mechanicOptionIds],
    matches: (answers) =>
      hasSelectedOption(answers, 'Q4', 'action_undefined') &&
      hasAnySelectedOption(answers, 'Q9', mechanicOptionIds),
  },
  {
    id: 'contradiction_personal_choice_main_path',
    title: 'Usage volontaire, mais mécanique intégrée au parcours principal',
    message:
      'L’expérience est utilisée par choix personnel, mais la mécanique fait partie du parcours principal.',
    recommendation:
      'Vérifier que la mécanique reste réellement optionnelle ou qu’elle apporte une aide claire sans devenir une contrainte.',
    severity: 'warning',
    sourceQuestionIds: ['Q6', 'Q12'],
    sourceOptionIds: ['personal_choice', 'main_path'],
    matches: (answers) =>
      hasSelectedOption(answers, 'Q6', 'personal_choice') &&
      hasSelectedOption(answers, 'Q12', 'main_path'),
  },
  {
    id: 'contradiction_personal_choice_dependent_elements',
    title: 'Usage volontaire, mais certains éléments dépendent de la mécanique',
    message:
      'L’expérience est utilisée par choix personnel, mais certains éléments dépendent de l’interaction avec la mécanique.',
    recommendation:
      'Prévoir une alternative ou un accès non gamifié pour éviter que la participation devienne implicitement obligatoire.',
    severity: 'warning',
    sourceQuestionIds: ['Q6', 'Q12'],
    sourceOptionIds: ['personal_choice', 'dependent_elements'],
    matches: (answers) =>
      hasSelectedOption(answers, 'Q6', 'personal_choice') &&
      hasSelectedOption(answers, 'Q12', 'dependent_elements'),
  },
  {
    id: 'contradiction_optional_required_to_finish',
    title: 'Participation annoncée comme optionnelle, mais nécessaire pour terminer',
    message:
      'La participation est présentée comme optionnelle, mais la mécanique fait partie des étapes nécessaires pour terminer le parcours.',
    recommendation:
      'Clarifier si la mécanique est réellement optionnelle. Si elle est nécessaire, il faut expliquer son rôle et éviter qu’elle bloque inutilement l’accès au service.',
    severity: 'blocking',
    sourceQuestionIds: ['Q12', 'Q13'],
    sourceOptionIds: ['optional_participation', 'required_to_finish'],
    matches: (answers) =>
      hasSelectedOption(answers, 'Q12', 'optional_participation') &&
      hasSelectedOption(answers, 'Q13', 'required_to_finish'),
  },
  {
    id: 'contradiction_personal_choice_required_to_finish',
    title: 'Usage par choix personnel, mais mécanique nécessaire pour terminer',
    message:
      'L’expérience est utilisée par choix personnel, mais la mécanique est indiquée comme nécessaire pour terminer le parcours.',
    recommendation:
      'Vérifier si l’utilisateur·rice peut réellement utiliser le service sans subir la mécanique, ou rendre son rôle plus transparent.',
    severity: 'warning',
    sourceQuestionIds: ['Q6', 'Q13'],
    sourceOptionIds: ['personal_choice', 'required_to_finish'],
    matches: (answers) =>
      hasSelectedOption(answers, 'Q6', 'personal_choice') &&
      hasSelectedOption(answers, 'Q13', 'required_to_finish'),
  },
  {
    id: 'contradiction_no_data_tracking_mechanics',
    title: 'Aucune donnée prévue, mais mécanique nécessitant un suivi',
    message:
      'Aucune donnée personnelle liée à la gamification n’est prévue, mais certaines mécaniques semblent nécessiter un suivi individuel.',
    recommendation:
      'Clarifier quelles données sont nécessaires pour afficher la progression, les niveaux, le classement, les objectifs ou les séries.',
    severity: 'warning',
    sourceQuestionIds: ['Q7', 'Q9'],
    sourceOptionIds: ['no_personal_data', ...trackingMechanicOptionIds],
    matches: (answers) =>
      hasSelectedOption(answers, 'Q7', 'no_personal_data') &&
      hasAnySelectedOption(answers, 'Q9', trackingMechanicOptionIds),
  },
  {
    id: 'contradiction_no_regular_usage_recurring_mechanics',
    title: 'Aucun usage régulier prévu, mais mécanique de régularité envisagée',
    message:
      'Aucun usage régulier n’est prévu, mais des notifications, rappels ou streaks sont envisagés.',
    recommendation:
      'Vérifier si la régularité est réellement utile. Si l’usage est ponctuel, privilégier un feedback ou une progression simple plutôt qu’une mécanique de retour.',
    severity: 'warning',
    sourceQuestionIds: ['Q9', 'Q14'],
    sourceOptionIds: ['no_regular_usage', ...recurringMechanicOptionIds],
    matches: (answers) =>
      hasSelectedOption(answers, 'Q14', 'no_regular_usage') &&
      hasAnySelectedOption(answers, 'Q9', recurringMechanicOptionIds),
  },
  {
    id: 'contradiction_no_regular_usage_frequent_return',
    title: 'Aucun usage régulier prévu, mais motivation basée sur le retour fréquent',
    message:
      'L’expérience ne prévoit pas d’usage régulier, mais le retour fréquent est indiqué comme motivation principale.',
    recommendation:
      'Clarifier le rythme attendu : usage ponctuel, retour occasionnel ou usage régulier. La mécanique doit correspondre à ce rythme.',
    severity: 'warning',
    sourceQuestionIds: ['Q10', 'Q14'],
    sourceOptionIds: ['frequent_return', 'no_regular_usage'],
    matches: (answers) =>
      hasSelectedOption(answers, 'Q14', 'no_regular_usage') &&
      hasSelectedOption(answers, 'Q10', 'frequent_return'),
  },
  {
    id: 'contradiction_private_results_social_mechanics',
    title: 'Résultats privés, mais mécanique sociale envisagée',
    message:
      'Les résultats sont indiqués comme privés, mais une mécanique de classement ou de comparaison est envisagée.',
    recommendation:
      'Clarifier si la comparaison est vraiment nécessaire. Une progression personnelle ou un objectif collectif peut être plus cohérent avec une visibilité privée.',
    severity: 'warning',
    sourceQuestionIds: ['Q9', 'Q15'],
    sourceOptionIds: ['private', 'ranking', 'comparison_users'],
    matches: (answers) =>
      hasSelectedOption(answers, 'Q15', 'private') &&
      hasAnySelectedOption(answers, 'Q9', ['ranking', 'comparison_users']),
  },
  {
    id: 'contradiction_light_role_strong_mechanics',
    title: 'Rôle léger annoncé, mais mécaniques fortes envisagées',
    message:
      'La gamification est présentée comme un repère ou une aide légère, mais certaines mécaniques envisagées peuvent fortement influencer l’expérience.',
    recommendation:
      'Vérifier si ces mécaniques sont proportionnées. Si l’objectif est un guidage léger, privilégier plutôt des étapes visibles, du feedback ou une progression individuelle.',
    severity: 'warning',
    sourceQuestionIds: ['Q3', 'Q9'],
    sourceOptionIds: ['light_marker', ...strongMechanicOptionIds],
    matches: (answers) =>
      hasSelectedOption(answers, 'Q3', 'light_marker') &&
      hasAnySelectedOption(answers, 'Q9', strongMechanicOptionIds),
  },
  {
    id: 'contradiction_unclear_role_central_mechanic',
    title: 'Rôle de la gamification encore flou',
    message:
      'Le rôle de la gamification est encore en cours de clarification, mais des mécaniques sont déjà envisagées.',
    recommendation:
      'Définir si la gamification doit seulement guider, soutenir, structurer ou devenir centrale avant de choisir les mécaniques.',
    severity: 'info',
    sourceQuestionIds: ['Q3', 'Q9'],
    sourceOptionIds: ['role_unclear', ...mechanicOptionIds],
    matches: (answers) =>
      hasSelectedOption(answers, 'Q3', 'role_unclear') &&
      hasAnySelectedOption(answers, 'Q9', mechanicOptionIds),
  },
  {
    id: 'contradiction_low_visibility_high_impact_mechanics',
    title: 'Mécanique influente, mais fonctionnement peu visible',
    message:
      'Le fonctionnement est peu visible ou automatisé, alors que la mécanique peut influencer la progression, les récompenses ou la comparaison.',
    recommendation:
      'Ajouter une explication accessible sur ce qui est mesuré, calculé ou déclenché par la mécanique.',
    severity: 'warning',
    sourceQuestionIds: ['Q9', 'Q11'],
    sourceOptionIds: [
      'rules_low_visibility',
      'ranking',
      'rewards_benefits',
      'personalized_goals',
      'levels',
    ],
    matches: (answers) =>
      hasSelectedOption(answers, 'Q11', 'rules_low_visibility') &&
      hasAnySelectedOption(answers, 'Q9', [
        'ranking',
        'rewards_benefits',
        'personalized_goals',
        'levels',
      ]),
  },
  {
    id: 'contradiction_no_specific_context_with_sensitive_context',
    title: 'Contexte indiqué comme neutre, mais autre signal sensible sélectionné',
    message:
      'Aucun élément particulier est indiqué, mais un autre élément sensible ou spécifique est aussi sélectionné.',
    recommendation:
      'Choisir soit “Aucun élément particulier identifié”, soit les caractéristiques spécifiques du projet. Cette clarification évite un diagnostic contradictoire.',
    severity: 'info',
    sourceQuestionIds: ['Q5'],
    sourceOptionIds: [
      'no_specific_element',
      'young_audience',
      'health_wellbeing_performance',
      'evaluative_context',
      'important_service_access',
      'sensitive_personal_data',
      'commercial_promotional_context',
    ],
    matches: (answers) =>
      hasSelectedOption(answers, 'Q5', 'no_specific_element') &&
      hasAnySelectedOption(answers, 'Q5', [
        'young_audience',
        'health_wellbeing_performance',
        'evaluative_context',
        'important_service_access',
        'sensitive_personal_data',
        'commercial_promotional_context',
      ]),
  },
  {
    id: 'contradiction_no_precise_mechanic_with_mechanics',
    title: 'Aucune mécanique précise, mais des mécaniques sont aussi sélectionnées',
    message:
      'L’option “Aucune mécanique précise pour l’instant” est sélectionnée en même temps que des mécaniques précises.',
    recommendation:
      'Choisir soit “Aucune mécanique précise pour l’instant”, soit les mécaniques déjà envisagées.',
    severity: 'info',
    sourceQuestionIds: ['Q9'],
    sourceOptionIds: ['no_precise_mechanic', ...mechanicOptionIds],
    matches: (answers) =>
      hasSelectedOption(answers, 'Q9', 'no_precise_mechanic') &&
      hasAnySelectedOption(answers, 'Q9', mechanicOptionIds),
  },
]

export function getContradictions(
  answers: EvaluationAnswers,
): ContradictionResult[] {
  return contradictionRules
    .filter((rule) => rule.matches(answers))
    .map((rule) => ({
      id: rule.id,
      title: rule.title,
      message: rule.message,
      recommendation: rule.recommendation,
      severity: rule.severity,
      sourceQuestionIds: rule.sourceQuestionIds,
      sourceOptionIds: rule.sourceOptionIds,
    }))
    .sort(sortContradictionsBySeverity)
}

function sortContradictionsBySeverity(
  first: ContradictionResult,
  second: ContradictionResult,
): number {
  const severityWeight: Record<ContradictionSeverity, number> = {
    blocking: 3,
    warning: 2,
    info: 1,
  }

  return severityWeight[second.severity] - severityWeight[first.severity]
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

function hasAnySelectedOption(
  answers: EvaluationAnswers,
  questionId: QuestionId,
  optionIds: OptionId[],
): boolean {
  const selectedOptionIds = getSelectedOptionIds(answers, questionId)

  return optionIds.some((optionId) => selectedOptionIds.includes(optionId))
}