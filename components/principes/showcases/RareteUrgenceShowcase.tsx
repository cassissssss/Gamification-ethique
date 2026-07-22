import { Flame, X, ArrowRight } from 'lucide-react'
import { ShowcaseShell } from '@/components/principes/showcases/shared/ShowcaseShell'
import { Hotspot } from '@/components/principes/showcases/shared/Hotspot'

const DAYS = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']

function WeekRow({
  litCount,
  alertIndex,
  hotspotIndex,
  hotspotMessage,
}: {
  litCount: number
  alertIndex?: number
  /** Index du jour rendu survolable (le seul qui illustre le principe). */
  hotspotIndex: number
  hotspotMessage: string
}) {
  return (
    <div className="flex justify-between">
      {DAYS.map((day, i) => {
        const dot =
          i === alertIndex ? (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
              <X className="h-4 w-4" aria-hidden="true" />
            </span>
          ) : i < litCount ? (
            <span className="flex h-8 w-8 items-center justify-center text-xl">
              <Flame className="h-6 w-6 fill-orange-400 text-orange-400" aria-hidden="true" />
            </span>
          ) : (
            <span
              className={
                i === hotspotIndex
                  ? 'inline-block h-8 w-8 rounded-full border-2 border-primary/40 bg-primary/10'
                  : 'inline-block h-8 w-8 rounded-full bg-primary/10'
              }
            />
          )

        return (
          <div key={day} className="flex shrink-0 flex-col items-center gap-2">
            <span className="text-sm font-medium text-foreground">{day}</span>
            {i === hotspotIndex ? (
              <Hotspot principle="rarete-urgence" message={hotspotMessage} align="right">
                {dot}
              </Hotspot>
            ) : (
              dot
            )}
          </div>
        )
      })}
    </div>
  )
}

function StreakCard({
  count,
  exclaim,
  litCount,
  alertIndex,
  dayHotspotMessage,
  message,
  messageHotspot,
  cta,
  ctaHotspot,
  countHotspot,
}: {
  count: string
  exclaim: boolean
  litCount: number
  alertIndex?: number
  dayHotspotMessage: string
  message: string
  messageHotspot: string
  cta: string
  ctaHotspot: string
  countHotspot?: string
}) {
  return (
    <div className="w-[340px] shrink-0 border-x-[3px] border-primary bg-[#FAF6F0] px-[22px] py-8">
      <div className="flex flex-col gap-6">
        {countHotspot ? (
          <Hotspot principle="rarete-urgence" message={countHotspot}>
            <p className="text-center text-5xl font-extrabold leading-[0.95] text-primary/15">
              {count}
              <br />
              streaks{exclaim ? ' !' : ''}
            </p>
          </Hotspot>
        ) : (
          <p className="text-center text-5xl font-extrabold leading-[0.95] text-primary/15">
            {count}
            <br />
            streaks{exclaim ? ' !' : ''}
          </p>
        )}

        <div className="flex flex-col gap-4 rounded-2xl border border-border p-4">
          <WeekRow
            litCount={litCount}
            alertIndex={alertIndex}
            hotspotIndex={5}
            hotspotMessage={dayHotspotMessage}
          />

          <Hotspot principle="rarete-urgence" message={messageHotspot}>
            <p className="border-t border-border pt-3 text-center text-sm leading-relaxed text-foreground/80">
              {message}
            </p>
          </Hotspot>
        </div>

        <Hotspot principle="rarete-urgence" message={ctaHotspot}>
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
            {cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </Hotspot>
      </div>
    </div>
  )
}

export function RareteUrgenceShowcase() {
  return (
    <ShowcaseShell
      flush
      cardWidth={340}
      intro="Comparez ces deux versions d'une même interface, puis survolez les éléments marqués pour comprendre ce que change ce principe."
      before={
        <StreakCard
          count="153"
          exclaim
          litCount={5}
          alertIndex={5}
          countHotspot="Le point d'exclamation dramatise un simple compteur. Généralisé, ce ton crée une pression constante à performer."
          dayHotspotMessage="Manquer un jour est présenté comme un échec, pas une pause normale : ça culpabilise un rythme de vie légitime."
          message="Tu es sur une série exceptionnelle. Continue aujourd'hui."
          messageHotspot="Le vocabulaire pousse à l'action immédiate. Répété chaque jour, il transforme un choix libre en obligation ressentie."
          cta="Sauver ma série"
          ctaHotspot="« Sauver » implique une perte imminente. Ce levier d'urgence artificielle est un des risques éthiques les plus documentés de la gamification."
        />
      }
      after={
        <StreakCard
          count="153"
          exclaim={false}
          litCount={5}
          dayHotspotMessage="Le jour de repos n'est ni marqué ni pénalisé : la pause devient une option normale, pas un échec à rattraper."
          message="Bravo pour ta régularité ! Tu pourras reprendre quand tu le souhaites."
          messageHotspot="Message rassurant qui laisse le contrôle du rythme à l'utilisateur-rice, sans compte à rebours implicite."
          cta="Continuer mon apprentissage"
          ctaHotspot="Formulation neutre centrée sur l'apprentissage, pas sur la série : rien à « perdre » en faisant une pause."
        />
      }
    />
  )
}
