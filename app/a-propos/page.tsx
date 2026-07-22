import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos',
  description: `Pourquoi ce framework d'évaluation éthique de gamification existe, comment il fonctionne, et ce qu'il ne prétend pas faire.`,
}

const limits = [
  `Remplacer un test utilisateur : seul un test avec de vraies personnes valide l'impact réel des mécaniques.`,
  `Remplacer une expertise sectorielle : santé, éducation, finance impliquent des enjeux qu'une expertise dédiée doit couvrir.`,
  `Décider à la place de l'équipe : l'outil produit un support de discussion, pas une décision. L'arbitrage final reste le vôtre.`,
]

export default function AProposPage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section aria-labelledby="apropos-heading" className="mx-auto w-full max-w-[68rem] px-6 py-20">
        <div className="max-w-2xl">
          <h1
            id="apropos-heading"
            className="mb-6 text-4xl font-semibold leading-tight text-foreground md:text-5xl"
          >
            Motiver sans manipuler,
            <br />
            <span className="text-primary">ce n'est pas un hasard</span>
          </h1>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-foreground/80">
            <p>
              La gamification occupe une place croissante dans les expériences numériques. 
              Pourtant, les équipes disposent de peu d'outils pour questionner les implications 
              éthiques de leurs choix avant la conception. Ce framework est né pour répondre à ce besoin.
            </p>
            <p>
              Réalisé dans le cadre d'un Travail de Bachelor à la HEIG-VD, en
              collaboration avec{' '}
              <a
                href="https://antistatique.net"
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  'font-semibold text-primary underline underline-offset-2 transition-opacity hover:opacity-70',
                  'focus-visible:rounded focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-primary',
                ].join(' ')}
              >
                Antistatique
              </a>, agence digitale basée à Lausanne.
            </p>
          </div>
        </div>
      </section>

      {/* ── Ce que fait l'outil ───────────────────────────────────────────── */}
      <section aria-labelledby="objectif-heading" className="mx-auto w-full max-w-[62rem] px-6 py-20">
        <div className="max-w-2xl">
          <h2 id="objectif-heading" className="mb-5 text-3xl font-semibold text-foreground">
            Ce que fait l'outil
          </h2>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-foreground/80">
            <p>
              Il aide à cadrer une décision de conception avant qu'elle soit
              prise, pas à la remplacer. Il ne donne pas de réponse
              définitive sur la qualité éthique d'un produit : il aide à
              poser les bonnes questions, au bon moment, avant que les choix
              ne soient figés.
            </p>
          </div>
          <p className="mt-5 text-sm italic text-foreground/60">
            Conçu pour les designers, développeur-ses, chef-fes de projet,
            product owners et équipes client.
          </p>
        </div>
      </section>

      {/* ── Méthode ───────────────────────────────────────────────────────── */}
      <section aria-labelledby="methode-heading" className="mx-auto w-full max-w-[62rem] px-6 py-20">
        <div className="max-w-2xl">
          <h2 id="methode-heading" className="mb-5 text-3xl font-semibold text-foreground">
            Une méthode transparente
          </h2>
          <p className="text-base leading-relaxed text-foreground/80">
            Le verdict est produit par un système de règles explicite et
            traçable, fondé sur des travaux de recherche en psychologie de
            la motivation et en éthique du design, pas par une intelligence
            artificielle. L'IA n'intervient qu'en complément, jamais à sa
            place.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/comprendre"
              className={[
                'inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline underline-offset-2',
                'transition-opacity hover:opacity-70',
                'focus-visible:rounded focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-primary',
              ].join(' ')}
            >
              Voir le détail du fonctionnement →
            </Link>
            <Link
              href="/ressources"
              className={[
                'inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline underline-offset-2',
                'transition-opacity hover:opacity-70',
                'focus-visible:rounded focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-primary',
              ].join(' ')}
            >
              Consulter les sources et références →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Ce qu'il ne prétend pas faire ─────────────────────────────────── */}
      {/* Traitement volontairement sobre (pas de couleur d'alerte) : c'est un
          argument de confiance, pas un avertissement. La dernière chose lue
          avant le CTA doit rassurer. */}
      <section aria-labelledby="limites-heading" className="mx-auto w-full max-w-[62rem] px-6 py-20">
        <div className="max-w-2xl">
          <h2 id="limites-heading" className="mb-3 text-3xl font-semibold text-foreground">
            Ce qu'il ne prétend pas faire
          </h2>
          <p className="mb-6 text-base leading-relaxed text-foreground/70">
            Un outil honnête sur ses limites est plus digne de confiance
            qu'un outil qui prétend tout résoudre.
          </p>
          <ul className="flex flex-col gap-4">
            {limits.map((limit, index) => (
              <li key={index} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
                <span className="mt-0.5 shrink-0 text-foreground/30" aria-hidden="true">•</span>
                <span>{limit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="cta-apropos-heading" className="w-full py-4">
        <div className="mx-auto max-w-[56rem] px-6">
          <div
            className="rounded-[2rem] px-8 py-16 text-center sm:px-16"
            style={{ background: 'rgba(74,45,87,0.06)' }}
          >
            <h2
              id="cta-apropos-heading"
              className="text-3xl font-semibold leading-tight text-foreground md:text-4xl"
            >
              Vous avez un projet
              <br />
              à analyser ?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-foreground/70">
              Le questionnaire prend 15 minutes maximum. Aucune inscription requise.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/evaluation"
                className={[
                  'inline-flex items-center rounded-xl px-8 py-4 text-base font-semibold',
                  'bg-primary text-primary-foreground transition-opacity hover:opacity-90',
                  'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
                ].join(' ')}
              >
                Lancer l'évaluation
              </Link>
              <Link
                href="/comprendre"
                className={[
                  'inline-flex items-center rounded-xl px-8 py-4 text-base font-semibold text-primary',
                  'transition-all hover:bg-white/60',
                  'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
                ].join(' ')}
                style={{ boxShadow: '0 0 0 1.5px rgba(74,45,87,0.4)' }}
              >
                Comprendre la démarche
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
