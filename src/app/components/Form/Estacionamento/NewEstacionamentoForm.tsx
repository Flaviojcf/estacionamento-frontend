import { api } from '@/app/api/api'
import { ICustomError } from '@/app/interfaces/IError'
import { IEstacionamento } from '@/app/interfaces/IEstacionamento'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

export function NewEstacionamentoForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex flex-col gap-4">
      <input
        className="border-0 rounded-md bg-[#121214] text-white p-4 placeholder:text-white"
        type="text"
        placeholder="Nome"
        {...register('nome')}
      />
      <div className="text-red-400 text-sm">
        <ErrorMessage errors={errors} name="nome" />
      </div>
      <input
        className="border-0 rounded-md bg-[#121214] text-white p-4 placeholder:text-white"
        type="number"
        placeholder="Preço Inicial"
        {...register('precoInicial')}
      />
      <div className="text-red-400 text-sm">
        <ErrorMessage errors={errors} name="precoInicial" />
      </div>
      <input
        className="border-0 rounded-md bg-[#121214] text-white p-4 placeholder:text-white"
        type="number"
        placeholder="Preço por Hora"
        {...register('precoHora')}
      />
      <div className="text-red-400 text-sm">
        <ErrorMessage errors={errors} name="precoHora" />
      </div>
    </div>
  )
}
