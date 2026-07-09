import type { Principe } from '@/types'

export const principles: Principe[] = [
  {
    slug: 'transparence',
    title: 'Transparence',
    shortDescription: `L'utilisateur-rice comprend clairement comment fonctionne le système de gamification et ce que ses actions impliquent.`,
    content: `La transparence est le fondement d'une gamification éthique. Elle signifie que les règles du système sont visibles, compréhensibles et accessibles à tout moment. L'utilisateur-rice sait pourquoi il ou elle reçoit des points, des badges ou des récompenses, et comprend les critères qui déterminent sa progression.

Un système opaque, où les règles sont cachées ou volontairement floues, crée une asymétrie d'information entre le concepteur et l'utilisateur-rice. Cette asymétrie peut mener à des comportements non souhaités, à de la méfiance ou à un sentiment de manipulation.

La transparence implique également d'être honnête sur les objectifs du système : s'agit-il d'aider l'utilisateur-rice à progresser, ou de maximiser son engagement au profit de la plateforme ? Ces deux objectifs ne sont pas toujours compatibles, et les dissimuler crée un risque éthique réel.`,
    examples: [
      'Afficher clairement les critères pour obtenir un badge ou monter de niveau.',
      `Expliquer pourquoi une fonctionnalité est verrouillée et comment la déverrouiller.`,
      `Indiquer explicitement à quoi servent les points accumulés et s'ils expirent.`,
      `Mentionner dans les conditions d'utilisation comment les données de progression sont utilisées.`,
    ],
    risks: [
      'Règles de progression cachées ou non documentées.',
      'Critères de récompense flous ou changeants sans notification.',
      `Objectifs du système non communiqués à l'utilisateur-rice.`,
      'Mécaniques conçues pour créer de la confusion intentionnelle.',
    ],
    relatedTags: ['transparence_absente', 'consentement_flou'],
  },
  {
    slug: 'autonomie',
    title: 'Autonomie',
    shortDescription: `L'utilisateur-rice conserve le contrôle de ses choix et n'est pas contraint-e de participer au système de gamification.`,
    content: `L'autonomie désigne la capacité de l'utilisateur-rice à faire des choix libres et éclairés au sein d'une expérience gamifiée. Un système respectueux de l'autonomie permet de participer ou non, d'ajuster ses préférences, et de quitter le système sans pénalité excessive.

Lorsque la gamification réduit l'autonomie, elle peut basculer vers la manipulation. C'est le cas quand des mécaniques de pression — streaks à maintenir, pénalités en cas d'absence, accès conditionnel — forcent l'utilisateur-rice à s'engager même contre sa volonté initiale.

Respecter l'autonomie, c'est aussi permettre à l'utilisateur-rice de comprendre et de contester les décisions du système. Il ou elle doit pouvoir désactiver les notifications, réinitialiser sa progression ou exporter ses données sans friction excessive.`,
    examples: [
      `Permettre de désactiver les éléments de gamification sans perdre l'accès au service.`,
      `Proposer une option pour ignorer les classements ou masquer sa progression.`,
      `Ne pas conditionner l'accès à des fonctionnalités essentielles à la participation au système de points.`,
      `Offrir la possibilité de supprimer son historique de progression.`,
    ],
    risks: [
      `Streaks ou séries qui pénalisent l'absence et créent une obligation implicite.`,
      `Accès à des fonctionnalités clés conditionné à l'accumulation de points.`,
      `Impossibilité de désactiver les éléments de gamification.`,
      `Pression exercée par des notifications répétées en cas d'inactivité.`,
    ],
    relatedTags: ['autonomie_reduite', 'dependance_risque', 'pression_temporelle'],
  },
  {
    slug: 'progression',
    title: 'Progression',
    shortDescription: `Le système offre une progression lisible, cohérente et alignée avec les objectifs réels de l'utilisateur-rice.`,
    content: `La progression est l'une des mécaniques les plus puissantes de la gamification. Elle répond à un besoin psychologique fondamental : percevoir qu'on avance, qu'on maîtrise quelque chose, qu'on s'améliore. Lorsqu'elle est bien conçue, elle motive sans manipuler.

Une progression éthique est transparente dans ses règles, réaliste dans ses objectifs et alignée avec ce que l'utilisateur-rice cherche réellement à accomplir. Elle ne doit pas servir uniquement à maintenir l'engagement pour des raisons commerciales, mais refléter une progression réelle dans les compétences ou les objectifs de l'utilisateur-rice.

Le risque principal est de créer une progression artificielle : des niveaux qui ne correspondent à aucune compétence acquise, des barres de progression qui avancent lentement pour créer de la frustration, ou des paliers conçus pour pousser à l'achat.`,
    examples: [
      `Barres de progression qui reflètent une compétence réelle acquise.`,
      `Niveaux associés à des responsabilités ou des accès supplémentaires concrets.`,
      `Résumés de progression réguliers qui montrent ce que l'utilisateur-rice a accompli.`,
      'Objectifs décomposés en étapes claires et atteignables.',
    ],
    risks: [
      'Niveaux artificiels sans contenu ni valeur ajoutée réelle.',
      `Barres de progression conçues pour ralentir juste avant un palier.`,
      `Progression liée à des achats plutôt qu'à des actions significatives.`,
      `Perte de progression en cas d'inactivité, créant une pression injustifiée.`,
    ],
    relatedTags: ['progression_claire', 'motivation_extrinseque', 'autonomie_reduite'],
  },
  {
    slug: 'feedback',
    title: 'Feedback',
    shortDescription: `Le système fournit des retours clairs, utiles et honnêtes sur les actions de l'utilisateur-rice.`,
    content: `Le feedback est la réponse du système aux actions de l'utilisateur-rice. Il peut prendre de nombreuses formes : une animation de validation, un score mis à jour, un message d'encouragement, une alerte d'erreur. Dans une gamification éthique, le feedback est précis, utile et honnête.

Un bon feedback aide l'utilisateur-rice à comprendre ce qu'il ou elle a fait, pourquoi c'est pertinent, et comment progresser. Un mauvais feedback exploite les biais cognitifs : faux sentiments d'urgence, célébrations excessives pour des actions banales, ou feedbacks négatifs conçus pour provoquer de l'anxiété.

Le feedback doit également respecter le rythme de l'utilisateur-rice. Des notifications trop fréquentes, des sons ou animations intrusifs, ou des rappels culpabilisants en cas d'inactivité transforment un outil utile en source de stress.`,
    examples: [
      `Message clair indiquant ce qui a été accompli et pourquoi c'est utile.`,
      `Animation de validation sobre et accessible (compatible avec les préférences de mouvement réduit).`,
      'Résumé hebdomadaire factuel sans jugement de valeur excessif.',
      `Feedback d'erreur constructif qui explique comment corriger l'action.`,
    ],
    risks: [
      'Célébrations excessives pour des actions triviales qui banalisent le feedback positif.',
      `Notifications culpabilisantes en cas d'inactivité.`,
      `Sons ou animations qui ne respectent pas les préférences d'accessibilité.`,
      `Feedbacks conçus pour créer de l'anxiété plutôt que de la motivation.`,
    ],
    relatedTags: ['feedback_adequat', 'pression_temporelle', 'autonomie_reduite'],
  },
  {
    slug: 'recompenses',
    title: 'Récompenses et motivation',
    shortDescription: `Les récompenses soutiennent la motivation intrinsèque sans créer de dépendance ni dévaluer l'engagement authentique.`,
    content: `Les récompenses sont au cœur de la gamification. Elles peuvent renforcer des comportements positifs, reconnaître l'effort et encourager la progression. Mais leur conception a un impact direct sur la qualité de la motivation qu'elles génèrent.

La psychologie de la motivation distingue deux grandes catégories : la motivation intrinsèque (faire quelque chose pour le plaisir ou la satisfaction que ça procure) et la motivation extrinsèque (faire quelque chose pour obtenir une récompense externe). Une gamification éthique cherche à soutenir la motivation intrinsèque plutôt qu'à la remplacer par des récompenses externes.

Le risque majeur est l'effet de surjustification : lorsque des récompenses externes sont introduites pour une activité que l'utilisateur-rice faisait déjà avec plaisir, elles peuvent à terme réduire sa motivation intrinsèque. Par ailleurs, des récompenses conçues pour créer de la dépendance — récompenses aléatoires, cycles de récompenses courts — posent des questions éthiques sérieuses.`,
    examples: [
      `Badges qui reconnaissent une compétence acquise plutôt qu'une simple fréquence d'utilisation.`,
      `Récompenses qui offrent une valeur réelle et alignée avec les objectifs de l'utilisateur-rice.`,
      `Système de points transparent sur leur valeur et leur durée de validité.`,
      'Récompenses non monétaires centrées sur la reconnaissance et la progression.',
    ],
    risks: [
      'Récompenses aléatoires (loot boxes) qui exploitent les mécanismes du jeu de hasard.',
      'Cycles de récompenses courts conçus pour créer des habitudes compulsives.',
      `Dévaluation des récompenses dans le temps pour pousser à plus d'engagement.`,
      `Récompenses exclusivement extrinsèques qui supplantent la motivation naturelle.`,
    ],
    relatedTags: ['motivation_extrinseque', 'dependance_risque', 'transparence_absente'],
  },
  {
    slug: 'comparaison-sociale',
    title: 'Comparaison sociale',
    shortDescription: `Les mécaniques de classement et de comparaison sont conçues pour encourager sans exclure ni stigmatiser.`,
    content: `La comparaison sociale est une mécanique puissante : voir où on se situe par rapport à d'autres peut motiver à progresser. Mais elle comporte des risques importants si elle n'est pas conçue avec soin.

Un classement éthique prend en compte la diversité des profils, des contextes et des objectifs. Il ne devrait pas opposer des utilisateur-rices dont les conditions de départ sont très différentes, ni créer un sentiment d'exclusion ou d'infériorité durable.

Les mécaniques de comparaison sociale peuvent aussi déclencher des comportements contre-productifs : compétition malsaine, triche, abandon des utilisateur-rices qui se sentent trop loin des premiers rangs. Une conception éthique privilégie la comparaison à soi-même, les groupes de niveau similaire, ou les classements optionnels.`,
    examples: [
      `Classements limités à des pairs de niveau similaire plutôt qu'un classement global.`,
      'Option pour masquer son rang ou quitter un classement.',
      'Mise en avant des progrès personnels plutôt que du rang absolu.',
      'Classements temporaires et renouvelés régulièrement pour éviter la fossilisation.',
    ],
    risks: [
      `Classements globaux qui découragent les utilisateur-rices en bas du tableau.`,
      `Mécaniques conçues pour provoquer de la jalousie ou de la compétition agressive.`,
      'Exposition publique de la progression sans consentement explicite.',
      `Stigmatisation des utilisateur-rices peu actifs ou moins performants.`,
    ],
    relatedTags: ['pression_sociale', 'autonomie_reduite', 'public_vulnerable'],
  },
  {
    slug: 'rarete-urgence',
    title: 'Rareté et urgence',
    shortDescription: `Les mécaniques de rareté et d'urgence sont utilisées avec modération et ne créent pas de pression artificielle ou de peur de manquer.`,
    content: `La rareté et l'urgence sont des leviers psychologiques efficaces : un objet rare semble plus désirable, une offre limitée dans le temps pousse à agir rapidement. Dans la gamification, ces mécaniques se traduisent par des événements éphémères, des récompenses en édition limitée, des comptes à rebours.

Utilisées de manière éthique, elles peuvent créer de l'enthousiasme et rythmer l'expérience. Utilisées de manière abusive, elles exploitent la peur de manquer (FOMO — Fear Of Missing Out) et poussent les utilisateur-rices à des décisions précipitées, parfois contre leurs propres intérêts.

Le principe éthique clé est la proportionnalité : la pression créée par la rareté ou l'urgence doit être proportionnelle à l'enjeu réel. Créer de l'urgence autour d'un contenu non essentiel, ou simuler une rareté artificielle, constitue une manipulation.`,
    examples: [
      `Événements saisonniers clairement délimités avec des enjeux non essentiels.`,
      `Récompenses limitées dont la rareté est justifiée par le contexte (célébration, anniversaire).`,
      `Comptes à rebours utilisés pour structurer une activité pédagogique, pas pour presser un achat.`,
      `Communication claire sur la fin d'un événement sans dramatisation excessive.`,
    ],
    risks: [
      `Comptes à rebours artificiels qui se réinitialisent ou ne correspondent à aucune contrainte réelle.`,
      'Rareté simulée sur des ressources numériques illimitées.',
      `Exploitation du FOMO pour pousser à des achats ou des inscriptions non planifiés.`,
      `Urgence créée autour de décisions importantes qui mériteraient réflexion.`,
    ],
    relatedTags: ['pression_temporelle', 'consentement_flou', 'contexte_sensible'],
  },
  {
    slug: 'choix-contraint',
    title: 'Choix contraint',
    shortDescription: `Les choix proposés à l'utilisateur-rice sont réels, équilibrés et ne masquent pas une option par défaut avantageuse pour la plateforme.`,
    content: `Le choix contraint désigne les situations où l'utilisateur-rice est placé-e face à des options qui semblent libres, mais dont l'architecture favorise systématiquement un comportement précis — généralement celui qui bénéficie à la plateforme plutôt qu'à l'utilisateur-rice.

Dans la gamification, cela peut prendre la forme de dark patterns : une option présentée en vert lumineux contre une option en gris discret, un bouton "Continuer" bien visible contre un lien "Non merci" quasi invisible, ou une progression qui ne peut avancer qu'en acceptant des notifications.

Une conception éthique du choix signifie que toutes les options sont présentées de manière équitable, que le refus est aussi accessible que l'acceptation, et que l'utilisateur-rice comprend réellement les conséquences de chaque choix avant de le faire.`,
    examples: [
      `Boutons d'acceptation et de refus présentés avec le même niveau de visibilité.`,
      `Option de désactivation des notifications accessible sans friction excessive.`,
      'Choix présentés avec une explication claire des conséquences de chaque option.',
      `Absence de nudges visuels qui orientent systématiquement vers l'option avantageuse pour la plateforme.`,
    ],
    risks: [
      'Dark patterns visuels qui hiérarchisent les options de manière trompeuse.',
      'Conséquences du refus non communiquées ou minimisées.',
      `Progressions bloquées à moins d'accepter des conditions supplémentaires.`,
      `Faux choix où toutes les options mènent au même résultat souhaité par la plateforme.`,
    ],
    relatedTags: ['autonomie_reduite', 'consentement_flou', 'transparence_absente'],
  },
]