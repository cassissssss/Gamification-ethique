import { Lock } from 'lucide-react'
import { PhoneStatusBar } from '@/components/principes/showcases/shared/PhoneStatusBar'
import { ShowcaseShell } from '@/components/principes/showcases/shared/ShowcaseShell'
import { Hotspot } from '@/components/principes/showcases/shared/Hotspot'

export function ChoixContraintShowcase() {
  return (
    <ShowcaseShell
      intro="Comparez ces deux versions d'un même écran, puis survolez leurs éléments pour comprendre ce que change ce principe."
      before={
        <div className="h-[360px] w-[320px] overflow-hidden rounded-t-[36px] border-[3px] border-b-0 border-primary bg-[#FAF6F0] p-[22px]">
          <PhoneStatusBar />
          <p className="mb-4 flex items-center gap-2 text-[19px] font-semibold text-foreground">
            <Lock className="h-4 w-4 text-foreground/40" aria-hidden="true" />
            Niveau 8
          </p>

          <div className="rounded-2xl border border-border p-4 text-center">
            <p className="mb-4 text-sm text-foreground/70">
              Passez Premium pour continuer votre progression.
            </p>
            <button className="mb-3 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground">
              S'abonner
            </button>
            <Hotspot
              principle="choix-contraint"
              message="Un refus minuscule, formulé en négatif, à côté d'un bouton imposant : ce n'est pas un choix réel mais un déséquilibre délibéré, typique des dark patterns de paywall."
            >
              <span className="text-xs text-foreground/30 underline">non merci, je reste bloqué-e</span>
            </Hotspot>
          </div>
        </div>
      }
      after={
        <div className="h-[360px] w-[320px] overflow-hidden rounded-t-[36px] border-[3px] border-b-0 border-primary bg-[#FAF6F0] p-[22px]">
          <PhoneStatusBar />
          <p className="mb-4 flex items-center gap-2 text-[19px] font-semibold text-foreground">
            <Lock className="h-4 w-4 text-foreground/40" aria-hidden="true" />
            Niveau 8
          </p>

          <div className="rounded-2xl border border-border p-4 text-center">
            <p className="mb-4 text-sm text-foreground/70">
              Débloqué en poursuivant votre progression, gratuitement.
            </p>
            <Hotspot
              principle="choix-contraint"
              message="Deux options de poids visuel égal restituent un choix réel : continuer gratuitement ou découvrir Premium sont présentés comme deux issues aussi légitimes l'une que l'autre."
              tint
            >
              <div className="flex gap-2">
                <button className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground">
                  Continuer
                </button>
                <button className="flex-1 rounded-xl border border-border py-2.5 text-sm font-semibold text-foreground">
                  Découvrir Premium
                </button>
              </div>
            </Hotspot>
          </div>
        </div>
      }
    />
  )
}
