import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import demoValidation from './DemoValidation'
import { Input, CheckBox, Select } from 'main/components/forms'
import { Button } from 'main/components/misc'

@reduxForm({
  form: 'demoFull',
  validate: demoValidation,
})
export default class DemoForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    selectData: PropTypes.object,
  }

  static defaultProps = {
    loading: false,
    selectData: {},
  }

  render() {
    const {
      handleSubmit,
      selectData,
    } = this.props

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <Field
            label="First Name"
            name="firstName"
            component={Input}
            type="text"
          />

          <Field
            label="Last Name"
            name="lastName"
            component={Input}
            type="text"
          />

          <Field
            label="Select"
            name="selection"
            component={Select}
            options={selectData}
          />

          <Field
            label="CheckBox"
            name="checkbox"
            id="checkbox1"
            component={CheckBox}
          />

          <Button
            type="submit"
            className="btn--primary"
            onClick={handleSubmit}
            isLoading={this.props.loading}
          >
            Submit
          </Button>
        </form>
      </div>
    )
  }
}
