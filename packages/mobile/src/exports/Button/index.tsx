import React, { useState } from 'react'
import { run } from '@fexd/tools'

import createFC from '../createFC'
import Spinner from '../Spinner'
// import Iconfont from '../Iconfont'
import BasicButton, { ButtonClassNamePrefix as prefix } from '../BasicButton'
import { ButtonProps } from './type'

const Button = createFC<ButtonProps, any>(function Button(
  { loading: propLoading, icon, iconPosition, children, disabled, onClick, ...props },
  forwardedRef,
) {
  const autoLoading = propLoading === 'auto'
  const [loadingInside, setLoadingInside] = useState(false)
  const loading = autoLoading ? loadingInside : propLoading
  const content = [
    loading ? (
      <span key="loading" className={`${prefix}-spinner`}>
        <Spinner />
      </span>
    ) : null,
    !loading && !!icon ? (
      <span key="icon" className={`${prefix}-icon`}>
        {icon}
      </span>
    ) : null,
    !!children ? (
      <span key="content" className={`${prefix}-content`}>
        {children}
      </span>
    ) : null,
  ].filter(Boolean)

  return (
    <BasicButton
      {...props}
      ref={forwardedRef}
      disabled={(loading as boolean) || disabled}
      onClick={(...args) => {
        setLoadingInside(true)
        Promise.resolve(run(onClick, undefined, ...args)).finally(() => setLoadingInside(false))
      }}
    >
      <div className={`${prefix}-container`}>{iconPosition === 'right' ? content.reverse() : content}</div>
    </BasicButton>
  )
})

Button.defaultProps = {
  ...BasicButton.defaultProps,
  iconPosition: 'left',
  loading: 'auto',
}

export default Button
