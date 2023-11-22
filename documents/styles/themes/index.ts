const themedReg = /themed-(\w)+/g

export const themes = ['default', 'asetku']
export function applyTheme(theme: string) {
  const currenClassName = document.body.className || ''
  const themedClassName = `themed-${theme}`

  if (themedReg.test(currenClassName)) {
    document.body.className = currenClassName.replace(themedReg, themedClassName)
  } else {
    try {
      document.body.classList.add(themedClassName)
    } catch (err) {
      document.body.className = `${currenClassName} ${themedClassName}`
    }
  }
}
