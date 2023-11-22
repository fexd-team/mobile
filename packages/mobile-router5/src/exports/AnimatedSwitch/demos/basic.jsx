import React from 'react'
import { Route } from 'react-router-dom'
import { AnimatedSwitch } from '@fexd/mobile-router5'
import View from './View'
import Router from './router'
import { Page1, Page2 } from './pages'

export default () => (
  <div
    style={{
      height: '100vh',
      overflow: 'hidden',
    }}
  >
    <Router>
      <AnimatedSwitch>
        <Route exact path="/" component={Page1} />
        <Route exact path="/sub" component={Page2} />
      </AnimatedSwitch>
    </Router>
  </div>
)
