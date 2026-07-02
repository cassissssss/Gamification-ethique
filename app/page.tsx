import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Accueil',
  description: `Un outil d'évaluation éthique pour identifier les risques liés aux mécaniques de gamification dans les projets numériques.`,
}

const howItWorks = [
  {
    id: 'questionnaire',
    number: '01',
    title: 'Répondre au questionnaire',
    text: `Décrivez votre projet en questions réparties en six sections : objectif, public, mécaniques envisagées, degré de transparence et de contrôle laissé aux utilisateur·rices.`,
  },
  {
    id: 'vigilance',
    number: '02',
    title: 'Identifier les points de vigilance',
    text: `Vos réponses génèrent des tags. Ces tags activent des règles de priorité qui produisent un verdict explicite : pertinent, sous conditions, léger, déconseillé ou à recadrer.`,
  },
  {
    id: 'recommandations',
    number: '03',
    title: 'Obtenir des recommandations',
    text: `Chaque point de vigilance est accompagné d'une recommandation concrète, liée à un principe du framework. Une analyse IA complémentaire est disponible pour approfondir les résultats.`,
  },
]

const audiences = [
  { label: 'UX/UI designers' },
  { label: 'Développeur·ses' },
  { label: 'Chef·fes de projet' },
  { label: 'Product owners' },
  { label: 'Account managers' },
  { label: 'Équipes client' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-heading"
        className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32"
      >
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-primary/60">
            Gamification éthique
          </p>
          <h1
            id="hero-heading"
            className="mb-6 text-4xl font-semibold leading-tight text-foreground md:text-5xl"
          >
            Évaluer une mécanique de gamification
            <br />
            <span className="text-primary">avant de l'intégrer</span>
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-foreground/80">
            Cet outil aide les professionnel·les du numérique à identifier
            les risques éthiques liés aux mécaniques de jeu : pression
            sociale, dépendance, manque de transparence, perte d'autonomie.
            Il produit un verdict structuré et des recommandations concrètes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/evaluation"
              className={[
                'inline-flex items-center rounded-xl px-6 py-3 text-sm font-semibold',
                'bg-primary text-primary-foreground',
                'transition-opacity hover:opacity-90',
                'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
              ].join(' ')}
            >
              Lancer l'évaluation
            </Link>
            <Link
              href="/comprendre"
              className={[
                'inline-flex items-center rounded-xl px-6 py-3 text-sm font-semibold',
                'text-primary',
                'transition-all hover:bg-white/60',
                'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
              ].join(' ')}
              style={{ boxShadow: '0 0 0 1.5px rgba(74,45,87,0.4)' }}
            >
              Comprendre la démarche
            </Link>
          </div>
        </div>
      </section>

      {/* ── Problème ──────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="probleme-heading"
        className="w-full"
        style={{ background: 'rgba(231,225,218,0.4)' }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <h2
              id="probleme-heading"
              className="mb-5 text-3xl font-semibold text-foreground"
            >
              Motiver sans manipuler
            </h2>
            <div className="flex flex-col gap-4 text-base leading-relaxed text-foreground/80">
              <p>
                La gamification peut soutenir l'engagement, rendre une expérience
                plus fluide et encourager des comportements positifs. Mais lorsqu'elle
                exploite la pression sociale, les récompenses aléatoires, les streaks
                ou les mécaniques d'urgence, elle peut aussi créer des effets
                indésirables : stress, dépendance, sentiment de manipulation.
              </p>
              <p>
                La frontière entre motivation et coercition est souvent difficile
                à identifier en phase de conception. Ce framework a été conçu pour
                aider les équipes à la repérer avant que le produit soit mis en
                production — pas après.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Fonctionnement ────────────────────────────────────────────────── */}
      <section
        aria-labelledby="fonctionnement-heading"
        className="mx-auto w-full max-w-6xl px-6 py-20"
      >
        <h2
          id="fonctionnement-heading"
          className="mb-12 text-3xl font-semibold text-foreground"
        >
          Comment ça fonctionne
        </h2>
        <ol className="grid gap-5 sm:grid-cols-3">
          {howItWorks.map((step) => (
            <li
              key={step.id}
              className="flex flex-col gap-4 rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.60)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
            >
              <span className="text-3xl font-semibold text-primary/20" aria-hidden="true">
                {step.number}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/70">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Pour qui ──────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="pourqui-heading"
        className="w-full"
        style={{ background: 'rgba(217,208,227,0.25)' }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
            <div className="max-w-xl">
              <h2
                id="pourqui-heading"
                className="mb-5 text-3xl font-semibold text-foreground"
              >
                Pour qui ?
              </h2>
              <div className="flex flex-col gap-4 text-base leading-relaxed text-foreground/80">
                <p>
                  L'outil s'adresse à toute personne impliquée dans la conception
                  ou la validation d'une expérience numérique : designers, développeur·ses,
                  product owners, chef·fes de projet et équipes client.
                </p>
                <p>
                  Le résultat n'est pas une décision finale. Il sert de support
                  de discussion structuré pour aligner l'équipe sur les risques
                  identifiés et les ajustements à envisager avant de concevoir
                  ou de mettre en production.
                </p>
              </div>
            </div>
            <ul aria-label="Profils concernés" className="flex flex-wrap gap-2 lg:max-w-[240px] lg:justify-end">
              {audiences.map(({ label }) => (
                <li key={label}>
                  <span
                    className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-foreground/80"
                    style={{ background: 'rgba(255,255,255,0.65)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="cta-heading"
        className="mx-auto w-full max-w-6xl px-6 py-20"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="cta-heading" className="mb-2 text-2xl font-semibold text-foreground">
              Prêt·e à analyser un projet ?
            </h2>
            <p className="text-base text-foreground/70">
              Le questionnaire prend environ cinq minutes. Aucune inscription requise.
            </p>
          </div>
          <Link
            href="/evaluation"
            className={[
              'inline-flex shrink-0 items-center rounded-xl px-6 py-3 text-sm font-semibold',
              'bg-primary text-primary-foreground transition-opacity hover:opacity-90',
              'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
            ].join(' ')}
          >
            Commencer l'évaluation
          </Link>
        </div>
      </section>
    </div>
  )
}