export function Loading() {
  return (
    <div className="flex items-center justify-center space-x-2 h-full w-full">
      <div className="border-t-4 border-orange-600 border-solid border-opacity-90 rounded-full animate-spin w-12 h-12"></div>
      <div>Carregando...</div>
    </div>
  )
}
