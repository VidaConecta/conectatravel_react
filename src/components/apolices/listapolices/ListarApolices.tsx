import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import type Apolice from '../../../models/Apolice';
import { apoliceService } from '../../../services/Apolice';
import CardApolices from '../cardapolices/CardApolices';
import { PlusIcon, AirplaneInFlightIcon } from '@phosphor-icons/react';

function ListarApolices() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apolices, setApolices] = useState<Apolice[]>([]);

  useEffect(() => {
    buscarApolices();
  }, [apolices.length]);

  async function buscarApolices() {
    try {
      setIsLoading(true);
      const dados = await apoliceService.listarTodos();
      setApolices(dados);
    } catch (error) {
      alert('Erro ao buscar apólices.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#EDF5FF] px-4 pb-12 pt-24 sm:px-6 sm:pt-28 lg:px-16">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#1689F5]/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-36 -right-32 h-96 w-96 rounded-full bg-[#7C3AED]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-9 w-1 rounded-full bg-gradient-to-b from-[#1689F5] to-[#7C3AED]" />

            <h1 className="bg-gradient-to-r from-[#126CC5] via-[#2563EB] to-[#6D28D9] bg-clip-text text-3xl font-bold tracking-tight text-transparent">
              Apólices
            </h1>
          </div>

          <p className="max-w-2xl text-sm leading-6 text-[#526581]">
            Acompanhe todas as apólices cadastradas e seus respectivos status.
          </p>
        </header>

        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            to="/cadastrarapolice"
            className="flex items-center gap-2 cursor-pointer rounded-lg bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#6D28D9] px-6 py-3 text-base font-medium text-white shadow-[0_8px_20px_rgba(37,99,235,0.28)] transition-all hover:-translate-y-0.5 hover:brightness-110"
          >
            <PlusIcon size={18} />
            Nova Apólice
          </Link>
        </div>



        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-3 py-12">
            <div className="relative flex h-20 w-72 items-center justify-center overflow-hidden rounded-2xl border border-white/70 bg-white/45 shadow-[0_12px_35px_rgba(37,99,235,0.14)] backdrop-blur-md">
              <div className="absolute inset-x-5 top-1/2 h-px border-t border-dashed border-[#1689F5]/35" />

              <div className="absolute left-8 top-1/2 -translate-y-1/2 animate-[trilha_1.6s_ease-in-out_infinite]">
                <div className="h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-[#60A5FA]/40 to-[#2563EB]/70" />
                <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-transparent via-[#A78BFA]/30 to-[#7C3AED]/60" />
              </div>

              <div className="relative z-10 animate-[aviao_2.4s_ease-in-out_infinite]">
                <AirplaneInFlightIcon
                  size={44}
                  weight="duotone"
                  className="text-[#2563EB] drop-shadow-[0_5px_8px_rgba(37,99,235,0.28)]"
                />
              </div>

              <div className="absolute right-8 top-1/2 -translate-y-1/2 animate-[brilho_2.4s_ease-in-out_infinite]">
                <div className="h-2 w-2 rounded-full bg-[#7C3AED]/60 blur-[1px]" />
              </div>
            </div>

            <span className="text-sm font-medium text-[#526581]">
              Carregando apólices de viagem...
            </span>
          </div>
        )}

        {(!isLoading && apolices.length === 0) && (
          <span className="text-3xl text-center my-8 text-[#526581]">
            Nenhuma Apólice foi encontrada!
          </span>
        )}

        <div className="grid grid-cols-1 justify-items-center md:grid-cols-3 md:justify-items-stretch lg:grid-cols-4 gap-6 md:gap-8">
          {
            apolices.map((apolice) => (
              <CardApolices key={apolice.id} apolice={apolice} />
            ))
          }
        </div>
      </div>
    </section>
  );
}

export default ListarApolices;