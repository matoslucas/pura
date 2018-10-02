import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm, SubmissionError } from 'redux-form'

import { addCard, listCard } from 'main/redux/modules/stripe'

import { HeaderShop } from '../../../components/layout/'
import Breadcrumbs from '../../../components/interactive/Breadcrumbs'
import InfoBox from '../../../components/boxes/InfoBox'
import StyledTable from '../../../components/tables/StyledTable'
import Form from '../../forms/generators/Form'

import { createValidator, creditCard, creditCardExp, creditCardCvc, required, zipCode } from 'common/utils/validation'
import { Button, ExpiryField, Input, Note } from '../../../components/forms'

const constructCardList = props => {
  const stripe = props.stripe

  const header = {
    cells: [
      {
        className: '',
        text: 'Card Type',
      },
      {
        className: '',
        text: 'Cardholder',
      },
      {
        className: '',
        text: 'Card Number',
      },
      {
        className: 'styled-table__header-item--right',
        text: 'Expiration',
      },
    ],
  }

  let rows = [
    {
      className: 'styled-table__cell-loading',
      cells: [
        {
          colspan: 4,
          className: 'styled-table__cell--center',
          text: 'No cards registered',
        },
      ],
    },
  ]

  if (stripe.data) {
    const card = stripe.data
    rows = []

    rows.push({
      className: '',
      cells: [
        {
          className: '',
          text: card.brand,
        },
        {
          className: '',
          text: card.name,
        },
        {
          className: 'styled-table__cell--highlight',
          text: `**** **** **** ${card.last4}`,
        },
        {
          className: 'styled-table__cell--right',
          text: `${card.exp_month}/${card.exp_year}`,
        },
      ],
    })
  }

  return {
    header,
    rows,
  }
}

class ChangePayment extends Component {
  static propTypes = {
    addCard: PropTypes.func.isRequired,
    breadcrumbs: PropTypes.object,
    cardListInfo: PropTypes.object,
    changePayment: PropTypes.object,
    error: PropTypes.object,
    handleSubmit: PropTypes.func,
    submitSucceeded: PropTypes.bool,
    submitting: PropTypes.bool,
  }

  static validation = createValidator({
    cardNumber: [required, creditCard],
    cardName: required,
    cardExp: [required, creditCardExp],
    cardCvc: [required, creditCardCvc],

    billingFirstName: required,
    billingLastName: required,
    billingAdress: required,
    billingZipCode: [required, zipCode],
    billingCity: required,
  })


  constructor(props) {
    super(props)

    this.changePaymentCall = this.changePaymentCall.bind(this)
  }

  componentWillMount() {
    return this.props.listCard()
  }

  changePaymentCall(data) {
    const expMonth = data.cardExp.split('/')

    const formattedData = {
      object: 'card',
      exp_month: expMonth[0],
      exp_year: expMonth[1],
      number: data.cardNumber,
      cvc: data.cardCvc,
      name: data.cardName,

      address_line1: data.billingAdress,
      address_line2: data.billingAdress2 || null,
      address_zip: data.billingZipCode,
      address_city: data.billingCity,
      address_state: data.billingState,
      address_country: 'US',
    }

    return this.props.addCard(formattedData)
      .catch(error => {
        console.log(error)

        if (error.code) {
          throw new SubmissionError({ _error: error.message })
        }
      })
  }


  render() {
    const {
      breadcrumbs,
      cardListInfo,
      changePayment,
      handleSubmit,
      error,
      submitting,
      submitSucceeded,
    } = this.props
    const cardsList = constructCardList(this.props)

    return (
      <div className="pura-web__container">
        <HeaderShop />

        <section className="pura-web__section my-account__change-email">
          <div className="container">
            <Breadcrumbs className="my-account__breadcrumbs" {...breadcrumbs} />
            <InfoBox className="info-box--big info-box--center" {...cardListInfo} />

            {cardsList && <StyledTable className="styled-table--500" {...cardsList} />}

            <Form
              {...changePayment}
              className="form--650"
              error={error}
              onSubmit={handleSubmit(this.changePaymentCall)}
              submitting={submitting}
              submitSucceeded={submitSucceeded}
            />
          </div>
        </section>
      </div>
    )
  }
}


ChangePayment.defaultProps = {
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
        text: 'Change Payment',
      },
    ],
  },
  

  cardListInfo: {
    heading: 'Registered Card',
  },

  changePayment: {
    info: {
      heading: 'Update Payment Info',
      text: 'Your new payment method will be applied to your next billing cycle. Your monthly membership is billed on the first day of each billing period.',
    },

    successMesage: 'Card successfully added!',

    sections: [
      {
        className: 'form__section--400',
        heading: 'Credit Card Information',
        fields: [
          {
            component: Input,
            name: 'cardNumber',
            label: 'Card number',
            maxLength: 16,
          },
          {
            component: Input,
            name: 'cardName',
            label: 'Name on card',
          },
          {
            column: 50,
            component: ExpiryField,
            name: 'cardExp',
            placeholder: 'MM/YY',
            label: 'Exp',
            maxLength: 5,
          },
          {
            column: 30,
            component: Input,
            name: 'cardCvc',
            label: 'CVC',
            maxLength: 4,
          },
        ],
      },
      {
        className: 'form__section--400',
        heading: 'Billing Address',
        fields: [
          {
            component: Input,
            name: 'billingFirstName',
            label: 'First name',
          },
          {
            component: Input,
            name: 'billingLastName',
            label: 'Last name',
          },
          {
            component: Input,
            name: 'billingAdress',
            label: 'Adress',
          },
          {
            component: Input,
            name: 'billingAdress2',
            label: 'Adress 2',
          },
          {
            component: Input,
            name: 'billingCity',
            label: 'City',
          },
          {
            column: true,
            component: Input,
            name: 'billingZipCode',
            label: 'Zip code',
          },
          {
            column: true,
            component: Input,
            name: 'billingState',
            label: 'State',
          },
          {
            modifier: 'form__item--center',
            component: Button,
            name: 'submit-btn-payment',
            className: 'btn--primary btn--shadow btn--fat',
            action: 'submit',
            text: 'Save payment info',
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

const ChangePaymentExport = compose(
  connect(
    state => ({
      stripe: state.stripe,
    }),
    { addCard, listCard }
  ),
  reduxForm({
    form: 'changePayment',
    validate: ChangePayment.validation,
    enableReinitialize: true,
  })
)(ChangePayment)

export default ChangePaymentExport
