import { Progress } from '@/components/ui/progress'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep,  totalSteps }: ProgressBarProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">
          Question{' '}
          <span className="text-primary">{currentStep}</span>
          {' '}sur{' '}
          <span className="text-foreground/60">{totalSteps}</span>
        </p>
        <p
          className="text-xs text-foreground/50"
          aria-hidden="true"
        >
          {percentage} %
        </p>
      </div>
      <Progress
        value={percentage}
        aria-label={`Progression : question ${currentStep} sur ${totalSteps}`}
        className="h-2 bg-secondary"
      />
    </div>
  )
}