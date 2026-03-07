"use client"

import { useState } from "react"
import QRCode from "qrcode"
import { Reveal } from "@/components/ui/reveal"
import { Container } from "@/components/layout/container"

export default function QRCodePage() {
  const [text, setText] = useState("")
  const [qr, setQr] = useState("")

  const generateQr = async () => {
    try {
      const url = await QRCode.toDataURL(text)
      setQr(url)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container>
      <section className="mt-28 mb-32 space-y-8 max-w-xl">
        <Reveal>
          <h1 className="text-3xl md:text-4xl font-semibold text-emerald-500">
            QR Code Generator
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite o texto ou link"
            className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-foreground focus:outline-emerald-500"
          />
        </Reveal>

        <Reveal delay={0.2}>
          <button
            onClick={generateQr}
            className="px-6 py-3 rounded-lg bg-emerald-500 text-black font-medium hover:opacity-90 transition"
          >
            Gerar QR
          </button>
        </Reveal>

        {qr && (
          <Reveal delay={0.3}>
            <div className="mt-6 flex flex-col items-center gap-4">
              <img src={qr} alt="QR Code" className="border border-emerald-500 rounded-xl"/>
              <a
                href={qr}
                download="qrcode.png"
                className="px-4 py-2 bg-emerald-500 text-black rounded-lg hover:opacity-90 transition"
              >
                Baixar PNG
              </a>
            </div>
          </Reveal>
        )}
      </section>
    </Container>
  )
}