import { Gift, Trophy } from 'lucide-react'
import { PhoneStatusBar } from '@/components/principes/showcases/shared/PhoneStatusBar'
import { ShowcaseShell } from '@/components/principes/showcases/shared/ShowcaseShell'
import { Hotspot } from '@/components/principes/showcases/shared/Hotspot'

export function RecompensesShowcase() {
  return (
    <ShowcaseShell
      intro="Comparez ces deux versions d'un même écran, puis survolez leurs éléments pour comprendre ce que change ce principe."
      before={
        <div className="h-[360px] w-[320px] overflow-hidden rounded-t-[36px] border-[3px] border-b-0 border-primary bg-[#FAF6F0] p-[22px]">
          <PhoneStatusBar />
          <p className="mb-4 text-[19px] font-semibold text-foreground">Mes récompenses</p>

          <Hotspot
            principle="recompenses"
            message="Une récompense au contenu aléatoire fonctionne sur le même ressort que les mécaniques de type loot box : elle motive par l'incertitude, pas par l'effort accompli."
          >
            <div className="flex flex-col gap-3 rounded-2xl border border-border p-4">
              <div className="flex items-center gap-3">
                <Gift className="h-6 w-6 shrink-0 text-foreground/40" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Boîte mystère disponible</p>
                  <p className="text-xs text-foreground/50">Contenu aléatoire</p>
                </div>
              </div>
              <button className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground">
                Ouvrir
              </button>
            </div>
          </Hotspot>

          <div className="mt-4 flex gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-xs text-foreground/30">?</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-xs text-foreground/30">?</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-xs text-foreground/30">?</span>
          </div>
        </div>
      }
      after={
        <div className="h-[360px] w-[320px] overflow-hidden rounded-t-[36px] border-[3px] border-b-0 border-primary bg-[#FAF6F0] p-[22px]">
          <PhoneStatusBar />
          <p className="mb-4 text-[19px] font-semibold text-foreground">Mes récompenses</p>

          <Hotspot
            principle="recompenses"
            message="La récompense est directement reliée à un effort mesurable : elle renforce la motivation intrinsèque plutôt que de la remplacer par l'attrait du hasard."
            tint
          >
            <div className="flex items-center gap-3 rounded-2xl border border-border p-4">
              <Trophy className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-foreground">Badge Expert débloqué</p>
                <p className="text-xs text-foreground/50">10 exercices réussis</p>
              </div>
            </div>
          </Hotspot>

          <div className="mt-4 flex gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Trophy className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Trophy className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      }
    />
  )
}
