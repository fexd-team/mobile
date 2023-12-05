import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Provider } from '@fexd/mobile'

export default () => (
  <>
    <DemoBlock title="基础">
      <Provider />
    </DemoBlock>

    <DemoBlock title="进阶">
      <Provider />
    </DemoBlock>
  </>
)
