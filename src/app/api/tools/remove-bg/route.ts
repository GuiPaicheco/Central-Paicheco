import { NextResponse } from "next/server"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"
import { getCurrentUser } from "@/lib/supabase/server"

const DAILY_LIMIT = 5

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: "Faça login para usar esta ferramenta." }, { status: 401 })
  }

  if (!process.env.REMOVE_BG_API_KEY) {
    return NextResponse.json(
      { error: "REMOVE_BG_API_KEY não está configurada." },
      { status: 503 }
    )
  }

  const admin = createSupabaseAdminClient()
  if (!admin) {
    return NextResponse.json(
      { error: "Supabase admin não está configurado." },
      { status: 503 }
    )
  }

  const today = new Date().toISOString().slice(0, 10)
  const limitKey = {
    user_id: user.id,
    tool: "remove-bg",
    usage_date: today,
  }

  const { data: limit } = await admin
    .from("tool_limits")
    .select("count")
    .match(limitKey)
    .maybeSingle()

  if ((limit?.count || 0) >= DAILY_LIMIT) {
    return NextResponse.json(
      { error: `Limite diário atingido (${DAILY_LIMIT} imagens).` },
      { status: 429 }
    )
  }

  const formData = await req.formData()
  const file = formData.get("image")

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 })
  }

  if (!["image/png", "image/jpeg"].includes(file.type)) {
    return NextResponse.json(
      { error: "Envie uma imagem PNG ou JPG." },
      { status: 400 }
    )
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json(
      { error: "A imagem deve ter no máximo 10 MB." },
      { status: 400 }
    )
  }

  const apiFormData = new FormData()
  apiFormData.append("image_file", file)
  apiFormData.append("size", "auto")

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": process.env.REMOVE_BG_API_KEY,
    },
    body: apiFormData,
  })

  if (!response.ok) {
    const details = await response.json().catch(() => null)
    await admin.from("tool_events").insert({
      tool: "remove-bg",
      path: "/tools/remove-bg",
      status: "error",
      user_id: user.id,
      metadata: details || {},
      error_message: "Erro na API remove.bg",
    })

    return NextResponse.json(
      { error: "Erro na API de remoção.", details },
      { status: response.status }
    )
  }

  await admin.from("tool_limits").upsert({
    ...limitKey,
    count: (limit?.count || 0) + 1,
  })

  const imageBlob = await response.blob()

  return new NextResponse(imageBlob, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  })
}
