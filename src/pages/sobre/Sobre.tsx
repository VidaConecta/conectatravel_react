import { useEffect, useState } from 'react'
import {
  CaretLeftIcon,
  CaretRightIcon,
  GithubLogoIcon,
  UsersThreeIcon
} from '@phosphor-icons/react'


const USUARIOS_GITHUB = [
  'Dev-Everly',
  'victorpgms',
  'JoelRamalhoF',
  'SaraCarlenis',
  'Kauedota'
]


interface DadosGithub {
  usuario: string
  nome: string
  urlAvatar: string
  bio: string
  linkPerfil: string
}


function Sobre() {
  const [membros, setMembros] = useState<DadosGithub[]>([])
  const [carregando, setCarregando] = useState(true)
  const [indiceAtual, setIndiceAtual] = useState(0)


  useEffect(() => {
    async function buscarDadosGithub() {
      try {
        const dados = await Promise.all(
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
              bio:
                dadosApi.bio ||
                'Membro da equipe responsável pelo projeto ConectaTravel.',
              linkPerfil: dadosApi.html_url || `https://github.com/${usuario}`
            }
          })
        )


        setMembros(dados)
      } catch (erro) {
        console.error('Erro ao buscar dados do GitHub:', erro)
      } finally {
        setCarregando(false)
      }
    }


    buscarDadosGithub()
  }, [])


  useEffect(() => {
    if (membros.length === 0) {
      return
    }


    const intervalo = setInterval(() => {
      setIndiceAtual((indiceAnterior) => {
        return (indiceAnterior + 1) % membros.length
      })
    }, 4000)


    return () => clearInterval(intervalo)
  }, [membros])


  function mostrarAnterior() {
    setIndiceAtual((indiceAnterior) => {
      return indiceAnterior === 0
        ? membros.length - 1
        : indiceAnterior - 1
    })
  }


  function mostrarProximo() {
    setIndiceAtual((indiceAnterior) => {
      return (indiceAnterior + 1) % membros.length
    })
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


  const membroAtual = membros[indiceAtual]


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
              <UsersThreeIcon
                size={24}
                weight="duotone"
                className="text-[#1689F5]"
              />
            </div>


            <h2 className="mb-2 font-bold text-[#172B4D]">
              Trabalho em equipe
            </h2>


            <p className="text-sm leading-6 text-[#526581]">
              Cada integrante contribui com ideias, código e colaboração para
              transformar o projeto em uma solução útil.
            </p>
          </article>


          <article className="rounded-2xl border border-white/70 bg-white/55 p-5 text-center shadow-[0_18px_50px_rgba(37,99,235,0.12)] backdrop-blur-xl">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-[#7C3AED]/15 bg-[#F0E9FF]/75">
              <GithubLogoIcon
                size={24}
                weight="duotone"
                className="text-[#6D28D9]"
              />
            </div>


            <h2 className="mb-2 font-bold text-[#172B4D]">
              Desenvolvimento aberto
            </h2>


            <p className="text-sm leading-6 text-[#526581]">
              Utilizamos Git e GitHub para organizar o desenvolvimento,
              compartilhar conhecimento e evoluir continuamente.
            </p>
          </article>


          <article className="rounded-2xl border border-white/70 bg-white/55 p-5 text-center shadow-[0_18px_50px_rgba(37,99,235,0.12)] backdrop-blur-xl">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/15 bg-emerald-50/75">
              <span className="text-lg font-black text-emerald-600">+</span>
            </div>


            <h2 className="mb-2 font-bold text-[#172B4D]">
              Impacto positivo
            </h2>


            <p className="text-sm leading-6 text-[#526581]">
              O ConectaTravel nasceu para centralizar informações e tornar a
              gestão de seguros de viagem mais prática e acessível.
            </p>
          </article>
        </section>


        <section className="w-full max-w-md px-5 sm:px-8">
          <div className="relative">
            <div className="absolute -inset-1 rounded-[1.4rem] bg-gradient-to-r from-[#1689F5]/40 via-[#2563EB]/30 to-[#7C3AED]/40 opacity-70 blur-lg" />


            <article className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-7 text-center shadow-[0_20px_60px_rgba(37,99,235,0.16)] backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#7C3AED]" />


              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#60A5FA]/20 blur-2xl" />


              <div className="pointer-events-none absolute -bottom-12 -left-10 h-28 w-28 rounded-full bg-[#A78BFA]/20 blur-2xl" />


              <a
                href={membroAtual.linkPerfil}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-block"
              >
                <div className="rounded-full bg-gradient-to-br from-[#1689F5] via-[#2563EB] to-[#7C3AED] p-1 shadow-lg transition-transform duration-300 hover:scale-105">
                  <img
                    src={membroAtual.urlAvatar}
                    alt={membroAtual.nome}
                    className="h-28 w-28 rounded-full border-4 border-white object-cover"
                  />
                </div>
              </a>


              <h2 className="relative z-10 mt-5 text-xl font-bold text-[#172B4D]">
                {membroAtual.nome}
              </h2>


              <p className="relative z-10 mx-auto mt-2 min-h-12 max-w-xs text-sm font-medium leading-6 text-[#526581]">
                {membroAtual.bio}
              </p>


              <a
                href={membroAtual.linkPerfil}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 mt-5 inline-flex items-center gap-2 rounded-lg border border-[#2563EB]/15 bg-[#EEF5FF]/80 px-4 py-2 text-xs font-semibold text-[#245CB2] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#2563EB]/40 hover:bg-[#E1EDFF] hover:text-[#4C1D95]"
              >
                <GithubLogoIcon size={16} weight="bold" />
                Ver no GitHub @{membroAtual.usuario}
              </a>
            </article>


            <button
              type="button"
              onClick={mostrarAnterior}
              className="absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/70 text-[#526581] shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:border-[#1689F5]/40 hover:bg-[#EAF2FF] hover:text-[#2563EB]"
              aria-label="Mostrar integrante anterior"
            >
              <CaretLeftIcon size={24} weight="bold" />
            </button>


            <button
              type="button"
              onClick={mostrarProximo}
              className="absolute right-0 top-1/2 z-20 flex h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/70 text-[#526581] shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:border-[#7C3AED]/40 hover:bg-[#F3EEFF] hover:text-[#6D28D9]"
              aria-label="Mostrar próximo integrante"
            >
              <CaretRightIcon size={24} weight="bold" />
            </button>
          </div>


          <div className="relative z-10 mt-7 flex justify-center gap-2">
            {membros.map((membro, indice) => (
              <button
                key={membro.usuario}
                type="button"
                onClick={() => setIndiceAtual(indice)}
                aria-label={`Mostrar perfil de ${membro.nome}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  indiceAtual === indice
                    ? 'w-9 bg-gradient-to-r from-[#1689F5] to-[#7C3AED] shadow-[0_2px_8px_rgba(37,99,235,0.35)]'
                    : 'w-2.5 bg-white/80 shadow-sm hover:bg-[#B9D7FF]'
                }`}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}


export default Sobre
