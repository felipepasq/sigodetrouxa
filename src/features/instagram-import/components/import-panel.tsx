import { useState, type ChangeEvent, type DragEvent } from 'react'

import { Button } from '@/components/ui/button'
import { useCopy, useLocale } from '@/lib/i18n/use-locale'
import { cn } from '@/lib/utils'
import {
  describeImportIssue,
  formatFileSize,
  validateImportFiles,
  type ImportFileIssue,
} from '@/features/instagram-import/lib/validate-import-files'

type ImportState =
  | { status: 'idle' }
  | { status: 'ready'; files: File[] }
  | { status: 'invalid'; issue: ImportFileIssue }

type ImportPanelProps = {
  onAccepted?: (files: File[]) => void
  onClear?: () => void
  busy?: boolean
  errorMessage?: string | null
}

export function ImportPanel({
  onAccepted,
  onClear,
  busy = false,
  errorMessage = null,
}: ImportPanelProps) {
  const [state, setState] = useState<ImportState>({ status: 'idle' })
  const [dragging, setDragging] = useState(false)
  const copy = useCopy()
  const locale = useLocale()

  function commit(list: FileList | readonly File[]) {
    const result = validateImportFiles([...list])
    if (!result.ok) {
      setState({ status: 'invalid', issue: result.issue })
      return
    }

    setState({ status: 'ready', files: result.files })
    onAccepted?.(result.files)
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    const list = event.target.files
    if (!list || list.length === 0) {
      return
    }

    commit(list)
    event.target.value = ''
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    setDragging(false)
    if (event.dataTransfer.files.length === 0) {
      return
    }

    commit(event.dataTransfer.files)
  }

  return (
    <section id="importar" className="scroll-mt-20 py-8">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {copy.importTitle}
      </h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        {copy.importLeadBefore}{' '}
        <strong className="font-medium text-foreground">{copy.importFollowersAndFollowing}</strong>,
        {locale === 'en' ? ' in ' : ' no formato '}
        <strong className="font-medium text-foreground">{copy.importFormat}</strong>,
        {locale === 'en' ? ' with the range ' : ' com o intervalo '}
        <strong className="font-medium text-foreground">{copy.importRange}</strong>.
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {copy.importSnapshot}{' '}
        <a
          href="#como-exportar"
          className="rounded-sm text-foreground underline decoration-primary underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {copy.importSeeHow}
        </a>
        .
      </p>

      <label
        htmlFor="instagram-export"
        onDragEnter={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => {
          setDragging(false)
        }}
        onDrop={onDrop}
        className={cn(
          'mt-6 flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-10 text-center transition-colors focus-within:ring-2 focus-within:ring-ring',
          dragging && 'border-primary bg-accent',
        )}
      >
        <span className="text-base font-medium">
          {copy.importDrop}
        </span>
        <span className="mt-2 text-sm text-muted-foreground">
          {copy.importChoose}
        </span>
        <input
          id="instagram-export"
          className="sr-only"
          type="file"
          accept=".zip,.json,application/zip,application/json"
          multiple
          onChange={onInputChange}
        />
      </label>

      <div aria-live="polite" className="mt-4">
        {state.status === 'invalid' ? (
          <p role="alert" className="text-sm text-destructive">
            {describeImportIssue(state.issue, locale)}
          </p>
        ) : null}
        {busy ? (
          <p className="text-sm text-muted-foreground">{copy.importReading}</p>
        ) : null}
        {errorMessage ? (
          <p role="alert" className="text-sm text-destructive">
            {errorMessage}
          </p>
        ) : null}

        {state.status === 'ready' ? (
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-sm font-medium">
              {state.files.length === 1 ? copy.importReceivedOne : copy.importReceivedMany}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {state.files.map((file) => (
                <li key={`${file.name}-${file.size}-${file.lastModified}`} className="break-all">
                  {file.name}{' '}
                  <span className="text-foreground">{formatFileSize(file.size)}</span>
                </li>
              ))}
            </ul>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() => {
                setState({ status: 'idle' })
                onClear?.()
              }}
            >
              {copy.importClear}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
