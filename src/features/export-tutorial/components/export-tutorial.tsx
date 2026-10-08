import { tutorialSteps } from '@/features/export-tutorial/tutorial-steps'

export function ExportTutorial() {
  return (
    <section id="como-exportar" className="scroll-mt-20 py-12">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Como exportar do Instagram
      </h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        Os nomes dos menus podem mudar conforme a versão do aplicativo. Siga a
        ordem abaixo e confira JSON e Desde o início antes de iniciar.
      </p>
      <ol className="mt-8 space-y-10">
        {tutorialSteps.map((step) => (
          <li key={step.number}>
            <article
              className={
                step.essential
                  ? 'rounded-3xl border border-secondary bg-card p-4 sm:p-6'
                  : 'rounded-3xl border border-border bg-card p-4 sm:p-6'
              }
            >
              <div className="max-w-2xl">
                <p
                  className={
                    step.essential
                      ? 'inline-flex rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground'
                      : 'inline-flex rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground'
                  }
                >
                  Passo {step.number}
                  {step.essential ? ' · Essencial' : null}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {step.instruction}
                </p>
                {step.number === tutorialSteps.length ? (
                  <a
                    href="#importar"
                    className="mt-4 inline-flex rounded-sm text-sm font-medium text-foreground underline decoration-primary underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Enviar o arquivo
                  </a>
                ) : null}
              </div>
              {step.image ? (
                <img
                  src={step.image.src}
                  alt={step.image.alt}
                  width={step.image.width}
                  height={step.image.height}
                  loading="lazy"
                  decoding="async"
                  className="mx-auto mt-6 w-full max-w-sm rounded-2xl border border-border"
                />
              ) : null}
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
