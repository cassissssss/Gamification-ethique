import { Award } from 'lucide-react'
import { PhoneStatusBar } from '@/components/principes/PhoneStatusBar'
import { ShowcaseShell } from '@/components/principes/ShowcaseShell'
import { Hotspot } from '@/components/principes/Hotspot'

function BadgeRow({ name, criteria }: { name: string; criteria?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border p-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Award className="h-4 w-4" aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-semibold text-foreground">{name}</p>
        {criteria && <p className="text-xs text-foreground/50">{criteria}</p>}
      </div>
    </div>
  )
}

export function TransparenceShowcase() {
  return (
    <ShowcaseShell
      intro="Comparez ces deux versions d'un même écran, puis survolez leurs éléments pour comprendre ce que change ce principe."
      before={
        <div className="h-[360px] w-[320px] overflow-hidden rounded-t-[36px] border-[3px] border-b-0 border-primary bg-[#FAF6F0] p-[22px]">
          <PhoneStatusBar />
          <p className="mb-4 text-[19px] font-semibold text-foreground">Mes badges</p>

          <div className="flex flex-col gap-3">
            <Hotspot
              principle="transparence"
              message="Aucun critère affiché : impossible de savoir ce qui a déclenché le badge ni de le reproduire. Ça favorise le hasard perçu plutôt que la maîtrise."
            >
              <BadgeRow name="Série de feu" />
            </Hotspot>
            <BadgeRow name="Explorateur" />
            <BadgeRow name="Premiers pas" />
          </div>
        </div>
      }
      after={
        <div className="h-[360px] w-[320px] overflow-hidden rounded-t-[36px] border-[3px] border-b-0 border-primary bg-[#FAF6F0] p-[22px]">
          <PhoneStatusBar />
          <p className="mb-4 text-[19px] font-semibold text-foreground">Mes badges</p>

          <div className="flex flex-col gap-3">
            <Hotspot
              principle="transparence"
              message="Le critère exact est nommé : l'utilisateur comprend ce qu'il a accompli et peut décider consciemment de recommencer ou non."
              tint
            >
              <BadgeRow name="Série de feu" criteria="7 jours consécutifs" />
            </Hotspot>
            <BadgeRow name="Explorateur" criteria="5 zones visitées" />
            <BadgeRow name="Premiers pas" criteria="1er exercice terminé" />
          </div>
        </div>
      }
    />
  )
}
