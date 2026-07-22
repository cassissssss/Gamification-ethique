import { Target, ArrowRight, CircleDot, Circle } from 'lucide-react'
import { PhoneStatusBar } from '@/components/principes/showcases/shared/PhoneStatusBar'
import { ShowcaseShell } from '@/components/principes/showcases/shared/ShowcaseShell'
import { Hotspot } from '@/components/principes/showcases/shared/Hotspot'

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[460px] w-[260px] shrink-0 flex-col rounded-[28px] border-[3px] border-primary bg-[#FAF6F0] p-5">
      <PhoneStatusBar />
      <div className="flex flex-col items-center gap-1 py-0.5 text-center">
        <Target className="h-7 w-7 text-foreground" aria-hidden="true" />
        <p className="text-base font-semibold text-foreground">Votre objectif</p>
      </div>
      {children}
    </div>
  )
}

function OptionRow({
  label,
  sublabel,
  selected = false,
}: {
  label: string
  sublabel: string
  selected?: boolean
}) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-xl border p-3"
      style={
        selected
          ? { borderColor: 'var(--color-positive)', background: 'rgba(45,106,79,0.08)' }
          : { borderColor: 'var(--border, rgba(0,0,0,0.1))' }
      }
    >
      {selected ? (
        <CircleDot className="h-4 w-4 shrink-0" style={{ color: 'var(--color-positive)' }} aria-hidden="true" />
      ) : (
        <Circle className="h-4 w-4 shrink-0 text-foreground/25" aria-hidden="true" />
      )}
      <div>
        <p className="text-xs font-semibold text-foreground">{label}</p>
        <p className="text-[11px] text-foreground/50">{sublabel}</p>
      </div>
    </div>
  )
}

export function AutonomieShowcase() {
  return (
    <ShowcaseShell
      extraBottomSpace
      intro="Comparez ces deux versions d'un même écran, puis survolez leurs éléments pour comprendre ce que change ce principe."
      before={
        <Card>
          <Hotspot
            principle="autonomie"
            message="La durée est imposée, sans possibilité de l'adapter. L'utilisateur doit se conformer au rythme prévu par le système, pas l'inverse."
          >
            <div className="mt-4 flex flex-col items-center gap-1.5 rounded-xl border border-border p-4 text-center">
              <p className="text-2xl font-bold text-primary">30 min</p>
              <div className="my-0.5 h-px w-full bg-border" />
              <p className="text-sm text-foreground">Bonne session !</p>
            </div>
          </Hotspot>

          <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground">
            Commencer <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </Card>
      }
      after={
        <Card>
          <p className="mt-1 text-center text-xs text-foreground/60">
            Adaptez votre objectif à votre disponibilité.
          </p>

          <Hotspot
            principle="autonomie"
            message="L'utilisateur choisit lui-même son niveau d'engagement, et sait qu'il peut en changer. La mécanique s'adapte à sa vie, pas l'inverse."
            tint
          >
            <div className="mt-3 flex flex-col gap-2">
              <OptionRow label="10 minutes" sublabel="Découverte" />
              <OptionRow label="20 minutes" sublabel="Équilibré" selected />
              <OptionRow label="30 minutes" sublabel="Approfondi" />
            </div>
          </Hotspot>

          <p className="mt-2.5 text-center text-[11px] text-foreground/50">
            Vous pourrez changer votre sélection à tout moment
          </p>

          <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground">
            Commencer <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </Card>
      }
    />
  )
}
