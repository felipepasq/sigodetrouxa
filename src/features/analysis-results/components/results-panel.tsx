import { useState } from 'react'

import { downloadTextFile, notFollowingBackCsv } from '@/features/analysis-results/lib/to-csv'
import { instagramProfileUrl } from '@/features/analysis-results/lib/profile-url'
import { nonFollowerPercentage, type FollowAnalysis } from '@/features/follow-analysis/lib/compare-follows'
import { Button } from '@/components/ui/button'

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
    .sort((left, right) => left.label.localeCompare(right.label, 'pt-BR') * (order === 'asc' ? 1 : -1))

  const headline =
    analysis.following.length === 0
      ? 'Neste arquivo, você não segue ninguém.'
      : analysis.notFollowingBack.length === 0
        ? 'Milagre! Todo mundo retribui seu carinho. ❤️'
        : `Encontramos ${analysis.notFollowingBack.length} ${analysis.notFollowingBack.length === 1 ? 'pessoa que não retribui' : 'pessoas que não retribuem'} seu carinho. 🤡`

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
        {percentage}% de quem você segue não segue de volta. Isso descreve o arquivo
        exportado, não o Instagram agora.
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Você segue" value={analysis.following.length} />
        <Stat label="Te seguem" value={analysis.followers.length} />
        <Stat label="Mútuos" value={analysis.mutual.length} />
        <Stat label="Não te seguem" value={analysis.notFollowingBack.length} />
      </ul>

      <div className="mt-6 space-y-2 text-sm leading-relaxed text-muted-foreground">
        <p>
          {analysis.completeness === 'restricted'
            ? 'O arquivo indica um intervalo de datas limitado. A comparação não é definitiva: seguidores antigos podem ficar de fora.'
            : 'Não deu para confirmar, por este arquivo, se a exportação começa no início da conta. Se o intervalo não foi Desde o início, podem aparecer pessoas que te seguem.'}
        </p>
        {analysis.emptyFollowers ? (
          <p>A lista de seguidores chegou vazia. Confira se o arquivo exportado é o de seguidores.</p>
        ) : null}
        {analysis.ignoredRecords > 0 ? (
          <p>
            {analysis.ignoredRecords}{' '}
            {analysis.ignoredRecords === 1 ? 'registro foi ignorado' : 'registros foram ignorados'}{' '}
            porque não tinha um usuário válido.
          </p>
        ) : null}
        <p>Arquivos usados: {analysis.recognizedFiles.join(', ')}.</p>
        <p>
          Observação: alguns usuários podem ter desativado a conta. Eles
          continuam nesta lista, mas o perfil pode não abrir.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:max-w-sm">
          <label htmlFor="buscar-usuario" className="text-sm font-medium">
            Buscar usuário
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
            {order === 'asc' ? 'A–Z' : 'Z–A'}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={analysis.notFollowingBack.length === 0}
            onClick={() => {
              downloadTextFile('nao-seguem-de-volta.csv', notFollowingBackCsv(analysis.notFollowingBack))
            }}
          >
            Baixar CSV
          </Button>
        </div>
      </div>

      {copyError ? (
        <p role="alert" className="mt-4 text-sm text-destructive">
          Não foi possível copiar o usuário.
        </p>
      ) : null}

      {visible.length === 0 && normalizedQuery ? (
        <p className="mt-6 text-sm text-muted-foreground">Nenhum usuário com esse nome.</p>
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
                  {copied === account.username ? 'Copiado' : 'Copiar'}
                </Button>
              </li>
            )
          })}
        </ul>
      ) : null}

      <Button type="button" className="mt-8" onClick={onExportAgain}>
        Exportar de novo
      </Button>
    </section>
  )
}
