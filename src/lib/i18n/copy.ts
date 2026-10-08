import type { Locale } from '@/lib/i18n/locale'

type Copy = {
  htmlLang: string
  documentTitle: string
  documentDescription: string
  skipToContent: string
  navLabel: string
  languageLabel: string
  howToExport: string
  privacy: string
  madeBy: string
  heroTitle: string
  heroSupport: string
  heroCta: string
  importTitle: string
  importLeadBefore: string
  importFollowersAndFollowing: string
  importFormat: string
  importRange: string
  importSnapshot: string
  importSeeHow: string
  importDrop: string
  importChoose: string
  importReading: string
  importReceivedOne: string
  importReceivedMany: string
  importClear: string
  tutorialTitle: string
  tutorialIntro: string
  tutorialSendFile: string
  stepLabel: (number: number) => string
  essential: string
  resultEmptyFollowing: string
  resultEveryoneFollows: string
  resultFound: (count: number) => string
  resultSummary: (percentage: number) => string
  statFollowing: string
  statFollowers: string
  statMutual: string
  statNotFollowing: string
  completenessRestricted: string
  completenessUnverified: string
  emptyFollowers: string
  ignoredRecords: (count: number) => string
  filesUsed: (names: string) => string
  deactivatedNote: string
  searchLabel: string
  sortAsc: string
  sortDesc: string
  downloadCsv: string
  csvName: string
  copyFailed: string
  noSearchMatch: string
  copy: string
  copied: string
  exportAgain: string
  sortLocale: string
}

const pt = {
  htmlLang: 'pt-BR',
  documentTitle: 'Sigo de Trouxa',
  documentDescription:
    'Descubra quem não te segue de volta no Instagram. A comparação acontece no seu navegador.',
  skipToContent: 'Ir para o conteúdo',
  navLabel: 'Nesta página',
  languageLabel: 'Idioma',
  howToExport: 'Como exportar',
  privacy:
    'Seus dados são processados no seu navegador. Nada é enviado para nossos servidores.',
  madeBy: 'Made by Felipe Pasqua',
  heroTitle: 'Você segue. Eles acham que são famosos.',
  heroSupport:
    'Descubra quem não te segue de volta no Instagram. Sem login, sem senha e sem passar vergonha sozinho.',
  heroCta: 'Ver quem se acha',
  importTitle: 'Envie a exportação',
  importLeadBefore: 'Use o ZIP do Instagram ou os JSON de seguidores e de seguindo. Exporte só',
  importFollowersAndFollowing: 'Seguidores e Seguindo',
  importFormat: 'JSON',
  importRange: 'Desde o início',
  importSnapshot: 'O arquivo é um retrato da exportação, não o Instagram ao vivo.',
  importSeeHow: 'Veja como exportar',
  importDrop: 'Arraste o ZIP ou os JSON para cá',
  importChoose: 'ou toque para escolher os arquivos',
  importReading: 'Lendo a exportação neste navegador…',
  importReceivedOne: 'Arquivo recebido neste navegador. Nada foi enviado para um servidor.',
  importReceivedMany: 'Arquivos recebidos neste navegador. Nada foi enviado para um servidor.',
  importClear: 'Limpar e começar de novo',
  tutorialTitle: 'Como exportar do Instagram',
  tutorialIntro:
    'Os nomes dos menus podem mudar conforme a versão do aplicativo. Siga a ordem abaixo e confira JSON e Desde o início antes de iniciar.',
  tutorialSendFile: 'Enviar o arquivo',
  stepLabel: (number) => `Passo ${number}`,
  essential: 'Essencial',
  resultEmptyFollowing: 'Neste arquivo, você não segue ninguém.',
  resultEveryoneFollows: 'Milagre! Todo mundo retribui seu carinho. ❤️',
  resultFound: (count) =>
    `Encontramos ${count} ${count === 1 ? 'pessoa que não retribui' : 'pessoas que não retribuem'} seu carinho. 🤡`,
  resultSummary: (percentage) =>
    `${percentage}% de quem você segue não segue de volta. Isso descreve o arquivo exportado, não o Instagram agora.`,
  statFollowing: 'Você segue',
  statFollowers: 'Te seguem',
  statMutual: 'Mútuos',
  statNotFollowing: 'Não te seguem',
  completenessRestricted:
    'O arquivo indica um intervalo de datas limitado. A comparação não é definitiva: seguidores antigos podem ficar de fora.',
  completenessUnverified:
    'Não deu para confirmar, por este arquivo, se a exportação começa no início da conta. Se o intervalo não foi Desde o início, podem aparecer pessoas que te seguem.',
  emptyFollowers:
    'A lista de seguidores chegou vazia. Confira se o arquivo exportado é o de seguidores.',
  ignoredRecords: (count) =>
    `${count} ${count === 1 ? 'registro foi ignorado' : 'registros foram ignorados'} porque não tinha um usuário válido.`,
  filesUsed: (names) => `Arquivos usados: ${names}.`,
  deactivatedNote:
    'Observação: alguns usuários podem ter desativado a conta. Eles continuam nesta lista, mas o perfil pode não abrir.',
  searchLabel: 'Buscar usuário',
  sortAsc: 'A–Z',
  sortDesc: 'Z–A',
  downloadCsv: 'Baixar CSV',
  csvName: 'nao-seguem-de-volta.csv',
  copyFailed: 'Não foi possível copiar o usuário.',
  noSearchMatch: 'Nenhum usuário com esse nome.',
  copy: 'Copiar',
  copied: 'Copiado',
  exportAgain: 'Exportar de novo',
  sortLocale: 'pt-BR',
} satisfies Copy

const en = {
  htmlLang: 'en',
  documentTitle: 'Sigo de Trouxa',
  documentDescription:
    "Find out who doesn't follow you back on Instagram. The comparison happens in your browser.",
  skipToContent: 'Skip to content',
  navLabel: 'On this page',
  languageLabel: 'Language',
  howToExport: 'How to export',
  privacy: 'Your data is processed in your browser. Nothing is sent to our servers.',
  madeBy: 'Made by Felipe Pasqua',
  heroTitle: "You follow them. They think they're famous.",
  heroSupport:
    "Find out who doesn't follow you back on Instagram. No login, no password, and no embarrassment.",
  heroCta: "See who thinks they're famous",
  importTitle: 'Upload the export',
  importLeadBefore:
    'Use the Instagram ZIP or the followers and following JSON files. Export only',
  importFollowersAndFollowing: 'Followers and Following',
  importFormat: 'JSON',
  importRange: 'Since the beginning',
  importSnapshot: 'The file is a snapshot of the export, not live Instagram.',
  importSeeHow: 'See how to export',
  importDrop: 'Drop the ZIP or the JSON files here',
  importChoose: 'or tap to choose the files',
  importReading: 'Reading the export in this browser…',
  importReceivedOne: 'File received in this browser. Nothing was sent to a server.',
  importReceivedMany: 'Files received in this browser. Nothing was sent to a server.',
  importClear: 'Clear and start over',
  tutorialTitle: 'How to export from Instagram',
  tutorialIntro:
    'Menu names can change with the app version. Follow the order below and check JSON and Desde o início before you start.',
  tutorialSendFile: 'Upload the file',
  stepLabel: (number) => `Step ${number}`,
  essential: 'Essential',
  resultEmptyFollowing: "In this file, you don't follow anyone.",
  resultEveryoneFollows: 'Miracle! Everyone follows you back. ❤️',
  resultFound: (count) =>
    `We found ${count} ${count === 1 ? "person who doesn't return the love" : "people who don't return the love"}. 🤡`,
  resultSummary: (percentage) =>
    `${percentage}% of the accounts you follow don't follow you back. This describes the exported file, not Instagram right now.`,
  statFollowing: 'You follow',
  statFollowers: 'Follow you',
  statMutual: 'Mutual',
  statNotFollowing: "Don't follow back",
  completenessRestricted:
    "This file uses a limited date range. The comparison isn't final: older followers may be missing.",
  completenessUnverified:
    "This file doesn't confirm that the export starts from the beginning of the account. If the range wasn't Desde o início, people who follow you may show up here.",
  emptyFollowers:
    'The followers list arrived empty. Check that the exported file is the followers file.',
  ignoredRecords: (count) =>
    `${count} ${count === 1 ? "record was ignored because it didn't have" : "records were ignored because they didn't have"} a valid username.`,
  filesUsed: (names) => `Files used: ${names}.`,
  deactivatedNote:
    'Note: some accounts may have been deactivated. They stay on this list, but the profile may not open.',
  searchLabel: 'Search username',
  sortAsc: 'A–Z',
  sortDesc: 'Z–A',
  downloadCsv: 'Download CSV',
  csvName: 'not-following-back.csv',
  copyFailed: "Couldn't copy the username.",
  noSearchMatch: 'No username matches that search.',
  copy: 'Copy',
  copied: 'Copied',
  exportAgain: 'Export again',
  sortLocale: 'en',
} satisfies Copy

export const copy: Record<Locale, Copy> = { pt, en }

export type { Copy }
