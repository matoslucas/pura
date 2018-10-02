import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  fetchProductList,
  getProducts,
  getIsLoading,
} from 'main/redux/modules/products'
import { fetchQueveLength, fetchDevices } from 'main/redux/modules/queve'

import { HeaderShop } from '../../../components/layout/'
import ProductsList from '../../../components/layout/Marketplace/ProductsList'
// import ProductSidebar from '../../../components/layout/Marketplace/ProductSidebar'
import { OverlayLoader } from '../../../components/loaders/'

import config from '../../../../config'

class Shop extends Component {
  static propTypes = {
    fetchProductList: PropTypes.func.isRequired,
    marketplace: PropTypes.object,
    products: PropTypes.object.isRequired,
    isLoading: PropTypes.boolean.isRequired,
  }

  constructor(props) {
    super(props)   
  }

  componentWillMount() {
    this.props.fetchProductList()
    this.props.fetchQueveLength()
    this.props.fetchDevices(config.deviceId0)
  }

  // USE RESELECT!!!

  render() {
    const { marketplace, products, isLoading } = this.props

    return (
      <div className="pura-web__container">
        <HeaderShop />
        <section className="products-view">
          <div className="container">
            <div className="marketplace">
              {/* <ProductSidebar className="marketplace__sidebar" /> */}
              <ProductsList
                className="marketplace__grid"
                {...marketplace}
                products={products}
                isLoading={isLoading}
              />
            </div>
          </div>
        </section>

        {isLoading && <OverlayLoader />}
      </div>
    )
  }
}

Shop.defaultProps = {
  recommended: {
    info: {
      heading: 'Your Recommended Fragrances',
      text:
        "We get you. Like, really get you. And we think you'll like these fragrances:",
    },
  },

  marketplace: {
    info: {
      heading: 'A Fragrance for Every Occasion',
      text:
        "Click on a fragrance to learn more. If you ever get one you that you don't like, we'll send you one that you will with your next box for no extra charge.",
    },
  },
}

export default connect(
  state => ({
    auth: state.auth,
    isLoading: getIsLoading(state),
    products: getProducts(state),
  }),
  {
    fetchProductList,
    fetchQueveLength,
    fetchDevices,
  }
)(Shop)
