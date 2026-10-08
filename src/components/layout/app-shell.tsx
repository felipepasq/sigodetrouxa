import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

import { useCopy, useLocale } from '@/lib/i18n/use-locale'
import { searchFromLocale, type Locale } from '@/lib/i18n/locale'

type AppShellProps = {
  children: ReactNode
}

function LanguageLink({
  locale,
  label,
  current,
}: {
  locale: Locale
  label: string
  current: boolean
}) {
  return (
    <Link
      to="/"
      search={() => searchFromLocale(locale)}
      activeOptions={{ exact: true, includeSearch: true }}
      lang={locale === 'en' ? 'en' : 'pt-BR'}
      className={
        current
          ? 'rounded-full bg-foreground px-2.5 py-1 text-xs font-semibold text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          : 'rounded-full px-2.5 py-1 text-xs font-semibold text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
      }
    >
      {label}
    </Link>
  )
}

export function AppShell({ children }: AppShellProps) {
  const copy = useCopy()
  const locale = useLocale()

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {copy.skipToContent}
      </a>
      <header className="border-b border-border">
        <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 py-2">
          <Link
            to="/"
            search={() => searchFromLocale(locale)}
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <img
              src="/brand/logo.webp"
              alt="Sigo de Trouxa"
              width={1024}
              height={341}
              className="h-12 w-auto max-w-[42vw] object-contain sm:h-14 sm:max-w-[56vw]"
            />
          </Link>
          <div className="flex items-center gap-2">
            <nav aria-label={copy.languageLabel} className="flex rounded-full border border-border p-0.5">
              <LanguageLink locale="pt" label="PT" current={locale === 'pt'} />
              <LanguageLink locale="en" label="EN" current={locale === 'en'} />
            </nav>
            <nav aria-label={copy.navLabel}>
              <a
                href="#como-exportar"
                className="inline-flex rounded-full bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-4"
              >
                {copy.howToExport}
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main id="conteudo" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground">
          <p>{copy.privacy}</p>
          <p>{copy.madeBy}</p>
        </div>
      </footer>
    </div>
  )
}
