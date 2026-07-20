// Couleurs des principes utilisées dans les hotspots interactifs. Système
// provisoire (les 8 principes n'ont pas de couleur assignée dans les
// données) — à déplacer dans `data/principles.ts` si on généralise à
// davantage de fiches.
export const PRINCIPLE_COLORS = {
  transparence:        { dot: '#7F77DD', text: '#3C3489', ring: '#7F77DD', tint: '#EEEDFE', label: 'Transparence' },
  progression:         { dot: '#378ADD', text: '#0C447C', ring: '#378ADD', tint: '#E6F1FB', label: 'Progression' },
  autonomie:           { dot: '#639922', text: '#27500A', ring: '#639922', tint: '#EAF3DE', label: 'Autonomie' },
  'rarete-urgence':    { dot: '#E8873A', text: '#8A4A0F', ring: '#E8873A', tint: '#FBEEE0', label: 'Rareté et urgence' },
  feedback:            { dot: '#159C8C', text: '#0B564D', ring: '#159C8C', tint: '#DEF3F0', label: 'Feedback' },
  recompenses:         { dot: '#D1568C', text: '#7A2F52', ring: '#D1568C', tint: '#FBE7EF', label: 'Récompenses et motivation' },
  'comparaison-sociale': { dot: '#C9A227', text: '#6E5613', ring: '#C9A227', tint: '#F7EFD6', label: 'Comparaison sociale' },
  'choix-contraint':   { dot: '#C94040', text: '#7A2626', ring: '#C94040', tint: '#FBE6E6', label: 'Choix contraint' },
} as const

export type PrincipleKey = keyof typeof PRINCIPLE_COLORS

/** Petite pastille de légende, une par principe illustré dans un mockup. */
export function PrincipleLegend({ keys }: { keys: PrincipleKey[] }) {
  return (
    <div className="mb-5 inline-flex items-center gap-3 rounded-full bg-foreground/5 px-3.5 py-1.5 text-xs text-foreground/60">
      {keys.map((key) => (
        <span key={key} className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: PRINCIPLE_COLORS[key].dot }} />
          {PRINCIPLE_COLORS[key].label}
        </span>
      ))}
    </div>
  )
}

/**
 * Zone survolable d'un mockup : met en évidence l'élément inspecté (bordure
 * + fond teinté, couleur du principe) et affiche une courte explication en
 * popover. Aucune pastille visible au repos — l'élément lui-même réagit.
 */
export function Hotspot({
  principle,
  message,
  children,
  align = 'left',
  direction = 'down',
  tint = false,
}: {
  principle: PrincipleKey
  message: string
  children: React.ReactNode
  align?: 'left' | 'right'
  direction?: 'down' | 'up'
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
          'pointer-events-none absolute z-10 w-[200px] rounded-xl bg-white p-3 opacity-0 shadow-lg',
          'transition-all duration-150',
          direction === 'up' ? 'bottom-full mb-2 translate-y-1' : 'top-full mt-2 translate-y-0.5',
          'group-hover/hz:translate-y-0 group-hover/hz:opacity-100',
          align === 'right' ? 'right-0' : 'left-0',
        ].join(' ')}
      >
        <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold" style={{ color: c.text }}>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: c.dot }} />
          {c.label}
        </p>
        <p className="text-xs leading-relaxed text-foreground">{message}</p>
      </div>
    </div>
  )
}
