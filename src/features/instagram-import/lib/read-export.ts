import { strFromU8, unzipSync, type UnzipFileInfo } from 'fflate'

import { isFollowersFile, isFollowingFile } from '@/features/follow-analysis/lib/accounts'

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
  message: string
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
      message: `${name} não é um JSON válido.`,
    }
  }
}

function readZip(bytes: Uint8Array, archiveName: string): ReadSuccess | ReadFailure {
  let entries = 0
  let jsonFiles = 0
  let totalBytes = 0
  let failure: string | null = null

  let unzipped: Record<string, Uint8Array>
  try {
    unzipped = unzipSync(bytes, {
      filter(file: UnzipFileInfo) {
        entries += 1
        if (entries > MAX_ZIP_ENTRIES) {
          failure = 'Esse ZIP tem entradas demais.'
          return false
        }

        if (isUnsafePath(file.name)) {
          failure = 'O ZIP tem um caminho de arquivo que não pode ser lido.'
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
          failure = 'O ZIP passa dos limites de tamanho aceitos.'
          return false
        }

        totalBytes += file.originalSize
        if (totalBytes > MAX_TOTAL_JSON_BYTES) {
          failure = 'O ZIP passa dos limites de tamanho aceitos.'
          return false
        }

        const important = isFollowersFile(file.name) || isFollowingFile(file.name)
        if (important && file.compression !== 0 && file.compression !== 8) {
          failure = 'Um JSON da exportação usa uma compressão que não dá para ler aqui.'
          return false
        }

        return file.compression === 0 || file.compression === 8
      },
    })
  } catch {
    return {
      ok: false,
      message: `Não foi possível abrir ${archiveName}. O arquivo pode estar corrompido.`,
    }
  }

  if (failure) {
    return { ok: false, message: failure }
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
      message: 'O ZIP não tem os JSON de seguidores e seguindo.',
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
        message: `${file.name} é grande demais para ler neste navegador.`,
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
