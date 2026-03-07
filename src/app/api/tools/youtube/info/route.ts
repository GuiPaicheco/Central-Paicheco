import { NextResponse } from "next/server"
import ytdl from "ytdl-core"

export async function GET(request: Request) {
  const url = request.nextUrl.searchParams.get("url")
  if (!url) throw new Error("URL é obrigatória")

  const info = await ytdl.getBasicInfo(url)
  return NextResponse.json(info.videoDetails)
}