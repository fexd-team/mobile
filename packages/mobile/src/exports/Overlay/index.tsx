import React, { useRef, useImperativeHandle } from 'react'
import { classnames } from '@fexd/tools'

import { TransitionType, TransitionSpeed } from '../createTransition/type'
import useScrollLock from '../useScrollLock'
import TransitionFade from '../TransitionFade'
import createFC from '../../helpers/createFC'

export interface OverlayProps {
  visible: boolean // 是否显示遮罩
  onClick?: React.MouseEventHandler<HTMLElement> // 遮罩点击事件，可用于隐藏遮罩
  className?: string // 遮罩类名
  transparent?: boolean // 遮罩是否透明
  transition?: TransitionType // 遮罩出入的动画类型
  transitionSpeed?: TransitionSpeed // 动画速度
  children?: React.ReactNode // 遮罩内容
  absolute?: boolean // 是否绝对定位，用作相对区域遮罩，默认为 fixed
}

const prefix = 'exd-overlay'
// const htmlNode = document.getElementsByTagName('html')[0]
const bodyNode = document.body

const Overlay = createFC<OverlayProps, HTMLDivElement>(function Overlay(
  { visible, className, transparent, transition, transitionSpeed, absolute, ...props },
  forwardedRef,
) {
  const Transition = transition as TransitionType
  const maskRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(forwardedRef, () => maskRef.current as HTMLDivElement)
  useScrollLock({
    elements: [bodyNode, () => maskRef.current],
    lock: !absolute && visible,
  })

  return (
    <Transition in={visible} speed={transitionSpeed}>
      <div
        className={classnames(prefix, className, {
          [`${prefix}-transparent`]: transparent,
          [`${prefix}-absolute`]: absolute,
        })}
        ref={maskRef}
        {...props}
      />
    </Transition>
  )
})

Overlay.defaultProps = {
  transparent: false,
  transition: TransitionFade,
  absolute: false,
}

export const OverlayClassNamePrefix = prefix
export default Overlay
