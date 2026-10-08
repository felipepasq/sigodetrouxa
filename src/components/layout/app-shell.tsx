import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Ir para o conteúdo
      </a>
      <header className="border-b border-border">
        <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 py-2">
          <Link
            to="/"
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <img
              src="/brand/logo.webp"
              alt="Sigo de Trouxa"
              width={1024}
              height={341}
              className="h-12 w-auto max-w-[56vw] object-contain sm:h-14"
            />
          </Link>
          <nav aria-label="Nesta página">
            <a
              href="#como-exportar"
              className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Como exportar
            </a>
          </nav>
        </div>
      </header>
      <main id="conteudo" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground">
          <p>
            Seus dados são processados no seu navegador. Nada é enviado para
            nossos servidores.
          </p>
          <p>Made by Felipe Pasqua</p>
        </div>
      </footer>
    </div>
  )
}
