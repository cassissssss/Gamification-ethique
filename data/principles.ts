import type { Principe } from '@/types/principle'

export const principles: Principe[] = [
  {
    slug: 'transparence',
    title: 'Transparence',

    shortDescription:
      "Le fonctionnement de la gamification est explicite et compréhensible afin que les utilisateurs puissent prendre des décisions éclairées.",

    whenToUse:
      "Ce principe s'applique dès qu'un système attribue des points, badges, niveaux ou toute autre forme de récompense ou de progression visible par l'utilisateur.",

    why: `La transparence est essentielle pour instaurer une relation de confiance entre le système et ses utilisateurs. Une personne doit pouvoir comprendre pourquoi certaines récompenses sont obtenues, comment sa progression est calculée et quelles sont les conséquences de ses actions. Sans cette compréhension, il devient difficile d'exercer un choix réellement libre et éclairé.`,

    content: `Une gamification transparente rend visibles les règles qui structurent l'expérience sans pour autant dévoiler l'ensemble de son fonctionnement technique. Les critères d'attribution des points, des badges ou des niveaux doivent être cohérents, accessibles et suffisamment explicites pour permettre aux utilisateurs d'anticiper les effets de leurs actions.

À l'inverse, des règles volontairement ambiguës, des récompenses attribuées sans explication ou des changements non communiqués peuvent créer un sentiment d'injustice et diminuer la confiance envers le système. Cette asymétrie d'information favorise également des formes de manipulation où l'utilisateur adopte certains comportements sans réellement comprendre ce qui les motive.

Une conception transparente permet ainsi d'établir une relation plus équilibrée entre les objectifs du concepteur et ceux de l'utilisateur, tout en renforçant la compréhension, la confiance et la perception d'équité.`,

    impact:
      "Un manque de transparence érode la confiance, génère un sentiment d'injustice et peut être perçu comme une forme de manipulation, ce qui nuit à l'engagement à long terme et à la réputation du produit.",

    relatedMechanics: ['points', 'badges', 'levels', 'rewards', 'progress'],

    takeaways: [
      "Les règles de fonctionnement doivent être compréhensibles.",
      "Les critères de progression doivent être clairement expliqués.",
      "Les changements de fonctionnement doivent être communiqués.",
      "L'utilisateur doit comprendre pourquoi une récompense est attribuée."
    ],

    goodPractices: [
      "Afficher les critères permettant d'obtenir un badge, un niveau ou une récompense.",
      "Expliquer pourquoi une récompense ou une pénalité est appliquée.",
      "Informer les utilisateurs lorsqu'une règle de progression évolue.",
      "Présenter clairement la finalité des points, badges ou niveaux.",
      "Expliquer l'utilisation des données liées à la progression."
    ],

    avoid: [
      "Masquer les critères d'attribution des récompenses.",
      "Modifier les règles sans prévenir les utilisateurs.",
      "Attribuer des récompenses sans justification compréhensible.",
      "Créer volontairement une ambiguïté sur le fonctionnement du système.",
      "Dissimuler les objectifs poursuivis par la gamification."
    ],

    evaluationQuestion:
      "Les utilisateurs comprennent-ils clairement comment ils progressent et pourquoi ils reçoivent une récompense ?",

    references: [
      {
        title: "The Design of Everyday Things",
        authors: "Donald A. Norman",
        year: 2013
      },
      {
        title: "10 Usability Heuristics for User Interface Design",
        authors: "Jakob Nielsen",
        year: 2020,
        url: "https://www.nngroup.com/articles/ten-usability-heuristics/"
      },
      {
        title: "Gamification by Design",
        authors: "Gabe Zichermann & Christopher Cunningham",
        year: 2011
      }
    ],

    relatedTags: [
      "transparence_absente",
      "consentement_flou"
    ]
  },
  {
    slug: 'autonomie',
    title: 'Autonomie',

    shortDescription:
      "L'utilisateur conserve la liberté de choisir son niveau de participation et garde le contrôle sur son expérience.",

    whenToUse:
      "Ce principe s'applique dès qu'un mécanisme peut créer une pression à agir : séries quotidiennes, notifications répétées, pénalités liées à l'inactivité ou accès conditionné à des fonctionnalités.",

    why: `L'autonomie est un besoin psychologique fondamental identifié par la théorie de l'autodétermination. Une gamification éthique doit soutenir ce besoin en laissant aux utilisateurs la possibilité de décider comment, quand et dans quelle mesure ils souhaitent interagir avec les mécaniques proposées. Lorsque cette liberté disparaît, la motivation peut progressivement laisser place à un sentiment de contrainte ou de manipulation.`,

    content: `Les mécaniques de gamification ne devraient jamais imposer un comportement contre la volonté de l'utilisateur. Celui-ci doit pouvoir participer librement, ignorer certaines fonctionnalités ou quitter le système sans subir de conséquences disproportionnées. Les récompenses, les défis ou les notifications doivent encourager l'engagement sans devenir indispensables à l'utilisation du service.

Certaines mécaniques réduisent progressivement cette autonomie. Les séries quotidiennes (streaks), les pénalités liées à l'inactivité ou l'accès conditionné à des fonctionnalités importantes peuvent créer une pression implicite qui pousse les utilisateurs à agir davantage par obligation que par choix.

Préserver l'autonomie consiste à offrir un véritable contrôle sur l'expérience : désactiver certaines fonctionnalités, personnaliser les notifications ou interrompre sa participation sans perdre l'accès aux fonctionnalités essentielles. La gamification devient alors un soutien aux objectifs de l'utilisateur plutôt qu'un moyen d'orienter artificiellement son comportement.`,

    impact:
      "Une autonomie réduite favorise un engagement subi plutôt que choisi, ce qui augmente le risque de dépendance, de fatigue et d'abandon brutal une fois la contrainte perçue comme trop forte.",

    relatedMechanics: ['streaks', 'notifications', 'challenges', 'missions'],

    takeaways: [
      "La participation doit toujours rester volontaire.",
      "Les utilisateurs doivent pouvoir personnaliser leur expérience.",
      "Quitter la gamification ne devrait pas pénaliser l'accès au service.",
      "Les mécaniques doivent encourager sans contraindre."
    ],

    goodPractices: [
      "Permettre de désactiver les éléments de gamification.",
      "Laisser l'utilisateur gérer la fréquence des notifications.",
      "Rendre les classements, défis ou récompenses optionnels lorsque cela est possible.",
      "Garantir l'accès aux fonctionnalités essentielles indépendamment de la progression.",
      "Permettre de réinitialiser ou supprimer son historique de progression."
    ],

    avoid: [
      "Imposer la participation pour accéder à des fonctionnalités importantes.",
      "Créer des pénalités importantes en cas d'inactivité.",
      "Multiplier les notifications culpabilisantes ou insistantes.",
      "Empêcher l'utilisateur de désactiver les mécaniques de gamification.",
      "Utiliser des mécaniques qui rendent difficile l'abandon du système."
    ],

    evaluationQuestion:
      "Les utilisateurs peuvent-ils désactiver, ignorer ou quitter les mécaniques proposées sans subir de conséquence disproportionnée ?",

    references: [
      {
        title: "Self-Determination Theory: Basic Psychological Needs in Motivation, Development, and Wellness",
        authors: "Edward L. Deci & Richard M. Ryan",
        year: 2017
      },
      {
        title: "Intrinsic Motivation and Self-Determination in Human Behavior",
        authors: "Edward L. Deci & Richard M. Ryan",
        year: 1985
      },
      {
        title: "From Game Design Elements to Gamefulness: Defining Gamification",
        authors: "Sebastian Deterding et al.",
        year: 2011
      }
    ],

    relatedTags: [
      "autonomie_reduite",
      "dependance_risque",
      "pression_temporelle"
    ]
  },
  {
    slug: 'progression',
    title: 'Progression',

    shortDescription:
      "La progression reflète des avancées réelles et aide l'utilisateur à atteindre ses objectifs sans créer de frustration artificielle.",

    whenToUse:
      "Ce principe s'applique à toute mécanique de niveaux, de barres de progression ou d'objectifs intermédiaires censés représenter l'évolution de l'utilisateur.",

    why: `Le sentiment de progresser constitue l'un des principaux moteurs de motivation dans une expérience gamifiée. Lorsqu'une personne perçoit que ses efforts produisent des résultats concrets, elle développe un sentiment de compétence qui favorise son engagement. À l'inverse, une progression artificielle ou incohérente peut générer de la frustration, diminuer la confiance dans le système et détourner l'attention des objectifs réellement poursuivis.`,

    content: `Une progression éthique traduit fidèlement l'évolution de l'utilisateur dans son parcours. Les niveaux, barres de progression ou objectifs intermédiaires doivent représenter des accomplissements significatifs et non uniquement prolonger artificiellement l'utilisation du service.

Chaque étape doit être compréhensible, atteignable et cohérente avec les compétences ou les objectifs développés. Une progression qui ralentit volontairement, impose des obstacles injustifiés ou récompense davantage la fréquence d'utilisation que les véritables progrès risque de transformer une expérience motivante en mécanique de rétention.

Une conception responsable cherche avant tout à accompagner les utilisateurs dans leur évolution en leur donnant des repères clairs, des objectifs réalistes et une vision concrète du chemin parcouru.`,

    impact:
      "Une progression artificielle ou ralentie volontairement provoque de la frustration, donne l'impression d'être manipulé et pousse les utilisateurs à abandonner ou à contourner le système.",

    relatedMechanics: ['levels', 'progress', 'missions', 'points'],

    takeaways: [
      "La progression doit refléter des accomplissements réels.",
      "Chaque étape doit avoir une utilité et une signification.",
      "Les objectifs doivent être atteignables et compréhensibles.",
      "La progression doit soutenir les objectifs de l'utilisateur plutôt que ceux de la plateforme."
    ],

    goodPractices: [
      "Décomposer les objectifs complexes en étapes progressives.",
      "Afficher clairement les prochaines étapes à atteindre.",
      "Associer chaque niveau à une évolution ou une compétence identifiable.",
      "Fournir des indicateurs de progression fidèles aux efforts réalisés.",
      "Permettre aux utilisateurs de consulter leur historique de progression."
    ],

    avoid: [
      "Créer des niveaux qui n'apportent aucune valeur réelle.",
      "Ralentir artificiellement la progression pour prolonger l'engagement.",
      "Conditionner la progression à des achats ou à des actions sans lien avec l'objectif.",
      "Supprimer ou faire régresser les progrès sans justification.",
      "Multiplier les étapes uniquement pour donner une illusion d'avancement."
    ],

    evaluationQuestion:
      "La progression proposée correspond-elle à des accomplissements réels et atteignables plutôt qu'à une simple prolongation artificielle de l'usage ?",

    references: [
      {
        title: "Self-Determination Theory: Basic Psychological Needs in Motivation, Development, and Wellness",
        authors: "Edward L. Deci & Richard M. Ryan",
        year: 2017
      },
      {
        title: "Drive: The Surprising Truth About What Motivates Us",
        authors: "Daniel H. Pink",
        year: 2009
      },
      {
        title: "From Game Design Elements to Gamefulness: Defining Gamification",
        authors: "Sebastian Deterding et al.",
        year: 2011
      }
    ],

    relatedTags: [
      "progression_claire",
      "motivation_extrinseque",
      "autonomie_reduite"
    ]
  },
  {
    slug: 'feedback',
    title: 'Feedback',

    shortDescription:
      "Le système fournit des retours clairs, utiles et proportionnés afin d'aider l'utilisateur à comprendre les conséquences de ses actions.",

    whenToUse:
      "Ce principe s'applique à chaque interaction produisant une confirmation, une erreur, une notification ou une célébration de progression.",

    why: `Le feedback permet aux utilisateurs de comprendre immédiatement les effets de leurs actions. Il réduit l'incertitude, renforce le sentiment de maîtrise et facilite l'apprentissage du fonctionnement d'une interface. Sans retour clair, les utilisateurs peuvent douter de leurs actions, répéter inutilement une manipulation ou perdre confiance dans le système.`,

    content: `Une gamification éthique utilise le feedback pour accompagner l'utilisateur plutôt que pour influencer excessivement son comportement. Chaque interaction importante devrait produire un retour adapté : confirmer une action, signaler une erreur, expliquer un changement d'état ou mettre en évidence une progression significative.

Un feedback efficace est avant tout informatif. Il intervient au bon moment, utilise un langage compréhensible et reste proportionné à l'action réalisée. À l'inverse, des animations excessives, des notifications répétitives ou des messages culpabilisants peuvent détourner l'attention de l'objectif initial et créer une pression psychologique inutile.

Le feedback doit également respecter les préférences et les capacités des utilisateurs. Les informations importantes ne devraient jamais reposer uniquement sur des effets visuels, sonores ou des animations, afin de garantir une expérience accessible à tous.`,

    impact:
      "Un feedback absent, excessif ou inaccessible entraîne confusion, répétition d'erreurs et fatigue face aux sollicitations, ce qui nuit à la confiance envers le système.",

    relatedMechanics: ['notifications', 'rewards', 'progress'],

    takeaways: [
      "Le feedback doit être immédiat et compréhensible.",
      "Chaque retour doit avoir une utilité pour l'utilisateur.",
      "L'intensité du feedback doit rester proportionnée à l'action réalisée.",
      "Les retours doivent être accessibles et ne pas dépendre d'un seul canal sensoriel."
    ],

    goodPractices: [
      "Confirmer clairement lorsqu'une action est réussie.",
      "Expliquer la cause d'une erreur et proposer une solution.",
      "Utiliser des animations sobres pour attirer l'attention sans distraire.",
      "Permettre de réduire ou désactiver les notifications non essentielles.",
      "Prévoir des alternatives textuelles aux signaux visuels ou sonores."
    ],

    avoid: [
      "Multiplier les notifications sans valeur informative.",
      "Utiliser des messages culpabilisants pour relancer l'engagement.",
      "Célébrer de manière excessive des actions insignifiantes.",
      "Signaler une erreur sans expliquer comment la corriger.",
      "S'appuyer uniquement sur la couleur, le son ou l'animation pour transmettre une information importante."
    ],

    evaluationQuestion:
      "Chaque action importante reçoit-elle un retour clair, utile, proportionné et accessible à tous ?",

    references: [
      {
        title: "10 Usability Heuristics for User Interface Design",
        authors: "Jakob Nielsen",
        year: 2020,
        url: "https://www.nngroup.com/articles/ten-usability-heuristics/"
      },
      {
        title: "The Design of Everyday Things",
        authors: "Donald A. Norman",
        year: 2013
      },
      {
        title: "Web Content Accessibility Guidelines (WCAG) 2.2",
        authors: "World Wide Web Consortium (W3C)",
        year: 2023,
        url: "https://www.w3.org/TR/WCAG22/"
      }
    ],

    relatedTags: [
      "feedback_adequat",
      "pression_temporelle",
      "autonomie_reduite"
    ]
  },
  {
    slug: 'recompenses',
    title: 'Récompenses et motivation',

    shortDescription:
      "Les récompenses renforcent l'engagement lorsqu'elles soutiennent la motivation intrinsèque plutôt que de la remplacer.",

    whenToUse:
      "Ce principe s'applique dès qu'un système attribue des points, badges, niveaux, contenus à débloquer ou tout autre avantage symbolique en réponse à une action.",

    why: `Les récompenses peuvent encourager l'engagement, reconnaître les efforts et valoriser les progrès réalisés. Cependant, leur influence sur la motivation dépend de leur conception. Lorsqu'elles deviennent la principale raison d'agir, elles risquent de détourner l'utilisateur de son objectif initial et de réduire progressivement sa motivation intrinsèque.`,

    content: `Les récompenses occupent une place centrale dans la plupart des systèmes de gamification. Elles peuvent prendre différentes formes : points, badges, niveaux, contenus à débloquer ou avantages symboliques. Utilisées avec pertinence, elles permettent de reconnaître des accomplissements significatifs et de maintenir un sentiment de progression.

Une conception éthique cherche toutefois à éviter que les utilisateurs n'agissent uniquement pour obtenir une récompense. Si chaque action est systématiquement récompensée, la motivation peut progressivement devenir dépendante de ces gratifications externes. À long terme, l'activité elle-même perd de son intérêt, un phénomène connu sous le nom d'effet de surjustification.

Les récompenses devraient ainsi valoriser des progrès réels, encourager l'apprentissage et conserver une signification durable. Elles constituent un soutien à la motivation, mais ne devraient jamais devenir l'objectif principal de l'expérience.`,

    impact:
      "Une dépendance excessive aux récompenses externes peut faire disparaître la motivation intrinsèque (effet de surjustification) et rendre l'engagement fragile dès que les récompenses cessent.",

    relatedMechanics: ['points', 'badges', 'rewards', 'levels'],

    takeaways: [
      "Les récompenses doivent reconnaître des accomplissements significatifs.",
      "La motivation intrinsèque doit rester au cœur de l'expérience.",
      "Les récompenses ne devraient pas devenir une fin en soi.",
      "La valeur d'une récompense doit être cohérente avec l'effort fourni."
    ],

    goodPractices: [
      "Attribuer des récompenses en lien avec des compétences ou des objectifs atteints.",
      "Privilégier les récompenses symboliques qui valorisent les progrès réalisés.",
      "Associer chaque récompense à une explication claire de ce qu'elle reconnaît.",
      "Veiller à ce que les récompenses conservent une valeur cohérente dans le temps.",
      "Concevoir les récompenses comme un soutien à l'apprentissage plutôt qu'un mécanisme de fidélisation."
    ],

    avoid: [
      "Récompenser systématiquement chaque action, même lorsqu'elle est insignifiante.",
      "Multiplier les récompenses uniquement pour maintenir l'engagement.",
      "Utiliser des récompenses aléatoires exploitant les mécanismes proches des jeux de hasard.",
      "Dévaluer progressivement les récompenses afin d'inciter à une utilisation plus intensive.",
      "Faire dépendre la motivation uniquement de gratifications externes."
    ],

    evaluationQuestion:
      "Les récompenses reconnaissent-elles des progrès réels sans devenir la principale raison d'agir de l'utilisateur ?",

    references: [
      {
        title: "Intrinsic Motivation and Self-Determination in Human Behavior",
        authors: "Edward L. Deci & Richard M. Ryan",
        year: 1985
      },
      {
        title: "Self-Determination Theory: Basic Psychological Needs in Motivation, Development, and Wellness",
        authors: "Edward L. Deci & Richard M. Ryan",
        year: 2017
      },
      {
        title: "The Hidden Costs of Reward: New Perspectives on the Psychology of Human Motivation",
        authors: "Mark R. Lepper & David Greene",
        year: 1978
      }
    ],

    relatedTags: [
      "motivation_extrinseque",
      "dependance_risque",
      "transparence_absente"
    ]
  },
  {
    slug: 'comparaison-sociale',
    title: 'Comparaison sociale',

    shortDescription:
      "Les mécanismes de comparaison favorisent la motivation sans créer d'exclusion, de compétition excessive ou de pression sociale.",

    whenToUse:
      "Ce principe s'applique dès qu'un classement, un défi collectif ou un indicateur de performance rend visibles les résultats d'un utilisateur par rapport à d'autres.",

    why: `Observer les progrès d'autres utilisateurs peut renforcer la motivation, encourager l'apprentissage et créer un sentiment d'appartenance. Toutefois, la comparaison sociale influence fortement les comportements et les émotions. Lorsqu'elle est mal conçue, elle peut provoquer du découragement, de l'anxiété ou une compétition nuisible. Une gamification éthique cherche donc à utiliser ce levier avec discernement afin de soutenir les utilisateurs plutôt que de les mettre en concurrence permanente.`,

    content: `Les classements, les défis collectifs ou les indicateurs de performance sont des mécanismes fréquemment utilisés dans la gamification. Leur objectif est souvent d'encourager l'engagement en permettant aux utilisateurs de situer leurs progrès par rapport à ceux des autres.

Cette comparaison n'est cependant pas toujours bénéfique. Un classement global peut rapidement devenir démotivant pour les personnes qui occupent durablement les dernières positions. De même, exposer publiquement les performances peut générer une pression sociale ou favoriser des comportements contre-productifs comme la triche ou la recherche de résultats au détriment de l'objectif réel.

Une conception responsable privilégie des comparaisons pertinentes et contextualisées. Elle valorise les progrès personnels, permet de contrôler la visibilité des performances et évite de réduire les utilisateurs à leur position dans un classement.`,

    impact:
      "Une comparaison sociale mal calibrée peut décourager durablement les utilisateurs les moins performants, générer de l'anxiété et pousser à des comportements de triche ou de sur-optimisation superficielle.",

    relatedMechanics: ['leaderboards', 'challenges', 'missions'],

    takeaways: [
      "Comparer peut motiver, mais aussi décourager.",
      "Les progrès personnels doivent rester plus importants que le classement.",
      "Les utilisateurs devraient contrôler la visibilité de leurs performances.",
      "Les mécanismes sociaux doivent favoriser la coopération autant que la compétition."
    ],

    goodPractices: [
      "Comparer les utilisateurs ayant un niveau ou des objectifs similaires.",
      "Mettre en avant les progrès individuels avant le classement.",
      "Permettre de masquer son classement ou son profil public.",
      "Favoriser des défis collaboratifs plutôt qu'une compétition permanente.",
      "Renouveler régulièrement les classements afin d'éviter des positions figées."
    ],

    avoid: [
      "Afficher un classement mondial lorsque celui-ci n'apporte aucune valeur.",
      "Humilier ou stigmatiser les utilisateurs les moins performants.",
      "Rendre publiques les performances sans consentement.",
      "Favoriser une compétition qui détourne les utilisateurs de leur objectif initial.",
      "Créer un environnement où seuls les meilleurs sont valorisés."
    ],

    evaluationQuestion:
      "Les mécanismes de comparaison sociale valorisent-ils les progrès personnels autant que la position dans un classement ?",

    references: [
      {
        title: "A Theory of Social Comparison Processes",
        authors: "Leon Festinger",
        year: 1954
      },
      {
        title: "Gamification in Education: What, How, Why Bother?",
        authors: "Karl M. Kapp",
        year: 2012
      },
      {
        title: "Does Gamification Work? A Literature Review of Empirical Studies on Gamification",
        authors: "Juho Hamari, Jonna Koivisto & Harri Sarsa",
        year: 2014
      }
    ],

    relatedTags: [
      "pression_sociale",
      "autonomie_reduite",
      "public_vulnerable"
    ]
  },
  {
    slug: 'rarete-urgence',
    title: 'Rareté et urgence',

    shortDescription:
      "Les mécanismes de rareté et d'urgence créent de l'engagement sans exercer de pression artificielle ni exploiter la peur de manquer une opportunité.",

    whenToUse:
      "Ce principe s'applique aux comptes à rebours, offres limitées, récompenses exclusives ou événements temporaires susceptibles de précipiter une décision.",

    why: `La rareté et l'urgence sont des leviers psychologiques puissants qui influencent la prise de décision. Lorsqu'elles reflètent une contrainte réelle, elles peuvent rythmer une expérience et encourager la participation. En revanche, lorsqu'elles sont artificiellement créées pour pousser les utilisateurs à agir rapidement, elles limitent leur capacité à prendre une décision réfléchie et peuvent conduire à des comportements qu'ils n'auraient pas adoptés autrement.`,

    content: `Les comptes à rebours, les offres limitées, les récompenses exclusives ou les événements temporaires sont des mécanismes courants dans la gamification. Ils peuvent apporter de la variété à une expérience et créer un sentiment d'événement lorsqu'ils reposent sur une justification légitime.

Le problème apparaît lorsque cette rareté est simulée ou que l'urgence est volontairement exagérée afin d'inciter les utilisateurs à agir immédiatement. Des délais constamment renouvelés, des messages alarmants ou des récompenses volontairement inaccessibles exploitent la peur de manquer une opportunité (FOMO) et réduisent la liberté de décision.

Une conception éthique veille à ce que la rareté corresponde à une contrainte réelle, que les délais soient honnêtement représentés et que les utilisateurs disposent d'un temps raisonnable pour prendre une décision en connaissance de cause.`,

    impact:
      "Une rareté ou une urgence simulées provoquent des décisions précipitées, de l'anxiété liée au FOMO et, une fois le procédé identifié par l'utilisateur, une perte de confiance durable envers la plateforme.",

    relatedMechanics: ['challenges', 'rewards', 'missions'],

    takeaways: [
      "La rareté doit refléter une contrainte réelle.",
      "L'urgence ne doit pas empêcher une décision réfléchie.",
      "Les délais doivent être honnêtes et compréhensibles.",
      "La peur de manquer une opportunité ne doit pas devenir un levier de manipulation."
    ],

    goodPractices: [
      "Utiliser des événements temporaires dont la durée est clairement annoncée.",
      "Expliquer pourquoi une ressource ou une récompense est limitée.",
      "Laisser un délai raisonnable pour participer ou prendre une décision.",
      "Informer clairement lorsqu'un événement est exceptionnel.",
      "Concevoir les mécanismes temporaires comme des bonus plutôt que comme des obligations."
    ],

    avoid: [
      "Créer de faux comptes à rebours qui se réinitialisent automatiquement.",
      "Simuler une rareté sur des ressources numériques illimitées.",
      "Utiliser des messages alarmants pour provoquer une décision immédiate.",
      "Faire croire qu'une opportunité est définitivement perdue alors qu'elle reviendra régulièrement.",
      "Exploiter le FOMO pour augmenter artificiellement l'engagement ou les achats."
    ],

    evaluationQuestion:
      "La rareté ou l'urgence présentée à l'utilisateur reflète-t-elle une contrainte réelle et honnêtement communiquée ?",

    references: [
      {
        title: "Influence: The Psychology of Persuasion",
        authors: "Robert B. Cialdini",
        year: 2021
      },
      {
        title: "Deceived by Design",
        authors: "Harry Brignull",
        year: 2023
      },
      {
        title: "Ethics for Designers",
        authors: "Joe Natoli",
        year: 2019
      }
    ],

    relatedTags: [
      "pression_temporelle",
      "contexte_sensible",
      "consentement_flou"
    ]
  },
  {
    slug: 'choix-contraint',
    title: 'Choix contraint',

    shortDescription:
      "Les choix proposés à l'utilisateur-rice sont réels, équilibrés et ne masquent pas une option par défaut avantageuse pour la plateforme.",

    whenToUse:
      "Ce principe s'applique dès qu'une interface présente à l'utilisateur-rice un choix entre plusieurs options, notamment pour accepter des notifications, poursuivre un abonnement ou valider une action de progression.",

    why: `Un choix n'est réel que si toutes les options sont présentées avec la même clarté et le même poids visuel. Lorsque l'architecture d'une interface favorise systématiquement une option au détriment d'une autre, l'utilisateur-rice n'exerce plus un choix libre mais suit un chemin balisé pour lui. Cette asymétrie mine la confiance et le consentement réellement éclairé.`,

    content: `Le choix contraint désigne les situations où l'utilisateur-rice est placé-e face à des options qui semblent libres, mais dont l'architecture favorise systématiquement un comportement précis — généralement celui qui bénéficie à la plateforme plutôt qu'à l'utilisateur-rice.

Dans la gamification, cela peut prendre la forme de dark patterns : une option présentée en vert lumineux contre une option en gris discret, un bouton "Continuer" bien visible contre un lien "Non merci" quasi invisible, ou une progression qui ne peut avancer qu'en acceptant des notifications.

Une conception éthique du choix signifie que toutes les options sont présentées de manière équitable, que le refus est aussi accessible que l'acceptation, et que l'utilisateur-rice comprend réellement les conséquences de chaque choix avant de le faire.`,

    impact:
      "Des choix biaisés dans leur présentation érodent le consentement réel, exposent la plateforme à une perception de manipulation et fragilisent la confiance dès que l'asymétrie est identifiée par l'utilisateur-rice.",

    relatedMechanics: ['notifications', 'progress', 'rewards'],

    takeaways: [
      "Un choix n'est réel que si toutes les options sont présentées équitablement.",
      "Le refus doit être aussi accessible que l'acceptation.",
      "Les conséquences de chaque option doivent être comprises avant validation.",
      "La progression ne devrait jamais être conditionnée à un choix biaisé."
    ],

    goodPractices: [
      "Présenter les boutons d'acceptation et de refus avec le même niveau de visibilité.",
      "Rendre la désactivation des notifications accessible sans friction excessive.",
      "Expliquer clairement les conséquences de chaque option avant que l'utilisateur-rice choisisse.",
      "Éviter les nudges visuels qui orientent systématiquement vers l'option avantageuse pour la plateforme."
    ],

    avoid: [
      "Utiliser des dark patterns visuels qui hiérarchisent les options de manière trompeuse.",
      "Minimiser ou passer sous silence les conséquences du refus.",
      "Bloquer une progression tant qu'une condition supplémentaire n'est pas acceptée.",
      "Présenter un faux choix où toutes les options mènent au résultat souhaité par la plateforme."
    ],

    evaluationQuestion:
      "Le refus est-il présenté avec la même clarté et la même accessibilité que l'acceptation ?",

    references: [
      {
        title: "Deceived by Design",
        authors: "Harry Brignull",
        year: 2023
      },
      {
        title: "Ethics for Designers",
        authors: "Joe Natoli",
        year: 2019
      },
      {
        title: "10 Usability Heuristics for User Interface Design",
        authors: "Jakob Nielsen",
        year: 2020,
        url: "https://www.nngroup.com/articles/ten-usability-heuristics/"
      }
    ],

    relatedTags: ['autonomie_reduite', 'consentement_flou', 'transparence_absente']
  }
]