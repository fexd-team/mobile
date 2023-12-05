import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { BasicButtonProps } from '../BasicButton/type'

export interface ButtonProps extends BasicButtonProps {
  /** 图标名称或节点 */
  icon?: React.ReactNode

  /** 图标位置 */
  iconPosition?: 'left' | 'right'

  /** 是否为加载中状态 */
  loading?: boolean | 'auto'
}

export default AUTO_API<ButtonProps>()
