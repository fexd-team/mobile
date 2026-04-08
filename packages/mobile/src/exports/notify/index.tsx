import React from 'react'
import { run } from '@fexd/tools'

import { SPEED_MAP } from '../createTransition'
import Notify from './Notify'
import { NotifyProps } from './Notify/type'
import modalConflict from '../modalConflict'
import createModalAPI from '../createModalAPI'

const showNotify = createModalAPI(Notify, {
  shareMask: true,
  onConflict: modalConflict.extend(modalConflict.handlers.hidden, {
    types: ['notify'],
  }),
})

interface NotifyMethodConfig extends Omit<NotifyProps, 'visible' | 'children'> {
  duration?: number
}

const globalDefaultConfig: NotifyMethodConfig = {
  ...Notify.defaultProps,
  duration: 2600,
}

const createNotifyMethod = (methodDefaultConfig: NotifyMethodConfig) => {
  const method = (content: React.ReactNode, config?: NotifyMethodConfig) => {
    const { duration, onExited, ...props } = {
      ...globalDefaultConfig,
      ...methodDefaultConfig,
      ...config,
    }
    const controller = showNotify({
      ...props,
      onExited: (...args: any[]) => {
        run(onExited, undefined, ...args)
      },
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

  method.defaultConfig = methodDefaultConfig
  return method
}

const info = createNotifyMethod({})

const success = createNotifyMethod({
  notifyType: 'success',
})

const warning = createNotifyMethod({
  notifyType: 'warning',
})

const error = createNotifyMethod({
  notifyType: 'error',
})

const notify = {
  info,
  success,
  warning,
  error,
  defaultConfig: globalDefaultConfig,
}

export default notify
