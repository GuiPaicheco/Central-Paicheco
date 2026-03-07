"use client"

import { useRef } from "react"
import { jsPDF } from "jspdf"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/ui/reveal"

export default function FileToolsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const generatePdf = () => {
    const file = fileInputRef.current?.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const imgData = reader.result as string
      const pdf = new jsPDF()
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297)
      pdf.save("file.pdf")
    }
    reader.readAsDataURL(file)
  }

  return (
    <Container>
      <section className="mt-28 mb-32 space-y-6 max-w-xl">
        <Reveal>
          <h1 className="text-3xl md:text-4xl font-semibold text-emerald-500">
            File Tools
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-foreground"
          />
        </Reveal>

        <Reveal delay={0.2}>
          <button
            onClick={generatePdf}
            className="px-6 py-3 rounded-lg bg-emerald-500 text-black font-medium hover:opacity-90 transition"
          >
            Gerar PDF
          </button>
        </Reveal>
      </section>
    </Container>
  )
}