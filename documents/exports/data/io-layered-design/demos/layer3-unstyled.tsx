import React, { useState } from 'react'
import { LineInput, BlockInput, CellInput, DemoBlock } from '@fexd/mobile'

export default () => {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')

  return (
    <>
      <DemoBlock title="第 3 层：Unstyled 组件 - 同一逻辑，不同主题">
        <LineInput
          label="用户名"
          placeholder="请输入用户名"
          value={value1}
          onChange={setValue1}
          helper="LineInput = UnstyledIOInput + LineLabel"
          clearable
        />

        <BlockInput
          label="用户名"
          placeholder="请输入用户名"
          value={value2}
          onChange={setValue2}
          helper="BlockInput = UnstyledIOInput + BlockLabel"
          clearable
        />

        <CellInput
          label="用户名"
          placeholder="请输入用户名"
          value={value3}
          onChange={setValue3}
          helper="CellInput = UnstyledIOInput + CellLabel"
          clearable
        />
      </DemoBlock>
    </>
  )
}
