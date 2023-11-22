import React, { useState, useEffect, useMemo } from 'react'
import { run, debounce, isFunction, classnames } from '@fexd/tools'

import uniqueId from '../uniqueId'
import BasicModal, { ModalClassNamePrefix as prefix } from '../BasicModal'
import { TransitionType } from '../createTransition/type'
import modalStore from '../modalStore'
import { ModalControlEvent, ModalStoreData } from '../modalStore/type'
import TransitionFade from '../TransitionFade'
import Overlay from '../Overlay'
import SharedOverlay from './SharedOverlay'
import { ModalProps, ModalConflictProps } from './type'
import createFC from '../../helpers/createFC'

const Modal = createFC<ModalProps, HTMLDivElement>(function Modal(
  { visible, modalId, children, onConflict, shareMask, contentClassName, ...props },
  forwardedRef,
) {
  const [currentModalId] = useState(() => modalId ?? uniqueId('modal'))
  const [conflictProps, setConflictProps] = useState<ModalConflictProps>({})
  const modalProps = useMemo(
    () => ({
      ...props,
      ...conflictProps,
    }),
    [props, conflictProps],
  )
  const {
    contentVisible,
    contentTransition,
    contentTransitionSpeed,
    contentMask,
    contentMaskTransition,
    ...mergedProps
  } = modalProps
  const ContentTransition = contentTransition as TransitionType
  const { mask: useMask, maskClassName, maskTransparent, maskTransition, transitionSpeed } = mergedProps
  const useSharedMask = shareMask && useMask

  if (useSharedMask) {
    modalProps.maskTransparent = true
  }

  useEffect(() => {
    if (!isFunction(onConflict)) {
      return
    }
    const conflictHandler = debounce((current: ModalStoreData, event: ModalControlEvent, type: 'open' | 'close') => {
      const all = modalStore.getAll()
      Promise.resolve(
        (run(onConflict, undefined, {
          all,
          store: modalStore,
          event,
          type,
          current,
        }) ?? {}) as ModalConflictProps,
      ).then(setConflictProps)
    })
    const createHandler = (type: 'open' | 'close') => (event: ModalControlEvent) => {
      const current = modalStore.getById(currentModalId)
      // 排除自身事件
      if (!current || event.modalId === currentModalId) {
        return
      }

      switch (type) {
        case 'close': {
          conflictHandler(current, event, type)
          return
        }
        case 'open':
        default: {
          conflictHandler(current, event, type)
        }
      }
    }
    const modalOpenHandler = createHandler('open')
    const modalCloseHandler = createHandler('close')
    const { eventBus } = modalStore
    eventBus.on('open', modalOpenHandler)
    eventBus.on('close', modalCloseHandler)

    return () => {
      eventBus.off('open', modalOpenHandler)
      eventBus.off('close', modalCloseHandler)
    }
  }, [])

  return (
    <BasicModal
      {...mergedProps}
      maskTransparent={modalProps.maskTransparent}
      modalId={currentModalId}
      visible={visible}
      storeProps={modalProps}
      ref={forwardedRef}
    >
      <ContentTransition in={contentVisible} speed={contentTransitionSpeed} unmountOnExit={false}>
        <div className={classnames(`${prefix}-content`, contentClassName)}>
          {children}
          <Overlay
            visible={contentMask as boolean}
            transition={contentMaskTransition}
            transitionSpeed={transitionSpeed}
            absolute
          />
        </div>
      </ContentTransition>
      {useSharedMask && (
        <SharedOverlay
          modalId={currentModalId}
          visible={visible}
          className={maskClassName}
          transparent={maskTransparent}
          transition={maskTransition}
          transitionSpeed={transitionSpeed}
        />
      )}
    </BasicModal>
  )
})

Modal.defaultProps = {
  ...BasicModal.defaultProps,
  shareMask: false,
  contentVisible: true,
  contentTransition: TransitionFade,
  contentTransitionSpeed: 'fast',
  contentMask: false,
  contentMaskTransition: TransitionFade,
}

export default Modal
