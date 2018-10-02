import lodashGet from 'lodash/get'

export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    const { promise, types, ...rest } = action

    if (!promise) {
      return next(action)
    }

    // Add Firebase token to all requests
    const store = getState()
    const token = lodashGet(store, 'auth.token', null)

    client.token = token

    const [REQUEST, SUCCESS, FAILURE] = types

    next({ ...rest, type: REQUEST }) // eslint-disable-line callback-return

    const actionPromise = promise(client)

    actionPromise
      .then(
        result => next({ ...rest, result, type: SUCCESS }),
        error => next({ ...rest, error, type: FAILURE })
      )
      .catch(error => {
        console.error('MIDDLEWARE ERROR:', error)
        next({ ...rest, error, type: FAILURE })
      })

    return actionPromise
  }
}
