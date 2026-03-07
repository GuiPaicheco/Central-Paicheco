import "./globals.css"
import type { Metadata } from "next"
import { Navbar } from "@/components/layout/navbar"
import { PageTransition } from "@/components/layout/page-transition"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { CustomCursor } from "@/components/ui/custom-cursor"

export const metadata: Metadata = {
  title: {
    default: "Central - Paicheco",
    template: "%s | Central - Paicheco",
  },
  description: "Hub pessoal acadêmico e profissional",
  metadataBase: new URL("https://central-paicheco.vercel.app"), // se Deus quiser que vai ficar assim
  openGraph: {
    title: "Central - Paicheco",
    description: "Hub pessoal acadêmico e profissional",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-black text-zinc-100 antialiased overflow-x-hidden">

        {/* Fundo sólido */}
        <div className="fixed inset-0 -z-50 bg-black" />

        {/* Grid sutil (mais discreto que antes) */}
        <div
          className="pointer-events-none fixed inset-0 -z-40
          bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)]
          bg-[size:80px_80px]"
        />

        <Navbar />
        <ScrollProgress />
        <CustomCursor />

        <main className="pt-16 min-h-screen">
          <PageTransition>
            {children}
          </PageTransition>
        </main>

      </body>
    </html>
  )
}