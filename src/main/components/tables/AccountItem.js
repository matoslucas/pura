import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const AccountItem = props => (
  <div className={`account-item ${props.className}`}>
    {props.heading &&
      <div className="account-item__heading">{props.heading}</div>
    }

    <div
      className="account-item__content"
      dangerouslySetInnerHTML={{ __html: props.content }}
    />

    <div className="account-item__actions">
      {props.actions.map(item => (
        <Link to={item.href} className="account-item__actions-link">
          {item.text}
        </Link>
      ))}
    </div>

    {props.children}
  </div>
)

AccountItem.propTypes = {
  actions: PropTypes.array,
  children: PropTypes.node,
  className: PropTypes.string,
  content: PropTypes.string,
  heading: PropTypes.string,
}

AccountItem.defaultProps = {
  actions: [],
  className: '',
  content: '',
  heading: '',
}

export default AccountItem
