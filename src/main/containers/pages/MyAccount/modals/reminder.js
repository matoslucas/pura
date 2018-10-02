import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import Modal from 'react-responsive-modal'

import { Button, Note } from '../../../../components/forms'
import Form from '../../../forms/generators/Form'

import SubscriptionModal from './subscription'

@reduxForm({ form: 'ReminderModal' })
export default class ReminderModal extends Component {
  classNames = {
    modal: 'popups_models',
  }

  state = {
    openFirstModal: false,
  }

  onOpenFirstModal = () => {
    this.setState({ openFirstModal: true })
  }

  onCloseFirstModal = () => {
    this.setState({ openFirstModal: false })
  }

  get form() {
    const info = {
      heading: 'As a reminder…',
      text: 'If you didn’t like a fragrance, we’ll replace it for free.',
    }

    const sections = [
      {
        className: 'form__section--500',
        fields: [
          {
            className: 'form__note--center',
            component: Note,
            modifier: '',
            text:
              'Click the “Replace Fragrance” button to receive an addition fragrance with your next package.',
          },
        ],
      },
      {
        className: 'form__section--500',
        fields: [
          {
            action: 'submit',
            className: 'btn--primary form__btn-final btn--shadow btn--fat',
            column: true,
            component: Button,
            modifier: 'form__item--center',
            name: '',
            text: 'Submit',
          },
          {
            action: 'click',
            className: 'cancel--btn',
            column: true,
            component: SubscriptionModal,
            modifier: 'form__item--center',
            name: '',
            text: 'Cancel',
          },
        ],
      },
    ]

    return <Form info={info} sections={sections} />
  }

  render() {
    const { openFirstModal } = this.state

    return (
      <div className="example">
        <label
          className="account-item__actions-link"
          action="click"
          onClick={() => this.setState({ openFirstModal: true })}
        >
          Cancel
        </label>

        <Modal
          classNames={this.classNames}
          open={openFirstModal}
          onClose={() => this.setState({ openFirstModal: false })}
          little
        >
          <div className="pause">{this.form}</div>
        </Modal>
      </div>
    )
  }
}
