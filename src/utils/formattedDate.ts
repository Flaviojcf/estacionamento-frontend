import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formattedDate = (date: Date) => {
  return format(date, 'dd/MM/yyyy HH:mm', {
    locale: ptBR,
  })
}
