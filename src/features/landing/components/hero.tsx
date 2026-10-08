import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="py-10 sm:py-16">
      <img
        src="/brand/logo.webp"
        alt=""
        width={1024}
        height={341}
        className="h-auto w-full max-w-xl object-contain"
      />
      <h1 className="mt-8 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl sm:leading-[1.05]">
        Você segue. Eles acham que são famosos.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Descubra quem não te segue de volta no Instagram. Sem login, sem senha
        e sem passar vergonha sozinho.
      </p>
      <div className="mt-8">
        <Button asChild size="lg" className="h-12 px-6 text-base">
          <a href="#importar">Descobrir meus trouxas</a>
        </Button>
      </div>
      <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Seus dados são processados no seu navegador. Nada é enviado para nossos
        servidores.
      </p>
    </section>
  )
}
