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

const screenshot = {
  width: 485,
  height: 1024,
} as const

export const tutorialSteps: readonly TutorialStep[] = [
  {
    number: 1,
    title: 'Abra o menu do perfil',
    instruction: 'No seu perfil, toque no menu (☰) no canto superior.',
    image: {
      ...screenshot,
      src: '/tutorial/passo-01-menu-do-perfil.jpg',
      alt: 'Perfil do Instagram com o botão de menu no canto superior destacado.',
    },
  },
  {
    number: 2,
    title: 'Abra a Central de Contas',
    instruction:
      'Em Configurações e atividade, toque em Central de Contas.',
    image: {
      ...screenshot,
      src: '/tutorial/passo-02-central-de-contas.jpg',
      alt: 'Configurações e atividade do Instagram com Central de Contas destacada.',
    },
  },
  {
    number: 3,
    title: 'Suas informações e permissões',
    instruction: 'Na Central de Contas, toque em Suas informações e permissões.',
    image: {
      ...screenshot,
      src: '/tutorial/passo-03-informacoes-e-permissoes.jpg',
      alt: 'Central de Contas da Meta com Suas informações e permissões destacado.',
    },
  },
  {
    number: 4,
    title: 'Exportar suas informações',
    instruction: 'Toque em Exportar suas informações.',
    image: {
      ...screenshot,
      src: '/tutorial/passo-04-exportar-informacoes.jpg',
      alt: 'Tela Suas informações e permissões com Exportar suas informações destacado.',
    },
  },
  {
    number: 5,
    title: 'Crie a exportação',
    instruction:
      'Toque em Criar exportação. Se o Instagram pedir a conta, escolha o perfil do Instagram.',
    image: {
      ...screenshot,
      src: '/tutorial/passo-05-criar-exportacao.jpg',
      alt: 'Tela Exportar suas informações com o botão Criar exportação destacado.',
    },
  },
  {
    number: 6,
    title: 'Exporte para o dispositivo',
    instruction: 'Escolha Exportar para dispositivo.',
    image: {
      ...screenshot,
      src: '/tutorial/passo-06-exportar-para-dispositivo.jpg',
      alt: 'Escolha de destino com Exportar para dispositivo destacado.',
    },
  },
  {
    number: 7,
    title: 'Marque só Seguidores e Seguindo',
    instruction:
      'Em Personalizar informações, marque Seguidores e Seguindo e toque em Salvar. Deixe o restante desmarcado.',
    image: {
      ...screenshot,
      src: '/tutorial/passo-07-seguidores-e-seguindo.jpg',
      alt: 'Personalização da exportação com Seguidores e Seguindo marcado e o botão Salvar destacado.',
    },
  },
  {
    number: 8,
    title: 'Use o período desde o início',
    instruction:
      'Em Intervalo de datas, selecione Desde o início e toque em Salvar. Um período menor pode fazer alguém que te segue parecer que não segue.',
    essential: true,
    image: {
      ...screenshot,
      src: '/tutorial/passo-08-desde-o-inicio.jpg',
      alt: 'Intervalo de datas com Desde o início selecionado e o botão Salvar destacado.',
    },
  },
  {
    number: 9,
    title: 'Confirme o formato JSON',
    instruction:
      'Confira se o formato está em JSON e toque em Iniciar exportação.',
    essential: true,
    image: {
      ...screenshot,
      src: '/tutorial/passo-09-formato-json.jpg',
      alt: 'Revisão da exportação com formato JSON e o botão Iniciar exportação destacados.',
    },
  },
  {
    number: 10,
    title: 'Baixe o ZIP e envie aqui',
    instruction:
      'Quando o Instagram avisar que a exportação está pronta, baixe o ZIP e envie nesta página. O arquivo é um retrato daquele momento, não os dados ao vivo do Instagram.',
  },
]
