import { I18n } from 'react-i18nify'

const NOTIFICATION = 'strv-template/appState/NOTIFICATION'
const SWITCH_LANGUAGE = 'strv-template/appState/SWITCH_LANGUAGE'

const initialState = {
  notification: {
    message: '',
    level: '',
    active: false,
  },
  locale: 'en',
}

export default function reducer(state = initialState, action = {}) {
  
  switch (action.type) {
    // case NOTIFICATION:
    //   return {
    //     ...state,
    //     notification: {
    //       message: action.message,
    //       level: action.level || 'info',
    //       active: typeof action.active !== 'undefined' ? action.active : true,
    //     },
    //   }
    case SWITCH_LANGUAGE:
      I18n.setLocale(action.language)
      return {
        ...state,
        locale: action.language,
      }
    default:
      return state
  }
}

// export function notification(message, level, active) {
  
//   return {
//     type: NOTIFICATION,
//     message,
//     level,
//     active,
//   }
// }

export function selectLanguage(language) {
  return {
    type: SWITCH_LANGUAGE,
    language,
  }
}
