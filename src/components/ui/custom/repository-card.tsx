"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, GitFork, Star } from "lucide-react"
import type { GitHubRepository } from "@/lib/github"

interface RepositoryCardProps {
  repository: GitHubRepository
  featured?: boolean
}

const formatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})

export function RepositoryCard({ repository, featured }: RepositoryCardProps) {
  const targetUrl = repository.homepage || repository.html_url

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="h-full"
    >
      <div className="flex h-full flex-col rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-emerald-500/40 hover:bg-zinc-900">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-zinc-100">
                {repository.name}
              </h3>
              {featured && (
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
                  destaque
                </span>
              )}
            </div>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-400">
              {repository.description || "Projeto público no GitHub."}
            </p>
          </div>
        </div>

        {repository.topics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {repository.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-5">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
            <span>{repository.language || "Sem linguagem"}</span>
            <span className="inline-flex items-center gap-1">
              <Star size={13} /> {repository.stargazers_count}
            </span>
            <span className="inline-flex items-center gap-1">
              <GitFork size={13} /> {repository.forks_count}
            </span>
            <span>Atualizado em {formatter.format(new Date(repository.updated_at))}</span>
          </div>

          <div className="flex gap-3">
            <Link
              href={repository.html_url}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:border-emerald-500/60 hover:text-emerald-300"
            >
              GitHub <ExternalLink size={14} />
            </Link>
            {repository.homepage && (
              <Link
                href={targetUrl}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-black transition hover:bg-emerald-400"
              >
                Abrir <ExternalLink size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
