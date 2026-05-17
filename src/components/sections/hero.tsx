"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Github, Wrench } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex min-h-[78vh] items-center py-16">
      <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-400"
          >
            Central Paicheco
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-5xl md:text-6xl"
          >
            Ferramentas úteis, projetos reais e experimentos digitais em um só lugar.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            Um hub público para gerar QR Codes, manipular arquivos, consultar
            projetos do GitHub e testar utilidades criadas com foco em produtividade.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500 px-5 py-3 font-medium text-black transition hover:bg-emerald-400"
            >
              Explorar ferramentas <ArrowRight size={18} />
            </Link>
            <Link
              href="/repositories"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-500/40 px-5 py-3 font-medium text-emerald-300 transition hover:bg-emerald-500/10"
            >
              Ver projetos <Github size={18} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-5"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-md bg-emerald-500 text-black">
              <Wrench size={20} />
            </div>
            <div>
              <p className="font-medium text-zinc-100">Kit público inicial</p>
              <p className="text-sm text-zinc-500">rápido, leve e direto no navegador</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              "QR Code com PNG, SVG, cores e margem",
              "PDF a partir de múltiplas imagens",
              "Remoção de fundo com login e limite de uso",
              "YouTube seguro: metadata, thumbnail e timestamps",
            ].map((item) => (
              <div
                key={item}
                className="rounded-md border border-zinc-800 bg-black/40 px-4 py-3 text-sm text-zinc-300"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
