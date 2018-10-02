import superagent from 'superagent'

const CREATE_USER = 'CREATE_USER'
const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
const CREATE_USER_FAIL = 'CREATE_USER_FAIL'

const GET_USER = 'GET_USER'
const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
const GET_USER_FAIL = 'GET_USER_FAIL'

const GIFT_FRAGRANCES = 'GIFT_FRAGRANCES'
const GIFT_FRAGRANCES_SUCCESS = 'GIFT_FRAGRANCES_SUCCESS'
const GIFT_FRAGRANCES_FAIL = 'GIFT_FRAGRANCES_FAIL'

const UPDATE_SUBSCRIPTION = 'UPDATE_SUBSCRIPTION'
const UPDATE_SUBSCRIPTION_SUCCESS = 'UPDATE_SUBSCRIPTION_SUCCESS'
const UPDATE_SUBSCRIPTION_FAIL = 'UPDATE_SUBSCRIPTION_FAIL'

const UPDATE_USER = 'UPDATE_USER'
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL'

const UPLOAD_AVATAR = 'UPLOAD_AVATAR'
const UPLOAD_AVATAR_SUCCESS = 'UPLOAD_AVATAR_SUCCESS'
const UPLOAD_AVATAR_FAIL = 'UPLOAD_AVATAR_FAIL'

const REMOVE_USER = 'REMOVE_USER'

const initialState = {
  loading: false,
  loaded: false,
  data: null,
  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        loading: true,
      }
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.result,
      }
    case CREATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case GET_USER:
      return {
        ...state,
        loading: true,
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null,
      }
    case GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      }
    case UPDATE_USER:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        result: action.result,
        error: null,
      }
    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case REMOVE_USER:
      return {
        ...state,
        loaded: false,
        data: null,
      }
    default:
      return state
  }
}

export function isLoaded(globalState) {
  return globalState.products && globalState.products.loaded
}

export function createUser(data, token = null) {
  return {
    types: [UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL],
    promise: client => client.post('api/shopify/customer', { data, token }),
  }
}

export function getUser() {
  return {
    types: [GET_USER, GET_USER_SUCCESS, GET_USER_FAIL],
    promise: client => client.get('api/shopify/customer'),
  }
}

export function giftFragrances() {
  return {
    types: [GIFT_FRAGRANCES, GIFT_FRAGRANCES_SUCCESS, GIFT_FRAGRANCES_FAIL],
    promise: client =>
      client.post('api/use_discount_code', {
        data: { discount_code: 'STAYWITHUS' },
      }),
  }
}

export function updateUser(data) {
  return {
    types: [UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL],
    promise: client => client.patch('api/shopify/customer', { data }),
  }
}

export function removeUser() {
  return {
    type: REMOVE_USER,
    payload: null,
  }
}

export function updateSubscription(state, period = null) {
  return {
    types: [
      UPDATE_SUBSCRIPTION,
      UPDATE_SUBSCRIPTION_SUCCESS,
      UPDATE_SUBSCRIPTION_FAIL,
    ],
    promise: client =>
      client.post('api/subscription', { data: { state, period } }),
  }
}

export function uploadAvatar(file) {
  return {
    types: [UPLOAD_AVATAR, UPLOAD_AVATAR_SUCCESS, UPLOAD_AVATAR_FAIL],
    promise: client =>
      client.post('api/avatar', { file: { blob: file, name: 'avatar' } }),
  }
}
