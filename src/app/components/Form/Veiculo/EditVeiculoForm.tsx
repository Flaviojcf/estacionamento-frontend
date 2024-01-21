import { api } from '@/app/api/api'
import { ICustomError } from '@/app/interfaces/IError'
import { IEstacionamento } from '@/app/interfaces/IEstacionamento'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { formattedDate } from '@/utils/formattedDate'
import { IVeiculo } from '@/app/interfaces/IVeiculo'

export function EditVeiculoForm({ ...veiculo }: IVeiculo) {
  const [estacionamento, setEstacionamento] = useState<IEstacionamento[]>([])
  const [estacionamentoInfo, setEstacionamentoInfo] =
    useState<IEstacionamento>()

  async function getEstacionamentos() {
    try {
      const response = await api.get('/estacionamento')
      setEstacionamento(response.data)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function getEstacionamentoById(estacionamentoId: string) {
    try {
      const response = await api.get(`/estacionamento/${estacionamentoId}`)
      setEstacionamentoInfo(response.data)
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    getEstacionamentoById(veiculo.estacionamentoId)
    getEstacionamentos()
  }, [veiculo.estacionamentoId])

  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value
    setValue('placa', newName)
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="text-white" htmlFor="placa">
        Identificação da Placa
      </label>
      <input
        className="border-0 rounded-md bg-[#121214] text-white p-4 placeholder:text-white"
        type="text"
        placeholder="Placa"
        {...register('placa')}
        onChange={(e) => handleInputChange(e)}
        defaultValue={veiculo.placa}
      />
      <div className="text-red-400 text-sm">
        <ErrorMessage errors={errors} name="placa" />
      </div>
      <label className="text-white" htmlFor="estacionamentoId">
        Estacionamento
      </label>
      <input
        type="text"
        className="border-0 rounded-md bg-[#121214] text-white p-4  cursor-pointer read-only:bg-gray-800 read-only:focus:outline-none"
        readOnly
        defaultValue={estacionamentoInfo?.nome}
      ></input>
      <label className="text-white" htmlFor="dataCriacao">
        Data de Alteração
      </label>
      <input
        className="border-0 rounded-md bg-[#121214] text-white p-4 placeholder:text-white read-only:bg-gray-800 read-only:focus:outline-none"
        type="text"
        placeholder="Data de Alteração"
        defaultValue={
          veiculo.dataAlteracao !== null
            ? formattedDate(veiculo.dataAlteracao)
            : 'Informações não alteradas'
        }
        readOnly
      />
    </div>
  )
}
