export async function getRepositories() {
  const res = await fetch("https://api.github.com/users/SEU_USERNAME/repos", {
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error("Erro ao buscar repositórios")
  }

  return res.json()
}