import Image from "next/image"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/ui/reveal"

export const metadata = {
  title: "Sobre",
}

export default function AboutPage() {
  return (
    <Container>
      <section className="mt-24 mb-32 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="space-y-5">
            <div className="relative aspect-square max-w-sm overflow-hidden rounded-lg border border-emerald-500/30">
              <Image
                src="/Paicheco.jpg"
                alt="Guilherme Paicheco Ferreira"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
                Sobre
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-zinc-100">
                Guilherme Paicheco Ferreira
              </h1>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-6 text-zinc-300">
            <p className="leading-relaxed">
              Estudante de Ciência da Computação no IFMG Campus Ibirité,
              técnico em Mecatrônica e servidor público efetivo em Betim.
              A Central Paicheco nasceu como hub pessoal, mas evolui agora para
              uma ferramenta pública com utilidades, projetos e experimentos.
            </p>
            <p className="leading-relaxed text-zinc-400">
              Minha trajetória combina formação técnica, desenvolvimento web,
              automação, curiosidade por inteligência artificial e interesse por
              soluções que pessoas consigam usar sem complicação.
            </p>
            <p className="leading-relaxed text-zinc-400">
              A história completa fica em segundo plano porque o foco principal
              da Central é ser útil. Esta página existe para contextualizar quem
              constrói, mantém e experimenta as ferramentas.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {["Full Stack", "Mecatrônica", "IA e automação"].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 text-sm text-zinc-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </Container>
  )
}
