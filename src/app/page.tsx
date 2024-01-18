'use client'
import { Loading } from '@/app/components/Loading/Loading'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaExternalLinkAlt, FaPlus } from 'react-icons/fa'
import * as Dialog from '@radix-ui/react-dialog'
import { VeiculoModal } from './components/Modal/VeiculoModal'
import { EstacionamentoModal } from './components/Modal/EstacionamentoModal'
import { api } from './api/api'
import { IVeiculo } from './interfaces/IVeiculo'
import { IEstacionamento } from './interfaces/IEstacionamento'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [isEstacionamentoModalOpen, setIsEstacionamentoModalOpen] =
    useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [veiculos, setVeiculos] = useState<IVeiculo[]>([])
  const [estacionamento, setEstacionamento] = useState<IEstacionamento[]>([])

  async function getVeiculos() {
    try {
      const response = await api.get('/veiculo')
      setVeiculos(response.data)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  async function getEstacionamentos() {
    try {
      const response = await api.get('/estacionamento')
      setEstacionamento(response.data)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getVeiculos()
    getEstacionamentos()
  }, [])

  function handleCloseOnSubmit() {
    setIsOpen(!isOpen)
  }

  function handleCloseEstacionamentoOnSubmit() {
    setIsEstacionamentoModalOpen(!isEstacionamentoModalOpen)
  }

  return (
    <div className="flex justify-center w-[70%] mx-auto mt-2  rounded-sm lg:w-full lg:h-[500px]">
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="flex flex-col w-full items-center gap-2">
          <header className="flex flex-col text-center  bg-orange-600 rounded-sm w-full p-2">
            <h1 className="text-white font-bold">
              Gestão de veículos/Estaciomentos
            </h1>
          </header>

          <div className="flex w-full justify-between h-full gap-4 md:flex-col md:justify-normal">
            <div className="flex items-center justify-center flex-col w-1/2 border-2 border-orange-600 rounded-md md:w-full md:h-full">
              <div className="flex flex-col items-center justify-center  gap-12  text-black font-bold dark:text-white min-w-80">
                <p>{estacionamento.length} estacionamentos cadastrados.</p>
                <div className="flex justify-between w-full items-center sm:flex-col sm:gap-4 ">
                  <Link
                    className="flex items-center gap-2 underline hover:text-orange-600"
                    href="/estacionamentos/list"
                  >
                    <FaExternalLinkAlt />
                    <p className="font-bold">Ver Estacionamentos</p>
                  </Link>
                  <Dialog.Root
                    open={isEstacionamentoModalOpen}
                    onOpenChange={(open) => setIsEstacionamentoModalOpen(open)}
                  >
                    <Dialog.Trigger>
                      <p className="flex items-center self-end gap-2 p-2 bg-orange-600 rounded-md hover:bg-orange-400">
                        <FaPlus />
                        Adicionar
                      </p>
                    </Dialog.Trigger>
                    <EstacionamentoModal
                      handleCloseOnSubmit={handleCloseEstacionamentoOnSubmit}
                    />
                  </Dialog.Root>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center  flex-col w-1/2 border-2 border-orange-600  rounded-md md:w-full md:h-full">
              <div className="flex flex-col items-center justify-center  gap-12  text-black font-bold dark:text-white min-w-80">
                <p>{veiculos.length} veiculos cadastrados.</p>
                <div className="flex justify-between w-full items-center sm:flex-col sm:gap-4">
                  <Link
                    className="flex items-center gap-2 underline hover:text-orange-600"
                    href="/veiculos/list"
                  >
                    <FaExternalLinkAlt />
                    <p className="font-bold ">Ver Veiculos</p>
                  </Link>
                  <Dialog.Root
                    open={isOpen}
                    onOpenChange={(open) => setIsOpen(open)}
                  >
                    <Dialog.Trigger>
                      <p className="flex  items-center self-end gap-2 p-2 bg-orange-600  rounded-md hover:bg-orange-400">
                        <FaPlus />
                        Adicionar
                      </p>
                    </Dialog.Trigger>
                    <VeiculoModal handleCloseOnSubmit={handleCloseOnSubmit} />
                  </Dialog.Root>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
