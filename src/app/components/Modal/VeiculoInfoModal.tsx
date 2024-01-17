'use client'
import { IVeiculo } from '@/app/interfaces/IVeiculo'
import * as Dialog from '@radix-ui/react-dialog'
import { MdClose } from 'react-icons/md'

export function VeiculoInfoModal({ ...veiculo }: IVeiculo) {
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
              value={veiculo.placa}
            />
            <select
              className="border-0 rounded-md bg-[#121214] text-white p-4  cursor-pointer"
              value={veiculo.estacionamentoId}
            >
              <option value="">{veiculo.estacionamentoId}</option>
              <option value="1">Estacionamento A</option>
              <option value="2">Estacionamento B</option>
              <option value="3">Estacionamento C</option>
            </select>

            <input
              className="border-0 rounded-md bg-[#121214] text-white p-4 placeholder:text-white"
              type="date"
              placeholder="Data de Criação"
              value={
                veiculo.dataCriacao
                  ? new Date(veiculo.dataCriacao).toISOString().split('T')[0]
                  : ''
              }
              readOnly
            />
            <input
              className="border-0 rounded-md bg-[#121214] text-white p-4 placeholder:text-white"
              type="text"
              placeholder="Data de Alteração"
              value={
                veiculo.dataAlteracao
                  ? new Date(veiculo.dataAlteracao).toISOString().split('T')[0]
                  : 'Informações não alteradas'
              }
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