import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from '..'

export default class ExpiryField extends Component {
  static defaultProps = {
    placeholder: 'MM/YY',
    label: 'Exp',
    maxLength: 5,
  }

  static propTypes = {
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
    }).isRequired,
  }

  handleChange = eventOrValue => {
    const { value: expiry } = eventOrValue.target
    const date = typeof expiry === 'number' ? expiry.toString() : expiry

    let month = ''
    let year = ''

    if (date.includes('/')) {
      [month, year] = date.split('/')
    } else if (date.length) {
      month = date.substr(0, 2)
      year = date.substr(2, 4)
    }

    const nextValue = year.length > 0 ? `${month}/${year}` : month

    this.props.input.onChange(nextValue)
  }

  render() {
    const nextProps = {
      ...this.props,
      input: {
        ...this.props.input,
        onChange: this.handleChange,
      },
    }

    return <Input {...nextProps} />
  }
}
