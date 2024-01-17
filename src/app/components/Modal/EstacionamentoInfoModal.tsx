'use client'

import { IEstacionamento } from '@/app/interfaces/IEstacionamento'
import * as Dialog from '@radix-ui/react-dialog'
import { MdClose } from 'react-icons/md'

export function EstacionamentoInfoModal({
  ...estacionamento
}: IEstacionamento) {
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
              value={estacionamento.nome}
            />
            <input
              className="border-0 rounded-md bg-[#121214] text-white p-4 placeholder:text-white"
              type="number"
              placeholder="Preço Inicial"
              value={estacionamento.precoInicial}
            />
            <input
              className="border-0 rounded-md bg-[#121214] text-white p-4 placeholder:text-white"
              type="number"
              placeholder="Preço por Hora"
              readOnly
              value={estacionamento.precoHora}
            />

            <input
              className="border-0 rounded-md bg-[#121214] text-white p-4 placeholder:text-white"
              type="date"
              placeholder="Data de Criação"
              value={
                estacionamento.dataCriacao
                  ? new Date(estacionamento.dataCriacao)
                      .toISOString()
                      .split('T')[0]
                  : ''
              }
              readOnly
            />
            <input
              className="border-0 rounded-md bg-[#121214] text-white p-4 placeholder:text-white"
              type="text"
              placeholder="Data de Alteração"
              value={
                estacionamento.dataAlteracao
                  ? new Date(estacionamento.dataAlteracao)
                      .toISOString()
                      .split('T')[0]
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
