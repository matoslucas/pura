import React from 'react'
import ReactDOM from 'react-dom/server'
import createStore from './redux/create'
import ApiClient from 'common/helpers/ApiClient'
import Html from './helpers/Html'
import PrettyError from 'pretty-error'

import { match } from 'react-router'
// import { syncHistoryWithStore } from 'react-router-redux'
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect'
import createHistory from 'react-router/lib/createMemoryHistory'
import { Provider } from 'react-redux'
import getRoutes from './routes'

const pretty = new PrettyError()

const mainView = (req, res) => {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh()
  }

  const client = new ApiClient(req)
  const history = createHistory(req.originalUrl)

  const store = createStore(history, client)

  // const syncedHistory = syncHistoryWithStore(history, store)

  function hydrateOnClient() {
    res.send(`<!doctype html>\n${
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store} />)}`)
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient()
    return
  }

  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error))
      res.status(500)
      hydrateOnClient()
    } else if (renderProps) {
      loadOnServer({ ...renderProps, store, helpers: { client } }).then(() => {
        const component =
          (<Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>)


        res.status(200)

        global.navigator = { userAgent: req.headers['user-agent'] }

        res.send(`<!doctype html>\n${
          ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />)}`)
      })
    } else {
      res.status(404).send('Not found')
    }
    return false
  })
}

export default mainView
