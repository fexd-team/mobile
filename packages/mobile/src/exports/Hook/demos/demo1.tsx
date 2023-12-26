import React, { useEffect, useState } from 'react'
import { DemoBlock, Hook, Stepper, toast } from '@fexd/mobile'

export default () => (
  <>
    <DemoBlock title="使用 children 属性">
      <Hook>
        {() => {
          const [count, setCount] = useState(0)

          useEffect(() => {
            toast.info(count)
          }, [count])

          return <Stepper value={count} onChange={setCount} />
        }}
      </Hook>
    </DemoBlock>

    <DemoBlock title="使用 hook 属性">
      <Hook
        hook={() => {
          const [count, setCount] = useState(0)

          useEffect(() => {
            toast.info(count)
          }, [count])

          return <Stepper value={count} onChange={setCount} />
        }}
      />
    </DemoBlock>
  </>
)
