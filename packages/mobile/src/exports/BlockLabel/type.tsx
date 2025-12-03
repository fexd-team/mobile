import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'

import { UnstyledLabelProps } from '../UnstyledLabel/type'

export interface BlockLabelProps extends UnstyledLabelProps {}

export default AUTO_API<BlockLabelProps>()

/**
 * BlockLabel 样式变量
 */
export interface BlockLabelStyleVars {
  /**
   * @description 包裹容器上下内边距
   * @default 6px
   */
  '@block-label-wrapper-padding-y'?: string
  /**
   * @description 标签栏高度
   * @default 60px
   */
  '@block-label-bar-height'?: string
  /**
   * @description 标签栏圆角大小
   * @default 8px
   */
  '@block-label-bar-border-radius'?: string
  /**
   * @description 标签栏边框颜色
   * @default @ant-color-gray-10
   */
  '@block-label-bar-border-color'?: string
  /**
   * @description 标签栏下边距
   * @default 4px
   */
  '@block-label-bar-margin-bottom'?: string
  /**
   * @description 内容区域左右内边距
   * @default 14px
   */
  '@block-label-content-padding-x'?: string
  /**
   * @description 内容区域上下内边距
   * @default 8px
   */
  '@block-label-content-padding-y'?: string
  /**
   * @description 激活态内容区域顶部内边距
   * @default 20px
   */
  '@block-label-content-padding-top-active'?: string
  /**
   * @description 内容文字大小
   * @default 14px
   */
  '@block-label-content-font-size'?: string
  /**
   * @description 内容文字颜色
   * @default @ant-color-gray-10
   */
  '@block-label-content-color'?: string
  /**
   * @description 标签高度
   * @default 24px
   */
  '@block-label-label-height'?: string
  /**
   * @description 标签文字大小
   * @default 14px
   */
  '@block-label-label-font-size'?: string
  /**
   * @description 激活态标签文字大小
   * @default 12px
   */
  '@block-label-label-font-size-active'?: string
  /**
   * @description 标签文字颜色
   * @default #666
   */
  '@block-label-label-color'?: string
  /**
   * @description 激活态标签顶部偏移
   * @default 7px
   */
  '@block-label-label-top-active'?: string
  /**
   * @description 占位符文字颜色
   * @default #999
   */
  '@block-label-placeholder-color'?: string
  /**
   * @description 占位符顶部内边距
   * @default 22px
   */
  '@block-label-placeholder-padding-top'?: string
  /**
   * @description 辅助文字大小
   * @default 12px
   */
  '@block-label-helper-font-size'?: string
  /**
   * @description 辅助文字最小高度
   * @default 18px
   */
  '@block-label-helper-min-height'?: string
  /**
   * @description 辅助文字左右内边距
   * @default 4px
   */
  '@block-label-helper-padding-x'?: string
  /**
   * @description 前缀元素左内边距
   * @default 14px
   */
  '@block-label-prefix-padding-left'?: string
  /**
   * @description 后缀元素右内边距
   * @default 14px
   */
  '@block-label-suffix-padding-right'?: string
  /**
   * @description 光标颜色
   * @default @color-primary
   */
  '@block-label-caret-color'?: string
  /**
   * @description 信息态边框颜色
   * @default @ant-color-gray-5
   */
  '@block-label-info-border-color'?: string
  /**
   * @description 信息态辅助文字颜色
   * @default @ant-color-gray-7
   */
  '@block-label-info-helper-color'?: string
  /**
   * @description 成功态边框颜色
   * @default @color-green
   */
  '@block-label-success-border-color'?: string
  /**
   * @description 成功态辅助文字颜色
   * @default @color-green
   */
  '@block-label-success-helper-color'?: string
  /**
   * @description 警告态边框颜色
   * @default @color-orange
   */
  '@block-label-warn-border-color'?: string
  /**
   * @description 警告态辅助文字颜色
   * @default @color-orange
   */
  '@block-label-warn-helper-color'?: string
  /**
   * @description 错误态边框颜色
   * @default @color-red
   */
  '@block-label-error-border-color'?: string
  /**
   * @description 错误态辅助文字颜色
   * @default @color-red
   */
  '@block-label-error-helper-color'?: string
  /**
   * @description 禁用态边框颜色
   * @default @ant-color-gray-5
   */
  '@block-label-disabled-border-color'?: string
  /**
   * @description 禁用态文字颜色
   * @default @ant-color-gray-5
   */
  '@block-label-disabled-color'?: string
}

export const DOC_BlockLabelStyleVars = AUTO_API<BlockLabelStyleVars>()
