import React, { Component, PropTypes } from 'react'

import PlanWidget from '../../interactive/PlanWidget'
import { Button, Note, CheckBox } from '../../forms/'
import Form from '../../../containers/forms/generators/Form'

class RegisterPlan extends Component {
  static propTypes = {
    error: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    registerAccount: PropTypes.object,
    submitting: PropTypes.bool,
  }
  render() {
    const { registerAccount, error, onSubmit, submitting } = this.props

    return (
      <section className="pura-register register-plan">
        <div className="container">
          <Form
            {...registerAccount}
            className="form--550 form--spaced"
            error={error}
            onSubmit={onSubmit}
            submitting={submitting}
          />
        </div>
      </section>
    )
  }
}

RegisterPlan.defaultProps = {
  error: null,
  submitting: false,
  onSubmit: false,
  registerAccount: {
    info: {
      heading: 'Your Plan',
      className: 'info-box__section--free-plan-text form__section--400',
      text: 'FIRST MONTH FREE',
      smallText: 'With the purchase of a dispenser',
    },
    sections: [
      {
        className: 'form__section--400',
        fields: [
          {
            component: PlanWidget,
            modifier: 'form__item--collapse',
            name: 'planWidget',
            currentPlan: '',
            changeHeading: 'Select Your Plan',
          },
          {
            component: Note,
            className: 'form__note--left form__note--padding form__note--11',
            name: 'social-info',
            text:
              'Subscriptions will be automatically renewed for successive monthly periods and your payment method will automatically be charged until you cancel. You may cancel your subscription at any time by following the cancellation procedures from the My Account page.',
            link: null,
          },
          {
            component: CheckBox,
            className: 'form__note--left form__note--12',
            id: 'yourPlan',
            name: 'yourPlan',
            agreeLabel: 'I agree to the Pura ',
            termsLink: 'http://help.trypura.com/legal/terms-of-service',
            privacyLink: 'http://help.trypura.com/legal/privacy-policy',
            icon: { type: 'ok' },
          },
        ],
      },
      {
        className: '',
        fields: [
          {
            component: Button,
            modifier: 'form__item--center',
            name: 'submit-btn-plan',
            className: 'btn--primary btn--shadow btn--fat',
            action: 'submit',
            text: 'Continue',
          },
        ],
      },
    ],
  },
}

export default RegisterPlan
