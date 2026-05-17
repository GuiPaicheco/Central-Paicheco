"use client"

import { useEffect, useMemo, useState } from "react"
import QRCode from "qrcode"
import { Check, Copy, Download, QrCode } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import { Container } from "@/components/layout/container"
import { trackEvent } from "@/lib/tracking"

export default function QRCodePage() {
  const [text, setText] = useState("https://central-paicheco.vercel.app")
  const [foreground, setForeground] = useState("#00ff88")
  const [background, setBackground] = useState("#000000")
  const [size, setSize] = useState(512)
  const [margin, setMargin] = useState(2)
  const [png, setPng] = useState("")
  const [svg, setSvg] = useState("")
  const [copied, setCopied] = useState(false)

  const options = useMemo(
    () => ({
      width: size,
      margin,
      color: {
        dark: foreground,
        light: background,
      },
    }),
    [background, foreground, margin, size]
  )

  useEffect(() => {
    let active = true

    async function generate() {
      if (!text.trim()) {
        setPng("")
        setSvg("")
        return
      }

      try {
        const [nextPng, nextSvg] = await Promise.all([
          QRCode.toDataURL(text, options),
          QRCode.toString(text, { ...options, type: "svg" }),
        ])

        if (active) {
          setPng(nextPng)
          setSvg(nextSvg)
        }
      } catch {
        if (active) {
          setPng("")
          setSvg("")
        }
      }
    }

    generate()
    return () => {
      active = false
    }
  }, [options, text])

  async function copyPng() {
    if (!png) return
    const blob = await (await fetch(png)).blob()
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ])
    setCopied(true)
    trackEvent({ type: "tool", tool: "qr-code", status: "success" })
    setTimeout(() => setCopied(false), 1400)
  }

  function downloadSvg() {
    if (!svg) return
    const blob = new Blob([svg], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "qrcode.svg"
    link.click()
    URL.revokeObjectURL(url)
    trackEvent({ type: "tool", tool: "qr-code", status: "success" })
  }

  return (
    <Container>
      <section className="mt-24 mb-32 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
              QR Code
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-zinc-100 md:text-4xl">
              Gere QR Codes com controle visual.
            </h1>
            <p className="mt-4 text-zinc-400">
              O preview atualiza em tempo real e tudo roda no seu navegador.
            </p>

            <div className="mt-8 space-y-5 rounded-lg border border-zinc-800 bg-zinc-950/70 p-5">
              <label className="block text-sm text-zinc-300">
                Texto ou link
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  className="mt-2 w-full resize-none rounded-md border border-zinc-800 bg-black px-3 py-3 text-zinc-100 outline-none transition focus:border-emerald-500"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-zinc-300">
                  Cor principal
                  <input
                    type="color"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    className="mt-2 h-11 w-full rounded-md border border-zinc-800 bg-black p-1"
                  />
                </label>
                <label className="text-sm text-zinc-300">
                  Fundo
                  <input
                    type="color"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="mt-2 h-11 w-full rounded-md border border-zinc-800 bg-black p-1"
                  />
                </label>
              </div>

              <label className="block text-sm text-zinc-300">
                Tamanho: {size}px
                <input
                  type="range"
                  min={256}
                  max={1024}
                  step={64}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="mt-2 w-full accent-emerald-500"
                />
              </label>

              <label className="block text-sm text-zinc-300">
                Margem: {margin}
                <input
                  type="range"
                  min={0}
                  max={8}
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="mt-2 w-full accent-emerald-500"
                />
              </label>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-5">
            <div className="flex items-center gap-3 text-zinc-100">
              <QrCode className="text-emerald-400" size={20} />
              <h2 className="font-semibold">Preview</h2>
            </div>

            <div className="mt-5 flex aspect-square items-center justify-center rounded-md border border-zinc-800 bg-black p-4">
              {png ? (
                <img src={png} alt="QR Code gerado" className="max-h-full max-w-full" />
              ) : (
                <p className="text-center text-sm text-zinc-500">
                  Digite algo para gerar o QR Code.
                </p>
              )}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <a
                href={png}
                download="qrcode.png"
                onClick={() =>
                  trackEvent({ type: "tool", tool: "qr-code", status: "success" })
                }
                className={`inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-black transition hover:bg-emerald-400 ${
                  !png ? "pointer-events-none opacity-50" : ""
                }`}
              >
                <Download size={16} /> PNG
              </a>
              <button
                onClick={downloadSvg}
                disabled={!svg}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:border-emerald-500/60 disabled:opacity-50"
              >
                <Download size={16} /> SVG
              </button>
              <button
                onClick={copyPng}
                disabled={!png}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:border-emerald-500/60 disabled:opacity-50"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copiado" : "Copiar"}
              </button>
            </div>
          </div>
        </Reveal>
      </section>
    </Container>
  )
}
