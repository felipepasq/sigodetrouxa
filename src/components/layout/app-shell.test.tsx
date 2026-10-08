import { render, screen } from '@testing-library/react'
import { createMemoryHistory, RouterProvider } from '@tanstack/react-router'
import { describe, expect, it } from 'vitest'

import { createAppRouter } from '@/app/router'

describe('casca da aplicação', () => {
  it('mostra o nome do produto e a garantia de privacidade', async () => {
    const router = createAppRouter(
      createMemoryHistory({
        initialEntries: ['/'],
      }),
    )

    await router.load()

    render(<RouterProvider router={router} />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Você segue. Eles acham que são famosos.',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(
        'Seus dados são processados no seu navegador. Nada é enviado para nossos servidores.',
      ).length,
    ).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: 'Como exportar' })).toHaveAttribute(
      'href',
      '#como-exportar',
    )
  })
})
