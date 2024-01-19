import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns'

export const differenceDaysInMinutes = (entraceDate: Date, exitDate: Date) => {
  return differenceInMinutes(exitDate, entraceDate)
}
