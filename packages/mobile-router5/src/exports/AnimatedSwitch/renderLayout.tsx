import React from 'react'
import { Route, RouteProps } from 'react-router-dom'
import { flatten } from '@fexd/tools'

export interface LayoutRouteProps extends RouteProps {}

// render route wrapper with collected props.children paths
export default function renderLayout(component: any, props: LayoutRouteProps = {}) {
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
    <Route exact path={path} key={path.join()} {...props}>
      {component}
    </Route>
  )
}
