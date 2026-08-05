import { Award, Check, ArrowRight } from 'lucide-react'
import { PhoneStatusBar } from '@/components/principes/showcases/shared/PhoneStatusBar'
import { ShowcaseShell } from '@/components/principes/showcases/shared/ShowcaseShell'
import { Hotspot } from '@/components/principes/showcases/shared/Hotspot'

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[400px] w-[300px] shrink-0 flex-col border-x-[3px] border-primary bg-[#FAF6F0] px-5 py-5">
      {children}
    </div>
  )
}

export function RecompensesShowcase() {
  return (
    <ShowcaseShell
      principles={['recompenses']}
      flush
      cardWidth={300}
      intro="Comparez ces deux versions d'un même écran, puis survolez leurs éléments pour comprendre ce que change ce principe."
      before={
        <Card>
          <PhoneStatusBar />
          <p className="mb-8 mt-1.5 text-[19px] font-bold text-foreground">Nouveau badge !</p>

          <Hotspot
            principle="recompenses"
            message="La récompense n'est reliée à aucun accomplissement précis : rien n'indique ce qui a été appris ou réussi pour l'obtenir, ce qui affaiblit son lien avec la motivation intrinsèque."
          >
            <div className="flex flex-col items-center gap-3">
              <Award className="h-16 w-16 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <p className="text-base text-foreground/70">“Collectionneur”</p>
            </div>
          </Hotspot>

          <button className="mt-10 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground">
            Voir ma collection <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </Card>
      }
      after={
        <Card>
          <PhoneStatusBar />
          <p className="mb-4 mt-1.5 text-[19px] font-bold text-foreground">Leçon terminée !</p>
          <p className="mb-4 text-sm text-foreground/70">Vous savez maintenant :</p>

          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <Check className="h-4 w-4 shrink-0 text-foreground/50" aria-hidden="true" />
              Additionner des fractions
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <Check className="h-4 w-4 shrink-0 text-foreground/50" aria-hidden="true" />
              Résoudre une équation
            </div>
          </div>

          <Hotspot
            principle="recompenses"
            message="Le badge est explicitement relié aux compétences démontrées juste au-dessus, ce qui renforce la reconnaissance d'un effort réel plutôt qu'une récompense arbitraire."
            tint
          >
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-primary/10 p-3">
              <Award className="h-8 w-8 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <p className="text-xs text-foreground/50">Badge débloqué</p>
                <p className="text-sm font-bold text-foreground">“Réussites”</p>
              </div>
            </div>
          </Hotspot>

          <button className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground">
            Continuer
          </button>
        </Card>
      }
    />
  )
}
