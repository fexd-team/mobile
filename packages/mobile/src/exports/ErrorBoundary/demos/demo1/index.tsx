import React, { useState } from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { ErrorBoundary, Button } from '@fexd/mobile'

import './style.module.less'

const Test = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>加到3就会报错</h1>
      {count >= 3 ? new Error('I am Error!') : `当前count的值为：${count}`}

      <br />
      <br />
      <Button onClick={() => setCount(count + 1)}>点击加1</Button>
    </>
  )
}

const ErrorPage = (props: any) => {
  const { error, retry } = props

  return (
    <div>
      <h1>Error!</h1>
      <p>{error.toString()}</p>
      <Button onClick={retry}>Retry</Button>
    </div>
  )
}

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <ErrorBoundary console>
        <Test />
      </ErrorBoundary>
    </DemoBlock>

    <DemoBlock title="进阶">
      <ErrorBoundary fallback={(error, retry) => <ErrorPage error={error} retry={retry} />}>
        <Test />
      </ErrorBoundary>
    </DemoBlock>
  </div>
)
