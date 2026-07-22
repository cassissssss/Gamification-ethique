export type ResourceCategory =
  | 'theorie'
  | 'dark-patterns'
  | 'recherche-gamification'
  | 'etudes-de-cas'

export interface Resource {
  id: string
  title: string
  authors: string
  year: number | null
  source: string
  url: string
  category: ResourceCategory
  /** Slugs des principes auxquels cette ressource se rattache le plus directement. */
  relatedPrinciples?: string[]
}

export const resourceCategoryLabels: Record<ResourceCategory, string> = {
  'theorie': 'Fondements théoriques',
  'dark-patterns': 'Dark patterns & design éthique',
  'recherche-gamification': 'Recherche & définitions de la gamification',
  'etudes-de-cas': 'Études de cas concrets',
}

export const resources: Resource[] = [
  // ─── Fondements théoriques ───────────────────────────────────────────────
  {
    id: 'ryan-deci-2000',
    title: 'Self-Determination Theory and the Facilitation of Intrinsic Motivation, Social Development, and Well-Being',
    authors: 'Ryan, R. M., & Deci, E. L.',
    year: 2000,
    source: 'American Psychologist, 55(1), 68-78',
    url: 'https://doi.org/10.1037/0003-066x.55.1.68',
    category: 'theorie',
    relatedPrinciples: ['autonomie', 'progression', 'recompenses'],
  },
  {
    id: 'dahlstrom-2012',
    title: 'Impacts of gamification on intrinsic motivation',
    authors: 'Dahlstrøm, C.',
    year: 2012,
    source: 'Education and Humanities Research, 1',
    url: 'https://www.ntnu.edu/documents/139799/1279149990/04+Article+Final_camildah_fors%C3%B8k_2017-12-06-13-53-55_TPD4505.Camilla.Dahlstr%C3%B8m.pdf',
    category: 'theorie',
    relatedPrinciples: ['recompenses'],
  },
  {
    id: 'fogg-2003',
    title: 'Persuasive technology: Using computers to change what we think and do',
    authors: 'Fogg, B. J.',
    year: 2003,
    source: 'Morgan Kaufmann Publishers Inc.',
    url: 'https://doi.org/doi/10.5555/2821581',
    category: 'theorie',
  },

  // ─── Dark patterns & design éthique ──────────────────────────────────────
  {
    id: 'brignull-2011',
    title: 'Dark Patterns: Deception vs. Honesty in UI Design',
    authors: 'Brignull, H.',
    year: 2011,
    source: 'A List Apart',
    url: 'https://alistapart.com/article/dark-patterns-deception-vs-honesty-in-uidesign/',
    category: 'dark-patterns',
    relatedPrinciples: ['choix-contraint', 'rarete-urgence'],
  },
  {
    id: 'designers-ethiques',
    title: 'Concevoir sans dark patterns — Guide à l\u2019intention des designers : 1. Introduction',
    authors: 'Designers Éthiques',
    year: null,
    source: 'designersethiques.org',
    url: 'https://designersethiques.org/fr/thematiques/design-persuasif/concevoir-sans-darkpatterns/1-introduction',
    category: 'dark-patterns',
    relatedPrinciples: ['choix-contraint'],
  },
  {
    id: 'celik-2024',
    title: 'The Art of Persuasive Design in UX',
    authors: 'Celik, M.',
    year: 2024,
    source: 'UX Mate (Medium)',
    url: 'https://medium.com/ux-mate/the-art-of-persuasive-design-in-ux-cb165a5fb07f',
    category: 'dark-patterns',
  },
  {
    id: 'mazumdar-2022',
    title: 'Responsible Design Part 6 of 14: Bait and Switch',
    authors: 'Mazumdar, S. B.',
    year: 2022,
    source: 'Think Design',
    url: 'https://think.design/blog/responsible-design-part-6-of-14-bait-and-switch/',
    category: 'dark-patterns',
    relatedPrinciples: ['choix-contraint'],
  },
  {
    id: 'ethique-quebec',
    title: 'Enjeux éthiques',
    authors: 'Commission de l\u2019éthique en science et technologie',
    year: null,
    source: 'ethique.gouv.qc.ca',
    url: 'https://www.ethique.gouv.qc.ca/ethique/quelques-notions-d-ethique/les-enjeuxethiques/',
    category: 'dark-patterns',
  },
  {
    id: 'kim-werbach-2016',
    title: 'More than just a game: Ethical issues in gamification',
    authors: 'Kim, T. W., & Werbach, K.',
    year: 2016,
    source: 'Ethics and Information Technology, 18(2), 157-173',
    url: 'https://doi.org/10.1007/s10676-016-9401-5',
    category: 'dark-patterns',
    relatedPrinciples: ['choix-contraint', 'rarete-urgence'],
  },
  {
    id: 'researchgate-2020-dark-patterns',
    title: 'Gamification for Good: Addressing Dark Patterns in Gamified UX Design',
    authors: 'ResearchGate',
    year: 2020,
    source: 'ResearchGate',
    url: 'https://www.researchgate.net/publication/339487229_Gamification_for_Good_Addressing_Dark_Patterns_in_Gamified_UX_Design',
    category: 'dark-patterns',
  },

  // ─── Recherche & définitions de la gamification ─────────────────────────
  {
    id: 'deterding-2011',
    title: 'From game design elements to gamefulness: Defining "gamification"',
    authors: 'Deterding, S., Dixon, D., Khaled, R., & Nacke, L.',
    year: 2011,
    source: 'Proceedings of the 15th International Academic MindTrek Conference, MindTrek \u201911, 9-15',
    url: 'https://doi.org/10.1145/2181037.2181040',
    category: 'recherche-gamification',
    relatedPrinciples: ['autonomie', 'progression'],
  },
  {
    id: 'ledu-2018',
    title: 'Games, Gaming, and Gamification: Know the differences',
    authors: 'Ecosystem (LEDU)',
    year: 2018,
    source: 'The Startup (Medium)',
    url: 'https://medium.com/swlh/games-gaming-andgamification-know-the-differences-d48890dc026c',
    category: 'recherche-gamification',
  },
  {
    id: 'savignac-2024',
    title: 'Gamification',
    authors: 'Savignac, E.',
    year: 2024,
    source: 'Dictionnaire des sciences du jeu (p. 169-176), érès',
    url: 'https://doi.org/10.3917/eres.broug.2024.01.0171',
    category: 'recherche-gamification',
  },
  {
    id: 'digiworks-2025',
    title: 'Tout savoir sur la gamification en 2026 — Le guide ultime',
    authors: 'Digiworks.fr',
    year: 2025,
    source: 'digiworks.fr',
    url: 'https://www.digiworks.fr/blog/gamification/definition-quest-ce-que-lagamification',
    category: 'recherche-gamification',
  },
  {
    id: 'researchgate-2024-benefits',
    title: 'Exploring the Benefits and Challenges of Gamification in Enhancing Student Learning Outcomes',
    authors: 'ResearchGate',
    year: 2024,
    source: 'ResearchGate',
    url: 'https://doi.org/10.59613/global.v2i7.238',
    category: 'recherche-gamification',
  },

  // ─── Études de cas concrets ──────────────────────────────────────────────
  {
    id: 'hiltunen-2025',
    title: 'Gamification and Its Impact on Motivation and Pressure in Running Applications',
    authors: 'Hiltunen, V.',
    year: 2025,
    source: 'utupub.fi',
    url: 'https://www.utupub.fi/handle/11111/20016',
    category: 'etudes-de-cas',
    relatedPrinciples: ['rarete-urgence', 'comparaison-sociale'],
  },
  {
    id: 'duolingo-ihc',
    title: 'Teaching or Manipulating? On the Adoption of Bright and Deceptive Patterns by Duolingo',
    authors: 'SBC / IHC',
    year: null,
    source: 'sol.sbc.org.br',
    url: 'https://sol.sbc.org.br/index.php/ihc/article/view/37677/37459',
    category: 'etudes-de-cas',
    relatedPrinciples: ['rarete-urgence', 'autonomie'],
  },
  {
    id: 'bits-of-freedom-2026',
    title: 'The influence of Snapchat\u2019s gamification features on young people',
    authors: 'Bits of Freedom',
    year: 2026,
    source: 'bitsoffreedom.nl',
    url: 'https://www.bitsoffreedom.nl/2026/03/10/the-influence-ofsnapchats-gamification-features-on-young-people/',
    category: 'etudes-de-cas',
    relatedPrinciples: ['comparaison-sociale', 'rarete-urgence'],
  },
  {
    id: 'you-2024',
    title: 'Stay focused and grow a Forest: The design and paradoxes of gamified digital disconnection',
    authors: 'You, Y.',
    year: 2024,
    source: 'p. 171-192',
    url: 'https://doi.org/10.48335/9789188855961-9',
    category: 'etudes-de-cas',
    relatedPrinciples: ['autonomie', 'rarete-urgence'],
  },
]
