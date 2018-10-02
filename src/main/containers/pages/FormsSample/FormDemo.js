import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import { Header } from '../../../components/layout/'
import {
  Button,
  CheckBox,
  Input,
  Select,
  Separator,
  Note,
} from '../../../components/forms'
import Form from '../../forms/generators/Form'

class FormDemo extends Component {
  constructor(props) {
    super(props)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    const { formData, handleSubmit } = this.props

    return (
      <div className="pura-web__container">
        <Header />
        <div className="forms__test">
          <div className="container">
            <Form {...formData} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    )
  }
}

FormDemo.defaultProps = {
  formData: {
    className: 'form--650',

    info: {
      heading: 'Credit Card Information',
      text:
        '30-Day Supply of Designer home Fragrances for $12. Cancel anytime.',
      footer: 'Check out the marketplace!',
    },

    heading: 'Form Heading',

    sections: [
      {
        className: 'form__section--450',
        heading: 'Section Heading',
        fields: [
          {
            component: Input,
            name: 'input',
            label: 'Input',
          },
          {
            column: true,
            component: Input,
            name: 'input-col1',
            label: 'Column',
          },
          {
            column: true,
            component: Input,
            name: 'input-col2',
            label: 'Column',
          },
          {
            component: Separator,
            name: 'separator',
            text: 'OR',
          },
          {
            component: Input,
            name: 'input-pwd',
            label: 'Password',
            type: 'password',
          },
          {
            component: Select,
            name: 'select',
            label: 'Select',
            options: [
              {
                value: 'option-1',
                label: 'Option 1',
              },
              {
                value: 'option-2',
                label: 'Option 2',
              },
              {
                value: 'option-3',
                label: 'Option 3',
              },
            ],
          },
          {
            component: Note,
            name: 'text-note',
            text: 'Text note',
            link: {
              href: null,
              text: 'link',
            },
          },
          {
            component: CheckBox,
            name: 'checkbox-test',
            id: 'checkbox-test',
            label: 'Checkbox',
            icon: { type: 'ok' },
          },
          {
            modifier: 'form__item--center',
            component: Button,
            className: 'btn--primary btn--fat btn--shadow',
            name: 'button',
            text: 'Button',
          },
        ],
      },
    ],
  },
}

export default reduxForm({
  form: 'form-demo',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(FormDemo)
