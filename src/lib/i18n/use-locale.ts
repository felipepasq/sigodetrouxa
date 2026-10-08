import { createContext, useContext } from 'react'

import { copy } from '@/lib/i18n/copy'
import type { Locale } from '@/lib/i18n/locale'

export const LocaleContext = createContext<Locale>('pt')

export function useLocale() {
  return useContext(LocaleContext)
}

export function useCopy() {
  return copy[useLocale()]
}
