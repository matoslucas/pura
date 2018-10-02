const SIGNUP = 'SIGNUP'
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const SIGNUP_FAIL = 'SIGNUP_FAIL'

const USE_DISCOUNT_CODE = 'USE_DISCOUNT_CODE'
const USE_DISCOUNT_CODE_SUCCESS = 'USE_DISCOUNT_CODE_SUCCESS'
const USE_DISCOUNT_CODE_FAIL = 'USE_DISCOUNT_CODE_FAIL'

const REGISTRATION_BILL = 'REGISTRATION_BILL'
const REGISTRATION_BILL_SUCCESS = 'REGISTRATION_BILL_SUCCESS'
const REGISTRATION_BILL_FAIL = 'REGISTRATION_BILL_FAIL'

const initialState = {
  loading: false,
  loaded: false,
  result: null,
  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        loading: true,
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        result: action.result,
      }
    case SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        result: action.error,
      }
    case REGISTRATION_BILL_SUCCESS:
      return {
        ...state,
        data: action.result,
        error: null,
      }
    default:
      return state
  }
}

export function isLoaded(globalState) {
  return globalState.products && globalState.products.loaded
}

export function createAccount(data) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: client => client.post('api/sign_up', { data }),
  }
}

export function useDiscountCode(code) {
  return {
    types: [
      USE_DISCOUNT_CODE,
      USE_DISCOUNT_CODE_SUCCESS,
      USE_DISCOUNT_CODE_FAIL,
    ],
    promise: client =>
      client.post('api/use_discount_code', { data: { discount_code: code } }),
  }
}


export function registrationBill(promo_code, fragrances_count, dispenser_count) {
 
  let data = {};
  if (promo_code) {
    data = { promo_code, fragrances_count, dispenser_count };
  } else {
    data = { fragrances_count, dispenser_count };
  }
  return {
    types: [
      REGISTRATION_BILL,
      REGISTRATION_BILL_SUCCESS,
      REGISTRATION_BILL_FAIL,
    ],
    promise: client =>
      client.post('api/get_registration_bill/', { data }),
  }
}
