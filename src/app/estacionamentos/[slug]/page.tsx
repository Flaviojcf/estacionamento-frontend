import { Estacionamento } from './Estacionamento'

export const metadata = {
  title: 'Estacionamentos',
}

export default function EstacionamentoPage() {
  return (
    <div className="flex items-center justify-center w-3/4 mx-auto lg:w-full">
      <Estacionamento />
    </div>
  )
}
