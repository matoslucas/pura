import React from 'react'
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'
import { Link } from 'react-router'

import Icon from '../icons/'

const HeaderNav = data => {
  const headerNavItem = item =>
    <li className="header-nav__item" key={item.text}>
      <Link to={item.href} className={`header-nav__item-link ${item.className}`} onClick={() => data.handleClick(item.clickID)}>
        {item.text && <span className="header-nav__item-text">{item.text}</span>}
        {item.icon && <Icon className="header-nav__item-icon" {...item.icon} />}
      </Link>
    </li>

  const dropdownItem = item =>
    <li className={`header-dropdown__item ${item.className}`} key={item.text}>
      <Link to={item.href} className="header-dropdown__link" onClick={() => data.handleClick(item.clickID)}>
        {item.text && <span className="header-dropdown__item-text">{item.text}</span>}
        {item.icon && <Icon className="header-dropdown__item-icon" {...item.icon} />}
      </Link>
    </li>

  const headerDropdown = dropdownData =>
    <li className="header-nav__item" key={dropdownData.text}>
      <Dropdown className="header-dropdown">
        <DropdownTrigger className="header-nav__item-link">
          {dropdownData.text && <span className="header-nav__item-text">{dropdownData.text}</span>}
          {dropdownData.icon && <Icon className="header-nav__item-icon" {...dropdownData.icon} key="dropdown-trigger-icon" />}
        </DropdownTrigger>

        <DropdownContent className="header-dropdown__container">
          <div className="header-dropdown__arrow"></div>
          {dropdownData.info && <div className="header-dropdown__info header-dropdown__segment">{dropdownData.info}</div>}
          <ul className="header-dropdown__content header-dropdown__segment">
            {dropdownData.dropdown.map(item => dropdownItem(item))}
          </ul>
        </DropdownContent>
      </Dropdown>
    </li>

  return (
    <nav className={`header-nav${data.open ? ' header-nav--open' : ''}`}>
      <ul className="header-nav__list">
        {data.items.map(item =>
          item.dropdown ? headerDropdown(item) : headerNavItem(item)
        )}
      </ul>
    </nav>
  )
}

HeaderNav.defaultProps = {
  items: [],
  handleClick: () => {},
}

export default HeaderNav
