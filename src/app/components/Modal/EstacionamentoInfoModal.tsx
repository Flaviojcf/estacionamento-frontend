'use client'

import {
  IEditEstacionamento,
  IEstacionamento,
} from '@/app/interfaces/IEstacionamento'
import { formattedDate } from '@/utils/formattedDate'
import * as Dialog from '@radix-ui/react-dialog'
import * as zod from 'zod'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MdClose } from 'react-icons/md'
import { api } from '@/app/api/api'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'
import { ICustomError } from '@/app/interfaces/IError'
import { EditEstacionamentoForm } from '../Form/Estacionamento/EditEstacionamentoForm'

const FormValidationSchema = zod.object({
  nome: zod.string().min(1, { message: 'Campo obrigatório' }),
  precoInicial: zod
    .string()
    .refine((data) => parseFloat(data) > 0, { message: 'Campo obrigatório' }),
  precoHora: zod
    .string()
    .refine((data) => parseFloat(data) > 0, { message: 'Campo obrigatório' }),
})

type EditEstacionamentoFormData = zod.infer<typeof FormValidationSchema>

export function EstacionamentoInfoModal({
  ...estacionamento
}: IEstacionamento) {
  const pathname = usePathname()
  const editEstacionamentoForm = useForm<EditEstacionamentoFormData>({
    resolver: zodResolver(FormValidationSchema),
  })
  const { handleSubmit, reset } = editEstacionamentoForm

  async function handleEditEstacionamento(data: EditEstacionamentoFormData) {
    const editEstacionamento: IEditEstacionamento = {
      id: estacionamento.id,
      nome: data.nome,
      precoHora: Number(data.precoHora),
      precoInicial: Number(data.precoInicial),
    }
    await api
      .put(`/estacionamento/${estacionamento.id}`, editEstacionamento)
      .then((response) => {
        toast.success('Estacionamento editado com sucesso', {
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
            Informações do Estacionamento
          </Dialog.Title>
          <Dialog.Close className="text-gray-200 hover:text-gray-600">
            <MdClose size={24} />
          </Dialog.Close>
        </div>
        <div className="mt-8">
          <form
            onSubmit={handleSubmit(handleEditEstacionamento)}
            id="editEstacionamentoForm"
            className="flex flex-col gap-4"
          >
            <FormProvider {...editEstacionamentoForm}>
              <EditEstacionamentoForm {...estacionamento} />
            </FormProvider>
          </form>
        </div>

        <div className="mt-8 space-x-6 text-right">
          <Dialog.Close className="rounded px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600">
            Cancelar
          </Dialog.Close>
          <button
            type="submit"
            form="editEstacionamentoForm"
            className="rounded bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
          >
            Salvar Edição
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
