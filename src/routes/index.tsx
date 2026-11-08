import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowUp, ArrowRight, Download, Menu, X, Github, Linkedin, Mail, MessageCircle,
  Code2, Server, Brain, Network, Terminal, Settings, ShieldCheck, Lock, Sparkles, Layout,
  GraduationCap, ExternalLink, Send,
} from "lucide-react";
import photo from "@/assets/abraham-esso.png.asset.json";
import { site, projects } from "@/config/site";
import { Reveal, SectionTitle, Logo } from "@/components/portfolio/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abraham ESSO — Computer Science Student & Full Stack en devenir" },
      { name: "description", content: "Portfolio de Nyambia Abraham ESSO : étudiant en Computer Science passionné par le développement web, la cybersécurité et les nouvelles technologies." },
      { property: "og:title", content: "Abraham ESSO — Portfolio" },
      { property: "og:description", content: "Computer Science Student, Aspiring Full Stack Developer & Cybersecurity Enthusiast." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["accueil", "Accueil"], ["a-propos", "À propos"], ["competences", "Compétences"],
  ["parcours", "Parcours"], ["projets", "Projets"], ["contact", "Contact"],
] as const;

const socials = [
  { label: "WhatsApp", icon: MessageCircle, href: site.whatsapp && `https://wa.me/${site.whatsapp}` },
  { label: "LinkedIn", icon: Linkedin, href: site.linkedin },
  { label: "GitHub", icon: Github, href: site.github },
  { label: "E-mail", icon: Mail, href: site.email && `mailto:${site.email}` },
].filter((s) => s.href) as { label: string; icon: typeof Mail; href: string }[];

function Index() {
  return (
    <div className="overflow-x-clip">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Timeline />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? "border-b bg-background/85 backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary">
              {label}
            </a>
          ))}
        </nav>
        <button className="grid h-10 w-10 place-items-center rounded-lg text-primary md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav className="animate-fade-up border-t px-5 py-4 md:hidden">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-medium text-primary hover:bg-secondary">
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

const TITLES = ["Computer Science Student", "Aspiring Full Stack Developer", "Cybersecurity Enthusiast"];

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TITLES.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="accueil" className="relative flex min-h-screen items-center pt-24 pb-16">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-sky/50 blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-[1.15fr_0.85fr]">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-xs font-semibold text-accent">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" /> ITA University · Licence 1
          </p>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-primary sm:text-6xl">
            Nyambia Abraham<br /><span className="text-accent">ESSO</span>
          </h1>
          <div className="mt-5 h-9 overflow-hidden text-xl font-semibold text-foreground sm:text-2xl" aria-live="polite">
            <span key={i} className="inline-block animate-word-in">{TITLES[i]}</span>
          </div>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Étudiant en Computer Science, passionné par le développement web, la cybersécurité et les nouvelles technologies.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#a-propos" className="inline-flex items-center gap-2 rounded-full bg-night-gradient px-6 py-3.5 font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5">
              Découvrir mon profil <ArrowRight size={18} />
            </a>
            {site.cvUrl ? (
              <a href={site.cvUrl} download className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                <Download size={18} /> Télécharger mon CV
              </a>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border-2 border-border px-6 py-3 font-semibold text-muted-foreground" title="CV bientôt disponible">
                <Download size={18} /> CV bientôt disponible
              </span>
            )}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm animate-fade-up [animation-delay:200ms]">
          <div className="absolute -inset-4 rotate-3 rounded-[2rem] bg-night-gradient" />
          <div className="relative overflow-hidden rounded-[1.75rem] border-4 border-card shadow-soft">
            <img src={photo.url} alt="Portrait de Nyambia Abraham ESSO" className="aspect-[4/5] w-full object-cover" width={960} height={1280} fetchPriority="high" />
          </div>
          <div className="absolute -bottom-5 -left-5 animate-float rounded-2xl border bg-card px-4 py-3 shadow-soft">
            <p className="flex items-center gap-2 text-sm font-bold text-primary"><ShieldCheck size={18} className="text-accent" /> Full Stack × Cyber</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const QUALITIES = ["Polyvalence", "Curiosité intellectuelle", "Apprentissage continu", "Initiative", "Résilience", "Esprit pratique", "Vision structurée", "Utilisation de l'IA", "Rigueur", "Collaboration"];

function About() {
  return (
    <section id="a-propos" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle index="01" kicker="À propos" title="Construire de A à Z, en sécurité." />
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr]">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p className="text-xl font-semibold text-primary">Bonjour à tous, je m'appelle Abraham et je suis actuellement étudiant en première année de Computer Science.</p>
            <p>Passionné par le monde de la technologie, je m'intéresse particulièrement au développement <strong className="text-primary">Full Stack</strong> et à la <strong className="text-primary">Cyberdéfense</strong>. Je souhaite concevoir des applications de A à Z, de l'interface utilisateur à l'architecture serveur, en accordant une importance particulière à la sécurité.</p>
            <p>Je développe mes compétences en algorithmie, réseaux et administration Linux, tout en intégrant l'IA dans mes méthodes de travail. Curieux, rigoureux et ouvert aux collaborations, je souhaite contribuer à des projets innovants.</p>
          </Reveal>
          <Reveal delay={150} className="rounded-2xl bg-night-gradient p-8 text-night-foreground shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Qualités</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {QUALITIES.map((q) => (
                <li key={q} className="rounded-full border border-sky/30 bg-sky/10 px-3.5 py-1.5 text-sm font-medium">{q}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const ACQUIRED = [
  { name: "HTML", icon: Code2 }, { name: "CSS", icon: Code2 }, { name: "JavaScript", icon: Code2 },
  { name: "Front-End", icon: Layout }, { name: "Algorithmique", icon: Brain }, { name: "Réseaux", icon: Network },
  { name: "Linux", icon: Terminal }, { name: "Outils IA", icon: Sparkles },
];
const LEARNING = [
  { name: "Back-End", icon: Server }, { name: "Administration systèmes", icon: Settings },
  { name: "Cyberdéfense", icon: ShieldCheck }, { name: "Sécurité web et réseaux", icon: Lock },
];

function SkillCard({ name, icon: Icon, learning }: { name: string; icon: typeof Code2; learning?: boolean }) {
  return (
    <div className={`group flex items-center gap-4 rounded-xl border p-4 transition-all hover:-translate-y-1 hover:shadow-soft ${learning ? "border-dashed bg-transparent" : "bg-card"}`}>
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${learning ? "bg-sky/40 text-primary" : "bg-night-gradient text-primary-foreground"}`}>
        <Icon size={20} />
      </span>
      <span className="min-w-0 font-semibold text-primary">{name}</span>
    </div>
  );
}

function Skills() {
  return (
    <section id="competences" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle index="02" kicker="Compétences" title="Ce que je maîtrise, ce que j'apprends." />
        <Reveal>
          <h3 className="mb-5 flex items-center gap-3 text-lg font-bold text-primary"><span className="h-3 w-3 rounded-full bg-primary" /> Compétences acquises</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ACQUIRED.map((s) => <SkillCard key={s.name} {...s} />)}
          </div>
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <h3 className="mb-5 flex items-center gap-3 text-lg font-bold text-primary"><span className="h-3 w-3 rounded-full border-2 border-accent" /> En cours d'apprentissage</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {LEARNING.map((s) => <SkillCard key={s.name} {...s} learning />)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const STEPS = [
  { year: "2022 – 2023", school: "Lycée classique", level: "Seconde C" },
  { year: "2023 – 2024", school: "Lycée Moderne Port-Bouët", level: "Première D" },
  { year: "2025 – 2026", school: "Lycée Moderne Port-Bouët", level: "Terminale D · Baccalauréat" },
  { year: "2026 – 2027", school: "ITA University", level: "Licence 1 Computer Science", current: true },
];

function Timeline() {
  return (
    <section id="parcours" className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5">
        <SectionTitle index="03" kicker="Parcours" title="Mon parcours académique." />
        <ol className="relative border-l-2 border-sky pl-8 md:pl-12">
          {STEPS.map((s, idx) => (
            <Reveal key={s.year} delay={idx * 100} className="relative pb-12 last:pb-0">
              <li>
                <span className={`absolute -left-[2.6rem] top-1 grid h-6 w-6 place-items-center rounded-full md:-left-[3.6rem] ${s.current ? "bg-accent ring-8 ring-sky/50" : "border-2 border-accent bg-background"}`}>
                  {s.current && <GraduationCap size={12} className="text-accent-foreground" />}
                </span>
                <div className={s.current ? "rounded-2xl bg-night-gradient p-6 text-night-foreground shadow-soft" : ""}>
                  <p className={`text-sm font-bold tracking-wider ${s.current ? "text-sky" : "text-accent"}`}>
                    {s.year} {s.current && <span className="ml-2 rounded-full bg-sky px-2.5 py-0.5 text-xs text-primary">Formation actuelle</span>}
                  </p>
                  <h3 className={`mt-2 text-xl font-bold ${s.current ? "" : "text-primary"}`}>{s.level}</h3>
                  <p className={s.current ? "opacity-80" : "text-muted-foreground"}>{s.school}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projets" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle index="04" kicker="Projets" title="Une galerie qui grandit avec moi." />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, idx) => (
            <Reveal key={p.title} delay={idx * 80}>
              <article className="group h-full overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-soft">
                <div className="relative aspect-[16/8] overflow-hidden bg-night-gradient">
                  <div className="absolute inset-0 grid-lines opacity-70" />
                  <span className="absolute left-6 top-6 text-5xl font-extrabold text-night-foreground/90 transition-transform duration-700 group-hover:scale-110">0{idx + 1}</span>
                  <span className="absolute bottom-6 right-6 font-extrabold tracking-[0.3em] text-sky/60">ENA</span>
                  <span className="absolute right-6 top-6 rounded-full bg-sky px-3 py-1 text-xs font-bold text-primary">{p.status}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary">{p.title}</h3>
                  <p className="mt-2 text-muted-foreground">{p.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => <li key={t} className="rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-primary">{t}</li>)}
                  </ul>
                  <div className="mt-5 flex gap-4 text-sm font-semibold">
                    {p.link ? <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:underline"><ExternalLink size={16} /> Voir le projet</a>
                      : <span className="text-muted-foreground">Lien à venir</span>}
                    {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:underline"><Github size={16} /> GitHub</a>}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const configured = Boolean(site.email);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as { name?: string; email?: string; subject?: string; message?: string };
    if (!data.name?.trim() || !/^\S+@\S+\.\S+$/.test(data.email ?? "") || !data.message?.trim()) {
      setStatus("error"); setError("Merci de renseigner un nom, un e-mail valide et un message."); return;
    }
    if (!configured) { setStatus("error"); setError("L'envoi n'est pas encore configuré."); return; }
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: data.subject || "Nouveau message — Portfolio", _template: "table" }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === "false" || json.success === false) throw new Error(json.message || "Échec de l'envoi");
      setStatus("ok"); form.reset();
    } catch (err) {
      setStatus("error"); setError(err instanceof Error ? err.message : "Échec de l'envoi");
    }
  }

  const input = "w-full rounded-xl border bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-4 focus:ring-sky/50";
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle index="05" kicker="Contact" title="Travaillons ensemble." />
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="text-lg text-muted-foreground">Une idée de projet, une collaboration ou une simple question ? Écrivez-moi.</p>
            <div className="mt-8 flex flex-col gap-3">
              {socials.length ? socials.map(({ label, icon: Icon, href }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl border bg-card p-4 font-semibold text-primary transition hover:-translate-y-0.5 hover:shadow-soft">
                  <Icon size={20} className="text-accent" /> {label}
                </a>
              )) : <p className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">Les liens WhatsApp, LinkedIn, GitHub et e-mail apparaîtront ici dès qu'ils seront renseignés.</p>}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <form onSubmit={submit} className="space-y-4 rounded-2xl border bg-card p-6 shadow-soft md:p-8" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-primary">Nom<input name="name" maxLength={100} required className={`${input} mt-1.5`} /></label>
                <label className="block text-sm font-semibold text-primary">E-mail<input name="email" type="email" maxLength={255} required className={`${input} mt-1.5`} /></label>
              </div>
              <label className="block text-sm font-semibold text-primary">Sujet<input name="subject" maxLength={150} className={`${input} mt-1.5`} /></label>
              <label className="block text-sm font-semibold text-primary">Message<textarea name="message" rows={5} maxLength={2000} required className={`${input} mt-1.5 resize-none`} /></label>
              <button disabled={status === "sending" || !configured} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-night-gradient px-6 py-3.5 font-semibold text-primary-foreground transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50">
                <Send size={18} /> {status === "sending" ? "Envoi…" : "Envoyer le message"}
              </button>
              {!configured && <p className="text-sm text-muted-foreground">Le formulaire sera actif dès que l'adresse e-mail de réception sera configurée.</p>}
              {status === "ok" && <p className="text-sm font-semibold text-accent">Message envoyé. Merci, je vous réponds rapidement !</p>}
              {status === "error" && <p className="text-sm font-semibold text-destructive">{error}</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-night-gradient text-night-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-4 opacity-80">Abraham — Computer Science Student</p>
        </div>
        <nav className="grid grid-cols-2 gap-2 text-sm" aria-label="Pied de page">
          {NAV.map(([id, label]) => <a key={id} href={`#${id}`} className="opacity-80 hover:text-sky hover:opacity-100">{label}</a>)}
        </nav>
        <div className="flex gap-3 md:justify-end">
          {socials.map(({ label, icon: Icon, href }) => (
            <a key={label} href={href} aria-label={label} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-sky/30 transition hover:bg-sky hover:text-primary">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
      <p className="border-t border-sky/20 py-6 text-center text-sm opacity-70">© {new Date().getFullYear()} Nyambia Abraham ESSO. Tous droits réservés.</p>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Retour en haut"
      className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-night-gradient text-primary-foreground shadow-soft transition-all duration-500 ${show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
      <ArrowUp size={20} />
    </button>
  );
}
