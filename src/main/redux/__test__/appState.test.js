import { expect } from 'chai'
import * as appState from 'main/redux/modules/appState'

describe('Redux - appState', () => {
  const initialState = {
    notification: {
      message: '',
      level: '',
      active: false,
    },
    locale: 'en',
  }

  it('init reducer', () => {
    /*
     * reducer load
     */
    expect(appState.default(initialState, {}))
      .to.deep.equal(initialState)

    /*
     * reducer should return own initialState
     */
    expect(appState.default()).to.deep.equal(initialState)
  })

  it('should handle notification()', () => {
    /*
     * notification without parametr should return level 'info'
     */
    expect(appState.default(initialState, appState.notification('sample message')))
      .to.deep.equal({
        ...initialState,
        notification: {
          message: 'sample message',
          level: 'info',
          active: true,
        },
      }
    )

    /*
     * test error message
     */
    expect(appState.default(initialState, appState.notification('sample message', 'error')))
      .to.deep.equal({
        ...initialState,
        notification: {
          message: 'sample message',
          level: 'error',
          active: true,
        },
      }
    )

    /*
     * test success message
     */
    expect(appState.default(initialState, appState.notification('sample message', 'success')))
      .to.deep.equal({
        ...initialState,
        notification: {
          message: 'sample message',
          level: 'success',
          active: true,
        },
      }
    )

    /*
     * deactivate notification
     */
    expect(appState.default(initialState, appState.notification('sample message', 'success', false)))
      .to.deep.equal({
        ...initialState,
        notification: {
          message: 'sample message',
          level: 'success',
          active: false,
        },
      }
    )
  })

  it('should handle selectLanguage()', () => {
    /*
     * should switch language
     */
    expect(appState.default(initialState, appState.selectLanguage('de')))
      .to.deep.equal({
        ...initialState,
        locale: 'de',
      }
    )
  })
})
