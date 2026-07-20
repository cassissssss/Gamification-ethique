import type { VerdictLevel,  VerdictTone } from '@/types/principle'
import { verdicts } from '@/data/verdicts'

interface VerdictProps {
  level: VerdictLevel
}

interface ToneStyle {
  background: string
  ring:       string
  textColor:  string
}

const toneStyles: Record<VerdictTone,  ToneStyle> = {
  neutral: {
    background: 'rgba(231, 225, 218, 0.6)', 
    ring:       'rgba(74, 45, 87, 0.2)', 
    textColor:  '#4A2D57', 
  }, 
  positive: {
    background: 'rgba(45, 106, 79, 0.08)', 
    ring:       'rgba(45, 106, 79, 0.3)', 
    textColor:  'var(--color-positive)', 
  }, 
  warning: {
    background: 'rgba(181, 98, 10, 0.08)', 
    ring:       'rgba(181, 98, 10, 0.3)', 
    textColor:  'var(--color-warning)', 
  }, 
  danger: {
    background: 'rgba(139, 26, 26, 0.08)', 
    ring:       'rgba(139, 26, 26, 0.3)', 
    textColor:  'var(--color-danger)', 
  }, 
  info: {
    background: 'rgba(26, 74, 110, 0.08)', 
    ring:       'rgba(26, 74, 110, 0.3)', 
    textColor:  'var(--color-info)', 
  }, 
}

export function Verdict({ level }: VerdictProps) {
  const definition = verdicts.find((v) => v.level === level)
  if (!definition) return null

  const { background,  ring,  textColor } = toneStyles[definition.tone]

  return (
    <div
      role="status"
      aria-label={`Verdict : ${definition.label}`}
      className="rounded-2xl p-6"
      style={{
        background, 
        boxShadow: `0 0 0 1.5px ${ring},  0 2px 10px rgba(0, 0, 0, 0.05)`, 
      }}
    >
      <p
        className="mb-1 text-xs font-semibold uppercase tracking-widest"
        style={{ color: textColor }}
      >
        Verdict
      </p>
      <p
        className="mb-3 text-2xl font-semibold"
        style={{ color: textColor }}
      >
        {definition.label}
      </p>
      <p className="text-base leading-relaxed text-foreground/80">
        {definition.description}
      </p>
    </div>
  )
}