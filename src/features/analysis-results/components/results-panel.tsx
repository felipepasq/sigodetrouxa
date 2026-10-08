import { useState } from 'react'

import { downloadTextFile, notFollowingBackCsv } from '@/features/analysis-results/lib/to-csv'
import { instagramProfileUrl } from '@/features/analysis-results/lib/profile-url'
import { nonFollowerPercentage, type FollowAnalysis } from '@/features/follow-analysis/lib/compare-follows'
import { Button } from '@/components/ui/button'
import { useCopy } from '@/lib/i18n/use-locale'

type ResultsPanelProps = {
  analysis: FollowAnalysis
  onExportAgain: () => void
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <li className="rounded-2xl border border-border bg-card px-4 py-3">
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </li>
  )
}

export function ResultsPanel({ analysis, onExportAgain }: ResultsPanelProps) {
  const [query, setQuery] = useState('')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [copied, setCopied] = useState<string | null>(null)
  const [copyError, setCopyError] = useState(false)
  const copy = useCopy()
  const percentage = nonFollowerPercentage(analysis)
  const normalizedQuery = query.trim().toLowerCase()
  const visible = analysis.notFollowingBack
    .filter((account) => {
      if (!normalizedQuery) {
        return true
      }

      return (
        account.username.includes(normalizedQuery) ||
        account.label.toLowerCase().includes(normalizedQuery)
      )
    })
    .sort((left, right) => left.label.localeCompare(right.label, copy.sortLocale) * (order === 'asc' ? 1 : -1))

  const headline =
    analysis.following.length === 0
      ? copy.resultEmptyFollowing
      : analysis.notFollowingBack.length === 0
        ? copy.resultEveryoneFollows
        : copy.resultFound(analysis.notFollowingBack.length)

  async function copyUsername(username: string) {
    try {
      await navigator.clipboard.writeText(username)
      setCopied(username)
      setCopyError(false)
    } catch {
      setCopied(null)
      setCopyError(true)
    }
  }

  return (
    <section id="resultado" className="scroll-mt-20 py-8" aria-live="polite">
      <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{headline}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {copy.resultSummary(percentage)}
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label={copy.statFollowing} value={analysis.following.length} />
        <Stat label={copy.statFollowers} value={analysis.followers.length} />
        <Stat label={copy.statMutual} value={analysis.mutual.length} />
        <Stat label={copy.statNotFollowing} value={analysis.notFollowingBack.length} />
      </ul>

      <div className="mt-6 space-y-2 text-sm leading-relaxed text-muted-foreground">
        <p>
          {analysis.completeness === 'restricted'
            ? copy.completenessRestricted
            : copy.completenessUnverified}
        </p>
        {analysis.emptyFollowers ? (
          <p>{copy.emptyFollowers}</p>
        ) : null}
        {analysis.ignoredRecords > 0 ? (
          <p>
            {copy.ignoredRecords(analysis.ignoredRecords)}
          </p>
        ) : null}
        <p>{copy.filesUsed(analysis.recognizedFiles.join(', '))}</p>
        <p>{copy.deactivatedNote}</p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:max-w-sm">
          <label htmlFor="buscar-usuario" className="text-sm font-medium">
            {copy.searchLabel}
          </label>
          <input
            id="buscar-usuario"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
            }}
            className="mt-2 h-11 w-full rounded-xl border border-border bg-card px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            aria-pressed={order === 'asc'}
            onClick={() => {
              setOrder((current) => (current === 'asc' ? 'desc' : 'asc'))
            }}
          >
            {order === 'asc' ? copy.sortAsc : copy.sortDesc}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={analysis.notFollowingBack.length === 0}
            onClick={() => {
              downloadTextFile(copy.csvName, notFollowingBackCsv(analysis.notFollowingBack))
            }}
          >
            {copy.downloadCsv}
          </Button>
        </div>
      </div>

      {copyError ? (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {copy.copyFailed}
        </p>
      ) : null}

      {visible.length === 0 && normalizedQuery ? (
        <p className="mt-6 text-sm text-muted-foreground">{copy.noSearchMatch}</p>
      ) : visible.length > 0 ? (
        <ul className="mt-4 divide-y divide-border">
          {visible.map((account) => {
            const href = instagramProfileUrl(account.username)
            return (
              <li key={account.username} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="block truncate rounded-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      @{account.label}
                    </a>
                  ) : (
                    <p className="truncate font-medium">@{account.label}</p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  aria-live="polite"
                  onClick={() => {
                    void copyUsername(account.username)
                  }}
                >
                  {copied === account.username ? copy.copied : copy.copy}
                </Button>
              </li>
            )
          })}
        </ul>
      ) : null}

      <Button type="button" className="mt-8" onClick={onExportAgain}>
        {copy.exportAgain}
      </Button>
    </section>
  )
}
