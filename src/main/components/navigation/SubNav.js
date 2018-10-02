import React, { PropTypes } from 'react'

import SubNavItem from './SubNavItem'

const SubNav = (props) => {
  return (
    <nav className={`sub-nav ${props.className}`}>
      {props.items.map(item => {
        const isActive = item.id === props.activeNavItem
        const isDisabled = props.disabledNavItems.indexOf(item.id) > -1

        return (
          <SubNavItem
            {...item}
            isActive={isActive}
            isDisabled={isDisabled}
            handleClick={props.handleClick}
          />
        )
      })}
    </nav>
  )
}

SubNav.propTypes = {
  className: PropTypes.string,
  disabledNavItems: PropTypes.array,
  handleClick: PropTypes.func,
  items: PropTypes.array,
}

SubNav.defaultProps = {
  className: '',
  disabledNavItems: [],
  handleClick: null,
  items: [],
}

export default SubNav
