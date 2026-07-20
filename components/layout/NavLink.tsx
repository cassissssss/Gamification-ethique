'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href:     string
  label:    string
  onClick?: () => void
}

export function NavLink({ href,  label,  onClick }: NavLinkProps) {
  const pathname = usePathname()

  const isActive =
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(href + '/')

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={[
        'relative inline-flex items-center text-sm transition-colors duration-150', 
        'focus-visible:rounded focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary', 
        isActive
          ? 'font-semibold text-primary underline underline-offset-4 decoration-2 decoration-primary'
          : 'font-medium text-foreground/75 hover:text-primary', 
      ].join(' ')}
    >
      {label}
    </Link>
  )
}