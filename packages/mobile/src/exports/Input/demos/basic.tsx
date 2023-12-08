import React, { useState, useRef } from 'react'
import BigNumber from 'bignumber.js'

import { BasicInput, TextArea } from '@fexd/mobile'
import DemoBlock from '@documents/components/DemoBlock'

export default () => {
  const [value, setValue] = useState<any>('124567')

  return (
    <>
      <DemoBlock title="基础">
        <BasicInput />
      </DemoBlock>

      <DemoBlock title="normalize / format">
        <BasicInput
          value={value}
          format={(value) => BigNumber(value).toFormat({ decimalSeparator: '.', groupSeparator: ',', groupSize: 3 })}
          normalize={(value) => value.replace(/\D/g, '')}
          onChange={(value) => {
            console.log('onChange', value)
            setValue(value)
          }}
        />
      </DemoBlock>

      <DemoBlock title="TextArea">
        <TextArea
          format={(value) => BigNumber(value).toFormat({ decimalSeparator: '.', groupSeparator: ',', groupSize: 3 })}
          normalize={(value) => value.replace(/\D/g, '')}
        />
      </DemoBlock>

      <DemoBlock title="TextArea 自动高度">
        <TextArea height="auto" />
      </DemoBlock>
    </>
  )
}
