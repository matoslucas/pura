import {
  firebaseLogin,
  firebaseLoginWithToken,
  firebaseLoginWithFacebbok,
  firebaseLoginWithGoogle,
  firebaseLoginWithTwitter,
  firebaseLogout,
  firebaseUpdatePassword,
  firebaseResetPassword,
  refreshToken,
  firebaseGetUser,
  firebaseGetRedirectResult,
  firebaseReauthenticate,
} from 'common/helpers/FirebaseClient'

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'

const LOGOUT = 'LOGOUT'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const LOGOUT_FAIL = 'LOGOUT_FAIL'

const REFRESH_TOKEN = 'REFRESH_TOKEN'
const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS'
const REFRESH_TOKEN_FAIL = 'REFRESH_TOKEN_FAIL'

const UPDATE_PWD = 'UPDATE_PWD'
const UPDATE_PWD_SUCCESS = 'UPDATE_PWD_SUCCESS'
const UPDATE_PWD_FAIL = 'UPDATE_PWD_FAIL'

const RESET_PWD = 'RESET_PWD'
const RESET_PWD_SUCCESS = 'RESET_PWD_SUCCESS'
const RESET_PWD_FAIL = 'RESET_PWD_FAIL'

const CREATE_FIREBASE_USER = 'CREATE_FIREBASE_USER'
const CREATE_FIREBASE_USER_SUCCESS = 'CREATE_FIREBASE_USER_SUCCESS'
const CREATE_FIREBASE_USER_FAIL = 'CREATE_FIREBASE_USER_FAIL'

const GET_FIREBASE_USER = 'GET_FIREBASE_USER'
const GET_FIREBASE_USER_SUCCESS = 'GET_FIREBASE_USER_SUCCESS'
const GET_FIREBASE_USER_FAIL = 'GET_FIREBASE_USER_FAIL'

const GET_REDIRECT_RESULT = 'GET_REDIRECT_RESULT'
const GET_REDIRECT_RESULT_SUCCESS = 'GET_REDIRECT_RESULT_SUCCESS'
const GET_REDIRECT_RESULT_FAIL = 'GET_REDIRECT_RESULT_FAIL'

const REAUTHENTICATE = 'REAUTHENTICATE'
const REAUTHENTICATE_SUCCESS = 'REAUTHENTICATE_SUCCESS'
const REAUTHENTICATE_FAIL = 'REAUTHENTICATE_FAIL'

const REMOVE_FIREBASE_USER = 'REMOVE_FIREBASE_USER'

const UPDATE_EMAIL = 'UPDATE_EMAIL'
const UPDATE_EMAIL_SUCCESS = 'UPDATE_EMAIL_SUCCESS'
const UPDATE_EMAIL_FAIL = 'UPDATE_EMAIL_FAIL'

const initialState = {
  error: null,
  redirectResultError: null,
  loading: false,
  loaded: false,
  token: null,
  user: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        // user: action.result,
      }
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        token: null,
      }
    case LOGOUT:
      return {
        ...state,
        loading: true,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: null,
        token: null,
        user: null,
      }
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case UPDATE_PWD:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_PWD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        response: action.result,
      }
    case UPDATE_PWD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case RESET_PWD:
      return {
        ...state,
        loading: true,
      }
    case RESET_PWD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        response: action.result,
      }
    case RESET_PWD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case UPDATE_EMAIL:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      }
    case UPDATE_EMAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case REFRESH_TOKEN:
      return {
        ...state,
        prevLoaded: true,
        loading: true,
      }
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        token: action.result,
      }
    case REFRESH_TOKEN_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        token: null,
        error: action.error,
      }
    case CREATE_FIREBASE_USER:
      return {
        ...state,
        loading: true,
      }
    case CREATE_FIREBASE_USER_SUCCESS:
      return {
        ...state,
        response: action.result,
        loading: false,
        error: null,
      }
    case CREATE_FIREBASE_USER_FAIL:
      return {
        ...state,
        user: null,
        error: action.error,
        loading: false,
      }
    case GET_FIREBASE_USER:
      return {
        ...state,
        loading: true,
      }
    case GET_FIREBASE_USER_SUCCESS:
      return {
        ...state,
        user: setUserDefaults(action.result),
        error: null,
        loading: false,
      }
    case GET_FIREBASE_USER_FAIL:
      return {
        ...state,
        user: null,
        error: action.error,
        loading: false,
      }
    case GET_REDIRECT_RESULT:
      return state
    case GET_REDIRECT_RESULT_SUCCESS:
      return state
    case GET_REDIRECT_RESULT_FAIL:
      return { ...state, redirectResultError: action.error }
    case REMOVE_FIREBASE_USER:
      return {
        ...state,
        loading: false,
        loaded: false,
        user: null,
      }
    default:
      return state
  }
}

function setUserDefaults(user) {
  const userData = user

  if (userData) {
    userData.shopify_acc_ready = userData.shopify_acc_ready || false
    userData.stripe_card_set = userData.stripe_card_set || false
  }

  return userData
}

export function changeEmail(data) {
  return {
    types: [UPDATE_EMAIL, UPDATE_EMAIL_SUCCESS, UPDATE_EMAIL_FAIL],
    promise: client => client.post('api/update_email', { data }),
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.loaded
}

export function logIn(email, pw) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: () => firebaseLogin(email, pw),
  }
}

export function logInWithToken(customToken) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: () => firebaseLoginWithToken(customToken),
  }
}

export function logInWithFacebook() {
  console.info('logInWithFacebook');
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: () => firebaseLoginWithFacebbok(),
  }
}

export function logInWithGoogle() {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: () => firebaseLoginWithGoogle(),
  }
}
export function logInWithTwitter() {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: () => firebaseLoginWithTwitter(),
  }
}

export function logOut() {
  console.info('logOut redux')
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: () => firebaseLogout(),
  }
}

export function updatePassword(newPwd) {
  return {
    types: [UPDATE_PWD, UPDATE_PWD_SUCCESS, UPDATE_PWD_FAIL],
    promise: () => firebaseUpdatePassword(newPwd),
  }
}

export function resetPassword(mail) {
  return {
    types: [RESET_PWD, RESET_PWD_SUCCESS, RESET_PWD_FAIL],
    promise: () => firebaseResetPassword(mail),
  }
}

export function getRedirectResult() {
  return {
    types: [
      GET_REDIRECT_RESULT,
      GET_REDIRECT_RESULT_SUCCESS,
      GET_REDIRECT_RESULT_FAIL,
    ],
    promise: () => firebaseGetRedirectResult(),
  }
}

export function getToken() {
  return {
    types: [REFRESH_TOKEN, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAIL],
    promise: () => refreshToken(),
  }
}

export function createFirebaseUser(data) {
  return {
    types: [
      CREATE_FIREBASE_USER,
      CREATE_FIREBASE_USER_SUCCESS,
      CREATE_FIREBASE_USER_FAIL,
    ],
    promise: client => client.post('api/social_login', { data }),
  }
}

export function getFirebaseUser(uid) {
  return {
    types: [
      GET_FIREBASE_USER,
      GET_FIREBASE_USER_SUCCESS,
      GET_FIREBASE_USER_FAIL,
    ],
    promise: () => firebaseGetUser(uid),
  }
}

export function removeFirebaseUser() {
  return {
    type: REMOVE_FIREBASE_USER,
    payload: null,
  }
}

export function reauthenticate(password) {
  return {
    types: [REAUTHENTICATE, REAUTHENTICATE_SUCCESS, REAUTHENTICATE_FAIL],
    promise: () => firebaseReauthenticate(password),
  }
}
