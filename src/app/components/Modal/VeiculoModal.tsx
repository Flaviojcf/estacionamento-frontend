'use client'
import * as Dialog from '@radix-ui/react-dialog'
import { MdClose } from 'react-icons/md'
import * as zod from 'zod'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewVeiculoForm } from '../Form/NewVeiculoForm'

const FormValidationSchema = zod.object({
  placa: zod
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .refine((data) => /^[a-zA-Z]{3}-\d{4}$/.test(data), {
      message:
        'A placa deve ter o formato de 3 letras, um traço e depois 4 números',
    }),
  estacionamento: zod.string().min(1, { message: 'Campo obrigatório' }),
})

type NewVeiculoFormData = zod.infer<typeof FormValidationSchema>

export function VeiculoModal() {
  const newVeiculoForm = useForm<NewVeiculoFormData>({
    resolver: zodResolver(FormValidationSchema),
  })

  const { handleSubmit, reset } = newVeiculoForm

  function handleCreateNewVeiculo(data: NewVeiculoFormData) {
    console.log(data)
    reset()
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
            Cadastrar veículo
          </Dialog.Title>
          <Dialog.Close className="text-gray-200 hover:text-gray-600">
            <MdClose size={24} />
          </Dialog.Close>
        </div>
        <div className="mt-8">
          <form
            onSubmit={handleSubmit(handleCreateNewVeiculo)}
            id="newVeiculoForm"
          >
            <FormProvider {...newVeiculoForm}>
              <NewVeiculoForm />
            </FormProvider>
          </form>
        </div>

        <div className="mt-8 space-x-6 text-right">
          <Dialog.Close className="rounded px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600">
            Cancelar
          </Dialog.Close>
          <button
            type="submit"
            form="newVeiculoForm"
            className="rounded bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
          >
            Salvar
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
