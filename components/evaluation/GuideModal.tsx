'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button }    from '@/components/ui/button'
import { Checkbox }  from '@/components/ui/checkbox'
import { Label }     from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { hasSeenGuide, markGuideAsSeen } from '@/lib/storage'

const steps = [
  {
    number: '01',
    title: 'Répondez selon votre projet',
    description: `Les questions portent sur l'objectif de l'expérience, le public visé, les mécaniques envisagées et le contexte d'utilisation. Il n'y a pas de bonne ou mauvaise réponse : l'objectif est de faire émerger les risques potentiels.`,
  },
  {
    number: '02',
    title: 'Comprenez les recommandations',
    description: `Vos réponses génèrent des tags, qui activent des règles de priorité. Le résultat propose un verdict général, des points de vigilance et des recommandations concrètes.`,
  },
  {
    number: '03',
    title: 'Utilisez le résultat comme support de discussion',
    description: `Les recommandations ne remplacent pas une décision de projet, un test utilisateur ou une analyse juridique. Elles servent à préparer une discussion avec l'équipe ou le client.`,
  },
  {
    number: '04',
    title: 'Analyse IA complémentaire',
    description: `Une analyse IA peut aider à reformuler ou approfondir les résultats, mais elle intervient après la logique du framework. Elle ne remplace pas les règles définies dans l'outil.`,
  },
]

interface GuideModalProps {
  open?:         boolean
  onOpenChange?: (open: boolean) => void
}

export function GuideModal({ open, onOpenChange }: GuideModalProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [doNotShow, setDoNotShow]       = useState(false)

  useEffect(() => {
    if (open === undefined && !hasSeenGuide()) {
      setInternalOpen(true)
    }
  }, [open])

  const isControlled = open !== undefined
  const isOpen       = isControlled ? open : internalOpen

  function handleOpenChange(value: boolean) {
    if (!value && doNotShow) markGuideAsSeen()
    if (isControlled) {
      onOpenChange?.(value)
    } else {
      setInternalOpen(value)
    }
  }

  function handleClose() {
    handleOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg bg-background border-border">

        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-semibold text-primary">
            Guide d'utilisation
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-foreground/70">
            Cette évaluation aide à identifier les points de vigilance éthiques
            d'une expérience gamifiée. Elle s'adresse aux professionnel·les qui
            souhaitent questionner une idée, une mécanique ou une interface avant
            sa conception ou sa mise en production.
          </DialogDescription>
        </DialogHeader>

        <Separator className="my-2" />

        <ol className="flex flex-col gap-5 py-2">
          {steps.map((step) => (
            <li key={step.number} className="flex gap-4">
              <span
                className="shrink-0 text-2xl font-semibold leading-none text-primary/25"
                aria-hidden="true"
              >
                {step.number}
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-foreground">
                  {step.title}
                </p>
                <p className="text-sm leading-relaxed text-foreground/70">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <Separator className="my-2" />

        <div className="flex flex-col gap-4 pt-1">
          <div className="flex items-center gap-3">
            <Checkbox
              id="do-not-show"
              checked={doNotShow}
              onCheckedChange={(checked) => setDoNotShow(checked === true)}
            />
            <Label
              htmlFor="do-not-show"
              className="text-sm text-foreground/70 cursor-pointer select-none"
            >
              Ne plus afficher ce guide au démarrage
            </Label>
          </div>

          <Button
            onClick={handleClose}
            className="w-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Commencer l'évaluation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}