"use client"

import Link from "next/link"
import { motion } from "framer-motion"

interface RepositoryCardProps {
  name: string
  description: string
  language: string
  url: string
}

export function RepositoryCard({
  name,
  description,
  language,
  url,
}: RepositoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="w-full"
    >
      <Link
        href={url}
        target="_blank"
        className="
          relative flex flex-col gap-4
          rounded-2xl
          border border-zinc-800
          bg-zinc-900/60
          p-6
          transition-all duration-300
          hover:border-emerald-500/40
          hover:bg-zinc-900
        "
      >
        <div>
          <h3 className="text-lg font-semibold text-zinc-200">
            {name}
          </h3>

          <p className="text-sm text-zinc-400 mt-2">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {language}
          </span>

          <span className="text-xs text-zinc-500">
            Ver no GitHub →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}