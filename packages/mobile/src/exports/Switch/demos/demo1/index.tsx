import React, { useState } from 'react'
import { Switch, DemoBlock } from '@fexd/mobile'
import './style.module.less'

const Demo = () => {
  const [checked, setChecked] = useState<boolean>(true)

  return (
    <>
      <DemoBlock title="基础" inline>
        <Switch />
      </DemoBlock>

      <DemoBlock title="受控模式：" inline>
        <Switch checked={checked} onChange={setChecked} />
        <Switch checked={checked} onChange={setChecked} />
      </DemoBlock>
    </>
  )
}

export default Demo
