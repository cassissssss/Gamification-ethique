import { PhoneStatusBar } from '@/components/principes/showcases/shared/PhoneStatusBar'
import { ShowcaseShell } from '@/components/principes/showcases/shared/ShowcaseShell'
import { Hotspot } from '@/components/principes/showcases/shared/Hotspot'

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[340px] w-[300px] shrink-0 flex-col border-x-[3px] border-primary bg-[#FAF6F0] px-5 py-5">
      {children}
    </div>
  )
}

export function ChoixContraintShowcase() {
  return (
    <ShowcaseShell
      principles={['choix-contraint', 'autonomie']}
      flush
      cardWidth={300}
      intro="Comparez ces deux versions d'un même écran, puis survolez leurs éléments pour comprendre ce que change ce principe."
      before={
        <Card>
          <PhoneStatusBar />
          <p className="mb-2 mt-1.5 text-[19px] font-bold text-foreground">Restez motivé.e ! 🔔</p>
          <p className="text-sm font-semibold text-foreground/80">
            Ne perdez jamais votre série grâce aux rappels
          </p>

          <div className="flex flex-1 flex-col items-stretch justify-center gap-4">
            <Hotspot
              principle="choix-contraint"
              message="L'option principale est fortement mise en avant tandis que le refus est minimisé. Cette hiérarchie visuelle peut exploiter la peur de manquer une opportunité (FOMO) et influencer la décision."
            >
              <button className="w-full rounded-xl bg-primary py-3.5 text-base font-semibold text-primary-foreground">
                Accepter
              </button>
            </Hotspot>

            <Hotspot
              principle="choix-contraint"
              message="Le refus est volontairement discret et moins accessible. Un choix éthique présente les différentes options de manière équilibrée."
            >
              <span className="block text-center text-sm text-foreground/40">Non merci</span>
            </Hotspot>
          </div>
        </Card>
      }
      after={
        <Card>
          <PhoneStatusBar />
          <p className="mb-2 mt-1.5 text-[19px] font-bold text-foreground">Notifications 🔔</p>
          <p className="text-sm font-semibold text-foreground/80">
            Souhaitez-vous recevoir des rappels quotidiens ?
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3">
            <Hotspot
              principle="choix-contraint"
              message="Les deux choix sont présentés avec la même importance visuelle. L'utilisateur peut accepter ou refuser librement sans être orienté."
              tint
            >
              <div className="flex w-full gap-3">
                <button className="flex-1 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground">
                  Oui, activer
                </button>
                <button className="flex-1 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground">
                  Non merci
                </button>
              </div>
            </Hotspot>

            <Hotspot
              principle="autonomie"
              message="L'utilisateur conserve le contrôle de sa décision et peut modifier sa préférence ultérieurement, sans conséquence négative."
            >
              <p className="text-center text-xs text-foreground/50">
                Vous pourrez modifier ce choix à tout moment dans les paramètres.
              </p>
            </Hotspot>
          </div>
        </Card>
      }
    />
  )
}
