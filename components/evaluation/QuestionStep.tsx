'use client'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import type { Question } from '@/types/principle'

interface QuestionStepProps {
  question:          Question
  selectedOptionIds: string[]
  onChange:          (selectedOptionIds: string[]) => void
}

export function QuestionStep({ question, selectedOptionIds, onChange }: QuestionStepProps) {

  function handleSingleChange(optionId: string) {
    onChange([optionId])
  }

  function handleMultipleChange(optionId: string, checked: boolean) {
    if (checked) {
      if (
        question.maxSelections !== undefined &&
        selectedOptionIds.length >= question.maxSelections
      ) return
      onChange([...selectedOptionIds, optionId])
    } else {
      onChange(selectedOptionIds.filter((id) => id !== optionId))
    }
  }

  const hasMaxSelections = question.maxSelections !== undefined
  const limitReached     = hasMaxSelections && selectedOptionIds.length >= (question.maxSelections ?? 0)

  return (
    <div className="flex flex-col gap-6">

      {/* Texte de la question */}
      <div className="flex flex-col gap-2">
        {question.section && (
          <p className="text-xs font-semibold uppercase tracking-widest text-primary/60">
            {question.section}
          </p>
        )}
        {/* text-lg minimum pour les questions */}
        <p className="text-lg font-semibold leading-snug text-foreground">
          {question.text}
        </p>
        {question.helpText && (
          <p className="text-sm leading-relaxed text-foreground/70">
            {question.helpText}
          </p>
        )}
      </div>

      {/* Indication maxSelections */}
      {hasMaxSelections && (
        <p className="text-sm text-foreground/70">
          Vous pouvez sélectionner jusqu'à{' '}
          <span className="font-semibold text-foreground">{question.maxSelections}</span>{' '}
          {question.maxSelections === 1 ? 'réponse' : 'réponses'}.
          {limitReached && (
            <span className="ml-1 font-semibold text-primary"> Limite atteinte.</span>
          )}
        </p>
      )}

      {/* Options — single */}
      {question.type === 'single' && (
        <RadioGroup
          value={selectedOptionIds[0] ?? ''}
          onValueChange={handleSingleChange}
          className="flex flex-col gap-3"
          aria-label={question.text}
        >
          {question.options.map((option) => {
            const isSelected = selectedOptionIds[0] === option.id

            return (
              <label
                key={option.id}
                htmlFor={option.id}
                className={[
                  'flex cursor-pointer items-start gap-4 rounded-xl p-4 transition-all duration-150',
                  'focus-within:outline focus-within:outline-3 focus-within:outline-offset-1 focus-within:outline-primary',
                  isSelected
                    // Sélectionné : fond lavande + texte prune + ombre douce
                    ? 'bg-[#D9D0E3]/50 shadow-sm ring-1 ring-[#4A2D57]/25'
                    : 'bg-[#F8F4EF]/80 hover:bg-white/80 hover:shadow-sm',
                ].join(' ')}
              >
                <RadioGroupItem
                  id={option.id}
                  value={option.id}
                  className="mt-0.5 shrink-0 text-primary border-foreground/30"
                  aria-label={option.label}
                />
                {/* text-base minimum pour les options */}
                <span
                  className={[
                    'text-base leading-relaxed',
                    isSelected ? 'font-semibold text-primary' : 'text-foreground',
                  ].join(' ')}
                >
                  {option.label}
                </span>
              </label>
            )
          })}
        </RadioGroup>
      )}

      {/* Options — multiple */}
      {question.type === 'multiple' && (
        <div
          role="group"
          aria-label={question.text}
          className="flex flex-col gap-3"
        >
          {question.options.map((option) => {
            const isSelected = selectedOptionIds.includes(option.id)
            const isDisabled = !isSelected && limitReached

            return (
              <label
                key={option.id}
                htmlFor={option.id}
                className={[
                  'flex items-start gap-4 rounded-xl p-4 transition-all duration-150',
                  'focus-within:outline focus-within:outline-3 focus-within:outline-offset-1 focus-within:outline-primary',
                  isDisabled
                    ? 'cursor-not-allowed opacity-40 bg-[#F8F4EF]/60'
                    : 'cursor-pointer',
                  !isDisabled && isSelected
                    ? 'bg-[#D9D0E3]/50 shadow-sm ring-1 ring-[#4A2D57]/25'
                    : !isDisabled
                      ? 'bg-[#F8F4EF]/80 hover:bg-white/80 hover:shadow-sm'
                      : '',
                ].join(' ')}
              >
                <Checkbox
                  id={option.id}
                  checked={isSelected}
                  disabled={isDisabled}
                  onCheckedChange={(checked) =>
                    handleMultipleChange(option.id, checked === true)
                  }
                  className="mt-0.5 shrink-0 border-foreground/30"
                  aria-label={option.label}
                />
                <span
                  className={[
                    'text-base leading-relaxed',
                    isDisabled
                      ? 'text-foreground/40'
                      : isSelected
                        ? 'font-semibold text-primary'
                        : 'text-foreground',
                  ].join(' ')}
                >
                  {option.label}
                </span>
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}