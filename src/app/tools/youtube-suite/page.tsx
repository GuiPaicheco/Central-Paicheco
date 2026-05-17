"use client"

import { useMemo, useState } from "react"
import { Copy, ExternalLink, Loader2, Youtube } from "lucide-react"
import { Container } from "@/components/layout/container"
import { trackEvent } from "@/lib/tracking"

type VideoInfo = {
  videoId: string
  title: string
  authorName: string
  authorUrl: string
  thumbnailUrl: string
  embedUrl: string
  watchUrl: string
}

export default function YouTubeSuite() {
  const [url, setUrl] = useState("")
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState<VideoInfo | null>(null)
  const [message, setMessage] = useState("")

  const timestampUrl = useMemo(() => {
    if (!info) return ""
    const totalSeconds = Math.max(0, minutes * 60 + seconds)
    return `${info.watchUrl}&t=${totalSeconds}s`
  }, [info, minutes, seconds])

  async function loadInfo(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setInfo(null)

    try {
      const res = await fetch("/api/tools/youtube/info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Não foi possível ler o vídeo.")

      setInfo(data)
      trackEvent({ type: "tool", tool: "youtube-suite", status: "success" })
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Erro inesperado."
      setMessage(detail)
      trackEvent({
        type: "tool",
        tool: "youtube-suite",
        status: "error",
        metadata: { error: detail },
      })
    } finally {
      setLoading(false)
    }
  }

  async function copy(value: string) {
    await navigator.clipboard.writeText(value)
    setMessage("Copiado para a área de transferência.")
  }

  return (
    <Container>
      <section className="mt-24 mb-32 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
            YouTube Suite
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-zinc-100 md:text-4xl">
            Metadata, thumbnail e timestamp.
          </h1>
          <p className="mt-4 text-zinc-400">
            Esta versão não baixa vídeos. Ela trabalha com informações públicas,
            embed e links úteis para compartilhar trechos.
          </p>

          <form
            onSubmit={loadInfo}
            className="mt-8 space-y-5 rounded-lg border border-zinc-800 bg-zinc-950/70 p-5"
          >
            <label className="block text-sm text-zinc-300">
              Link do vídeo
              <input
                type="url"
                required
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-2 w-full rounded-md border border-zinc-800 bg-black px-3 py-3 text-zinc-100 outline-none transition focus:border-emerald-500"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-zinc-300">
                Minutos
                <input
                  type="number"
                  min={0}
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  className="mt-2 w-full rounded-md border border-zinc-800 bg-black px-3 py-3 text-zinc-100 outline-none transition focus:border-emerald-500"
                />
              </label>
              <label className="block text-sm text-zinc-300">
                Segundos
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={seconds}
                  onChange={(e) => setSeconds(Number(e.target.value))}
                  className="mt-2 w-full rounded-md border border-zinc-800 bg-black px-3 py-3 text-zinc-100 outline-none transition focus:border-emerald-500"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 py-3 font-medium text-black transition hover:bg-emerald-400 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Youtube size={18} />}
              Analisar vídeo
            </button>

            {message && (
              <p className="rounded-md border border-zinc-800 bg-black/40 p-3 text-sm text-zinc-300">
                {message}
              </p>
            )}
          </form>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-5">
          {info ? (
            <div className="space-y-5">
              <iframe
                src={info.embedUrl}
                title={info.title}
                className="aspect-video w-full rounded-md border border-zinc-800"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

              <div>
                <h2 className="text-xl font-semibold text-zinc-100">{info.title}</h2>
                <a
                  href={info.authorUrl}
                  target="_blank"
                  className="mt-1 inline-flex items-center gap-2 text-sm text-emerald-300"
                >
                  {info.authorName} <ExternalLink size={14} />
                </a>
              </div>

              <img
                src={info.thumbnailUrl}
                alt={`Thumbnail de ${info.title}`}
                className="w-full rounded-md border border-zinc-800"
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => copy(timestampUrl)}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:border-emerald-500/60"
                >
                  <Copy size={16} /> Copiar timestamp
                </button>
                <button
                  onClick={() => copy(info.thumbnailUrl)}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:border-emerald-500/60"
                >
                  <Copy size={16} /> Copiar thumbnail
                </button>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[460px] items-center justify-center rounded-md border border-zinc-800 bg-black/40 text-center text-sm text-zinc-500">
              Cole um link para ver metadata, thumbnail e embed.
            </div>
          )}
        </div>
      </section>
    </Container>
  )
}
