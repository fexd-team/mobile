import React from 'react'
import { MemoryRouter as Router, useLocation, useHistory } from 'react-router-dom'

import { ScrollView } from '@fexd/mobile'
import View from './View'
import Icon from './Icon'

// export const history = createMemoryHistory()

export const Page = ({ background, children }) => (
  <View
    style={{
      color: '#fff',
      overflow: 'hidden',
      background,
    }}
  >
    {children}
  </View>
)

const UrlBar = () => {
  const location = useLocation()
  const history = useHistory()

  return (
    <div
      style={{
        background: '#f2f2f2',
        padding: 12,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ marginRight: 12, display: 'flex', alignItems: 'center' }}>
        <Icon type="amicon-back_android" onClick={history.goBack} />
      </div>
      <div style={{ background: '#fff', padding: 12, flex: 1 }}>{location.pathname || '/'}</div>
    </div>
  )
}

export default ({ children }) => (
  <Router>
    <View style={{ height: '100vh', maxHeight: '100%', overflow: 'hidden' }}>
      <UrlBar />
      <View>
        <ScrollView>{children}</ScrollView>
      </View>
    </View>
  </Router>
)
