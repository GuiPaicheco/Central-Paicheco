export type GitHubRepository = {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics: string[]
  fork: boolean
  archived: boolean
}

const featuredRepositories = new Set([
  "central-paicheco",
  "Comunidade-IFMG",
  "LAST-SECONDS",
  "IFMGames",
  "My-Personal-Terminal",
])

export async function getRepositories() {
  const username = process.env.GITHUB_USERNAME || "GuiPaicheco"
  const url = new URL(`https://api.github.com/users/${username}/repos`)
  url.searchParams.set("per_page", "100")
  url.searchParams.set("sort", "updated")
  url.searchParams.set("direction", "desc")

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const res = await fetch(url, {
    headers,
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error("Erro ao buscar repositórios do GitHub")
  }

  const repositories = (await res.json()) as GitHubRepository[]

  return repositories
    .filter((repo) => !repo.fork && !repo.archived)
    .sort((a, b) => {
      const aFeatured = isFeaturedRepository(a) ? 1 : 0
      const bFeatured = isFeaturedRepository(b) ? 1 : 0
      if (aFeatured !== bFeatured) return bFeatured - aFeatured
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
    })
}

export function isFeaturedRepository(repo: Pick<GitHubRepository, "name" | "topics">) {
  return featuredRepositories.has(repo.name) || repo.topics.includes("featured")
}
