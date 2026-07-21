import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos',
  description: `Contexte, objectifs et limites de l'outil d'évaluation éthique de gamification, réalisé dans le cadre d'un Travail de Bachelor.`,
}

const limits = [
  { id: 'test',      label: 'Un test utilisateur',      text: `Seul un test avec de vraies personnes permet de valider l'impact réel des mécaniques sur le comportement et le ressenti des utilisateur-rices.` },
  { id: 'expertise', label: 'Une expertise sectorielle', text: `Certains domaines — santé, éducation, finance — impliquent des réglementations ou des enjeux spécifiques qu'une expertise juridique ou métier doit couvrir : l'outil ne la remplace pas.` },
  { id: 'decision',  label: `Une décision d'équipe`,     text: `L'outil produit un support de discussion, pas une décision. L'arbitrage final appartient à l'équipe projet.` },
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
      <section aria-labelledby="apropos-heading" className="mx-auto w-full max-w-[68rem] px-6 py-20">
        <div className="max-w-2xl">
          <h1
            id="apropos-heading"
            className="mb-6 text-4xl font-semibold leading-tight text-foreground md:text-5xl"
          >
            Un outil conçu dans le cadre <span className="text-primary">d'un Travail de Bachelor</span>
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
  </a>, agence digitale basée à Lausanne, afin de concevoir un outil
  utilisable dans un contexte professionnel de conception numérique.
</p>
          </div>
        </div>
      </section>

      {/* ── Contexte ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="contexte-heading" className="mx-auto w-full max-w-[62rem] px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="contexte-heading" className="mb-5 text-3xl font-semibold text-foreground">
              Contexte du projet
            </h2>
            <div className="flex flex-col gap-4 text-base leading-relaxed text-foreground/80">
              <p>
                La gamification est aujourd'hui présente dans de nombreux
                produits numériques. Elle peut rendre une expérience plus
                engageante — mais elle peut aussi exploiter des mécanismes de
                pression, de dépendance ou de manipulation si elle n'est pas
                pensée avec soin.
              </p>
              <p>
                Ce projet s'appuie sur des travaux de recherche en psychologie
                de la motivation (Deci &amp; Ryan, Pink) et en éthique du design
                (Deterding), pour aider les équipes à identifier les risques
                avant de concevoir, plutôt qu'après avoir déployé.
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
                style={{ borderLeft: '2px solid rgba(74,45,87,0.2)' }}
              >
                {roles.map((role) => (
                  <li key={role} className="text-foreground/80">{role}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Objectif ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="objectif-heading" className="mx-auto w-full max-w-[62rem] px-6 py-20">
        <div className="max-w-2xl">
          <h2 id="objectif-heading" className="mb-5 text-3xl font-semibold text-foreground">
            Objectif de l'outil
          </h2>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-foreground/80">
            <p>
              L'outil aide à cadrer une décision de conception avant qu'elle
              soit prise. Il ne remplace pas le jugement de l'équipe, mais lui
              fournit un point de départ structuré pour une discussion
              informée — avec les parties prenantes, le client ou les
              utilisateur-rices.
            </p>
            <p>
              Il ne donne pas une réponse définitive sur la qualité éthique
              d'un produit : il aide à poser les bonnes questions, au bon
              moment, avant que les choix de conception ne soient figés.
            </p>
          </div>
        </div>
      </section>

      {/* ── Méthode ───────────────────────────────────────────────────────── */}
      <section aria-labelledby="methode-heading" className="mx-auto w-full max-w-[62rem] px-6 py-20">
        <div className="max-w-2xl">
          <h2 id="methode-heading" className="mb-5 text-3xl font-semibold text-foreground">
            Méthode
          </h2>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-foreground/80">
            <p>
              Le verdict est produit par un système de règles explicite et
              traçable, pas par une intelligence artificielle : chaque réponse
              au questionnaire est confrontée à des critères documentés, liés
              aux huit principes de l'outil. L'IA n'intervient qu'en
              complément, après l'outil, jamais à sa place.
            </p>
          </div>
          <Link
            href="/comprendre"
            className={[
              'mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline underline-offset-2',
              'transition-opacity hover:opacity-70',
              'focus-visible:rounded focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-primary',
            ].join(' ')}
          >
            Voir le détail du fonctionnement →
          </Link>
        </div>
      </section>

      {/* ── Limites ───────────────────────────────────────────────────────── */}
      <section aria-labelledby="limites-heading" className="mx-auto w-full max-w-[62rem] px-6 py-20">
        <div className="mb-10 max-w-2xl">
          <h2 id="limites-heading" className="mb-4 text-3xl font-semibold text-foreground">
            Limites de l'outil
          </h2>
          <p className="text-base leading-relaxed text-foreground/70">
            Un outil honnête sur ses limites est plus utile qu'un outil qui
            prétend tout résoudre. Voici ce que celui-ci ne remplace pas.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {limits.map((limit) => (
            <li
              key={limit.id}
              className="flex flex-col gap-3 rounded-2xl p-5"
              style={{ background: 'rgba(181,98,10,0.06)', boxShadow: '0 0 0 1px rgba(181,98,10,0.15)' }}
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
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="cta-apropos-heading" className="w-full py-4">
        <div className="mx-auto max-w-[56rem] px-6">
          <div
            className="rounded-[2rem] px-8 py-16 text-center sm:px-16"
            style={{ background: 'rgba(74,45,87,0.06)' }}
          >
            <h2
              id="cta-apropos-heading"
              className="text-3xl font-semibold leading-tight text-foreground md:text-4xl"
            >
              Vous avez un projet
              <br />
              à analyser ?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-foreground/70">
              Le questionnaire prend 15 minutes maximum. Aucune inscription requise.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/evaluation"
                className={[
                  'inline-flex items-center rounded-xl px-8 py-4 text-base font-semibold',
                  'bg-primary text-primary-foreground transition-opacity hover:opacity-90',
                  'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
                ].join(' ')}
              >
                Lancer l'évaluation
              </Link>
              <Link
                href="/comprendre"
                className={[
                  'inline-flex items-center rounded-xl px-8 py-4 text-base font-semibold text-primary',
                  'transition-all hover:bg-white/60',
                  'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
                ].join(' ')}
                style={{ boxShadow: '0 0 0 1.5px rgba(74,45,87,0.4)' }}
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
