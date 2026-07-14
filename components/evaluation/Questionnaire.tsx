'use client'

import { useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useEvaluationForm } from '@/hooks/useEvaluationForm'
import type {
  EvaluationAnswers,
  EvaluationQuestion,
  EvaluationSection,
  OptionId,
  QuestionId,
} from '@/logic/evaluation.types'
import { saveAnswers } from '@/lib/storage'

// ─── Types ────────────────────────────────────────────────────────────────────

interface SectionMeta {
  name: EvaluationSection
  description: string
}

interface StoredAnswer {
  questionId: string
  selectedOptionIds: string[]
}

// ─── Sections ─────────────────────────────────────────────────────────────────

const SECTION_DESCRIPTIONS: Record<EvaluationSection, string> = {
  "Mode d'utilisation":
    "Situer l’état actuel du projet afin d’adapter le type de résultat proposé.",

  "Besoin et intention":
    "Clarifier pourquoi la gamification est envisagée et quelle action elle doit accompagner.",

  "Public et contexte":
    "Identifier le public concerné, le contexte d’usage et les éventuelles sensibilités.",

  "Direction de gamification":
    "Repérer les directions ou mécaniques déjà envisagées pour mieux les évaluer.",

  "Transparence et contrôle":
    "Vérifier si l’utilisateur-rice comprend le système et garde une marge de choix.",

  "Temporalité et visibilité":
    "Évaluer les effets possibles de régularité, de pression ou d’exposition sociale.",

  "Finalisation":
    "Préciser le contexte d’usage du résultat pour adapter la forme du rapport final.",
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getSelectedIds(
  answers: EvaluationAnswers,
  questionId: QuestionId,
): OptionId[] {
  const answer = answers[questionId]

  if (!answer) {
    return []
  }

  return Array.isArray(answer) ? answer : [answer]
}

function isQuestionAnswered(
  answers: EvaluationAnswers,
  question: EvaluationQuestion,
): boolean {
  return getSelectedIds(answers, question.id).length > 0
}

function isSectionComplete(
  sectionName: EvaluationSection,
  visibleQuestions: EvaluationQuestion[],
  answers: EvaluationAnswers,
): boolean {
  const sectionQuestions = visibleQuestions.filter(
    (question) => question.section === sectionName,
  )

  if (sectionQuestions.length === 0) {
    return false
  }

  return sectionQuestions.every((question) => isQuestionAnswered(answers, question))
}

function countAnswered(
  sectionName: EvaluationSection,
  visibleQuestions: EvaluationQuestion[],
  answers: EvaluationAnswers,
): number {
  return visibleQuestions
    .filter((question) => question.section === sectionName)
    .filter((question) => isQuestionAnswered(answers, question))
    .length
}

function toStoredAnswers(
  answers: EvaluationAnswers,
  visibleQuestions: EvaluationQuestion[],
): StoredAnswer[] {
  return visibleQuestions.map((question) => ({
    questionId: question.id,
    selectedOptionIds: getSelectedIds(answers, question.id),
  }))
}

function findFirstIncompleteSection(
  sections: SectionMeta[],
  visibleQuestions: EvaluationQuestion[],
  answers: EvaluationAnswers,
): SectionMeta | null {
  return (
    sections.find(
      (section) => !isSectionComplete(section.name, visibleQuestions, answers),
    ) ?? null
  )
}

// ─── Sidebar item ─────────────────────────────────────────────────────────────

interface SidebarItemProps {
  section: SectionMeta
  isActive: boolean
  isComplete: boolean
  answered: number
  total: number
  onClick: () => void
}

function SidebarItem({
  section,
  isActive,
  isComplete,
  answered,
  total,
  onClick,
}: SidebarItemProps) {
  const percentage = total > 0 ? Math.round((answered / total) * 100) : 0

  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={isActive ? 'step' : undefined}
      className={[
        'w-full rounded-xl p-3.5 text-left transition-all duration-150',
        'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-primary',
        isActive
          ? 'bg-[#D9D0E3]/60 shadow-sm ring-1 ring-[#4A2D57]/20'
          : 'bg-white/40 hover:bg-white/70 hover:shadow-sm',
      ].join(' ')}
    >
      <div className="mb-2.5 flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <span
            aria-hidden="true"
            className={[
              'mt-0.5 h-2 w-2 shrink-0 rounded-full transition-colors',
              isActive
                ? 'bg-primary'
                : isComplete
                  ? 'bg-[var(--color-positive)]'
                  : 'bg-border',
            ].join(' ')}
          />

          <span
            className={[
              'text-sm font-semibold leading-snug',
              isActive ? 'text-primary' : 'text-foreground/70',
            ].join(' ')}
          >
            {section.name}
          </span>
        </div>

        <span
          className={[
            'shrink-0 text-xs tabular-nums',
            isActive ? 'font-semibold text-primary/70' : 'text-foreground/50',
          ].join(' ')}
        >
          {answered}/{total}
        </span>
      </div>

      <div
        className="h-1 w-full overflow-hidden rounded-full bg-black/10"
        aria-hidden="true"
      >
        <div
          className={[
            'h-full rounded-full transition-all duration-300',
            isComplete ? 'bg-[var(--color-positive)]' : 'bg-primary/70',
          ].join(' ')}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </button>
  )
}

// ─── Question card ────────────────────────────────────────────────────────────

interface QuestionCardProps {
  question: EvaluationQuestion
  selectedOptionIds: OptionId[]
  onSelect: (optionId: OptionId) => void
}

function QuestionCard({
  question,
  selectedOptionIds,
  onSelect,
}: QuestionCardProps) {
  const hasReachedMaxSelections =
    question.type === 'checkbox' &&
    question.maxSelections > 0 &&
    selectedOptionIds.length >= question.maxSelections

  return (
    <div className="rounded-2xl bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8">
      <fieldset>
        <legend className="text-lg font-semibold leading-snug text-foreground">
          {question.title}
        </legend>

        {question.note && (
          <p className="mt-2 text-sm leading-relaxed text-foreground/65">
            {question.note}
          </p>
        )}

        {question.subtext && (
          <p className="mt-1 text-xs italic leading-relaxed text-foreground/50">
            {question.subtext}
          </p>
        )}

        <div className="mt-5 flex flex-col gap-3">
          {question.options.map((option) => {
            const isSelected = selectedOptionIds.includes(option.id)

            const isDisabled =
              question.type === 'checkbox' &&
              hasReachedMaxSelections &&
              !isSelected

            const optionClasses = isDisabled
              ? 'cursor-not-allowed border-black/10 bg-white/30 opacity-45'
              : isSelected
                ? 'cursor-pointer border-primary bg-[#D9D0E3]/45'
                : 'cursor-pointer border-black/10 bg-white/50 hover:bg-white/80'

            return (
              <label
                key={option.id}
                className={[
                  'flex gap-3 rounded-xl border p-4 transition',
                  'focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-primary',
                  optionClasses,
                ].join(' ')}
              >
                <input
                  type={question.type}
                  name={question.id}
                  checked={isSelected}
                  disabled={isDisabled}
                  onChange={() => {
                    if (isDisabled) {
                      return
                    }

                    onSelect(option.id)
                  }}
                  className="mt-1"
                />

                <span className="text-sm leading-relaxed text-foreground/85">
                  {option.label}
                </span>
              </label>
            )
          })}
        </div>

        {question.type === 'checkbox' && question.maxSelections > 1 && (
          <p className="mt-3 text-xs text-foreground/50">
            Maximum {question.maxSelections} réponses.
          </p>
        )}

        {question.type === 'checkbox' && hasReachedMaxSelections && (
          <p className="mt-2 text-xs text-primary/70">
            Le nombre maximum de réponses est atteint. Désélectionnez une option
            pour en choisir une autre.
          </p>
        )}
      </fieldset>
    </div>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────

export function Questionnaire() {
  const router = useRouter()
  const contentRef = useRef<HTMLDivElement>(null)

  const [globalError, setGlobalError] = useState<string | null>(null)

  const {
    answers,
    currentSection,
    currentSectionIndex,
    currentQuestions,
    visibleQuestions,
    visibleSections,
    setRadioAnswer,
    toggleCheckboxAnswer,
    goToPreviousSection,
    goToNextSection,
    isFirstSection,
    isLastSection,
  } = useEvaluationForm()

  const sectionsWithQuestions = useMemo<SectionMeta[]>(() => {
    return visibleSections.map((section) => ({
      name: section,
      description: SECTION_DESCRIPTIONS[section],
    }))
  }, [visibleSections])

  const activeSectionMeta = sectionsWithQuestions[currentSectionIndex]

  const canProceed =
    currentSection !== undefined &&
    isSectionComplete(currentSection, visibleQuestions, answers)

  const totalAnswered = visibleQuestions.filter((question) =>
    isQuestionAnswered(answers, question),
  ).length

  const totalVisible = visibleQuestions.length

  function scrollToContent() {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        contentRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      })
    })
  }

  function handleOptionSelect(question: EvaluationQuestion, optionId: OptionId) {
    setGlobalError(null)

    if (question.type === 'radio') {
      setRadioAnswer(question.id, optionId)
      return
    }

    toggleCheckboxAnswer(question, optionId)
  }

  function handleNext() {
    if (!canProceed) {
      setGlobalError('Répondez aux questions de cette section pour continuer.')
      scrollToContent()
      return
    }

    if (isLastSection) {
      const incompleteSection = findFirstIncompleteSection(
        sectionsWithQuestions,
        visibleQuestions,
        answers,
      )

      if (incompleteSection) {
        setGlobalError('Certaines questions obligatoires doivent encore être complétées.')
        scrollToContent()
        return
      }

      const storedAnswers = toStoredAnswers(answers, visibleQuestions)

      saveAnswers(storedAnswers)

      router.push('/resultats', { scroll: true })
      return
    }

    setGlobalError(null)
    goToNextSection()
    scrollToContent()
  }

  function handlePrevious() {
    setGlobalError(null)
    goToPreviousSection()
    scrollToContent()
  }

  // ─── Rendu ──────────────────────────────────────────────────────────────

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:items-start">
      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside aria-label="Sections du questionnaire" className="lg:sticky lg:top-28">
        {/* Progression mobile */}
        <div className="mb-4 flex items-center justify-between rounded-xl bg-white/50 px-4 py-3 lg:hidden">
          <p className="text-sm font-medium text-foreground/70">Progression</p>

          <p className="text-sm font-semibold text-primary tabular-nums">
            {totalAnswered} / {totalVisible}
          </p>
        </div>

        {/* Sections */}
        <nav aria-label="Navigation par section" className="flex flex-col gap-2">
          {sectionsWithQuestions.map((section, index) => {
            const sectionQuestions = visibleQuestions.filter(
              (question) => question.section === section.name,
            )

            const answered = countAnswered(section.name, visibleQuestions, answers)
            const total = sectionQuestions.length
            const complete = isSectionComplete(section.name, visibleQuestions, answers)
            const isActive = section.name === currentSection

            return (
              <SidebarItem
                key={section.name}
                section={section}
                isActive={isActive}
                isComplete={complete}
                answered={answered}
                total={total}
                onClick={() => {
                  setGlobalError(null)

                  if (index < currentSectionIndex) {
                    goToPreviousSection()
                    scrollToContent()
                    return
                  }

                  if (index === currentSectionIndex + 1 && canProceed) {
                    handleNext()
                  }
                }}
              />
            )
          })}
        </nav>

        {/* Progression desktop */}
        <div className="mt-4 hidden rounded-xl bg-white/50 px-4 py-3 lg:block">
          <p className="mb-0.5 text-xs text-foreground/60">Progression globale</p>

          <p className="text-sm font-semibold text-primary tabular-nums">
            {totalAnswered} / {totalVisible} réponses
          </p>
        </div>

        <p className="mt-3 text-center text-xs text-foreground/50">
          Les réponses restent dans votre navigateur.
        </p>
      </aside>

      {/* ── Contenu ──────────────────────────────────────────────────────── */}
      <div ref={contentRef} className="flex flex-col gap-8 scroll-mt-28">
        {/* Erreur globale */}
        {globalError && (
          <div
            role="alert"
            aria-live="assertive"
            className="rounded-xl bg-[var(--color-warning)]/10 px-5 py-4 ring-1 ring-[var(--color-warning)]/40"
          >
            <p className="text-sm font-semibold text-[var(--color-warning)]">
              {globalError}
            </p>
          </div>
        )}

        {/* En-tête de section */}
        <header className="border-b border-black/10 pb-6">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary/60">
            Section {currentSectionIndex + 1} sur {visibleSections.length}
          </p>

          <h2 className="mb-2 text-2xl font-semibold text-foreground">
            {activeSectionMeta?.name}
          </h2>

          <p className="text-sm leading-relaxed text-foreground/70">
            {activeSectionMeta?.description}
          </p>
        </header>

        {/* Questions */}
        {currentQuestions.length > 0 ? (
          <div className="flex flex-col gap-6">
            {currentQuestions.map((question, index) => (
              <div key={question.id} className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40">
                  Question {index + 1}
                </p>

                <QuestionCard
                  question={question}
                  selectedOptionIds={getSelectedIds(answers, question.id)}
                  onSelect={(optionId) => handleOptionSelect(question, optionId)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white/50 p-6">
            <p className="text-sm text-foreground/60">
              Aucune question disponible dans cette section selon vos réponses précédentes.
            </p>
          </div>
        )}

        {/* Message obligation locale */}
        {currentQuestions.length > 0 && !canProceed && (
          <p role="status" aria-live="polite" className="text-sm text-foreground/60">
            Répondez aux questions de cette section pour continuer.
          </p>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={isFirstSection}
            className={[
              'text-sm font-semibold text-foreground/70',
              'hover:bg-white/60 hover:text-foreground',
              'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
              'disabled:opacity-40',
            ].join(' ')}
          >
            ← Section précédente
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className={[
              'bg-primary text-primary-foreground text-sm font-semibold',
              'hover:opacity-90 transition-opacity',
              'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
              'disabled:opacity-40',
            ].join(' ')}
          >
            {isLastSection ? 'Voir les résultats' : 'Section suivante →'}
          </Button>
        </div>
      </div>
    </div>
  )
}