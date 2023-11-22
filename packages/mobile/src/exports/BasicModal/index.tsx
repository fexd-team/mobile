import React, { useEffect, useState, useRef, useCallback, useImperativeHandle } from 'react'
import { classnames, run } from '@fexd/tools'

import { ModalLevel, BasicModalProps } from './type'
import { TransitionType } from '../createTransition/type'
import TransitionFade from '../TransitionFade'
import Overlay from '../Overlay'
import Portal from '../Portal'
import modalStore from '../modalStore'
import createFC from '../../helpers/createFC'

const prefix = 'exd-modal'
const BasicModal = createFC<BasicModalProps, HTMLDivElement>(function BasicModal(modalProps, forwardedRef) {
  const {
    portalTo,
    modalId,
    visible: propVisible,
    onClose,
    className,
    level,
    type,
    portalClassName,
    scrollable: propScrollable,
    placement,
    transition,
    transitionSpeed,
    mask: useMask,
    maskClassName,
    maskClosable: propMaskClosable,
    maskTransparent,
    maskTransition,
    onCreated,
    onEnter,
    onEntered,
    onExit,
    onExited,
    onDestroyed,
    children,
    onClick,
    destroyOnExit,
    storeProps = modalProps,
    ...props
  } = modalProps
  const scrollable = useMask ? propScrollable : false // 若不使用 mask 则不允许开启 scrollable
  const maskClosable = useMask ? propMaskClosable : false // 若不使用 mask 则不允许开启 maskClosable
  const Transition = transition as TransitionType
  const [created, setCreated] = useState<boolean>(propVisible)
  const [visible, setVisible] = useState<boolean>(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const currentModalStoreData = modalStore.getById(modalId)

  useImperativeHandle(forwardedRef, () => contentRef.current as HTMLDivElement)

  if (currentModalStoreData) {
    currentModalStoreData.props = storeProps
  }

  useEffect(() => {
    if (!visible) {
      return
    }
    const modalInfo = {
      modalId,
      level: level as ModalLevel,
      type,
      props: storeProps,
      setCreated,
      setVisible,
      contentRef,
    }
    modalStore.addModal(modalId, modalInfo)

    return () => {
      modalStore.removeModal(modalId)
    }
  }, [visible])

  useEffect(() => {
    ;(created ? setVisible : setCreated)(propVisible)
  }, [propVisible])

  useEffect(() => {
    setVisible(created)
  }, [created])

  useEffect(() => {
    if (!created) {
      return
    }
    run(onCreated)
    return () => {
      run(onDestroyed)
    }
  }, [created])

  const handleContentClose = useCallback<React.MouseEventHandler<HTMLElement>>(
    (event) => {
      if (event.target !== contentRef.current) {
        return
      }
      run(onClick, undefined, event)
      if (!event.defaultPrevented) {
        run(onClose)
      }
    },
    [onClose],
  )

  // console.log('props', props)

  return created ? (
    <Portal
      className={classnames(`${prefix}-portal`, portalClassName, {
        [`${prefix}-level-${level}`]: !!level,
      })}
      to={portalTo}
    >
      {useMask && (
        <Overlay
          visible={visible}
          className={classnames(`${prefix}-mask`, maskClassName)}
          transparent={maskTransparent}
          transition={maskTransition}
          transitionSpeed={transitionSpeed}
          onClick={maskClosable ? onClose : undefined}
        />
      )}
      <Transition
        in={visible}
        speed={transitionSpeed}
        onEnter={onEnter}
        onEntered={onEntered}
        onExit={onExit}
        onExited={(...args) => {
          ;(destroyOnExit ? setCreated : setVisible)(false)
          run(onExited, undefined, ...args)
        }}
        mountOnEnter
        unmountOnExit={destroyOnExit}
        style={props.style}
      >
        <div
          {...props}
          onClick={maskClosable ? handleContentClose : undefined}
          className={classnames(prefix, className, {
            [`${prefix}-${placement}`]: !!placement,
            [`${prefix}-scrollable`]: scrollable,
          })}
          ref={contentRef}
        >
          {children}
        </div>
      </Transition>
    </Portal>
  ) : null
})

BasicModal.defaultProps = {
  placement: 'center',
  mask: true,
  maskClosable: true,
  maskTransparent: false,
  level: 'normal',
  transition: TransitionFade,
  transitionSpeed: 'fast',
  destroyOnExit: true,
}

export const ModalClassNamePrefix = prefix
export default BasicModal
