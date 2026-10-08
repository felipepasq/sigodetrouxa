import { Analytics } from '@vercel/analytics/react'
import { createRootRoute, Outlet } from '@tanstack/react-router'

import { AppShell } from '@/components/layout/app-shell'
import { DocumentLocale, LocaleProvider } from '@/lib/i18n/locale-context'
import { localeFromSearch, validateLocaleSearch } from '@/lib/i18n/locale'

export const Route = createRootRoute({
  validateSearch: validateLocaleSearch,
  component: RootLayout,
})

function RootLayout() {
  const search = Route.useSearch()
  const locale = localeFromSearch(search)

  return (
    <LocaleProvider locale={locale}>
      <DocumentLocale />
      <AppShell>
        <Outlet />
      </AppShell>
      <Analytics />
    </LocaleProvider>
  )
}
