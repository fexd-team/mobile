import React from 'react'
import { View, ScrollView, toast, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <View className="container" height={250}>
        <View className="view" height={50} auto={false} center>
          header
        </View>
        <View className="view" direction="row">
          <View className="view" width={80} auto={false} center>
            sider
          </View>
          <View className="view" center>
            content
          </View>
        </View>
        <View className="view" height={50} auto={false} center>
          footer
        </View>
      </View>
    </DemoBlock>

    <DemoBlock title="搭配 ScrollView">
      <View className="container" height={250}>
        <View className="view" height={50} auto={false} center>
          header
        </View>
        <View className="view" direction="row">
          <View className="view" width={80} auto={false} center>
            sider
          </View>
          <View className="view">
            <ScrollView
              shadow
              onEndReached={async (done) => {
                await toast.info('到底了').promise
                done()
              }}
            >
              {Array(20)
                .fill('')
                .map((item, idx) => (
                  <div key={idx}>item {idx}</div>
                ))}
            </ScrollView>
          </View>
        </View>
        <View className="view" height={50} auto={false} center>
          footer
        </View>
      </View>
    </DemoBlock>
  </div>
)
