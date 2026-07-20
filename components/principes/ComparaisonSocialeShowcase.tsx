import { PhoneStatusBar } from '@/components/principes/PhoneStatusBar'
import { ShowcaseShell } from '@/components/principes/ShowcaseShell'
import { Hotspot } from '@/components/principes/Hotspot'

export function ComparaisonSocialeShowcase() {
  return (
    <ShowcaseShell
      intro="Comparez ces deux versions d'un même écran, puis survolez leurs éléments pour comprendre ce que change ce principe."
      before={
        <div className="h-[360px] w-[320px] overflow-hidden rounded-t-[36px] border-[3px] border-b-0 border-primary bg-[#FAF6F0] p-[22px]">
          <PhoneStatusBar />
          <p className="mb-4 text-[19px] font-semibold text-foreground">Classement</p>

          <div className="flex flex-col gap-2 rounded-2xl border border-border p-4 text-sm">
            <div className="flex justify-between text-foreground/60">
              <span>1. Alex99</span>
              <span>45 320 pts</span>
            </div>
            <div className="flex justify-between text-foreground/60">
              <span>2. Mia_K</span>
              <span>41 800 pts</span>
            </div>
            <div className="flex justify-between text-foreground/60">
              <span>3. Sam.dev</span>
              <span>39 120 pts</span>
            </div>
            <Hotspot
              principle="comparaison-sociale"
              message="Un classement public crée mécaniquement des perdant-es : la grande majorité des utilisateur-rices se voit renvoyer un rang défavorable, quel que soit leur effort réel."
            >
              <div className="flex justify-between rounded-lg bg-primary/5 px-2 py-1 font-semibold text-foreground">
                <span>8 542e — Vous</span>
                <span>210 pts</span>
              </div>
            </Hotspot>
          </div>
        </div>
      }
      after={
        <div className="h-[360px] w-[320px] overflow-hidden rounded-t-[36px] border-[3px] border-b-0 border-primary bg-[#FAF6F0] p-[22px]">
          <PhoneStatusBar />
          <p className="mb-4 text-[19px] font-semibold text-foreground">Votre progression</p>

          <Hotspot
            principle="comparaison-sociale"
            message="Comparer l'utilisateur à lui-même plutôt qu'aux autres préserve la motivation sans créer de hiérarchie : chacun progresse à partir de sa propre référence."
            tint
          >
            <div className="rounded-2xl border border-border p-4">
              <p className="mb-1 text-xs font-semibold text-foreground/50">Cette semaine</p>
              <p className="text-lg font-semibold text-[var(--color-positive)]">+12 % d'assiduité</p>
              <p className="text-xs text-foreground/50">Par rapport à votre moyenne personnelle</p>
            </div>
          </Hotspot>

          <div className="mt-4 flex items-end gap-1.5">
            {[40, 55, 45, 70, 60, 80, 90].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-primary/20" style={{ height: `${h * 0.4}px` }} />
            ))}
          </div>
        </div>
      }
    />
  )
}
