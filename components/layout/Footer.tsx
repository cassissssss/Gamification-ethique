import Link from 'next/link'

const footerLinks = [
  { href: '/evaluation',  label: `Lancer l'évaluation` }, 
  { href: '/principes',   label: 'Les principes' }, 
  { href: '/a-propos',    label: 'À propos' }, 
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{ borderTop: '1.5px solid rgba(217,  208,  227,  0.8)',  background: 'rgba(231, 225, 218, 0.5)' }}
    >
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">

          <div className="max-w-sm">
            <p className="mb-2 text-base font-semibold text-primary">
              Gamification Éthique
            </p>
            <p className="text-sm leading-relaxed text-foreground/70">
              Framework d'évaluation éthique pour la conception
              d'expériences numériques gamifiées.
            </p>
          </div>

          <nav aria-label="Liens secondaires" className="flex flex-col gap-3 sm:items-end">
            <p className="text-xs font-medium tracking-wide text-foreground/40 sm:text-right">
              Navigation
            </p>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  'text-sm font-medium text-primary transition-opacity hover:opacity-70', 
                  'focus-visible:rounded focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary', 
                ].join(' ')}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div
          className="mt-8 pt-5 text-sm text-foreground/60"
          style={{ borderTop: '1px solid rgba(217, 208, 227, 0.6)' }}
        >
          © {currentYear}, Réalisé dans le cadre du Travail de Bachelor à la HEIG-VD. 
          En collaboration avec l'agence digitale Antistatique.
        </div>
      </div>
    </footer>
  )
}