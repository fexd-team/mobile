import React from 'react'
import { copy } from '@fexd/tools'
import { Grid, Iconfont, DemoBlock } from '@fexd/mobile'
import iconfontList from './iconfont-list'

import './style.module.less'

Iconfont.loadIconfont()

export default () => (
  <DemoBlock title="内置图标库（点击可复制代码）">
    <Grid square>
      {iconfontList.map((name) => (
        <Grid.Item
          key={name}
          className="demo-icon-content"
          onClick={() => {
            copy(`<Iconfont type="${name}" />`)
          }}
        >
          <Iconfont type={name} svg />
          <div className="demo-icon-tag">{name}</div>
        </Grid.Item>
      ))}
    </Grid>
  </DemoBlock>
)
