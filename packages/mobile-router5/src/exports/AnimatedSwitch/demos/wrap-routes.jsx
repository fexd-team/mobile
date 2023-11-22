import React from 'react'
import { Route, useHistory, Redirect } from 'react-router-dom'
import { AnimatedSwitch, NavBarLayout, TabBarLayout } from '@fexd/mobile-router5'
import { Button } from '@fexd/mobile'
import NotFound from './NotFound'
import Router from './router'
import { Page1, Page2 } from './pages'

const { renderLayout } = AnimatedSwitch

const App = () => {
  const history = useHistory()

  return (
    <AnimatedSwitch animate="slide-cover">
      <Route exact path="/">
        <Redirect to="/tabs" />
      </Route>

      {renderLayout(
        <NavBarLayout title="标题">
          <Route
            exact
            path="/headers"
            render={(props) => (
              <Page1 {...props}>
                <Button type="primary" onClick={() => history.push('/headers/sub')}>
                  push to Test2
                </Button>
              </Page1>
            )}
          />
          <Route
            exact
            path="/headers/sub"
            render={(props) => (
              <Page2 {...props}>
                <Button type="warn" onClick={() => history.push('/headers')}>
                  push to Test1
                </Button>
              </Page2>
            )}
          />
        </NavBarLayout>,
      )}

      {renderLayout(
        <TabBarLayout>
          <Route exact path="/tabs" component={Page1} name="page1" icon="amicon-home" />
          <Route exact path="/tabs/sub" component={Page2} name="page2" icon="amicon-cart" />
          <Route name="header" icon="amicon-more" onClick={() => history.push('/headers')} />
        </TabBarLayout>,
      )}

      <Route component={NotFound} />
    </AnimatedSwitch>
  )
}

export default () => (
  <Router>
    <App />
  </Router>
)
