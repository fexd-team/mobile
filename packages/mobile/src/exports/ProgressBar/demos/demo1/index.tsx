import React from 'react'
import { ProgressBar, Button, DemoBlock } from '@fexd/mobile'
import { Add, Remove } from '@fexd/icons'

export default () => {
  const [progress, setProgress] = React.useState(25)

  return (
    <>
      <DemoBlock title="动画为 normal 的进度条（默认）">
        <ProgressBar value={progress} />
      </DemoBlock>
      <DemoBlock title="没有动画的进度条">
        <ProgressBar value={progress} speed="none" />
      </DemoBlock>
      <DemoBlock title="动画为 slowest 的进度条">
        <ProgressBar value={progress} speed="slowest" />
      </DemoBlock>
      <DemoBlock title="动画为自定义 2000ms 的进度条">
        <ProgressBar value={progress} speed={2000} />
      </DemoBlock>
      <DemoBlock title="控制盘" inline>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            icon={<Remove />}
            onClick={() => {
              setProgress((progress) => progress - 10)
            }}
          />
          <div style={{ margin: '0 10px' }}>{progress}%</div>
          <Button
            icon={<Add />}
            onClick={() => {
              setProgress((progress) => progress + 10)
            }}
          />
        </div>
      </DemoBlock>
    </>
  )
}
