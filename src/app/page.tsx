import Link from "next/link"
import {
  FileImage,
  Github,
  ImageOff,
  QrCode,
  ShieldCheck,
  Youtube,
} from "lucide-react"
import { Container } from "@/components/layout/container"
import { Hero } from "@/components/sections/hero"
import { Reveal } from "@/components/ui/reveal"
import { getRepositories } from "@/lib/github"

const tools = [
  {
    title: "QR Code",
    description: "Gere códigos com cores, margem e exportação em PNG ou SVG.",
    href: "/tools/qr-code",
    icon: QrCode,
  },
  {
    title: "File Tools",
    description: "Transforme uma ou várias imagens em PDF sem enviar arquivos.",
    href: "/tools/file-tools",
    icon: FileImage,
  },
  {
    title: "Remove BG",
    description: "Remova fundo de imagens com autenticação e controle de uso.",
    href: "/tools/remove-bg",
    icon: ImageOff,
  },
  {
    title: "YouTube Suite",
    description: "Analise metadata, thumbnails, embed e links com timestamp.",
    href: "/tools/youtube-suite",
    icon: Youtube,
  },
]

export default async function Home() {
  const repositories = await getRepositories().catch(() => [])
  const recentRepositories = repositories.slice(0, 3)

  return (
    <Container>
      <Reveal>
        <Hero />
      </Reveal>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        <Reveal>
          <Metric value={tools.length.toString()} label="ferramentas públicas" />
        </Reveal>
        <Reveal delay={0.08}>
          <Metric value={repositories.length.toString()} label="projetos do GitHub" />
        </Reveal>
        <Reveal delay={0.16}>
          <Metric value="login" label="histórico e painel privado" />
        </Reveal>
      </section>

      <section className="mt-24">
        <Reveal>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
                Ferramentas
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-zinc-100 md:text-3xl">
                Comece pelo que resolve algo agora.
              </h2>
            </div>
            <Link
              href="/tools"
              className="text-sm font-medium text-emerald-300 hover:text-emerald-200"
            >
              Ver todas
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) => (
            <Reveal key={tool.href} delay={index * 0.06}>
              <Link
                href={tool.href}
                className="block h-full rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-emerald-500/50 hover:bg-zinc-900"
              >
                <tool.icon className="mb-4 text-emerald-400" size={24} />
                <h3 className="font-semibold text-zinc-100">{tool.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {tool.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
              Projetos
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-100 md:text-3xl">
              Repositórios sincronizados automaticamente.
            </h2>
            <p className="mt-4 text-zinc-400">
              Nada de vitrine parada: a página de projetos busca o GitHub,
              ordena destaques e mostra atividade recente.
            </p>
            <Link
              href="/repositories"
              className="mt-6 inline-flex items-center gap-2 rounded-md border border-emerald-500/40 px-4 py-2 text-emerald-300 transition hover:bg-emerald-500/10"
            >
              Abrir projetos <Github size={16} />
            </Link>
          </div>
        </Reveal>

        <div className="space-y-3">
          {recentRepositories.map((repo, index) => (
            <Reveal key={repo.id} delay={index * 0.08}>
              <Link
                href={repo.html_url}
                target="_blank"
                className="flex items-center justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition hover:border-emerald-500/40"
              >
                <div>
                  <h3 className="font-medium text-zinc-100">{repo.name}</h3>
                  <p className="mt-1 line-clamp-1 text-sm text-zinc-500">
                    {repo.description || "Projeto público no GitHub"}
                  </p>
                </div>
                <span className="text-sm text-emerald-300">
                  {repo.language || "repo"}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-24 mb-32 rounded-lg border border-zinc-800 bg-zinc-950/70 p-6">
        <Reveal>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 text-sm text-emerald-300">
                <ShieldCheck size={16} /> Área com login
              </div>
              <h2 className="text-2xl font-semibold text-zinc-100">
                Conta pública e painel administrativo.
              </h2>
              <p className="mt-2 max-w-2xl text-zinc-400">
                Visitantes podem entrar para manter histórico de uso. O admin
                acompanha visitas, ferramentas e integrações no dashboard.
              </p>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-5 py-3 font-medium text-black transition hover:bg-emerald-400"
            >
              Entrar na Central
            </Link>
          </div>
        </Reveal>
      </section>
    </Container>
  )
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
      <p className="text-2xl font-semibold text-emerald-400">{value}</p>
      <p className="mt-1 text-sm text-zinc-500">{label}</p>
    </div>
  )
}
