import Link from 'next/link'
import type { Principe } from '@/types'

interface PrincipleCardProps {
  principe: Principe
}

export function PrincipleCard({ principe }: PrincipleCardProps) {
  return (
    <Link
      href={`/principes/${principe.slug}`}
      className={[
        'group flex flex-col gap-4 rounded-2xl p-6',
        'bg-white/60 shadow-sm',
        'transition-all duration-150 hover:bg-white/90 hover:shadow-md',
        'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
      ].join(' ')}
    >
      <h2 className="text-base font-semibold text-primary">
        {principe.title}
      </h2>
      <p className="flex-1 text-sm leading-relaxed text-foreground/80">
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