'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu,  X } from 'lucide-react'
import { NavLink } from './NavLink'

const navItems = [
  { href: '/',            label: 'Accueil' }, 
  { href: '/comprendre',  label: 'Comprendre' }, 
  { href: '/principes',   label: 'Principes' }, 
  { href: '/evaluation',  label: 'Évaluation' }, 
  { href: '/a-propos',    label: 'À propos' }, 
]

export function Header() {
  const [menuOpen,  setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: 'rgba(248,  244,  239,  0.85)', 
        backdropFilter: 'blur(12px)', 
        WebkitBackdropFilter: 'blur(12px)', 
        borderBottom: '1px solid rgba(217,  208,  227,  0.5)', 
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        <Link
          href="/"
          onClick={closeMenu}
          className={[
            'text-base font-semibold tracking-tight text-primary', 
            'transition-opacity hover:opacity-80', 
            'focus-visible:rounded focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary', 
          ].join(' ')}
        >
          Gamification Éthique
        </Link>

        {/* Navigation desktop */}
        <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        {/* Bouton menu mobile */}
        <button
          type="button"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className={[
            'flex md:hidden items-center justify-center rounded-lg p-2 text-primary', 
            'transition-colors hover:bg-[#D9D0E3]/40', 
            'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary', 
          ].join(' ')}
        >
          {menuOpen
            ? <X    size={22} aria-hidden="true" />
            : <Menu size={22} aria-hidden="true" />
          }
        </button>
      </div>

      {/* Navigation mobile */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Navigation mobile"
          style={{ borderTop: '1px solid rgba(217,  208,  227,  0.5)' }}
          className="md:hidden px-6 py-4 flex flex-col gap-4"
        >
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} onClick={closeMenu} />
          ))}
        </nav>
      )}
    </header>
  )
}