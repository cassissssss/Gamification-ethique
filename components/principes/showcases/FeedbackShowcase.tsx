import { X, Check, ArrowRight } from 'lucide-react'
import { ShowcaseShell } from '@/components/principes/showcases/shared/ShowcaseShell'
import { Hotspot } from '@/components/principes/showcases/shared/Hotspot'

function IconBadge({ tone }: { tone: 'danger' | 'positive' }) {
  const Icon = tone === 'danger' ? X : Check
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
      style={{ background: tone === 'danger' ? 'var(--color-danger)' : 'var(--color-positive)' }}
      aria-hidden="true"
    >
      <Icon className="h-4 w-4" strokeWidth={3} />
    </span>
  )
}

function AnswerBox({ label, value, tone }: { label: string; value: string; tone: 'danger' | 'positive' }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
      <div>
        <p className="text-xs text-foreground/60">{label}</p>
        <p className="text-base font-bold text-foreground">{value}</p>
      </div>
      <IconBadge tone={tone} />
    </div>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[480px] w-[280px] shrink-0 flex-col rounded-[28px] border-[3px] border-primary bg-[#FAF6F0] p-5">
      <p className="text-lg font-bold text-foreground">Question 4</p>
      <p className="mt-1 text-sm text-foreground/70">Quelle est la capitale de la France&nbsp;?</p>
      {children}
    </div>
  )
}

export function FeedbackShowcase() {
  return (
    <ShowcaseShell
      intro="Comparez ces deux versions d'un même écran, puis survolez leurs éléments pour comprendre ce que change ce principe."
      before={
        <Card>
          <Hotspot
            principle="feedback"
            message="Un simple signal d'erreur, sans la bonne réponse ni explication, ne permet pas de comprendre ce qui s'est passé ni d'apprendre de son erreur."
          >
            <div className="mt-4">
              <AnswerBox label="Votre réponse" value="Lyon" tone="danger" />
            </div>
          </Hotspot>

          <div className="mt-auto" />
          <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground">
            Continuer <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </Card>
      }
      after={
        <Card>
          <Hotspot
            principle="feedback"
            message="Le retour montre à la fois l'erreur, la bonne réponse et son explication : un feedback proportionné aide réellement à progresser, pas seulement à constater un échec."
            tint
          >
            <div className="mt-4 flex flex-col gap-2.5">
              <AnswerBox label="Votre réponse" value="Lyon" tone="danger" />
              <AnswerBox label="La bonne réponse était" value="Paris" tone="positive" />

              <div>
                <p className="text-xs font-semibold text-foreground/70">Explications</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground/60">
                  Paris est la capitale et la ville la plus peuplée de France.
                  C'est aussi là que se trouve le siège du gouvernement.
                </p>
              </div>
            </div>
          </Hotspot>

          <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground">
            Continuer <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </Card>
      }
    />
  )
}
