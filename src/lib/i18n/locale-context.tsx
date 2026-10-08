import { useEffect, type ReactNode } from 'react'

import type { Locale } from '@/lib/i18n/locale'
import { LocaleContext, useCopy } from '@/lib/i18n/use-locale'

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale
  children: ReactNode
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

export function DocumentLocale() {
  const text = useCopy()

  useEffect(() => {
    document.documentElement.lang = text.htmlLang
    document.title = text.documentTitle
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', text.documentDescription)
  }, [text])

  return null
}
