import { useRef, useState } from 'react'

import { ResultsPanel } from '@/features/analysis-results/components/results-panel'
import type { FollowAnalysis } from '@/features/follow-analysis/lib/compare-follows'
import { analyzeImport } from '@/features/instagram-import/lib/analyze-import'
import { ImportPanel } from '@/features/instagram-import/components/import-panel'

type Phase =
  | { status: 'idle' }
  | { status: 'processing' }
  | { status: 'error'; message: string }
  | { status: 'ready'; analysis: FollowAnalysis }

export function FollowCheck() {
  const [phase, setPhase] = useState<Phase>({ status: 'idle' })
  const [resetToken, setResetToken] = useState(0)
  const requestId = useRef(0)

  function exportAgain() {
    requestId.current += 1
    setPhase({ status: 'idle' })
    setResetToken((current) => current + 1)
    document.getElementById('importar')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    document.getElementById('instagram-export')?.focus()
  }

  async function onAccepted(files: File[]) {
    const current = requestId.current + 1
    requestId.current = current
    setPhase({ status: 'processing' })

    const outcome = await analyzeImport(files)
    if (current !== requestId.current) {
      return
    }

    if (!outcome.ok) {
      setPhase({ status: 'error', message: outcome.message })
      return
    }

    setPhase({ status: 'ready', analysis: outcome.analysis })
    document.getElementById('resultado')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {phase.status === 'ready' ? (
        <ResultsPanel analysis={phase.analysis} onExportAgain={exportAgain} />
      ) : null}
      <ImportPanel
        key={resetToken}
        busy={phase.status === 'processing'}
        errorMessage={phase.status === 'error' ? phase.message : null}
        onAccepted={(files) => {
          void onAccepted(files)
        }}
        onClear={() => {
          requestId.current += 1
          setPhase({ status: 'idle' })
        }}
      />
    </>
  )
}
