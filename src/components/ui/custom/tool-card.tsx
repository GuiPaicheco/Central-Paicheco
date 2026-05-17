"use client"

import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"

interface ToolCardProps {
  title: string
  description: string
  href: string
  icon?: LucideIcon
  badge?: string
}

export function ToolCard({ title, description, href, icon: Icon, badge }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group block h-full rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-emerald-500/50 hover:bg-zinc-900"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        {Icon && (
          <div className="flex size-10 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-300">
            <Icon size={20} />
          </div>
        )}
        {badge && (
          <span className="rounded-full border border-zinc-700 px-2 py-1 text-xs text-zinc-400">
            {badge}
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
      <p className="mt-2 min-h-12 text-sm leading-relaxed text-zinc-400">
        {description}
      </p>

      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 transition group-hover:text-emerald-200">
        Abrir <ArrowRight size={14} />
      </span>
    </Link>
  )
}
