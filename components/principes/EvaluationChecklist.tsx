'use client'

import { useState } from 'react'
import { BadgeCheck, CircleOff } from 'lucide-react'

interface EvaluationChecklistProps {
  goodPractices: string[]
  avoid: string[]
}

function ChecklistColumn({
  title,
  Icon,
  iconColor,
  items,
  checked,
  onToggle,
  tone,
}: {
  title: string
  Icon: typeof BadgeCheck
  iconColor: string
  items: string[]
  checked: boolean[]
  onToggle: (index: number) => void
  tone: 'positive' | 'warning'
}) {
  const count = checked.filter(Boolean).length

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" style={{ color: iconColor }} />
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40">
            {title}
          </p>
        </div>
        {count > 0 && (
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
            style={
              tone === 'positive'
                ? { background: 'rgba(74,45,87,0.1)', color: 'var(--primary)' }
                : { background: 'rgba(181,98,10,0.12)', color: 'var(--color-warning)' }
            }
          >
            {count}/{items.length}
          </span>
        )}
      </div>
      <ul className="flex flex-col gap-3">
        {items.map((item, index) => (
          <li key={index}>
            <label
              className={[
                'flex cursor-pointer items-start gap-3 rounded-2xl p-4 transition-colors',
                checked[index] ? '' : 'hover:bg-white/40',
              ].join(' ')}
              style={
                tone === 'positive'
                  ? {
                      background: checked[index] ? 'rgba(74,45,87,0.08)' : 'rgba(255,255,255,0.65)',
                      boxShadow: checked[index] ? '0 0 0 1px rgba(74,45,87,0.25)' : '0 1px 3px rgba(0,0,0,0.05)',
                    }
                  : {
                      background: checked[index] ? 'rgba(181,98,10,0.14)' : 'rgba(181,98,10,0.06)',
                      boxShadow: checked[index] ? '0 0 0 1px rgba(181,98,10,0.4)' : '0 0 0 1px rgba(181,98,10,0.15)',
                    }
              }
            >
              <input
                type="checkbox"
                checked={checked[index]}
                onChange={() => onToggle(index)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
              />
              <p className="text-sm leading-relaxed text-foreground/80">{item}</p>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function EvaluationChecklist({ goodPractices, avoid }: EvaluationChecklistProps) {
  const [goodChecked, setGoodChecked] = useState<boolean[]>(() => goodPractices.map(() => false))
  const [avoidChecked, setAvoidChecked] = useState<boolean[]>(() => avoid.map(() => false))

  const toggleGood = (index: number) =>
    setGoodChecked((prev) => prev.map((v, i) => (i === index ? !v : v)))
  const toggleAvoid = (index: number) =>
    setAvoidChecked((prev) => prev.map((v, i) => (i === index ? !v : v)))

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <ChecklistColumn
        title="Signaux positifs"
        Icon={BadgeCheck}
        iconColor="var(--primary)"
        items={goodPractices}
        checked={goodChecked}
        onToggle={toggleGood}
        tone="positive"
      />
      <ChecklistColumn
        title="Signaux d'alerte"
        Icon={CircleOff}
        iconColor="var(--color-warning)"
        items={avoid}
        checked={avoidChecked}
        onToggle={toggleAvoid}
        tone="warning"
      />
    </div>
  )
}
