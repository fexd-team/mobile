import React, { useState, useCallback } from 'react'
// import Iconfont from '../Iconfont'
import {
  InformationCircleOutline,
  CheckmarkCircleOutline,
  AlertCircleOutline,
  WarningOutline,
  CloseOutline,
} from '@fexd/icons'
import TransitionFade from '../TransitionFade'
import { classnames } from '@fexd/tools'
import createFC from '../createFC'
import { types, variantTypes, AlertProps, AlertRef } from './type'

export const prefix = 'exd-alert'
const Alert = createFC<AlertProps, AlertRef>(function Alert(props, ref) {
  const {
    type = 'info',
    showIcon = true,
    closable = false,
    closeText,
    icon,
    variant,
    title,
    children,
    onClose,
    className,
    ...rest
  } = props
  const [close, setClose] = useState(true)

  const getIconByType = useCallback(() => {
    switch (type) {
      case 'info':
        return <InformationCircleOutline />
      case 'success':
        return <CheckmarkCircleOutline />
      case 'warning':
        return <WarningOutline />
      case 'error':
        return <AlertCircleOutline />
    }
  }, [type])

  const className2Use: string = classnames(prefix, className, {
    [`${prefix}-${type}`]: types.some((t) => t === type),
    [`${prefix}-${variant}`]: variantTypes.some((t) => t === variant),
    [`${prefix}-has-title`]: title,
  })

  return (
    <TransitionFade in={close}>
      <div className={className2Use} ref={ref} {...rest}>
        <div className={`${prefix}-icon`}>{showIcon && (icon ? icon : getIconByType())}</div>
        <div className={`${prefix}-content`}>
          {title && <div className={`${prefix}-content-title`}>{title}</div>}
          {children}
        </div>
        <div
          className={`${prefix}-close`}
          onClick={(e) => {
            setClose(false)
            if (typeof onClose === 'function') onClose(e)
          }}
        >
          {closable && (closeText ? closeText : <CloseOutline />)}
        </div>
      </div>
    </TransitionFade>
  )
})

Alert.defaultProps = {}

export default Alert
