export const canUseDocElement = () =>
  !!(typeof window !== 'undefined' && window.document && window.document.createElement)

let flexGapSupported: boolean | undefined
export const detectFlexGapSupported = (): boolean => {
  if (!canUseDocElement()) return false
  if (flexGapSupported !== undefined) return flexGapSupported

  const flex = document.createElement('div')
  flex.style.display = 'flex'
  flex.style.flexDirection = 'column'
  flex.style.rowGap = '1px'

  flex.appendChild(document.createElement('div'))
  flex.appendChild(document.createElement('div'))

  document.body.appendChild(flex)
  flexGapSupported = flex.scrollHeight === 1
  document.body.removeChild(flex)

  return flexGapSupported
}
