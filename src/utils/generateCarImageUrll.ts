import ICarCard from '@/app/interfaces/IVeiculoCard'

export const generateCarImageUrl = (angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage')

  url.searchParams.append('customer', 'hrjavascript-mastery')
  url.searchParams.append('make', 'bmw')
  url.searchParams.append('modelFamily', 'm8')
  url.searchParams.append('zoomType', 'fullscreen')
  url.searchParams.append('modelYear', `2022`)
  url.searchParams.append('angle', `${angle}`)

  return `${url}`
}
