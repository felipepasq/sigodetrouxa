import type { Locale } from '@/lib/i18n/locale'

export const MAX_IMPORT_FILE_BYTES = 50 * 1024 * 1024
export const MAX_IMPORT_FILE_COUNT = 24

export type ImportFileIssue =
  | { code: 'unsupported-type'; fileName: string }
  | { code: 'too-large'; fileName: string }
  | { code: 'too-many'; maxCount: number }
  | { code: 'mixed' }
  | { code: 'multiple-archives' }

export type ImportValidation =
  | { ok: true; files: File[] }
  | { ok: false; issue: ImportFileIssue }

function extensionOf(fileName: string) {
  const dot = fileName.lastIndexOf('.')
  return dot === -1 ? '' : fileName.slice(dot).toLowerCase()
}

function isZip(file: File) {
  return extensionOf(file.name) === '.zip'
}

function isJson(file: File) {
  return extensionOf(file.name) === '.json'
}

export function validateImportFiles(files: readonly File[]): ImportValidation {
  if (files.length > MAX_IMPORT_FILE_COUNT) {
    return {
      ok: false,
      issue: { code: 'too-many', maxCount: MAX_IMPORT_FILE_COUNT },
    }
  }

  const unsupported = files.find((file) => !isZip(file) && !isJson(file))
  if (unsupported) {
    return {
      ok: false,
      issue: { code: 'unsupported-type', fileName: unsupported.name },
    }
  }

  const oversized = files.find((file) => file.size > MAX_IMPORT_FILE_BYTES)
  if (oversized) {
    return {
      ok: false,
      issue: { code: 'too-large', fileName: oversized.name },
    }
  }

  const archives = files.filter(isZip)
  const jsonFiles = files.filter(isJson)

  if (archives.length > 1) {
    return { ok: false, issue: { code: 'multiple-archives' } }
  }

  if (archives.length === 1 && jsonFiles.length > 0) {
    return { ok: false, issue: { code: 'mixed' } }
  }

  return { ok: true, files: [...files] }
}

export function describeImportIssue(issue: ImportFileIssue, locale: Locale = 'pt') {
  const en = locale === 'en'

  switch (issue.code) {
    case 'unsupported-type':
      return en
        ? `${issue.fileName} is not a ZIP or a JSON file. Send the Instagram export.`
        : `${issue.fileName} não é um ZIP nem um JSON. Envie a exportação do Instagram.`
    case 'too-large':
      return en
        ? `${issue.fileName} is too large. The limit is 50 MB. Export only Followers and Following.`
        : `${issue.fileName} é grande demais. O limite é 50 MB. Exporte só Seguidores e Seguindo.`
    case 'too-many':
      return en
        ? `Send at most ${issue.maxCount} files.`
        : `Envie no máximo ${issue.maxCount} arquivos.`
    case 'mixed':
      return en
        ? 'Send a single ZIP or only the JSON files.'
        : 'Envie um único ZIP ou somente os arquivos JSON.'
    case 'multiple-archives':
      return en ? 'Send only one ZIP file.' : 'Envie apenas um arquivo ZIP.'
  }
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`
  }

  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
