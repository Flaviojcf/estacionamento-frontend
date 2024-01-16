'use client'
import { api } from '@/app/api/api'
import { Loading } from '@/app/components/Loading/Loading'
import { VeiculoCard } from '@/app/components/VeiculoCard'
import { ICustomError } from '@/app/interfaces/IError'
import { IVeiculo } from '@/app/interfaces/IVeiculo'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

export function Veiculo() {
  const [isLoading, setIsLoading] = useState(true)
  const [veiculos, setVeiculos] = useState<IVeiculo[]>([])
  const [errorMessage, setErrorMessage] = useState<string>()

  async function getVeiculos() {
    try {
      const response = await api.get('/veiculo')
      setVeiculos(response.data)
    } catch (error: any) {
      const customError = error.response?.data as ICustomError
      if (customError) {
        setErrorMessage(customError.Errors[0].Message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getVeiculos()
  }, [])

  return (
    <div className="flex flex-col w-full h-full">
      {isLoading && <Loading />}

      {!isLoading && veiculos.length > 0 ? (
        <div className="flex flex-col gap-6 w-full h-full mt-2">
          <header className="flex flex-col text-center  bg-orange-600 rounded-sm w-full p-2">
            <h1 className="text-white font-bold">Veículos Cadastrados</h1>
          </header>
          <div className="flex w-full gap-12 rounded-md lg:flex-wrap lg:items-center lg:justify-center">
            {veiculos.map((veiculo: IVeiculo, index) => (
              <VeiculoCard key={`${veiculo.placa}-${index}`} {...veiculo} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-full h-full mt-2">
          <header
            className={clsx(
              'flex flex-col text-center  bg-orange-600 rounded-sm w-full p-2',
              { hidden: isLoading },
            )}
          >
            <h1 className="text-white font-bold">Veículos Cadastrados</h1>
          </header>
          <div className="flex w-full h-full gap-12 rounded-md justify-center items-center">
            {errorMessage}
          </div>
        </div>
      )}
    </div>
  )
}
