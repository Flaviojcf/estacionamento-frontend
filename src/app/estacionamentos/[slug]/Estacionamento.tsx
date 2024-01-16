'use client'

import { api } from '@/app/api/api'
import { Loading } from '@/app/components/Loading/Loading'
import { ICustomError } from '@/app/interfaces/IError'
import { IEstacionamento } from '@/app/interfaces/IEstacionamento'
import { useEffect, useState } from 'react'

export function Estacionamento() {
  const [isLoading, setIsLoading] = useState(true)
  const [estacionamento, setEstacionamento] = useState<IEstacionamento[]>([])
  const [errorMessage, setErrorMessage] = useState<string>()

  async function getEstacionamentos() {
    try {
      const response = await api.get('/estacionamento')
      setEstacionamento(response.data)
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
    getEstacionamentos()
  }, [])

  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && estacionamento.length > 0 ? (
        <div>{estacionamento.map((x) => x.nome)}</div>
      ) : (
        errorMessage
      )}
    </div>
  )
}
