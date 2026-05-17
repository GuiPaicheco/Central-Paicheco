"use client"

import { useState } from "react"
import { Github, Loader2, Mail } from "lucide-react"
import { Container } from "@/components/layout/container"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function signInWithEmail(e: React.FormEvent) {
    e.preventDefault()
    setMessage("")
    setLoading(true)

    try {
      const supabase = createSupabaseBrowserClient()
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      setMessage(
        error
          ? error.message
          : "Enviamos um link mágico para seu e-mail. Confira sua caixa de entrada."
      )
    } catch {
      setMessage("Configure as variáveis do Supabase para habilitar login.")
    } finally {
      setLoading(false)
    }
  }

  async function signInWithGitHub() {
    setMessage("")
    setLoading(true)

    try {
      const supabase = createSupabaseBrowserClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) setMessage(error.message)
    } catch {
      setMessage("Configure as variáveis do Supabase para habilitar login.")
      setLoading(false)
    }
  }

  return (
    <Container>
      <section className="mx-auto mt-24 mb-32 max-w-md rounded-lg border border-zinc-800 bg-zinc-950/70 p-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
          Conta
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-100">
          Entrar na Central
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Use login sem senha para salvar histórico das ferramentas e acessar
          sua área pessoal.
        </p>

        <form onSubmit={signInWithEmail} className="mt-6 space-y-4">
          <label className="block text-sm text-zinc-300" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@email.com"
            className="w-full rounded-md border border-zinc-800 bg-black px-3 py-3 text-zinc-100 outline-none transition focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 py-3 font-medium text-black transition hover:bg-emerald-400 disabled:opacity-60"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Mail size={18} />}
            Enviar link mágico
          </button>
        </form>

        <button
          type="button"
          onClick={signInWithGitHub}
          disabled={loading}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-zinc-700 px-4 py-3 font-medium text-zinc-200 transition hover:border-emerald-500/60 hover:text-emerald-300 disabled:opacity-60"
        >
          <Github size={18} />
          Entrar com GitHub
        </button>

        {message && (
          <p className="mt-4 rounded-md border border-zinc-800 bg-black/50 p-3 text-sm text-zinc-300">
            {message}
          </p>
        )}
      </section>
    </Container>
  )
}
