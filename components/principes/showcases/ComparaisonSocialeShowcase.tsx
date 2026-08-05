import { PhoneStatusBar } from '@/components/principes/showcases/shared/PhoneStatusBar'
import { ShowcaseShell } from '@/components/principes/showcases/shared/ShowcaseShell'
import { Hotspot } from '@/components/principes/showcases/shared/Hotspot'

const RANKING = [
  { medal: '🥇', name: 'Alex', points: '45’320 pts' },
  { medal: '🥈', name: 'Mia_K', points: '40’912 pts' },
  { medal: '🥉', name: 'Sam.divi', points: '39’022 pts' },
]

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[440px] w-[300px] shrink-0 flex-col border-x-[3px] border-primary bg-[#FAF6F0] px-5 py-5">
      {children}
    </div>
  )
}

function RankingRow({ medal, name, points }: { medal: string; name: string; points: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-foreground/70">
      <span className="text-lg">{medal}</span>
      <span className="flex-1">{name}</span>
      <span>{points}</span>
    </div>
  )
}

function YouRow() {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-primary/10 px-3 py-2 text-sm font-semibold text-foreground">
      <span className="w-6">103.</span>
      <span className="flex-1">Vous</span>
      <span>20’169 pts</span>
    </div>
  )
}

export function ComparaisonSocialeShowcase() {
  return (
    <ShowcaseShell
      principles={['comparaison-sociale', 'progression']}
      flush
      cardWidth={300}
      intro="Comparez ces deux versions d'un même écran, puis survolez leurs éléments pour comprendre ce que change ce principe."
      before={
        <Card>
          <PhoneStatusBar />
          <p className="mb-4 mt-1.5 text-[17px] font-bold text-foreground">Classement hebdomadaire</p>

          <Hotspot
            principle="comparaison-sociale"
            message="Le classement met principalement l'accent sur la position des utilisateurs par rapport aux autres, ce qui peut encourager une compétition excessive."
          >
            <div className="flex flex-col gap-2.5">
              {RANKING.map((row) => (
                <RankingRow key={row.name} {...row} />
              ))}
              <span className="text-foreground/40">...</span>
              <YouRow />
            </div>
          </Hotspot>

          <Hotspot
            principle="comparaison-sociale"
            message="Le message incite à progresser pour dépasser les autres plutôt que pour atteindre ses propres objectifs."
          >
            <p className="mt-3.5 text-center text-sm font-semibold text-foreground">
              Vous êtes à trois places du top 100. Continuez comme ça !
            </p>
          </Hotspot>

          <Hotspot
            principle="comparaison-sociale"
            message="L'objectif proposé est de dépasser les autres utilisateurs, renforçant la comparaison sociale comme principale source de motivation."
          >
            <button className="mt-8 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground">
              Rattraper les autres
            </button>
          </Hotspot>
        </Card>
      }
      after={
        <Card>
          <PhoneStatusBar />
          <p className="mb-4 mt-1.5 text-[17px] font-bold text-foreground">Votre progression</p>

          <div className="flex flex-col gap-2.5">
            {RANKING.map((row) => (
              <RankingRow key={row.name} {...row} />
            ))}
            <span className="text-foreground/40">...</span>
            <YouRow />
          </div>

          <Hotspot
            principle="comparaison-sociale"
            message="L'accent est mis sur l'évolution de l'utilisateur plutôt que sur sa position dans le classement."
            tint
          >
            <p className="mt-2.5 text-sm font-semibold text-primary">+8 places cette semaine</p>
          </Hotspot>

          <Hotspot
            principle="progression"
            message="La motivation repose sur les progrès réalisés et l'amélioration personnelle plutôt que sur la compétition avec les autres."
          >
            <button className="mt-8 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground">
              Continuer à progresser
            </button>
          </Hotspot>
        </Card>
      }
    />
  )
}
