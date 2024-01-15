'use client'
import { Loading } from '@/app/components/Loading/Loading'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
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
    <div className="flex justify-center w-3/4 mx-auto mt-2 px-8 rounded-sm">
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="flex flex-col w-full items-center gap-4">
          <header className="flex flex-col text-center  bg-orange-600 rounded-sm w-full p-2">
            <h1 className="text-black font-bold">
              Gestão de veículos/Estaciomentos
            </h1>
          </header>

          <div className="flex  rounded-sm w-full justify-between h-full p-2 gap-2">
            <div className="flex items-center justify-center flex-col w-1/2 border-2 border-orange-600 rounded-sm">
              <div className="flex flex-col items-center justify-center  gap-12  text-black font-bold dark:text-white">
                <p>Você possui 4 estacionamentos cadastrados.</p>
                <div className="flex justify-between w-full items-center">
                  <Link href="/estacionamentos/list">
                    <p className="font-bold hover:text-orange-600">
                      Ver detalhes
                    </p>
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
            <div className="flex items-center justify-center  flex-col w-1/2 border-2 border-orange-600  rounded-sm">
              <div className="flex flex-col items-center justify-center gap-12 text-black font-bold dark:text-white">
                <p>Você possui 4 veiculos cadastrados.</p>
                <div className="flex justify-between w-full items-center">
                  <Link href="/veiculos/list">
                    <p className="font-bold hover:text-orange-600 ">
                      Ver detalhes
                    </p>
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
