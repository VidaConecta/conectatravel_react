import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { WarningCircleIcon } from '@phosphor-icons/react'
import { ClipLoader } from "react-spinners"
import type Apolice from "../../../models/Apolice"
import { apoliceService } from "../../../services/Apolice"

// Página de confirmação de exclusão de uma Apólice
function DeletarApolice() {

	const navigate = useNavigate()

	const [apolice, setApolice] = useState<Apolice>({} as Apolice)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const { id } = useParams<{ id: string }>()

	async function buscarPorId(id: string) {
		try {
			const dados = await apoliceService.buscarPorId(Number(id))
			setApolice(dados)
		} catch (error) {
			alert('Erro ao buscar a apólice.')
		}
	}

	useEffect(() => {
		if (id !== undefined) {
			buscarPorId(id)
		}
	}, [id])

	async function deletarApolice() {
		setIsLoading(true)

		try {
			await apoliceService.deletar(Number(id))
			alert('Apólice apagada com sucesso')
		} catch (error) {
			alert('Erro ao deletar a apólice.')
		}

		setIsLoading(false)
		retornar()
	}

	function retornar() {
		navigate('/apolices')
	}

	return (
		<main className="grow w-full max-w-xl mx-auto px-4 md:px-8 py-24 md:py-28 flex flex-col gap-8">
			<div className="flex flex-col items-center text-center gap-3 bg-white border border-slate-200 rounded-lg p-8">
				<div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 text-red-600">
					<WarningCircleIcon size={32} />
				</div>
				<h1 className="text-2xl font-semibold text-slate-800">
					Excluir Apólice
				</h1>

				<p className="text-base text-slate-600">
					Tem certeza que deseja excluir a apólice{' '}
					<span className="font-semibold text-slate-800">
						Nº {apolice.numeroApolice}
					</span>
					?
				</p>

				<div className="flex items-center justify-center gap-3 mt-4">
					<button
						onClick={deletarApolice}
						disabled={isLoading}
						className="bg-green-600 text-white text-base px-6 py-3 rounded-lg hover:bg-green-800 transition-colors font-medium disabled:opacity-60 flex items-center justify-center min-w-16"
					>
						{isLoading ?
							<ClipLoader color="#ffffff" size={24} /> :
							<span>Sim</span>
						}
					</button>
					<button
						onClick={retornar}
						className="bg-red-600 text-white text-base px-6 py-3 rounded-lg border border-slate-300 hover:bg-red-700 transition-colors font-medium"
					>
						Não
					</button>
				</div>
			</div>
		</main>
	)
}

export default DeletarApolice