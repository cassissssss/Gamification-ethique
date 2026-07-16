import type { Tag } from '@/types/principle'
import { tagDefinitions } from '@/data/tags'

interface TagListProps {
  tags: Tag[]
}

const POSITIVE_TAGS: Tag[] = ['objectif_aligne', 'progression_claire', 'feedback_adequat']
const NEUTRAL_TAGS:  Tag[] = ['cadrage_insuffisant']

function getTagStyle(tag: Tag): { background: string; color: string; boxShadow: string } {
  if (POSITIVE_TAGS.includes(tag)) {
    return {
      background: 'rgba(45,106,79,0.10)',
      color:      'var(--color-positive)',
      boxShadow:  '0 0 0 1px rgba(45,106,79,0.25)',
    }
  }
  if (NEUTRAL_TAGS.includes(tag)) {
    return {
      background: 'rgba(74,74,74,0.08)',
      color:      'var(--color-neutral)',
      boxShadow:  '0 0 0 1px rgba(74,74,74,0.2)',
    }
  }
  return {
    background: 'rgba(181,98,10,0.08)',
    color:      'var(--color-warning)',
    boxShadow:  '0 0 0 1px rgba(181,98,10,0.25)',
  }
}

export function TagList({ tags }: TagListProps) {
  if (tags.length === 0) return null

  const definitions = tags
    .map((tag) => {
      const def = tagDefinitions.find((d) => d.tag === tag)
      return def ? { ...def, tag } : null
    })
    .filter(Boolean) as (typeof tagDefinitions[number] & { tag: Tag })[]

  return (
    <section aria-labelledby="tags-heading">
      <h2 id="tags-heading" className="mb-2 text-lg font-semibold text-foreground">
        Points détectés
      </h2>
      <p className="mb-4 text-sm leading-relaxed text-foreground/70">
        Ces éléments ont été identifiés à partir de vos réponses.
      </p>
      <ul className="flex flex-wrap gap-2" aria-label="Tags activés">
        {definitions.map(({ tag, label, description }) => {
          const style = getTagStyle(tag)
          return (
            <li key={tag}>
              <span
                title={description}
                aria-label={`${label} : ${description}`}
                className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold"
                style={style}
              >
                {label}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}