import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/ui/reveal"
import { RepositoryCard } from "@/components/ui/custom/repository-card"

export default function RepositoriesPage() {
  return (
    <Container>
      <section className="mt-28 mb-32 space-y-12">
        <Reveal>
          <h1 className="text-3xl md:text-4xl font-semibold text-emerald-500">
            Repositórios
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-zinc-400 max-w-2xl">
            Projetos públicos que demonstram minha evolução técnica,
            organização de código e aplicação prática de conceitos.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <RepositoryCard
            name="Central-Paicheco"
            description="Meu hub pessoal desenvolvido em Next.js com animações modernas e layout responsivo."
            language="TypeScript"
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />

          <RepositoryCard
            name="My-Personal-Terminal"
            description="Meu teminal pessoal. Estava sendo desenvolvido pensando em requisições simples com foco em uma estilização linux."
            language="JavaScript"
            url="https://guipaicheco.github.io/My-Personal-Terminal/"
          />

          <RepositoryCard
            name="Comunidade-IFMG"
            description='Este é um projeto criado pelos alunos "Guilherme Paicheco Ferreira" e "Arthur Heringe Gonçalves". Projeto este, da disciplina de "Trabalho Interdisciplinar I: Extensão em Front-End" no IFMG Campus Ibirité.'
            language="Python"
            url="https://guipaicheco.github.io/Comunidade-IFMG/index.html"
          />

          <RepositoryCard
            name="Last-Seconds (beta)"
            description="Projeto desenvolvido para apresentação em oficina de desenvolvimento de jogos. Houveram updates constantes em tempo real a pedidos em meio a oficina."
            language="JavaScript"
            url="https://guipaicheco.github.io/LAST-SECONDS/"
          />

          <RepositoryCard
            name="IFMGames"
            description="This is a collection of games maded by 3 simple guys from Science Computing in IFMG - Campus Ibirité."
            language="JavaScript"
            url="https://guipaicheco.github.io/IFMGames/"
          />

          <RepositoryCard
            name="Sistema de Gestão de Pacientes (Privado)"
            description="Sistema de Gestão para Pacientes de clínica psicóloga desenvolvida para cliente. Está funcional e é privada. Entre em contato comigo para visualização."
            language="TypeScript"
            url="#"
          />

          <RepositoryCard
            name="Sudoku-Autocomplete"
            description="Backtracking para resolução de sudoku desenvolvido em JavaScript como solução alternativa para aula de Programação Orientada a Objetos."
            language="JavaScript"
            url="https://guipaicheco.github.io/Sudoku-Autocomplete/"
          />

          <RepositoryCard
            name="Codificação e Decodificação"
            description="Página feita em razão de aula com temática de codificação. Faremos a decodificação em breve como extra!"
            language="JavaScript"
            url="https://guipaicheco.github.io/Codificar-e-Decodificar-Mensagem/index.html"
          />

          <RepositoryCard
            name="Currículo-Digital (antigo)"
            description="Currículo digital em uma das suas primeiras versões. Foi substituído pelo site atual."
            language="HTML"
            url="https://guipaicheco.github.io/Meu-Curriculo-Digital/Paicheco.html"
          />

          <RepositoryCard
            name="To-do-List"
            description="This is a simple to-do-list maded only with HTML/CSS/JS."
            language="HTML"
            url="https://guipaicheco.github.io/Simple-To-Do-List-in-WEB/"
          />

          <RepositoryCard
            name="Exercícios em HTML"
            description="Essas foram algumas das resoluções de exercícios dados em aula sobre web."
            language="HTML"
            url="https://guipaicheco.github.io/Calculadora-Arquivos-C/exercicios.html"
          />
        </div>
      </section>
    </Container>
  )
}