import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { push } from 'react-router-redux'
import { reduxForm, SubmissionError } from 'redux-form'

import { createAccount } from 'main/redux/modules/signUp'
import {
  createFirebaseUser,
  logInWithToken,
  logInWithFacebook,
  logInWithGoogle,
  logInWithTwitter,
} from 'main/redux/modules/auth'
import {
  createValidator,
  email,
  required,
  match,
  minLength,
} from 'common/utils/validation'

import { Header } from 'main/components/layout/'
import RegisterAccount from 'main/components/layout/Register/RegisterAccount'
import { firebaseGetRedirectResult } from 'common/helpers/FirebaseClient'

import jwt from 'jwt-simple'

class Register extends Component {
  static propTypes = {
    createAccount: PropTypes.func.isRequired,
    createFirebaseUser: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    logInWithFacebook: PropTypes.func.isRequired,
    logInWithGoogle: PropTypes.func.isRequired,
    logInWithTwitter: PropTypes.func.isRequired,
    logInWithToken: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  }

  static validation = createValidator({
    email: [required, email],
    password: [required, minLength(6)],
    passwordCheck: [match('password')],
  })

  constructor(props) {
    super(props)

    this.registerCall = this.registerCall.bind(this)
    this.registerSocial = this.registerSocial.bind(this)
  }

  componentDidMount() {
    firebaseGetRedirectResult().then(data => {
      
      data &&
        this.props
          .createFirebaseUser(data)
          .then((res) => {
              console.info(res);
              if(!res.custom_token){
                console.error('custom token is null')
              }
            const uid = (jwt.decode(res.custom_token, null, true)).uid;

            // store in local storage
            if (uid) {
              localStorage.setItem("firebaseUserId", uid);
            }
            this.registerSuccesfull()
          })
    })
  }

  formatData(data) {
    const formattedData = {
      account: {
        email: data.email,
        password: data.password,
      },
    }

    return formattedData
  }

  registerSocial(channel) {
   
    switch (channel) {
      case 'facebook-login':
        return this.props.logInWithFacebook().then(() => {
          this.registerSuccesfull()
        })
        .catch(error => {
          throw new SubmissionError({ _error: error.message })
        });
        break
      case 'google-login':
        return this.props.logInWithGoogle().then(() => {
          this.registerSuccesfull()
        })
        .catch(error => {
          throw new SubmissionError({ _error: error.message })
        });
        break
      case 'twitter-login':
        return this.props.logInWithTwitter().then(() => {
          this.registerSuccesfull()
        })
        .catch(error => {
          throw new SubmissionError({ _error: error.message })
        });
        break
      default:
        break
    }
  }

  // Final register method
  registerCall(data) {
    const formattedData = this.formatData(data)

    return this.props
      .createAccount(formattedData.account)
      .then(result => {
        const customToken = result.custom_token

        return this.props
          .logInWithToken(customToken)
          .then(() => {
            this.registerSuccesfull()
          })
          .catch(error => {
            throw new SubmissionError({ _error: error.message })
          })
      })
      .catch(error => {
        throw new SubmissionError({ _error: error.message })
      })
  }

  registerSuccesfull() {
    this.props.pushState('/shop')
  }

  render() {
    const { error, handleSubmit, submitting } = this.props

    return (
      <div className="pura-web__container">
        <Header />
        <RegisterAccount
          error={error}
          onSubmit={handleSubmit(this.registerCall)}
          onRegister={this.registerSocial}
          submitting={submitting}
        />
      </div>
    )
  }
}

Register.defaultProps = {}

// const formSelector = formValueSelector('register')

const RegisterExport = compose(
  connect(
    state => ({
      auth: state.auth,
      loading: true,
      signUp: state.signUp,
    }),
    {
      createAccount,
      createFirebaseUser,
      logInWithToken,
      logInWithFacebook,
      logInWithGoogle,
      logInWithTwitter,
      pushState: push,
    }
  ),
  reduxForm({
    form: 'register',
    validate: Register.validation,
  })
)(Register)

export default RegisterExport
