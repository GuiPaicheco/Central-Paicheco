"use client"

import { useState } from "react"
import { Container } from "@/components/layout/container"

export default function RemoveBG() {
  const [file, setFile] = useState<File | null>(null)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return
    setLoading(true)

    const formData = new FormData()
    formData.append("image", file)

    const res = await fetch("/tools/api/remove-bg", {
      method: "POST",
      body: formData,
    })

    const blob = await res.blob()
    setResultUrl(URL.createObjectURL(blob))
    setLoading(false)
  }

  return (
    <Container>
      <section className="mt-28 max-w-3xl space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-500">
          Remover Fundo de Imagem
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-zinc-200 bg-zinc-900 border border-emerald-500/30 rounded-lg p-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-emerald-500 text-black font-medium rounded-lg hover:opacity-90 transition"
          >
            {loading ? "Processando..." : "Remover Fundo"}
          </button>
        </form>

        {resultUrl && (
          <div className="mt-6">
            <h2 className="text-xl text-emerald-500 mb-2">Resultado:</h2>
            <img src={resultUrl} alt="Resultado" className="rounded-xl shadow-lg" />
          </div>
        )}
      </section>
    </Container>
  )
}