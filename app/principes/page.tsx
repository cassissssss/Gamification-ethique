import type { Metadata } from 'next'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  Eye,  Unlock,  TrendingUp,  MessageCircle,  Gift,  Users,  Zap,  Scale, 
  Flame,  CircleCheck,  ArrowDown, 
} from 'lucide-react'
import { principles } from '@/data/principles'
import { PrincipleCard } from '@/components/principes/PrincipleCard'

export const metadata: Metadata = {
  title: 'Principes', 
  description: `Les huit principes d'une gamification éthique qui servent de repères concrets pour la conception et les recommandations.`, 
}

const PRINCIPLE_ICONS: Record<string,  LucideIcon> = {
  'transparence':          Eye, 
  'autonomie':             Unlock, 
  'progression':           TrendingUp, 
  'feedback':              MessageCircle, 
  'recompenses':           Gift, 
  'comparaison-sociale':   Users, 
  'rarete-urgence':        Zap, 
  'choix-contraint':       Scale, 
}

// Exemple concret tiré des données réelles du principe (pas un exemple
// inventé), répond au manque de preuves relevé sur cette page.
const exampleSlug = 'rarete-urgence'
const examplePrinciple = principles.find((p) => p.slug === exampleSlug)!

export default function PrincipesPage() {
  return (
    <div className="flex flex-col">

      {/* ── Introduction ──────────────────────────────────────────────────── */}
      <section aria-labelledby="principes-heading" className="mx-auto w-full max-w-[68rem] px-6 py-20">
        <div className="max-w-2xl">
          <h1
            id="principes-heading"
            className="mb-6 text-4xl font-semibold leading-tight text-foreground md:text-5xl"
          >
            Les principes d'une
            <br />
            <span className="text-primary">gamification éthique</span>
          </h1>
          <p className="text-base leading-relaxed text-foreground/80">
            Les huit principes ci-dessous constituent le cadre éthique utilisé
            par le framework pour analyser les mécaniques de gamification et
            formuler ses recommandations. Chacun relie un risque identifié à
            un repère concret de conception.
          </p>
        </div>
      </section>

      {/* ── Liste des principes ──────────────────────────────────────────── */}
      <section aria-labelledby="grille-heading" className="mx-auto w-full max-w-[68rem] px-6 py-16">
        <h2 id="grille-heading" className="sr-only">Liste des principes</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principe) => (
            <li key={principe.slug} className="h-full">
              <PrincipleCard principe={principe} Icon={PRINCIPLE_ICONS[principe.slug] ?? Eye} />
            </li>
          ))}
        </ul>
      </section>

      {/* ── Exemple concret ───────────────────────────────────────────────── */}
      {/* Répond au manque de preuves de la page : montre comment un principe
          se traduit concrètement,  avec le vrai contenu du principe choisi. */}
      <section aria-labelledby="exemple-heading" className="mx-auto w-full max-w-[62rem] px-6 py-16">
        <div className="max-w-2xl">
          <h2 id="exemple-heading" className="mb-3 text-3xl font-semibold text-foreground">
            Un principe,  en pratique
          </h2>
          <p className="mb-10 text-base leading-relaxed text-foreground/70">
            Voici comment le principe « {examplePrinciple.title} » se traduit
            concrètement dans une interface.
          </p>
        </div>

        <div className="max-w-md rounded-3xl border border-border bg-white/60 p-6">
          <p className="mb-4 text-xs font-medium tracking-wide text-foreground/40">
            {examplePrinciple.title}
          </p>
          <div className="flex flex-col items-center gap-2">
            <div className="w-full rounded-2xl bg-[var(--color-danger)]/5 p-4">
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[var(--color-danger)]">
                <Flame className="h-3.5 w-3.5" aria-hidden="true" />
                À éviter
              </p>
              <p className="text-sm leading-relaxed text-foreground/80">
                « {examplePrinciple.avoid[0]} »
              </p>
            </div>

            <ArrowDown className="h-4 w-4 shrink-0 text-foreground/30" aria-hidden="true" />

            <div className="w-full rounded-2xl bg-[var(--color-positive)]/5 p-4">
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[var(--color-positive)]">
                <CircleCheck className="h-3.5 w-3.5" aria-hidden="true" />
                À privilégier
              </p>
              <p className="text-sm leading-relaxed text-foreground/80">
                « {examplePrinciple.goodPractices[0]} »
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pourquoi ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="pourquoi-heading" className="mx-auto w-full max-w-[62rem] px-6 py-16">
        <div className="max-w-2xl">
          <h2 id="pourquoi-heading" className="mb-5 text-3xl font-semibold text-foreground">
            Pourquoi ces principes ?
          </h2>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-foreground/80">
            <p>
              Ces principes ne sont pas des règles absolues à suivre à la
              lettre. Ils servent de repères pour nommer les risques,  arbitrer
              les choix d'interface et justifier les recommandations auprès
              d'une équipe ou d'un client.
            </p>
            <p>
              Les principes sont aussi utiles en dehors de l'outil : ils peuvent
              servir de base pour une revue de conception,  un brief client ou
              une discussion en équipe sur les compromis à faire.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="cta-principes-heading" className="w-full py-4">
        <div className="mx-auto max-w-[56rem] px-6">
          <div
            className="rounded-[2rem] px-8 py-16 text-center sm:px-16"
            style={{ background: 'rgba(74, 45, 87, 0.06)' }}
          >
            <h2
              id="cta-principes-heading"
              className="text-3xl font-semibold leading-tight text-foreground md:text-4xl"
            >
              Prêt-e à évaluer
              <br />
              votre projet ?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-foreground/70">
              Chaque recommandation générée par l'outil est reliée à l'un
              de ces huit principes.
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