import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { change, formValueSelector } from 'redux-form'

import Form from '../../../containers/forms/generators/Form'
import { Button, CheckBox, Separator, Input, Note } from '../../forms'

class RegisterShipping extends Component {
  static propTypes = {
    billingAdressValues: PropTypes.object.isRequired,
    error: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    reduxChange: PropTypes.func.isRequired,
    registerAdress: PropTypes.object,
    sameAdress: PropTypes.object.isRequired,
    submitting: PropTypes.bool,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sameAdress !== nextProps.sameAdress) {
      nextProps.sameAdress ? this.duplicateFields() : this.clearFields()
    }
  }
  componentDidMount(){
    this.props.onDisplay();
  }

  duplicateFields() {
    const { reduxChange, billingAdressValues } = this.props

    Object.keys(billingAdressValues).map(key => {
      const value = billingAdressValues[key] || ''

      return reduxChange('account-setup', key, value)
    })
  }

  clearFields() {
    const { reduxChange, billingAdressValues } = this.props

    Object.keys(billingAdressValues).map(key =>
      reduxChange('account-setup', key, '')
    )
  }

  get formConfig() {
    const { registerAdress, summaryTableSection } = this.props

    return {
      ...registerAdress,
      sections: registerAdress.sections.concat(summaryTableSection),
    }
  }

  render() {
    const { error, onSubmit, submitting } = this.props

    return (
      <section className="pura-register register-shipping" style={{ fontWeight: 700 }}>
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

RegisterShipping.defaultProps = {
  error: null,
  submitting: false,

  registerAdress: {
    info: {
      heading: 'Shipping Information',
      className: 'register__shipping--heading',
    },

    sections: [
      {
        className: 'form__section--400 col-lg-7 col-md-7 col-sm-7',
        fields: [
          {
            component: CheckBox,
            name: 'sameAdress',
            id: 'sameAdress',
            label: 'Shipping address is the same as billing address',
            icon: { type: 'ok' },
          },
          {
            component: Input,
            name: 'shippingFirstName',
            id: 'payment-form-shippingFirstName',
            label: 'First Name',
          },
          {
            component: Input,
            name: 'shippingLastName',
            id: 'payment-form-shippingLastName',
            label: 'Last Name',
          },
          {
            component: Input,
            name: 'shippingAdress',
            id: 'payment-form-shippingAdress',
            label: 'Address',
          },
          {
            component: Input,
            name: 'shippingAdress2',
            id: 'payment-form-shippingAdress2',
            label: 'Address 2',
          },
          {
            column: true,
            component: Input,
            name: 'shippingCity',
            id: 'payment-form-shippingCity',
            label: 'City',
          },
          {
            modifier: 'form__item--column-60',
            component: Input,
            maxLength: 5,
            name: 'shippingZipCode',
            id: 'payment-form-shippingZipCode',
            label: 'Zip Code',
          },
          {
            modifier: 'form__item--column-40',
            component: Input,
            maxLength: 2,
            name: 'shippingState',
            id: 'payment-form-shippingState',
            label: 'State',
          },
          {
            component: Note,
            className: 'form__note--center',
            name: 'register-note-final',
            text: 'By creating an account you agree to',
            link: {
              external: true,
              text: 'our terms',
              href: 'http://help.trypura.com/legal/terms-of-service',
            },
          },
          /*
          {
            modifier: 'form__item--center',
            component: Button,
            name: 'submit-btn-adress',
            className: 'btn--primary btn--shadow btn--fat',
            action: 'submit',
            text: 'Finish',
          },*/
        ],
      },
    ],
  },
}

const formSelector = formValueSelector('account-setup')

const RegisterShippingConnect = connect(
  state => ({
    sameAdress: formSelector(state, 'sameAdress'),
    billingAdressValues: {
      shippingFirstName: formSelector(state, 'billingFirstName'),
      shippingLastName: formSelector(state, 'billingLastName'),
      shippingAdress: formSelector(state, 'billingAdress'),
      shippingAdress2: formSelector(state, 'billingAdress2'),
      shippingZipCode: formSelector(state, 'billingZipCode'),
      shippingState: formSelector(state, 'billingState'),
      shippingCity: formSelector(state, 'billingCity'),
    },
  }),
  { reduxChange: change }
)(RegisterShipping)

export default RegisterShippingConnect
