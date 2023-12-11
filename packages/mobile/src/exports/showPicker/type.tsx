import React from 'react'

import { PickerViewProps, PickerOptionValue } from '../PickerView/type'
import { PopupProps } from '../Popup/type'
import AUTO_API from '../../helpers/AUTO_API'

export interface ShowPickerConfig extends PickerViewProps {
  /** 默认值 */
  defaultValue?: PickerOptionValue
  /** 是否可清除，将会显示 "---" 选项 */
  clearable?: boolean
  /** 弹出层的 props */
  popupProps?: Omit<PopupProps, 'visible' | 'children'>
  /** 头部右侧内容 */
  headerRight?: React.ReactNode
  /** 头部左侧内容 */
  headerLeft?: React.ReactNode
}

export default AUTO_API<ShowPickerConfig>()
