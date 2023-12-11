import React from 'react'
import { TabBar, TransitionSwitch, View, DemoBlock } from '@fexd/mobile'

function usePrevious(value: any) {
  const previous = React.useRef(value)

  React.useEffect(() => {
    previous.current = value
  })

  return previous.current
}

export default () => {
  const [activeKey, setActiveKey] = React.useState(0)
  const prevActiveKey = usePrevious(activeKey)

  return (
    <div className="h-screen" style={{ maxHeight: '100%' }}>
      <View>
        <View>
          <TransitionSwitch
            animateKey={activeKey}
            direction={activeKey > prevActiveKey ? 'forward' : 'back'}
            className="flex-1"
          >
            <View center>{activeKey}</View>
          </TransitionSwitch>
        </View>
        <View auto={false}>
          <TabBar>
            <TabBar.Item
              name="Home"
              icon="home"
              active={activeKey === 0}
              onClick={() => {
                setActiveKey(0)
              }}
            />
            <TabBar.Item
              name="Star"
              icon="collection"
              active={activeKey === 1}
              onClick={() => {
                setActiveKey(1)
              }}
            />
            <TabBar.Item
              name="Personal"
              icon="me"
              active={activeKey === 2}
              onClick={() => {
                setActiveKey(2)
              }}
            />
          </TabBar>
        </View>
      </View>
    </div>
  )
}
