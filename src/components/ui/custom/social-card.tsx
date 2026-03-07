"use client"

import Link from "next/link"
import { motion } from "framer-motion"

interface SocialCardProps {
  href: string
  icon: React.ReactNode
  name: string
  username: string
}

export function SocialCard({
  href,
  icon,
  name,
  username,
}: SocialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="w-full"
    >
      <Link
        href={href}
        target="_blank"
        className="
          relative flex items-center gap-4
          w-full
          rounded-2xl
          border border-zinc-800
          bg-zinc-900/60
          p-5
          transition-all duration-300
          hover:border-emerald-500/40
          hover:bg-zinc-900
        "
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.08),_transparent_70%)]" />
        </div>

        {/* Ícone */}
        <div className="text-zinc-400 transition-colors duration-300 group-hover:text-emerald-500">
          {icon}
        </div>

        {/* Texto */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-zinc-200">
            {name}
          </span>
          <span className="text-xs text-zinc-500">
            @{username}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}