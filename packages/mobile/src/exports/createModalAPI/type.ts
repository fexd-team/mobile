import React from 'react'

import Modal from '../../exports/Modal'
import { ModalProps } from '../../exports/Modal/type'

export type OmitModalPropTypes = 'visible' | 'onClose' | 'children' | 'destroyOnExit'
export type BasicModalMethodProps = Omit<ModalProps, OmitModalPropTypes>
export type ModalType<P> = React.FC<P | BasicModalMethodProps> | typeof Modal
export type MethodContentType<P> = React.ReactNode | ((controller: ModalMethodController<P>) => React.ReactNode)
export type MethodType<P> = (
  methodConfig: Omit<P & MethodConfig<P> & BasicModalMethodProps, OmitModalPropTypes>,
) => ModalMethodController<P>

export type ModalMethodProps<P> = (P | BasicModalMethodProps) & {
  content?: MethodContentType<P>
}
export type MethodConfig<P> = (ModalMethodProps<P> & BasicModalMethodProps) & {
  stationId?: string
}

export type ModalMethodController<P> = {
  close: () => void
  update: (updateProps: ModalMethodProps<P>) => void
  promise: Promise<void>
}
