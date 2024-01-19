import { UUID } from 'crypto'

export interface IVeiculo {
  placa: string
  id: UUID
  estacionamentoId: UUID
  dataCriacao: Date
  dataAlteracao: Date
  isAtivo: boolean
}

export interface IEditVeiculo {
  placa: string
  id: string
}
