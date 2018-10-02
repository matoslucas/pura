const FETCH_ORDERS = 'FETCH_ORDERS'
const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS'
const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL'

const initialState = {
  loading: false,
  data: [],
  error: null,
}

const handlers = {
  [FETCH_ORDERS]: state => ({ ...state, error: null, loading: true }),
  [FETCH_ORDERS_SUCCESS]: (state, action) => ({
    ...state,
    data: action.result,
    error: null,
    loading: false,
  }),
  [FETCH_ORDERS_FAIL]: (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  }),
}

export default function reducer(state = initialState, action) {
  const fn = handlers[action.type]
  return fn ? fn(state, action) : state
}

export function fetchOrders() {
  return {
    types: [FETCH_ORDERS, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAIL],
    promise: client => client.get('api/queue/history'),
  }
}
