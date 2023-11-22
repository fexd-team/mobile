let uuid = 0

const uniqueId = (prefix: string = ''): string =>
  `${prefix}_${++uuid}_${Date.now()}_${Math.floor(Math.random() * 1000000)}`

export default uniqueId
