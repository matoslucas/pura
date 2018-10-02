import { get } from 'lodash'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getUser } from 'main/redux/modules/user'
import { listCard } from 'main/redux/modules/stripe'

import { HeaderShop } from '../../../components/layout/'
import Breadcrumbs from '../../../components/interactive/Breadcrumbs'
import InfoBox from '../../../components/boxes/InfoBox'
import ImageBox from '../../../components/boxes/ImageBox'
import AccountTable from '../../../components/tables/AccountTable'

class MyAccount extends Component {
  static propTypes = {
    breadcrumbs: PropTypes.object,
    getUser: PropTypes.func.isRequired,
    info: PropTypes.object,
    user: PropTypes.object,
  }

  static defaultProps = {
    breadcrumbs: {
      items: [
        {
          href: '/shop',
          text: 'Marketplace',
        },
        {
          href: null,
          text: 'My Account',
        },
      ],
    },

    info: {
      heading: 'My Account',
    },
    user: {},
  }

  // Initial fetch call
  componentWillMount() {
    this.fetchAccountData()
  }

  handleAvatarUploadComplete = () => {
    this.fetchAccountData()
  }

  // Fetch data from API
  fetchAccountData() {
    this.props.getUser().catch(error => {
      if (error.status === 404) {
        console.info(
          'User details not defined in Shopify, using Firebase user instead'
        )
      }
    })

    this.props.listCard()
  }

  getUserData(user) {
    return {
      email: user.data.email,
      plan: `${user.data.monthly_plan} fragrances a month`,
      shipping: this.formatAdress(user.data.default_address),
      subscription: user.data.subscription,
      billing: this.props.stripe && this.props.stripe.data ? this.props.stripe.data.brand + '-' + this.props.stripe.data.last4 : '',
    }
  }

  // Helper function for formatting adress
  formatAdress(adress) {
    return `${adress.first_name} ${adress.last_name}<br>${adress.address1}<br>${
      adress.city
      }, ${adress.province}, ${adress.zip}`
  }

  render() {
    const { breadcrumbs, info, user } = this.props

    const avatarUrl = get(user, 'data.avatar_data.url')

    return (
      <div className="pura-web__container">
        <HeaderShop />

        <section className="pura-web__section my-account">
          <div className="container">
            <Breadcrumbs className="my-account__breadcrumbs" {...breadcrumbs} />
            <InfoBox className="info-box--big info-box--center" {...info} />

            <ImageBox
              className="image-box--big"
              {...info}
              image={avatarUrl}
              uploadComplete={this.handleAvatarUploadComplete}
            />

            <AccountTable userData={user.loaded && this.getUserData(user)} />
          </div>
        </section>
      </div>
    )
  }
}

const MyAccountConnect = connect(
  state => ({
    auth: state.auth,
    user: state.user,
    stripe: state.stripe,
  }),
  { getUser, listCard, }
)(MyAccount)

export default MyAccountConnect
