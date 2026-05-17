"use client"

import { FileImage, ImageOff, QrCode, Youtube } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/ui/reveal"
import { ToolCard } from "@/components/ui/custom/tool-card"

const tools = [
  {
    title: "QR Code",
    description: "Gerador com preview ao vivo, cores, margem e exportação em PNG ou SVG.",
    href: "/tools/qr-code",
    icon: QrCode,
    badge: "client-side",
  },
  {
    title: "File Tools",
    description: "Converta múltiplas imagens em PDF com preview antes do download.",
    href: "/tools/file-tools",
    icon: FileImage,
    badge: "client-side",
  },
  {
    title: "Background Remover",
    description: "Remova fundos usando Remove.bg com login e limite diário.",
    href: "/tools/remove-bg",
    icon: ImageOff,
    badge: "login",
  },
  {
    title: "YouTube Suite",
    description: "Metadata, thumbnails, embed preview e links com timestamp.",
    href: "/tools/youtube-suite",
    icon: Youtube,
    badge: "seguro",
  },
]

export default function ToolsPage() {
  return (
    <Container>
      <section className="mt-24 mb-32 space-y-10">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
              Ferramentas
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-zinc-100 md:text-4xl">
              Utilidades rápidas para usar sem cerimônia.
            </h1>
            <p className="mt-4 text-zinc-400">
              A primeira versão prioriza ferramentas leves, confiáveis e úteis
              no dia a dia. Recursos com custo externo exigem login.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) => (
            <Reveal key={tool.href} delay={index * 0.06}>
              <ToolCard {...tool} />
            </Reveal>
          ))}
        </div>
      </section>
    </Container>
  )
}
