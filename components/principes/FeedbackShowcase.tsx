import { PartyPopper, CircleCheck } from 'lucide-react'
import { PhoneStatusBar } from '@/components/principes/PhoneStatusBar'
import { ShowcaseShell } from '@/components/principes/ShowcaseShell'
import { Hotspot } from '@/components/principes/Hotspot'

export function FeedbackShowcase() {
  return (
    <ShowcaseShell
      intro="Comparez ces deux versions d'un même écran, puis survolez leurs éléments pour comprendre ce que change ce principe."
      before={
        <div className="h-[360px] w-[320px] overflow-hidden rounded-t-[36px] border-[3px] border-b-0 border-primary bg-[#FAF6F0] p-[22px]">
          <PhoneStatusBar />
          <p className="mb-1 text-[19px] font-semibold text-foreground">Leçon terminée !</p>
          <p className="mb-4 text-sm text-primary">+50 XP</p>

          <Hotspot
            principle="feedback"
            message="Trois célébrations pour une action mineure diluent la valeur du feedback : à force d'être exagéré, il ne renseigne plus sur l'importance réelle de ce qui vient de se passer."
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 rounded-xl bg-white p-2.5 shadow-sm">
                <PartyPopper className="h-4 w-4 text-foreground/40" aria-hidden="true" />
                <span className="text-sm font-semibold text-foreground">Bravo !!!</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white p-2.5 shadow-sm">
                <PartyPopper className="h-4 w-4 text-foreground/40" aria-hidden="true" />
                <span className="text-sm font-semibold text-foreground">Incroyable !!!</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white p-2.5 shadow-sm">
                <PartyPopper className="h-4 w-4 text-foreground/40" aria-hidden="true" />
                <span className="text-sm font-semibold text-foreground">Tu es un champion !!!</span>
              </div>
            </div>
          </Hotspot>
        </div>
      }
      after={
        <div className="h-[360px] w-[320px] overflow-hidden rounded-t-[36px] border-[3px] border-b-0 border-primary bg-[#FAF6F0] p-[22px]">
          <PhoneStatusBar />
          <p className="mb-1 text-[19px] font-semibold text-foreground">Leçon terminée !</p>
          <p className="mb-4 text-sm text-primary">+50 XP</p>

          <Hotspot
            principle="feedback"
            message="Un retour proportionné confirme l'action sans la surjouer : l'utilisateur garde un repère fiable pour distinguer une étape mineure d'un vrai accomplissement."
            tint
          >
            <div className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-sm">
              <CircleCheck className="h-4 w-4 text-[var(--color-positive)]" aria-hidden="true" />
              <span className="text-sm font-medium text-foreground">Enregistré</span>
            </div>
          </Hotspot>
        </div>
      }
    />
  )
}
