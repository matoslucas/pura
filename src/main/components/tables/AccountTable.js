import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import { CircleLoader } from 'main/components/loaders'

import PauseModal from 'main/containers/pages/MyAccount/modals/pause'
import CancelModal from 'main/containers/pages/MyAccount/modals/cancel'

import AccountItem from './AccountItem'

export default class AccountTable extends Component {
  static defaultProps = {
    className: '',
    userData: {},
  }

  static propTypes = {
    className: PropTypes.string,
    userData: PropTypes.shape({}),
  }

  get items() {
    const { userData } = this.props
    
    if (!userData) {
      return []
    }

    const tableItems = [
      {
        id: 'email',
        heading: 'Email',
        content: userData.email,
        actions: [
          {
            href: '/my-account/change-email',
            text: 'Change email',
          },
        ],
      },
      {
        id: 'password',
        heading: 'Password',
        content: userData.password || '********',
        actions: [
          {
            href: '/my-account/change-password',
            text: 'Change password',
          },
        ],
      },
      {
        id: 'billing',
        heading: 'Billing Information',
        content: userData.billing || 'No card registered',
        actions: [
          {
            href: '/my-account/change-payment',
            text: 'Update payment info',
          },
          {
            href: '/my-account/order-history',
            text: 'View billing details',
          },
        ],
      },
      {
        id: 'shipping',
        heading: 'Shipping Details',
        content: userData.shipping,
        actions: [
          {
            href: '/my-account/change-shipping',
            text: 'Update shipping details',
          },
        ],
      },
      {
        id: 'plan',
        heading: 'Plan Details',
        content: userData.plan,
        actions: [
          {
            href: '/my-account/change-plan',
            text: 'Change plan',
          },
        ],
      },
    ]

    const subIsCancelled = userData.subscription.state === 'cancelled'

    if (!subIsCancelled) {
      tableItems.push({
        id: 'pause_plan',
        content:
          userData.subscription.state === 'active'
            ? 'PAUSE YOUR SUBSCRIPTION'
            : 'RESUME YOUR SUBSCRIPTION',
        children: <PauseModal subscription={userData.subscription} />,
      })
    }

    tableItems.push({
      id: 'cancel_plan',
      content: subIsCancelled
        ? 'REACTIVATE YOUR SUBSCRIPTION'
        : 'CANCEL YOUR SUBSCRIPTION',
      children: <CancelModal />,
    })

    return tableItems
  }

  render() {
    const classes = classnames('account-table', this.props.className)

    return (
      <div className={classes}>
        {!this.props.userData && <CircleLoader />}
        {this.items.map(item => <AccountItem key={item.id} {...item} />)}
      </div>
    )
  }
}
