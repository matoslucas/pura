import React from 'react'
import { IndexRoute, Route } from 'react-router'
import { isLoaded } from 'main/redux/modules/auth'
import App from './app'

import * as Page from 'main/containers/pages'
import { I18n } from 'react-i18nify'
import translations from 'main/constants/i18n'


export default store => {
  I18n.loadTranslations(translations)
  let selectLanguage =
    (
      store.getState().routing &&
      store.getState().routing.location &&
      store.getState().routing.location.query &&
      store.getState().routing.location.query.lang
    ) || store.getState().appState.locale

  switch (selectLanguage) {
    case 'en': break
    case 'de': break
    case 'cs': break
    default:
      selectLanguage = store.getState().appState.locale
  }

  I18n.setLocale(selectLanguage)

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Page.Home} />

      <Route path="/register" component={Page.Register} />
      <Route path="/login" component={Page.Login} />
      <Route path="/setup" component={Page.Setup} />
      <Route path="/reset-password" component={Page.ResetPassword} />
      <Route path="/check-email" component={Page.CheckEmail} />
      <Route path="/shop" component={Page.Shop} />
      <Route path="/shop/:productHandle" component={Page.ProductView} />
      <Route path="/queue" component={Page.Queve} />

      <Route path="/my-account" component={Page.MyAccount} />
      <Route path="/my-account/change-email" component={Page.ChangeEmail} />
      <Route path="/my-account/change-password" component={Page.ChangePassword} />
      <Route path="/my-account/reset-password" component={Page.ResetPassword} />
      <Route path="/my-account/change-payment" component={Page.ChangePayment} />
      <Route path="/my-account/change-plan" component={Page.ChangePlan} />
      <Route path="/my-account/change-shipping" component={Page.ChangeShipping} />
      <Route path="/my-account/order-history" component={Page.OrderHistory} />

      <Route path="*" component={Page.NotFound} status={404} />
    </Route>
  )
}
