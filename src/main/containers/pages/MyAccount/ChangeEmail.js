import { get } from 'lodash'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, SubmissionError } from 'redux-form'

import { changeEmail } from 'main/redux/modules/auth'
import { getUser } from 'main/redux/modules/user'

import { HeaderShop } from '../../../components/layout/'
import { CircleLoader } from 'main/components/loaders'

import Breadcrumbs from '../../../components/interactive/Breadcrumbs'
import Form from '../../forms/generators/Form'

import { createValidator, email, required } from 'common/utils/validation'
import { Button, Input, Note } from '../../../components/forms'

@reduxForm({
  form: 'change-email',
  validate: createValidator({
    email: [required, email],
    password: required,
  }),
  enableReinitialize: true,
})
class ChangeEmailForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    currentEmail: PropTypes.string.isRequired,
  }

  get sections() {
    return [
      {
        className: 'form__section--300',
        heading: 'Current Email',
        fields: [
          {
            modifier: 'form__item--collapse',
            className: 'form__note--info',
            component: Note,
            name: 'current-mail',
            text: this.props.currentEmail,
          },
        ],
      },
      {
        className: 'form__section--300',
        fields: [
          {
            component: Input,
            name: 'email',
            label: false,
            placeholder: 'New email',
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
            modifier: 'form__item--center',
            component: Button,
            name: 'submit-btn',
            className: 'btn--primary form__btn-final btn--shadow btn--fat',
            action: 'submit',
            text: 'Update email',
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
    ]
  }

  render() {
    const { handleSubmit, ...rest } = this.props

    return (
      <Form
        {...rest}
        info={{ heading: 'Change email' }}
        onSubmit={handleSubmit}
        sections={this.sections}
        successMesage="Your Email was succesfully changed"
      />
    )
  }
}

const select = state => ({
  user: get(state, 'user'),
})
const actions = { changeEmail, getUser }

@connect(select, actions)
export default class ChangeEmail extends Component {
  static defaultProps = {
    breadcrumbs: {
      items: [
        { href: '/shop', text: 'Marketplace' },
        { href: '/my-account', text: 'My Account' },
        { href: null, text: 'Change Email' },
      ],
    },
    user: {
      loaded: false,
    },
  }

  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    breadcrumbs: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          href: PropTypes.string,
          text: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
    /* eslint-enable react/no-unused-prop-types */

    changeEmail: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,

    user: PropTypes.shape({
      data: PropTypes.shape({
        email: PropTypes.string.isRequired,
      }),
      loaded: PropTypes.boolean.isRequired,
    }),
  }

  componentWillMount() {
    this.props.getUser()
  }

  handleSubmit = async data => {
    try {
      await this.props.changeEmail({
        new_email: data.email,
        old_password: data.password,
      })
    } catch (err) {
      throw new SubmissionError({ _error: err.message })
    }

    await this.props.getUser()
  }

  get form() {
    return (
      <ChangeEmailForm
        onSubmit={this.handleSubmit}
        currentEmail={this.props.user.data.email}
      />
    )
  }

  get loader() {
    return <CircleLoader />
  }

  render() {
    const { breadcrumbs, user } = this.props
    const isLoaded = user && user.loaded

    return (
      <div className="pura-web__container">
        <HeaderShop />

        <section className="pura-web__section my-account__change-email">
          <div className="container">
            <Breadcrumbs className="my-account__breadcrumbs" {...breadcrumbs} />

            {isLoaded ? this.form : this.loader}
          </div>
        </section>
      </div>
    )
  }
}
