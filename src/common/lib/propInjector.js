/* eslint-disable react/prop-types */
import React from 'react'
import getRouteProps from './routeProps'

export default function propInjector(Component, props) {
  // inject only to the top level App component
  const routeProps = props.route.path === '/' && getRouteProps(props.location.pathname)

  //console.log('route', props.location.pathname, routeProps)

  if (!Component.dontInjectPathKey) {
    return (
      <Component
        {...props}
        key={props.location.pathname}
        routeProps={routeProps || {}}
      />
    )
  }
  return <Component {...props} routeProps={routeProps || {}} />
}
