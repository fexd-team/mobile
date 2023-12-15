import React from 'react'
import { TabBar, TransitionSwitch, View, DemoBlock } from '@fexd/mobile'
import { usePrevious } from 'ahooks'

export default () => {
  const [activeKey, setActiveKey] = React.useState(0)
  const prevActiveKey = usePrevious(activeKey)!

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TransitionSwitch
        animateKey={activeKey}
        direction={activeKey > prevActiveKey ? 'forward' : 'back'}
        style={{ flex: 1 }}
      >
        <div>{activeKey}</div>
      </TransitionSwitch>
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
    </div>
  )
}
