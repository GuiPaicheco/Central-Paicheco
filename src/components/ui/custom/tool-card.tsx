"use client"

import Link from "next/link"

interface ToolCardProps {
  title: string
  description: string
  href: string
}

export function ToolCard({ title, description, href }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="block p-6 rounded-2xl border border-zinc-800 hover:border-emerald-500 transition bg-zinc-900 hover:bg-zinc-800"
    >
      <h3 className="text-xl font-semibold text-emerald-500 mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm">{description}</p>
    </Link>
  )
}