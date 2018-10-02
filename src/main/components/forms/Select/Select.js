import React, { Component, PropTypes } from 'react'
import ReactSelect from 'react-select'

import Icon from '../../icons/'

export default class Select extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
    icon: PropTypes.object,
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    labelless: PropTypes.bool,
    meta: PropTypes.object.isRequired,
    onSelectChange: PropTypes.func,
    options: PropTypes.array,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    field: {
      error: '',
      touched: '',
    },
    placeholder: '',
    labelless: false,
  };

  constructor(props) {
    super(props)
    this.state = {
      hasFocus: '',
      element: null,
    }
  }

  handleChange(val) {
   
    if(val && val.value){
      this.props.input.onChange(val.value)

      if (this.props.onSelectChange) {
        this.props.onSelectChange(val.value)
      }
    }

    
  }

  handleFocus() {
    this.setState({
      hasFocus: 'has-focus',
    })
    this.props.input.onFocus()
  }

  handleBlur() {
    this.setState({
      hasFocus: '',
    })
    this.props.input.onBlur()
  }

  render() {
    const {
      disabled,
      icon,
      input,
      meta,
      label,
      placeholder,
    } = this.props

    const srClass = this.props.labelless ? ' sr-only' : ''
    const hasSuccess = input.valid && input.touched ? ' form__group--has-success' : ''
    const hasError = input.error && input.touched ? ' form__group--has-error' : ''
    const isOptional = !input.error && input.pristine && !input.defaultValue && !disabled
    const isOptionalClass = isOptional ? ' is-optional is-optional--select' : ''

    return (
      <div className={`form__group${hasError}${hasSuccess} ${this.state.hasFocus}${isOptionalClass}`}>
        <div className="form__input-container">
          <div className="form__input-wrapper">
            <ReactSelect
              value={input.value || ''}
              className="form__select"
              options={this.props.options}
              onChange={val => this.handleChange(val)}
              placeholder={placeholder}
              {...this.props}
              onFocus={() => this.handleFocus()}
              onBlur={() => this.handleBlur()}
            />
          </div>

         {label && <label className={`form__label${srClass}`} htmlFor={input.name}>
            {label && <span className="form__label-text">{label}</span> }
            {icon && <Icon className="form__label-icon" {...icon} />}
          </label>}
        </div>

        {meta.error && meta.touched && <div className="form__error">{meta.error}</div>}
        {isOptional && <div className="form__text-optional">Optional</div>}
      </div>
    )
  }
}
