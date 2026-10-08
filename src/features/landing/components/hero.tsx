import { Button } from '@/components/ui/button'
import { useCopy } from '@/lib/i18n/use-locale'

export function Hero() {
  const copy = useCopy()

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
        {copy.heroTitle}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {copy.heroSupport}
      </p>
      <div className="mt-8">
        <Button asChild size="lg" className="h-12 px-6 text-base">
          <a href="#importar">{copy.heroCta}</a>
        </Button>
      </div>
      <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
        {copy.privacy}
      </p>
    </section>
  )
}
