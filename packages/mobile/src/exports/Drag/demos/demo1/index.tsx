import React from 'react'
import { useMount } from 'ahooks'
import { source, run } from '@fexd/tools'
import { Drag, useTouch, View, Space, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => {
  const ref = React.useRef<any>()

  const { main, touches } = useTouch(ref, {
    onMove() {
      console.log('moving')
    },
  })

  // useMount(() => {
  //   source.js('//cdn.jsdelivr.net/npm/eruda', 'eruda').then(eruda => {
  //     run(eruda, 'init')
  //     // console.error(error)
  //     // run(eruda, 'show')
  //   })
  // })

  return (
    <div className="demo">
      <DemoBlock title="基础">
        <View height={300} center>
          <Drag />
        </View>
      </DemoBlock>

      <DemoBlock title="进阶">
        <View height={300} ref={ref} center style={{ border: 'solid 1px #e6e6e6', position: 'relative' }}>
          <Space direction="vertical">
            {touches.map((touch, idx) => (
              <div key={idx}>
                {(touch?.tracks ?? []).map((position, idx) => (
                  <p
                    key={idx}
                    style={{
                      position: 'absolute',
                      left: position?.x,
                      top: position?.y,
                      width: 2,
                      height: 2,
                      background: '#333',
                      borderRadius: '50%',
                    }}
                  >
                    {/* [{idx + 1}] {position?.offsetX}, {position?.offsetY} */}
                  </p>
                ))}
                {/* <p>
                  [{idx + 1}] offset: {touch?.offsetX}, {touch?.offsetY}
                </p>
                <p>
                  [{idx + 1}] page: {touch?.pageX}, {touch?.pageY}
                </p> */}
              </div>
            ))}
          </Space>
        </View>
      </DemoBlock>
    </div>
  )
}
