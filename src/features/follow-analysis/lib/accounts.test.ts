import { describe, expect, it } from 'vitest'

import { readAccounts } from '@/features/follow-analysis/lib/accounts'
import { compareFollows } from '@/features/follow-analysis/lib/compare-follows'

function relationship(username: string) {
  return {
    title: username,
    string_list_data: [
      {
        value: username,
        href: `https://www.instagram.com/${username}/`,
      },
    ],
  }
}

describe('readAccounts', () => {
  it('exclui contas apagadas da lista e da contagem, sem marcar como registro inválido', () => {
    const read = readAccounts([
      relationship('ana.silva'),
      relationship('__deleted__bhiebeaacagcgiaic'),
      relationship('__deleted__bhiebeaddagjdbggg'),
      relationship('_Deleted__Outra'),
    ])

    expect(read.accounts.map((account) => account.username)).toEqual(['ana.silva'])
    expect(read.ignored).toBe(0)

    const compared = compareFollows(read.accounts, [])
    expect(compared.following).toHaveLength(1)
    expect(compared.notFollowingBack.map((account) => account.username)).toEqual(['ana.silva'])
  })
})
