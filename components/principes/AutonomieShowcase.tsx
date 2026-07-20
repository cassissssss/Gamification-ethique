import { Flame } from 'lucide-react'
import { PhoneStatusBar } from '@/components/principes/PhoneStatusBar'
import { ShowcaseShell } from '@/components/principes/ShowcaseShell'
import { Hotspot } from '@/components/principes/Hotspot'

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={`inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 ${on ? 'bg-primary/60' : 'bg-foreground/15'}`}
      aria-hidden="true"
    >
      <span className={`h-5 w-5 rounded-full bg-white shadow ${on ? 'ml-auto' : ''}`} />
    </span>
  )
}

export function AutonomieShowcase() {
  return (
    <ShowcaseShell
      intro="Comparez ces deux versions d'un même écran, puis survolez leurs éléments pour comprendre ce que change ce principe."
      before={
        <div className="h-[360px] w-[320px] overflow-hidden rounded-t-[36px] border-[3px] border-b-0 border-primary bg-[#FAF6F0] p-[22px]">
          <PhoneStatusBar />
          <p className="mb-4 text-[19px] font-semibold text-foreground">Votre activité</p>

          <div className="mb-4 flex items-center gap-2 rounded-2xl bg-[var(--color-danger)]/10 p-3">
            <Flame className="h-4 w-4 shrink-0 text-[var(--color-danger)]" aria-hidden="true" />
            <p className="text-sm font-medium text-[var(--color-danger)]">
              Reviens avant 20h ou tu perds ta série de 12 jours !
            </p>
          </div>

          <Hotspot
            principle="autonomie"
            message="Un réglage verrouillé retire à l'utilisateur la possibilité de désengager la mécanique. À terme, un service utile devient une source de sollicitation subie."
          >
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-border p-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Rappels quotidiens</p>
                <p className="text-xs text-foreground/50">Ne peut pas être désactivé</p>
              </div>
              <Toggle on />
            </div>
          </Hotspot>
        </div>
      }
      after={
        <div className="h-[360px] w-[320px] overflow-hidden rounded-t-[36px] border-[3px] border-b-0 border-primary bg-[#FAF6F0] p-[22px]">
          <PhoneStatusBar />
          <p className="mb-4 text-[19px] font-semibold text-foreground">Votre activité</p>

          <div className="mb-4 flex items-center gap-2 rounded-2xl bg-primary/5 p-3">
            <Flame className="h-4 w-4 shrink-0 text-primary/60" aria-hidden="true" />
            <p className="text-sm font-medium text-foreground/70">Série actuelle : 12 jours</p>
          </div>

          <Hotspot
            principle="autonomie"
            message="Le contrôle reste entre les mains de l'utilisateur à tout moment, sans avoir à chercher une option cachée pour retrouver de la tranquillité."
            tint
          >
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-border p-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Rappels quotidiens</p>
                <p className="text-xs text-foreground/50">Modifiable à tout moment</p>
              </div>
              <Toggle on={false} />
            </div>
          </Hotspot>
        </div>
      }
    />
  )
}
