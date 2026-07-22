import { ArrowRight, Book, ChevronRight } from 'lucide-react'
import { PhoneStatusBar } from '@/components/principes/showcases/shared/PhoneStatusBar'
import { ShowcaseShell } from '@/components/principes/showcases/shared/ShowcaseShell'
import { Hotspot, PrincipleLegend } from '@/components/principes/showcases/shared/Hotspot'

export function ProgressionShowcase({ compact = false }: { compact?: boolean } = {}) {
  return (
    <ShowcaseShell
      legend={!compact && <PrincipleLegend keys={['transparence', 'progression', 'autonomie']} />}
      intro={!compact ? "Comparez ces deux versions d'une même interface, puis survolez leurs éléments pour comprendre ce que change ce principe." : undefined}
        before={
          <div className="h-[400px] w-[320px] overflow-hidden rounded-t-[36px] border-[3px] border-b-0 border-primary bg-[#FAF6F0] p-[22px]">
            <PhoneStatusBar />
            <p className="mb-4 text-[19px] font-semibold text-foreground">Votre progression</p>

            <Hotspot
              principle="transparence"
              message="Le niveau seul ne dit rien de l'effort réel. Sans repère chiffré, impossible de juger si l'investissement est proportionné."
            >
              <p className="mb-2 text-[15px] font-medium text-foreground">Niveau 7</p>
            </Hotspot>

            <Hotspot
              principle="transparence"
              message="Une barre sans valeurs ne peut pas être vérifiée : rien n'empêche qu'elle soit ralentie artificiellement."
              align="right"
            >
              <div className="mb-2.5 h-2 w-full overflow-hidden rounded-full bg-primary/10">
                <div className="h-full w-[65%] bg-primary" />
              </div>
            </Hotspot>

            <Hotspot
              principle="progression"
              message="Une promesse vague, sans palier réel, pousse à continuer sans repère fiable sur l'effort restant."
            >
              <p className="mb-6 whitespace-nowrap text-[13px] text-foreground/60">Vous y êtes presque !</p>
            </Hotspot>

            <Hotspot
              principle="autonomie"
              message="Un libellé générique masque ce qui va se passer, retirant à l'utilisateur le contrôle sur son geste suivant."
              direction="up"
              tint
            >
              <button className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
                Continuer <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </Hotspot>
          </div>
        }
        after={
          <div className="h-[400px] w-[320px] overflow-hidden rounded-t-[36px] border-[3px] border-b-0 border-primary bg-[#FAF6F0] p-[22px]">
            <PhoneStatusBar />
            <p className="mb-4 text-[19px] font-semibold text-foreground">Votre progression</p>

            <div className="mb-2 flex items-baseline justify-between">
              <span className="whitespace-nowrap text-[15px] font-medium text-foreground">Niveau 7</span>
              <Hotspot
                principle="transparence"
                message="Les deux chiffres permettent de vérifier soi-même l'effort restant, sans avoir à faire confiance au système."
                align="right"
              >
                <span className="whitespace-nowrap text-[13px] text-foreground/60">230 / 1000 XP</span>
              </Hotspot>
            </div>

            <Hotspot
              principle="progression"
              message="La largeur de la barre correspond exactement au ratio affiché : la progression se vérifie, elle ne se croit pas sur parole."
            >
              <div className="mb-2.5 h-2 w-full overflow-hidden rounded-full bg-primary/10">
                <div className="h-full w-[23%] bg-primary" />
              </div>
            </Hotspot>

            <Hotspot
              principle="progression"
              message="Un chiffre restant concret permet de décider en connaissance de cause de continuer ou de s'arrêter."
              tint
            >
              <p className="mb-3.5 whitespace-nowrap text-[13px] text-foreground/60">
                Encore <span className="font-semibold text-primary">770 XP</span> pour atteindre le niveau 8&nbsp;!
              </p>
            </Hotspot>

            <div className="border-t border-border pt-3.5">
              <Hotspot
                principle="autonomie"
                message="Nommer l'étape suivante restitue à l'utilisateur le contrôle sur ce qu'il choisit de faire ensuite."
              >
                <p className="mb-2.5 text-sm font-semibold text-foreground">Prochaine étape</p>
              </Hotspot>

              <Hotspot
                principle="autonomie"
                message="Une action précise et cliquable, sans ambiguïté sur ce qui va se passer une fois le tap effectué."
                align="right"
                direction="up"
                tint
              >
                <div className="flex items-center gap-3 whitespace-nowrap rounded-2xl bg-primary/10 p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Book className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[13px] text-foreground">Réaliser le chapitre 5</span>
                    <span className="block text-xs font-medium text-primary">+ 140 XP</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-primary" aria-hidden="true" />
                </div>
              </Hotspot>
            </div>
          </div>
        }
      />
  )
}
