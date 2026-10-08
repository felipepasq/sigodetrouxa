import type { Locale } from '@/lib/i18n/locale'

export type ReadError =
  | { code: 'invalid-json'; name: string }
  | { code: 'zip-too-many-entries' }
  | { code: 'zip-unsafe-path' }
  | { code: 'zip-limits' }
  | { code: 'zip-compression' }
  | { code: 'zip-corrupt'; name: string }
  | { code: 'zip-missing-lists' }
  | { code: 'json-too-large'; name: string }

export type AnalyzeError =
  | ReadError
  | { code: 'mixed-lists'; name: string }
  | { code: 'unrecognized'; name: string }
  | { code: 'multiple-following' }
  | { code: 'missing-followers' }
  | { code: 'missing-following' }
  | { code: 'inconsistent' }

export function describeAnalyzeError(error: AnalyzeError, locale: Locale = 'pt') {
  const en = locale === 'en'

  switch (error.code) {
    case 'invalid-json':
      return en
        ? `${error.name} is not valid JSON.`
        : `${error.name} não é um JSON válido.`
    case 'zip-too-many-entries':
      return en ? 'This ZIP has too many entries.' : 'Esse ZIP tem entradas demais.'
    case 'zip-unsafe-path':
      return en
        ? "The ZIP has a file path that can't be read."
        : 'O ZIP tem um caminho de arquivo que não pode ser lido.'
    case 'zip-limits':
      return en
        ? 'The ZIP is over the accepted size limits.'
        : 'O ZIP passa dos limites de tamanho aceitos.'
    case 'zip-compression':
      return en
        ? "An export JSON uses a compression this page can't read."
        : 'Um JSON da exportação usa uma compressão que não dá para ler aqui.'
    case 'zip-corrupt':
      return en
        ? `Couldn't open ${error.name}. The file may be corrupted.`
        : `Não foi possível abrir ${error.name}. O arquivo pode estar corrompido.`
    case 'zip-missing-lists':
      return en
        ? "The ZIP doesn't include the followers and following JSON files."
        : 'O ZIP não tem os JSON de seguidores e seguindo.'
    case 'json-too-large':
      return en
        ? `${error.name} is too large to read in this browser.`
        : `${error.name} é grande demais para ler neste navegador.`
    case 'mixed-lists':
      return en
        ? `${error.name} mixes follower and following lists.`
        : `${error.name} mistura listas de seguidores e de seguindo.`
    case 'unrecognized':
      return en
        ? `${error.name} isn't a followers or following format we recognize.`
        : `${error.name} não está num formato de seguidores ou seguindo que a gente reconhece.`
    case 'multiple-following':
      return en
        ? 'There is more than one following file. Send only one.'
        : 'Há mais de um arquivo de seguindo. Envie só um.'
    case 'missing-followers':
      return en
        ? "Couldn't find the followers list. Without it, there's no way to tell who doesn't follow you back."
        : 'Não encontrei a lista de seguidores. Sem ela, não dá para dizer quem não te segue de volta.'
    case 'missing-following':
      return en
        ? "Couldn't find the list of accounts you follow."
        : 'Não encontrei a lista de quem você segue.'
    case 'inconsistent':
      return en
        ? 'The comparison became inconsistent and was stopped.'
        : 'A comparação ficou inconsistente e foi interrompida.'
  }
}
