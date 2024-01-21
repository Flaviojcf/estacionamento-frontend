import { format, parseISO, subHours } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formattedDate = (date: Date) => {
  const modifiedDate = subHours(date, 3)

  return format(modifiedDate, 'dd/MM/yyyy HH:mm', {
    locale: ptBR,
  })
}
