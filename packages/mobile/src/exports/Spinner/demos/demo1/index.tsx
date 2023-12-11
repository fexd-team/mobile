import React, { useState } from 'react'
import { FullpageSpinner, Spinner, Button, DemoBlock } from '@fexd/mobile'

// import './style.module.less'

export default () => {
  const [pageLoading, setPageLoading] = useState(true)

  return (
    <>
      <DemoBlock title="加载指示器（五彩斑斓的黑）" inline>
        <Spinner />
        <Spinner style={{ color: 'red' }} />
        <Spinner style={{ color: 'green' }} />
        <Spinner style={{ color: 'blue' }} />
        <Spinner style={{ color: 'orange' }} />
      </DemoBlock>

      <DemoBlock title="占满父容器">
        <div style={{ height: 200 }}>{pageLoading ? <FullpageSpinner /> : 'asdfghjkl'}</div>
        <Button onClick={() => setPageLoading(!pageLoading)}>切换 loading 状态</Button>
      </DemoBlock>
    </>
  )
}
