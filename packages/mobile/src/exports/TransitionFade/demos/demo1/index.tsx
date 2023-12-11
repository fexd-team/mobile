import React, { useState } from 'react'
import {
  Button,
  TransitionFade,
  TransitionSlideUp,
  TransitionSlideDown,
  TransitionFadeSlideUp,
  TransitionFadeSlideDown,
  TransitionNone,
  Grid,
  DemoBlock,
} from '@fexd/mobile'
import './style.module.less'

const SPEED_MAP: Record<string, number> = {
  none: 0,
  fastest: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  slowest: 700,
  debug: 5000,
}

export default () => {
  const [show, setShow] = useState(true)
  const [customizedSpeed, setSpeed] = useState(700)

  const speedLevel = Object.entries(SPEED_MAP).find(([key, value]) => value === customizedSpeed)?.[0] as any
  const speed = speedLevel ?? customizedSpeed

  return (
    <div className="demo">
      <DemoBlock title="控制器" inline>
        <Button onClick={() => setShow((show) => !show)}>切换</Button>

        <div>
          <Button onClick={() => setSpeed((speed) => speed - 100)}>-</Button>
          <div className="speed-panel">
            {customizedSpeed}ms ({speedLevel ?? '自定义'})
          </div>
          <Button onClick={() => setSpeed((speed) => speed + 100)}>+</Button>
        </div>
      </DemoBlock>

      <DemoBlock title="动画类型">
        <Grid columns={2} square onClick={() => setShow((show) => !show)}>
          <Grid.Item>
            <TransitionNone speed={speed} in={show} unmountOnExit={false}>
              <div className="animate-box">None</div>
            </TransitionNone>
          </Grid.Item>
          <Grid.Item>
            <TransitionFade speed={speed} in={show} unmountOnExit={false}>
              <div className="animate-box">Fade</div>
            </TransitionFade>
          </Grid.Item>

          <Grid.Item>
            <TransitionSlideUp speed={speed} in={show} unmountOnExit={false}>
              <div className="animate-box">Slide-Up</div>
            </TransitionSlideUp>
          </Grid.Item>
          <Grid.Item>
            <TransitionFadeSlideUp speed={speed} in={show} unmountOnExit={false}>
              <div className="animate-box">Fade Slide-Up</div>
            </TransitionFadeSlideUp>
          </Grid.Item>

          <Grid.Item>
            <TransitionSlideDown speed={speed} in={show} unmountOnExit={false}>
              <div className="animate-box">Slide-Down</div>
            </TransitionSlideDown>
          </Grid.Item>

          <Grid.Item>
            <TransitionFadeSlideDown speed={speed} in={show} unmountOnExit={false}>
              <div className="animate-box">Fade Slide-Down</div>
            </TransitionFadeSlideDown>
          </Grid.Item>
        </Grid>
      </DemoBlock>
    </div>
  )
}
