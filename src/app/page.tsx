'use client'
import { Loading } from '@/app/components/Loading/Loading'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaExternalLinkAlt, FaPlus } from 'react-icons/fa'
import * as Dialog from '@radix-ui/react-dialog'
import { VeiculoModal } from './components/Modal/VeiculoModal'
import { EstacionamentoModal } from './components/Modal/EstacionamentoModal'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsLoading(false)
    }

    loadData()
  }, [])

  return (
    <div className="flex justify-center w-[70%] mx-auto mt-2  rounded-sm lg:w-full lg:h-[500px] ">
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
              <div className="flex flex-col items-center justify-center  gap-12  text-black font-bold dark:text-white min-w-64">
                <p>4 estacionamentos cadastrados.</p>
                <div className="flex justify-between w-full items-center sm:flex-col sm:gap-4 sm:items-start">
                  <Link
                    className="flex items-center gap-2 underline hover:text-orange-600"
                    href="/estacionamentos/list"
                  >
                    <FaExternalLinkAlt />
                    <p className="font-bold">Ver Estacionamentos</p>
                  </Link>
                  <Dialog.Root>
                    <Dialog.Trigger>
                      <button className="flex items-center self-end gap-2 p-2 bg-orange-600 rounded-md hover:bg-orange-400">
                        <FaPlus />
                        Adicionar
                      </button>
                    </Dialog.Trigger>
                    <EstacionamentoModal />
                  </Dialog.Root>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center  flex-col w-1/2 border-2 border-orange-600  rounded-md md:w-full md:h-full">
              <div className="flex flex-col items-center text-center justify-center gap-12 text-black font-bold dark:text-white min-w-64">
                <p className="flex self-center w-full">
                  4 veiculos cadastrados.
                </p>
                <div className="flex justify-between w-full items-center sm:flex-col sm:gap-4 sm:items-start">
                  <Link
                    className="flex items-center gap-2 underline hover:text-orange-600"
                    href="/veiculos/list"
                  >
                    <FaExternalLinkAlt />
                    <p className="font-bold ">Ver Veiculos</p>
                  </Link>
                  <Dialog.Root>
                    <Dialog.Trigger>
                      <button className="flex  items-center self-end gap-2 p-2 bg-orange-600  rounded-md hover:bg-orange-400">
                        <FaPlus />
                        Adicionar
                      </button>
                    </Dialog.Trigger>
                    <VeiculoModal />
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
