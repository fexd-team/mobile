import React from 'react'
import createFC from '../createFC'
import { {{ name }}Props, {{ name }}Ref, {{ name }}Type } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-{{kebabCaseName}}'
const {{ name }} = createFC<{{ name }}Props, {{ name }}Ref>(function {{ name }}(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      {{ name }}
    </div>
  )
}) as {{ name }}Type

{{ name }}.defaultProps = {}

export default {{ name }}
