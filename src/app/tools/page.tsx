"use client"

import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/ui/reveal"
import { ToolCard } from "@/components/ui/custom/tool-card"

export default function ToolsPage() {
  return (
    <Container>
      <section className="mt-28 mb-32 space-y-12">
        <Reveal>
          <h1 className="text-3xl md:text-4xl font-semibold text-emerald-500">
            Tools
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-zinc-400 max-w-2xl">
            Um conjunto de ferramentas para produtividade, manipulação de mídia e arquivos.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          <ToolCard
            title="QR Code Generator"
            description="Gerador versátil de QR Code com exportação em PNG."
            href="/tools/qr-code"
          />
          <ToolCard
            title="File Tools (ainda em desenvolvimento)"
            description="Conversão de imagem para PDF e PDF para imagem."
            href="/tools/file-tools"
          />
          <ToolCard
            title="Background Remover"
            description="Remoção automática de fundo de imagens."
            href="/tools/remove-bg"
          />
          <ToolCard
            title="YouTube Suite"
            description="Download, recorte e extração de áudio/vídeo de vídeos."
            href="/tools/youtube-suite"
          />
        </div>
      </section>
    </Container>
  )
}