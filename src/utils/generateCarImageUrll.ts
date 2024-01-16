export const generateCarImageUrl = (angle?: string) => {
  const modelsBmw = ['m2', 'm3', 'm4', 'm5', 'm6', 'm8']
  const choisedModel = modelsBmw[Math.floor(Math.random() * modelsBmw.length)]

  const url = new URL('https://cdn.imagin.studio/getimage')

  url.searchParams.append('customer', 'hrjavascript-mastery')
  url.searchParams.append('make', 'bmw')
  url.searchParams.append('modelFamily', choisedModel)
  url.searchParams.append('zoomType', 'fullscreen')
  url.searchParams.append('modelYear', '2022')
  url.searchParams.append('angle', `${angle}`)

  return `${url}`
}
