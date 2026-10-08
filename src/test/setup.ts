import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

import '@testing-library/jest-dom/vitest'

afterEach(() => {
  cleanup()
})

Object.defineProperty(window, 'scrollTo', {
  configurable: true,
  value: () => undefined,
})
