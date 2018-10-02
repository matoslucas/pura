import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './redux/create'
import ApiClient from 'common/helpers/ApiClient'
import propInjector from 'common/lib/propInjector'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import { ReduxAsyncConnect } from 'redux-connect'
import { useScroll } from 'react-router-scroll'
import getRoutes from './routes'


const client = new ApiClient()
const dest = document.getElementById('content')
const store = createStore(browserHistory, client, window.__data)
const history = syncHistoryWithStore(browserHistory, store)

const component =
  (<Router
    render={props =>
      <ReduxAsyncConnect
        {...props}
        helpers={{ client }}
        filter={item => !item.deferred}
        render={applyRouterMiddleware(useScroll())}
      />
    }
    history={history}
    routes={getRoutes(store)}
    createElement={propInjector}
  />)


ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
)

if (process.env.NODE_ENV !== 'production') {
  window.React = React

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.')
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./redux/DevTools') // eslint-disable-line global-require

  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  )
}
