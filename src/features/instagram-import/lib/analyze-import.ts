import {
  basename,
  findRestrictedRange,
  isFollowersFile,
  isFollowingFile,
  readAccounts,
  recordsFromDocument,
} from '@/features/follow-analysis/lib/accounts'
import {
  compareFollows,
  type FollowAnalysis,
} from '@/features/follow-analysis/lib/compare-follows'
import { readExportFiles, type ExportDocument } from '@/features/instagram-import/lib/read-export'

export type AnalyzeOutcome =
  | { ok: true; analysis: FollowAnalysis }
  | { ok: false; message: string }

function hasBothLists(data: unknown) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return false
  }

  return 'relationships_following' in data && 'relationships_followers' in data
}

function collect(documents: readonly ExportDocument[]): AnalyzeOutcome {
  const followerRecords = []
  const followingRecords = []
  const recognizedFiles: string[] = []
  let ignored = 0
  let restricted = false
  let sawFollowers = false
  let sawFollowing = false

  for (const document of documents) {
    const name = basename(document.name)
    if (hasBothLists(document.data)) {
      return {
        ok: false,
        message: `${name} mistura listas de seguidores e de seguindo.`,
      }
    }

    const parsed = recordsFromDocument(document.data)
    const followersByName = isFollowersFile(document.name)
    const followingByName = isFollowingFile(document.name)

    if (!parsed) {
      if (followersByName || followingByName) {
        return {
          ok: false,
          message: `${name} não está num formato de seguidores ou seguindo que a gente reconhece.`,
        }
      }
      if (findRestrictedRange(document.data)) {
        restricted = true
      }
      continue
    }

    if (followersByName || (parsed.kind === 'followers' && !followingByName)) {
      if (parsed.kind === 'following') {
        return {
          ok: false,
          message: `${name} mistura listas de seguidores e de seguindo.`,
        }
      }
      sawFollowers = true
      followerRecords.push(...parsed.records)
      recognizedFiles.push(name)
      continue
    }

    if (followingByName || parsed.kind === 'following') {
      if (sawFollowing) {
        return {
          ok: false,
          message: 'Há mais de um arquivo de seguindo. Envie só um.',
        }
      }
      sawFollowing = true
      followingRecords.push(...parsed.records)
      recognizedFiles.push(name)
      continue
    }

    if (findRestrictedRange(document.data)) {
      restricted = true
    }
  }

  if (!sawFollowers) {
    return {
      ok: false,
      message:
        'Não encontrei a lista de seguidores. Sem ela, não dá para dizer quem não te segue de volta.',
    }
  }

  if (!sawFollowing) {
    return {
      ok: false,
      message: 'Não encontrei a lista de quem você segue.',
    }
  }

  const followers = readAccounts(followerRecords)
  const following = readAccounts(followingRecords)
  ignored = followers.ignored + following.ignored
  const compared = compareFollows(following.accounts, followers.accounts)

  if (compared.mutual.length + compared.notFollowingBack.length !== compared.following.length) {
    return {
      ok: false,
      message: 'A comparação ficou inconsistente e foi interrompida.',
    }
  }

  return {
    ok: true,
    analysis: {
      ...compared,
      ignoredRecords: ignored,
      recognizedFiles,
      completeness: restricted ? 'restricted' : 'unverified',
      emptyFollowers: followers.accounts.length === 0,
    },
  }
}

export async function analyzeImport(files: readonly File[]): Promise<AnalyzeOutcome> {
  const read = await readExportFiles(files)
  if (!read.ok) {
    return read
  }

  return collect(read.documents)
}
