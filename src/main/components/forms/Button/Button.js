import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import Icon from '../../icons/'


const Button = (props) => {
  const renderIcon = data =>
    <Icon className="btn__icon" {...data} />

  const renderText = data =>
    <span className="btn__text">{data}</span>

  const renderLoader = () =>
    <span className="btn__loader" />

  function renderButtonContent(data) {
    const elements = []

    data.icon && elements.push(renderIcon(data.icon))
    data.text && elements.push(renderText(data.text))
    data.loading && elements.push(renderLoader())
    data.iconRight && elements.push(renderIcon(data.iconRight))

    return elements
  }

  // Render
  switch (props.action) {
    case 'submit':
      return (
        <button
          style={props.style ? props.style : null}
          className={`btn ${props.className}`}
          disabled={props.disabled}
          onClick={props.handleClick}
          type="submit"
        >{renderButtonContent(props)}</button>
      )
    case 'click':
      return (
        <a
          style={props.style ? props.style : null}
          className={`btn ${props.className}`}
          disabled={props.disabled}
          onClick={props.handleClick}
        >{renderButtonContent(props)}</a>
      )
    default:
      return (
        <Link
          style={props.style ? props.style : null}
          className={`btn ${props.className}`}
          disabled={props.disabled}
          to={props.href}
        >{renderButtonContent(props)}</Link>
      )
  }
}

Button.defaultProps = {
  action: '',
  className: '',
  disabled: false,
  href: null,
  icon: null,
  iconRight: null,
  loading: false,
  text: '',
}

Button.propTypes = {
  action: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button