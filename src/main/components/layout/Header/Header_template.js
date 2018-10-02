import React from 'react'
import { Link } from 'react-router'
import links from 'main/constants/layout/HeaderNavigation'
import { Translate } from 'react-i18nify'

const Header = () =>
  <header className="page__header">
    <div className="container">
      <div className="navbar">

        <div className="navbar__header">
          <Link to="/" className="navbar__brand"><Translate value="application.title" /></Link>
        </div>

        <nav className="navbar__nav">
          <ul className="list list--inline">
            {links.map(item =>
              <li className="list__item" key={item.id}>
                <Link to={item.url} className="navbar__link" activeClassName="navbar__link--active"><Translate value={item.name} /></Link>
              </li>
            )}
          </ul>
        </nav>

      </div>
    </div>
  </header>

export default Header
