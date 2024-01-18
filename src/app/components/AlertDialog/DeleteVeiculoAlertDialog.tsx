import * as AlertDialog from '@radix-ui/react-alert-dialog'

interface IDeleteVeiculoAlertDialog {
  handleDeleteVeiculo: (veiculoId: string) => void
  veiculoId: string
}

export function DeleteVeiculoAlertDialog({
  handleDeleteVeiculo,
  veiculoId,
}: IDeleteVeiculoAlertDialog) {
  function handleConfirmDelete(veiculoId: string) {
    handleDeleteVeiculo(veiculoId)
  }

  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
      <AlertDialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-[#202024] p-8 text-gray-900 shadow sm:w-[320px]">
        <div className="flex flex-col h-56 justify-between items-center text-center px-4">
          <AlertDialog.Title className="text-4xl font-bold text-white">
            Atenção!
          </AlertDialog.Title>
          <AlertDialog.Description className="text-white text-xl">
            Ao confirmar, você irá <span className="underline">deletar</span> o
            veiculo selecionado, deseja continuar?
          </AlertDialog.Description>

          <div className="flex justify-between w-full">
            <AlertDialog.Cancel>
              <p className="rounded bg-red-500 px-4 py-2 text-lg font-medium text-white hover:bg-red-600">
                Cancelar
              </p>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <p
                className="rounded bg-green-500 px-4 py-2 text-lg font-medium text-white hover:bg-green-600"
                onClick={() => handleConfirmDelete(veiculoId)}
              >
                Confirmar
              </p>
            </AlertDialog.Action>
          </div>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  )
}
