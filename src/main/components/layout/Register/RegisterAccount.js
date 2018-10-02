import React, { Component, PropTypes } from 'react'

import Form from '../../../containers/forms/generators/Form'
import { Button, Input, Separator, Note } from '../../forms'

class RegisterAccount extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = (name, event) => {

    switch (name) {
      case 'facebook-login':
        //event.preventDefault()
        this.props.onRegister(name)
        break
      case 'twitter-login':
        // event.preventDefault()
        this.props.onRegister(name)
        break
      case 'google-login':
        //event.preventDefault()
        this.props.onRegister(name)
        break
      default:
        break
    }
  }

  render() {
    const { error, registerAccount, onSubmit, submitting } = this.props

    return (
      <section className="pura-register register-account">
        <Form
          {...registerAccount}
          className="form--650 form--spaced"
          error={error}
          handleClick={this.handleClick}
          onSubmit={onSubmit}
          submitting={submitting}
        />
      </section>
    )
  }
}

RegisterAccount.defaultProps = {
  registerAccount: {
    info: {
      heading: 'Create Your Account',
      text: 'Get 30-Day supply of designer home fragrances for $12',
    },

    sections: [

      {
        className: 'form__section--300',
        fields: [
          {
            component: Input,
            name: 'email',
            label: false,
            placeholder: 'Email Address',
            type: 'email',
            icon: {
              type: 'mail',
            },
          },
          {
            component: Input,
            name: 'password',
            label: false,
            placeholder: 'Password',
            type: 'password',
            icon: {
              type: 'pasword',
            },
          },
          {
            component: Input,
            name: 'passwordCheck',
            label: false,
            placeholder: 'Repeat password',
            type: 'password',
            icon: {
              type: 'pasword',
            },
          },
          {
            modifier: 'form__item--center',
            component: Button,
            name: 'submit-btn-account',
            className: 'btn--primary btn--shadow btn--fat',
            action: 'submit',
            text: 'Create account',
          },
          {
            component: Note,
            className: 'form__note--center',
            name: 'register-note',
            text: 'Already have an account?',
            link: {
              text: 'Log in',
              href: '/login',
            },
          },
        ],
      },

      {
        className: 'form__section--400',
        fields: [
          {
            component: Separator,
            name: 'social-separator',
            text: 'or',
          },
        ],
      },

      {
        className: 'form__section--300',
        fields: [
          {
            modifier: 'form__item--collapse',
            component: Button,
            name: 'facebook-login',
            action: 'click',
            className: 'btn--block btn--facebook btn--shadow',
            icon: {
              type: 'facebook',
            },
            text: 'Log in with Facebook',
          },
          {
            component: Button,
            action: 'click',
            name: 'google-login',
            className: 'btn--block btn--google btn--shadow',
            icon: {
              type: 'google',
            },
            text: 'Log in with Google',
          },
          {
            component: Button,
            name: 'twitter-login',
            action: 'click',
            className: 'btn--block btn--twitter btn--shadow',
            icon: {
              type: 'twitter',
            },
            text: 'Log in with Twitter',
          },
          {
            component: Note,
            className: 'form__note--center',
            name: 'social-info',
            text:
              'We’ll never post on your Twitter or Facebook without your permission',
            link: null,
          },
        ],
      },
    ],
  },
}

export default RegisterAccount
