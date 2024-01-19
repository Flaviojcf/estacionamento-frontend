'use client'
import { api } from '@/app/api/api'
import { IEstacionamento } from '@/app/interfaces/IEstacionamento'
import { IVeiculo } from '@/app/interfaces/IVeiculo'
import { formattedDate } from '@/utils/formattedDate'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'

export function VeiculoInfoModal({ ...veiculo }: IVeiculo) {
  const [estacionamento, setEstacionamento] = useState<IEstacionamento[]>([])
  const [estacionamentoInfo, setEstacionamentoInfo] =
    useState<IEstacionamento>()

  async function getEstacionamentos() {
    try {
      const response = await api.get('/estacionamento')
      setEstacionamento(response.data)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function getEstacionamentoById(estacionamentoId: string) {
    try {
      const response = await api.get(`/estacionamento/${estacionamentoId}`)
      console.log(response.data)
      setEstacionamentoInfo(response.data)
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    getEstacionamentoById(veiculo.estacionamentoId)
    getEstacionamentos()
  }, [veiculo.estacionamentoId])

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content
        className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md 
      bg-[#202024] p-8 text-gray-900 shadow sm:w-[320px]"
      >
        <div className="flex items-center justify-between">
          <Dialog.Title className="text-xl text-white">
            Informações do Veículo
          </Dialog.Title>
          <Dialog.Close className="text-gray-200 hover:text-gray-600">
            <MdClose size={24} />
          </Dialog.Close>
        </div>
        <div className="mt-8">
          <form className="flex flex-col gap-4">
            <input
              className="border-0 rounded-md bg-[#121214] text-white p-4 placeholder:text-white"
              type="text"
              placeholder="Placa"
              defaultValue={veiculo.placa}
            />
            <select
              className="border-0 rounded-md bg-[#121214] text-white p-4  cursor-pointer"
              defaultValue={estacionamentoInfo?.nome}
            >
              {estacionamento.map((estacionamento, index) => (
                <option
                  key={`${estacionamento.isAtivo}-${index}`}
                  value={estacionamento.id}
                >
                  {estacionamento.nome}
                </option>
              ))}
            </select>

            <input
              className="border-0 rounded-md bg-[#121214] text-white p-4 placeholder:text-white read-only:bg-gray-800 read-only:focus:outline-none"
              type="text"
              placeholder="Data de Criação"
              defaultValue={formattedDate(veiculo.dataCriacao)}
              readOnly
            />
          </form>
        </div>

        <div className="mt-8 space-x-6 text-right">
          <Dialog.Close className="rounded px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600">
            Cancelar
          </Dialog.Close>
          <button className="rounded bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600">
            Salvar Edição
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
