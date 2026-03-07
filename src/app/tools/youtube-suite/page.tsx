"use client"

import { useState } from "react"
import { Container } from "@/components/layout/container"

export default function YouTubeSuite() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [downloadLink, setDownloadLink] = useState<string | null>(null)

  async function handleDownload(e: React.FormEvent) {
    e.preventDefault()
    if (!url) return
    setLoading(true)

    const res = await fetch("/tools/api/youtube-download", {
      method: "POST",
      body: JSON.stringify({ url }),
    })

    const blob = await res.blob()
    setDownloadLink(URL.createObjectURL(blob))
    setLoading(false)
  }

  return (
    <Container>
      <section className="mt-28 max-w-3xl space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-500">
          YouTube Suite
        </h1>

        <form onSubmit={handleDownload} className="space-y-4">
          <input
            type="url"
            placeholder="Cole o link do vídeo"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="block w-full text-zinc-200 bg-zinc-900 border border-emerald-500/30 rounded-lg p-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-emerald-500 text-black font-medium rounded-lg hover:opacity-90 transition"
          >
            {loading ? "Processando..." : "Download Vídeo/Áudio"}
          </button>
        </form>

        {downloadLink && (
          <div className="mt-6">
            <h2 className="text-xl text-emerald-500 mb-2">Download:</h2>
            <a
              href={downloadLink}
              download="video.mp4"
              className="px-4 py-2 bg-emerald-500 rounded-lg text-black font-medium hover:opacity-90 transition"
            >
              Baixar
            </a>
          </div>
        )}
      </section>
    </Container>
  )
}