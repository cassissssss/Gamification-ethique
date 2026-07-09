import type { VerdictDefinition } from '@/types'

export const verdicts: VerdictDefinition[] = [
  {
    level: 'retour_cadrage',
    label: 'Retour au cadrage',
    description: `Les informations disponibles ne permettent pas d'évaluer la pertinence éthique du projet. Des questions fondamentales restent sans réponse : qui est le public cible, quel est l'objectif réel du système, dans quel contexte sera-t-il utilisé ? Il est recommandé de clarifier ces éléments avant d'aller plus loin.`,
    tone: 'neutral',
  },
  {
    level: 'gamification_deconseillee',
    label: 'Gamification déconseillée',
    description: `Les mécaniques envisagées présentent des risques éthiques sérieux dans ce contexte. Le projet combine plusieurs facteurs défavorables : public vulnérable, mécaniques coercitives, transparence insuffisante ou risques de dépendance. Une refonte en profondeur de l'approche est recommandée avant toute mise en production.`,
    tone: 'danger',
  },
  {
    level: 'gamification_legere',
    label: 'Gamification légère recommandée',
    description: `Le contexte permet une gamification limitée, centrée sur des mécaniques simples et non coercitives. Les éléments de progression, de feedback ou de reconnaissance peuvent être utiles, à condition de rester discrets, optionnels et transparents. Évitez les mécaniques de pression ou de compétition.`,
    tone: 'info',
  },
  {
    level: 'gamification_sous_conditions',
    label: 'Gamification envisageable sous conditions',
    description: `Le projet peut intégrer des mécaniques de gamification, mais plusieurs points de vigilance ont été identifiés. Des ajustements sont nécessaires pour garantir le respect de l'autonomie, la transparence du système et l'alignement avec les objectifs réels des utilisateur-rices. Un test utilisateur est fortement recommandé.`,
    tone: 'warning',
  },
  {
    level: 'gamification_pertinente',
    label: 'Gamification pertinente',
    description: `Le contexte est favorable à une gamification bien conçue. Les objectifs sont clairs, le public est adapté et les mécaniques envisagées semblent alignées avec les besoins réels des utilisateur-rices. Veillez à maintenir cette cohérence tout au long de la conception et à tester les hypothèses avec de vraies personnes.`,
    tone: 'positive',
  },
]