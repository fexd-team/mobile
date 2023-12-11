import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'

import { UnstyledLabelPureProps } from '../UnstyledLabel/type'

export type UnstyledIOLabelRef = any

export interface UnstyledIOLabelProps extends Omit<UnstyledLabelPureProps, 'ref'> {
  /** 区域的错误 */
  error?: React.ReactNode
  /** 是否禁用 */
  disabled?: boolean
  /** 是否聚焦 */
  focused?: boolean
  /**
   * @description 聚焦时是否隐藏错误信息
   * @default false
   */
  hideErrorWhenFocusing?: boolean
  ref?: React.Ref<UnstyledIOLabelRef>
  /** 辅助信息的前缀 */
  helperPrefix?: React.ReactNode | ((hasError: boolean) => React.ReactNode)
  theme?: any
}

export default AUTO_API<UnstyledIOLabelProps>()
