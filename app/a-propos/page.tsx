import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos', 
  description: `Contexte,  objectifs et limites de l'outil d'évaluation éthique de gamification,  réalisé dans le cadre d'un Travail de Bachelor.`, 
}

const methodSteps = [
  { id: 'questionnaire',    label: 'Questionnaire',                text: `Huit questions couvrent les dimensions clés du projet : objectif,  public,  mécaniques,  transparence,  contrôle,  pression et motivation.` }, 
  { id: 'tags',             label: 'Tags',                         text: `Chaque réponse peut activer un ou plusieurs tags qui qualifient les risques ou les atouts détectés dans le projet.` }, 
  { id: 'regles',           label: 'Règles de priorité',           text: `Les tags sont évalués selon des règles explicites et documentées. Leur combinaison détermine la gravité globale du profil éthique.` }, 
  { id: 'verdict',          label: 'Verdict',                      text: `Un verdict est produit parmi cinq niveaux possibles. Il reflète l'analyse du système de règles,  pas une opinion ou une inférence statistique.` }, 
  { id: 'recommandations',  label: 'Recommandations',              text: `Chaque tag activé génère une ou plusieurs recommandations concrètes,  triées par priorité et liées à un principe du framework.` }, 
  { id: 'ia',               label: 'Analyse IA complémentaire',    text: `Une analyse IA peut approfondir les résultats en identifiant des angles morts ou en proposant des questions à poser à l'équipe. Elle intervient après le framework,  jamais à sa place.` }, 
]

const limits = [
  { id: 'test',       label: 'Un test utilisateur',     text: `Seul un test avec de vraies personnes permet de valider l'impact réel des mécaniques sur le comportement et le ressenti des utilisateur-rices.` }, 
  { id: 'juridique',  label: 'Une revue juridique',     text: `Selon le domaine et le public,  des réglementations spécifiques peuvent s'appliquer. Un-e juriste spécialisé-e est indispensable pour les cas sensibles.` }, 
  { id: 'expertise',  label: 'Une expertise métier',    text: `Certains contextes, santé,  éducation,  finance, nécessitent une connaissance sectorielle que le framework ne peut pas remplacer.` }, 
  { id: 'decision',   label: `Une décision d'équipe`,   text: `L'outil produit un support de discussion,  pas une décision. L'arbitrage final appartient à l'équipe projet.` }, 
]

const roles = [
  'UX/UI designers', 
  'Développeur-ses', 
  `Chef-fes de projet`, 
  'Product owners', 
  `Account managers et équipes client`, 
]

export default function AProposPage() {
  return (
    <div className="flex flex-col">

      {/* ── Introduction ──────────────────────────────────────────────────── */}
      <section aria-labelledby="apropos-heading" className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <h1
            id="apropos-heading"
            className="mb-6 text-4xl font-semibold leading-tight text-foreground md:text-5xl"
          >
            Un outil conçu dans le cadre
            <br />
            <span className="text-primary">d'un Travail de Bachelor</span>
          </h1>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-foreground/80">
            <p>
              Ce site a été réalisé dans le cadre d'un Travail de Bachelor
              portant sur la gamification éthique dans les projets numériques.
              Il explore la question suivante : comment aider les professionnel-les
              du numérique à évaluer si une mécanique de jeu est pertinente, 
              risquée ou déconseillée dans leur contexte ?
            </p>
            <p>
  Ce travail a été mené en collaboration avec{' '}
  <a
    href="https://antistatique.net"
    target="_blank"
    rel="noopener noreferrer"
    className={[
      'font-semibold text-primary underline underline-offset-2 transition-opacity hover:opacity-70', 
      'focus-visible:rounded focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-primary', 
    ].join(' ')}
  >
    Antistatique
  </a>,  agence digitale basée à Lausanne,  afin de concevoir un outil
  utilisable dans un contexte professionnel de conception numérique.
</p>
          </div>
        </div>
      </section>

      {/* ── Contexte ──────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="contexte-heading"
        className="w-full"
        style={{ background: 'rgba(231, 225, 218, 0.4)' }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 id="contexte-heading" className="mb-5 text-3xl font-semibold text-foreground">
                Contexte du projet
              </h2>
              <div className="flex flex-col gap-4 text-base leading-relaxed text-foreground/80">
                <p>
                  La gamification est aujourd'hui présente dans de nombreux
                  produits numériques. Elle peut rendre une expérience plus
                  engageante, mais elle peut aussi exploiter des mécanismes de
                  pression,  de dépendance ou de manipulation si elle n'est pas
                  pensée avec soin.
                </p>
                <p>
                  Ce projet s'inscrit dans une réflexion sur la manière d'intégrer
                  des mécaniques de jeu de façon responsable,  en aidant les équipes
                  à identifier les risques avant de concevoir,  plutôt qu'après avoir
                  déployé.
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-5 text-base font-semibold text-foreground">
                À qui s'adresse l'outil ?
              </h3>
              <div className="flex flex-col gap-3 text-sm leading-relaxed text-foreground/80">
                <p>
                  L'outil s'adresse à toute personne impliquée dans la conception
                  ou la validation d'une expérience numérique.
                </p>
                <ul
                  className="flex flex-col gap-2 pl-4"
                  style={{ borderLeft: '2px solid rgba(74, 45, 87, 0.2)' }}
                >
                  {roles.map((role) => (
                    <li key={role} className="text-foreground/80">{role}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Objectif ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="objectif-heading" className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <h2 id="objectif-heading" className="mb-5 text-3xl font-semibold text-foreground">
            Objectif de l'outil
          </h2>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-foreground/80">
            <p>
              L'outil aide à cadrer une décision de conception avant qu'elle
              soit prise. Il ne donne pas une réponse définitive sur la qualité
              éthique d'un produit, il produit un verdict structuré,  des points
              de vigilance et des recommandations concrètes à partir des
              informations fournies.
            </p>
            <p>
              L'intention n'est pas de remplacer le jugement de l'équipe,  mais
              de lui fournir un point de départ structuré pour une discussion
              informée, avec les parties prenantes,  le client ou les
              utilisateur-rices.
            </p>
          </div>
        </div>
      </section>

      {/* ── Méthode ───────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="methode-heading"
        className="w-full"
        style={{ background: 'rgba(217, 208, 227, 0.25)' }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 max-w-2xl">
            <h2 id="methode-heading" className="mb-4 text-3xl font-semibold text-foreground">
              Méthode
            </h2>
            <p className="text-base leading-relaxed text-foreground/70">
              Le verdict est produit par un système explicite et traçable, 
              pas par une intelligence artificielle. L'IA intervient uniquement
              comme couche complémentaire,  après le framework.
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {methodSteps.map((step,  index) => (
              <li
                key={step.id}
                className="flex flex-col gap-3 rounded-2xl p-5"
                style={{ background: 'rgba(255, 255, 255, 0.65)',  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-semibold text-primary/20" aria-hidden="true">
                    {String(index + 1).padStart(2,  '0')}
                  </span>
                  <p className="text-base font-semibold text-foreground">{step.label}</p>
                </div>
                <p className="text-sm leading-relaxed text-foreground/70">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Limites ───────────────────────────────────────────────────────── */}
      <section aria-labelledby="limites-heading" className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="mb-10 max-w-2xl">
          <h2 id="limites-heading" className="mb-4 text-3xl font-semibold text-foreground">
            Limites de l'outil
          </h2>
          <p className="text-base leading-relaxed text-foreground/70">
            Cet outil a des limites claires. Il ne remplace pas les démarches
            suivantes,  qui restent indispensables selon le contexte du projet.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {limits.map((limit) => (
            <li
              key={limit.id}
              className="flex flex-col gap-3 rounded-2xl p-5"
              style={{ background: 'rgba(255, 255, 255, 0.60)',  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)' }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 shrink-0 text-sm font-semibold"
                  style={{ color: 'var(--color-warning)' }}
                  aria-hidden="true"
                >
                  ⚠
                </span>
                <p className="text-base font-semibold text-foreground">{limit.label}</p>
              </div>
              <p className="pl-6 text-sm leading-relaxed text-foreground/70">{limit.text}</p>
            </li>
          ))}
        </ul>
        <div
          className="mt-8 max-w-2xl rounded-2xl p-6"
          style={{ background: 'rgba(231, 225, 218, 0.5)' }}
        >
          <p className="text-base leading-relaxed text-foreground/80">
            Les résultats produits par cet outil doivent être utilisés comme
            un <strong className="font-semibold text-foreground">support de discussion</strong>, 
            pas comme une validation définitive. Ils aident à structurer
            une conversation,  pas à la clore.
          </p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="cta-apropos-heading"
        className="w-full"
        style={{ background: 'rgba(231, 225, 218, 0.4)' }}
      >
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="cta-apropos-heading" className="mb-2 text-2xl font-semibold text-foreground">
                Vous avez un projet à analyser ?
              </h2>
              <p className="text-base text-foreground/70">
                Le questionnaire prend environ cinq minutes. Aucune inscription requise.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/evaluation"
                className={[
                  'inline-flex items-center rounded-xl px-6 py-3 text-sm font-semibold', 
                  'bg-primary text-primary-foreground transition-opacity hover:opacity-90', 
                  'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary', 
                ].join(' ')}
              >
                Lancer l'évaluation
              </Link>
              <Link
                href="/comprendre"
                className={[
                  'inline-flex items-center rounded-xl px-6 py-3 text-sm font-semibold text-primary', 
                  'transition-all hover:bg-white/60', 
                  'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary', 
                ].join(' ')}
                style={{ boxShadow: '0 0 0 1.5px rgba(74, 45, 87, 0.4)' }}
              >
                Comprendre la démarche
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}