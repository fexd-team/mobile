import React from 'react'
import { run } from '@fexd/tools'
import Toast, { ToastClassNamePrefix as prefix } from './Toast'
import { CheckmarkCircleOutline, CloseCircleOutline, AlertCircleOutline } from '@fexd/icons'

import { SPEED_MAP } from '../createTransition'
import { ToastProps } from './Toast/type'
import modalConflict from '../modalConflict'
import createModalAPI from '../createModalAPI'

const showToast = createModalAPI(Toast, {
  shareMask: true,
  onConflict: modalConflict.extend(modalConflict.handlers.hidden, {
    types: ['toast'],
  }),
})

interface ToastMethodConfig extends Omit<ToastProps, 'visible' | 'children'> {
  duration?: number
}

const defaultConfig: ToastMethodConfig = {
  ...Toast.defaultProps,
  duration: 1800,
}

const info = (content: React.ReactNode, config: ToastMethodConfig = defaultConfig) => {
  const { duration, ...props } = {
    ...defaultConfig,
    ...config,
  }
  const controller = showToast({
    ...props,
    content,
  })

  const transitionDuration = SPEED_MAP[props?.transitionSpeed as any] ?? props?.transitionSpeed ?? 0
  const totalDuration = duration! + transitionDuration // 确保内容呈现的时间与 duration 一致，不受动画速度影响

  let timeout: any
  timeout = setTimeout(controller.close, totalDuration)

  return Object.assign(controller, {
    // 重新计时
    reclock() {
      clearTimeout(timeout)
      timeout = setTimeout(controller.close, totalDuration)
    },
  })
}

const success = (content: React.ReactNode, config: ToastMethodConfig = defaultConfig) =>
  info(content, {
    icon: <CheckmarkCircleOutline />,
    ...config,
  })

const fail = (content: React.ReactNode, config: ToastMethodConfig = defaultConfig) =>
  info(content, {
    icon: <CloseCircleOutline />,
    ...config,
  })

const warn = (content: React.ReactNode, config: ToastMethodConfig = defaultConfig) =>
  info(content, {
    icon: <AlertCircleOutline />,
    ...config,
  })

const toast = {
  info,
  success,
  fail,
  warn,
  defaultConfig,
}

export default toast
