import React from 'react'
import { Route } from 'react-router-dom'
import { flatten } from '@fexd/tools'

// render route wrapper with collected props.children paths
export default function renderLayout(component: any) {
  const routes = React.Children.map(component?.props?.children, (child) => child).filter(
    (child: any) => !!child?.props?.path,
  )

  if (routes?.length === 0) {
    return component
  }

  const path: any = flatten(
    routes.map((child: any) => flatten([child?.props?.path]).map((path) => `${path}${child?.props?.exact ? '' : '*'}`)),
  )

  return (
    <Route exact path={path} key={path.join()}>
      {component}
    </Route>
  )
}
