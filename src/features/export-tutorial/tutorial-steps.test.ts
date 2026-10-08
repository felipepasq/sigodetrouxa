import { describe, expect, it } from 'vitest'

import { tutorialSteps } from '@/features/export-tutorial/tutorial-steps'

describe('tutorialSteps', () => {
  it('segue a ordem da exportação e deixa o download sem imagem', () => {
    expect(tutorialSteps.map((step) => step.number)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ])
    expect(tutorialSteps[7]?.essential).toBe(true)
    expect(tutorialSteps[8]?.essential).toBe(true)
    expect(tutorialSteps[9]?.image).toBeUndefined()
    expect(tutorialSteps[9]?.instruction).toMatch(/ZIP/)
  })

  it('dá a cada passo ilustrado um arquivo e um texto alternativo', () => {
    const illustrated = tutorialSteps.filter((step) => step.image)

    expect(illustrated).toHaveLength(9)
    for (const step of illustrated) {
      expect(step.image?.src).toMatch(/^\/tutorial\/passo-\d{2}-[\w-]+\.jpg$/)
      expect(step.image?.alt.length).toBeGreaterThan(20)
    }
  })
})
