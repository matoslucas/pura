import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxAsyncConnect } from 'redux-connect'

import appState from './appState'
import auth from './auth'
import orders from './orders'
import products from './products'
import queve from './queve'
import rating from './rating'
import signUp from './signUp'
import stripe from './stripe'
import user from './user'

import { reducer as form } from 'redux-form'

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  appState,
  auth,
  form,
  orders,
  products,
  queve,
  rating,
  signUp,
  stripe,
  user,
})
