import React, { PureComponent, PropTypes } from 'react'

import Form from '../../../containers/forms/generators/Form'
import { Button, ExpiryField, Input, Separator, Note } from '../../forms'

class RegisterPayment extends PureComponent {
  static propTypes = {
    error: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    registerPayment: PropTypes.object,
    submitting: PropTypes.bool,
  }

  get formConfig() {
    const { registerPayment, summaryTableSection } = this.props

    return {
      ...registerPayment,
      sections: registerPayment.sections.concat(summaryTableSection),
    }
  }
  
  componentDidMount() {
    this.props.onDisplay();
  }


  render() {
    const { error, onSubmit, submitting } = this.props
    return (
      <section className="pura-register register-payment" style={{ fontWeight: 700 }}>
        <Form
          {...this.formConfig}
          className="form--650 form--spaced"
          error={error}
          handleChange={this.props.onChange}
          onSubmit={onSubmit}
          submitting={submitting}
        />
      </section>
    )
  }
}

RegisterPayment.defaultProps = {
  error: null,
  submitting: false,

  registerPayment: {
    info: {
      heading: 'Payment Information',
      // text: '30-Day Supply of Designer home Fragrances for $12',
    },

    sections: [
      {
        className: 'form__section--400 col-lg-7 col-md-7 col-sm-7',
        // heading: 'Credit Card Information',
        fields: [
          // {
          //   column: true,
          //   modifier: 'payment-button',
          //   component: Button,
          //   name: 'submit-btn-paypal',
          //   className: 'paypal',
          //   action: 'button',
          //   icon: {
          //     type: 'paypal',
          //   },
          // },
          // {
          //   column: true,
          //   modifier: 'payment-button',
          //   component: Button,
          //   name: 'submit-btn-amazone',
          //   className: 'amazone',
          //   action: 'button',
          //   icon: {
          //     type: 'amazon',
          //   },
          // },
          // {
          //   component: Separator,
          //   className: '',
          //   name: '',
          //   text: 'OR',
          // },
          {
            component: Note,
            className: 'form__note--info heading_info',
            name: '',
            text: 'CREDIT CARD INFORMATION',
          },
          {
            component: Input,
            name: 'cardNumber',
            id: 'payment-form-cardNumber',
            label: 'Card Number',
            maxLength: 16,
          },
          {
            component: Input,
            name: 'cardName',
            id: 'payment-form-cardName',
            label: 'Name on Card',
          },
          {
            column: true,
            component: ExpiryField,
            name: 'cardExp',
            id: 'payment-form-cardExp',
          },
          {
            column: true,
            component: Input,
            id: 'payment-form-cardCvc',
            name: 'cardCvc',
            label: 'CVC',
            maxLength: 4,
          },
          {
            component: Note,
            className: 'form__note--info heading_info',
            name: '',
            text: '<b>BILLING ADDRESS</b>',
          },
          {
            component: Input,
            name: 'billingFirstName',
            id: 'payment-form-billingFirstName',
            label: 'First Name',
          },
          {
            component: Input,
            name: 'billingLastName',
            id: 'payment-form-billingLastName',
            label: 'Last Name',
          },
          {
            component: Input,
            name: 'billingAdress',
            id: 'payment-form-billingAdress',
            label: 'Address',
          },
          {
            component: Input,
            name: 'billingAdress2',
            id: 'payment-form-billingAdress2',
            label: 'Address 2',
          },
          {
            component: Input,
            name: 'billingCity',
            id: 'payment-form-billingCity',
            label: 'City',
          },
          {
            modifier: 'form__item--column-60',
            component: Input,
            maxLength: 5,
            name: 'billingZipCode',
            id: 'payment-form-billingZipCode',
            label: 'Zip Code',
          },
          {
            modifier: 'form__item--column-40',
            component: Input,
            maxLength: 2,
            name: 'billingState',
            id: 'payment-form-billingState',
            label: 'State',
          },
          /*
          {
            modifier: 'form__item--center',
            component: Button,
            name: 'submit-btn-final',
            className: 'btn--primary btn-final btn--shadow btn--fat',
            action: 'submit',
            text: 'Continue',
          },*/
        ],
      },
    ],
  },
}

export default RegisterPayment
