import React from 'react'

import { Picker, Button, toast, showPicker, DemoBlock } from '@fexd/mobile'

export default () => (
  <>
    <DemoBlock title="基础">
      <Picker
        defaultValue={'6'}
        options={Array(12)
          .fill('')
          .map((item, idx) => ({
            label: `数字${idx}`,
            value: String(idx),
          }))}
        onChange={console.log}
      >
        {(label) => <Button type="primary">点击我选择你的幸运数字: {label}</Button>}
      </Picker>

      <Button
        onClick={async () => {
          const value = await showPicker({
            defaultValue: '6',
            options: '0123456789'.split('').map((item) => ({
              label: `数字${item}`,
              value: item,
            })),
          })
          toast.info(`你选择了：${value}`)
        }}
      >
        命令式 showPicker
      </Button>
    </DemoBlock>
  </>
)
