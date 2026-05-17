"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Download, ImageOff, Loader2 } from "lucide-react"
import { Container } from "@/components/layout/container"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { trackEvent } from "@/lib/tracking"

export default function RemoveBG() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    try {
      const supabase = createSupabaseBrowserClient()
      supabase.auth.getSession().then(({ data }) => {
        setLoggedIn(Boolean(data.session))
        setAuthChecked(true)
      })
    } catch {
      setAuthChecked(true)
    }
  }, [])

  function selectFile(nextFile: File | null) {
    setFile(nextFile)
    setMessage("")
    setResultUrl(null)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(nextFile ? URL.createObjectURL(nextFile) : null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    setMessage("")

    const formData = new FormData()
    formData.append("image", file)

    try {
      const res = await fetch("/api/tools/remove-bg", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || "Não foi possível remover o fundo.")
      }

      const blob = await res.blob()
      if (resultUrl) URL.revokeObjectURL(resultUrl)
      setResultUrl(URL.createObjectURL(blob))
      trackEvent({ type: "tool", tool: "remove-bg", status: "success" })
    } catch (error) {
      const detail =
        error instanceof Error ? error.message : "Erro ao processar imagem."
      setMessage(detail)
      trackEvent({
        type: "tool",
        tool: "remove-bg",
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
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
            Background Remover
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-zinc-100 md:text-4xl">
            Remova fundos com controle de uso.
          </h1>
          <p className="mt-4 text-zinc-400">
            Esta ferramenta usa uma API externa, por isso exige login e aplica
            limite diário por usuário.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5 rounded-lg border border-zinc-800 bg-zinc-950/70 p-5"
          >
            {!authChecked ? (
              <p className="text-sm text-zinc-500">Verificando sessão...</p>
            ) : !loggedIn ? (
              <div className="rounded-md border border-zinc-800 bg-black/40 p-4">
                <p className="text-sm text-zinc-300">
                  Entre para usar a remoção de fundo.
                </p>
                <Link
                  href="/login"
                  className="mt-3 inline-flex rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-emerald-400"
                >
                  Entrar
                </Link>
              </div>
            ) : (
              <>
                <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-zinc-700 bg-black/40 p-6 text-center transition hover:border-emerald-500/60">
                  <ImageOff size={28} className="mb-3 text-emerald-400" />
                  <span className="font-medium text-zinc-200">
                    Selecionar imagem
                  </span>
                  <span className="mt-1 text-sm text-zinc-500">
                    PNG ou JPG, até 10 MB
                  </span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => selectFile(e.target.files?.[0] || null)}
                    className="sr-only"
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading || !file}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 py-3 font-medium text-black transition hover:bg-emerald-400 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <ImageOff size={18} />}
                  Remover fundo
                </button>
              </>
            )}

            {message && (
              <p className="rounded-md border border-zinc-800 bg-black/40 p-3 text-sm text-zinc-300">
                {message}
              </p>
            )}
          </form>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <Preview title="Original" url={previewUrl} />
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-5">
            <h2 className="font-semibold text-zinc-100">Resultado</h2>
            <div className="mt-4 flex min-h-80 items-center justify-center rounded-md border border-zinc-800 bg-[linear-gradient(45deg,#18181b_25%,transparent_25%),linear-gradient(-45deg,#18181b_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#18181b_75%),linear-gradient(-45deg,transparent_75%,#18181b_75%)] bg-[length:24px_24px] bg-[position:0_0,0_12px,12px_-12px,-12px_0] p-3">
              {resultUrl ? (
                <img src={resultUrl} alt="Imagem sem fundo" className="max-h-96 object-contain" />
              ) : (
                <p className="text-sm text-zinc-500">O resultado aparece aqui.</p>
              )}
            </div>
            {resultUrl && (
              <a
                href={resultUrl}
                download="imagem-sem-fundo.png"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 py-3 font-medium text-black transition hover:bg-emerald-400"
              >
                <Download size={18} /> Baixar PNG
              </a>
            )}
          </div>
        </div>
      </section>
    </Container>
  )
}

function Preview({ title, url }: { title: string; url: string | null }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-5">
      <h2 className="font-semibold text-zinc-100">{title}</h2>
      <div className="mt-4 flex min-h-80 items-center justify-center rounded-md border border-zinc-800 bg-black/40 p-3">
        {url ? (
          <img src={url} alt={title} className="max-h-96 object-contain" />
        ) : (
          <p className="text-sm text-zinc-500">Nenhuma imagem selecionada.</p>
        )}
      </div>
    </div>
  )
}
