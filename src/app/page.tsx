'use client'
import { Loading } from '@/app/components/Loading/Loading'
import { useEffect, useState } from 'react'

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

          <div className="flex border border-orange-600 rounded-sm w-full justify-between h-full">
            <div className="flex items-center justify-center flex-col w-1/2 border border-black">
              <p>Qtd de estacionamentos</p>
            </div>
            <div className="flex items-center justify-center  flex-col w-1/2 border border-black">
              <p>Qtd de veículos</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
