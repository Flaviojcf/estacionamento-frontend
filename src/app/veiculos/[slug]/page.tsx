import { Veiculo } from './Veiculo'

export const metadata = {
  title: 'Veiculos',
}

export default function VeiculosPage() {
  return (
    <div className="flex items-center justify-center w-3/4 mx-auto lg:w-full">
      <Veiculo />
    </div>
  )
}
