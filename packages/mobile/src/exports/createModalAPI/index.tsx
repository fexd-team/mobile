import React, { useEffect, useState } from 'react'
import { run } from '@fexd/tools'

import { stationMap } from '../ModalStation'
import { renderGlobalProvider } from '../Provider'
import enhancePromise from '../../helpers/enhancePromise'
import uniqueId from '../uniqueId'
import {
  OmitModalPropTypes,
  ModalType,
  MethodType,
  MethodConfig,
  ModalMethodProps,
  BasicModalMethodProps,
} from './type'

export default function createModalAPI<P>(
  ModalComponent: ModalType<P>,
  initialProps?: Omit<P, OmitModalPropTypes>,
): MethodType<P> {
  function show({ stationId = 'DEFAULT_STATION', ...props }: MethodConfig<P>) {
    let closeModal: any
    let updateModal: any
    const promise = enhancePromise()

    function close() {
      run(closeModal)
    }
    function update(updateProps: ModalMethodProps<P>) {
      run(updateModal, undefined, updateProps)
    }

    const controller = { close, update, promise }

    function renderModal() {
      const station = stationMap[stationId]
      const { modalId = uniqueId() } = props

      function ModalContainer(initialProps: ModalMethodProps<P> & BasicModalMethodProps) {
        const [visible, setVisible] = useState(true)
        const [modalProps, setModalProps] = useState(initialProps)
        const { content, onDestroyed, ...props } = modalProps

        useEffect(() => {
          closeModal = () => setVisible(false)
          updateModal = (updateProps: ModalMethodProps<P>) => {
            setModalProps((modalProps: ModalMethodProps<P>) => ({
              ...modalProps,
              ...updateProps,
            }))
          }
        }, [])

        return (
          <ModalComponent
            {...props}
            visible={visible}
            onClose={close}
            destroyOnExit
            onDestroyed={(...args: any[]) => {
              run(onDestroyed, undefined, ...args)
              promise.resolve()
              run(station, 'remove', modalId)
            }}
          >
            {run(content, undefined, controller)}
          </ModalComponent>
        )
      }
      const render = () => <ModalContainer {...initialProps} {...props} />

      run(station, 'add', modalId, render)
    }

    if (stationId === 'DEFAULT_STATION' && !stationMap[stationId]) {
      renderGlobalProvider().then(() => {
        renderModal()
      })
    } else {
      renderModal()
    }

    return controller
  }

  return show
}
