import type {
  EvaluationAnswers, 
  OptionId, 
  QuestionId, 
  RecommendationDeepDive, 
  RiskLevel, 
  SynergyResult, 
} from './evaluation.types'

/**
 * Contrairement à la matrice de pondération (qui additionne des signaux
 * indépendants),  ce moteur capture des combinaisons précises de réponses
 * dont le risque combiné dépasse la simple somme des signaux pris
 * séparément, l'effet est multiplicatif,  pas additif.
 */
interface SynergyRule {
  id: string
  title: string
  message: string
  recommendation: string
  level: RiskLevel
  sourceQuestionIds: QuestionId[]
  matches: (answers: EvaluationAnswers) => boolean
  deepDive?: RecommendationDeepDive
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

const temporalPressureMechanicOptionIds: OptionId[] = [
  'streak', 
  'notifications_reminders', 
  'random_reward', 
]

const synergyRules: SynergyRule[] = [
  {
    id: 'synergy_ranking_streak_random_reward', 
    title: 'Classement,  série de jours et récompense aléatoire combinés', 
    message:
      'Comparaison sociale,  pression temporelle et renforcement à ratio variable combinés : chacune de ces mécaniques est déjà sensible seule,  mais leur combinaison crée une boucle de compulsion nettement plus forte que la somme de leurs scores individuels.', 
    recommendation:
      'Justification écrite obligatoire si cette combinaison est maintenue ; recommander de retirer au moins une des trois mécaniques.', 
    level: 'critical', 
    sourceQuestionIds: ['Q12'], 
    matches: (answers) =>
      hasSelectedOption(answers,  'Q12',  'ranking') &&
      hasSelectedOption(answers,  'Q12',  'streak') &&
      hasSelectedOption(answers,  'Q12',  'random_reward'), 
    deepDive: {
      mechanism:
        'Chaque mécanique agit sur un levier psychologique distinct, comparaison sociale (classement),  obligation temporelle (série),  incertitude de récompense (aléatoire). Combinées,  elles ne s’additionnent pas : elles se renforcent,  un schéma documenté dans la conception des jeux à mécaniques compulsives (« triple hook »). Retirer un seul des trois leviers réduit la pression globale de façon disproportionnée par rapport à l’effort fourni.', 
      alternatives: [
        'Retirer en priorité la récompense aléatoire : c’est le levier le plus à risque des trois pris isolément (voir fiche dédiée).', 
        'Si le classement doit rester,  le rendre privé (amis,  équipe choisie) plutôt que public par défaut.', 
        'Si les trois éléments doivent coexister pour une raison produit forte,  documenter explicitement la justification et prévoir une réévaluation après lancement avec des données réelles d’usage.', 
      ], 
    }, 
  }, 
  {
    id: 'synergy_streak_notifications_interruption_loss', 
    title: 'Rappels et série de jours couplés à une perte réelle', 
    message:
      'Rappel actif et série à maintenir,  couplés à une perte tangible en cas d’interruption : la pression au retour n’est plus seulement symbolique,  elle a une conséquence concrète,  ce qui renforce fortement la compulsion.', 
    recommendation:
      'Exiger une règle de reprise sans perte significative (voir Q18) avant de valider cette combinaison.', 
    level: 'critical', 
    sourceQuestionIds: ['Q12',  'Q16'], 
    matches: (answers) =>
      hasSelectedOption(answers,  'Q12',  'streak') &&
      hasSelectedOption(answers,  'Q12',  'notifications_reminders') &&
      hasSelectedOption(answers,  'Q16',  'interruption_changes_progress'), 
    deepDive: {
      mechanism:
        'Un rappel actif transforme une série en obligation permanente plutôt qu’en habitude choisie ; si l’interruption a en plus une conséquence réelle (perte de statut,  d’avantages),  l’utilisateur-rice ne revient plus par intérêt mais par crainte de la perte, le rappel devient alors une source de stress plutôt qu’un service.', 
      alternatives: [
        'Découpler le rappel de la menace de perte : notifier sans jamais mentionner ce qui serait perdu en cas d’absence.', 
        'Introduire un mécanisme de reprise sans pénalité (gel de série,  grâce de 24-48h) avant même de notifier.', 
        'Réduire la fréquence des rappels automatiquement si l’utilisateur-rice ne les ouvre pas plusieurs fois de suite,  plutôt que de les intensifier.', 
      ], 
    }, 
  }, 
  {
    id: 'synergy_health_impact_temporal_pressure', 
    title: 'Enjeu de santé et mécanique de pression temporelle', 
    message:
      'Dans un contexte à enjeu de santé ou de sécurité,  une mécanique de pression temporelle ou de dépendance n’a pas le même poids que dans un contexte de loisir : le même mécanisme devient nettement plus risqué.', 
    recommendation:
      'Reconsidérer en priorité toute mécanique de pression temporelle dans ce contexte ; privilégier des alternatives non compulsives.', 
    level: 'critical', 
    sourceQuestionIds: ['Q8',  'Q12'], 
    matches: (answers) =>
      hasSelectedOption(answers,  'Q8',  'health_safety_impact') &&
      hasAnySelectedOption(answers,  'Q12',  temporalPressureMechanicOptionIds), 
    deepDive: {
      mechanism:
        'Le même mécanisme (rappel,  série,  récompense imprévisible) a un poids éthique différent selon l’enjeu réel de l’action : dans un contexte de loisir,  il pousse à revenir sur une app de divertissement ; dans un contexte de santé,  il peut pousser quelqu’un à agir contre son propre rythme physiologique ou à culpabiliser en cas de pause nécessaire (ex. repos,  blessure,  fatigue).', 
      alternatives: [
        'Remplacer toute mécanique de pression temporelle par un simple rappel neutre,  sans conséquence en cas de non-usage.', 
        'Faire valider la mécanique par une personne experte du domaine concerné (santé,  sécurité) avant mise en production,  pas seulement par l’équipe produit.', 
        'Prévoir une option explicite de mise en pause du programme sans culpabilisation,  avec un message neutre plutôt qu’alarmiste.', 
      ], 
    }, 
  }, 
  {
    id: 'synergy_ranking_young_audience_visible', 
    title: 'Classement visible pour un public jeune', 
    message:
      'Comparaison sociale publique et visible,  appliquée à un public en développement : le risque de découragement ou de pression sociale est amplifié par rapport à un public adulte.', 
    recommendation:
      'Recommander un classement privé ou une comparaison à soi-même plutôt qu’aux autres pour ce public.', 
    level: 'high', 
    sourceQuestionIds: ['Q6',  'Q12',  'Q17'], 
    matches: (answers) =>
      hasSelectedOption(answers,  'Q12',  'ranking') &&
      hasSelectedOption(answers,  'Q6',  'young_audience') &&
      hasSelectedOption(answers,  'Q17',  'ranking_comparison'), 
    deepDive: {
      mechanism:
        'Le contrôle des impulsions et la régulation émotionnelle face à l’échec sont encore en développement chez un public jeune ou adolescent, un classement public amplifie donc un effet déjà problématique chez les adultes (pression de performance,  découragement) plutôt que de simplement le reproduire à l’identique.', 
      alternatives: [
        'Remplacer le classement public par une progression personnelle visible uniquement par l’utilisateur-rice.', 
        'Si une dimension sociale reste souhaitée,  la limiter à un groupe choisi (classe,  équipe) avec accord d’un-e adulte responsable si le contexte l’exige.', 
        'Éviter tout affichage de position basse ou de retard par rapport aux autres, préférer des retours orientés progrès personnel.', 
      ], 
    }, 
  }, 
]

export function getSynergyResults(answers: EvaluationAnswers): SynergyResult[] {
  return synergyRules
    .filter((rule) => rule.matches(answers))
    .map((rule) => ({
      id: rule.id, 
      title: rule.title, 
      message: rule.message, 
      recommendation: rule.recommendation, 
      level: rule.level, 
      sourceQuestionIds: rule.sourceQuestionIds, 
      deepDive: rule.deepDive, 
    }))
    .sort(sortSynergiesByLevel)
}

function sortSynergiesByLevel(first: SynergyResult,  second: SynergyResult): number {
  const levelWeight: Record<RiskLevel,  number> = {
    critical: 5, 
    high: 4, 
    moderate: 3, 
    low: 2, 
    none: 1, 
  }

  return levelWeight[second.level] - levelWeight[first.level]
}
