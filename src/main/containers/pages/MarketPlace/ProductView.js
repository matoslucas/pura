import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  fetchProductDetail,
  getProduct,
  getProductIsLoading,
} from 'main/redux/modules/products'

import { addRating, fetchRating } from 'main/redux/modules/rating'
import { addQueveItem, addDispensers, fetchDevices } from 'main/redux/modules/queve'

import { HeaderShop } from '../../../components/layout/'
import ProductInfo from '../../../components/layout/Marketplace/ProductInfo'
import ProductDetail from '../../../components/layout/Marketplace/ProductDetail'
import { OverlayLoader } from '../../../components/loaders'
import Modal from 'react-responsive-modal'
import { cropShopifyImage } from '../../../../common/utils/imageCrop'
import { Button } from '../../../../main/components/forms'

import config from '../../../../config'

class ProductView extends Component {
  static propTypes = {
    addQueveItem: PropTypes.func.isRequired,
    addRating: PropTypes.func.isRequired,
    fetchProductDetail: PropTypes.func.isRequired,
    fetchRating: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    product: PropTypes.object,
    isLoading: PropTypes.boolean.isRequired,
    rating: PropTypes.object,
    addDispensers: PropTypes.func.isRequired,
    fetchDevices: PropTypes.func.isRequired,
    queve: PropTypes.object,
  }

  static defaultProps = {
    rating: {},
    params: {},
    product: { data: { type: '' } },
    isLoading: true,
    rating: {}
  }

  constructor(props) {
    super(props)

    this.state = {
      counter: 1,
      productRating: {},
      modalIsOpen: false,
      buttonGoToQueue: {
        action: 'click',
        text: 'Go to Queue',
      },
      buttonGoToShop: {
        action: 'click',
        text: 'Go to Marketplace',
      },
    }

    this.rateProduct = this.rateProduct.bind(this)
    this.orderProduct = this.orderProduct.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)

    this.onClickHandler = this.onClickHandler.bind(this);
    this.goToQueueHandler = this.goToQueueHandler.bind(this);
    this.goToShopHandler = this.goToShopHandler.bind(this);
  }

  componentWillMount() {
    const { product, isLoading } = this.props;
    if (!product || !isLoading) {
      this.props.fetchProductDetail(this.props.params.productHandle)
    } else {
      this.props.fetchProductDetail(this.props.params.productHandle)
    }
  }

  onCloseModal() {
    this.setState({ modalIsOpen: false })
  }

  setCounter = counter => {
    this.setState({ counter })
  }

  rateProduct(myRating) {
    this.props.addRating(this.state.productId, myRating).then(result => {
      this.setState({
        productRating: result,
      })
    })
  }

  async orderProduct() {
    this.setState({ modalIsOpen: true })
    // Device are different from Fragrances
    if (String(this.props.product.data.id) === String(config.deviceId0)) {

      await this.props.fetchDevices(config.deviceId0);
      //console.info(this.props, this.state);
      const totalDevices = this.props.queve.devices.number + this.state.counter;
      await this.props.addDispensers(totalDevices, config.deviceId0);
    } else {
      await this.props.addQueveItem(this.props.product.data.id, this.state.counter);
    }

    //this.props.pushState('/queue');

  }

  isType(value) {

    let toReturn = false;
    if (this.props.product.data) {
      toReturn = value === this.props.product.data.type;
    }
    return toReturn
  }

  onClickHandler() {
    this.setState({ modalIsOpen: true })
  }

  goToQueueHandler() {
    this.props.pushState('/queue');
  }

  goToShopHandler() {
    this.props.pushState('/shop');
  }

  render() {
    const { product, isLoading } = this.props
    const showLoader = !product || isLoading

    // Get current product data from ProductsList & get current product ID from product index
    const { productRating } = this.state

    return (
      <div className="pura-web__container">
        <HeaderShop />
        {/*
        <button onClick={this.onClickHandler}> Open </button>
        */}

        <ProductInfo
          productData={this.props.product.data}
          productRating={productRating}
          onChange={this.setCounter}
          orderProduct={this.orderProduct}
          rateProduct={this.rateProduct}
        />
        {this.isType('Device') ? null : <ProductDetail productData={this.props.product.data} />}


        {showLoader && <OverlayLoader />}

        {this.props.product.data ?
          <Modal
            open={this.state.modalIsOpen}
            onClose={this.onCloseModal}
            closeIconSize={20}
            center={false}
            classNames={{ modal: 'css-modal-left' }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',

            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                margin: '-24px 0px 0px 0px',
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path fill="#18cea0" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <h4 style={{
                  color: '#000',
                  fontWeight: 700,
                }}> &nbsp; ADDED TO QUEUE</h4>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'flex-start',

              }}>
                <img style={{ margin: '20px 20px 20px 0px', }} src={this.props.product.data ? cropShopifyImage(this.props.product.data.imageSrc, 100) : null} />
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}>
                  <span style={{ color: '#000', fontWeight: 700 }}>{this.props.product.data.heading}</span>
                  <span style={{ color: '#000', fontWeight: 700 }}>Qty {this.state.counter}</span>
                </div>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: 325,
              }}>
                <Button
                  style={{ padding: '8px 14px', width: 160, }}
                  className="btn--primary btn--shadow btn--no-margin"
                  {...this.state.buttonGoToQueue}
                  handleClick={this.goToQueueHandler}
                />

                <Button
                  style={{ padding: '8px 14px', width: 160, }}
                  className="btn--secondary btn--outline-green btn--shadow btn--no-margin"
                  {...this.state.buttonGoToShop}
                  handleClick={this.goToShopHandler}
                />
              </div>
            </div>
          </Modal>
          :
          null
        }
      </div>
    )
  }
}

const ProductViewConnect = connect(
  (state, props) => ({
    product: getProduct(state, props.params.productHandle),
    isLoading: getProductIsLoading(state, props.params.productHandle),
    rating: state.rating,
    queve: state.queve,
  }),
  {
    pushState: push,
    fetchProductDetail,
    addRating,
    fetchRating,
    addQueveItem,
    addDispensers,
    fetchDevices,
  }
)(ProductView)

export default ProductViewConnect
