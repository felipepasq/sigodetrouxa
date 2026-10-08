import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ExportTutorial } from '@/features/export-tutorial/components/export-tutorial'
import { tutorialSteps } from '@/features/export-tutorial/tutorial-steps'

describe('ExportTutorial', () => {
  it('mostra os passos na ordem, com texto alternativo nas imagens', () => {
    render(<ExportTutorial />)

    const titles = screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent)
    expect(titles).toEqual(tutorialSteps.map((step) => step.title))

    for (const step of tutorialSteps) {
      if (!step.image) {
        continue
      }

      const image = screen.getByRole('img', { name: step.image.alt })
      expect(image).toHaveAttribute('src', step.image.src)
    }

    expect(screen.getAllByRole('img')).toHaveLength(11)
    expect(screen.getByRole('link', { name: 'Enviar o arquivo' })).toHaveAttribute(
      'href',
      '#importar',
    )
  })
})
