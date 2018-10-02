import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const SubNavItem = (props) => {
  const itemActive = props.isActive ? ' sub-nav__item--active' : ''
  const itemDisabled = props.isDisabled ? ' sub-nav__item--disabled' : ''

  return (
    <Link
      className={`sub-nav__item${itemActive}${itemDisabled}`}
      to={props.href}
      key={props.id}
      onClick={() => props.handleClick(props.id)}
    >
      {props.text}
    </Link>
  )
}

SubNavItem.propTypes = {
  handleClick: PropTypes.func,
  href: PropTypes.string,
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  text: PropTypes.string,
}

SubNavItem.defaultProps = {
  handleClick: null,
  href: null,
  id: '',
  isActive: false,
  isDisabled: false,
  text: '',
}

export default SubNavItem
