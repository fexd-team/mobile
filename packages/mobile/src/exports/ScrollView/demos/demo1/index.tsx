import React, { useState, useRef } from 'react'
import DemoBlock from '@documents/components/DemoBlock'

import { View, ScrollView, toast, Button, Iconfont } from '@fexd/mobile'

import './style.module.less'

const content = Array(50)
  .fill('')
  .map((item, idx) => <div key={idx}>item {idx}</div>)

export default () => {
  const [showToTop, setShowToTop] = useState(false)
  const scrollView = useRef<HTMLDivElement>(null)
  return (
    <div className="demo">
      <DemoBlock title="基础">
        <View className="view">
          <ScrollView>{content}</ScrollView>
        </View>
      </DemoBlock>

      <DemoBlock title="滚动阴影">
        <View className="view">
          <ScrollView shadow>{content}</ScrollView>
        </View>
      </DemoBlock>

      <DemoBlock title="触底事件">
        <View className="view">
          <ScrollView
            onEndReached={async (done) => {
              await toast.info('到底了').promise
              done()
            }}
          >
            {content}
          </ScrollView>
        </View>
      </DemoBlock>

      <DemoBlock title="自定义距离事件">
        <View className="view" height={300}>
          <ScrollView
            ref={scrollView}
            distanceEvents={[
              {
                distance: 300,
                dynamic: true,
                onGoingIn() {
                  toast.info('滚动距离低于了 300px')
                  setShowToTop(false)
                },
                onGoingOut() {
                  toast.info('滚动距离高于了 300px')
                  setShowToTop(true)
                },
              },
            ]}
          >
            {content}
          </ScrollView>
          {!showToTop ? null : (
            <Button
              icon={<Iconfont type="up_circle" />}
              fill="none"
              type="primary"
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                width: '38px',
                height: '38px',
                fontSize: 36,
                // background: 'pink',
                // borderRadius: '100%',
                zIndex: 1000,
              }}
              onClick={() => {
                scrollView.current!.scrollTop = 0
              }}
            />
          )}
        </View>
      </DemoBlock>
    </div>
  )
}
