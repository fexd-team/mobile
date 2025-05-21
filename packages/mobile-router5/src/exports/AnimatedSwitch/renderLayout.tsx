import React from 'react'
import { Route, RouteProps } from 'react-router-dom'
import { CacheRoute, CacheRouteProps } from 'react-router-cache-route'
import { flatten } from '@fexd/tools'

export interface LayoutRouteProps extends RouteProps {}
export interface LayoutRouteProps extends CacheRouteProps {
  cache?: boolean
}

// render route wrapper with collected props.children paths
export default function renderLayout(component: any, { cache, ...props }: LayoutRouteProps = {}) {
  const routes = React.Children.map(component?.props?.children, (child) => child).filter(
    (child: any) => !!child?.props?.path,
  )

  if (routes?.length === 0) {
    return component
  }

  const path: any = flatten(
    routes.map((child: any) => flatten([child?.props?.path]).map((path) => `${path}${child?.props?.exact ? '' : '*'}`)),
  )

  const RouteComponent: any = cache ? CacheRoute : Route

  return (
    <RouteComponent exact path={path} key={path.join()} {...props}>
      {component}
    </RouteComponent>
  )
}
