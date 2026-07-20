'use client'

import { useEffect,  useState } from 'react'
import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { hasSeenGuide } from '@/lib/storage'
import { GuideModal } from './GuideModal'

export function EvaluationGuide() {
  const [guideOpen,  setGuideOpen] = useState(false)

  useEffect(() => {
    if (!hasSeenGuide()) {
      setGuideOpen(true)
    }
  },  [])

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setGuideOpen(true)}
        className="gap-2"
      >
        <BookOpen size={16} aria-hidden="true" />
        Voir le guide
      </Button>

      <GuideModal open={guideOpen} onOpenChange={setGuideOpen} />
    </>
  )
}