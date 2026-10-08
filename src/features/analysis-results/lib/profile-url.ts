import { normalizeUsername } from '@/features/follow-analysis/lib/accounts'

export function instagramProfileUrl(username: string) {
  const normalized = normalizeUsername(username)
  if (!normalized) {
    return null
  }

  return `https://www.instagram.com/${encodeURIComponent(normalized)}/`
}
