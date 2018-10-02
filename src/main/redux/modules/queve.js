import lodashFind from 'lodash/find'
import update from 'react/lib/update'

const FETCH_QUEVE = 'FETCH_QUEVE'
const FETCH_QUEVE_SUCCESS = 'FETCH_QUEVE_SUCCESS'
const FETCH_QUEVE_FAIL = 'FETCH_QUEVE_FAIL'

const FETCH_QUEVE_LEN = 'FETCH_QUEVE_LEN'
const FETCH_QUEVE_LEN_SUCCESS = 'FETCH_QUEVE_LEN_SUCCESS'
const FETCH_QUEVE_LEN_FAIL = 'FETCH_QUEVE_LEN_FAIL'

const QUEVE_STATUS = 'QUEVE_STATUS'
const QUEVE_STATUS_SUCCESS = 'QUEVE_STATUS_SUCCESS'
const QUEVE_STATUS_FAIL = 'QUEVE_STATUS_FAIL'

const FETCH_DEVICES = 'FETCH_DEVICES'
const FETCH_DEVICES_SUCCESS = 'FETCH_DEVICES_SUCCESS'
const FETCH_DEVICES_FAIL = 'FETCH_DEVICES_FAIL'

const ADD_QUEVE_ITEM = 'ADD_QUEVE_ITEM'
const ADD_QUEVE_ITEM_SUCCESS = 'ADD_QUEVE_ITEM_SUCCESS'
const ADD_QUEVE_ITEM_FAIL = 'ADD_QUEVE_ITEM_FAIL'

const REMOVE_QUEVE_ITEM = 'REMOVE_QUEVE_ITEM'
const REMOVE_QUEVE_ITEM_SUCCESS = 'REMOVE_QUEVE_ITEM_SUCCESS'
const REMOVE_QUEVE_ITEM_FAIL = 'REMOVE_QUEVE_ITEM_FAIL'

const MOVE_QUEVE_ITEM = 'MOVE_QUEVE_ITEM'
const MOVE_QUEVE_ITEM_SUCCESS = 'MOVE_QUEVE_ITEM_SUCCESS'
const MOVE_QUEVE_ITEM_FAIL = 'MOVE_QUEVE_ITEM_FAIL'

const ADD_DISPENSERS = 'ADD_DISPENSERS'
const ADD_DISPENSERS_SUCCESS = 'ADD_DISPENSERS_SUCCESS'
const ADD_DISPENSERS_FAIL = 'ADD_DISPENSERS_FAIL'

const ORDER_NOW = 'ORDER_NOW'
const ORDER_NOW_SUCCESS = 'ORDER_NOW_SUCCESS'
const ORDER_NOW_FAIL = 'ORDER_NOW_FAIL'

const initialState = {
  loading: false,
  loaded: false,
  data: [],
  count: 0,
  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUEVE:
      return {
        ...state,
        loading: true,
      }
    case FETCH_QUEVE_SUCCESS:

      return {
        ...state,
        loading: false,
        loaded: true,
        data: formatQueveData(action.result),
        count: action.result.length,
        error: null,
      }

    case FETCH_QUEVE_LEN_SUCCESS:
      return {
        ...state,
        count: action.result.length,
      }

    case ORDER_NOW:
      return {
        ...state,
        loading: true,
        status: {processing: true},
      }
    case ORDER_NOW_SUCCESS:
     // console.info(action.result);
      return {
        ...state,
        loading: false,
        orderNowResponse: action.result,
      }

    case QUEVE_STATUS_SUCCESS:
      return {
        ...state,
        status: action.result,
      }

    case FETCH_DEVICES_SUCCESS:

      return {
        ...state,
        loading: false,
        loaded: true,
        devices: action.result,
        error: null,
      }
    case ADD_DISPENSERS_SUCCESS:

      return {
        ...state,
        loading: false,
        loaded: true,
        devices: action.result,
        error: null,
      }
    case FETCH_QUEVE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      }
    case ADD_QUEVE_ITEM:
      return {
        ...state,
        loadingAdd: true,
      }
    case ADD_QUEVE_ITEM_SUCCESS:
      return {
        ...state,
        loadingAdd: false,
        data: formatQueveData(action.result),
        count: action.result.length,
        error: null,
      }
    case ADD_QUEVE_ITEM_FAIL:
      return {
        ...state,
        loadingAdd: false,
        error: action.error,
      }
    case REMOVE_QUEVE_ITEM:
      return {
        ...state,
        loadingRemove: true,
      }
    case REMOVE_QUEVE_ITEM_SUCCESS:
      return {
        ...state,
        loadingRemove: false,
        data: formatQueveData(action.result),
        count: action.result.length,
        error: null,
      }
    case REMOVE_QUEVE_ITEM_FAIL:
      return {
        ...state,
        loadingRemove: false,
        error: action.error,
      }
    case MOVE_QUEVE_ITEM:
      return {
        ...state,
        loadingMove: true,
        data: action.localQueve,
      }
    case MOVE_QUEVE_ITEM_SUCCESS:
      return {
        ...state,
        loadingMove: false,
        data: formatQueveData(action.result),
        error: null,
      }
    case MOVE_QUEVE_ITEM_FAIL:
      return {
        ...state,
        loadingMove: false,
        error: action.error,
        data: state.data,
      }
    default:
      return state
  }
}


function formatQueveData(data) {

  return data.map((item, index) => {
    
    if (item !== null) {
     
      return {
        key: item.key,
        position: index + 1, //item.value.position? + 1,
        id: item.value.product_id,
        status: item.value.failure ? "failure" : item.value.status,
        failure_details: item.value.failure ? item.value.failure : null,
        date: item.value.timestamp,
        tracking_details: item.value.status === "fulfilled" ? item.value.tracking_details : null,
      }
    }
  })
}

function getQueveItem(key, queve) {
  const queveItem = lodashFind(queve, item => item.key == key)

  return {
    queveItem,
    index: queve.indexOf(queveItem),
  }
}

function updateQueveData(key, position, queve) {
  const { queveItem, index } = getQueveItem(key, queve.data)

  const updatedQueve = update(queve.data, {
    $splice: [
      [index, 1],
      [position, 0, queveItem],
    ],
  }).map((item, mapIndex) => {
    item.position = mapIndex
    return item
  })

  return updatedQueve
}

export function addDispensers(qty, device_shopify_product_id) {
  return {
    types: [
      ADD_DISPENSERS,
      ADD_DISPENSERS_SUCCESS,
      ADD_DISPENSERS_FAIL,
    ],
    promise: client =>
      client.post('api/device_count/' + device_shopify_product_id, { data: { number: qty } }),
  }
}

export function shipNow() {
  return {
    types: [ORDER_NOW, ORDER_NOW_SUCCESS, ORDER_NOW_FAIL],
    promise: client => client.get('api/order_now'),
  }
}

export function isLoaded(globalState) {
  return globalState.products && globalState.products.loaded
}

export function fetchQueveList() {
  return {
    types: [FETCH_QUEVE, FETCH_QUEVE_SUCCESS, FETCH_QUEVE_FAIL],
    promise: client => client.get('api/queue'),
  }
}

export function fetchQueveLength() {
  return {
    types: [FETCH_QUEVE_LEN, FETCH_QUEVE_LEN_SUCCESS, FETCH_QUEVE_LEN_FAIL],
    promise: client => client.get('api/queue_length'),
  }
}

export function fetchDevices(device_shopify_product_id) {

  return {
    types: [FETCH_DEVICES, FETCH_DEVICES_SUCCESS, FETCH_DEVICES_FAIL],
    promise: client => client.get('api/device_count/' + device_shopify_product_id),
  }
}

export function getQueueStatus() {

  return {
    types: [QUEVE_STATUS, QUEVE_STATUS_SUCCESS, QUEVE_STATUS_FAIL],
    promise: client => client.get('api/queue/status'),
  }
}

export function addQueveItem(product_id, count = 1) {
  return {
    types: [ADD_QUEVE_ITEM, ADD_QUEVE_ITEM_SUCCESS, ADD_QUEVE_ITEM_FAIL],
    promise: client => client.post('api/queue', {
      data: {
        product_id,
        count,
      }
    }),
  }
}

export function removeQueveItem(key) {
  return {
    types: [REMOVE_QUEVE_ITEM, REMOVE_QUEVE_ITEM_SUCCESS, REMOVE_QUEVE_ITEM_FAIL],
    promise: client => client.delete(`api/queue/${key}`),
  }
}

export function moveQueveItemCall(key, position, queve) {
  const localQueve = updateQueveData(key, position, queve)

  const data = {
    queue: localQueve,
  }

  return {
    localQueve,
    types: [MOVE_QUEVE_ITEM, MOVE_QUEVE_ITEM_SUCCESS, MOVE_QUEVE_ITEM_FAIL],
    promise: client => client.patch('api/queue/', { data }),
  }
}
