import { NextResponse } from "next/server"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"
import { getCurrentUser } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const admin = createSupabaseAdminClient()
  if (!admin) {
    return NextResponse.json({ ok: true, stored: false })
  }

  const body = await req.json().catch(() => null)
  if (!body || !["page", "tool"].includes(body.type)) {
    return NextResponse.json({ error: "Evento inválido" }, { status: 400 })
  }

  const user = await getCurrentUser()

  if (body.type === "page") {
    await admin.from("page_events").insert({
      path: String(body.path || "/"),
      session_id: String(body.sessionId || "anonymous"),
      user_id: user?.id || null,
      metadata: body.metadata || {},
    })
  }

  if (body.type === "tool") {
    await admin.from("tool_events").insert({
      tool: String(body.tool || "unknown"),
      path: String(body.path || "/"),
      status: body.status === "error" ? "error" : "success",
      session_id: String(body.sessionId || "anonymous"),
      user_id: user?.id || null,
      metadata: body.metadata || {},
      error_message:
        typeof body.metadata?.error === "string" ? body.metadata.error : null,
    })
  }

  return NextResponse.json({ ok: true, stored: true })
}
