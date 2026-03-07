import { NextResponse } from "next/server"
import ytdl from "ytdl-core"
import ffmpeg from "fluent-ffmpeg"
import ffmpegPath from "ffmpeg-static"
import { PassThrough } from "stream"

ffmpeg.setFfmpegPath(ffmpegPath as any)

export async function GET(request: Request) {
  const url = request.nextUrl.searchParams.get("url")
  const type = request.nextUrl.searchParams.get("type") // audio ou vídeo se der tudo certo AKAKKAKAKAK

  const stream = ytdl(url as string, { quality: "highest" })
  const pass = new PassThrough()

  if (type === "audio") {
    return new Promise<NextResponse>((resolve) => {
      const buffers: Uint8Array[] = []
      ffmpeg(stream)
        .noVideo()
        .format("mp3")
        .pipe(pass)

      pass.on("data", (chunk) => buffers.push(chunk))
      pass.on("end", () => {
        const blob = Buffer.concat(buffers)
        resolve(
          NextResponse.json(
            { file: `data:audio/mp3;base64,${blob.toString("base64")}` },
            { status: 200 }
          )
        )
      })
    })
  }

  return NextResponse.json({ error: "Tipo inválido" }, { status: 400 })
}