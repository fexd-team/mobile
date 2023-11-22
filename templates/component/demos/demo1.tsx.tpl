import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { {{ name }} } from '@fexd/mobile'

export default () => (
  <>
    <DemoBlock title="基础">
      <{{ name }} />
    </DemoBlock>

    <DemoBlock title="进阶">
      <{{ name }} />
    </DemoBlock>
  </>
)
