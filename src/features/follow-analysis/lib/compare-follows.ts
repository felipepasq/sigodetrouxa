import type { Account } from '@/features/follow-analysis/lib/accounts'

export type Completeness = 'unverified' | 'restricted'

export type FollowAnalysis = {
  following: Account[]
  followers: Account[]
  mutual: Account[]
  notFollowingBack: Account[]
  ignoredRecords: number
  recognizedFiles: string[]
  completeness: Completeness
  emptyFollowers: boolean
}

export function compareFollows(
  following: readonly Account[],
  followers: readonly Account[],
): Pick<FollowAnalysis, 'following' | 'followers' | 'mutual' | 'notFollowingBack'> {
  const followerNames = new Set(followers.map((account) => account.username))
  const mutual: Account[] = []
  const notFollowingBack: Account[] = []

  for (const account of following) {
    if (followerNames.has(account.username)) {
      mutual.push(account)
    } else {
      notFollowingBack.push(account)
    }
  }

  return {
    following: [...following],
    followers: [...followers],
    mutual,
    notFollowingBack,
  }
}

export function nonFollowerPercentage(analysis: FollowAnalysis) {
  if (analysis.following.length === 0) {
    return 0
  }

  return Math.round((analysis.notFollowingBack.length / analysis.following.length) * 100)
}
