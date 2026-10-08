import { createFileRoute } from '@tanstack/react-router'

import { ExportTutorial } from '@/features/export-tutorial/components/export-tutorial'
import { FollowCheck } from '@/features/follow-analysis/components/follow-check'
import { Hero } from '@/features/landing/components/hero'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Hero />
      <FollowCheck />
      <ExportTutorial />
    </>
  )
}
