import type { TagDefinition } from '@/types'

export const tagDefinitions: TagDefinition[] = [
  {
    tag: 'cadrage_insuffisant',
    label: 'Cadrage insuffisant',
    description: `Certains éléments fondamentaux du projet ne sont pas encore assez définis pour permettre une évaluation éthique fiable de la gamification : l'objectif principal, le type de motivation recherché ou le public cible restent flous. Il est recommandé de clarifier ces points avant d'aller plus loin dans la conception.`,
  },
  {
    tag: 'public_vulnerable',
    label: 'Public vulnérable',
    description: `Le système s'adresse à un public susceptible d'être affecté de manière disproportionnée par les mécaniques de gamification : mineur·es, personnes en situation de fragilité psychologique, personnes exposées à des risques d'addiction.`,
  },
  {
    tag: 'dependance_risque',
    label: 'Risque de dépendance',
    description: `Les mécaniques envisagées peuvent créer des habitudes compulsives ou une dépendance à l'engagement : cycles de récompenses courts, streaks pénalisants, boucles de rétention agressives.`,
  },
  {
    tag: 'transparence_absente',
    label: 'Transparence insuffisante',
    description: `Les règles du système, les critères de récompense ou les objectifs de la plateforme ne sont pas clairement communiqués à l'utilisateur·rice.`,
  },
  {
    tag: 'autonomie_reduite',
    label: 'Autonomie réduite',
    description: `L'utilisateur·rice ne dispose pas d'un contrôle suffisant sur sa participation au système : impossibilité de désactiver des mécaniques, pénalités en cas d'inactivité, accès conditionnel à des fonctionnalités essentielles.`,
  },
  {
    tag: 'pression_temporelle',
    label: 'Pression temporelle',
    description: `Le système utilise des comptes à rebours, des offres limitées dans le temps ou des mécaniques d'urgence pour pousser l'utilisateur·rice à agir rapidement, parfois au détriment d'une décision réfléchie.`,
  },
  {
    tag: 'pression_sociale',
    label: 'Pression sociale',
    description: `Les mécaniques de comparaison, de classement ou d'exposition publique créent une pression sociale qui peut décourager, stigmatiser ou pousser à des comportements compétitifs non souhaitables.`,
  },
  {
    tag: 'motivation_extrinseque',
    label: 'Motivation extrinsèque dominante',
    description: `Le système repose principalement sur des récompenses externes (points, badges, cadeaux) plutôt que sur la valeur intrinsèque de l'activité, ce qui peut réduire la motivation naturelle à long terme.`,
  },
  {
    tag: 'consentement_flou',
    label: 'Consentement insuffisant',
    description: `L'utilisateur·rice n'a pas donné un consentement éclairé à la participation au système de gamification, ou les conditions de ce consentement sont formulées de manière ambiguë ou trompeuse.`,
  },
  {
    tag: 'progression_claire',
    label: 'Progression lisible',
    description: `Le système offre une progression transparente, cohérente et alignée avec des objectifs réels. L'utilisateur·rice comprend où il ou elle en est et ce qu'il ou elle doit faire pour progresser.`,
  },
  {
    tag: 'feedback_adequat',
    label: 'Feedback adapté',
    description: `Le système fournit des retours clairs, utiles et proportionnés aux actions de l'utilisateur·rice, sans exploiter les biais cognitifs ni créer d'anxiété artificielle.`,
  },
  {
    tag: 'objectif_aligne',
    label: 'Objectif aligné',
    description: `Les mécaniques de gamification sont cohérentes avec les objectifs réels de l'utilisateur·rice et ne servent pas uniquement les intérêts commerciaux de la plateforme.`,
  },
  {
    tag: 'contexte_sensible',
    label: 'Contexte sensible',
    description: `Le projet s'inscrit dans un contexte qui exige une vigilance éthique particulière : santé, éducation, finances personnelles, services publics, ou tout domaine où une mauvaise conception peut avoir des conséquences significatives.`,
  },
]