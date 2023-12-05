import React from 'react'
import createFC from '../createFC'
import { FooterProps, FooterRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-footer'
const Footer = createFC<FooterProps, FooterRef>(function Footer(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      Footer
    </div>
  )
})

Footer.defaultProps = {}

export default Footer
