'use client'
import { Loading } from '@/app/components/Loading/Loading'
import { VeiculoCard } from '@/app/components/VeiculoCard'
import { useEffect, useState } from 'react'

export function Veiculo() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsLoading(false)
    }

    loadData()
  }, [])
  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && (
        <div>
          <VeiculoCard placa="ABC-2024" />
        </div>
      )}
    </div>
  )
}
