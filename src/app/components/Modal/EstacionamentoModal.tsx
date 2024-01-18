'use client'
import * as Dialog from '@radix-ui/react-dialog'
import { MdClose } from 'react-icons/md'
import * as zod from 'zod'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewEstacionamentoForm } from '../Form/Estacionamento/NewEstacionamentoForm'
import { api } from '@/app/api/api'
import { Toaster, toast } from 'sonner'
import { ICustomError } from '@/app/interfaces/IError'
import { usePathname } from 'next/navigation'

type EstacionamentoModalProps = {
  handleCloseOnSubmit: () => void
}

const FormValidationSchema = zod.object({
  nome: zod.string().min(1, { message: 'Campo obrigatório' }),
  precoInicial: zod
    .string()
    .refine((data) => parseFloat(data) > 0, { message: 'Campo obrigatório' }),
  precoHora: zod
    .string()
    .refine((data) => parseFloat(data) > 0, { message: 'Campo obrigatório' }),
})

type NewEstacionamentoFormData = zod.infer<typeof FormValidationSchema>

export function EstacionamentoModal({
  handleCloseOnSubmit,
}: EstacionamentoModalProps) {
  const pathname = usePathname()
  const newEstacionamentoForm = useForm<NewEstacionamentoFormData>({
    resolver: zodResolver(FormValidationSchema),
  })

  const { handleSubmit, reset } = newEstacionamentoForm

  async function handleCreateNewEstacionamento(
    data: NewEstacionamentoFormData,
  ) {
    await api
      .post('/estacionamento', data)
      .then((response) => {
        toast.success('Estacionamento cadastrado com sucesso', {
          duration: 1000,
          onAutoClose: () =>
            pathname.includes('estacionamento') || pathname === '/'
              ? window.location.reload()
              : handleCloseOnSubmit(),
          action: {
            label: 'Fechar',
            onClick: () => handleCloseOnSubmit(),
          },
        })
        reset()
      })
      .catch((error) => {
        const customError = error.response?.data as ICustomError
        if (customError) {
          toast.error(customError.Errors[0].Message, {
            duration: 5000,
            onAutoClose: () => handleCloseOnSubmit(),
            action: {
              label: 'Fechar',
              onClick: () => handleCloseOnSubmit(),
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
            Cadastrar Estacionamento
          </Dialog.Title>
          <Dialog.Close className="text-gray-200 hover:text-gray-600">
            <MdClose size={24} />
          </Dialog.Close>
        </div>

        <div className="mt-8">
          <form
            onSubmit={handleSubmit(handleCreateNewEstacionamento)}
            id="newEstacionamentoForm"
            className="flex flex-col gap-4"
          >
            <FormProvider {...newEstacionamentoForm}>
              <NewEstacionamentoForm />
            </FormProvider>
          </form>
        </div>

        <div className="mt-8 space-x-6 text-right">
          <Dialog.Close className="rounded px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600">
            Cancelar
          </Dialog.Close>
          <button
            type="submit"
            form="newEstacionamentoForm"
            className="rounded bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
          >
            Salvar
          </button>
        </div>
      </Dialog.Content>
      <Toaster richColors position="top-right" />
    </Dialog.Portal>
  )
}
