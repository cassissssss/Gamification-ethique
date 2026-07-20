import type { LucideIcon } from 'lucide-react'
import {
  Flame,
  CircleCheck,
  ArrowDown,
  Award,
  Calendar,
  PartyPopper,
  Gift,
  Trophy,
} from 'lucide-react'

// ─── Petits primitifs d'UI factice, réutilisés dans les mockups ──────────────

function MockScreen({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl bg-white p-3 shadow-sm">{children}</div>
}

function MockHeader({ Icon, label }: { Icon: LucideIcon; label: string }) {
  return (
    <div className="mb-1.5 flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-foreground/50" aria-hidden="true" />
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </div>
  )
}

function MockButton({ children, primary = true }: { children: React.ReactNode; primary?: boolean }) {
  return (
    <span
      className={[
        'mt-2 inline-flex w-full items-center justify-center rounded-lg py-1.5 text-xs font-semibold',
        primary ? 'bg-primary text-primary-foreground' : 'border border-border text-foreground/70',
      ].join(' ')}
    >
      {children}
    </span>
  )
}

function MockToggle({ on }: { on: boolean }) {
  return (
    <span
      className={`inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 ${on ? 'bg-primary/50' : 'bg-foreground/15'}`}
      aria-hidden="true"
    >
      <span className={`h-4 w-4 rounded-full bg-white shadow ${on ? 'ml-auto' : ''}`} />
    </span>
  )
}

// ─── Contenu spécifique par principe ──────────────────────────────────────────
// Chaque mockup illustre le composant d'interface le plus représentatif du
// principe (popup, toggle, barre de progression, classement, dialogue...).

const EXAMPLES: Record<string, { avoid: React.ReactNode; prefer: React.ReactNode }> = {

  'transparence': {
    avoid: (
      <MockScreen>
        <MockHeader Icon={Award} label="Badge débloqué !" />
        <MockButton>OK</MockButton>
      </MockScreen>
    ),
    prefer: (
      <MockScreen>
        <MockHeader Icon={Award} label={`Badge « Régulier » débloqué`} />
        <p className="text-xs leading-relaxed text-foreground/50">
          Obtenu après 7 jours consécutifs de pratique.
        </p>
        <MockButton primary={false}>Voir mes badges</MockButton>
      </MockScreen>
    ),
  },

  'autonomie': {
    avoid: (
      <MockScreen>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-foreground">Rappels quotidiens</p>
            <p className="text-xs text-foreground/50">Ne peut pas être désactivé</p>
          </div>
          <MockToggle on />
        </div>
      </MockScreen>
    ),
    prefer: (
      <MockScreen>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-foreground">Rappels quotidiens</p>
            <p className="text-xs text-foreground/50">Modifiable à tout moment</p>
          </div>
          <MockToggle on={false} />
        </div>
      </MockScreen>
    ),
  },

  'progression': {
    avoid: (
      <MockScreen>
        <p className="mb-1.5 text-xs font-semibold text-foreground">Niveau 12 → 13</p>
        <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/10">
          <div className="h-full rounded-full bg-primary/50" style={{ width: '18%' }} />
        </div>
        <p className="mt-1.5 text-xs text-foreground/50">180 / 900 XP — encore 15 actions</p>
      </MockScreen>
    ),
    prefer: (
      <MockScreen>
        <p className="mb-1.5 text-xs font-semibold text-foreground">Module 3 sur 5</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`h-2 flex-1 rounded-full ${i <= 3 ? 'bg-primary/50' : 'bg-foreground/10'}`}
            />
          ))}
        </div>
        <p className="mt-1.5 text-xs text-foreground/50">Encore 2 modules à terminer</p>
      </MockScreen>
    ),
  },

  'feedback': {
    avoid: (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 rounded-lg bg-white p-2 shadow-sm">
          <PartyPopper className="h-3.5 w-3.5 text-foreground/50" aria-hidden="true" />
          <span className="text-xs font-semibold text-foreground">Bravo !!!</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-white p-2 shadow-sm">
          <PartyPopper className="h-3.5 w-3.5 text-foreground/50" aria-hidden="true" />
          <span className="text-xs font-semibold text-foreground">Incroyable !!!</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-white p-2 shadow-sm">
          <PartyPopper className="h-3.5 w-3.5 text-foreground/50" aria-hidden="true" />
          <span className="text-xs font-semibold text-foreground">Tu es un champion !!!</span>
        </div>
      </div>
    ),
    prefer: (
      <MockScreen>
        <div className="flex items-center gap-2">
          <CircleCheck className="h-4 w-4 text-[var(--color-positive)]" aria-hidden="true" />
          <span className="text-sm font-medium text-foreground">Enregistré</span>
        </div>
      </MockScreen>
    ),
  },

  'recompenses': {
    avoid: (
      <MockScreen>
        <div className="mb-2 flex items-center gap-3">
          <Gift className="h-5 w-5 shrink-0 text-foreground/50" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-foreground">Boîte mystère disponible</p>
            <p className="text-xs text-foreground/50">Contenu aléatoire</p>
          </div>
        </div>
        <MockButton>Ouvrir</MockButton>
      </MockScreen>
    ),
    prefer: (
      <MockScreen>
        <div className="flex items-center gap-3">
          <Trophy className="h-5 w-5 shrink-0 text-foreground/50" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-foreground">Badge Expert débloqué</p>
            <p className="text-xs text-foreground/50">10 exercices réussis</p>
          </div>
        </div>
      </MockScreen>
    ),
  },

  'comparaison-sociale': {
    avoid: (
      <MockScreen>
        <p className="mb-2 text-xs font-semibold text-foreground">Classement mondial</p>
        <div className="flex flex-col gap-1.5 text-xs text-foreground/60">
          <div className="flex justify-between">
            <span>1. Alex99</span>
            <span>45 320 pts</span>
          </div>
          <div className="flex justify-between font-semibold text-foreground">
            <span>8 542e — Vous</span>
            <span>210 pts</span>
          </div>
        </div>
      </MockScreen>
    ),
    prefer: (
      <MockScreen>
        <p className="mb-1 text-xs font-semibold text-foreground">Votre progression</p>
        <p className="text-sm font-semibold text-[var(--color-positive)]">+12 % cette semaine</p>
        <p className="text-xs text-foreground/50">Par rapport à votre moyenne personnelle</p>
      </MockScreen>
    ),
  },

  'rarete-urgence': {
    avoid: (
      <MockScreen>
        <MockHeader Icon={Flame} label="Offre limitée" />
        <p className="text-sm font-semibold text-[var(--color-danger)]">Plus que 08:32</p>
        <p className="mb-1 text-xs text-foreground/50">Votre série sera perdue.</p>
        <MockButton>Continuer</MockButton>
      </MockScreen>
    ),
    prefer: (
      <MockScreen>
        <MockHeader Icon={Calendar} label="Événement de la semaine" />
        <p className="text-sm font-medium text-foreground">Disponible jusqu'au 25 juillet</p>
        <p className="mb-1 text-xs text-foreground/50">Vous pourrez reprendre plus tard.</p>
        <MockButton primary={false}>Participer</MockButton>
      </MockScreen>
    ),
  },

  'choix-contraint': {
    avoid: (
      <MockScreen>
        <p className="mb-3 text-sm font-semibold text-foreground">Recevoir des notifications ?</p>
        <div className="flex flex-col items-stretch gap-2">
          <MockButton>Autoriser</MockButton>
          <span className="text-center text-[10px] text-foreground/30 underline">non merci</span>
        </div>
      </MockScreen>
    ),
    prefer: (
      <MockScreen>
        <p className="mb-3 text-sm font-semibold text-foreground">Recevoir des notifications ?</p>
        <div className="flex gap-2">
          <span className="flex-1">
            <MockButton>Autoriser</MockButton>
          </span>
          <span className="flex-1">
            <MockButton primary={false}>Refuser</MockButton>
          </span>
        </div>
      </MockScreen>
    ),
  },
}

export function PrincipleExample({ slug }: { slug: string }) {
  const example = EXAMPLES[slug]
  if (!example) return null

  return (
    <div className="max-w-md rounded-3xl border border-border bg-white/60 p-6">
      <div className="flex flex-col items-center gap-2">
        <div className="w-full rounded-2xl bg-[var(--color-danger)]/5 p-4">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--color-danger)]">
            <Flame className="h-3.5 w-3.5" aria-hidden="true" />
            À éviter
          </p>
          {example.avoid}
        </div>

        <ArrowDown className="h-4 w-4 shrink-0 text-foreground/30" aria-hidden="true" />

        <div className="w-full rounded-2xl bg-[var(--color-positive)]/5 p-4">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--color-positive)]">
            <CircleCheck className="h-3.5 w-3.5" aria-hidden="true" />
            À privilégier
          </p>
          {example.prefer}
        </div>
      </div>
    </div>
  )
}
