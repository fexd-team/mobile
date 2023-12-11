import React from 'react'
import { List, toast, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <List header={() => <h1>我的 List 的头部</h1>}>
        {[1, 2, 3].map((item) => (
          <List.Item key={item}>{`第${item}项`}</List.Item>
        ))}
      </List>
    </DemoBlock>

    <DemoBlock title="进阶">
      <List headerBorder={true} header={() => <h1>List Item 属性</h1>}>
        <List.Item
          border={false}
          extra={() => <button onClick={() => toast.info('click the extra button')}>EXTRA</button>}
          onClick={() => {
            toast.info(`click the List.Item's area 1`)
          }}
        >
          木有下边框线的我
        </List.Item>
        <List.Item
          onClick={() => {
            toast.info(`click the List.Item's area 2`)
          }}
        >
          木有设置extra属性的值，但设置了onclick属性，会有右箭头的我
        </List.Item>
        <List.Item>normal List.Item</List.Item>
      </List>
    </DemoBlock>
  </div>
)
