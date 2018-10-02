const FETCH_RATING = 'FETCH_RATING'
const FETCH_RATING_SUCCESS = 'FETCH_RATING_SUCCESS'
const FETCH_RATING_FAIL = 'FETCH_RATING_FAIL'

const ADD_RATING = 'ADD_RATING'
const ADD_RATING_SUCCESS = 'ADD_RATING_SUCCESS'
const ADD_RATING_FAIL = 'ADD_RATING_FAIL'

const initialState = {
  loading: false,
  loaded: false,
  data: [],
  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RATING:
      return {
        ...state,
        loading: true,
      }
    case FETCH_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null,
      }
    case FETCH_RATING_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      }
    case ADD_RATING:
      return {
        ...state,
        loading: true,
      }
    case ADD_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        result: action.result,
        error: null,
      }
    case ADD_RATING_FAIL:
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

export function fetchRating(product_id) {
  return {
    types: [FETCH_RATING, FETCH_RATING_SUCCESS, FETCH_RATING_FAIL],
    promise: client => client.get(`api/rating/${product_id}/all`),
  }
}

export function addRating(product_id, rating) {
  const data = {
    value: rating,
  }

  return {
    types: [ADD_RATING, ADD_RATING_SUCCESS, ADD_RATING_FAIL],
    promise: client => client.post(`api/rating/${product_id}`, { data }),
  }
}
