import React, { PropTypes } from 'react'

import Icon from '../../icons/'

const Input = props => (
  <div
    className={`form__group${
        props.meta.error && props.meta.touched ? ' form__group--has-error' : ''
      }`}
  >
    <div className="form__input-container">
      <div className="form__input-wrapper">
        <input
          className="form__input-element"
          disabled={props.disabled}
          id={props.id || props.name}
          maxLength={props.maxLength}
          placeholder={props.placeholder}
          type={props.type}
          {...props.input}
        />
      </div>

      <label className="form__label" htmlFor={props.id || props.name}>
        {props.label &&
        <span className="form__label-text">{props.label}</span>
          }
        {props.icon && <Icon className="form__label-icon" {...props.icon} />}
      </label>
    </div>

    {props.meta.touched &&
        props.meta.error &&
          <span className="form__error">{props.meta.error}</span>
        }
  </div>
  )

Input.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.object,
  id: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  meta: PropTypes.object,
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
}

Input.defaultProps = {
  disabled: false,
  icon: null,
  id: '',
  label: '',
  maxLength: null,
  meta: {
    error: '',
    touched: false,
  },
  pattern: '',
  placeholder: '',
  type: 'text',
}

export default Input
