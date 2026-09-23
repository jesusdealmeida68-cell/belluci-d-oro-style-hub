import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";

import heroImage from "@/assets/belluci-hero.jpg";
import bagImage from "@/assets/belluci-bags.jpg";
import menImage from "@/assets/belluci-men.jpg";
import objectsImage from "@/assets/belluci-objects.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BELLUCI D'ORO — Moda Italiana de Luxo" },
      { name: "description", content: "Descubra Luce d'Oro, a nova coleção de moda, bolsas e objetos da casa BELLUCI D'ORO." },
      { property: "og:title", content: "BELLUCI D'ORO — Moda Italiana de Luxo" },
      { property: "og:description", content: "Descubra Luce d'Oro, a nova coleção de moda, bolsas e objetos da casa BELLUCI D'ORO." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bannerSlide, setBannerSlide] = useState(0);

  const bannerSlides = [
    { image: bagImage, alt: "Bolsa Bellissima em pele preta", eyebrow: "Ícone da Maison", title: "Bellissima", copy: "Linhas precisas, pele macia e ferragens douradas.", position: "object-center" },
    { image: menImage, alt: "Homem com alfaiataria preta da coleção La Notte", eyebrow: "Nova alfaiataria", title: "La Notte", copy: "A elegância italiana desenhada para depois do pôr do sol.", position: "object-[center_28%]" },
    { image: objectsImage, alt: "Sapatos, perfume e joia dourada BELLUCI D'ORO", eyebrow: "A arte do detalhe", title: "Objetos de desejo", copy: "Pequenos gestos, feitos para permanecer.", position: "object-center" },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBannerSlide((current) => (current + 1) % bannerSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [bannerSlides.length]);

  const showPreviousBanner = () => setBannerSlide((current) => (current - 1 + bannerSlides.length) % bannerSlides.length);
  const showNextBanner = () => setBannerSlide((current) => (current + 1) % bannerSlides.length);
  const activeBanner = bannerSlides[bannerSlide];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-on-image/20 bg-primary/20 text-on-image backdrop-blur-sm">
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-4 md:h-20 md:px-9">
          <div className="flex items-center gap-1 md:gap-3">
            <Button onClick={() => setMenuOpen(true)} variant="ghost" size="icon" className="text-on-image hover:bg-on-image/10 hover:text-on-image" aria-label="Abrir menu"><Menu /></Button>
            <span className="hidden text-xs font-medium uppercase md:inline">Menu</span>
            <Button onClick={() => setSearchOpen((value) => !value)} variant="ghost" size="icon" className="text-on-image hover:bg-on-image/10 hover:text-on-image" aria-label="Pesquisar"><Search /></Button>
            <span className="hidden text-xs font-medium uppercase md:inline">Pesquisar</span>
          </div>

          <a href="#inicio" className="font-display text-lg font-semibold tracking-[0.12em] md:text-2xl" aria-label="BELLUCI D'ORO, início">BELLUCI D'ORO</a>

          <div className="flex justify-end gap-1 md:gap-2">
            <Button variant="ghost" size="icon" className="hidden text-on-image hover:bg-on-image/10 hover:text-on-image sm:inline-flex" aria-label="Favoritos"><Heart /></Button>
            <Button variant="ghost" size="icon" className="hidden text-on-image hover:bg-on-image/10 hover:text-on-image sm:inline-flex" aria-label="Minha conta"><UserRound /></Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-on-image hover:bg-on-image/10 hover:text-on-image" aria-label="Abrir sacola"><ShoppingBag /></Button>
              </SheetTrigger>
              <SheetContent className="border-border bg-background p-8 sm:max-w-md">
                <SheetHeader className="text-left">
                  <SheetTitle className="font-display text-3xl font-medium">A sua sacola</SheetTitle>
                  <SheetDescription>As suas escolhas serão guardadas aqui.</SheetDescription>
                </SheetHeader>
                <div className="flex h-2/3 flex-col items-center justify-center text-center">
                  <ShoppingBag className="mb-6 size-9 stroke-1 text-gold" />
                  <p className="font-display text-2xl">A sacola está vazia</p>
                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">Explore as criações mais recentes da Maison.</p>
                  <Button asChild className="mt-8 rounded-none px-8"><a href="#colecoes">Descobrir coleções</a></Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {searchOpen && (
          <div className="absolute inset-x-0 top-full border-b border-border bg-background p-4 text-foreground shadow-xl md:px-9">
            <div className="mx-auto flex max-w-4xl items-center gap-3">
              <Search className="size-5 text-muted-foreground" />
              <Input autoFocus className="h-12 flex-1 rounded-none border-0 border-b bg-transparent text-base shadow-none focus-visible:ring-0" placeholder="O que procura?" aria-label="Termo de pesquisa" />
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)} aria-label="Fechar pesquisa"><X /></Button>
            </div>
          </div>
        )}
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="Menu principal">
          <div className="absolute inset-0 bg-primary/75" onClick={() => setMenuOpen(false)} aria-hidden="true" />
          <div className="quiet-reveal relative h-full w-full overflow-y-auto bg-background p-8 text-foreground shadow-2xl sm:max-w-lg">
            <Button onClick={() => setMenuOpen(false)} variant="ghost" size="icon" className="absolute right-6 top-6" aria-label="Fechar menu"><X /></Button>
            <div className="border-b border-border pb-8">
              <p className="font-display text-3xl font-medium">BELLUCI D'ORO</p>
              <p className="mt-2 text-sm text-muted-foreground">Milano · Dal 1987</p>
            </div>
            <nav className="mt-12 flex flex-col gap-6">
              {["Novidades", "Feminino", "Masculino", "Bolsas", "Sapatos", "Joalharia", "A Maison"].map((item, index) => (
                <a key={item} href="#colecoes" onClick={() => setMenuOpen(false)} className="group flex items-baseline justify-between border-b border-border/60 pb-3 font-display text-3xl transition-colors hover:text-gold">
                  {item}<span className="font-sans text-xs text-muted-foreground">0{index + 1}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      <main>
        <section id="inicio" className="relative min-h-[92svh] overflow-hidden bg-primary">
          <img src={heroImage} alt="Modelo com vestido marfim da coleção Luce d'Oro num palácio italiano" width={1536} height={1280} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[55%_center]" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/5 to-primary/30" />
          <div className="relative mx-auto flex min-h-[92svh] max-w-7xl items-end justify-center px-6 pb-14 pt-28 text-center text-on-image md:pb-20">
            <div className="quiet-reveal max-w-3xl">
              <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.3em]">Alta Moda · Primavera Verão 2027</p>
              <h1 className="font-display text-5xl font-medium leading-none md:text-7xl lg:text-8xl">Luce d'Oro</h1>
              <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-on-image/90 md:text-base">Uma coleção moldada pela luz italiana, onde a precisão encontra a leveza.</p>
              <a href="#colecoes" className="mt-7 inline-block border-b border-on-image pb-1 text-xs font-semibold uppercase transition-opacity hover:opacity-70">Descobrir a coleção</a>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-primary" aria-label="Destaques da BELLUCI D'ORO" aria-roledescription="carrossel">
          <div key={bannerSlide} className="banner-slide-in relative h-[68svh] min-h-[500px] md:h-[76svh]">
            <img
              src={activeBanner.image}
              alt={activeBanner.alt}
              width={1536}
              height={1280}
              className={`absolute inset-0 h-full w-full object-cover ${activeBanner.position}`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/30 to-transparent md:via-primary/10" />
            <div className="relative mx-auto flex h-full max-w-7xl items-end px-6 pb-20 text-on-image md:items-center md:px-12 md:pb-0">
              <div className="max-w-lg" aria-live="polite">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em]">{activeBanner.eyebrow}</p>
                <h2 className="mt-3 font-display text-5xl font-medium md:text-7xl">{activeBanner.title}</h2>
                <p className="mt-4 max-w-sm text-sm leading-6 text-on-image/85 md:text-base">{activeBanner.copy}</p>
                <a href="#colecoes" className="mt-7 inline-block border-b border-on-image pb-1 text-xs font-semibold uppercase transition-opacity hover:opacity-70">Descobrir</a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2 md:bottom-8 md:right-9">
            <Button onClick={showPreviousBanner} variant="outline" size="icon" className="border-on-image/60 bg-primary/20 text-on-image backdrop-blur-sm hover:bg-on-image hover:text-primary" aria-label="Destaque anterior"><ChevronLeft /></Button>
            <Button onClick={showNextBanner} variant="outline" size="icon" className="border-on-image/60 bg-primary/20 text-on-image backdrop-blur-sm hover:bg-on-image hover:text-primary" aria-label="Próximo destaque"><ChevronRight /></Button>
          </div>
          <div className="absolute bottom-7 left-6 z-10 flex gap-2 md:bottom-10 md:left-12" aria-label={`Destaque ${bannerSlide + 1} de ${bannerSlides.length}`}>
            {bannerSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setBannerSlide(index)}
                className={`h-px transition-all duration-300 ${index === bannerSlide ? "w-10 bg-on-image" : "w-5 bg-on-image/50"}`}
                aria-label={`Mostrar ${slide.title}`}
                aria-current={index === bannerSlide ? "true" : undefined}
              />
            ))}
          </div>
        </section>

        <section id="colecoes" className="px-4 py-20 md:px-9 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gold">Seleção da Maison</p>
                <h2 className="mt-3 font-display text-4xl font-medium md:text-6xl">Novas expressões</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">Peças concebidas em Milão, trabalhadas à mão para acompanhar uma vida inteira.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-12">
              <EditorialCard image={bagImage} alt="Bolsa estruturada em pele preta" eyebrow="Feminino" title="Bolsas Bellissima" className="md:col-span-7" />
              <EditorialCard image={menImage} alt="Homem com alfaiataria preta num palácio" eyebrow="Masculino" title="La Notte" className="md:col-span-5" />
              <EditorialCard image={objectsImage} alt="Sapatos pretos, perfume e joia dourada em mármore" eyebrow="Acessórios" title="Objetos de desejo" className="md:col-span-12 md:[&_.editorial-image]:aspect-[2/1]" />
            </div>
          </div>
        </section>

        <section className="bg-primary px-6 py-24 text-primary-foreground md:py-36">
          <div className="mx-auto max-w-4xl text-center">
            <span className="font-display text-4xl text-gold">B</span>
            <p className="mt-8 font-display text-3xl leading-tight md:text-5xl">“O luxo não se anuncia. Revela-se no gesto, na matéria e no tempo.”</p>
            <p className="mt-8 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-primary-foreground/60">Casa Belluci · Milano</p>
          </div>
        </section>

        <section className="border-b border-border px-6 py-16 md:px-9">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
            {[
              ["Entrega exclusiva", "Apresentação cuidada e entrega gratuita em todas as encomendas."],
              ["Atendimento privado", "Converse com um consultor da Maison para uma seleção personalizada."],
              ["Arte de oferecer", "Cada criação é envolvida na assinatura marfim e ouro da BELLUCI D'ORO."],
            ].map(([title, copy], index) => (
              <div key={title} className="border-t border-border pt-5">
                <span className="text-xs text-gold">0{index + 1}</span>
                <h3 className="mt-5 font-display text-2xl">{title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-background px-6 py-12 md:px-9">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold tracking-[0.1em]">BELLUCI D'ORO</p>
            <p className="mt-2 text-xs text-muted-foreground">Milano · Luanda · Lisboa</p>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-xs">
            <a href="#inicio" className="hover:text-gold">A Maison</a><a href="#colecoes" className="hover:text-gold">Coleções</a><a href="mailto:concierge@bellucidoro.com" className="hover:text-gold">Concierge</a><a href="#inicio" className="hover:text-gold">Privacidade</a>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 BELLUCI D'ORO</p>
        </div>
      </footer>
    </div>
  );
}

function EditorialCard({ image, alt, eyebrow, title, className }: { image: string; alt: string; eyebrow: string; title: string; className?: string }) {
  return (
    <article className={`group relative overflow-hidden bg-muted ${className ?? ""}`}>
      <img src={image} alt={alt} loading="lazy" width={1024} height={1280} className="editorial-image aspect-[4/5] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-on-image md:p-9">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.25em]">{eyebrow}</p>
        <h3 className="mt-2 font-display text-3xl md:text-4xl">{title}</h3>
        <a href="#inicio" className="mt-4 inline-block border-b border-on-image pb-1 text-xs">Explorar</a>
      </div>
    </article>
  );
}
