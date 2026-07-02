import type { Recommendation } from '@/types'

export const recommendations: Recommendation[] = [
  // ─── cadrage_insuffisant ────────────────────────────────────────────────────
  {
    id: 'rec_cadrage_01',
    tag: 'cadrage_insuffisant',
    priority: 'haute',
    title: `Clarifier le cadrage avant d'évaluer la gamification`,
    description: `Certains éléments fondamentaux du projet ne sont pas encore suffisamment définis pour évaluer correctement la pertinence d'une gamification. L'objectif principal, le public cible, le contexte d'utilisation ou le type de motivation recherché doivent être clarifiés en priorité. Tant que ces bases ne sont pas posées, les mécaniques envisagées risquent d'être inadaptées, voire contre-productives. Commencez par aligner l'équipe sur ces questions avant d'avancer dans la conception.`,
    principleSlug: 'transparence',
  },

  // ─── public_vulnerable ──────────────────────────────────────────────────────
  {
    id: 'rec_public_vulnerable_01',
    tag: 'public_vulnerable',
    priority: 'haute',
    title: `Adapter les mécaniques au profil du public`,
    description: `Votre public inclut des personnes potentiellement vulnérables. Les mécaniques de compétition, de pression temporelle ou de récompenses aléatoires peuvent avoir un impact disproportionné sur ce type de public. Privilégiez des mécaniques douces, optionnelles et centrées sur la progression personnelle plutôt que sur la comparaison.`,
    principleSlug: 'comparaison-sociale',
  },
  {
    id: 'rec_public_vulnerable_02',
    tag: 'public_vulnerable',
    priority: 'haute',
    title: `Prévoir des garde-fous spécifiques`,
    description: `En présence d'un public vulnérable, des mesures de protection supplémentaires sont nécessaires : limites d'utilisation, messages d'information, accès facilité à une aide humaine. Documentez ces mesures dans votre analyse de risque.`,
    principleSlug: 'autonomie',
  },

  // ─── dependance_risque ──────────────────────────────────────────────────────
  {
    id: 'rec_dependance_01',
    tag: 'dependance_risque',
    priority: 'haute',
    title: `Évaluer le risque de boucles compulsives`,
    description: `Les mécaniques envisagées (streaks, récompenses aléatoires, cycles courts) peuvent créer des habitudes compulsives. Avant de les intégrer, évaluez si elles servent réellement l'utilisateur·rice ou uniquement les métriques d'engagement de la plateforme.`,
    principleSlug: 'recompenses',
  },
  {
    id: 'rec_dependance_02',
    tag: 'dependance_risque',
    priority: 'moyenne',
    title: `Éviter les pénalités en cas d'inactivité`,
    description: `Les systèmes qui punissent l'absence (perte de streak, dégradation du statut, accès restreint) créent une forme de pression qui peut devenir coercitive. Préférez des systèmes qui récompensent l'activité sans pénaliser l'inactivité.`,
    principleSlug: 'autonomie',
  },

  // ─── transparence_absente ───────────────────────────────────────────────────
  {
    id: 'rec_transparence_01',
    tag: 'transparence_absente',
    priority: 'haute',
    title: `Documenter et communiquer les règles du système`,
    description: `Les utilisateur·rices doivent pouvoir comprendre comment fonctionne le système : comment les points sont attribués, quels comportements sont récompensés et pourquoi. Prévoyez une page d'aide ou un onboarding qui explique les règles de manière claire et accessible.`,
    principleSlug: 'transparence',
  },
  {
    id: 'rec_transparence_02',
    tag: 'transparence_absente',
    priority: 'moyenne',
    title: `Rendre les critères de récompense visibles`,
    description: `Si les utilisateur·rices ne comprennent pas pourquoi ils ou elles reçoivent (ou ne reçoivent pas) une récompense, la confiance dans le système s'érode. Affichez les critères de manière proactive, pas seulement dans une FAQ.`,
    principleSlug: 'transparence',
  },

  // ─── autonomie_reduite ──────────────────────────────────────────────────────
  {
    id: 'rec_autonomie_01',
    tag: 'autonomie_reduite',
    priority: 'haute',
    title: `Permettre de désactiver les mécaniques de gamification`,
    description: `La participation au système de gamification ne devrait pas être une condition d'accès au service principal. Proposez une option claire pour désactiver les éléments de gamification sans pénalité ni friction excessive.`,
    principleSlug: 'autonomie',
  },
  {
    id: 'rec_autonomie_02',
    tag: 'autonomie_reduite',
    priority: 'moyenne',
    title: `Revoir les conditions d'accès aux fonctionnalités`,
    description: `Si des fonctionnalités essentielles sont conditionnées à l'accumulation de points ou à la participation au système, cela réduit l'autonomie de l'utilisateur·rice. Distinguez clairement ce qui relève du service de base et ce qui relève de la gamification optionnelle.`,
    principleSlug: 'choix-contraint',
  },

  // ─── pression_temporelle ────────────────────────────────────────────────────
  {
    id: 'rec_pression_temporelle_01',
    tag: 'pression_temporelle',
    priority: 'moyenne',
    title: `Justifier chaque mécanique d'urgence`,
    description: `Les comptes à rebours et les offres limitées dans le temps doivent correspondre à une contrainte réelle, pas à une simulation d'urgence. Avant d'intégrer ce type de mécanique, vérifiez qu'elle est proportionnelle à l'enjeu et qu'elle n'exploite pas la peur de manquer.`,
    principleSlug: 'rarete-urgence',
  },
  {
    id: 'rec_pression_temporelle_02',
    tag: 'pression_temporelle',
    priority: 'basse',
    title: `Tester l'impact émotionnel des mécaniques temporelles`,
    description: `Les mécaniques de pression temporelle peuvent générer du stress ou de l'anxiété, en particulier chez les utilisateur·rices régulier·ères. Prévoyez des tests utilisateurs spécifiques pour évaluer cet impact avant la mise en production.`,
    principleSlug: 'feedback',
  },

  // ─── pression_sociale ───────────────────────────────────────────────────────
  {
    id: 'rec_pression_sociale_01',
    tag: 'pression_sociale',
    priority: 'moyenne',
    title: `Rendre les classements optionnels`,
    description: `Les classements publics peuvent décourager les utilisateur·rices qui se trouvent en bas du tableau. Proposez une option pour masquer son rang ou se comparer uniquement à des pairs de niveau similaire.`,
    principleSlug: 'comparaison-sociale',
  },
  {
    id: 'rec_pression_sociale_02',
    tag: 'pression_sociale',
    priority: 'moyenne',
    title: `Obtenir le consentement avant toute exposition publique`,
    description: `Exposer la progression d'un·e utilisateur·rice sans son accord explicite constitue une violation de son autonomie. Assurez-vous que chaque forme de partage ou d'exposition publique est opt-in, pas opt-out.`,
    principleSlug: 'comparaison-sociale',
  },

  // ─── motivation_extrinseque ─────────────────────────────────────────────────
  {
    id: 'rec_motivation_01',
    tag: 'motivation_extrinseque',
    priority: 'moyenne',
    title: `Équilibrer récompenses externes et valeur intrinsèque`,
    description: `Un système basé uniquement sur des récompenses externes (points, badges, cadeaux) risque de supplanter la motivation naturelle des utilisateur·rices. Assurez-vous que les mécaniques renforcent l'intérêt pour l'activité elle-même, plutôt que de le remplacer.`,
    principleSlug: 'recompenses',
  },
  {
    id: 'rec_motivation_02',
    tag: 'motivation_extrinseque',
    priority: 'basse',
    title: `Anticiper l'effet de surjustification`,
    description: `Introduire des récompenses externes pour une activité que les utilisateur·rices faisaient déjà avec plaisir peut, à terme, réduire leur motivation intrinsèque. Évaluez si la gamification ajoute de la valeur ou si elle risque de nuire à l'engagement authentique sur le long terme.`,
    principleSlug: 'recompenses',
  },

  // ─── consentement_flou ──────────────────────────────────────────────────────
  {
    id: 'rec_consentement_01',
    tag: 'consentement_flou',
    priority: 'haute',
    title: `Clarifier les conditions de participation au système`,
    description: `Les utilisateur·rices doivent savoir qu'ils ou elles participent à un système de gamification, ce que cela implique pour leurs données et leur expérience. Intégrez une explication claire lors de l'onboarding et rendez les conditions facilement accessibles.`,
    principleSlug: 'transparence',
  },
  {
    id: 'rec_consentement_02',
    tag: 'consentement_flou',
    priority: 'haute',
    title: `Revoir l'architecture des choix proposés`,
    description: `Si les options présentées à l'utilisateur·rice sont déséquilibrées visuellement ou si le refus est plus difficile d'accès que l'acceptation, il s'agit d'un dark pattern. Vérifiez que toutes les options sont présentées de manière équitable.`,
    principleSlug: 'choix-contraint',
  },

  // ─── progression_claire ─────────────────────────────────────────────────────
  {
    id: 'rec_progression_01',
    tag: 'progression_claire',
    priority: 'basse',
    title: `Maintenir la cohérence de la progression tout au long du projet`,
    description: `Une progression lisible est un atout éthique et UX. Veillez à ce que les règles de progression restent stables dans le temps et que toute modification soit communiquée clairement aux utilisateur·rices existant·es.`,
    principleSlug: 'progression',
  },

  // ─── feedback_adequat ───────────────────────────────────────────────────────
  {
    id: 'rec_feedback_01',
    tag: 'feedback_adequat',
    priority: 'basse',
    title: `Calibrer l'intensité des feedbacks`,
    description: `Un feedback bien calibré renforce la motivation sans créer de dépendance à la validation externe. Évitez les célébrations excessives pour des actions banales, et assurez-vous que les feedbacks négatifs restent constructifs et non culpabilisants.`,
    principleSlug: 'feedback',
  },

  // ─── objectif_aligne ────────────────────────────────────────────────────────
  {
    id: 'rec_objectif_01',
    tag: 'objectif_aligne',
    priority: 'basse',
    title: `Documenter l'alignement entre objectifs business et objectifs utilisateur`,
    description: `Un système de gamification éthique sert à la fois les objectifs de la plateforme et ceux des utilisateur·rices. Documentez cet alignement et vérifiez-le régulièrement, en particulier lors de l'ajout de nouvelles mécaniques.`,
    principleSlug: 'transparence',
  },

  // ─── contexte_sensible ──────────────────────────────────────────────────────
  {
    id: 'rec_contexte_01',
    tag: 'contexte_sensible',
    priority: 'haute',
    title: `Renforcer l'analyse éthique en raison du contexte`,
    description: `Votre projet s'inscrit dans un domaine sensible (santé, éducation, finance, RH). Dans ces contextes, les erreurs de conception ont des conséquences potentiellement significatives sur les personnes. Une revue éthique approfondie, idéalement par une personne externe à l'équipe, est fortement recommandée.`,
    principleSlug: 'transparence',
  },
  {
    id: 'rec_contexte_02',
    tag: 'contexte_sensible',
    priority: 'moyenne',
    title: `Vérifier la conformité réglementaire`,
    description: `Selon le domaine et le public, des réglementations spécifiques peuvent s'appliquer (RGPD, réglementation sur les jeux d'argent, protection des mineurs, etc.). Consultez un·e expert·e juridique avant la mise en production.`,
    principleSlug: 'autonomie',
  },
]