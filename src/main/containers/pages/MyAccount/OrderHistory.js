import get from 'lodash/get'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { format } from 'date-fns'

import { fetchOrders } from 'main/redux/modules/orders'
import { HeaderShop } from '../../../components/layout/'
import Breadcrumbs from '../../../components/interactive/Breadcrumbs'
import InfoBox from '../../../components/boxes/InfoBox'
import StyledTable from '../../../components/tables/StyledTable'

import { CircleLoader } from 'main/components/loaders'
import { formattMoney } from 'common/utils/Intl'

const select = state => ({ orders: state.orders })
const actions = { fetchOrders }

@connect(select, actions)
export default class OrderHistory extends Component {
  static defaultProps = {
    breadcrumbs: {
      items: [
        { href: '/shop', text: 'Marketplace' },
        { href: '/my-account', text: 'My Account' },
        { href: null, text: 'Order History' },
      ],
    },

    orders: {
      loading: false,
      data: [],
    },
  }

  static propTypes = {
    breadcrumbs: PropTypes.any.isRequired,
    fetchOrders: PropTypes.function.isRequired,
    orders: PropTypes.shape({
      error: PropTypes.any,
      loading: PropTypes.bool.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          value: PropTypes.shape({
            description: PropTypes.string.isRequired,
            order_date: PropTypes.string.isRequired,
            payment_method: PropTypes.string.isRequired,
            period: PropTypes.shape({
              finish: PropTypes.string.isRequired,
              start: PropTypes.string.isRequired,
            }).isRequired,
            total_amount: PropTypes.number.isRequired,
          }).isRequired,
        })
      ),
    }),
  }

  componentWillMount() {
    this.props.fetchOrders()
  }

  get loading() {
    return (
      <div style={{ padding: '60px 0' }}>
        <CircleLoader />
      </div>
    )
  }

  get table() {
    const header = {
      cells: [
        { text: 'Date' },
        { text: 'Description' },
        { text: 'Period' },
        { text: 'Payment method' },
        { text: 'Total' },
      ],
    }

    const rows = get(this.props, 'orders.data', []).map(order => {
      const value = get(order, 'value', {})
      const period = get(order, 'value.period', {})

      const orderDate = format(Date.parse(value.order_date), 'MMMM YYYY')
      const startDate = format(Date.parse(period.start), 'MM.DD.YYYY')
      const endDate = format(Date.parse(period.finish), 'MM.DD.YYYY')

      value.total_amount /= Math.pow(10, 2);

      return {
        cells: [
          { text: orderDate },
          { text: value.description },
          { text: `${startDate} - ${endDate}` },
          { text: value.payment_method },
          { text: formattMoney(value.total_amount) },
        ],
      }
    })

    if (rows.length <= 0) {
      return (
        <p style={{ padding: 40, textAlign: 'center' }}>
          No Orders Have Been Placed Yet
        </p>
      )
    }

    return <StyledTable header={header} rows={rows} />
  }

  render() {
    
    const { breadcrumbs, orders } = this.props

    return (
      <div className="pura-web__container">
        <HeaderShop />

        <section className="pura-web__section my-account__order-history">
          <div className="container">
            <Breadcrumbs className="my-account__breadcrumbs" {...breadcrumbs} />
            <InfoBox
              className="info-box--big info-box--center"
              heading="Order history"
            />

            {orders.loading ? this.loading : this.table}
          </div>
        </section>
      </div>
    )
  }
}
