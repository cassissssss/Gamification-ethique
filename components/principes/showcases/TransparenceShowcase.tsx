import { ChevronLeft, Star, Info, ArrowRight } from 'lucide-react'
import { ShowcaseShell } from '@/components/principes/showcases/shared/ShowcaseShell'
import { Hotspot } from '@/components/principes/showcases/shared/Hotspot'

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[440px] w-[280px] shrink-0 flex-col border-x-[3px] border-primary bg-[#FAF6F0] px-5 py-6">
      {children}
    </div>
  )
}

function XpRow({ label, sublabel, xp }: { label: string; sublabel: string; xp: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-foreground/50">{sublabel}</p>
      </div>
      <p className="whitespace-nowrap text-sm font-semibold text-primary">{xp}</p>
    </div>
  )
}

export function TransparenceShowcase() {
  return (
    <ShowcaseShell
      flush
      cardWidth={280}
      intro="Comparez ces deux versions d'un même écran, puis survolez leurs éléments pour comprendre ce que change ce principe."
      before={
        <Card>
          <div className="mb-6 flex items-center">
            <ChevronLeft className="h-5 w-5 text-foreground" aria-hidden="true" />
            <p className="flex-1 text-center text-base font-bold text-foreground">Résultats</p>
            <span className="w-5" aria-hidden="true" />
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
            <Star className="h-9 w-9 fill-primary/20 text-primary" aria-hidden="true" />
            <Hotspot
              principle="transparence"
              message="Les points sont affichés sans explication. L'utilisateur ne peut pas comprendre comment cette récompense a été calculée."
            >
              <p className="text-3xl font-bold text-primary">+ 125 XP !</p>
            </Hotspot>
            <p className="max-w-[180px] text-sm text-foreground/70">
              Bravo, vous avez gagné de l'XP.
            </p>
          </div>

          <button className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground">
            Continuer <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </Card>
      }
      after={
        <Card>
          <div className="mb-3 flex flex-col items-center gap-1.5 text-center">
            <Star className="h-9 w-9 fill-primary/20 text-primary" aria-hidden="true" />
            <Hotspot
              principle="transparence"
              message="Le total est accompagné du détail des points obtenus afin que l'utilisateur comprenne l'origine de sa progression."
            >
              <p className="text-2xl font-bold text-primary">+ 125 XP !</p>
            </Hotspot>
          </div>

          <div className="flex flex-col gap-2">
            <Hotspot
              principle="transparence"
              message="Chaque source de points est explicitée. Les règles d'attribution sont visibles plutôt que cachées."
              tint
            >
              <div className="flex flex-col gap-2">
                <XpRow label="Leçon terminée" sublabel="Chapitre 3 · leçon 4" xp="+ 100 XP" />
                <XpRow label="Aucune faute" sublabel="Quiz réussi à 100 %" xp="+ 15 XP" />
                <XpRow label="Bonus quotidien" sublabel="Activité du jour complétée" xp="+ 10 XP" />
              </div>
            </Hotspot>

            <div className="flex items-center justify-between gap-3 rounded-xl/10 py-2">
              <p className="text-md font-semibold text-primary">Total gagné</p>
              <p className="text-md font-semibold text-primary">+ 125 XP</p>
            </div>
          </div>

          <Hotspot
            principle="transparence"
            message="Le système explique le rôle des XP et leur impact sur la progression. Les utilisateurs comprennent les conséquences de leurs actions."
          >
            <div className="mt-2 flex items-start gap-2">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground/40" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-foreground/50">
                Les XP vous permettent de progresser et de débloquer de nouveaux contenus.
              </p>
            </div>
          </Hotspot>

          <button className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground">
            Continuer <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </Card>
      }
    />
  )
}
