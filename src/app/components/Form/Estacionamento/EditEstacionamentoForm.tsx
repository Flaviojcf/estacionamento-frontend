import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { IEstacionamento } from '@/app/interfaces/IEstacionamento'
import { formattedDate } from '@/utils/formattedDate'

export function EditEstacionamentoForm({ ...estacionamento }: IEstacionamento) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex flex-col gap-4">
      <label className="text-white" htmlFor="nome">
        Nome
      </label>
      <input
        className="border-0 rounded-md bg-[#121214] text-white p-4 placeholder:text-white"
        type="text"
        placeholder="Nome"
        defaultValue={estacionamento.nome}
        {...register('nome')}
      />
      <div className="text-red-400 text-sm">
        <ErrorMessage errors={errors} name="nome" />
      </div>
      <label className="text-white" htmlFor="precoInicial">
        Preço Inicial
      </label>
      <input
        className="border-0 rounded-md bg-[#121214] text-white p-4 placeholder:text-white"
        type="number"
        placeholder="Preço Inicial"
        defaultValue={estacionamento.precoInicial}
        {...register('precoInicial')}
      />
      <div className="text-red-400 text-sm">
        <ErrorMessage errors={errors} name="precoInicial" />
      </div>
      <label className="text-white" htmlFor="precoHora">
        Preço por Hora
      </label>
      <input
        className="border-0 rounded-md bg-[#121214] text-white p-4 placeholder:text-white"
        type="number"
        placeholder="Preço por Hora"
        defaultValue={estacionamento.precoHora}
        {...register('precoHora')}
      />
      <div className="text-red-400 text-sm">
        <ErrorMessage errors={errors} name="precoHora" />
      </div>
      {/* <label className="text-white" htmlFor="dataCriacao">
        Data de Cadastro
      </label>
      <input
        className="border-0 rounded-md bg-[#121214] text-white p-4 placeholder:text-white read-only:bg-gray-800 read-only:focus:outline-none"
        type="text"
        placeholder="Data de Criação"
        defaultValue={formattedDate(estacionamento.dataCriacao)}
        readOnly
      /> */}
    </div>
  )
}
