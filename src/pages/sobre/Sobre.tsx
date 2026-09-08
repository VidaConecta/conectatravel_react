import { useEffect, useState } from 'react'
import {
  CaretLeftIcon,
  CaretRightIcon,
  GithubLogoIcon,
  GlobeIcon,
  LinkedinLogoIcon,
  UsersThreeIcon
} from '@phosphor-icons/react'

const USUARIOS_GITHUB = [
  'Dev-Everly',
  'victorpgms',
  'JoelRamalhoF',
  'SaraCarlenis',
  'Kauedota',
  'vitoriaalbuquerqueee'
]

// Mapeamento com os links do LinkedIn de todos os integrantes
const LINKEDIN_LINKS: Record<string, string> = {
  'Dev-Everly': 'https://www.linkedin.com/in/everly-santos/',
  victorpgms: 'https://www.linkedin.com/in/victorpgms/',
  JoelRamalhoF: 'https://www.linkedin.com/in/joel-ramalho-filho/',
  SaraCarlenis: 'https://www.linkedin.com/in/saracarlenis/',
  Kauedota: 'https://www.linkedin.com/in/kaue-dota/',
  vitoriaalbuquerqueee: 'https://www.linkedin.com/in/vitoria-albuqueerque'
}

// Mapeamento com os links do portfólio de todos os integrantes
const PORTFOLIO_LINKS: Record<string, string> = {
  'Dev-Everly': 'https://dev-everly.github.io/portifolio/',
  victorpgms: 'https://victorpgms.github.io/portfolio-vpgms/',
  JoelRamalhoF: 'https://joelramalhof.github.io/portfolio/',
  SaraCarlenis: 'https://saracarlenis.github.io/portfolio/',
  Kauedota: 'https://kauedota.github.io/portfolio/',
  vitoriaalbuquerqueee: 'https://vitoriaalbuquerqueee.github.io/portifolio/'
}

interface DadosGithub {
  usuario: string
  nome: string
  urlAvatar: string
  bio: string
  linkPerfil: string
  linkLinkedin?: string
  linkPortfolio?: string
}

interface Tecnologia {
  nome: string
  categoria: string
  descricao: string
  icone: string
}

const TECNOLOGIAS: Tecnologia[] = [
  {
    nome: 'Java 17',
    categoria: 'BACKEND',
    descricao: 'Linguagem base para construção da API robusta e orientada a objetos.',
    icone: '☕'
  },
  {
    nome: 'Spring Boot',
    categoria: 'BACKEND',
    descricao: 'Framework Java para criação dos endpoints RESTful e regras de negócio.',
    icone: '🍃'
  },
  {
    nome: 'PostgreSQL',
    categoria: 'BANCO DE DADOS',
    descricao: 'Sistema gerenciador de banco de dados relacional para persistência segura.',
    icone: '🐘'
  },
  {
    nome: 'React',
    categoria: 'FRONTEND',
    descricao: 'Biblioteca para construção de interfaces de usuário reativas e componentes.',
    icone: '⚛️'
  },
  {
    nome: 'Tailwind CSS',
    categoria: 'FRONTEND',
    descricao: 'Framework CSS utilitário para estilização rápida, moderna e responsiva.',
    icone: '🎨'
  },
  {
    nome: 'Render',
    categoria: 'DEVOPS / DEPLOY',
    descricao: 'Plataforma em nuvem para hospedagem e deploy da API e do banco de dados.',
    icone: '☁️'
  }
]

function Sobre() {
  const [membros, setMembros] = useState<DadosGithub[]>([])
  const [carregando, setCarregando] = useState(true)
  const [indiceAtual, setIndiceAtual] = useState(0)

  const TAMANHO_GRUPO = 3

  useEffect(() => {
    async function buscarDadosGithub() {
      const resultados = await Promise.allSettled(
        USUARIOS_GITHUB.map(async (usuario) => {
          const resposta = await fetch(
            `https://api.github.com/users/${usuario}`
          )

          if (!resposta.ok) {
            throw new Error(`Não foi possível carregar o usuário ${usuario}.`)
          }

          const dadosApi = await resposta.json()

          return {
            usuario,
            nome: dadosApi.name || usuario,
            urlAvatar:
              dadosApi.avatar_url || 'https://via.placeholder.com/150',
            bio: 'Membro da equipe responsável pelo projeto ConectaTravel.',
            linkPerfil: dadosApi.html_url || `https://github.com/${usuario}`,
            linkLinkedin: LINKEDIN_LINKS[usuario],
            linkPortfolio: PORTFOLIO_LINKS[usuario]
          }
        })
      )

      const dados = resultados.flatMap((resultado) => {
        if (resultado.status === 'fulfilled') {
          return [resultado.value]
        }

        console.error('Erro ao buscar dados do GitHub:', resultado.reason)
        return []
      })

      setMembros(dados)
      setCarregando(false)
    }

    buscarDadosGithub()
  }, [])

  const gruposMembros: DadosGithub[][] = []
  for (let i = 0; i < membros.length; i += TAMANHO_GRUPO) {
    gruposMembros.push(membros.slice(i, i + TAMANHO_GRUPO))
  }

  useEffect(() => {
    if (gruposMembros.length === 0) return

    const intervalo = setInterval(() => {
      setIndiceAtual((indiceAnterior) => (indiceAnterior + 1) % gruposMembros.length)
    }, 5000)

    return () => clearInterval(intervalo)
  }, [gruposMembros.length])

  function mostrarAnterior() {
    setIndiceAtual((indiceAnterior) =>
      indiceAnterior === 0 ? gruposMembros.length - 1 : indiceAnterior - 1
    )
  }

  function mostrarProximo() {
    setIndiceAtual((indiceAnterior) => (indiceAnterior + 1) % gruposMembros.length)
  }

  if (carregando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EDF5FF] px-4 pt-24">
        <div className="rounded-2xl border border-white/70 bg-white/55 px-8 py-6 text-center text-[#526581] shadow-[0_20px_60px_rgba(37,99,235,0.14)] backdrop-blur-xl">
          Carregando equipe...
        </div>
      </main>
    )
  }

  if (membros.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EDF5FF] px-4 pt-24">
        <div className="max-w-md rounded-2xl border border-rose-500/20 bg-rose-50/70 px-8 py-6 text-center text-rose-700 shadow-lg backdrop-blur-xl">
          Não foi possível carregar os integrantes da equipe no momento.
        </div>
      </main>
    )
  }

  const grupoAtual = gruposMembros[indiceAtual] || []

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#EDF5FF] px-4 pb-12 pt-24 sm:px-6 sm:pt-28 md:px-8 md:pb-16">
      <div className="pointer-events-none absolute -left-32 -top-40 h-96 w-96 rounded-full bg-[#1689F5]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#7C3AED]/25 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[#38BDF8]/15 blur-3xl" />

      <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center">
        <header className="mb-8 max-w-2xl text-center md:mb-10">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-9 w-1 rounded-full bg-gradient-to-b from-[#1689F5] to-[#7C3AED]" />
            <h1 className="bg-gradient-to-r from-[#126CC5] via-[#2563EB] to-[#6D28D9] bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
              Sobre nós
            </h1>
          </div>

          <p className="text-sm leading-6 text-[#526581] md:text-base">
            Somos uma equipe de desenvolvedores comprometida em construir uma
            experiência simples, segura e conectada para a gestão de clientes e
            apólices de seguro de viagem.
          </p>
        </header>

        <section className="mb-10 grid w-full max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-white/70 bg-white/55 p-5 text-center shadow-[0_18px_50px_rgba(37,99,235,0.12)] backdrop-blur-xl">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-[#1689F5]/15 bg-[#EAF4FF]/75">
              <UsersThreeIcon size={24} weight="duotone" className="text-[#1689F5]" />
            </div>
            <h2 className="mb-2 font-bold text-[#172B4D]">Trabalho em equipe</h2>
            <p className="text-sm leading-6 text-[#526581]">
              Cada integrante contribui com ideias, código e colaboração para
              transformar o projeto em uma solução útil.
            </p>
          </article>

          <article className="rounded-2xl border border-white/70 bg-white/55 p-5 text-center shadow-[0_18px_50px_rgba(37,99,235,0.12)] backdrop-blur-xl">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-[#7C3AED]/15 bg-[#F0E9FF]/75">
              <GithubLogoIcon size={24} weight="duotone" className="text-[#6D28D9]" />
            </div>
            <h2 className="mb-2 font-bold text-[#172B4D]">Desenvolvimento aberto</h2>
            <p className="text-sm leading-6 text-[#526581]">
              Utilizamos Git e GitHub para organizar o desenvolvimento,
              compartilhar conhecimento e evoluir continuamente.
            </p>
          </article>

          <article className="rounded-2xl border border-white/70 bg-white/55 p-5 text-center shadow-[0_18px_50px_rgba(37,99,235,0.12)] backdrop-blur-xl">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/15 bg-emerald-50/75">
              <span className="text-lg font-black text-emerald-600">+</span>
            </div>
            <h2 className="mb-2 font-bold text-[#172B4D]">Impacto positivo</h2>
            <p className="text-sm leading-6 text-[#526581]">
              O ConectaTravel nasceu para centralizar informações e tornar a
              gestão de seguros de viagem mais prática e acessível.
            </p>
          </article>
        </section>

        <section className="w-full max-w-5xl px-2 sm:px-6">
          <div className="relative">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {grupoAtual.map((membro) => (
                <div key={membro.usuario} className="relative flex flex-col">
                  <div className="absolute -inset-1 rounded-[1.4rem] bg-gradient-to-r from-[#1689F5]/40 via-[#2563EB]/30 to-[#7C3AED]/40 opacity-70 blur-lg" />

                  <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 text-center shadow-[0_20px_60px_rgba(37,99,235,0.16)] backdrop-blur-xl">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#7C3AED]" />

                    <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#60A5FA]/20 blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-12 -left-10 h-24 w-24 rounded-full bg-[#A78BFA]/20 blur-2xl" />

                    <div className="flex flex-col items-center">
                      <a
                        href={membro.linkPerfil}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 inline-block"
                      >
                        <div className="rounded-full bg-gradient-to-br from-[#1689F5] via-[#2563EB] to-[#7C3AED] p-1 shadow-lg transition-transform duration-300 hover:scale-105">
                          <img
                            src={membro.urlAvatar}
                            alt={membro.nome}
                            className="h-24 w-24 rounded-full border-4 border-white object-cover"
                          />
                        </div>
                      </a>

                      <h2 className="relative z-10 mt-4 text-lg font-bold text-[#172B4D]">
                        {membro.nome}
                      </h2>

                      <p className="relative z-10 mx-auto mt-2 min-h-12 max-w-xs text-xs font-medium leading-5 text-[#526581]">
                        {membro.bio}
                      </p>
                    </div>

                    <div className="relative z-10 mt-5 flex flex-wrap justify-center gap-2">
                      <a
                        href={membro.linkPerfil}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#2563EB]/15 bg-[#EEF5FF]/80 px-3 py-1.5 text-xs font-semibold text-[#245CB2] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#2563EB]/40 hover:bg-[#E1EDFF] hover:text-[#4C1D95]"
                      >
                        <GithubLogoIcon size={16} weight="bold" />
                        GitHub
                      </a>

                      {membro.linkLinkedin && (
                        <a
                          href={membro.linkLinkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#0A66C2]/20 bg-[#0A66C2]/10 px-3 py-1.5 text-xs font-semibold text-[#0A66C2] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#0A66C2]/20"
                        >
                          <LinkedinLogoIcon size={16} weight="bold" />
                          LinkedIn
                        </a>
                      )}

                      {membro.linkPortfolio && (
                        <a
                          href={membro.linkPortfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#7C3AED]/20 bg-[#7C3AED]/10 px-3 py-1.5 text-xs font-semibold text-[#6D28D9] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#7C3AED]/20"
                        >
                          <GlobeIcon size={16} weight="bold" />
                          Portfólio
                        </a>
                      )}
                    </div>
                  </article>
                </div>
              ))}
            </div>

            {gruposMembros.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={mostrarAnterior}
                  className="absolute -left-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/70 text-[#526581] shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:border-[#1689F5]/40 hover:bg-[#EAF2FF] hover:text-[#2563EB]"
                  aria-label="Mostrar grupo anterior"
                >
                  <CaretLeftIcon size={24} weight="bold" />
                </button>

                <button
                  type="button"
                  onClick={mostrarProximo}
                  className="absolute -right-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/70 text-[#526581] shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:border-[#7C3AED]/40 hover:bg-[#F3EEFF] hover:text-[#6D28D9]"
                  aria-label="Mostrar próximo grupo"
                >
                  <CaretRightIcon size={24} weight="bold" />
                </button>
              </>
            )}
          </div>

          {gruposMembros.length > 1 && (
            <div className="relative z-10 mt-7 flex justify-center gap-2">
              {gruposMembros.map((_, indice) => (
                <button
                  key={indice}
                  type="button"
                  onClick={() => setIndiceAtual(indice)}
                  aria-label={`Ir para a página ${indice + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    indiceAtual === indice
                      ? 'w-9 bg-gradient-to-r from-[#1689F5] to-[#7C3AED] shadow-[0_2px_8px_rgba(37,99,235,0.35)]'
                      : 'w-2.5 bg-white/80 shadow-sm hover:bg-[#B9D7FF]'
                  }`}
                />
              ))}
            </div>
          )}
        </section>

        {/* Nova Seção: Stack Tecnológica */}
        <section className="mt-12 w-full max-w-5xl rounded-2xl border border-white/70 bg-white/55 p-6 shadow-[0_18px_50px_rgba(37,99,235,0.12)] backdrop-blur-xl md:p-8">
          <div className="mb-6 flex flex-col items-start justify-between gap-2 border-b border-slate-200/60 pb-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold text-[#172B4D]">Stack Tecnológica</h2>
              <p className="text-xs text-[#526581]">Ferramentas e arquitetura utilizadas na aplicação</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Bloco 2 & 3 • Generation Brasil
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TECNOLOGIAS.map((tech, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-white/80 bg-white/70 p-4 shadow-sm"
              >
                <span className="rounded-lg bg-slate-50 p-2 text-2xl">{tech.icone}</span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#172B4D]">{tech.nome}</h3>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-slate-500">
                      {tech.categoria}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#526581]">{tech.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </section>
    </main>
  )
}

export default Sobre