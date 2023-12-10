import React, { useState } from 'react'
import BigNumber from 'bignumber.js'

import { BasicInput, BasicTextArea } from '@fexd/mobile'
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

      <DemoBlock title="BasicTextArea">
        <BasicTextArea
          format={(value) => BigNumber(value).toFormat({ decimalSeparator: '.', groupSeparator: ',', groupSize: 3 })}
          normalize={(value) => value.replace(/\D/g, '')}
        />
      </DemoBlock>

      <DemoBlock title="BasicTextArea 自动高度">
        <BasicTextArea height="auto" />
      </DemoBlock>
    </>
  )
}
