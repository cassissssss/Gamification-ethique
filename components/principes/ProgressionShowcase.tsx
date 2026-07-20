import { Wifi, Signal, BatteryFull, ArrowRight, Book, ChevronRight } from 'lucide-react'

// Couleurs des 3 principes illustrés dans cet exemple. Pas encore un système
// général (les 8 principes n'ont pas de couleur assignée dans les données) —
// à intégrer à `data/principles.ts` si on généralise cette démonstration
// interactive aux 7 autres fiches.
const PRINCIPLE_COLORS = {
  transparence: { dot: '#7F77DD', text: '#3C3489', ring: '#7F77DD', tint: '#EEEDFE' },
  progression:  { dot: '#378ADD', text: '#0C447C', ring: '#378ADD', tint: '#E6F1FB' },
  autonomie:    { dot: '#639922', text: '#27500A', ring: '#639922', tint: '#EAF3DE' },
} as const

type PrincipleKey = keyof typeof PRINCIPLE_COLORS

function Hotspot({
  principle,
  message,
  children,
  align = 'left',
  tint = false,
}: {
  principle: PrincipleKey
  message: string
  children: React.ReactNode
  align?: 'left' | 'right'
  tint?: boolean
}) {
  const c = PRINCIPLE_COLORS[principle]
  return (
    <div
      className="group/hz relative -m-2 cursor-pointer rounded-lg p-2"
      style={{ '--hz-ring': c.ring, '--hz-tint': tint ? c.tint : 'transparent' } as React.CSSProperties}
    >
      <div
        className={[
          'rounded-lg transition-[box-shadow,background-color] duration-150',
          'group-hover/hz:[background:var(--hz-tint)]',
          'group-hover/hz:[box-shadow:0_0_0_1.5px_var(--hz-ring),0_2px_6px_rgba(0,0,0,.06)]',
        ].join(' ')}
      >
        {children}
      </div>
      <div
        className={[
          'pointer-events-none absolute top-full z-10 mt-2 w-[170px] rounded-xl bg-white p-3 opacity-0 shadow-lg',
          'translate-y-0.5 transition-all duration-150',
          'group-hover/hz:translate-y-0 group-hover/hz:opacity-100',
          align === 'right' ? 'right-0' : 'left-0',
        ].join(' ')}
      >
        <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold" style={{ color: c.text }}>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: c.dot }} />
          {principle === 'transparence' ? 'Transparence' : principle === 'progression' ? 'Progression' : 'Autonomie'}
        </p>
        <p className="text-xs leading-relaxed text-foreground">{message}</p>
      </div>
    </div>
  )
}

function StatusBar() {
  return (
    <div className="mb-5 flex items-center justify-between">
      <span className="text-sm font-medium text-foreground">9:30</span>
      <span className="flex items-center gap-1.5 text-foreground">
        <Wifi className="h-4 w-4" aria-hidden="true" />
        <Signal className="h-4 w-4" aria-hidden="true" />
        <BatteryFull className="h-4 w-4" aria-hidden="true" />
      </span>
    </div>
  )
}

export function ProgressionShowcase() {
  return (
    <div>
      <p className="mb-6 max-w-lg text-sm leading-relaxed text-foreground/70">
        Comparez ces deux versions d&rsquo;une même interface, puis survolez
        leurs éléments pour comprendre ce que change ce principe.
      </p>

      <div className="mb-5 inline-flex items-center gap-3 rounded-full bg-foreground/5 px-3.5 py-1.5 text-xs text-foreground/60">
        {(['transparence', 'progression', 'autonomie'] as const).map((key) => (
          <span key={key} className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: PRINCIPLE_COLORS[key].dot }} />
            {key === 'transparence' ? 'Transparence' : key === 'progression' ? 'Progression' : 'Autonomie'}
          </span>
        ))}
      </div>

      <div className="flex flex-nowrap items-start justify-center gap-6 overflow-x-auto rounded-3xl bg-[rgba(217,208,227,0.4)] px-6 pt-8">

        {/* Interface initiale */}
        <div className="shrink-0">
          <p className="mb-3 text-center text-xs font-medium tracking-wide text-foreground/40">
            Interface initiale
          </p>
          <div className="h-[400px] w-[320px] overflow-hidden rounded-t-[36px] border-[3px] border-b-0 border-primary bg-[#FAF6F0] p-[22px]">
            <StatusBar />
            <p className="mb-4 text-[19px] font-semibold text-foreground">Votre progression</p>

            <Hotspot principle="transparence" message="Progression non quantifiée.">
              <p className="mb-2 text-[15px] font-medium text-foreground">Niveau 7</p>
            </Hotspot>

            <Hotspot principle="transparence" message="Effort restant invisible." align="right">
              <div className="mb-2.5 h-2 w-full overflow-hidden rounded-full bg-primary/10">
                <div className="h-full w-[65%] bg-primary" />
              </div>
            </Hotspot>

            <Hotspot principle="progression" message="Objectif impossible à mesurer.">
              <p className="mb-6 whitespace-nowrap text-[13px] text-foreground/60">Vous y êtes presque !</p>
            </Hotspot>

            <Hotspot principle="autonomie" message="Action suivante non identifiée." tint>
              <button className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
                Continuer <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </Hotspot>
          </div>
        </div>

        <div className="shrink-0 self-center pt-8" aria-hidden="true">
          <ArrowRight className="h-4 w-4 text-foreground/25" />
        </div>

        {/* Application du principe */}
        <div className="shrink-0">
          <p className="mb-3 text-center text-xs font-medium tracking-wide text-foreground/40">
            Application du principe
          </p>
          <div className="h-[400px] w-[320px] overflow-hidden rounded-t-[36px] border-[3px] border-b-0 border-primary bg-[#FAF6F0] p-[22px]">
            <StatusBar />
            <p className="mb-4 text-[19px] font-semibold text-foreground">Votre progression</p>

            <div className="mb-2 flex items-baseline justify-between">
              <span className="whitespace-nowrap text-[15px] font-medium text-foreground">Niveau 7</span>
              <Hotspot principle="transparence" message="Progression quantifiée." align="right">
                <span className="whitespace-nowrap text-[13px] text-foreground/60">230 / 1000 XP</span>
              </Hotspot>
            </div>

            <Hotspot principle="progression" message="Avancement mesurable.">
              <div className="mb-2.5 h-2 w-full overflow-hidden rounded-full bg-primary/10">
                <div className="h-full w-[23%] bg-primary" />
              </div>
            </Hotspot>

            <Hotspot principle="progression" message="Objectif explicite." tint>
              <p className="mb-3.5 whitespace-nowrap text-[13px] text-foreground/60">
                Encore <span className="font-semibold text-primary">770 XP</span> pour atteindre le niveau 8&nbsp;!
              </p>
            </Hotspot>

            <div className="border-t border-border pt-3.5">
              <Hotspot principle="autonomie" message="Prochaine action visible.">
                <p className="mb-2.5 text-sm font-semibold text-foreground">Prochaine étape</p>
              </Hotspot>

              <Hotspot principle="autonomie" message="Action directement accessible." align="right" tint>
                <div className="flex items-center gap-3 whitespace-nowrap rounded-2xl bg-primary/10 p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Book className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[13px] text-foreground">Réaliser le chapitre 5</span>
                    <span className="block text-xs font-medium text-primary">+ 140 XP</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-primary" aria-hidden="true" />
                </div>
              </Hotspot>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
