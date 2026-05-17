import Link from "next/link"
import { redirect } from "next/navigation"
import { Clock, LogOut, Shield } from "lucide-react"
import { Container } from "@/components/layout/container"
import { createSupabaseServerClient, getCurrentUser } from "@/lib/supabase/server"
import { getAdminEmails } from "@/lib/env"
import { signOut } from "./actions"

export const metadata = {
  title: "Conta",
}

export const dynamic = "force-dynamic"

export default async function AccountPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const supabase = await createSupabaseServerClient()
  const { data: events } = supabase
    ? await supabase
        .from("tool_events")
        .select("tool,status,created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(8)
    : { data: [] }

  const isAdmin = getAdminEmails().includes(user.email?.toLowerCase() || "")

  return (
    <Container>
      <section className="mt-24 mb-32 space-y-8">
        <div className="flex flex-col justify-between gap-5 rounded-lg border border-zinc-800 bg-zinc-950/70 p-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
              Conta
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-zinc-100">
              {user.user_metadata?.full_name || user.email}
            </h1>
            <p className="mt-2 text-zinc-400">{user.email}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {isAdmin && (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-4 py-2 font-medium text-black transition hover:bg-emerald-400"
              >
                <Shield size={16} /> Dashboard
              </Link>
            )}
            <form action={signOut}>
              <button className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-4 py-2 text-zinc-200 transition hover:border-emerald-500/60">
                <LogOut size={16} /> Sair
              </button>
            </form>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-6">
          <div className="mb-5 flex items-center gap-2 text-zinc-100">
            <Clock size={18} className="text-emerald-400" />
            <h2 className="text-xl font-semibold">Histórico recente</h2>
          </div>

          {events && events.length > 0 ? (
            <div className="space-y-3">
              {events.map((event, index) => (
                <div
                  key={`${event.tool}-${event.created_at}-${index}`}
                  className="flex items-center justify-between rounded-md border border-zinc-800 bg-black/40 px-4 py-3 text-sm"
                >
                  <span className="text-zinc-300">{event.tool}</span>
                  <span className="text-zinc-500">
                    {event.status} · {new Date(event.created_at).toLocaleString("pt-BR")}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500">
              Use uma ferramenta para começar a construir seu histórico.
            </p>
          )}
        </div>
      </section>
    </Container>
  )
}
