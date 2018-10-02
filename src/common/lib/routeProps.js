import RegExpMap from '../utils/RegExpMap'

const routeProps = new RegExpMap([
  ['/login', {
    requireAuth: false,
  }],
  [/\/setup/, {
    requireAuth: true,
  }],
  [/\/shop/, {
    requireAuth: true,
  }],
  [/\/my-account/, {
    requireAuth: true,
  }],
  [/\/queue/, {
    requireAuth: true,
  }],
])

export default function getRouteProps(route) {
  return routeProps.get(route)
}
