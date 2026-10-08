export type Locale = 'pt' | 'en'

export type LocaleSearch = {
  lang?: 'en'
}

export function validateLocaleSearch(search: Record<string, unknown>): LocaleSearch {
  return search.lang === 'en' ? { lang: 'en' } : {}
}

export function localeFromSearch(search: LocaleSearch): Locale {
  return search.lang === 'en' ? 'en' : 'pt'
}

export function searchFromLocale(locale: Locale): LocaleSearch {
  return locale === 'en' ? { lang: 'en' } : {}
}
