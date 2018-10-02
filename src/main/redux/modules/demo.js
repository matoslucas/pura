const LOAD = 'strv-template/demo/LOAD'
const LOAD_SUCCESS = 'strv-template/demo/LOAD_SUCCESS'
const LOAD_DETAIL_SUCCESS = 'strv-template/demo/LOAD_DETAIL_SUCCESS'
const LOAD_FAIL = 'strv-template/demo/LOAD_FAIL'

const initialState = {
  loaded: false,
  data: null,
  detail: [],
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        data: action.result,
      }
    case LOAD_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        detail: {
          [action.id]: action.result,
        },
      }
    case LOAD_FAIL:
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
  return globalState.demo && globalState.demo.loaded
}

export function isLoadedDetail(detailId, globalState) {
  return globalState.demo && globalState.demo.detail && globalState.demo.detail[detailId] && globalState.demo.detail[detailId].name
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('api/planets'),
  }
}

export function loadDetail(id) {
  return {
    types: [LOAD, LOAD_DETAIL_SUCCESS, LOAD_FAIL],
    promise: client => client.get(`api/planets/${id}`),
    id,
  }
}
