import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Avatar, Badge, Iconfont } from '@fexd/mobile'
import { Icon, LocationOutline } from '@fexd/icons'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础" inline>
      <Avatar src="https://img01.yzcdn.cn/vant/apple-2.jpg" />
      <Avatar>AK</Avatar>
      <Avatar>
        <Iconfont type="me" />
      </Avatar>
      <Avatar>
        <Icon type={LocationOutline} />
      </Avatar>
      <Avatar backgroundColor="#006BFF" color="#FFF">
        N
      </Avatar>
    </DemoBlock>

    <DemoBlock title="尺寸" inline>
      <Avatar size="small">A</Avatar>
      <Avatar size="normal">B</Avatar>
      <Avatar size="large">C</Avatar>
    </DemoBlock>

    <DemoBlock title="形状" inline>
      <Avatar>D</Avatar>
      <Avatar shape="square">E</Avatar>
    </DemoBlock>

    <DemoBlock title="徽章" inline>
      <Badge content="5">
        <Avatar shape="square">F</Avatar>
      </Badge>
      <Badge dot>
        <Avatar shape="square">G</Avatar>
      </Badge>
      <Badge color="#108ee9" dot style={{ '--top': '100%' }}>
        <Avatar shape="square">H</Avatar>
      </Badge>
    </DemoBlock>

    <DemoBlock title="最大个数">
      <Avatar.Group max={3}>
        <Avatar>I</Avatar>
        <Avatar>J</Avatar>
        <Avatar>K</Avatar>
        <Avatar>L</Avatar>
        <Avatar>M</Avatar>
      </Avatar.Group>
    </DemoBlock>

    <DemoBlock title="总个数">
      <Avatar.Group total={10}>
        <Avatar>I</Avatar>
        <Avatar>J</Avatar>
        <Avatar>K</Avatar>
        <Avatar>L</Avatar>
        <Avatar>M</Avatar>
      </Avatar.Group>
    </DemoBlock>

    <DemoBlock title="回调" inline>
      <Avatar src="/a.png" alt="M" />
      <Avatar src="/b.png">O</Avatar>
      <Avatar src="https://img01.yzcdn.cn/vant/apple-2.jpg">P</Avatar>
    </DemoBlock>
  </div>
)
