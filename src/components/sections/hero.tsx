"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center">
      <div className="grid w-full items-center gap-12 md:grid-cols-2">

        {/* TEXTO */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight"
          >
            <span className="text-emerald-500">
              Guilherme Paicheco Ferreira
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed"
          >
            Estudante de Ciência da Computação no IFMG - Campus Ibirité, técnico em Mecatrônica
            e servidor público efetivo em Betim. Construindo uma trajetória acadêmica,
            institucional e tecnológica desde cedo, com foco em desenvolvimento
            Full Stack e Inteligência Artificial.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/repositories"
              className="rounded-lg bg-emerald-500 px-6 py-3 font-medium text-black transition hover:opacity-90 text-center"
            >
              Ver Projetos
            </Link>

            <Link
              href="/tools"
              className="rounded-lg border border-emerald-500/40 px-6 py-3 font-medium text-emerald-500 transition hover:bg-emerald-500/10 text-center"
            >
              Minhas Ferramentas
            </Link>
          </motion.div>
        </div>

        {/* FOTO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative mx-auto md:mx-0 w-64 h-64 sm:w-72 sm:h-72"
        >
          <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 blur-2xl" />

          <Image
            src="/Paicheco.jpg"
            alt="Guilherme Paicheco Ferreira"
            fill
            className="relative rounded-2xl object-cover border border-emerald-500/30 shadow-xl"
            priority
          />
        </motion.div>

      </div>
      {/* Scroll Indicator */}
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
        <span className="text-xs tracking-widest text-zinc-500 uppercase">
            Role para explorar
        </span>

        <div className="relative h-12 w-[2px] bg-zinc-800 overflow-hidden">
            <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "linear",
            }}
            className="absolute top-0 h-6 w-full bg-emerald-500"
            />
        </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-black pointer-events-none" />
    </section>
  )
}