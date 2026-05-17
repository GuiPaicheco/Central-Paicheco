"use client"

import { useEffect, useMemo, useState } from "react"
import { jsPDF } from "jspdf"
import { Download, FileImage, Loader2, X } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/ui/reveal"
import { trackEvent } from "@/lib/tracking"

type PreviewFile = {
  file: File
  url: string
}

export default function FileToolsPage() {
  const [files, setFiles] = useState<PreviewFile[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const totalSize = useMemo(
    () => files.reduce((sum, item) => sum + item.file.size, 0),
    [files]
  )

  useEffect(() => {
    return () => {
      files.forEach((item) => URL.revokeObjectURL(item.url))
    }
  }, [files])

  function handleFiles(nextFiles: FileList | null) {
    setMessage("")
    if (!nextFiles) return

    const images = Array.from(nextFiles).filter((file) =>
      file.type.startsWith("image/")
    )

    if (images.length !== nextFiles.length) {
      setMessage("Alguns arquivos foram ignorados porque não são imagens.")
    }

    setFiles((current) => [
      ...current,
      ...images.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      })),
    ])
  }

  function removeFile(index: number) {
    setFiles((current) => {
      const copy = [...current]
      const [removed] = copy.splice(index, 1)
      if (removed) URL.revokeObjectURL(removed.url)
      return copy
    })
  }

  async function generatePdf() {
    if (files.length === 0) {
      setMessage("Selecione pelo menos uma imagem.")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      let pdf: jsPDF | null = null

      for (let index = 0; index < files.length; index++) {
        const item = files[index]
        const image = await loadImage(item.url)
        const orientation = image.width >= image.height ? "landscape" : "portrait"

        if (!pdf) {
          pdf = new jsPDF({ orientation, unit: "mm", format: "a4" })
        } else {
          pdf.addPage("a4", orientation)
        }

        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()
        const margin = 10
        const maxWidth = pageWidth - margin * 2
        const maxHeight = pageHeight - margin * 2
        const ratio = Math.min(maxWidth / image.width, maxHeight / image.height)
        const width = image.width * ratio
        const height = image.height * ratio
        const x = (pageWidth - width) / 2
        const y = (pageHeight - height) / 2

        pdf.addImage(item.url, imageFormat(item.file), x, y, width, height)
      }

      pdf?.save("central-paicheco-imagens.pdf")
      trackEvent({
        type: "tool",
        tool: "file-tools",
        status: "success",
        metadata: { files: files.length },
      })
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Falha ao gerar PDF"
      setMessage(detail)
      trackEvent({
        type: "tool",
        tool: "file-tools",
        status: "error",
        metadata: { error: detail },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <section className="mt-24 mb-32 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
              File Tools
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-zinc-100 md:text-4xl">
              Imagens para PDF, com preview.
            </h1>
            <p className="mt-4 text-zinc-400">
              Selecione uma ou mais imagens. O PDF é gerado localmente, sem
              upload dos arquivos.
            </p>

            <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-950/70 p-5">
              <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-zinc-700 bg-black/40 p-6 text-center transition hover:border-emerald-500/60">
                <FileImage size={28} className="mb-3 text-emerald-400" />
                <span className="font-medium text-zinc-200">Selecionar imagens</span>
                <span className="mt-1 text-sm text-zinc-500">
                  PNG, JPG, WEBP e outros formatos aceitos pelo navegador
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFiles(e.target.files)}
                  className="sr-only"
                />
              </label>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-500">
                <span>{files.length} imagem(ns)</span>
                <span>{(totalSize / 1024 / 1024).toFixed(2)} MB</span>
              </div>

              {message && (
                <p className="mt-4 rounded-md border border-zinc-800 bg-black/40 p-3 text-sm text-zinc-300">
                  {message}
                </p>
              )}

              <button
                onClick={generatePdf}
                disabled={loading || files.length === 0}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 py-3 font-medium text-black transition hover:bg-emerald-400 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
                Gerar PDF
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-5">
            <h2 className="font-semibold text-zinc-100">Preview</h2>

            {files.length > 0 ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {files.map((item, index) => (
                  <div
                    key={item.url}
                    className="relative overflow-hidden rounded-md border border-zinc-800 bg-black"
                  >
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute right-2 top-2 z-10 rounded-md bg-black/80 p-1 text-zinc-200 transition hover:text-emerald-300"
                      aria-label="Remover imagem"
                    >
                      <X size={16} />
                    </button>
                    <img
                      src={item.url}
                      alt={item.file.name}
                      className="aspect-[4/3] w-full object-contain"
                    />
                    <div className="border-t border-zinc-800 p-3">
                      <p className="truncate text-sm text-zinc-300">{item.file.name}</p>
                      <p className="text-xs text-zinc-500">
                        {(item.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 flex min-h-80 items-center justify-center rounded-md border border-zinc-800 bg-black/40 text-sm text-zinc-500">
                Nenhuma imagem selecionada.
              </div>
            )}
          </div>
        </Reveal>
      </section>
    </Container>
  )
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}

function imageFormat(file: File) {
  if (file.type.includes("png")) return "PNG"
  if (file.type.includes("webp")) return "WEBP"
  return "JPEG"
}
