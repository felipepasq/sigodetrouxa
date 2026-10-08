import { strFromU8, unzipSync, type UnzipFileInfo } from 'fflate'

import { isFollowersFile, isFollowingFile } from '@/features/follow-analysis/lib/accounts'
import type { ReadError } from '@/features/instagram-import/lib/user-messages'

const MAX_ZIP_ENTRIES = 20_000
const MAX_JSON_FILES = 80
const MAX_JSON_BYTES = 20 * 1024 * 1024
const MAX_TOTAL_JSON_BYTES = 40 * 1024 * 1024
const MAX_COMPRESSION_RATIO = 100

export type ExportDocument = {
  name: string
  data: unknown
}

export type ReadFailure = {
  ok: false
  error: ReadError
}

export type ReadSuccess = {
  ok: true
  documents: ExportDocument[]
}

function isUnsafePath(name: string) {
  if (name.includes('\0') || name.startsWith('/') || name.startsWith('\\')) {
    return true
  }

  return name.split(/[/\\]/).some((part) => part === '..')
}

function isJsonPath(name: string) {
  return name.toLowerCase().endsWith('.json') && !name.endsWith('/')
}

function parseJson(name: string, text: string): ExportDocument | ReadFailure {
  try {
    return { name, data: JSON.parse(text) as unknown }
  } catch {
    return {
      ok: false,
      error: { code: 'invalid-json', name },
    }
  }
}

function readZip(bytes: Uint8Array, archiveName: string): ReadSuccess | ReadFailure {
  let entries = 0
  let jsonFiles = 0
  let totalBytes = 0
  let failure: ReadError | null = null

  let unzipped: Record<string, Uint8Array>
  try {
    unzipped = unzipSync(bytes, {
      filter(file: UnzipFileInfo) {
        entries += 1
        if (entries > MAX_ZIP_ENTRIES) {
          failure = { code: 'zip-too-many-entries' }
          return false
        }

        if (isUnsafePath(file.name)) {
          failure = { code: 'zip-unsafe-path' }
          return false
        }

        if (!isJsonPath(file.name)) {
          return false
        }

        jsonFiles += 1
        const compressed = Math.max(file.size, 1)
        if (
          jsonFiles > MAX_JSON_FILES ||
          file.originalSize > MAX_JSON_BYTES ||
          file.originalSize / compressed > MAX_COMPRESSION_RATIO
        ) {
          failure = { code: 'zip-limits' }
          return false
        }

        totalBytes += file.originalSize
        if (totalBytes > MAX_TOTAL_JSON_BYTES) {
          failure = { code: 'zip-limits' }
          return false
        }

        const important = isFollowersFile(file.name) || isFollowingFile(file.name)
        if (important && file.compression !== 0 && file.compression !== 8) {
          failure = { code: 'zip-compression' }
          return false
        }

        return file.compression === 0 || file.compression === 8
      },
    })
  } catch {
    return {
      ok: false,
      error: { code: 'zip-corrupt', name: archiveName },
    }
  }

  if (failure) {
    return { ok: false, error: failure }
  }

  const documents: ExportDocument[] = []
  for (const [name, content] of Object.entries(unzipped)) {
    const parsed = parseJson(name, strFromU8(content))
    if ('ok' in parsed) {
      return parsed
    }
    documents.push(parsed)
  }

  if (documents.length === 0) {
    return {
      ok: false,
      error: { code: 'zip-missing-lists' },
    }
  }

  return { ok: true, documents }
}

export async function readExportFiles(
  files: readonly File[],
): Promise<ReadSuccess | ReadFailure> {
  const documents: ExportDocument[] = []

  for (const file of files) {
    if (file.name.toLowerCase().endsWith('.zip')) {
      const bytes = new Uint8Array(await file.arrayBuffer())
      const zip = readZip(bytes, file.name)
      if (!zip.ok) {
        return zip
      }
      documents.push(...zip.documents)
      continue
    }

    if (file.size > MAX_JSON_BYTES) {
      return {
        ok: false,
        error: { code: 'json-too-large', name: file.name },
      }
    }

    const parsed = parseJson(file.name, await file.text())
    if ('ok' in parsed) {
      return parsed
    }
    documents.push(parsed)
  }

  return { ok: true, documents }
}
