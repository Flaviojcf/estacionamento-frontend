import { UUID } from 'crypto'

export interface IEstacionamento {
  nome: string
  id: UUID
  dataCriacao: Date
  dataAlteracao: Date
  precoHora: number
  precoInicial: number
  isAtivo: boolean
}

export interface IEditEstacionamento {
  id: UUID
  nome: string
  precoHora: number
  precoInicial: number
}
