import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Target, Users, Globe, Gamepad2, Eye, SlidersHorizontal, Timer, Sparkles,
  Check, X,
} from 'lucide-react'
import { VerdictsAccordion } from '@/components/comprendre/VerdictsAccordion'

export const metadata: Metadata = {
  title: 'Comprendre',
  description: `Comprendre la démarche, la logique de l'outil d'évaluation éthique et le rôle limité de l'analyse IA.`,
}

const dimensions = [
  { id: 'objectif',      label: `Objectif de l'expérience`,      text: `Pourquoi intégrer une gamification ? Engagement, apprentissage, conversion, changement de comportement ?`, Icon: Target },
  { id: 'public',        label: 'Public concerné',                text: `À qui s'adresse l'expérience ? Des mineur-es, des personnes vulnérables, des professionnel-les ?`, Icon: Users },
  { id: 'contexte',      label: `Contexte d'utilisation`,         text: `Le projet s'inscrit-il dans un domaine sensible : santé, éducation, finance, ressources humaines ?`, Icon: Globe },
  { id: 'mecaniques',    label: 'Mécaniques envisagées',          text: `Points, badges, classements, streaks, récompenses aléatoires, rareté — chaque mécanique porte ses propres risques.`, Icon: Gamepad2 },
  { id: 'transparence',  label: 'Transparence',                   text: `Les règles du système sont-elles clairement communiquées ? L'utilisateur-rice sait-il ou elle comment fonctionne le système ?`, Icon: Eye },
  { id: 'controle',      label: `Contrôle utilisateur`,           text: `L'utilisateur-rice peut-il ou elle désactiver les mécaniques, masquer sa progression, ou quitter le système ?`, Icon: SlidersHorizontal },
  { id: 'pression',      label: 'Pression temporelle ou sociale', text: `Le système exerce-t-il une pression via des comptes à rebours, des pénalités d'inactivité ou des classements publics ?`, Icon: Timer },
  { id: 'motivation',    label: 'Type de motivation',             text: `Le système cherche-t-il à renforcer une motivation intrinsèque ou à la remplacer par des récompenses externes ?`, Icon: Sparkles },
]

const frameworkSteps = [
  { id: 'reponses',        number: '01', label: 'Réponses',            text: `Vos réponses au questionnaire décrivent le projet selon huit dimensions clés.` },
  { id: 'tags',            number: '02', label: 'Tags',                text: `Chaque réponse peut activer un ou plusieurs tags techniques qui qualifient les risques ou les atouts détectés.` },
  { id: 'regles',          number: '03', label: `Règles de priorité`,  text: `Les tags sont évalués selon des règles explicites. Leur combinaison détermine la gravité globale du profil.` },
  { id: 'verdict',         number: '04', label: 'Verdict',             text: `Un verdict est produit parmi cinq niveaux possibles. Il reflète l'analyse du système, pas une opinion subjective.` },
  { id: 'recommandations', number: '05', label: 'Recommandations',     text: `Chaque tag activé génère une ou plusieurs recommandations concrètes, triées par niveau de priorité.` },
]

const aiDoes = [
  `Elle aide à identifier des angles morts que le questionnaire ne peut pas couvrir en raison de son format structuré.`,
  `Elle propose des questions à poser à l'équipe ou au client pour affiner la compréhension du projet.`,
  `Elle suggère des ajustements UX possibles, en lien avec les risques identifiés par l'outil.`,
]

const aiDoesNot = [
  `Elle ne décide pas du verdict — il est toujours produit par l'outil, avant toute intervention de l'IA.`,
  `Elle ne remplace pas les règles définies dans l'outil ; son rôle est complémentaire, pas substituable.`,
  `Elle ne remplace pas un test utilisateur, une revue juridique ou une décision d'équipe.`,
]

export default function ComprendrePage() {
  return (
    <div className="flex flex-col">

      {/* ── Introduction ──────────────────────────────────────────────────── */}
      <section aria-labelledby="comprendre-heading" className="mx-auto w-full max-w-[68rem] px-6 py-20">
        <div className="max-w-2xl">
          <h1
            id="comprendre-heading"
            className="mb-6 text-4xl font-semibold leading-tight text-foreground md:text-5xl"
          >
            Pourquoi évaluer la gamification
            <br />
            <span className="text-primary">avant de l'intégrer ?</span>
          </h1>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-foreground/80">
            <p>
              La gamification peut rendre une expérience plus engageante,
              encourager l'apprentissage ou soutenir des comportements positifs.
              Mais quand elle est mal conçue, elle peut aussi créer des effets
              indésirables : pression, dépendance, sentiment de manipulation ou
              perte d'autonomie.
            </p>
            <p>
              Ces effets sont rarement intentionnels. Ils résultent souvent de
              décisions de conception prises sans cadre éthique, ou sans recul
              suffisant sur l'impact des mécaniques envisagées. Cet outil aide
              à prendre ce recul avant la conception, pas après.
            </p>
          </div>
        </div>
      </section>

      {/* ── Ce que l'outil évalue ─────────────────────────────────────────── */}
      <section
        aria-labelledby="dimensions-heading"
        className="mx-auto w-full max-w-[62rem] px-6 py-20"
      >
        <h2 id="dimensions-heading" className="mb-3 text-3xl font-semibold text-foreground">
          Ce que l'outil évalue
        </h2>
        <p className="mb-10 max-w-xl text-base leading-relaxed text-foreground/70">
          Le questionnaire couvre huit dimensions clés. Chacune correspond
          à un aspect éthique à considérer lors de la conception d'une
          expérience gamifiée.
        </p>
        <ul className="grid gap-x-8 sm:grid-cols-2">
          {dimensions.map((dim) => (
            <li
              key={dim.id}
              className="flex gap-4 border-b border-border py-5 first:pt-0 sm:[&:nth-child(2)]:pt-0"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                aria-hidden="true"
              >
                <dim.Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-base font-semibold text-foreground">{dim.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/70">{dim.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Comment le verdict est produit ────────────────────────────────── */}
      {/* Section mise en avant : c'est le cœur du framework, elle mérite un
          traitement plus fort que les autres — fond accent + flux relié,
          plutôt qu'une rangée de cartes isolées de plus. */}
      <section aria-labelledby="framework-heading" className="w-full py-4">
        <div className="mx-auto max-w-[66rem] px-6">
          <div className="rounded-[2rem] p-8 sm:p-12" style={{ background: 'rgba(74,45,87,0.05)' }}>
            <div className="mb-10 max-w-2xl">
              <h2 id="framework-heading" className="mb-3 text-3xl font-semibold text-foreground">
                Comment le verdict est produit
              </h2>
              <p className="text-base leading-relaxed text-foreground/70">
                Le verdict ne sort pas d'une intelligence artificielle. Il est
                produit par un système explicite et traçable : chaque étape est
                documentée et les règles sont accessibles.
              </p>
            </div>

            <ol className="mt-2 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-0">
              {frameworkSteps.map((step, index) => (
                <li key={step.id} className="flex flex-1 flex-col items-center gap-3 text-center">
                  <div className="flex w-full items-center">
                    <div
                      className={`hidden h-px flex-1 bg-foreground/15 sm:block ${index === 0 ? 'sm:invisible' : ''}`}
                    />
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>
                    <div
                      className={`hidden h-px flex-1 bg-foreground/15 sm:block ${index === frameworkSteps.length - 1 ? 'sm:invisible' : ''}`}
                    />
                  </div>
                  <div className="max-w-[9rem]">
                    <p className="text-sm font-semibold text-foreground">{step.label}</p>
                    <p className="mt-1 text-xs leading-snug text-foreground/60">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Les verdicts possibles ────────────────────────────────────────── */}
      <section
        aria-labelledby="verdicts-heading"
        className="mx-auto w-full max-w-[62rem] px-6 py-20"
      >
        <h2 id="verdicts-heading" className="mb-3 text-3xl font-semibold text-foreground">
          Les verdicts possibles
        </h2>
        <p className="mb-10 max-w-xl text-base leading-relaxed text-foreground/70">
          L'évaluation produit l'un de ces cinq verdicts, du plus préoccupant
          au plus favorable. Cliquez sur un verdict pour en lire le détail.
        </p>

        <VerdictsAccordion />
      </section>

      {/* ── Rôle de l'IA ─────────────────────────────────────────────────── */}
      {/* Fond légèrement teinté : jusqu'ici la page était entièrement blanche,
          cette section mérite de se distinguer visuellement. */}
      <section aria-labelledby="ia-heading" className="w-full py-4">
        <div className="mx-auto max-w-[62rem] px-6 py-16">
          <div className="max-w-2xl">
            <h2 id="ia-heading" className="mb-3 text-3xl font-semibold text-foreground">
              Le rôle de l'IA
            </h2>
            <p className="mb-10 text-base leading-relaxed text-foreground/70">
              Une analyse IA complémentaire est disponible sur la page résultats.
              Son rôle est strictement limité : elle intervient après l'outil, pas à sa place.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-3xl border border-border bg-white/60 p-6">
              <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--color-positive)]">
                <Check className="h-4 w-4" aria-hidden="true" />
                Ce qu'elle fait
              </p>
              <ul className="flex flex-col gap-4">
                {aiDoes.map((text) => (
                  <li key={text} className="text-sm leading-relaxed text-foreground/80">
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-white/60 p-6">
              <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--color-danger)]">
                <X className="h-4 w-4" aria-hidden="true" />
                Ce qu'elle ne fait pas
              </p>
              <ul className="flex flex-col gap-4">
                {aiDoesNot.map((text) => (
                  <li key={text} className="text-sm leading-relaxed text-foreground/80">
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="cta-comprendre-heading" className="w-full py-4">
        <div className="mx-auto max-w-[56rem] px-6">
          <div
            className="rounded-[2rem] px-8 py-16 text-center sm:px-16"
            style={{ background: 'rgba(74,45,87,0.06)' }}
          >
            <h2 id="cta-comprendre-heading" className="text-3xl font-semibold leading-tight text-foreground md:text-4xl">
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
                href="/principes"
                className={[
                  'inline-flex items-center rounded-xl px-8 py-4 text-base font-semibold text-primary',
                  'transition-all hover:bg-white/60',
                  'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
                ].join(' ')}
                style={{ boxShadow: '0 0 0 1.5px rgba(74,45,87,0.4)' }}
              >
                Voir les principes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}