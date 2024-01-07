import React from 'react'
import { Stepper, Space, DemoBlock } from '@fexd/mobile'
import BigNumber from 'bignumber.js'

export default () => (
  <>
    <DemoBlock title="基础">
      <Stepper />
    </DemoBlock>

    <DemoBlock title="步长" inline>
      <Stepper defaultValue={10} step={10} />
      <Stepper defaultValue={10} step={[1, 100]} />
    </DemoBlock>

    <DemoBlock title="最大值 / 最小值">
      <Stepper min={5} max={10} />
    </DemoBlock>

    <DemoBlock title="禁用">
      <Stepper disabled />
    </DemoBlock>

    <DemoBlock title="自定义宽度">
      <Stepper style={{ width: 200 }} />
    </DemoBlock>

    <DemoBlock title="允许清空">
      <Stepper allowEmpty />
    </DemoBlock>

    <DemoBlock title="输入框只读">
      <Stepper readOnly />
    </DemoBlock>

    <DemoBlock title="格式化">
      <Stepper
        block
        step={999}
        format={(value) =>
          `$ ${BigNumber(value).toFormat({ decimalSeparator: '.', groupSeparator: ',', groupSize: 3 })}`
        }
        normalize={(value) => value.replace(/\D/g, '')}
      />
    </DemoBlock>

    <DemoBlock title="尺寸" inline>
      <Stepper size="small" />
      <Stepper size="normal" />
      <Stepper size="large" />
    </DemoBlock>

    <DemoBlock title="块级元素">
      <Stepper block size="small" />
      <Stepper block size="normal" />
      <Stepper block size="large" />
    </DemoBlock>

    <DemoBlock title="自定义加减">
      <Stepper onPlus={(value) => value + 666} onMinus={(value) => value - 666} />
    </DemoBlock>
  </>
)
