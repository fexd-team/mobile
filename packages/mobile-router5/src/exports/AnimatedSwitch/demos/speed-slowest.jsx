import React from 'react'
import { Route } from 'react-router-dom'
import { AnimatedSwitch } from '@fexd/mobile-router5'
import Router from './router'
import { Page1, Page2 } from './pages'

export default () => (
  <Router>
    <AnimatedSwitch animate="fade" speed="slowest">
      <Route exact path="/" component={Page1} />
      <Route exact path="/sub" component={Page2} />
    </AnimatedSwitch>
  </Router>
)
