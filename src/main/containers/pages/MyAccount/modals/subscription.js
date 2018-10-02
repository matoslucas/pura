import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Modal from 'react-responsive-modal'
import { Button, Input, Select, Note } from '../../../../components/forms'
import Form from '../../../forms/generators/Form'
import CancelSubscriptionModal from './cancelsubscription'
import { createValidator, email, required } from 'common/utils/validation'

class SubscriptionModal extends Component {
  state = {
    openSubscriptionModal: false,
  }
  static propTypes = {
    SubscriptionModal: PropTypes.object,
  }
  classNames = {
    modal: 'popups_models',
    closeIcon: 'close-icon',
  }

  constructor(props) {
    super(props)
  }
  onopenSubscriptionModal = () => {
    this.setState({ openSubscriptionModal: true })
  }

  onCloseFirstModal = () => {
    console.log('hello')
    this.setState({ openSubscriptionModal: false })
  }

  render() {
    const { SubscriptionModal } = this.props
    const { openSubscriptionModal } = this.state
    console.log(SubscriptionModal)
    return (
      <div className="example">
        <lable
          className="account-item__actions-link cancel--btn"
          action="click"
          onClick={() => this.setState({ openSubscriptionModal: true })}
        >
          Contine to Cancel
        </lable>
        <Modal
          classNames={this.classNames}
          open={openSubscriptionModal}
          onClose={() => this.setState({ openSubscriptionModal: false })}
          little
        >
          <div className="pause subsciption-main">
            <Form {...SubscriptionModal} />
          </div>
        </Modal>
      </div>
    )
  }
}
SubscriptionModal.defaultProps = {
  SubscriptionModal: {
    info: {
      heading: 'Before you Cancel…',
      text: 'Did you know you can pause your subscription?',
    },

    sections: [
      {
        className: 'form__section--500 pause_selectbox',
        fields: [
          {
            modifier: 'form__item--collapse center',
            className: 'form__note--info pause__info__text',
            component: Note,
            text:
              'Put your subscription on pause for up to 3 months.During the hold period, you will not be billed and you will no longer be sent fragrances.',
          },
        ],
      },
      {
        className: 'form__section--300 pause_selectbox',
        fields: [
          {
            modifier: 'form__item--center',
            className: 'form__note--info duration',
            component: Note,
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
            name: 'select',
            options: [
              {
                value: '1-Month',
                label: '1 Month',
              },
              {
                value: '2-Month',
                label: '2 Month',
              },
              {
                value: '3-Month',
                label: '3 Month',
              },
            ],
          },
        ],
      },

      {
        className: 'form__section--500 pause_buutonbox',
        fields: [
          {
            column: true,
            component: Button,
            name: 'submit-btn',
            className:
              'btn--primary form__btn-final btn--shadow btn--fat subscription-btn',
            action: 'submit',
            text: 'Submit',
          },
          {
            column: true,
            component: CancelSubscriptionModal,
            action: 'click',
            name: 'back-btn',
            className: 'cancel--btn',
            text: 'Contine to Cancel',
          },
        ],
      },
    ],
  },
}
SubscriptionModal = reduxForm({
  form: 'SubscriptionModal',
})(SubscriptionModal)

export default SubscriptionModal
