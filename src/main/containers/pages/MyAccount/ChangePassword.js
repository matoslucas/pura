import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm, SubmissionError } from 'redux-form'

import { updatePassword } from 'main/redux/modules/auth'

import { HeaderShop } from '../../../components/layout/'
import Breadcrumbs from '../../../components/interactive/Breadcrumbs'
import Form from '../../forms/generators/Form'

import {
  createValidator,
  match,
  minLength,
  required,
} from 'common/utils/validation'
import { Button, Input, Note } from '../../../components/forms'

class ChangePassword extends Component {
  static propTypes = {
    breadcrumbs: PropTypes.object,
    changePassword: PropTypes.object,
    error: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    submitSucceeded: PropTypes.bool,
    updatePassword: PropTypes.func.isRequired,
  }

  static validation = createValidator({
    currentPassword: required,
    newPassword: [required, minLength(6)],
    newPasswordCheck: [match('newPassword')],
  })

  constructor(props) {
    super(props)

    this.changePasswordCall = this.changePasswordCall.bind(this)
  }

  changePasswordCall(data) {
    const pwd = data.newPassword

    return this.props.updatePassword(pwd).catch(error => {
      console.log(error)

      if (error.code === 'auth/requires-recent-login') {
        throw new SubmissionError({
          passwordCheck: '',
          newPasswordCheck: '',
          _error: error.message,
        })
      }
    })
  }

  render() {
    const {
      breadcrumbs,
      changePassword,
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
              className="form--650"
              {...changePassword}
              error={error}
              onSubmit={handleSubmit(this.changePasswordCall)}
              submitting={submitting}
              submitSucceeded={submitSucceeded}
            />
          </div>
        </section>
      </div>
    )
  }
}

ChangePassword.defaultProps = {
  changePassword: {
    info: {
      heading: 'Change Password',
    },

    successMesage: 'Password successfully changed!',

    sections: [
      {
        className: 'form__section--300',
        fields: [
          {
            component: Input,
            name: 'current_password',
            label: false,
            placeholder: 'Current Password',
            type: 'password',
            icon: {
              type: 'pasword',
            },
          },
          {
            modifier: 'form__item--collapse',
            component: Note,
            name: 'forgotten-password',
            link: {
              text: 'Forgot password?',
              href: '/reset-password',
            },
          },
          {
            component: Input,
            name: 'newPassword',
            label: false,
            placeholder: 'New password',
            type: 'password',
            icon: {
              type: 'pasword',
            },
          },
          {
            component: Input,
            name: 'newPasswordCheck',
            label: false,
            placeholder: 'Confirm new password',
            type: 'password',
            icon: {
              type: 'pasword',
            },
          },
          {
            modifier: 'form__item--center',
            component: Button,
            name: 'submit-btn',
            className: 'btn--primary form__btn-final btn--shadow btn--fat',
            action: 'submit',
            text: 'Save password',
          },
          {
            modifier: 'form__item--center',
            component: Button,
            href: '/my-account',
            name: 'back-btn',
            className: '',
            text: 'Cancel',
          },
        ],
      },
    ],
  },
}

const ChangePasswordExport = compose(
  connect(
    state => ({
      auth: state.auth,
    }),
    { updatePassword }
  ),
  reduxForm({
    form: 'changePassword',
    validate: ChangePassword.validation,
    enableReinitialize: true,
  })
)(ChangePassword)

export default ChangePasswordExport
