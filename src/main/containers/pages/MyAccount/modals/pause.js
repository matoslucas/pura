import { noop } from 'lodash'
import React, { Component, PropTypes } from 'react'

import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import Modal from 'react-responsive-modal'

import { getUser, updateSubscription } from 'main/redux/modules/user'

import { Button, Select, Note } from 'main/components/forms'
import { CircleLoader } from 'main/components/loaders'
import Form from 'main/containers/forms/generators/Form'

@reduxForm({
  form: 'PauseModal',
  initialValues: {
    period: 1,
  },
})
export class PauseModalForm extends Component {
  static defaultProps = {
    cancelLabel: 'Cancel',
    heading: 'Pause Your Subscription',
    onFieldClick: noop,
  }

  static propTypes = {
    cancelLabel: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    heading: PropTypes.string,
    onFieldClick: PropTypes.func,
  }

  get sections() {
    return [
      {
        className: 'form__section--300',
        fields: [
          {
            modifier: 'form__item--center',
            className: 'form__note--info duration',
            component: Note,
            name: 'info',
            text: 'SELECT DURATION',
          },
        ],
      },
      {
        className: 'form__section--300 pause_selectbox',
        fields: [
          {
            modifier: 'form__item--collapse',
            className: 'form__note--info select--box',
            component: Select,
            name: 'period',
            options: [
              {
                value: 1,
                label: '1 Month',
              },
              {
                value: 2,
                label: '2 Month',
              },
              {
                value: 3,
                label: '3 Month',
              },
            ],
          },
        ],
      },
      {
        className: 'form__section--500 pause_selectbox',
        fields: [
          {
            modifier: 'form__item--collapse center',
            className: 'form__note--info pause__info__text',
            component: Note,
            name: 'additional_info',
            text:
              'At the end of your pause period, your regular subscription will be resumed automatically. However, you can log in to your account to resume your subscription at any time.',
          },
        ],
      },
      {
        className: 'form__section--500 pause_buutonbox',
        fields: [
          {
            column: true,
            modifier: 'form__item--center',
            component: Button,
            name: 'submit-btn',
            className: 'btn--primary form__btn-final btn--shadow btn--fat',
            action: 'submit',
            text: 'Pause',
          },
          {
            column: true,
            modifier: 'form__item--center',
            component: Button,
            action: 'click',
            name: 'cancel',
            className: 'cancel--btn',
            text: this.props.cancelLabel,
          },
        ],
      },
    ]
  }

  render() {
    const { handleSubmit, heading, onFieldClick, ...rest } = this.props

    const info = {
      heading,
      text: 'How long would you like to pause your subscription?',
    }

    return (
      <Form
        {...rest}
        info={info}
        handleClick={onFieldClick}
        onSubmit={handleSubmit}
        sections={this.sections}
      />
    )
  }
}

@connect(
  state => {
    const subscription = state.user.data.subscription
    return { subscription }
  },
  { getUser, updateSubscription }
)
export default class PauseModal extends Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    updateSubscription: PropTypes.func.isRequired,
    subscription: PropTypes.shape({
      state: PropTypes.oneOf(['cancelled', 'active', 'paused']).isRequired,
    }),
  }

  state = { loading: false, visible: false }

  classNames = {
    modal: 'popups_models',
    closeIcon: 'close-icon',
  }

  open = () => this.setState({ visible: true })
  close = () => this.setState({ visible: false })

  handleFieldClick = name => {
    if (name === 'cancel') {
      this.close()
    }
  }

  handleSubmit = async ({ period }) => {
    await this.pauseSubscription(period)
    this.close()
  }

  pauseSubscription = async period => {
    await this.props.updateSubscription('paused', period)
    await this.props.getUser()
  }

  resumeSubscription = async () => {
    if(this.state.loading) return

    this.setState({ loading: true })
    await this.props.updateSubscription('active')
    await this.props.getUser()
    this.setState({ loading: false })
  }

  get isActive() {
    return this.props.subscription.state === 'active'
  }


  render() {
    const { visible } = this.state

    if (!this.isActive) {
      return (
        <div>
          {this.state.loading
            ? <CircleLoader size={24} />
            : <label className="account-item__actions-link" onClick={this.resumeSubscription}>Resume</label>
        }
        </div>
      )
    }

    return (
      <div>
        <label className="account-item__actions-link" onClick={this.open}>
          Pause
        </label>

        <Modal classNames={this.classNames} open={visible} onClose={this.close}>
          <div className="pause">
            <PauseModalForm
              onFieldClick={this.handleFieldClick}
              onSubmit={this.handleSubmit}
            />
          </div>
        </Modal>
      </div>
    )
  }
}
