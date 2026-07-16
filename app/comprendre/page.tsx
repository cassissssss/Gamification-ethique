import type { Metadata } from 'next'
import Link from 'next/link'
import { verdicts } from '@/data/verdicts'
import type { VerdictTone } from '@/types/principle'

export const metadata: Metadata = {
  title: 'Comprendre',
  description: `Comprendre la démarche, la logique du framework d'évaluation éthique et le rôle limité de l'analyse IA.`,
}

const dimensions = [
  { id: 'objectif',      label: `Objectif de l'expérience`,      text: `Pourquoi intégrer une gamification ? Engagement, apprentissage, conversion, changement de comportement ?` },
  { id: 'public',        label: 'Public concerné',                text: `À qui s'adresse l'expérience ? Des mineur-es, des personnes vulnérables, des professionnel-les ?` },
  { id: 'contexte',      label: `Contexte d'utilisation`,         text: `Le projet s'inscrit-il dans un domaine sensible : santé, éducation, finance, ressources humaines ?` },
  { id: 'mecaniques',    label: 'Mécaniques envisagées',          text: `Points, badges, classements, streaks, récompenses aléatoires, rareté — chaque mécanique porte ses propres risques.` },
  { id: 'transparence',  label: 'Transparence',                   text: `Les règles du système sont-elles clairement communiquées ? L'utilisateur-rice sait-il ou elle comment fonctionne le système ?` },
  { id: 'controle',      label: `Contrôle utilisateur`,           text: `L'utilisateur-rice peut-il ou elle désactiver les mécaniques, masquer sa progression, ou quitter le système ?` },
  { id: 'pression',      label: 'Pression temporelle ou sociale', text: `Le système exerce-t-il une pression via des comptes à rebours, des pénalités d'inactivité ou des classements publics ?` },
  { id: 'motivation',    label: 'Type de motivation',             text: `Le système cherche-t-il à renforcer une motivation intrinsèque ou à la remplacer par des récompenses externes ?` },
]

const frameworkSteps = [
  { id: 'reponses',        number: '01', label: 'Réponses',            text: `Vos réponses au questionnaire décrivent le projet selon huit dimensions clés.` },
  { id: 'tags',            number: '02', label: 'Tags',                text: `Chaque réponse peut activer un ou plusieurs tags techniques qui qualifient les risques ou les atouts détectés.` },
  { id: 'regles',          number: '03', label: `Règles de priorité`,  text: `Les tags sont évalués selon des règles explicites. Leur combinaison détermine la gravité globale du profil.` },
  { id: 'verdict',         number: '04', label: 'Verdict',             text: `Un verdict est produit parmi cinq niveaux possibles. Il reflète l'analyse du système, pas une opinion subjective.` },
  { id: 'recommandations', number: '05', label: 'Recommandations',     text: `Chaque tag activé génère une ou plusieurs recommandations concrètes, triées par niveau de priorité.` },
]

const aiPoints = [
  { id: 'no-verdict',   text: `Elle ne décide pas du verdict. Le verdict est toujours produit par le framework, avant toute intervention de l'IA.` },
  { id: 'no-replace',   text: `Elle ne remplace pas les règles définies dans l'outil. Son rôle est complémentaire, pas substituable.` },
  { id: 'blind-spots',  text: `Elle aide à identifier des angles morts que le questionnaire ne peut pas couvrir en raison de son format structuré.` },
  { id: 'questions',    text: `Elle propose des questions à poser à l'équipe ou au client pour affiner la compréhension du projet.` },
  { id: 'ux',           text: `Elle suggère des ajustements UX possibles, en lien avec les risques identifiés par le framework.` },
]

const toneBorder: Record<VerdictTone, string> = {
  neutral:  'rgba(74,45,87,0.2)',
  positive: 'rgba(45,106,79,0.3)',
  warning:  'rgba(181,98,10,0.3)',
  danger:   'rgba(139,26,26,0.3)',
  info:     'rgba(26,74,110,0.3)',
}

const toneBg: Record<VerdictTone, string> = {
  neutral:  'rgba(231,225,218,0.5)',
  positive: 'rgba(45,106,79,0.07)',
  warning:  'rgba(181,98,10,0.07)',
  danger:   'rgba(139,26,26,0.07)',
  info:     'rgba(26,74,110,0.07)',
}

const toneColor: Record<VerdictTone, string> = {
  neutral:  '#4A2D57',
  positive: 'var(--color-positive)',
  warning:  'var(--color-warning)',
  danger:   'var(--color-danger)',
  info:     'var(--color-info)',
}

export default function ComprendrePage() {
  return (
    <div className="flex flex-col">

      {/* ── Introduction ──────────────────────────────────────────────────── */}
      <section aria-labelledby="comprendre-heading" className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-primary/60">
            Comprendre la démarche
          </p>
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
        className="w-full"
        style={{ background: 'rgba(231,225,218,0.4)' }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 id="dimensions-heading" className="mb-3 text-3xl font-semibold text-foreground">
            Ce que l'outil évalue
          </h2>
          <p className="mb-12 max-w-xl text-base leading-relaxed text-foreground/70">
            Le questionnaire couvre huit dimensions clés. Chacune correspond
            à un aspect éthique à considérer lors de la conception d'une
            expérience gamifiée.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dimensions.map((dim) => (
              <li
                key={dim.id}
                className="flex flex-col gap-2 rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.65)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              >
                <p className="text-base font-semibold text-primary">{dim.label}</p>
                <p className="text-sm leading-relaxed text-foreground/70">{dim.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Comment le verdict est produit ────────────────────────────────── */}
      <section aria-labelledby="framework-heading" className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="max-w-2xl mb-12">
          <h2 id="framework-heading" className="mb-3 text-3xl font-semibold text-foreground">
            Comment le verdict est produit
          </h2>
          <p className="text-base leading-relaxed text-foreground/70">
            Le verdict ne sort pas d'une intelligence artificielle. Il est
            produit par un système explicite et traçable : chaque étape est
            documentée et les règles sont accessibles.
          </p>
        </div>
        <ol className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-3">
          {frameworkSteps.map((step, index) => (
            <li
              key={step.id}
              className="flex flex-1 flex-col gap-3 rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.60)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold text-primary/20" aria-hidden="true">
                  {step.number}
                </span>
                {index < frameworkSteps.length - 1 && (
                  <span className="ml-auto hidden text-foreground/20 sm:inline" aria-hidden="true">→</span>
                )}
              </div>
              <p className="text-base font-semibold text-foreground">{step.label}</p>
              <p className="text-sm leading-relaxed text-foreground/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Les verdicts possibles ────────────────────────────────────────── */}
      <section
        aria-labelledby="verdicts-heading"
        className="w-full"
        style={{ background: 'rgba(217,208,227,0.25)' }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 id="verdicts-heading" className="mb-3 text-3xl font-semibold text-foreground">
            Les verdicts possibles
          </h2>
          <p className="mb-12 max-w-xl text-base leading-relaxed text-foreground/70">
            L'évaluation produit l'un de ces cinq verdicts, selon la
            combinaison de risques et d'atouts détectés dans vos réponses.
          </p>
          <ul className="flex flex-col gap-4">
            {verdicts.map((verdict) => (
              <li
                key={verdict.level}
                className="flex flex-col gap-2 rounded-2xl p-5 sm:flex-row sm:items-start sm:gap-6"
                style={{
                  background: toneBg[verdict.tone],
                  boxShadow:  `0 0 0 1px ${toneBorder[verdict.tone]}`,
                }}
              >
                <p
                  className="shrink-0 text-base font-semibold sm:w-56"
                  style={{ color: toneColor[verdict.tone] }}
                >
                  {verdict.label}
                </p>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {verdict.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Rôle de l'IA ─────────────────────────────────────────────────── */}
      <section aria-labelledby="ia-heading" className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
          <div>
            <h2 id="ia-heading" className="mb-3 text-3xl font-semibold text-foreground">
              Le rôle de l'IA
            </h2>
            <p className="mb-8 max-w-lg text-base leading-relaxed text-foreground/70">
              Une analyse IA complémentaire est disponible sur la page résultats.
              Son rôle est strictement limité : elle intervient après le framework, pas à sa place.
            </p>
            <ul className="flex flex-col gap-3">
              {aiPoints.map((point) => (
                <li
                  key={point.id}
                  className="flex gap-4 rounded-xl p-4"
                  style={{ background: 'rgba(255,255,255,0.55)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
                >
                  <span className="mt-0.5 shrink-0 text-primary" aria-hidden="true">↳</span>
                  <p className="text-sm leading-relaxed text-foreground/80">{point.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <aside
            aria-label="Rappel sur la logique du système"
            className="flex flex-col gap-4 self-start rounded-2xl p-6"
            style={{ background: 'rgba(231,225,218,0.5)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
          >
            <p className="text-base font-semibold text-primary">Ce que l'IA ne fait pas</p>
            <div className="flex flex-col gap-3 text-sm leading-relaxed text-foreground/80">
              <p>
                L'IA ne modifie pas le verdict produit par le framework.
                Elle ne remplace pas un test utilisateur, une revue juridique
                ou une décision d'équipe.
              </p>
              <p>
                Elle est utile pour approfondir les résultats, formuler des
                questions à poser ou explorer des dimensions que le
                questionnaire ne couvre pas directement.
              </p>
              <p>
                Si vous n'avez pas configuré de clé API, l'analyse simulée
                permet de tester l'interface sans activer de service externe.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="cta-comprendre-heading"
        className="w-full"
        style={{ background: 'rgba(231,225,218,0.4)' }}
      >
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="cta-comprendre-heading" className="mb-2 text-2xl font-semibold text-foreground">
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
                href="/principes"
                className={[
                  'inline-flex items-center rounded-xl px-6 py-3 text-sm font-semibold text-primary',
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