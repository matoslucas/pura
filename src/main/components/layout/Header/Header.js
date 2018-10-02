import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import { logOut } from 'main/redux/modules/auth'

import PuraLogo from '../../vectors/pura_logo'
import HeaderNav from '../../navigation/HeaderNav'

// ********* TODO *********
// * REFACTOR BOTH HEADERS INTO ONE !!!!!

class Header extends Component {
  static propTypes = {
    className: PropTypes.string,
    logoColor: PropTypes.string,
    logOut: PropTypes.func.isRequired,
    nav: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      menuOpened: false,
      menuText: 'Menu',
    }

    this.handleClick = this.handleClick.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  handleClick(id) {
    switch (id) {
      case 'logOut':
        this.logoutCall()
        break
      default:
        break
    }
  }

  logoutCall() {
    
    return this.props.logOut().then(() => {
      console.log('Redirecting to login')
    })
  }

  toggleMenu() {
    const menuOpened = !this.state.menuOpened
    this.setState({ menuOpened })
  }

  render() {
    const { menuOpened } = this.state
    const { className, logoColor, nav } = this.props

    const classes = classnames(className, 'header', 'header-main', {
      'header--menu-open': menuOpened,
    })

    const toggleClasses = classnames(className, 'header__nav-toggle', {
      'header__nav-toggle--open': menuOpened,
    })

    return (
      <header className={classes}>
        <Link className="header__logo" to="/">
          <PuraLogo
            className="header__logo-image"
            fill={menuOpened ? '#FFF' : logoColor}
          />
        </Link>

        {nav && (
          <div className="header__nav-toggle-container">
            <a className={toggleClasses} onClick={this.toggleMenu}>
              <span className="header__nav-toggle-icon" />
              <span className="header__nav-toggle-text">
                {this.state.menuText}
              </span>
            </a>
          </div>
        )}

        {nav && (
          <div className="header__nav-container">
            <HeaderNav
              items={nav}
              handleClick={this.handleClick}
              open={this.state.menuOpened}
            />
          </div>
        )}
      </header>
    )
  }
}

Header.defaultProps = {
  className: '',
  logoColor: '#222222',

  nav: null,
}

export default connect(
  state => ({
    pushState: push,
    queve: state.queve,
    user: state.user,
  }),
  { logOut }
)(Header)
