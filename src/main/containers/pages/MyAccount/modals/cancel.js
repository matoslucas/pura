import React, { Component, PropTypes } from 'react'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, SubmissionError } from 'redux-form'
import { createValidator, required } from 'common/utils/validation'

import Modal from 'react-responsive-modal'

import {
  getUser,
  giftFragrances,
  updateSubscription,
} from 'main/redux/modules/user'
import { reauthenticate } from 'main/redux/modules/auth'

import { Button, Input, Note } from 'main/components/forms'
import Form from 'main/containers/forms/generators/Form'
import { CircleLoader, OverlayLoader } from 'main/components/loaders'
import InfoBox from 'main/components/boxes/InfoBox'

import { PauseModalForm } from './pause'

@compose(
  connect(null, { reauthenticate }),
  reduxForm({
    form: 'login',
    validate: createValidator({ password: [required] }),
  })
)
class PasswordForm extends Component {
  static propTypes = {
    error: PropTypes.any.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onReauthenticated: PropTypes.func.isRequired,
    reauthenticate: PropTypes.func.isRequired,
    submitting: PropTypes.boolean.isRequired,
  }

  formData = {
    className: 'cancel-modal__auth-form',
    sections: [
      {
        fields: [
          {
            component: Input,
            name: 'password',
            label: false,
            placeholder: 'Password',
            type: 'password',
          },
        ],
      },
      {
        className: 'cancel-modal__auth-form__actions',

        fields: [
          {
            component: Button,
            name: 'submit-btn',
            className: 'btn--primary',
            action: 'submit',
            text: 'Log in',
          },
          {
            component: Button,
            name: 'cancel',
            action: 'click',
            text: 'Cancel',
          },
          {
            component: Note,
            name: 'forgotten-password',
            link: {
              text: 'Forgot password?',
              href: '/reset-password',
            },
          },
        ],
      },
    ],
  }

  handleReauthenticate = async values => {
    try {
      await this.props.reauthenticate(values.password)
    } catch (error) {
      throw new SubmissionError({ _error: error.message })
    }

    this.props.onReauthenticated()
  }

  onFieldClick = name => {
    if (name === 'cancel') {
      this.props.onCancel()
    }
  }

  render() {
    const { error, handleSubmit, submitting } = this.props

    return (
      <Form
        {...this.formData}
        error={error}
        handleClick={this.onFieldClick}
        onSubmit={handleSubmit(this.handleReauthenticate)}
        submitting={submitting}
      />
    )
  }
}

@connect(
  ({ user: { data } }) => ({
    email: data.email,
    subscription: data.subscription,
  }),
  { getUser, giftFragrances, updateSubscription }
)
export default class CancelModal extends Component {
  static defaultProps = {
    subscription: {},
  }

  static propTypes = {
    email: PropTypes.string.isRequired,
    getUser: PropTypes.func.isRequired,
    giftFragrances: PropTypes.func.isRequired,
    reauthenticate: PropTypes.func.isRequired,
    subscription: PropTypes.shape({
      state: PropTypes.oneOf(['cancelled', 'active', 'paused']).isRequired,
    }),
    updateSubscription: PropTypes.func.isRequired,
  }

  classNames = {
    modal: 'popups_models',
    closeIcon: 'close-icon',
  }

  steps = {
    reminder: () => (
      <div className="cancel-modal">
        <InfoBox
          className="info-box--medium"
          heading="As a Reminder, If You Don’t Like a Fragrance, We’ll Replace It For FREE."
          text="Click the “Replace Fragrance” button to receive an addition fragrance with your next package."
        />

        {this.state.error ? (
          <p className="cancel-model__error-message">
            An Unexpected Error Has Occured
          </p>
        ) : (
          <div>
            <Button
              action="click"
              className="btn--primary"
              handleClick={this.handleReplaceFragrance}
              text="Replace Fragrance"
            />
            <Button
              action="click"
              handleClick={this.next}
              text="Continue to Cancel"
            />
          </div>
        )}
      </div>
    ),
    pause: () => (
      <div className="pause">
        <PauseModalForm
          cancelLabel="Continue To Cancel"
          heading="Before you cancel… Did you know you can pause your subscription?"
          onFieldClick={this.handlePauseFieldClick}
          onSubmit={this.handlePauseSubmit}
        />
      </div>
    ),
    // reauthenticate: () => (
    //   <div className="cancel-modal">
    //     <InfoBox
    //       className="info-box--medium"
    //       heading="To View This Page, Please Re-enter Your Password"
    //     />

    //     <p>Current Email: {this.props.email}</p>

    //     <PasswordForm
    //       onCancel={this.close}
    //       onReauthenticated={this.handleAfterReauthenticated}
    //     />
    //   </div>
    // ),
    confirm: () => (
      <div className="cancel-modal">
        <InfoBox
          className="info-box--medium"
          heading="We’re Sorry to See You Go…"
        />

        <div className="help-section">
          {this.intercomIsEnabled() && (
            <p className="help-text">
              If you’d like to speak with customer service,{' '}
              <a href="#" onClick={this.showIntercom}>
                click here
              </a>.
            </p>
          )}

          <p className="help-text">
            You can also visit our{' '}
            <a href="http://help.trypura.com/">Help Center</a> for answers and
            troubleshooting.
          </p>
        </div>

        <Button
          action="click"
          className="btn--primary"
          handleClick={this.close}
          text="Keep My Subscription"
        />
        <Button
          action="click"
          handleClick={this.handleCancel}
          text="Cancel My Subscription"
        />
      </div>
    ),
    promo: () => (
      <div className="cancel-modal">
        <InfoBox
          className="info-box--medium"
          heading="Your Subscription Has Been Cancelled"
          text="Use the following coupon code for 50% off your first month back."
        />

        <p className="cancel-modal__promo-code">RETURN50</p>
      </div>
    ),
  }

  initialStep = Object.keys(this.steps)[0]

  state = {
    activeStep: this.initialStep,
    loading: false,
    error: false,
    showOverlayLoader: false,
    visible: false,
  }

  intercomIsEnabled = () => Boolean(window.Intercom)

  showIntercom = event => {
    event.prefentDefault()
    window.Intercom('show')
  }

  open = () =>
    this.setState({ activeStep: this.initialStep, error: false, visible: true })
  close = () => this.setState({ visible: false })

  next = () => {
    this.setState(({ activeStep: prevStep }) => {
      const stepKeys = Object.keys(this.steps)

      const curIndex = stepKeys.indexOf(prevStep)
      const nextStep = stepKeys[curIndex + 1]

      return { activeStep: nextStep }
    })
  }

  prev = () => {
    this.setState(({ activeStep: prevStep }) => {
      const stepKeys = Object.keys(this.steps)

      const curIndex = stepKeys.indexOf(prevStep)
      const nextStep = stepKeys[curIndex - 1]

      return { activeStep: nextStep }
    })
  }

  handleReplaceFragrance = async () => {
    try {
      await this.props.giftFragrances()
    } catch (error) {
      this.setState({ error: true })
      return
    }

    this.close()
  }

  handlePauseFieldClick = name => {
    if (name === 'cancel') {
      this.next()
    }
  }

  handlePauseSubmit = async ({ period }) => {
    await this.pauseSubscription(period)
    this.close()
  }

  handleAfterReauthenticated = () => {
    this.next()
  }

  handleCancel = async () => {
    this.setState({ showOverlayLoader: true })
    await this.cancelSubscription()
    this.setState({ showOverlayLoader: false })
    this.next()
  }

  cancelSubscription = async () => {
    await this.props.updateSubscription('cancelled')
    await this.refreshUser()
  }

  pauseSubscription = async period => {
    await this.props.updateSubscription('paused', period)
    await this.refreshUser()
  }

  reactivateSubscription = async () => {
    this.setState({ showOverlayLoader: true })
    await this.props.updateSubscription('active')
    await this.refreshUser()
    this.setState({ showOverlayLoader: false })
  }

  refreshUser = () => this.props.getUser()

  get isCancelled() {
    return this.props.subscription.state === 'cancelled'
  }

  render() {
    const { activeStep, loading, showOverlayLoader, visible } = this.state

    if (loading) {
      return <CircleLoader size={24} />
    }

    return (
      <div>
        {this.isCancelled ? (
          <label
            className="account-item__actions-link"
            onClick={this.reactivateSubscription}
          >
            Reactivate
          </label>
        ) : (
          <label className="account-item__actions-link" onClick={this.open}>
            Cancel Subscription
          </label>
        )}

        <Modal classNames={this.classNames} open={visible} onClose={this.close}>
          {this.steps[activeStep]()}
        </Modal>

        {showOverlayLoader && <OverlayLoader />}
      </div>
    )
  }
}
