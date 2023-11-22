import React, { useState } from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import ControlPanel from '@documents/components/ControlPanel'
import { Steps, Iconfont } from '@fexd/mobile'

const data = Array.from(new Array(3)).map((item, index) => ({
  title: index + 1,
  description: `步骤${index + 1}`,
}))

const data2 = Array.from(new Array(6)).map((item, index) => ({
  title: index + 1,
  description: `步骤${index + 1}`,
}))

export default () => {
  const [step1, setStep1] = useState(2)
  const [step2, setStep2] = useState(2)
  return (
    <>
      <DemoBlock title="配置式：通过 data 属性来定义多个步骤">
        <Steps data={data} />
      </DemoBlock>
      <DemoBlock title="配置式：大于等于五个会自动省略中间步骤">
        <Steps value={step1} data={data2} />
        <ControlPanel onPlus={() => setStep1(step1 + 1)} onMinus={() => setStep1(step1 - 1)}>
          当前步骤：{step1}
        </ControlPanel>
      </DemoBlock>
      <DemoBlock title="配置式：自适应宽度">
        <Steps value={2} data={data} type="flex" />
      </DemoBlock>
      <DemoBlock title="配置式：已过步骤打钩">
        <Steps value={step2} data={data} checked={true} />
        <ControlPanel onPlus={() => setStep2(step2 + 1)} onMinus={() => setStep2(step2 - 1)}>
          当前步骤：{step2}
        </ControlPanel>
      </DemoBlock>
      <DemoBlock title="组件式：通过 step 属性来表明当前步骤">
        <Steps>
          <Steps.Item step={1} />
          <Steps.Item step={2} />
          <Steps.Item step={5} />
        </Steps>
      </DemoBlock>
      <DemoBlock title="组件式：有 title 和 children 的步骤">
        <Steps>
          <Steps.Item step={1} title="title" />
          <Steps.Item step={2}>children</Steps.Item>
          <Steps.Item step={3} title="title">
            children
          </Steps.Item>
        </Steps>
      </DemoBlock>
      <DemoBlock title="组件式：带状态的步骤">
        <Steps>
          <Steps.Item step={1} type="error" title="error" />
          <Steps.Item step={2} type="completed" title="completed" />
          <Steps.Item step={3} type="process" title="process" />
          <Steps.Item step={4} type="default" title="default" />
        </Steps>
      </DemoBlock>
      <DemoBlock title="组件式：自定义图标">
        <Steps>
          <Steps.Item icon={<Iconfont type="anger" />} step={1} type="error" title="error" />
          <Steps.Item icon={<Iconfont type="anger" />} step={2} type="completed" title="completed" />
          <Steps.Item icon={<Iconfont type="anger" />} step={3} type="process" title="process" />
          <Steps.Item icon={<Iconfont type="anger" />} step={4} type="default" title="default" />
        </Steps>
      </DemoBlock>
    </>
  )
}
