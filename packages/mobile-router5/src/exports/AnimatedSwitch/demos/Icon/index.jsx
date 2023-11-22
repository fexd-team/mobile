import React from 'react'
import { source } from '@fexd/tools'
import { Iconfont } from '@fexd/mobile'

import './style.module.less'

source.css('https://at.alicdn.com/t/font_622014_wkh62u19ggs.css')

export default function Icon(props) {
  return (
    <span className="demo-icon-1">
      <Iconfont {...props} />
    </span>
  )
}
