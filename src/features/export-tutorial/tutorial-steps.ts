export type TutorialImage = {
  src: string
  alt: string
  width: number
  height: number
}

export type TutorialTranslation = {
  title: string
  instruction: string
  alt: string
}

export type TutorialStep = {
  number: number
  title: string
  instruction: string
  essential?: boolean
  en: TutorialTranslation
  image?: TutorialImage
}

const tallPhone = {
  width: 682,
  height: 1024,
} as const

const widePhone = {
  width: 576,
  height: 1024,
} as const

export const tutorialSteps: readonly TutorialStep[] = [
  {
    number: 1,
    title: 'Abra o menu do perfil',
    instruction: 'No seu perfil, toque no menu (☰) no canto superior.',
    en: {
      title: 'Open the profile menu',
      instruction: 'On your profile, tap the menu (☰) in the top corner.',
      alt: 'Instagram profile with the menu button in the top corner highlighted.',
    },
    image: {
      ...tallPhone,
      src: '/tutorial/passo-01-menu-do-perfil.jpg',
      alt: 'Perfil do Instagram com o menu do canto superior destacado.',
    },
  },
  {
    number: 2,
    title: 'Abra a Central de Contas',
    instruction: 'Em Configurações, toque em Central de Contas.',
    en: {
      title: 'Open Accounts Center',
      instruction: 'In Settings, tap Central de Contas.',
      alt: 'Instagram settings with Accounts Center highlighted.',
    },
    image: {
      ...tallPhone,
      src: '/tutorial/passo-02-central-de-contas.jpg',
      alt: 'Configurações e atividade com Central de Contas destacada.',
    },
  },
  {
    number: 3,
    title: 'Suas informações e permissões',
    instruction: 'Agora toque em Suas informações e permissões.',
    en: {
      title: 'Your information and permissions',
      instruction: 'Now tap Suas informações e permissões.',
      alt: 'Meta Accounts Center with Your information and permissions highlighted.',
    },
    image: {
      ...tallPhone,
      src: '/tutorial/passo-03-informacoes-e-permissoes.jpg',
      alt: 'Central de Contas da Meta com Suas informações e permissões destacado.',
    },
  },
  {
    number: 4,
    title: 'Exportar suas informações',
    instruction: 'Toque em Exportar suas informações.',
    en: {
      title: 'Export your information',
      instruction: 'Tap Exportar suas informações.',
      alt: 'Your information and permissions screen with Export your information highlighted.',
    },
    image: {
      ...tallPhone,
      src: '/tutorial/passo-04-exportar-informacoes.jpg',
      alt: 'Tela Suas informações e permissões com Exportar suas informações destacado.',
    },
  },
  {
    number: 5,
    title: 'Crie a exportação',
    instruction: 'Na próxima tela, toque em Criar exportação.',
    en: {
      title: 'Create the export',
      instruction: 'On the next screen, tap Criar exportação.',
      alt: 'Export your information screen with the Create export button highlighted.',
    },
    image: {
      ...tallPhone,
      src: '/tutorial/passo-05-criar-exportacao.jpg',
      alt: 'Tela Exportar suas informações com o botão Criar exportação destacado.',
    },
  },
  {
    number: 6,
    title: 'Exporte para o dispositivo',
    instruction: 'Escolha Exportar para dispositivo.',
    en: {
      title: 'Export to your device',
      instruction: 'Choose Exportar para dispositivo.',
      alt: 'Export destination with Export to device highlighted.',
    },
    image: {
      ...tallPhone,
      src: '/tutorial/passo-06-exportar-para-dispositivo.jpg',
      alt: 'Escolha de destino com Exportar para dispositivo destacado.',
    },
  },
  {
    number: 7,
    title: 'Abra Personalizar informações',
    instruction: 'Toque em Personalizar informações para escolher o que entra no arquivo.',
    en: {
      title: 'Open Customize info',
      instruction: 'Tap Personalizar informações to choose what goes into the file.',
      alt: 'Export options with Customize info highlighted.',
    },
    image: {
      ...tallPhone,
      src: '/tutorial/passo-07-personalizar-informacoes.jpg',
      alt: 'Opções da exportação com Personalizar informações destacado.',
    },
  },
  {
    number: 8,
    title: 'Marque só Seguidores e Seguindo',
    instruction:
      'Na tela que abrir, marque apenas Seguidores e Seguindo e toque em Salvar. Deixe o restante desmarcado. Depois disso, você volta para a tela anterior.',
    en: {
      title: 'Select only Followers and Following',
      instruction:
        'On the screen that opens, select only Seguidores e Seguindo and tap Salvar. Leave everything else unchecked. You then return to the previous screen.',
      alt: 'Information list with only Followers and Following checked and the Save button highlighted.',
    },
    image: {
      ...widePhone,
      src: '/tutorial/passo-08-seguidores-e-seguindo.jpg',
      alt: 'Lista de informações com apenas Seguidores e Seguindo marcado e o botão Salvar destacado.',
    },
  },
  {
    number: 9,
    title: 'Use o período desde o início',
    instruction:
      'De volta à tela anterior, toque em Intervalo de datas. Depois, selecione Desde o início e toque em Salvar. Um período menor pode fazer alguém que te segue parecer que não segue.',
    en: {
      title: 'Use the full date range',
      instruction:
        "Back on the previous screen, tap Intervalo de datas. Then select Desde o início and tap Salvar. A shorter range can make someone who follows you look like they don't.",
      alt: 'Date range with Since the beginning selected and the Save button highlighted.',
    },
    essential: true,
    image: {
      ...widePhone,
      src: '/tutorial/passo-09-desde-o-inicio.jpg',
      alt: 'Intervalo de datas com Desde o início selecionado e o botão Salvar destacado.',
    },
  },
  {
    number: 10,
    title: 'Confirme o formato JSON',
    instruction:
      'De volta à tela anterior, toque em Formato, escolha JSON, toque em Salvar e depois em Iniciar exportação.',
    en: {
      title: 'Confirm the JSON format',
      instruction:
        'Back on the previous screen, tap Formato, choose JSON, tap Salvar, then tap Iniciar exportação.',
      alt: 'JSON format selected, with Save and Start export highlighted.',
    },
    essential: true,
    image: {
      ...widePhone,
      src: '/tutorial/passo-10-formato-json.jpg',
      alt: 'Formato JSON selecionado, com Salvar e Iniciar exportação destacados.',
    },
  },
  {
    number: 11,
    title: 'Espere o arquivo ficar pronto',
    instruction:
      'Agora é só esperar o Instagram preparar o arquivo para download. Isso pode demorar um pouco. Quando avisar que está pronto, baixe o ZIP e envie nesta página. O arquivo é um retrato daquele momento, não os dados ao vivo do Instagram.',
    en: {
      title: 'Wait for the file',
      instruction:
        'Now wait for Instagram to prepare the file for download. This can take a while. When it says the file is ready, download the ZIP and upload it on this page. The file is a snapshot of that moment, not live Instagram data.',
      alt: 'Export request being prepared, with a note that Instagram may take a while to release the file.',
    },
    image: {
      ...widePhone,
      src: '/tutorial/passo-11-esperar-o-download.jpg',
      alt: 'Pedido de exportação em preparo, com o aviso de que o Instagram pode demorar para liberar o arquivo.',
    },
  },
]
