import { IButton } from '@/app/interfaces/IButton'

export function Button({ children, className, ...props }: IButton) {
  return (
    <button
      {...props}
      className={
        className ||
        'flex items-center justify-center w-64 h-10 rounded bg-buttonColor hover:opacity-80 transition-all font-bold text-white dark:bg-emerald-700'
      }
    >
      {children}
    </button>
  )
}
