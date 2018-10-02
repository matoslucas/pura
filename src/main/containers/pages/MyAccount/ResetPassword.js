import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import { Header } from '../../../components/layout/'
import Breadcrumbs from '../../../components/interactive/Breadcrumbs'
import Form from '../../forms/generators/Form'

import { createValidator, email, required } from 'common/utils/validation'
import { Button, Input, Note } from '../../../components/forms'

class ResetPassword extends Component {
  static propTypes = {
    breadcrumbs: ProPTypes.object,
    error: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    resetPassword: PropTypes.object,
    successMesage: PropTypes.string,
    submitting: PropTypes.bool,
    submitSucceeded: PropTypes.bool,
    pushState: PropTypes.func.isRequired,
  }

  static validation = createValidator({
    email: [required, email],
  })

  constructor(props) {
    super(props)

    this.resetPasswordCall = this.resetPasswordCall.bind(this)
  }

  resetPasswordCall(data) {
    console.log(data)
    this.props.pushState('/check-email')
  }

  render() {
    const {
      breadcrumbs,
      error,
      handleSubmit,
      resetPassword,
      submitting,
      submitSucceeded,
    } = this.props

    return (
      <div className="pura-web__container">
        <Header />

        <section className="pura-web__section my-account__change-email">
          <div className="container">
            <Breadcrumbs className="my-account__breadcrumbs" {...breadcrumbs} />
            <Form
              {...resetPassword}
              error={error}
              onSubmit={handleSubmit(this.resetPasswordCall)}
              submitting={submitting}
              submitSucceeded={submitSucceeded}
            />
          </div>
        </section>
      </div>
    )
  }
}

ResetPassword.defaultProps = {
  // breadcrumbs: {
  //   items: [
  //     {
  //       href: '/shop',
  //       text: 'Marketplace',
  //     },
  //     {
  //       href: '/my-account',
  //       text: 'My Account',
  //     },
  //     {
  //       href: null,
  //       text: 'Reset password',
  //     },
  //   ],
  // },

  resetPassword: {
    info: {
      heading: 'Forgotten Password',
      text: 'Enter your email and we’ll send you a link to reset your password',
    },

    sections: [
      {
        className: 'form__section--300',
        fields: [
          {
            component: Input,
            name: 'email',
            label: false,
            placeholder: 'Email Adress',
            type: 'email',
            icon: {
              type: 'mail',
            },
          },
          {
            modifier: 'form__item--center',
            component: Button,
            name: 'submit-btn',
            className: 'btn--primary btn--shadow btn--fat',
            action: 'submit',
            text: 'Reset password',
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

const ResetPasswordCompose = compose(
  connect(() => ({}), { pushState: push }),
  reduxForm({
    form: 'resetPassword',
    validate: ResetPassword.validation,
    enableReinitialize: true,
  })
)(ResetPassword)

export default ResetPasswordCompose
