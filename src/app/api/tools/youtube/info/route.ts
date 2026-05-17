import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { url } = await req.json().catch(() => ({ url: "" }))
  const videoId = extractYouTubeId(String(url || ""))

  if (!videoId) {
    return NextResponse.json(
      { error: "Envie uma URL válida do YouTube." },
      { status: 400 }
    )
  }

  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`
  const oembed = new URL("https://www.youtube.com/oembed")
  oembed.searchParams.set("url", watchUrl)
  oembed.searchParams.set("format", "json")

  const response = await fetch(oembed, { next: { revalidate: 3600 } })

  if (!response.ok) {
    return NextResponse.json(
      { error: "Vídeo indisponível ou sem metadata pública." },
      { status: 404 }
    )
  }

  const data = await response.json()

  return NextResponse.json({
    videoId,
    title: data.title,
    authorName: data.author_name,
    authorUrl: data.author_url,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
    watchUrl,
  })
}

function extractYouTubeId(value: string) {
  try {
    const url = new URL(value)

    if (url.hostname === "youtu.be") {
      return url.pathname.slice(1) || null
    }

    if (url.hostname.includes("youtube.com")) {
      if (url.pathname.startsWith("/shorts/")) {
        return url.pathname.split("/")[2] || null
      }

      if (url.pathname.startsWith("/embed/")) {
        return url.pathname.split("/")[2] || null
      }

      return url.searchParams.get("v")
    }
  } catch {
    return null
  }

  return null
}
