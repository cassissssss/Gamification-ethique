import Link from 'next/link'
import Image from 'next/image'
import { Flame, TriangleAlert, Clock } from 'lucide-react'
import { ProgressionShowcase } from '@/components/principes/ProgressionShowcase'

const howItWorks = [
  {
    id: 'questionnaire',
    number: '01',
    title: 'Décrivez votre projet',
    text: `Répondez à un questionnaire structuré qui décrit les objectifs de votre projet client-e, son public cible et les mécaniques de gamification envisagées.`,
  },
  {
    id: 'vigilance',
    number: '02',
    title: 'Analysez les résultats',
    text: `L'outil analyse vos réponses afin d'identifier les points de vigilance. Chaque mécanique est évaluée selon 8 principes éprouvés et classée selon son niveau de risque éthique.`,
  },
  {
    id: 'recommandations',
    number: '03',
    title: 'Améliorez votre conception',
    text: `Les recommandations vous aident à améliorer votre conception. Pour aller plus loin, utilisez le prompt IA ou exportez un rapport PDF prêt à être partagé avec vos clients et collaborateurs.`,
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-heading"
        className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-[84rem] items-center px-6 py-16 md:py-20"
      >
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="max-w-2xl">
            <h1
              id="hero-heading"
              className="mb-6 text-4xl font-semibold leading-tight text-foreground md:text-5xl"
            >
              Motiver sans manipuler : <span className="text-primary">la gamification éthique</span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-foreground/80">
              Évaluez les mécaniques de gamification de votre produit numérique 
              afin d'identifier les risques de manipulation et améliorer votre conception.
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

          {/* Illustration du hero */}
          <div className="hidden lg:block">
            <Image
              src="/images/hero-illustration.png"
              alt="Illustration d'une personne tenant un trophée, entourée d'icônes de récompenses XP, étoiles, badges et drapeaux"
              width={1200}
              height={500}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Problème ──────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="probleme-heading"
        className="mx-auto w-full max-w-[62rem] px-6 py-20"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="probleme-heading"
            className="mb-5 text-3xl font-semibold text-foreground"
          >
            Pourquoi une évaluation éthique ?
          </h2>
        </div>

        <div className="mx-auto mt-6 flex max-w-2xl flex-col gap-4 text-left text-base leading-relaxed text-foreground/80">
          <p>
            Aujourd'hui, la gamification est de plus en plus présente dans les applications 
            que nous utilisons quotidiennement. Elle vise avant tout à motiver, engager et fidéliser 
            les utilisateur-rices. Mais certains mécanismes comme la pression sociale, les streaks, 
            ou le sentiment d'urgence, peuvent aussi produire des effets éthiquement discutables.
          </p>
          <p>
            La frontière entre motivation et manipulation n'est pas toujours 
            facile à tracer lors de la conception d'une interface. Cet outil 
            propose une méthode d'évaluation pour aider les équipes à identifier 
            ces risques avant le développement du produit, plutôt qu'à les découvrir 
            une fois le produit en ligne.
          </p>
        </div>
      </section>

      {/* ── Démonstration ─────────────────────────────────────────────────── */}
      {/* Le comparatif interactif promu en section à part entière : c'est la
          preuve que l'outil s'observe et se manipule, pas une documentation
          à lire — répond directement à "en quoi c'est différent d'une
          checklist ?". */}
      <section
        aria-labelledby="demo-heading"
        className="mx-auto w-full max-w-[66rem] px-6 py-20"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="demo-heading"
            className="mb-4 text-3xl font-semibold text-foreground"
          >
            Voyez l'outil à l'œuvre
          </h2>
          <p className="text-base leading-relaxed text-foreground/70">
            Contrairement à une checklist statique, chaque recommandation s'observe
            directement sur une interface. Survolez les éléments pour voir ce qui change.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <ProgressionShowcase compact />
        </div>
      </section>

      {/* ── Fonctionnement ────────────────────────────────────────────────── */}
      <section
        aria-labelledby="fonctionnement-heading"
        className="mx-auto w-full max-w-[66rem] px-6 py-20"
      >
        <h2
          id="fonctionnement-heading"
          className="mb-12 text-center text-3xl font-semibold text-foreground"
        >
          Comment fonctionne l'outil ?
        </h2>
        <ol className="grid gap-5 sm:grid-cols-3">
          {howItWorks.map((step) => (
            <li
              key={step.id}
              className="flex flex-col gap-4 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: 'rgba(255,255,255,0.60)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                aria-hidden="true"
              >
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


      {/* ── Ce que vous obtenez ──────────────────────────────────────────── */}
      {/* Répond à "qu'est-ce que j'obtiens à la fin ?" — l'ancienne carte de
          résultat du hero, mieux à sa place ici comme preuve du livrable. */}
      <section
        aria-labelledby="obtenez-heading"
        className="mx-auto w-full max-w-[66rem] px-6 py-20"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-lg">
            <h2
              id="obtenez-heading"
              className="mb-5 text-3xl font-semibold text-foreground"
            >
              Ce que vous obtenez
            </h2>
            <p className="text-base leading-relaxed text-foreground/80">
              Un diagnostic complet plutôt qu'un score abstrait : un verdict global,
              la répartition des risques par niveau de gravité, et des recommandations
              concrètes classées par priorité pour chaque mécanique évaluée.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="rounded-3xl border border-border bg-white/60 p-6"
          >
            <p className="text-xs font-medium tracking-wide text-foreground/40">
              Aperçu d'un résultat
            </p>

            <div className="mt-3 inline-flex w-fit rounded-full bg-[var(--color-warning)]/10 px-4 py-2 text-sm font-semibold text-[var(--color-warning)]">
              Vigilance élevée avant conception
            </div>

            <div className="mt-5 flex h-2.5 w-full overflow-hidden rounded-full bg-foreground/5">
              <div className="h-full bg-[var(--color-danger)]/60" style={{ width: '13%' }} />
              <div className="h-full bg-[var(--color-warning)]/60" style={{ width: '20%' }} />
              <div className="h-full bg-foreground/20" style={{ width: '67%' }} />
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground/60">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--color-danger)]/60" />
                2 critiques
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--color-warning)]/60" />
                3 élevés
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-foreground/20" />
                10 modérés
              </span>
            </div>

            <div className="mt-5 flex gap-3">
              <div className="rounded-2xl bg-foreground/5 px-4 py-3">
                <p className="text-xl font-semibold text-foreground">5</p>
                <p className="text-xs text-foreground/60">à traiter en priorité</p>
              </div>
              <div className="rounded-2xl bg-foreground/5 px-4 py-3">
                <p className="text-xl font-semibold text-foreground">10</p>
                <p className="text-xs text-foreground/60">à améliorer</p>
              </div>
            </div>

            <div className="mt-6 divide-y divide-border">
              {[
                { label: 'Autonomie et contrôle', className: 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]', level: 'Critique', Icon: Flame },
                { label: 'Comparaison sociale', className: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]', level: 'Élevée', Icon: TriangleAlert },
                { label: 'Pression temporelle', className: 'bg-foreground/5 text-foreground/70', level: 'Modérée', Icon: Clock },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 py-3">
                  <span className="text-sm font-medium text-foreground">{row.label}</span>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${row.className}`}>
                    <row.Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {row.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="cta-heading" className="w-full py-4">
        <div className="mx-auto max-w-[56rem] px-6">
          <div
            className="rounded-[2rem] px-8 py-16 text-center sm:px-16"
            style={{ background: 'rgba(74,45,87,0.06)' }}
          >
            <h2
              id="cta-heading"
              className="text-3xl font-semibold leading-tight text-foreground md:text-4xl"
            >
              Évaluez votre projet
              <br />
              en 15 minutes maximum
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-foreground/70">
              Obtenez un diagnostic détaillé et des recommandations concrètes pour
              améliorer votre conception. Aucune inscription requise.
            </p>
            <Link
              href="/evaluation"
              className={[
                'mt-8 inline-flex items-center rounded-xl px-8 py-4 text-base font-semibold',
                'bg-primary text-primary-foreground transition-opacity hover:opacity-90',
                'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
              ].join(' ')}
            >
              Commencer l'évaluation
            </Link>
            <p className="mt-6 text-xs text-foreground/40">
              Développé dans le cadre d'un Travail de Bachelor à la HEIG-VD, sur la
              base de recherches en psychologie de la motivation (Deci &amp; Ryan, Pink).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}