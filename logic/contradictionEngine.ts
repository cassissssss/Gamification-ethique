import type {
  ContradictionResult, 
  ContradictionSeverity, 
  EvaluationAnswers, 
  OptionId, 
  QuestionId, 
  RecommendationDeepDive, 
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
  deepDive?: RecommendationDeepDive
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
  'random_reward', 
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
  'random_reward', 
]

const businessOnlyBenefitOptionIds: OptionId[] = [
  'increase_actions', 
  'increase_time_spent', 
  'commercial_objective', 
]

const userBenefitOptionIds: OptionId[] = [
  'help_task', 
  'improve_autonomy', 
  'clearer_path', 
]

const contradictionRules: ContradictionRule[] = [
  {
    id: 'contradiction_need_unclear_mechanics_defined', 
    title: 'La mécanique semble choisie avant le besoin', 
    message:
      'Le besoin est encore en cours de clarification,  mais une ou plusieurs mécaniques sont déjà envisagées.', 
    recommendation:
      'Clarifier d’abord le problème utilisateur à résoudre,  puis vérifier si les mécaniques choisies répondent réellement à ce besoin.', 
    severity: 'warning', 
    sourceQuestionIds: ['Q2',  'Q12'], 
    sourceOptionIds: ['need_unclear',  ...mechanicOptionIds], 
    matches: (answers) =>
      hasSelectedOption(answers,  'Q2',  'need_unclear') &&
      hasAnySelectedOption(answers,  'Q12',  mechanicOptionIds), 
    deepDive: {
      mechanism:
        'C’est le piège classique du « solutionnisme » : partir d’une mécanique qu’on aime ou qu’un concurrent utilise,  plutôt que d’un problème identifié. Une mécanique choisie avant le besoin a statistiquement plus de chances d’être mal calibrée,  sur-dimensionnée ou simplement hors-sujet.', 
      alternatives: [
        'Revenir en arrière et formuler le besoin en une phrase simple avant de continuer (« les utilisateur-rices abandonnent à l’étape 3 parce que… »).', 
        'Tester si le besoin identifié pourrait être résolu sans aucune gamification (souvent un signe que la mécanique est superflue).', 
        'Documenter explicitement le lien entre la mécanique choisie et le besoin,  pour pouvoir le challenger plus tard.', 
      ], 
    }, 
  }, 
  {
    id: 'contradiction_action_undefined_mechanics_defined', 
    title: 'L’action principale n’est pas encore définie', 
    message:
      'L’action principale à accompagner n’est pas encore définie,  mais des mécaniques sont déjà envisagées.', 
    recommendation:
      'Définir l’action principale avant de valider une mécanique : comprendre,  terminer,  progresser,  contribuer,  revenir,  partager ou convertir.', 
    severity: 'warning', 
    sourceQuestionIds: ['Q4',  'Q12'], 
    sourceOptionIds: ['action_undefined',  ...mechanicOptionIds], 
    matches: (answers) =>
      hasSelectedOption(answers,  'Q4',  'action_undefined') &&
      hasAnySelectedOption(answers,  'Q12',  mechanicOptionIds), 
  }, 
  {
    id: 'contradiction_personal_choice_main_path', 
    title: 'Usage volontaire,  mais mécanique intégrée au parcours principal', 
    message:
      'L’expérience est utilisée par choix personnel,  mais la mécanique fait partie du parcours principal.', 
    recommendation:
      'Vérifier que la mécanique reste réellement optionnelle ou qu’elle apporte une aide claire sans devenir une contrainte.', 
    severity: 'warning', 
    sourceQuestionIds: ['Q7',  'Q14'], 
    sourceOptionIds: ['personal_choice',  'main_path'], 
    matches: (answers) =>
      hasSelectedOption(answers,  'Q7',  'personal_choice') &&
      hasSelectedOption(answers,  'Q14',  'main_path'), 
    deepDive: {
      mechanism:
        'Un usage volontaire implique que la personne garde la main sur son expérience. Si la mécanique gamifiée est incontournable dans le parcours principal,  ce choix initial devient illusoire : on ne peut plus utiliser le service « normalement » sans traverser la couche gamifiée.', 
      alternatives: [
        'Découpler la mécanique du parcours essentiel : elle doit rester une couche additive,  jamais une étape obligatoire.', 
        'Ajouter un accès direct ou un raccourci pour les personnes qui veulent seulement utiliser le service,  sans la mécanique.', 
        'Mesurer ce qui se passe réellement si quelqu’un ignore la mécanique, si l’expérience se dégrade fortement,  elle n’est pas optionnelle en pratique.', 
      ], 
    }, 
  }, 
  {
    id: 'contradiction_personal_choice_dependent_elements', 
    title: 'Usage volontaire,  mais certains éléments dépendent de la mécanique', 
    message:
      'L’expérience est utilisée par choix personnel,  mais certains éléments dépendent de l’interaction avec la mécanique.', 
    recommendation:
      'Prévoir une alternative ou un accès non gamifié pour éviter que la participation devienne implicitement obligatoire.', 
    severity: 'warning', 
    sourceQuestionIds: ['Q7',  'Q14'], 
    sourceOptionIds: ['personal_choice',  'dependent_elements'], 
    matches: (answers) =>
      hasSelectedOption(answers,  'Q7',  'personal_choice') &&
      hasSelectedOption(answers,  'Q14',  'dependent_elements'), 
  }, 
  {
    id: 'contradiction_optional_required_to_finish', 
    title: 'Participation annoncée comme optionnelle,  mais nécessaire pour terminer', 
    message:
      'La participation est présentée comme optionnelle,  mais la mécanique fait partie des étapes nécessaires pour terminer le parcours.', 
    recommendation:
      'Clarifier si la mécanique est réellement optionnelle. Si elle est nécessaire,  il faut expliquer son rôle et éviter qu’elle bloque inutilement l’accès au service.', 
    severity: 'blocking', 
    sourceQuestionIds: ['Q14',  'Q15'], 
    sourceOptionIds: ['optional_participation',  'required_to_finish'], 
    matches: (answers) =>
      hasSelectedOption(answers,  'Q14',  'optional_participation') &&
      hasSelectedOption(answers,  'Q15',  'required_to_finish'), 
    deepDive: {
      mechanism:
        'C’est la forme la plus directe de dark pattern par contradiction : annoncer une liberté de choix qui n’existe pas dans les faits. Ce décalage entre le discours et le comportement réel du produit est précisément ce que les régulateurs (DSA,  FTC) qualifient de pratique trompeuse,  indépendamment de l’intention de l’équipe produit.', 
      alternatives: [
        'Si la mécanique est vraiment indispensable,  retirer la mention « optionnel » et expliquer honnêtement pourquoi elle est nécessaire.', 
        'Si elle n’est pas indispensable,  retirer le blocage et permettre de terminer le parcours sans elle.', 
        'Auditer tout le parcours pour repérer d’autres endroits où « optionnel » est utilisé de façon similaire.', 
      ], 
    }, 
  }, 
  {
    id: 'contradiction_personal_choice_required_to_finish', 
    title: 'Usage par choix personnel,  mais mécanique nécessaire pour terminer', 
    message:
      'L’expérience est utilisée par choix personnel,  mais la mécanique est indiquée comme nécessaire pour terminer le parcours.', 
    recommendation:
      'Vérifier si l’utilisateur-rice peut réellement utiliser le service sans subir la mécanique,  ou rendre son rôle plus transparent.', 
    severity: 'warning', 
    sourceQuestionIds: ['Q7',  'Q15'], 
    sourceOptionIds: ['personal_choice',  'required_to_finish'], 
    matches: (answers) =>
      hasSelectedOption(answers,  'Q7',  'personal_choice') &&
      hasSelectedOption(answers,  'Q15',  'required_to_finish'), 
  }, 
  {
    id: 'contradiction_no_data_tracking_mechanics', 
    title: 'Aucune donnée prévue,  mais mécanique nécessitant un suivi', 
    message:
      'Aucune donnée personnelle liée à la gamification n’est prévue,  mais certaines mécaniques semblent nécessiter un suivi individuel.', 
    recommendation:
      'Clarifier quelles données sont nécessaires pour afficher la progression,  les niveaux,  le classement,  les objectifs ou les séries.', 
    severity: 'warning', 
    sourceQuestionIds: ['Q9',  'Q12'], 
    sourceOptionIds: ['no_personal_data',  ...trackingMechanicOptionIds], 
    matches: (answers) =>
      hasSelectedOption(answers,  'Q9',  'no_personal_data') &&
      hasAnySelectedOption(answers,  'Q12',  trackingMechanicOptionIds), 
    deepDive: {
      mechanism:
        'Un niveau,  un classement ou une série n’existent techniquement que parce qu’un historique est conservé quelque part, affirmer qu’aucune donnée n’est utilisée tout en gardant ces mécaniques est souvent un simple angle mort plutôt qu’un vrai choix,  ce qui pose un problème de transparence (RGPD : minimisation et information claire).', 
      alternatives: [
        'Documenter précisément quelles données sont réellement stockées pour faire fonctionner chaque mécanique sélectionnée.', 
        'Si le volume de données doit rester minimal,  privilégier un état local (non persistant,  réinitialisé à chaque session) plutôt qu’un historique complet.', 
        'Ajouter une mention claire dans les CGU ou l’écran concerné sur ce qui est utilisé,  même si ce n’est pas une donnée « sensible ».', 
      ], 
    }, 
  }, 
  {
    id: 'contradiction_no_regular_usage_recurring_mechanics', 
    title: 'Aucun usage régulier prévu,  mais mécanique de régularité envisagée', 
    message:
      'Aucun usage régulier n’est prévu,  mais des notifications,  rappels ou streaks sont envisagés.', 
    recommendation:
      'Vérifier si la régularité est réellement utile. Si l’usage est ponctuel,  privilégier un feedback ou une progression simple plutôt qu’une mécanique de retour.', 
    severity: 'warning', 
    sourceQuestionIds: ['Q12',  'Q16'], 
    sourceOptionIds: ['no_regular_usage',  ...recurringMechanicOptionIds], 
    matches: (answers) =>
      hasSelectedOption(answers,  'Q16',  'no_regular_usage') &&
      hasAnySelectedOption(answers,  'Q12',  recurringMechanicOptionIds), 
  }, 
  {
    id: 'contradiction_no_regular_usage_frequent_return', 
    title: 'Aucun usage régulier prévu,  mais motivation basée sur le retour fréquent', 
    message:
      'L’expérience ne prévoit pas d’usage régulier,  mais le retour fréquent est indiqué comme motivation principale.', 
    recommendation:
      'Clarifier le rythme attendu : usage ponctuel,  retour occasionnel ou usage régulier. La mécanique doit correspondre à ce rythme.', 
    severity: 'warning', 
    sourceQuestionIds: ['Q10',  'Q16'], 
    sourceOptionIds: ['frequent_return',  'no_regular_usage'], 
    matches: (answers) =>
      hasSelectedOption(answers,  'Q16',  'no_regular_usage') &&
      hasSelectedOption(answers,  'Q10',  'frequent_return'), 
  }, 
  {
    id: 'contradiction_private_results_social_mechanics', 
    title: 'Résultats privés,  mais mécanique sociale envisagée', 
    message:
      'Les résultats sont indiqués comme privés,  mais une mécanique de classement ou de comparaison est envisagée.', 
    recommendation:
      'Clarifier si la comparaison est vraiment nécessaire. Une progression personnelle ou un objectif collectif peut être plus cohérent avec une visibilité privée.', 
    severity: 'warning', 
    sourceQuestionIds: ['Q12',  'Q17'], 
    sourceOptionIds: ['private',  'ranking',  'comparison_users'], 
    matches: (answers) =>
      hasSelectedOption(answers,  'Q17',  'private') &&
      hasAnySelectedOption(answers,  'Q12',  ['ranking',  'comparison_users']), 
    deepDive: {
      mechanism:
        'Un classement ou une comparaison n’a de sens que s’il est vu par au moins une autre personne, l’associer à une visibilité « privée » révèle souvent que la mécanique a été copiée d’un autre produit sans être adaptée au contexte réel.', 
      alternatives: [
        'Si la visibilité doit rester privée,  remplacer le classement par une progression personnelle dans le temps.', 
        'Si une dimension sociale est réellement souhaitée,  la rendre explicite et opt-in plutôt que de la laisser en tension avec l’annonce de confidentialité.', 
      ], 
    }, 
  }, 
  {
    id: 'contradiction_light_role_strong_mechanics', 
    title: 'Rôle léger annoncé,  mais mécaniques fortes envisagées', 
    message:
      'La gamification est présentée comme un repère ou une aide légère,  mais certaines mécaniques envisagées peuvent fortement influencer l’expérience.', 
    recommendation:
      'Vérifier si ces mécaniques sont proportionnées. Si l’objectif est un guidage léger,  privilégier plutôt des étapes visibles,  du feedback ou une progression individuelle.', 
    severity: 'warning', 
    sourceQuestionIds: ['Q3',  'Q12'], 
    sourceOptionIds: ['light_marker',  ...strongMechanicOptionIds], 
    matches: (answers) =>
      hasSelectedOption(answers,  'Q3',  'light_marker') &&
      hasAnySelectedOption(answers,  'Q12',  strongMechanicOptionIds), 
    deepDive: {
      mechanism:
        'Un classement,  un streak ou une récompense ne sont jamais des mécaniques « légères » : ce sont parmi les plus influentes du répertoire de gamification. Les qualifier de simple repère revient à sous-estimer leur effet réel sur le comportement, un décalage qui mène souvent à ne pas leur appliquer les garde-fous nécessaires.', 
      alternatives: [
        'Si le rôle voulu est vraiment léger,  remplacer ces mécaniques par des étapes visibles ou un feedback simple,  sans dimension sociale ni compulsive.', 
        'Si ces mécaniques doivent rester,  ajuster le niveau de vigilance en conséquence plutôt que de les traiter comme secondaires.', 
      ], 
    }, 
  }, 
  {
    id: 'contradiction_unclear_role_central_mechanic', 
    title: 'Rôle de la gamification encore flou', 
    message:
      'Le rôle de la gamification est encore en cours de clarification,  mais des mécaniques sont déjà envisagées.', 
    recommendation:
      'Définir si la gamification doit seulement guider,  soutenir,  structurer ou devenir centrale avant de choisir les mécaniques.', 
    severity: 'info', 
    sourceQuestionIds: ['Q3',  'Q12'], 
    sourceOptionIds: ['role_unclear',  ...mechanicOptionIds], 
    matches: (answers) =>
      hasSelectedOption(answers,  'Q3',  'role_unclear') &&
      hasAnySelectedOption(answers,  'Q12',  mechanicOptionIds), 
  }, 
  {
    id: 'contradiction_low_visibility_high_impact_mechanics', 
    title: 'Mécanique influente,  mais fonctionnement peu visible', 
    message:
      'Le fonctionnement est peu visible ou automatisé,  alors que la mécanique peut influencer la progression,  les récompenses ou la comparaison.', 
    recommendation:
      'Ajouter une explication accessible sur ce qui est mesuré,  calculé ou déclenché par la mécanique.', 
    severity: 'warning', 
    sourceQuestionIds: ['Q12',  'Q13'], 
    sourceOptionIds: [
      'rules_low_visibility', 
      'ranking', 
      'rewards_benefits', 
      'personalized_goals', 
      'levels', 
    ], 
    matches: (answers) =>
      hasSelectedOption(answers,  'Q13',  'rules_low_visibility') &&
      hasAnySelectedOption(answers,  'Q12',  [
        'ranking', 
        'rewards_benefits', 
        'personalized_goals', 
        'levels', 
      ]), 
    deepDive: {
      mechanism:
        'Plus une mécanique influence réellement l’expérience (accès,  statut,  récompense),  plus l’opacité de son fonctionnement devient problématique : l’utilisateur-rice ne peut ni anticiper ni contester une règle qu’il ou elle ne connaît pas. C’est le principe de transparence algorithmique appliqué à une échelle produit,  pas seulement à l’IA.', 
      alternatives: [
        'Ajouter un écran ou une info-bulle « comment ça marche » accessible en un clic depuis la mécanique concernée.', 
        'Documenter en langage clair (pas technique) ce qui déclenche un niveau,  un classement ou un objectif personnalisé.', 
        'Prioriser la transparence sur les mécaniques à fort impact d’abord (classement,  objectifs) avant les plus anodines.', 
      ], 
    }, 
  }, 
  {
    id: 'contradiction_no_specific_context_with_sensitive_context', 
    title: 'Contexte indiqué comme neutre,  mais autre signal sensible sélectionné', 
    message:
      'Aucun élément particulier est indiqué,  mais un autre élément sensible ou spécifique est aussi sélectionné.', 
    recommendation:
      'Choisir soit “Aucun élément particulier identifié”,  soit les caractéristiques spécifiques du projet. Cette clarification évite un diagnostic contradictoire.', 
    severity: 'info', 
    sourceQuestionIds: ['Q6'], 
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
      hasSelectedOption(answers,  'Q6',  'no_specific_element') &&
      hasAnySelectedOption(answers,  'Q6',  [
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
    title: 'Aucune mécanique précise,  mais des mécaniques sont aussi sélectionnées', 
    message:
      'L’option “Aucune mécanique précise pour l’instant” est sélectionnée en même temps que des mécaniques précises.', 
    recommendation:
      'Choisir soit “Aucune mécanique précise pour l’instant”,  soit les mécaniques déjà envisagées.', 
    severity: 'info', 
    sourceQuestionIds: ['Q12'], 
    sourceOptionIds: ['no_precise_mechanic',  ...mechanicOptionIds], 
    matches: (answers) =>
      hasSelectedOption(answers,  'Q12',  'no_precise_mechanic') &&
      hasAnySelectedOption(answers,  'Q12',  mechanicOptionIds), 
  }, 
  {
    id: 'contradiction_business_only_benefit', 
    title: 'Bénéfice orienté uniquement business', 
    message:
      'Les bénéfices identifiés semblent principalement orientés vers des objectifs internes (temps passé,  actions,  conversion),  sans bénéfice explicite pour l’utilisateur-rice.', 
    recommendation:
      'Clarifier ou reformuler le bénéfice utilisateur avant de poursuivre. Si aucun bénéfice utilisateur n’est identifiable,  repenser la mécanique plutôt que de l’optimiser.', 
    severity: 'warning', 
    sourceQuestionIds: ['Q5'], 
    sourceOptionIds: [...businessOnlyBenefitOptionIds,  ...userBenefitOptionIds], 
    matches: (answers) =>
      hasAnySelectedOption(answers,  'Q5',  businessOnlyBenefitOptionIds) &&
      !hasAnySelectedOption(answers,  'Q5',  userBenefitOptionIds), 
    deepDive: {
      mechanism:
        'Optimiser une mécanique pour un seul indicateur interne (temps passé,  actions,  conversion) sans bénéfice utilisateur explicite est la définition même d’un pattern manipulatoire,  même sans intention malveillante, c’est le piège de la loi de Goodhart appliquée à l’UX : une métrique devient la cible et cesse de représenter ce qu’elle était censée mesurer. Le risque n’est pas seulement éthique : une fois qu’un utilisateur perçoit qu’il est « joué » plutôt que servi,  la confiance s’érode durablement,  souvent bien après que la métrique business ait cessé de progresser.', 
      alternatives: [
        'Reformuler l’objectif en indicateur double (ex. « taux de complétion » ET « satisfaction post-usage »).', 
        'Impliquer la recherche UX pour identifier un vrai point de friction à résoudre,  plutôt que de partir du KPI.', 
        'Tester une version sans la mécanique pour voir si le KPI business tient sans elle, si non,  la mécanique masquait probablement un problème produit plus profond.', 
      ], 
    }, 
  }, 
  {
    id: 'contradiction_random_reward_young_audience', 
    title: 'Récompense aléatoire pour un public jeune', 
    message:
      'Le public cible inclut des jeunes ou adolescent-es,  et une mécanique de récompense aléatoire est envisagée. Cette combinaison est particulièrement sensible (proche des mécaniques de type loot box).', 
    recommendation:
      'Recommander vivement une alternative non aléatoire et prévisible ; justification écrite explicite requise si la mécanique est maintenue.', 
    severity: 'warning', 
    sourceQuestionIds: ['Q6',  'Q12'], 
    sourceOptionIds: ['young_audience',  'random_reward'], 
    matches: (answers) =>
      hasSelectedOption(answers,  'Q6',  'young_audience') &&
      hasSelectedOption(answers,  'Q12',  'random_reward'), 
    deepDive: {
      mechanism:
        'Le contrôle des impulsions est encore en développement chez un public jeune,  ce qui rend le renforcement à ratio variable (voir fiche « Récompense aléatoire ») plus efficace,  et donc plus problématique,  que chez un public adulte. C’est précisément cette combinaison que plusieurs régulateurs visent en premier lors de l’examen des loot boxes.', 
      alternatives: [
        'Retirer l’aléa pour ce public spécifique,  même s’il est conservé ailleurs pour un public adulte.', 
        'Documenter explicitement pourquoi la mécanique est jugée nécessaire malgré le public concerné,  si elle est maintenue.', 
        'Prévoir une vérification ou une segmentation d’âge si le produit s’adresse à des publics mixtes.', 
      ], 
    }, 
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
      deepDive: rule.deepDive, 
    }))
    .sort(sortContradictionsBySeverity)
}

function sortContradictionsBySeverity(
  first: ContradictionResult, 
  second: ContradictionResult, 
): number {
  const severityWeight: Record<ContradictionSeverity,  number> = {
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
  return getSelectedOptionIds(answers,  questionId).includes(optionId)
}

function hasAnySelectedOption(
  answers: EvaluationAnswers, 
  questionId: QuestionId, 
  optionIds: OptionId[], 
): boolean {
  const selectedOptionIds = getSelectedOptionIds(answers,  questionId)

  return optionIds.some((optionId) => selectedOptionIds.includes(optionId))
}
