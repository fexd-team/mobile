import React, { useState } from 'react'
import { Button, Overlay, TransitionSlideUp } from '@fexd/mobile'
import DemoBlock from '@documents/components/DemoBlock'

function OverlayDemo({ buttonText, ...props }: any) {
  const [show, setShow] = useState(false)

  return (
    <>
      <p>
        <Button onClick={() => setShow((show) => !show)}>{buttonText}</Button>
      </p>
      <Overlay visible={show} onClick={() => setShow((show) => !show)} {...props} />
    </>
  )
}

export default () => {
  return (
    <DemoBlock>
      <section style={{ padding: 14, position: 'relative', margin: -8 }}>
        <OverlayDemo buttonText="显示遮罩" />
        <OverlayDemo absolute buttonText="绝对定位（相对父容器）" />
        <OverlayDemo buttonText="带内容">遮罩内容</OverlayDemo>
        <OverlayDemo buttonText="带内容 + 透明背景" transparent>
          遮罩内容 + 透明背景
        </OverlayDemo>
        <OverlayDemo buttonText="自定义动画 Slide-Up" transition={TransitionSlideUp} />
      </section>
    </DemoBlock>
  )
}
