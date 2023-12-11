import React, { useState } from 'react'
import { ChevronBack, EllipsisHorizontal } from '@fexd/icons'
import { NavBar, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => {
  return (
    <div className="demo-nav-bar">
      <NavBar>标题居中（默认）</NavBar>
      <NavBar left={<ChevronBack />}>左侧图标</NavBar>
      <NavBar right={<EllipsisHorizontal />}>右侧图标</NavBar>
      <NavBar left={<ChevronBack />} right={<EllipsisHorizontal />}>
        左右侧图标
      </NavBar>

      <NavBar>无左右侧很长很长的标题很长很长的标题很长很长的标题很长很长的标题很长很长的标题</NavBar>
      <NavBar left={<ChevronBack />}>
        左侧图标很长很长的标题很长很长的标题很长很长的标题很长很长的标题很长很长的标题
      </NavBar>
      <NavBar right={<EllipsisHorizontal />}>
        右侧图标很长很长的标题很长很长的标题很长很长的标题很长很长的标题很长很长的标题
      </NavBar>
      <NavBar left={<ChevronBack />} right={<EllipsisHorizontal />}>
        左右侧很长很长的标题很长很长的标题很长很长的标题很长很长的标题很长很长的标题
      </NavBar>

      <NavBar
        left={
          <div className="demo-nav-bar-left-arrow-content">
            <ChevronBack />
            返回
          </div>
        }
        right="更多"
      >
        自定义左右侧
      </NavBar>

      <NavBar alignCenter={false}>标题不居中</NavBar>
      <NavBar alignCenter={false} left={<ChevronBack />}>
        左侧内容标题不居中
      </NavBar>
      <NavBar alignCenter={false} right={<EllipsisHorizontal />}>
        右侧内容标题不居中
      </NavBar>
    </div>
  )
}
