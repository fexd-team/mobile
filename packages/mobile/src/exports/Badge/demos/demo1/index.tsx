import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Badge } from '@fexd/mobile'
import { Icon, EllipsisHorizontal } from '@fexd/icons'

import './style.module.less'

export default () => {
  return (
    <div className="demo-badge">
      <DemoBlock inline title="基础">
        <Badge content="5">
          <div className="demo-badge-box" />
        </Badge>
        <Badge content="新">
          <div className="demo-badge-box" />
        </Badge>
        <Badge content="更新啦">
          <div className="demo-badge-box" />
        </Badge>
        <Badge>
          <div className="demo-badge-box" />
        </Badge>
      </DemoBlock>

      <DemoBlock inline title="主题类型和自定义颜色">
        <Badge dot type="primary">
          <div className="demo-badge-box" />
        </Badge>
        <Badge dot type="success">
          <div className="demo-badge-box" />
        </Badge>
        <Badge dot type="warning">
          <div className="demo-badge-box" />
        </Badge>
        <Badge dot type="danger">
          <div className="demo-badge-box" />
        </Badge>
        <Badge dot bgColor="#eee">
          <div className="demo-badge-box" />
        </Badge>
      </DemoBlock>

      <DemoBlock inline title="自定义偏移量">
        <Badge dot offset={['100', '100']}>
          <div className="demo-badge-box" />
        </Badge>
        <Badge dot offset={['100', 0]}>
          <div className="demo-badge-box" />
        </Badge>
        <Badge dot>
          <div className="demo-badge-box" />
        </Badge>
        <Badge dot offset={[0, 100]}>
          <div className="demo-badge-box" />
        </Badge>
      </DemoBlock>

      <DemoBlock inline title="徽标内容">
        <Badge content={<Icon type={EllipsisHorizontal} />} className="badgeIcon">
          <div className="demo-badge-box" />
        </Badge>
        <Badge content="999" overflowCount="99">
          <div className="demo-badge-box" />
        </Badge>
      </DemoBlock>
      <DemoBlock inline title="独立展示">
        <Badge content="999+" />
        <Badge content="999+" color="#FAAD14" bgColor="white" />
      </DemoBlock>
      <DemoBlock inline title="业务组件">
        <Badge.Stamp text="戳">
          <div className="demo-badge-box" />
        </Badge.Stamp>
      </DemoBlock>
    </div>
  )
}
