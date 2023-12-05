/**
 * style: { display: 'none' }
 */

import React, { useRef, useState, Suspense } from 'react'
import { useHistory, useLocation, HashRouter, Route, Redirect } from 'react-router-dom'
import { AliveScope, KeepAlive } from 'react-activation'
import { ChevronForward, ExtensionPuzzleOutline, ColorPaletteOutline } from '@fexd/icons'
import { flatten } from '@fexd/tools'
import { TabBarLayout, NavBarLayout, AnimatedSwitch } from '@fexd/mobile-router5'
import { List, ScrollView, NotFound, Empty, FullpageSpinner } from '@fexd/mobile'
import { createModel } from 'hox'
import ImportCost from '@dumiTheme/builtins/ImportCost'

import components from './components'
import './style.module.scss'

const useTitle = createModel(() => {
  const [title, setTitle] = useState()

  return { title, setTitle }
})

function NavItem({ name, title = name, link, ...props }: any) {
  const history = useHistory()
  const { setTitle } = useTitle()

  return (
    <List.Item
      {...props}
      onClick={() => {
        history.push(link)
        setTitle(title)
      }}
    >
      {name}
    </List.Item>
  )
}

const RouterConfigs = () => {
  const { title } = useTitle()

  return (
    <AnimatedSwitch animate="slide-cover">
      {/* <Route path="/" render={() => <Redirect to="components" />} /> */}
      <Route
        exact
        path="/"
        render={() => (
          <KeepAlive>
            <ScrollView shadow>
              {components.map(({ name, children }, idx) => (
                <List key={name} header={name} className="list">
                  {children.map(({ name, size }: any, idx) => (
                    <NavItem
                      key={name}
                      name={name}
                      extra={
                        <>
                          {size !== false && <ImportCost name={size ?? name.replace(/\s\W*$/, '')} />}
                          <span style={{ marginLeft: 12 }} />
                          <ChevronForward />
                        </>
                      }
                      link={`/components/${name.replace(/\s\W*$/, '').toLowerCase()}`}
                    />
                  ))}
                </List>
              ))}
            </ScrollView>
          </KeepAlive>
        )}
      />
      {AnimatedSwitch.renderLayout(
        <NavBarLayout title={title} className="nav-bar-layout">
          {flatten<typeof Route>(components.map(({ children }) => children)).map(
            ({ name, demo: Demo = NotFound }: any) => (
              <Route
                key={name}
                path={`/components/${name.replace(/\s\W*$/, '').toLowerCase()}`}
                render={() => (
                  <Suspense fallback={<FullpageSpinner />}>
                    <ScrollView shadow>
                      <Demo />
                    </ScrollView>
                  </Suspense>
                )}
              />
            ),
          )}
        </NavBarLayout>,
      )}
    </AnimatedSwitch>
  )
}

export default () => {
  const location = useLocation()
  const basename = useRef('/~demos/documents-preview-demo/' || location.pathname)

  return (
    <div className="demo">
      {/* @ts-ignore */}
      <HashRouter basename={basename.current}>
        <AliveScope>
          <RouterConfigs />
        </AliveScope>
      </HashRouter>
    </div>
  )
}

// export default () => (
//   <>
//     {/* <h2 style={{ padding: '0 16px' }}>按钮</h2> */}
//     <ButtonDemo />

//     {/* <h2 style={{ padding: '0 16px' }}>图标</h2> */}
//     <IconfontDemo />
//   </>
// )
