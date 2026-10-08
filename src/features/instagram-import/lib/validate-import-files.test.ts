import { describe, expect, it } from 'vitest'

import {
  describeImportIssue,
  MAX_IMPORT_FILE_BYTES,
  validateImportFiles,
} from '@/features/instagram-import/lib/validate-import-files'

function file(name: string, size = 128, type = '') {
  const created = new File(['x'], name, { type })
  Object.defineProperty(created, 'size', { value: size })
  return created
}

describe('validateImportFiles', () => {
  it('aceita um ZIP', () => {
    const result = validateImportFiles([file('instagram.zip', 2048, 'application/zip')])

    expect(result.ok).toBe(true)
  })

  it('aceita vários JSON', () => {
    const result = validateImportFiles([
      file('followers_1.json', 100, 'application/json'),
      file('following.json', 100, 'application/json'),
    ])

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.files).toHaveLength(2)
    }
  })

  it('rejeita formato diferente de ZIP e JSON', () => {
    const result = validateImportFiles([file('foto.png', 100, 'image/png')])

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(describeImportIssue(result.issue)).toContain('foto.png')
    }
  })

  it('rejeita arquivo acima de 50 MB', () => {
    const result = validateImportFiles([
      file('instagram.zip', MAX_IMPORT_FILE_BYTES + 1, 'application/zip'),
    ])

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.issue.code).toBe('too-large')
    }
  })

  it('rejeita ZIP misturado com JSON e mais de um ZIP', () => {
    const mixed = validateImportFiles([
      file('instagram.zip'),
      file('followers.json'),
    ])
    const archives = validateImportFiles([
      file('um.zip'),
      file('dois.zip'),
    ])

    expect(mixed.ok).toBe(false)
    expect(archives.ok).toBe(false)
    if (!mixed.ok) {
      expect(describeImportIssue(mixed.issue)).toMatch(/ZIP ou somente os arquivos JSON/)
    }
    if (!archives.ok) {
      expect(describeImportIssue(archives.issue)).toMatch(/apenas um arquivo ZIP/)
    }
  })
})
