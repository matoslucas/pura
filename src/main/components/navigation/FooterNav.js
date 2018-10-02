import React from 'react'

const FooterNav = data => (
  <nav className="footer__navigation-column">
    <h5 className="footer__navigation-header">{data.header}</h5>
    <ul className="footer__navigation-list">
      {data.items.map(item => (
        <li className="footer__navigation-item">
          <a
            href={item.href}
            className="footer__navigation-item-link"
            target={item.target}
          >
            {item.text}
          </a>
        </li>
        ))}
    </ul>
  </nav>
  )

FooterNav.defaultProps = {
  header: 'Menu header',
  items: [
    {
      href: '#',
      text: 'Item',
    },
  ],
}

export default FooterNav
