const ADD_CARD = 'ADD_CARD'
const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS'
const ADD_CARD_FAIL = 'ADD_CARD_FAIL'

const DELETE_CARD = 'DELETE_CARD'
const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS'
const DELETE_CARD_FAIL = 'DELETE_CARD_FAIL'

const LIST_CARD = 'LIST_CARD'
const LIST_CARD_SUCCESS = 'LIST_CARD_SUCCESS'
const LIST_CARD_FAIL = 'LIST_CARD_FAIL'

const initialState = {
  loading: false,
  loaded: false,
  data: null,
  error: null,
}

export default function reducer(state = initialState, action) {
    
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        loading: true,
      }
    case ADD_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        result: action.result,
      }
    case ADD_CARD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case DELETE_CARD:
      return {
        ...state,
        loading: true,
      }
    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        result: action.result,
      }
    case DELETE_CARD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case LIST_CARD:
      return {
        ...state,
        loading: true,
      }
    case LIST_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null,
      }
    case LIST_CARD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      }
    default:
      return state
  }
}

export function isLoaded(globalState) {
  return globalState.products && globalState.products.loaded
}

export function addCard(data, token = null) {
  return {
    types: [ADD_CARD, ADD_CARD_SUCCESS, ADD_CARD_FAIL],
    promise: client => client.post('api/stripe/card', { data, token }),
  }
}

export function deleteCard(id) {
  return {
    types: [DELETE_CARD, DELETE_CARD_SUCCESS, DELETE_CARD_FAIL],
    promise: client => client.delete(`api/stripe/card/${id}`),
  }
}

export function listCard() {
  return {
    types: [LIST_CARD, LIST_CARD_SUCCESS, LIST_CARD_FAIL],
    promise: client => client.get('api/stripe/card'),
  }
}
