import type {
  EvaluationAnswers,
  OptionId,
  QuestionId,
  RiskLevel,
  RiskSignal,
  RiskThemeId,
  RiskThemeResult,
} from './evaluation.types'

interface RiskSignalRule {
  id: string
  themeId: RiskThemeId
  questionId: QuestionId
  optionId: OptionId
  weight: number
  message: string
}

const riskThemeLabels: Record<RiskThemeId, string> = {
  social_comparison: 'Comparaison sociale',
  autonomy_control: 'Autonomie et contrôle',
  data_profile: 'Données et profilage',
  temporal_pressure: 'Pression temporelle',
  commercial_conversion: 'Finalité commerciale / conversion',
  sensitive_context: 'Public ou contexte sensible',
}

const riskSignalRules: RiskSignalRule[] = [
  // ─── Comparaison sociale ────────────────────────────────────────────────────
  {
    id: 'risk_social_young_audience',
    themeId: 'social_comparison',
    questionId: 'Q6',
    optionId: 'young_audience',
    weight: 1,
    message:
      'Un public jeune peut être plus sensible aux effets de comparaison, de statut ou de classement.',
  },
  {
    id: 'risk_social_ranking_data',
    themeId: 'social_comparison',
    questionId: 'Q9',
    optionId: 'ranking_data',
    weight: 2,
    message:
      'Le suivi servant à situer ou classer les utilisateur-rices augmente la vigilance sur la comparaison sociale.',
  },
  {
    id: 'risk_social_ranking_mechanic',
    themeId: 'social_comparison',
    questionId: 'Q12',
    optionId: 'ranking',
    weight: 2,
    message:
      'Un classement peut générer de la pression, du découragement ou une focalisation excessive sur le rang.',
  },
  {
    id: 'risk_social_comparison_mechanic',
    themeId: 'social_comparison',
    questionId: 'Q12',
    optionId: 'comparison_users',
    weight: 2,
    message:
      'La comparaison entre utilisateur-rices peut déplacer l’attention de la progression personnelle vers la performance relative.',
  },
  {
    id: 'risk_social_badges',
    themeId: 'social_comparison',
    questionId: 'Q12',
    optionId: 'badges_trophies',
    weight: 1,
    message:
      'Les badges ou trophées peuvent devenir des marqueurs de statut s’ils sont trop visibles ou trop fréquents.',
  },
  {
    id: 'risk_social_motivation_comparison',
    themeId: 'social_comparison',
    questionId: 'Q10',
    optionId: 'social_comparison',
    weight: 2,
    message:
      'Une motivation basée sur la comparaison avec les autres demande une vigilance élevée.',
  },
  {
    id: 'risk_social_visibility_limited_group',
    themeId: 'social_comparison',
    questionId: 'Q17',
    optionId: 'limited_group',
    weight: 1,
    message:
      'Une visibilité à un groupe limité peut créer une pression sociale selon le contexte.',
  },
  {
    id: 'risk_social_visibility_concerned_users',
    themeId: 'social_comparison',
    questionId: 'Q17',
    optionId: 'visible_to_concerned_users',
    weight: 1,
    message:
      'Une visibilité auprès des autres utilisateur-rices concerné-es peut renforcer les effets de comparaison.',
  },
  {
    id: 'risk_social_visibility_ranking',
    themeId: 'social_comparison',
    questionId: 'Q17',
    optionId: 'ranking_comparison',
    weight: 2,
    message:
      'L’utilisation des résultats dans un classement ou une comparaison augmente fortement la vigilance.',
  },

  // ─── Autonomie et contrôle ──────────────────────────────────────────────────
  {
    id: 'risk_autonomy_evaluative_context',
    themeId: 'autonomy_control',
    questionId: 'Q6',
    optionId: 'evaluative_context',
    weight: 2,
    message:
      'Un cadre scolaire, professionnel ou évaluatif réduit souvent la liberté réelle de participation.',
  },
  {
    id: 'risk_autonomy_important_service',
    themeId: 'autonomy_control',
    questionId: 'Q6',
    optionId: 'important_service_access',
    weight: 2,
    message:
      'Quand l’expérience donne accès à un service important, la mécanique ne devrait pas devenir un obstacle.',
  },
  {
    id: 'risk_autonomy_work_context',
    themeId: 'autonomy_control',
    questionId: 'Q7',
    optionId: 'work_context',
    weight: 1,
    message:
      'Dans un cadre professionnel, la participation peut être moins volontaire qu’elle ne paraît.',
  },
  {
    id: 'risk_autonomy_school_context',
    themeId: 'autonomy_control',
    questionId: 'Q7',
    optionId: 'school_training_context',
    weight: 2,
    message:
      'Dans un cadre scolaire ou de formation, la mécanique doit préserver la possibilité de comprendre et d’agir sans pression excessive.',
  },
  {
    id: 'risk_autonomy_important_service_usage',
    themeId: 'autonomy_control',
    questionId: 'Q7',
    optionId: 'important_service',
    weight: 2,
    message:
      'L’accès à un service important demande une attention particulière à l’optionnalité et à l’accès non bloquant.',
  },
  {
    id: 'risk_autonomy_rules_low_visibility',
    themeId: 'autonomy_control',
    questionId: 'Q13',
    optionId: 'rules_low_visibility',
    weight: 1,
    message:
      'Un fonctionnement peu visible limite la capacité de l’utilisateur-rice à comprendre ce qui influence son expérience.',
  },
  {
    id: 'risk_autonomy_transparency_undefined',
    themeId: 'autonomy_control',
    questionId: 'Q13',
    optionId: 'transparency_undefined',
    weight: 1,
    message:
      'Si l’explication du fonctionnement n’est pas définie, le niveau de contrôle perçu peut être insuffisant.',
  },
  {
    id: 'risk_autonomy_main_path',
    themeId: 'autonomy_control',
    questionId: 'Q14',
    optionId: 'main_path',
    weight: 2,
    message:
      'Une mécanique intégrée au parcours principal doit être justifiée par une vraie utilité utilisateur.',
  },
  {
    id: 'risk_autonomy_dependent_elements',
    themeId: 'autonomy_control',
    questionId: 'Q14',
    optionId: 'dependent_elements',
    weight: 2,
    message:
      'Si certains éléments dépendent de la mécanique, il faut vérifier qu’une alternative reste possible.',
  },
  {
    id: 'risk_autonomy_control_undefined',
    themeId: 'autonomy_control',
    questionId: 'Q14',
    optionId: 'control_undefined',
    weight: 1,
    message:
      'Le niveau de contrôle utilisateur doit être clarifié avant de finaliser la mécanique.',
  },
  {
    id: 'risk_autonomy_hard_to_disengage',
    themeId: 'autonomy_control',
    questionId: 'Q14',
    optionId: 'hard_to_disengage',
    weight: 2,
    message:
      'Une mécanique facile à rejoindre mais difficile à quitter (classement qu’on ne peut pas abandonner, streak qu’on ne peut pas arrêter sans tout perdre) déplace le problème de l’entrée vers la sortie.',
  },
  {
    id: 'risk_autonomy_required_to_finish',
    themeId: 'autonomy_control',
    questionId: 'Q15',
    optionId: 'required_to_finish',
    weight: 2,
    message:
      'Une mécanique nécessaire pour terminer le parcours peut réduire l’autonomie réelle.',
  },

  // ─── Données et profilage ───────────────────────────────────────────────────
  {
    id: 'risk_data_sensitive_personal_data',
    themeId: 'data_profile',
    questionId: 'Q6',
    optionId: 'sensitive_personal_data',
    weight: 2,
    message:
      'La présence de données personnelles ou sensibles demande une logique de minimisation et d’explication claire.',
  },
  {
    id: 'risk_data_personal_progress',
    themeId: 'data_profile',
    questionId: 'Q9',
    optionId: 'personal_progress_data',
    weight: 1,
    message:
      'Une progression personnelle implique un suivi individuel, même si celui-ci reste limité.',
  },
  {
    id: 'risk_data_personalization',
    themeId: 'data_profile',
    questionId: 'Q9',
    optionId: 'personalization_data',
    weight: 2,
    message:
      'La personnalisation peut être utile, mais elle doit rester compréhensible et proportionnée.',
  },
  {
    id: 'risk_data_ranking',
    themeId: 'data_profile',
    questionId: 'Q9',
    optionId: 'ranking_data',
    weight: 2,
    message:
      'Le suivi utilisé pour classer ou comparer les utilisateur-rices augmente fortement la vigilance liée aux données.',
  },
  {
    id: 'risk_data_undefined',
    themeId: 'data_profile',
    questionId: 'Q9',
    optionId: 'data_undefined',
    weight: 1,
    message:
      'Le traitement des données doit être clarifié avant de choisir une mécanique personnalisée ou comparative.',
  },
  {
    id: 'risk_data_levels',
    themeId: 'data_profile',
    questionId: 'Q12',
    optionId: 'levels',
    weight: 1,
    message:
      'Les niveaux supposent souvent de mémoriser une progression ou un statut utilisateur.',
  },
  {
    id: 'risk_data_progress_bar',
    themeId: 'data_profile',
    questionId: 'Q12',
    optionId: 'progress_bar',
    weight: 1,
    message:
      'Une barre de progression peut impliquer un suivi individuel de l’avancement.',
  },
  {
    id: 'risk_data_personalized_goals',
    themeId: 'data_profile',
    questionId: 'Q12',
    optionId: 'personalized_goals',
    weight: 2,
    message:
      'Les objectifs personnalisés nécessitent de clarifier quelles données sont utilisées et pourquoi.',
  },

  // ─── Pression temporelle ────────────────────────────────────────────────────
  {
    id: 'risk_temporal_return_need',
    themeId: 'temporal_pressure',
    questionId: 'Q2',
    optionId: 'return_experience',
    weight: 1,
    message:
      'Chercher à encourager le retour demande de distinguer rappel utile et pression au retour.',
  },
  {
    id: 'risk_temporal_return_action',
    themeId: 'temporal_pressure',
    questionId: 'Q4',
    optionId: 'return_regularly',
    weight: 1,
    message:
      'Une action principale basée sur le retour régulier doit éviter les pénalités ou rappels trop insistants.',
  },
  {
    id: 'risk_temporal_notifications',
    themeId: 'temporal_pressure',
    questionId: 'Q12',
    optionId: 'notifications_reminders',
    weight: 1,
    message:
      'Les notifications ou rappels peuvent capter l’attention s’ils sont fréquents, non paramétrables ou peu utiles.',
  },
  {
    id: 'risk_temporal_streak',
    themeId: 'temporal_pressure',
    questionId: 'Q12',
    optionId: 'streak',
    weight: 2,
    message:
      'Les streaks peuvent créer une peur de perdre la série ou une pression de continuité.',
  },
  {
    id: 'risk_temporal_rewards',
    themeId: 'temporal_pressure',
    questionId: 'Q12',
    optionId: 'rewards_benefits',
    weight: 1,
    message:
      'Les récompenses liées à une présence ou une action répétée peuvent encourager un usage sous pression.',
  },
  {
    id: 'risk_temporal_frequent_return',
    themeId: 'temporal_pressure',
    questionId: 'Q10',
    optionId: 'frequent_return',
    weight: 2,
    message:
      'Une motivation basée sur le retour fréquent nécessite de prévoir des limites et une reprise sans pénalité forte.',
  },
  {
    id: 'risk_temporal_regular_encouraged',
    themeId: 'temporal_pressure',
    questionId: 'Q16',
    optionId: 'regularity_encouraged',
    weight: 1,
    message:
      'L’usage régulier encouragé peut être pertinent, mais doit rester modéré et non culpabilisant.',
  },
  {
    id: 'risk_temporal_regular_valued',
    themeId: 'temporal_pressure',
    questionId: 'Q16',
    optionId: 'regularity_valued',
    weight: 2,
    message:
      'Valoriser la régularité peut créer une pression à maintenir un rythme.',
  },
  {
    id: 'risk_temporal_interruption_progress',
    themeId: 'temporal_pressure',
    questionId: 'Q16',
    optionId: 'interruption_changes_progress',
    weight: 2,
    message:
      'Une interruption qui modifie la progression, le statut ou les avantages peut créer une pression au retour.',
  },
  {
    id: 'risk_temporal_interruption_status',
    themeId: 'temporal_pressure',
    questionId: 'Q18',
    optionId: 'interruption_changes_status',
    weight: 2,
    message:
      'La perte de progression, de statut ou d’avantages après une pause augmente la vigilance.',
  },
  {
    id: 'risk_temporal_random_reward',
    themeId: 'temporal_pressure',
    questionId: 'Q12',
    optionId: 'random_reward',
    weight: 2,
    message:
      'Le renforcement à ratio variable (récompense imprévisible) est un des mécanismes les plus documentés de dépendance comportementale.',
  },
  {
    id: 'risk_temporal_no_resume_behavior',
    themeId: 'temporal_pressure',
    questionId: 'Q18',
    optionId: 'no_specific_behavior',
    weight: 1,
    message:
      'Si aucun comportement de reprise n’est prévu, l’expérience peut devenir frustrante après une absence.',
  },

  // ─── Finalité commerciale / conversion ──────────────────────────────────────
  {
    id: 'risk_commercial_increase_actions',
    themeId: 'commercial_conversion',
    questionId: 'Q5',
    optionId: 'increase_actions',
    weight: 1,
    message:
      'Vérifier que ce KPI ne prime pas sur un bénéfice réel pour l’utilisateur-rice.',
  },
  {
    id: 'risk_commercial_increase_time_spent',
    themeId: 'commercial_conversion',
    questionId: 'Q5',
    optionId: 'increase_time_spent',
    weight: 1,
    message:
      'Le temps passé n’est pas un indicateur neutre : vérifier qu’il traduit une valeur réelle et non une captation d’attention.',
  },
  {
    id: 'risk_commercial_objective',
    themeId: 'commercial_conversion',
    questionId: 'Q5',
    optionId: 'commercial_objective',
    weight: 1,
    message:
      'Légitime en soi ; vérifier qu’il est équilibré par au moins un bénéfice explicite pour l’utilisateur-rice.',
  },
  {
    id: 'risk_commercial_convert_action',
    themeId: 'commercial_conversion',
    questionId: 'Q4',
    optionId: 'convert',
    weight: 2,
    message:
      'Une mécanique liée à l’achat, la réservation ou la conversion doit aider à décider sans créer de pression artificielle.',
  },
  {
    id: 'risk_commercial_promotional_context',
    themeId: 'commercial_conversion',
    questionId: 'Q6',
    optionId: 'commercial_promotional_context',
    weight: 2,
    message:
      'Un contexte commercial ou promotionnel demande de vérifier que la mécanique sert aussi l’intérêt de l’utilisateur-rice.',
  },
  {
    id: 'risk_commercial_usage_context',
    themeId: 'commercial_conversion',
    questionId: 'Q7',
    optionId: 'commercial_context',
    weight: 1,
    message:
      'Dans un contexte commercial, les mécaniques de récompense, urgence ou rappel doivent rester proportionnées.',
  },
  {
    id: 'risk_commercial_rewards',
    themeId: 'commercial_conversion',
    questionId: 'Q12',
    optionId: 'rewards_benefits',
    weight: 2,
    message:
      'Les récompenses ou avantages peuvent influencer la décision au-delà de la valeur réelle du service.',
  },
  {
    id: 'risk_commercial_notifications',
    themeId: 'commercial_conversion',
    questionId: 'Q12',
    optionId: 'notifications_reminders',
    weight: 1,
    message:
      'Les rappels dans un contexte commercial doivent éviter de pousser uniquement à l’action immédiate.',
  },
  {
    id: 'risk_commercial_concrete_reward',
    themeId: 'commercial_conversion',
    questionId: 'Q10',
    optionId: 'concrete_reward',
    weight: 2,
    message:
      'Une récompense concrète peut déplacer la motivation vers l’avantage obtenu plutôt que vers l’utilité de l’action.',
  },

  // ─── Public ou contexte sensible ────────────────────────────────────────────
  {
    id: 'risk_sensitive_young_audience',
    themeId: 'sensitive_context',
    questionId: 'Q6',
    optionId: 'young_audience',
    weight: 2,
    message:
      'Un public jeune ou adolescent demande une attention particulière aux mécaniques de statut, comparaison et récompense.',
  },
  {
    id: 'risk_sensitive_health_performance',
    themeId: 'sensitive_context',
    questionId: 'Q6',
    optionId: 'health_wellbeing_performance',
    weight: 2,
    message:
      'Dans un contexte de santé, bien-être ou performance, il faut éviter les mécaniques qui renforcent la culpabilisation ou la pression.',
  },
  {
    id: 'risk_sensitive_evaluative_context',
    themeId: 'sensitive_context',
    questionId: 'Q6',
    optionId: 'evaluative_context',
    weight: 2,
    message:
      'Un cadre scolaire, professionnel ou évaluatif peut renforcer la pression ressentie.',
  },
  {
    id: 'risk_sensitive_important_service',
    themeId: 'sensitive_context',
    questionId: 'Q6',
    optionId: 'important_service_access',
    weight: 2,
    message:
      'L’accès à un service important demande une conception particulièrement claire, accessible et non bloquante.',
  },
  {
    id: 'risk_sensitive_work',
    themeId: 'sensitive_context',
    questionId: 'Q7',
    optionId: 'work_context',
    weight: 1,
    message:
      'Dans un cadre de travail, la participation peut être liée à des attentes implicites.',
  },
  {
    id: 'risk_sensitive_school',
    themeId: 'sensitive_context',
    questionId: 'Q7',
    optionId: 'school_training_context',
    weight: 2,
    message:
      'Dans un cadre scolaire ou de formation, il faut éviter les mécaniques qui exposent ou comparent trop fortement les résultats.',
  },
  {
    id: 'risk_sensitive_health',
    themeId: 'sensitive_context',
    questionId: 'Q7',
    optionId: 'health_wellbeing_context',
    weight: 2,
    message:
      'Pour la santé ou le bien-être, les objectifs, rappels et comparaisons doivent rester prudents et non culpabilisants.',
  },
  {
    id: 'risk_sensitive_service',
    themeId: 'sensitive_context',
    questionId: 'Q7',
    optionId: 'important_service',
    weight: 2,
    message:
      'Pour accéder à un service important, la mécanique ne doit pas conditionner inutilement l’accès ou la compréhension.',
  },
  {
    id: 'risk_sensitive_organizational_financial_impact',
    themeId: 'sensitive_context',
    questionId: 'Q8',
    optionId: 'organizational_financial_impact',
    weight: 1,
    message:
      'Vérifier que la mécanique n’introduit pas de pénalité disproportionnée par rapport à l’enjeu réel.',
  },
  {
    id: 'risk_sensitive_school_professional_impact',
    themeId: 'sensitive_context',
    questionId: 'Q8',
    optionId: 'school_professional_impact',
    weight: 2,
    message:
      'Signal fort : vérifier que la mécanique ne pénalise jamais un parcours scolaire ou professionnel réel.',
  },
  {
    id: 'risk_sensitive_health_safety_impact',
    themeId: 'sensitive_context',
    questionId: 'Q8',
    optionId: 'health_safety_impact',
    weight: 2,
    message:
      'Signal fort : dans ce contexte, toute mécanique de pression temporelle ou de comparaison sociale doit être reconsidérée en priorité.',
  },

  // ─── Données et profilage (Q12 — récompense aléatoire) ──────────────────────
  {
    id: 'risk_data_random_reward_tracking',
    themeId: 'data_profile',
    questionId: 'Q12',
    optionId: 'random_reward',
    weight: 1,
    message:
      'Une récompense aléatoire nécessite souvent de suivre l’historique des tirages pour éviter les répétitions ou en garantir l’équité.',
  },
]

export function getRiskThemes(answers: EvaluationAnswers): RiskThemeResult[] {
  const activeSignals = getActiveRiskSignals(answers)

  const themeIds = Object.keys(riskThemeLabels) as RiskThemeId[]

  return themeIds.map((themeId) => {
    const themeSignals = activeSignals.filter((signal) => signal.themeId === themeId)
    const score = themeSignals.reduce((total, signal) => total + signal.weight, 0)
    const level = getRiskLevel(score)

    return {
      id: themeId,
      label: riskThemeLabels[themeId],
      score,
      level,
      signals: themeSignals,
      summary: getThemeSummary(themeId, level),
      recommendation: getThemeRecommendation(themeId, level),
    }
  })
}

export function getActiveRiskSignals(answers: EvaluationAnswers): RiskSignal[] {
  return riskSignalRules
    .filter((rule) => hasSelectedOption(answers, rule.questionId, rule.optionId))
    .map((rule) => ({
      id: rule.id,
      themeId: rule.themeId,
      questionId: rule.questionId,
      optionId: rule.optionId,
      weight: rule.weight,
      message: rule.message,
    }))
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

function getRiskLevel(score: number): RiskLevel {
  if (score <= 0) {
    return 'none'
  }

  if (score === 1) {
    return 'low'
  }

  if (score === 2) {
    return 'moderate'
  }

  if (score <= 4) {
    return 'high'
  }

  return 'critical'
}

function getThemeSummary(themeId: RiskThemeId, level: RiskLevel): string {
  if (level === 'none') {
    return 'Aucun signal particulier n’a été détecté pour cette thématique.'
  }

  const summaries: Record<RiskThemeId, string> = {
    social_comparison:
      'Des éléments peuvent exposer les utilisateur-rices à une comparaison, un classement ou une logique de statut.',
    autonomy_control:
      'Certains éléments peuvent réduire la marge de choix, de compréhension ou de contrôle de l’utilisateur-rice.',
    data_profile:
      'La mécanique semble impliquer un suivi individuel, une personnalisation ou une utilisation de données à clarifier.',
    temporal_pressure:
      'Certains éléments peuvent encourager un retour fréquent, une continuité forcée ou une pression liée au temps.',
    commercial_conversion:
      'La mécanique peut influencer une action commerciale, une réservation, un achat ou une conversion.',
    sensitive_context:
      'Le public ou le contexte d’usage demande une attention renforcée.',
  }

  return summaries[themeId]
}

function getThemeRecommendation(themeId: RiskThemeId, level: RiskLevel): string {
  if (level === 'none') {
    return 'Aucune adaptation spécifique n’est nécessaire pour cette thématique à ce stade.'
  }

  const recommendations: Record<RiskThemeId, string> = {
    social_comparison:
      'Privilégier une progression personnelle, un feedback privé ou un objectif collectif plutôt qu’un classement individuel visible.',
    autonomy_control:
      'Prévoir une participation réellement optionnelle, une explication claire et un accès non bloquant au service principal.',
    data_profile:
      'Limiter les données collectées, expliquer leur usage et éviter le suivi individuel lorsqu’il n’est pas nécessaire.',
    temporal_pressure:
      'Prévoir des rappels modérés, désactivables et une reprise sans pénalité excessive après une pause.',
    commercial_conversion:
      'Vérifier que la mécanique aide réellement la décision et ne crée pas une pression artificielle à l’achat ou à l’action immédiate.',
    sensitive_context:
      'Adapter la mécanique au public concerné, éviter la culpabilisation, la comparaison excessive et les récompenses trop incitatives.',
  }

  return recommendations[themeId]
}