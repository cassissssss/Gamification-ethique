import { PhoneStatusBar } from '@/components/principes/showcases/shared/PhoneStatusBar'
import { ShowcaseShell } from '@/components/principes/showcases/shared/ShowcaseShell'
import { Hotspot } from '@/components/principes/showcases/shared/Hotspot'

export function ChoixContraintShowcase() {
  return (
    <ShowcaseShell
      principles={['choix-contraint', 'autonomie']}
      intro="Comparez ces deux versions d'un même écran, puis survolez leurs éléments pour comprendre ce que change ce principe."
      before={
        <div className="h-[400px] w-[300px] overflow-hidden rounded-t-[36px] border-[3px] border-b-0 border-primary bg-[#FAF6F0] p-[22px]">
          <PhoneStatusBar />
          <p className="mb-2 text-[19px] font-bold text-foreground">Restez motivé.e ! 🔔</p>
          <p className="mb-8 text-sm font-semibold text-foreground/80">
            Ne perdez jamais votre série grâce aux rappels
          </p>

          <div className="flex flex-col items-center gap-4">
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
              direction="up"
            >
              <span className="text-sm text-foreground/40">Non merci</span>
            </Hotspot>
          </div>
        </div>
      }
      after={
        <div className="h-[400px] w-[300px] overflow-hidden rounded-t-[36px] border-[3px] border-b-0 border-primary bg-[#FAF6F0] p-[22px]">
          <PhoneStatusBar />
          <p className="mb-2 text-[19px] font-bold text-foreground">Notifications 🔔</p>
          <p className="mb-8 text-sm font-semibold text-foreground/80">
            Souhaitez-vous recevoir des rappels quotidiens ?
          </p>

          <div className="flex flex-col items-center gap-3">
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
              direction="up"
            >
              <p className="text-center text-xs text-foreground/50">
                Vous pourrez modifier ce choix à tout moment dans les paramètres.
              </p>
            </Hotspot>
          </div>
        </div>
      }
    />
  )
}
