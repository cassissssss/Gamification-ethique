import type { SVGProps } from 'react'

/**
 * Icône LinkedIn autonome.
 *
 * lucide-react a retiré les icônes de marques (LinkedIn, Twitter, etc.)
 * de ses versions récentes — il ne reste que des icônes génériques.
 * On fournit donc ce pictogramme maison, avec la même API qu'une icône
 * lucide (`size`, props SVG standard) pour rester un remplacement direct.
 */
interface LinkedinIconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

export function LinkedinIcon({ size = 24, ...props }: LinkedinIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.34 18.34H5.67V9.67h2.67v8.67Zm-1.34-9.86a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1Zm11.99 9.86h-2.66v-4.55c0-1.15-.42-1.93-1.44-1.93-.79 0-1.26.53-1.46 1.04-.08.18-.1.44-.1.7v4.74H10.6s.03-7.69 0-8.67h2.67v1.23c.35-.55 1-1.33 2.42-1.33 1.77 0 3.1 1.15 3.1 3.63v5.14Z" />
    </svg>
  )
}
