import { Container } from "@/components/layout/container"
import { Hero } from "@/components/sections/hero"
import { AnimatedCard } from "@/components/ui/custom/animated-card"
import { Reveal } from "@/components/ui/reveal"
import { SocialCard } from "@/components/ui/custom/social-card"

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaSpotify,
  FaSteam,
  FaXbox,
  FaSnapchatGhost,
  FaGraduationCap,
} from "react-icons/fa"

export default function Home() {
  return (
    <Container>

      {/* HERO */}
      <Reveal>
        <Hero />
      </Reveal>

      {/* TRAJETÓRIA */}
      <section className="mt-28 space-y-6 max-w-3xl">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-semibold text-emerald-500">
            Trajetória
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-zinc-300 leading-relaxed">
            Guilherme Paicheco Ferreira nasceu em 22 de fevereiro de 2007, às 04:52 da manhã, no Hospital Sofia Feldman, localizado no Distrito de Venda Nova, em Belo Horizonte. Filho de Cleonice Gomes Ferreira e Josiel Junio Mariano Martins Paicheco, Guilherme passou seus primeiros 12 anos como filho único, até o nascimento de sua irmã Geovana Paicheco Ferreira em 1º de março de 2019. Desde cedo, teve a companhia próxima de sua prima Sofia, com quem sempre compartilhou momentos de brincadeira e aventuras, garantindo que nunca se sentisse realmente só, mesmo nos períodos de mudanças constantes de residência.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-zinc-300 leading-relaxed">
            Sua infância foi marcada por uma vida movimentada e por adaptações a novos ambientes. Com três anos, iniciou a pré-escola no Instituto Educacional União Feliz, em Ibirité, mas logo se mudou para o bairro Milionários, em Belo Horizonte, onde entrou no Centro Educacional Arca de Noé e completou o segundo ano da pré-escola. Nos anos seguintes, cursou o primeiro ao quinto ano na Escola Estadual Doutor José do Patrocínio Da Silva Pontes e, posteriormente, fez o sexto ano no Colégio Master, uma escola particular. No sétimo ano, estudou na Escola Estadual Celso Machado até se mudar novamente para Ibirité, onde ingressou na Escola Municipal Professora Carmelita Carvalho Garcia – CAIC, enfrentando desafios causados pela pandemia da Covid-19, que interrompeu temporariamente seus estudos e adiou sua formatura do nono ano.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-zinc-300 leading-relaxed">
            Durante toda a infância e adolescência, Guilherme demonstrou grande curiosidade e paixão pelo conhecimento. Desde pequeno, era fascinado por Astronomia, sempre intrigado pelo vasto universo, mas com pé firme na ciência real e comprovada. Brincadeiras com a família e a prima incluíam corridas, mistura de terra e plantas em copinhos imaginando poções, passeios e longas conversas com os cachorros, além de jogos e vídeos de Minecraft. Já na infância, suas experiências com tecnologia se destacavam: explorava jogos e arquivos digitais, aprendendo sozinho a manipular HTML, criar mods e desenvolver projetos, habilidades que mais tarde dariam base para sua carreira acadêmica e profissional.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="text-zinc-300 leading-relaxed">
            Guilherme sempre valorizou os professores como referências fundamentais em sua vida. Desde os primeiros anos escolares, sentiu apego por educadores que incentivavam seu aprendizado e curiosidade. Entre os mais influentes, destacam-se professores como Marcelo Conrado, Andreia, Sidão, Adelaide Anjos, Laine Rodrigues, Josyane Oliveira, Isadora, Cássia, Sebastião, Magno, Diogo, Weber, Walisson, Dante, Vladmir, Luciana Emirena, Robert, Pedro Ramos, Efrem, Elizângela, Carlos, Jackson, Fernando, Luiz Carlos, Felipe, Deberton e Thiago. Cada um deles, em diferentes momentos, contribuiu para seu desenvolvimento intelectual, pessoal e social, moldando o estudante dedicado e autodidata que Guilherme se tornou.
          </p>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="text-zinc-300 leading-relaxed">
            Sua trajetória educacional seguiu para o Ensino Médio na Escola Estadual Antônio Marinho Campos, onde, paralelamente, ingressou no curso técnico de Mecatrônica no IFMG – Campus Ibirité, tornando-se representante de turma. Durante o técnico, participou de projetos marcantes, como a criação de um carrinho seguidor de linha com Arduino, enfrentando desafios práticos como a queima de componentes eletrônicos, experiência que fortaleceu seu aprendizado e resiliência. Para complementar sua formação, realizou cursos de Web Designer e Criação de Games na MettaX, consolidando habilidades que hoje se conectam diretamente com sua atuação acadêmica e profissional.
          </p>
        </Reveal>
        <Reveal delay={0.6}>
          <p className="text-zinc-300 leading-relaxed">
            Em 2023, Guilherme realizou o concurso da Defensoria Pública de Minas Gerais e foi aprovado como Técnico da Defensoria, e, em 2024, passou no concurso de Oficial de Apoio à Saúde da Prefeitura de Betim. Esses resultados refletem sua disciplina, foco e capacidade de aprendizado rápido, características que ele desenvolveu desde a infância. Em 2025, concluiu seu curso técnico no IFMG e iniciou o curso superior em Ciência da Computação na mesma instituição, reforçando seu vínculo com o campus e com os projetos que sempre sonhou colocar em prática. Posteriormente, iniciou outro curso superior em Análise e Desenvolvimento de Sistemas, buscando complementar e expandir ainda mais seus conhecimentos em tecnologia.
          </p>
        </Reveal>
        <Reveal delay={0.7}>
          <p className="text-zinc-300 leading-relaxed">
            Ao longo de sua vida, Guilherme demonstrou habilidades notáveis como autodidata, memória excepcional, curiosidade, foco e resiliência. Sempre valorizou amizades e conexões humanas, mantendo uma vida social ativa e saudável, equilibrando estudos, hobbies e esportes, como vôlei, xadrez e, ocasionalmente, futebol.
          </p>
        </Reveal>
        <Reveal delay={0.8}>
          <p className="text-zinc-300 leading-relaxed">
            A vida de Guilherme é marcada por determinação, aprendizado contínuo e paixão pelo conhecimento. Ele mantém metas claras: alcançar estabilidade profissional na área de tecnologia, conquistar sua própria vida e viver em harmonia, ao mesmo tempo que continua explorando, aprendendo e deixando um legado acadêmico e pessoal. Desde os primeiros dias em Ibirité até os desafios da universidade e concursos públicos, Guilherme construiu uma trajetória sólida, fundamentada na educação, curiosidade científica e resiliência, moldando-se como um jovem notável, pronto para novas conquistas e experiências.
          </p>
        </Reveal>

        {/*<Reveal delay={0.2}>
          <p className="text-zinc-400 leading-relaxed">
            Paralelamente, curso Análise e Desenvolvimento de Sistemas e atuei como
            representante de turma tanto na formação técnica quanto na graduação.
            Fui reconhecido com o prêmio de Destaque Acadêmico e obtive aprovação
            em dois concursos públicos, tornando-me servidor público efetivo ainda
            na juventude.
          </p>
        </Reveal>*/}
      </section>

      {/* DIFERENCIAIS */}
      <section className="mt-24">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-semibold text-emerald-500 mb-10">
            Diferenciais
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          <Reveal>
            <AnimatedCard
              title="Formação Técnica + Acadêmica"
              description="Base sólida em Mecatrônica aliada à graduação em Ciência da Computação e ADS."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <AnimatedCard
              title="Aprovações em Concursos"
              description="Servidor público efetivo e aprovado anteriormente na Defensoria Pública de MG."
            />
          </Reveal>

          <Reveal delay={0.2}>
            <AnimatedCard
              title="Produção Científica"
              description="Autor de artigo sobre Inteligência Artificial e participação ativa em eventos acadêmicos."
            />
          </Reveal>
        </div>
      </section>

      {/* ATUAÇÃO ATUAL */}
      <section className="mt-24 max-w-3xl space-y-6">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-semibold text-emerald-500">
            Atuação Atual
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-zinc-300 leading-relaxed">
            Atualmente atuo com desenvolvimento Full Stack, trabalhando com
            aplicações Web, banco de dados, integrações e experimentações
            em Machine Learning e Inteligência Artificial.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-zinc-400 leading-relaxed">
            Busco consolidar uma base técnica robusta aliada à aplicação prática,
            unindo disciplina acadêmica, experiência institucional e desenvolvimento
            tecnológico.
          </p>
        </Reveal>
      </section>

      {/* DIVISOR SUTIL */}
      <div className="mt-28 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      {/* PRESENÇA DIGITAL */}
      <section className="mt-32 mb-40">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-semibold text-emerald-500 mb-12">
            Presença Digital
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          <Reveal>
            <SocialCard
              href="https://github.com/GuiPaicheco"
              icon={<FaGithub size={22} />}
              name="GitHub"
              username="GuiPaicheco"
            />
          </Reveal>

          <Reveal delay={0.05}>
            <SocialCard
              href="https://linkedin.com/in/paicheco"
              icon={<FaLinkedin size={22} />}
              name="LinkedIn"
              username="Paicheco"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <SocialCard
              href="http://lattes.cnpq.br/6608497316959234"
              icon={<FaGraduationCap size={22} />}
              name="Lattes"
              username="Paicheco"
            />
          </Reveal>

          <Reveal delay={0.15}>
            <SocialCard
              href="https://wa.me/+5531992518002"
              icon={<FaWhatsapp size={22} />}
              name="WhatsApp"
              username="Paicheco"
            />
          </Reveal>

          <Reveal delay={0.2}>
            <SocialCard
              href="https://www.instagram.com/u92_.gu1._au79/"
              icon={<FaInstagram size={22} />}
              name="Instagram"
              username="u92_.gu1._au79"
            />
          </Reveal>

          <Reveal delay={0.25}>
            <SocialCard
              href="https://open.spotify.com/user/31zqe6nv62bph6px76jwz5gyl5em"
              icon={<FaSpotify size={22} />}
              name="Spotify"
              username="GU1LH3RM3__"
            />
          </Reveal>

          <Reveal delay={0.3}>
            <SocialCard
              href="https://steamcommunity.com/profiles/76561198882947049/"
              icon={<FaSteam size={22} />}
              name="Steam"
              username="GU1LH3RM3"
            />
          </Reveal>

          <Reveal delay={0.35}>
            <SocialCard
              href="https://www.xbox.com/pt-BR/play/user/Paichequinho"
              icon={<FaXbox size={22} />}
              name="Xbox"
              username="Paichequinho"
            />
          </Reveal>

          {/* Não sei pegar a bomba do meu perfil do snapchat
          <Reveal delay={0.4}>
            <SocialCard
              href="#"
              icon={<FaSnapchatGhost size={22} />}
              name="Snapchat"
              username="Paicheco"
            />
          </Reveal>
          */}
        </div>
      </section>

    </Container>
  )
}