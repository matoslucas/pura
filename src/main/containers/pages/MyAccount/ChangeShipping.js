import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'

import { updateUser } from 'main/redux/modules/user'

import { HeaderShop } from '../../../components/layout/'
import Breadcrumbs from '../../../components/interactive/Breadcrumbs'
import Form from '../../forms/generators/Form'

import { createValidator, required, zipCode } from 'common/utils/validation'
import { Button, Input, Note } from '../../../components/forms'

class ChangeShipping extends Component {
  static propTypes = {
    breadcrumbs: PropTypes.object,
    changeShipping: PropTypes.object,
    error: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    successMesage: PropTypes.string,
    submitting: PropTypes.bool,
    submitSucceeded: PropTypes.bool,
    updateUser: PropTypes.func.isRequired,
  }

  static validation = createValidator({
    shippingFirstName: required,
    shippingLastName: required,
    shippingAdress: required,
    shippingZipCode: [required, zipCode],
    shippingCity: required,
  })

  constructor(props) {
    super(props)

    this.changeShippingCall = this.changeShippingCall.bind(this)
  }

  formatUserData(data) {
    
    if(!data.shippingAdress2){
      data.shippingAdress2='';
    }

    return {
      customer: {
        addresses: [
          {
            address1: `${data.shippingAdress} ${data.shippingAdress2}`,
            city: data.shippingCity,
            province: data.shippingState,
            phone: data.shippingPhone,
            zip: data.shippingZipCode,
            last_name: data.shippingLastName,
            first_name: data.shippingFirstName,
            country: 'US',
          },
        ],
      },
    }
  }

  changeShippingCall(data) {
    return this.props
      .updateUser(this.formatUserData(data))
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }

  render() {
    const {
      breadcrumbs,
      changeShipping,
      handleSubmit,
      error,
      submitting,
      submitSucceeded,
    } = this.props

    return (
      <div className="pura-web__container">
        <HeaderShop />

        <section className="pura-web__section my-account__change-email">
          <div className="container">
            <Breadcrumbs className="my-account__breadcrumbs" {...breadcrumbs} />
            <Form
              {...changeShipping}
              error={error}
              onSubmit={handleSubmit(this.changeShippingCall)}
              submitting={submitting}
              submitSucceeded={submitSucceeded}
            />
          </div>
        </section>
      </div>
    )
  }
}

ChangeShipping.defaultProps = {
  breadcrumbs: {
    items: [
      {
        href: '/shop',
        text: 'Marketplace',
      },
      {
        href: '/my-account',
        text: 'My Account',
      },
      {
        href: null,
        text: 'Update Shipping Details',
      },
    ],
  },

  changeShipping: {
    info: {
      heading: 'Update Shipping Details',
    },

    successMesage: 'Your address was succesfully updated',

    sections: [
      {
        className: 'form__section--400',
        fields: [
          {
            component: Input,
            name: 'shippingFirstName',
            label: 'First name',
          },
          {
            component: Input,
            name: 'shippingLastName',
            label: 'Last name',
          },
          {
            component: Input,
            name: 'shippingAdress',
            label: 'Address',
          },
          {
            component: Input,
            name: 'shippingAdress2',
            label: 'Address 2',
          },
          {
            component: Input,
            name: 'shippingCity',
            label: 'City',
          },
          {
            column: true,
            component: Input,
            name: 'shippingZipCode',
            label: 'Zip code',
          },
          {
            column: true,
            component: Input,
            name: 'shippingState',
            label: 'State',
          },
          {
            component: Input,
            name: 'shippingPhone',
            label: 'Contact phone',
          },
          {
            modifier: 'form__item--center',
            component: Button,
            name: 'submit-btn-shipping',
            className: 'btn--primary btn--shadow btn--fat',
            action: 'submit',
            text: 'Save shipping details',
          },
          {
            modifier: 'form__item--center',
            component: Button,
            href: '/my-account',
            name: 'back-btn',
            className: '',
            text: 'Back',
          },
        ],
      },
    ],
  },
}

const ChangeShippingExport = compose(
  connect(
    state => ({
      user: state.user,
    }),
    { updateUser }
  ),
  reduxForm({
    form: 'changeShipping',
    validate: ChangeShipping.validation,
    enableReinitialize: true,
  })
)(ChangeShipping)

export default ChangeShippingExport
