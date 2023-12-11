/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { run } from '@fexd/tools'
import { Swiper, View, Button, showPopup, Space, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => {
  const [number, setNumber] = React.useState(0)
  const modalClose = React.useRef(new Map())

  React.useEffect(() => {
    return () => {
      ;[...modalClose.current!.values()].forEach((fn) => run(fn))
    }
  }, [])

  return (
    <div className="demo">
      <DemoBlock title="基础">
        <Swiper style={{ height: 130 }} value={number} onChange={setNumber}>
          <View center className="blue">
            1
          </View>
          <View center className="red">
            2
          </View>
          <View center className="green">
            3
          </View>
          <View center className="orange">
            4
          </View>
        </Swiper>
        <Swiper vertical value={number} onChange={setNumber} autoplay={false} style={{ height: 130 }}>
          <View center className="blue">
            1
          </View>
          <View center className="red">
            2
          </View>
          <View center className="green">
            3
          </View>
          <View center className="orange">
            4
          </View>
        </Swiper>
        <Space>
          <Button
            onClick={() => {
              setNumber((number) => (number - 1 < 0 ? 3 : (number - 1) % 4))
            }}
          >
            上一张
          </Button>
          <Button
            onClick={() => {
              setNumber((number) => (number + 1) % 4)
            }}
          >
            下一张
          </Button>
        </Space>
      </DemoBlock>

      <DemoBlock title="循环（元素需超过 2 个）">
        <Swiper loop value={number} onChange={setNumber} style={{ height: 130 }} autoplay={false}>
          <View center className="blue">
            1
          </View>
          <View center className="red">
            2
          </View>
          <View center className="green">
            3
          </View>
          <View center className="orange">
            4
          </View>
        </Swiper>
      </DemoBlock>

      <DemoBlock title="不可滑动">
        <Swiper swipeable={false} value={number} onChange={setNumber} autoplay={false} style={{ height: 130 }}>
          <View center className="blue">
            1
          </View>
          <View center className="red">
            2
          </View>
          <View center className="green">
            3
          </View>
          <View center className="orange">
            4
          </View>
        </Swiper>
      </DemoBlock>

      <DemoBlock title="自定义指示器">
        <Swiper
          value={number}
          onChange={setNumber}
          autoplay={false}
          style={{ height: 130 }}
          indicator={(total, current) => (
            <span
              style={{
                position: 'absolute',
                padding: '2px 4px',
                right: 10,
                top: 10,
                borderRadius: 4,
                background: 'rgba(0, 0, 0, 0.3)',
                color: '#fff',
              }}
            >
              {current} / {total}
            </span>
          )}
        >
          <View center className="blue">
            1
          </View>
          <View center className="red">
            2
          </View>
          <View center className="green">
            3
          </View>
          <View center className="orange">
            4
          </View>
        </Swiper>
      </DemoBlock>

      <DemoBlock title="全屏滚动" inline>
        <Button
          onClick={() => {
            const { close } = showPopup({
              content: ({ close }) => (
                <Swiper autoplay={false} style={{ height: '100vh', width: '100vw' }}>
                  <View center className="blue">
                    <Button type="primary" onClick={close}>
                      点击关闭
                    </Button>
                  </View>
                  <View center className="red">
                    <Button type="primary" onClick={close}>
                      点击关闭
                    </Button>
                  </View>
                  <View center className="green">
                    <Button type="primary" onClick={close}>
                      点击关闭
                    </Button>
                  </View>
                  <View center className="orange">
                    <Button type="primary" onClick={close}>
                      点击关闭
                    </Button>
                  </View>
                </Swiper>
              ),
              onExited() {
                modalClose.current.delete(close)
              },
            })

            modalClose.current.set(close, close)
          }}
        >
          横向
        </Button>
        <Button
          onClick={() => {
            const { close } = showPopup({
              content: ({ close }) => (
                <Swiper vertical autoplay={false} style={{ height: '100vh', width: '100vw' }}>
                  <View center className="blue">
                    <Button type="primary" onClick={close}>
                      点击关闭
                    </Button>
                  </View>
                  <View center className="red">
                    <Button type="primary" onClick={close}>
                      点击关闭
                    </Button>
                  </View>
                  <View center className="green">
                    <Button type="primary" onClick={close}>
                      点击关闭
                    </Button>
                  </View>
                  <View center className="orange">
                    <Button type="primary" onClick={close}>
                      点击关闭
                    </Button>
                  </View>
                </Swiper>
              ),
              onExited() {
                modalClose.current.delete(close)
              },
            })

            modalClose.current.set(close, close)
          }}
        >
          纵向
        </Button>
      </DemoBlock>
    </div>
  )
}
