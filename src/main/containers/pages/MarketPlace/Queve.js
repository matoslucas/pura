import get from 'lodash/get'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  addDispensers,
  fetchQueveList,
  fetchDevices,
  removeQueveItem,
  moveQueveItemCall,
  getQueueStatus,
  shipNow,
} from 'main/redux/modules/queve'
import { fetchProductList, getProducts, } from 'main/redux/modules/products'
import { getUser } from 'main/redux/modules/user'

import { HeaderShop } from '../../../components/layout/'
import Breadcrumbs from '../../../components/interactive/Breadcrumbs'
import InfoBox from '../../../components/boxes/InfoBox'
import QueveTable from '../../../components/tables/QueveTable'

import config from '../../../../config'
import { Button } from 'main/components/forms'

import Modal from 'react-responsive-modal'

class Queve extends Component {
  static propTypes = {
    breadcrumbs: PropTypes.object,
    fetchProductList: PropTypes.func.isRequired,
    fetchQueveList: PropTypes.func.isRequired,
    fetchDevices: PropTypes.func.isRequired,
    info: PropTypes.object,
    moveQueveItemCall: PropTypes.func.isRequired,
    products: PropTypes.array,
    queve: PropTypes.object,
    queveTable: PropTypes.object,
    removeQueveItem: PropTypes.func.isRequired,
    addDispensers: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      buttonYes: {
        action: 'click',
        text: 'Yes',
      },
      buttonCancel: {
        action: 'click',
        text: 'Cancel',
      },
    }
  }

  componentWillMount() {
    this.props.fetchDevices(config.deviceId0)
    this.props.fetchQueveList()
    this.props.fetchProductList()
    this.props.getUser()
    this.props.getQueueStatus()
    
    console.log('TEST: This is the newest version of Queue on Heroku')  // Remove after successful test
  }

  componentDidUpdate(prevProps) {
    //console.info('this props: ',this.props)
    if (this.props.queve.status !== prevProps.queve.status && this.props.queve.status.processing) {
      this.setState({ modalIsOpen: true })
    }
  }

  moveItem = (key, position, originalPosition) => {
    // Move down by -1, due to array != position numerics
    //console.info('moveItem => ',key, position, originalPosition)
    //position > originalPosition && position--

    this.props.moveQueveItemCall(key, position, this.props.queve)
  }

  removeItem = (key) => {
    const { removeQueveItem, fetchQueveList } = this.props
    
    return removeQueveItem(key)
      .then(() => fetchQueveList())
  }

  removeDevice = (qty) => {
    const { addDispensers, fetchDevices } = this.props
    
    return addDispensers(qty - 1, config.deviceId0)
      .then(() => fetchDevices(config.deviceId0))
  }

  get tableConfig() {
    const monthlyPlan = get(this.props, 'user.data.monthly_plan')

    return {
      tableHead: {
        orderNo: '',
        image: null,
        name: 'Name',
        type: 'Type',
        rating: null,
        ratingHead: 'Rating',
        date: 'Last update',
        dateInfo: '',
        actions: null,
        iconState: null,
      },

      upgrade: monthlyPlan
        ? {
          info: monthlyPlan,
          action: {
            href: '/my-account/change-plan',
            text: 'Upgrade my plan',
          },
        }
        : null,
    }
  }
  
  shipNowHandler = () => {
    this.setState({ modalIsOpen: false })

    return this.props
     .shipNow()
     .then(() => window.location.reload()) // Refactor for proper reload
  }

  onCloseModal = () => {
    this.setState({ modalIsOpen: false })
  }

  createMarkup = (value) => {
    return { __html: value };
  }

  onClickHandler = () => {
    this.setState({ modalIsOpen: true })
  }

  render() {
    const monthlyPlan = get(this.props, 'user.data.monthly_plan')
    const { breadcrumbs, info, queve, products } = this.props;
    const shipNow = {
      action: 'click',
      text: 'Ship now',
    };

    let customText = "Change the shipping order of fragrances dragging them around.";
    let showButton = false;

    let plannedItems = [];
    plannedItems = queve.data.filter((item) => {
      return item.status === 'planned'
    })

    if (queve.status && queve.status.processing) {
      showButton = false;
      info.text = "";
      customText = "Your order is currently being processed.";
    } else {

      if (queve.devices && queve.devices.number) {
        showButton = true;
        info.text = "";
        customText = "Change the shipping order of fragrances dragging them around. <br /> When you're ready to receive your package click <b>Ship Now</b>";
      }

      if (plannedItems.length >= monthlyPlan) {
        showButton = true;
        info.text = "";
        customText = "Change the shipping order of fragrances dragging them around. <br /> When you're ready to receive your package click <b>Ship Now</b>";
      }

    }



    return (
      <div className="pura-web__container">
        <HeaderShop />

        <div className="container">
          <Breadcrumbs className="queve-breadcrumbs" {...breadcrumbs} />
          <InfoBox className="info-box--big queve-info" {...info} />

          <div className="queve-table__upgrade-action">
            <span className="queve-table__upgrade-info"
              style={{
                fontSize: 16,
              }}
              dangerouslySetInnerHTML={this.createMarkup(customText)} />
            {showButton ?
              <Button
                style={{
                  height: 43,
                  width: 193.73,
                }}
                className="btn--primary btn--shadow btn--no-margin"
                {...shipNow}
                handleClick={this.onClickHandler}
              />
              : null}
          </div>
          {/*
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <div className={'info-box__text'} style={{ fontWeight: 700, margin: 10 }} dangerouslySetInnerHTML={this.createMarkup(customText)} >

              </div>
              {showButton ?
                <Button
                  className="btn--primary btn--shadow btn--no-margin"
                  {...shipNow}
                  handleClick={this.shipNowHandler}
                />
                : null}
            </div>
          </div>
          */}
          {queve.devices ? <QueveTable
            {...this.tableConfig}
            moveItem={this.moveItem}
            queve={queve.data}
            queueStatus={queve.status}
            products={products}
            devicesRequested={queve.devices.number}
            queveAction={this.removeItem}
            removeDevice={this.removeDevice}
          /> : null}
        </div>
        <Modal
          open={this.state.modalIsOpen}
          onClose={this.onCloseModal}
          closeIconSize={20}
          classNames={{ modal: 'css-modal-center' }}
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

              <h4 style={{
                color: '#000',
                fontWeight: 700,
              }}> &nbsp; </h4>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start',

            }}>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
              }}>
                <span style={{ color: '#000', fontWeight: 700 }}>
                  {queve.status && queve.status.processing ?
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: 325,
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="#18cea0" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>

                    </div>
                    :
                    'Are you sure you want to ship now?'}
                </span>
                <br />
                <br />
              </div>
            </div>
            {queve.status && queve.status.processing ?
              <span style={{ color: '#000', fontWeight: 700, fontSize: 18, textAlign: 'center'}}>
                Your order is being processed.
               </span>
              :
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: 325,
              }}>
                <Button
                  style={{ padding: '8px 14px', width: 160, }}
                  className="btn--primary btn--shadow btn--no-margin"
                  {...this.state.buttonYes}
                  handleClick={this.shipNowHandler}
                />

                <Button
                  style={{ padding: '8px 14px', width: 160, }}
                  className="btn--secondary btn--outline-green btn--shadow btn--no-margin"
                  {...this.state.buttonCancel}
                  handleClick={this.onCloseModal}
                />
              </div>
            }

          </div>
        </Modal>
      </div>
    )
  }
}

Queve.defaultProps = {
  breadcrumbs: {
    items: [
      {
        href: '/shop',
        text: 'Marketplace',
      },
      {
        href: null,
        text: 'My Queue',
      },
    ],
  },

  info: {
    heading: 'My Queue',
    text: "",
    //'Set yourself up. Line up your fragrances in the order you’d like to recieve them. Shuffle, move, switch to your hearts content. Enjoy!',
  },

  products: [],
  queve: {},
}

const QueveConnect = connect(
  state => ({
    auth: state.auth,
    products: getProducts(state),
    queve: state.queve,
    user: state.user,
  }),
  {
    fetchQueveList,
    fetchDevices,
    getQueueStatus,
    fetchProductList,
    getUser,
    moveQueveItemCall,
    removeQueveItem,
    addDispensers,
    shipNow,
  }
)(Queve)

export default QueveConnect
