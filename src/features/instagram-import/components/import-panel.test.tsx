import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ImportPanel } from '@/features/instagram-import/components/import-panel'

function chooseFiles(files: File[]) {
  const input = screen.getByLabelText(/arraste o zip ou os json/i)
  fireEvent.change(input, { target: { files } })
}

describe('ImportPanel', () => {
  it('recebe um JSON e permite limpar a seleção', () => {
    render(<ImportPanel />)

    chooseFiles([new File(['{}'], 'following.json', { type: 'application/json' })])

    expect(screen.getByText('following.json')).toBeInTheDocument()
    expect(
      screen.getByText(/arquivo recebido neste navegador/i),
    ).toBeInTheDocument()

    fireEvent.click(
      screen.getByRole('button', { name: 'Limpar e começar de novo' }),
    )

    expect(screen.queryByText('following.json')).not.toBeInTheDocument()
  })

  it('explica quando o arquivo não serve', () => {
    render(<ImportPanel />)

    chooseFiles([new File(['x'], 'foto.png', { type: 'image/png' })])

    expect(screen.getByRole('alert')).toHaveTextContent('foto.png')
    expect(screen.queryByText(/arquivo recebido neste navegador/i)).not.toBeInTheDocument()
  })
})
