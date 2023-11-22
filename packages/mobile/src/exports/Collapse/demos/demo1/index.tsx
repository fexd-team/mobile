import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Collapse } from '@fexd/mobile'
import { Icon, EllipsisHorizontal } from '@fexd/icons'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock plain title="基础">
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel title="第一项" key="1">
          <div>11111</div>
        </Collapse.Panel>
        <Collapse.Panel title="第二项" key="2">
          <div>
            <div>2222</div>
            <div>2222</div>
          </div>
        </Collapse.Panel>
        <Collapse.Panel title="第三项" key="3">
          <div>
            <div>333</div>
            <div>333</div>
            <div>333</div>
          </div>
        </Collapse.Panel>
      </Collapse>
    </DemoBlock>

    <DemoBlock plain title="手风琴">
      <Collapse accordion>
        <Collapse.Panel title="第一项" key="1">
          <div>11111</div>
        </Collapse.Panel>
        <Collapse.Panel title="第二项" key="2">
          <div>
            <div>2222</div>
            <div>2222</div>
          </div>
        </Collapse.Panel>
        <Collapse.Panel title="第三项" key="3">
          <div>
            <div>333</div>
            <div>333</div>
            <div>333</div>
          </div>
        </Collapse.Panel>
      </Collapse>
    </DemoBlock>

    <DemoBlock plain title="禁用">
      <Collapse iconRotate={false} expandIcon={<Icon type={EllipsisHorizontal} />}>
        <Collapse.Panel title="第一项" key="1">
          <div>11111</div>
        </Collapse.Panel>
        <Collapse.Panel title="第二项" key="2">
          <div>
            <div>2222</div>
            <div>2222</div>
          </div>
        </Collapse.Panel>
        <Collapse.Panel title="第三项" key="3" disabled>
          <div>
            <div>333</div>
            <div>333</div>
            <div>333</div>
          </div>
        </Collapse.Panel>
      </Collapse>
    </DemoBlock>
  </div>
)
