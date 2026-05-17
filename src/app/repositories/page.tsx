import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/ui/reveal"
import { RepositoryCard } from "@/components/ui/custom/repository-card"
import { getRepositories, isFeaturedRepository } from "@/lib/github"

export const metadata = {
  title: "Projetos",
}

export default async function RepositoriesPage() {
  const repositories = await getRepositories()
  const featuredCount = repositories.filter(isFeaturedRepository).length

  return (
    <Container>
      <section className="mt-24 mb-32 space-y-10">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
              GitHub automático
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-zinc-100 md:text-4xl">
              Projetos públicos atualizados direto do GitHub.
            </h1>
            <p className="mt-4 text-zinc-400">
              A lista é atualizada automaticamente, priorizando projetos em
              destaque e repositórios modificados recentemente.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <p className="text-2xl font-semibold text-emerald-400">
                {repositories.length}
              </p>
              <p className="text-sm text-zinc-500">repositórios públicos</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <p className="text-2xl font-semibold text-emerald-400">
                {featuredCount}
              </p>
              <p className="text-sm text-zinc-500">projetos em destaque</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <p className="text-2xl font-semibold text-emerald-400">1h</p>
              <p className="text-sm text-zinc-500">cache de atualização</p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {repositories.map((repository, index) => (
            <Reveal key={repository.id} delay={Math.min(index * 0.03, 0.25)}>
              <RepositoryCard
                repository={repository}
                featured={isFeaturedRepository(repository)}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </Container>
  )
}
