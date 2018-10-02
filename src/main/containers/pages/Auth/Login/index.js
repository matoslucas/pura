import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { push } from 'react-router-redux'
import { reduxForm, SubmissionError } from 'redux-form'
import flow from 'lodash/flow'

import {
  createFirebaseUser,
  logIn,
  logInWithFacebook,
  logInWithGoogle,
  logInWithTwitter,
  logInWithToken,
  getRedirectResult,
  getToken,
} from 'main/redux/modules/auth'
import { notification, selectLanguage } from 'main/redux/modules/appState'
import { createValidator, email, required } from 'common/utils/validation'

import { Header } from 'main/components/layout/'

import { Button, Input, Separator, Note } from 'main/components/forms'
import Form from 'main/containers/forms/generators/Form'

import { CircleLoader } from 'main/components/loaders'

class Login extends Component {
  static validation = createValidator({
    email: [required, email],
    password: [required],
  })

  static propTypes = {
    auth: PropTypes.object.isRequired,
    createFirebaseUser: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    logIn: PropTypes.func.isRequired,
    logInWithFacebook: PropTypes.func.isRequired,
    logInWithGoogle: PropTypes.func.isRequired,
    logInWithTwitter: PropTypes.func.isRequired,
    logInWithToken: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    getRedirectResult: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.facebookLogin = this.facebookLogin.bind(this)
    this.googleLogin = this.googleLogin.bind(this)
    this.twitterLogin = this.twitterLogin.bind(this)
    this.loginCall = this.loginCall.bind(this)
  }

  state = { loggingIn: false }

  async componentWillMount() {
    const { query } = this.props.router.location
    const { error: tokenError } = this.props.auth

    this.setState({ loggingIn: true })

    if (query.token && !tokenError) {
      await this.props.logInWithToken(query.token)
      this.loginSuccesfull()
    } else {
      let user

      try {
        user = await this.props.getRedirectResult()
      } catch (error) {
        this.setState({ loggingIn: false })
        return
      }

      this.setState({ loggingIn: false })

      if (!user) return

      await this.props.createFirebaseUser(user)
      this.loginSuccesfull()
    }
  }

  handleClick = (name, event) => {
   
    switch (name) {
      case 'facebook-login':
        event.preventDefault()
        this.facebookLogin()
        break
      case 'google-login':
        event.preventDefault()
        this.googleLogin()
        break
      case 'twitter-login':
        event.preventDefault()
        this.twitterLogin()
        break
      default: //console.info('default',name);
        break
    }
  }

  facebookLogin() {
    console.info('facebookLogin');
    return this.props
    .logInWithFacebook()
    .then(() => {
      this.loginSuccesfull()
    })
    .catch(error => {
      throw new SubmissionError({ _error: error.message })
    })
  }

  googleLogin() {
    return this.props
      .logInWithGoogle()
      .then(() => {
        this.loginSuccesfull()
      })
      .catch(error => {
        throw new SubmissionError({ _error: error.message })
      })
  }

  twitterLogin() {
    return this.props
      .logInWithTwitter()
      .then(() => {
        this.loginSuccesfull()
      })
      .catch(error => {
        throw new SubmissionError({ _error: error.message })
      })
  }

  loginCall(values) {
    return this.props
      .logIn(values.email, values.password)
      .then(() => this.loginSuccesfull())
      .catch(error => {
        console.log(error)

        if (error.code === 'auth/user-not-found') {
          throw new SubmissionError({
            email: error.message,
            _error: 'Login failed!',
          })
        }
        if (error.code === 'auth/wrong-password') {
          throw new SubmissionError({
            password: error.message,
            _error: 'Login failed!',
          })
        }
      })
  }

  loginSuccesfull() {
    this.props.pushState('/shop')
  }

  render() {
    const { handleSubmit, error, formData, submitting } = this.props
    const { error: authError, redirectResultError } = this.props.auth
    const { loggingIn } = this.state

    const actionError = redirectResultError || authError

    return (
      <div className="pura-web__container" style={{ paddingBottom: 40 }}>
        <Header key="login_Header" />
        <div className="register__container">
          {loggingIn ? (
            <CircleLoader />
          ) : (
              <Form
                {...formData}
                error={actionError ? actionError.message : error}
                handleClick={this.handleClick}
                onSubmit={handleSubmit(this.loginCall)}
                submitting={submitting}
              />
            )}
        </div>
      </div>
    )
  }
}

Login.defaultProps = {
  formData: {
    className: 'form--650',

    info: {
      heading: 'Log In',
    },

    sections: [
      {
        className: 'form__section--300',
        fields: [
          {
            component: Button,
            action: 'click',
            name: 'facebook-login',
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
            action: 'click',
            name: 'twitter-login',
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
            text: 'We’ll never post on your Facebook without your permission',
            link: null,
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
            modifier: 'form__item--collapse',
            component: Note,
            name: 'forgotten-password',
            link: {
              text: 'Forgot password?',
              href: '/reset-password',
            },
          },
          {
            modifier: 'form__item--center',
            component: Button,
            name: 'submit-btn',
            className: 'btn--primary btn--shadow btn--fat',
            action: 'submit',
            text: 'Log in',
          },
          {
            component: Note,
            className: 'form__note--center',
            name: 'register-note',
            text: "Don't have an account?",
            link: {
              text: 'Join now!',
              href: '/register',
            },
          },
        ],
      },
    ],
  },
}

export default flow(
  connect(
    state => ({
      auth: state.auth,
    }),
    {
      pushState: push,
      createFirebaseUser,
      logIn,
      logInWithFacebook,
      logInWithGoogle,
      logInWithTwitter,
      logInWithToken,
      getRedirectResult,
      getToken,
      notification,
      selectLanguage,
    }
  ),
  reduxForm({
    form: 'login',
    validate: Login.validation,
  })
)(Login)