import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'

import { logOut } from 'main/redux/modules/auth'

import HeaderNav from '../../navigation/HeaderNav'
import PuraLogo from '../../vectors/pura_logo'



class HeaderShop extends Component {
  static propTypes = {
    logOut: PropTypes.func.isRequired,
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

  constructNav(props) {
    return [
      {
        href: null,
        text: 'My Account',
        icon: {
          type: 'profile',
          fill: '#FFFFFF',
        },

        info: props.user.data ? `Hello ${props.user.data.first_name}` : 'Hello',
        dropdown: [
          {
            href: '/my-account',
            text: 'My Account',
            clickID: 'myAccount',
          },
          {
            href: '/my-account/order-history',
            text: 'My Orders',
            clickID: 'myOrders',
          },
          {
            href: null,
            text: 'Log out',
            clickID: 'logOut',
          },
        ],
      },

      {
        href: '/queue',
        text: 'My Queue',
        clickID: 'queve',
        icon: {
          type: 'number',
          value: this.getQueueLen(),
        },
      },
    ];
  }
  getQueueLen() {
    const currentLen = this.props.queve.count ? this.props.queve.count : 0;
    const devicesQty = this.props.queve.devices ? this.props.queve.devices.number : 0;
    return (currentLen + devicesQty)
  }

  logoutCall() {
    
    return this.props.logOut().then(() => {
      console.log('Redirecting to login')
    })
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

  toggleMenu() {
    const menuOpened = !this.state.menuOpened
    this.setState({ menuOpened })
  }

  render() {
    
    return (
      <header
        className={`header header-shop${
          this.state.menuOpened ? ' header--menu-open' : ''
          }`}
      >
        <Link className="header__logo" to="/shop">
          <PuraLogo className="header__logo-image" fill="#FFFFFF" />
        </Link>

        <div className="header__nav-toggle-container">
          <a
            className={`header__nav-toggle${
              this.state.menuOpened ? ' header__nav-toggle--open' : ''
              }`}
            onClick={this.toggleMenu}
          >
            <span className="header__nav-toggle-icon" />
            <span className="header__nav-toggle-text">
              {this.state.menuText}
            </span>
          </a>
        </div>

        <div className="header__nav-container">
          <HeaderNav
            items={this.constructNav(this.props)}
            handleClick={this.handleClick}
            open={this.state.menuOpened}
          />
        </div>
      </header>
    )
  }
}

export default connect(
  state => ({
    pushState: push,
    queve: state.queve,
    user: state.user,
  }),
  { logOut }
)(HeaderShop)
