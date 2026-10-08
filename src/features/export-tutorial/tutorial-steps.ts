export type TutorialImage = {
  src: string
  alt: string
  width: number
  height: number
}

export type TutorialStep = {
  number: number
  title: string
  instruction: string
  essential?: boolean
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
    image: {
      ...widePhone,
      src: '/tutorial/passo-11-esperar-o-download.jpg',
      alt: 'Pedido de exportação em preparo, com o aviso de que o Instagram pode demorar para liberar o arquivo.',
    },
  },
]
