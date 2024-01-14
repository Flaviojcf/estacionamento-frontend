'use client'

import { Loading } from '@/app/components/Loading/Loading'
import { useEffect, useState } from 'react'

export function Estacionamento() {
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
      {!isLoading && <div>Estacionamento page</div>}
    </div>
  )
}
