import { api } from '@/app/api/api'
import { ICustomError } from '@/app/interfaces/IError'
import { IEstacionamento } from '@/app/interfaces/IEstacionamento'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

export function NewVeiculoForm() {
  const [estacionamento, setEstacionamento] = useState<IEstacionamento[]>([])

  async function getEstacionamentos() {
    try {
      const response = await api.get('/estacionamento')
      setEstacionamento(response.data)
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    getEstacionamentos()
  }, [])

  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex flex-col gap-4">
      <input
        className="border-0 rounded-md bg-[#121214] text-white p-4 placeholder:text-white"
        type="text"
        placeholder="Placa"
        {...register('placa')}
      />
      <div className="text-red-400 text-sm">
        <ErrorMessage errors={errors} name="placa" />
      </div>

      {estacionamento.length === 0 ? (
        <div className="border-0 rounded-md bg-[#121214] text-white p-4 ">
          <p>Cadastre um estacionamento</p>
        </div>
      ) : (
        <select
          className="border-0 rounded-md bg-[#121214] text-white p-4  cursor-pointer"
          defaultValue="Selecione um Estacionamento"
          {...register('estacionamentoId')}
        >
          <option value="">Selecione um Estacionamento</option>
          {estacionamento.map((estacionamento, index) => (
            <option
              key={`${estacionamento.isAtivo}-${index}`}
              value={estacionamento.id}
            >
              {estacionamento.nome}
            </option>
          ))}
        </select>
      )}
      <div className="text-red-400 text-sm">
        <ErrorMessage errors={errors} name="estacionamento" />
      </div>
    </div>
  )
}
