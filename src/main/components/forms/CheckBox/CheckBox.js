import React, { PropTypes } from 'react'

import Icon from '../../icons/'

const CheckBox = props => (
  <div
    className={`form__group${
      props.meta.error && props.meta.touched ? ' form__group--has-error' : ''
    }`}
  >
    <div className="form__checkbox-container">
      <div className="form__checkbox-wrapper">
        <input
          className="form__checkbox-input"
          disabled={props.disabled}
          id={props.id || props.name}
          type={props.type}
          {...props.input}
        />

        <label
          className="form__checkbox-label"
          htmlFor={props.id || props.name}
        >
          {props.icon &&
            <Icon className="form__checkbox-label-icon" {...props.icon} />
          }
          {props.label &&
            <span className="form__checkbox-label-text">{props.label}</span>
          }
          {props.agreeLabel && (
            <span className="form__checkbox-label-agreeText">
              {props.agreeLabel}{' '}
              <a
                href="http://help.trypura.com/legal/terms-of-service"
                rel="noopener noreferrer"
                target="_blank"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href="http://help.trypura.com/legal/privacy-policy"
                rel="noopener noreferrer"
                target="_blank"
              >
                Privacy Policy
              </a>.
            </span>
          )}
        </label>
      </div>
    </div>

    {props.meta.touched &&
      props.meta.error &&
        <span className="form__error">{props.meta.error}</span>
      }
  </div>
)

CheckBox.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.object,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  agreeLabel: PropTypes.string,
  meta: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
}

CheckBox.defaultProps = {
  disabled: false,
  icon: { type: 'ok' },
  id: '',
  label: '',
  agreeLabel: '',
  meta: {
    error: '',
    touched: false,
  },
  placeholder: '',
  type: 'checkbox',
}

export default CheckBox
