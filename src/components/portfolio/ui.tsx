import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SectionTitle({ index, kicker, title }: { index: string; kicker: string; title: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
        <span className="text-muted-foreground">{index}</span>
        <span className="h-px w-10 bg-accent" />
        {kicker}
      </p>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-primary md:text-5xl">{title}</h2>
    </Reveal>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#accueil" className="group flex items-center gap-2.5" aria-label="ENA — retour à l'accueil">
      <span className={`grid h-9 w-9 place-items-center rounded-lg text-xs font-extrabold tracking-wider transition-transform group-hover:rotate-6 ${light ? "bg-sky text-primary" : "bg-night-gradient text-primary-foreground"}`}>
        ENA
      </span>
      <span className={`text-sm font-extrabold tracking-[0.25em] ${light ? "text-night-foreground" : "text-primary"}`}>ABRAHAM</span>
    </a>
  );
}
