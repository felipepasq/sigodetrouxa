import { z } from 'zod'

const USERNAME_PATTERN = /^[a-z0-9._]{1,30}$/i

const stringListItemSchema = z
  .object({
    href: z.string().optional(),
    value: z.string().optional(),
  })
  .passthrough()

const relationshipSchema = z
  .object({
    title: z.string().optional(),
    string_list_data: z.array(stringListItemSchema).optional(),
  })
  .passthrough()

const relationshipListSchema = z.array(relationshipSchema)

const followingDocumentSchema = z
  .object({
    relationships_following: relationshipListSchema,
  })
  .passthrough()

const followersDocumentSchema = z
  .object({
    relationships_followers: relationshipListSchema,
  })
  .passthrough()

export type Account = {
  username: string
  label: string
}

export type AccountRead = {
  accounts: Account[]
  ignored: number
}

type Relationship = z.infer<typeof relationshipSchema>

export function basename(path: string) {
  const parts = path.split(/[/\\]/)
  return parts[parts.length - 1] ?? path
}

export function isFollowersFile(path: string) {
  return /^followers(?:_\d+)?\.json$/i.test(basename(path))
}

export function isFollowingFile(path: string) {
  return /^following\.json$/i.test(basename(path))
}

export function normalizeUsername(value: string) {
  const trimmed = value.trim().replace(/^@+/, '')
  if (!USERNAME_PATTERN.test(trimmed)) {
    return null
  }

  if (trimmed === '.' || trimmed === '..' || trimmed.includes('..')) {
    return null
  }

  return trimmed.toLowerCase()
}

function usernameFromHref(href: string) {
  try {
    const url = new URL(href)
    if (!url.hostname.endsWith('instagram.com')) {
      return null
    }

    const parts = url.pathname.split('/').filter(Boolean)
    const candidate = parts.at(-1)
    if (!candidate || candidate === '_u') {
      return null
    }

    return normalizeUsername(candidate)
  } catch {
    return null
  }
}

function labelFor(username: string, candidates: string[]) {
  for (const candidate of candidates) {
    const trimmed = candidate.trim().replace(/^@+/, '')
    if (normalizeUsername(trimmed) === username) {
      return trimmed
    }
  }

  return username
}

function accountFromRelationship(record: Relationship): Account | null {
  const item = record.string_list_data?.[0]
  const hrefUsername = item?.href ? usernameFromHref(item.href) : null
  const valueUsername = item?.value ? normalizeUsername(item.value) : null
  const titleUsername = record.title ? normalizeUsername(record.title) : null
  const username = valueUsername ?? hrefUsername ?? titleUsername

  if (!username) {
    return null
  }

  return {
    username,
    label: labelFor(username, [item?.value ?? '', record.title ?? '', username]),
  }
}

export function readAccounts(records: Relationship[]): AccountRead {
  const accounts: Account[] = []
  const seen = new Set<string>()
  let ignored = 0

  for (const record of records) {
    const account = accountFromRelationship(record)
    if (!account) {
      ignored += 1
      continue
    }

    if (seen.has(account.username)) {
      continue
    }

    seen.add(account.username)
    accounts.push(account)
  }

  return { accounts, ignored }
}

export function recordsFromDocument(data: unknown) {
  const following = followingDocumentSchema.safeParse(data)
  if (following.success) {
    return { kind: 'following' as const, records: following.data.relationships_following }
  }

  const followers = followersDocumentSchema.safeParse(data)
  if (followers.success) {
    return { kind: 'followers' as const, records: followers.data.relationships_followers }
  }

  const list = relationshipListSchema.safeParse(data)
  if (list.success) {
    return { kind: 'list' as const, records: list.data }
  }

  return null
}

const LIMITED_RANGE = /last[_\s-]?(?:year|month|week)|last[_\s-]?[36][_\s-]?months|custom_range|restricted/i

export function findRestrictedRange(data: unknown) {
  const queue: unknown[] = [data]
  let visited = 0

  while (queue.length > 0 && visited < 200) {
    const current = queue.shift()
    visited += 1
    if (!current || typeof current !== 'object') {
      continue
    }

    if (Array.isArray(current)) {
      const items = current.slice(0, 20) as unknown[]
      for (const item of items) {
        queue.push(item)
      }
      continue
    }

    for (const [key, value] of Object.entries(current)) {
      if (LIMITED_RANGE.test(key)) {
        return true
      }
      if (typeof value === 'string' && LIMITED_RANGE.test(value)) {
        return true
      }
      if (value && typeof value === 'object') {
        queue.push(value)
      }
    }
  }

  return false
}
