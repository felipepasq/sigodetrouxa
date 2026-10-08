import { describe, expect, it } from 'vitest'

import { tutorialSteps } from '@/features/export-tutorial/tutorial-steps'

describe('tutorialSteps', () => {
  it('segue a ordem da exportação e marca JSON e Desde o início como essenciais', () => {
    expect(tutorialSteps.map((step) => step.number)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    ])
    expect(tutorialSteps.filter((step) => step.essential).map((step) => step.number)).toEqual([
      9, 10,
    ])
    expect(tutorialSteps[10]?.instruction).toMatch(/ZIP/)
  })

  it('dá a cada passo ilustrado um arquivo e um texto alternativo', () => {
    const illustrated = tutorialSteps.filter((step) => step.image)

    expect(illustrated).toHaveLength(11)
    for (const step of illustrated) {
      expect(step.image?.src).toMatch(/^\/tutorial\/passo-\d{2}-[\w-]+\.jpg$/)
      expect(step.image?.alt.length).toBeGreaterThan(20)
    }
  })
})
