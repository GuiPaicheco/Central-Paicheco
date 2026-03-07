import { NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(req: Request) {
  const { url } = await req.json()
  if (!url) return NextResponse.json({ error: "No URL provided" }, { status: 400 })

  // Aqui você colocaria lógica real de download (ex: ytdl-core)
  // Por enquanto retornaremos arquivo de exemplo
  const dummyContent = Buffer.from("Video dummy content")
  return new NextResponse(dummyContent, { status: 200 })
}