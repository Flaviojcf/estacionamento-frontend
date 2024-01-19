'use client'
import { api } from '@/app/api/api'
import { IEstacionamento } from '@/app/interfaces/IEstacionamento'
import { IEditVeiculo, IVeiculo } from '@/app/interfaces/IVeiculo'
import { formattedDate } from '@/utils/formattedDate'
import * as Dialog from '@radix-ui/react-dialog'
import * as zod from 'zod'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { EditVeiculoForm } from '../Form/Veiculo/EditVeiculoForm'
import { usePathname } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { ICustomError } from '@/app/interfaces/IError'

const FormValidationSchema = zod.object({
  placa: zod
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .refine((data) => /^[a-zA-Z]{3}-\d{4}$/.test(data), {
      message: 'A placa deve ter o seguinte formato: "abc-2024" ',
    }),
})

type EditVeiculoFormData = zod.infer<typeof FormValidationSchema>

export function VeiculoInfoModal({ ...veiculo }: IVeiculo) {
  const pathname = usePathname()

  const editVeiculoForm = useForm<EditVeiculoFormData>({
    resolver: zodResolver(FormValidationSchema),
  })
  const { handleSubmit, reset } = editVeiculoForm

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

  async function handleEditVeiculo(data: EditVeiculoFormData) {
    const editVeiculo: IEditVeiculo = {
      id: veiculo.id,
      placa: data.placa,
    }
    console.log(editVeiculo)
    await api
      .put(`/veiculo/${veiculo.id}`, editVeiculo)
      .then((response) => {
        toast.success('Veiculo editado com sucesso', {
          duration: 1000,
          onAutoClose: () => window.location.reload(),
          action: {
            label: 'Fechar',
            onClick: () => window.location.reload(),
          },
        })
        reset()
      })
      .catch((error) => {
        const customError = error.response?.data as ICustomError
        if (customError) {
          toast.error(customError.Errors[0].Message, {
            duration: 5000,
            onAutoClose: () => window.location.reload(),
            action: {
              label: 'Fechar',
              onClick: () => window.location.reload(),
            },
          })
        }
        reset()
      })
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content
        className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md 
      bg-[#202024] p-8 text-gray-900 shadow sm:w-[320px]"
      >
        <div className="flex items-center justify-between">
          <Dialog.Title className="text-xl text-white">
            Informações do Veículo
          </Dialog.Title>
          <Dialog.Close className="text-gray-200 hover:text-gray-600">
            <MdClose size={24} />
          </Dialog.Close>
        </div>
        <div className="mt-8">
          <form
            onSubmit={handleSubmit(handleEditVeiculo)}
            id="editVeiculoForm"
            className="flex flex-col gap-4"
          >
            <FormProvider {...editVeiculoForm}>
              <EditVeiculoForm {...veiculo} />
            </FormProvider>
          </form>
        </div>

        <div className="mt-8 space-x-6 text-right">
          <Dialog.Close className="rounded px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600">
            Cancelar
          </Dialog.Close>
          <button
            type="submit"
            form="editVeiculoForm"
            className="rounded bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
          >
            Salvar Edição
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
