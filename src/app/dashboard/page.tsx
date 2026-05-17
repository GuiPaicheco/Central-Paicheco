import { redirect } from "next/navigation"
import { Activity, AlertTriangle, Eye, Users } from "lucide-react"
import { Container } from "@/components/layout/container"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"
import { getCurrentUser } from "@/lib/supabase/server"
import { getAdminEmails, isSupabaseAdminConfigured } from "@/lib/env"

export const metadata = {
  title: "Dashboard",
}

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const isAdmin = getAdminEmails().includes(user.email?.toLowerCase() || "")
  if (!isAdmin) redirect("/account")

  const admin = createSupabaseAdminClient()

  const [
    pageEvents,
    toolEvents,
    profiles,
    errors,
  ] = admin
    ? await Promise.all([
        admin.from("page_events").select("path,created_at").order("created_at", { ascending: false }).limit(200),
        admin.from("tool_events").select("tool,status,created_at").order("created_at", { ascending: false }).limit(200),
        admin.from("profiles").select("email,name,role,created_at").order("created_at", { ascending: false }).limit(8),
        admin.from("tool_events").select("tool,status,error_message,created_at").eq("status", "error").order("created_at", { ascending: false }).limit(8),
      ])
    : [{ data: [] }, { data: [] }, { data: [] }, { data: [] }]

  const pageCount = pageEvents.data?.length || 0
  const toolCount = toolEvents.data?.length || 0
  const userCount = profiles.data?.length || 0
  const errorCount = errors.data?.length || 0

  const topPages = summarize(pageEvents.data || [], "path")
  const topTools = summarize(toolEvents.data || [], "tool")

  return (
    <Container>
      <section className="mt-24 mb-32 space-y-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
            Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-zinc-100 md:text-4xl">
            Controle da Central
          </h1>
          <p className="mt-3 text-zinc-400">
            Métricas próprias salvas no Supabase. Vercel Analytics e Speed
            Insights aparecem no painel da Vercel.
          </p>
        </div>

        {!isSupabaseAdminConfigured() && (
          <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-200">
            Configure `SUPABASE_SERVICE_ROLE_KEY` para habilitar consultas
            administrativas completas.
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={Eye} label="visitas recentes" value={pageCount} />
          <Stat icon={Activity} label="usos de ferramentas" value={toolCount} />
          <Stat icon={Users} label="usuários recentes" value={userCount} />
          <Stat icon={AlertTriangle} label="erros recentes" value={errorCount} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Páginas mais vistas">
            <RankedList rows={topPages} empty="Nenhuma visita registrada." />
          </Panel>
          <Panel title="Ferramentas mais usadas">
            <RankedList rows={topTools} empty="Nenhuma ferramenta usada ainda." />
          </Panel>
          <Panel title="Usuários recentes">
            <div className="space-y-3">
              {(profiles.data || []).map((profile) => (
                <div
                  key={profile.email}
                  className="rounded-md border border-zinc-800 bg-black/40 px-4 py-3 text-sm"
                >
                  <p className="text-zinc-200">{profile.name || profile.email}</p>
                  <p className="text-zinc-500">
                    {profile.email} · {profile.role}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Erros de ferramentas">
            <div className="space-y-3">
              {(errors.data || []).map((error, index) => (
                <div
                  key={`${error.tool}-${error.created_at}-${index}`}
                  className="rounded-md border border-zinc-800 bg-black/40 px-4 py-3 text-sm"
                >
                  <p className="text-zinc-200">{error.tool}</p>
                  <p className="text-zinc-500">
                    {error.error_message || "Erro sem detalhes"}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </section>
    </Container>
  )
}

function summarize<T extends Record<string, unknown>>(rows: T[], key: keyof T) {
  const totals = new Map<string, number>()
  rows.forEach((row) => {
    const value = String(row[key] || "desconhecido")
    totals.set(value, (totals.get(value) || 0) + 1)
  })

  return Array.from(totals.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8)
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Eye
  label: string
  value: number
}) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-5">
      <Icon size={20} className="text-emerald-400" />
      <p className="mt-4 text-2xl font-semibold text-zinc-100">{value}</p>
      <p className="text-sm text-zinc-500">{label}</p>
    </div>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-5">
      <h2 className="mb-4 text-lg font-semibold text-zinc-100">{title}</h2>
      {children}
    </div>
  )
}

function RankedList({
  rows,
  empty,
}: {
  rows: { label: string; value: number }[]
  empty: string
}) {
  if (rows.length === 0) return <p className="text-sm text-zinc-500">{empty}</p>

  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-center justify-between rounded-md border border-zinc-800 bg-black/40 px-4 py-3 text-sm"
        >
          <span className="text-zinc-300">{row.label}</span>
          <span className="text-emerald-300">{row.value}</span>
        </div>
      ))}
    </div>
  )
}
