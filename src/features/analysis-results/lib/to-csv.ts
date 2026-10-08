import { instagramProfileUrl } from '@/features/analysis-results/lib/profile-url'
import type { Account } from '@/features/follow-analysis/lib/accounts'

function cell(value: string) {
  if (/[",\n]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`
  }

  return value
}

export function notFollowingBackCsv(accounts: readonly Account[]) {
  const lines = ['username,perfil']
  for (const account of accounts) {
    const url = instagramProfileUrl(account.username) ?? ''
    lines.push(`${cell(account.label)},${cell(url)}`)
  }

  return lines.join('\n')
}

export function downloadTextFile(filename: string, contents: string) {
  const url = URL.createObjectURL(new Blob([contents], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
