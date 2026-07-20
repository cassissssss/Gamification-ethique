import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import type { Principe } from '@/types/principle'

interface PrincipleCardProps {
  principe: Principe
  Icon: LucideIcon
}

export function PrincipleCard({ principe,  Icon }: PrincipleCardProps) {
  return (
    <Link
      href={`/principes/${principe.slug}`}
      className={[
        'group flex h-full flex-col gap-3 rounded-2xl p-5', 
        'bg-white/60 shadow-sm', 
        'transition-all duration-150 hover:bg-white/90 hover:shadow-md', 
        'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary', 
      ].join(' ')}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
        aria-hidden="true"
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <h2 className="text-base font-semibold text-foreground">
        {principe.title}
      </h2>
      <p className="min-h-[4.75rem] flex-1 text-sm leading-relaxed text-foreground/70">
        {principe.shortDescription}
      </p>
      <span
        className="inline-flex items-center gap-1 text-sm font-semibold text-primary/70 transition-colors group-hover:text-primary"
        aria-hidden="true"
      >
        Voir le détail →
      </span>
    </Link>
  )
}