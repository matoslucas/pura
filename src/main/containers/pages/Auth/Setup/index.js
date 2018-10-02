import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { push } from 'react-router-redux'
import { reduxForm, SubmissionError, formValueSelector, getFormValues, change, } from 'redux-form'

import config from '../../../../../config'

import { Button, Input, Separator, Note } from 'main/components/forms'

import Modal from 'react-responsive-modal'

import { addCard } from 'main/redux/modules/stripe'
import { createAccount, useDiscountCode, registrationBill } from 'main/redux/modules/signUp'
import { addDispensers } from 'main/redux/modules/queve'
import { createUser, updateUser } from 'main/redux/modules/user'

import {
  createValidator,
  creditCard,
  creditCardExp,
  creditCardCvc,
  required,
  zipCode,
  validateQtyFragrances,
} from 'common/utils/validation'

import { Header } from 'main/components/layout/'
import SubNav from 'main/components/navigation/SubNav'
import RegisterPlan from 'main/components/layout/Register/RegisterPlan'
import RegisterShipping from 'main/components/layout/Register/RegisterShipping'
import RegisterPayment from 'main/components/layout/Register/RegisterPayment'

import AddFragranceWidget from 'main/components/interactive/AddFragranceWidget'
import AddDeviceWidget from 'main/components/interactive/AddDeviceWidget'
import PromoCodeWidget from 'main/components/interactive/PromoCodeWidget'

import { formattMoney } from 'common/utils/Intl'

//Apple pay
import { StripeProvider, Elements } from 'react-stripe-elements';
import PaymentRequestForm from "../../../../components/stripe/PaymentRequestForm"

const SETUP_FORM_NAME = 'account-setup'


class Setup extends Component {
  static defaultProps = {
    setupHeader: {
      nav: [
        {
          className: 'header-nav__item-link--button header-nav__item-link--dark',
          clickID: 'logOut',
          text: 'Log out',
        },
      ],
    },

    setupNav: {
      items: [
        {
          id: 'nav-plan',
          text: 'Your plan',
        },
        {
          id: 'nav-payment',
          text: 'Payment',
        },
        {
          id: 'nav-shipping',
          text: 'Shipping',
        },
      ],
    },
  }

  static propTypes = {
    addCard: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    setupNav: PropTypes.array,
    updateUser: PropTypes.func.isRequired,
  }

  static validation = createValidator({
    yourPlan: required,

    cardNumber: [required, creditCard],
    cardName: required,
    cardExp: [required, creditCardExp],
    cardCvc: [required, creditCardCvc],

    billingFirstName: required,
    billingLastName: required,
    billingAdress: required,
    billingZipCode: [required, zipCode],
    billingCity: required,

    shippingFirstName: required,
    shippingLastName: required,
    shippingAdress: required,
    shippingZipCode: [required, zipCode],
    shippingCity: required,
    //planWidget:  [validateQtyFragrances('addDeviceWidget')],
  })

  static contextTypes = {
    store: PropTypes.object,
  }

  static onSubmitFailHandler(errors) {
    //const refsKeys = Object.keys(this.refs);
    const keys = Object.keys(errors);
    let key = null;
    let matchfound = false;

    keys.filter(item => {
      if (keys.indexOf(item) > -1 && !matchfound) {
        key = item;
        matchfound = true;
        return false;
      } else { // eslint-disable-line no-else-return
        return true;
      }
    });

    let targetNode = document.querySelector(`input[name=${key}], select[name=${key}]`); //this.refs[key];


    if (targetNode) {

      const xy = targetNode.getBoundingClientRect();
      let x = xy.right + window.scrollX;
      let y = xy.top + window.scrollY - 60;

      window && window.scrollTo(x, y); // eslint-disable-line no-unused-expressions
    }
  }


  constructor(props) {
    super(props)

    this.handleNavClick = this.handleNavClick.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.registerCall = this.registerCall.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onDisplay = this.onDisplay.bind(this);

    this.openModal = this.openModal.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.registerSuccesfull = this.registerSuccesfull.bind(this);
    this.catchUserInfo = this.catchUserInfo.bind(this);

    // Set disabled subnav items to all items but first
    const disabledNavItems = Array.isArray(props.setupNav.items) ? props.setupNav.items
      .slice(1)
      .map(item => item.id) : [];

    this.state = {
      registerStep: 0,
      visitedStep: 0,
      activeNavItem: props.setupNav.items[0].id,
      disabledNavItems,
      modalIsOpen: false,
      buttonYes: {
        action: 'click',
        text: 'Go to Marketplace',
      },
    }
  }

  // Redirect user to the shop, if he already has an account properly set up
  componentWillReceiveProps(nextProps) {
    // Check for Auth change


    if (this.props.auth.user && this.props.auth.user !== nextProps.auth.user) {
      if (nextProps.auth.user.shopify_acc_ready && nextProps.auth.user.stripe_card_set) {
        this.registerSuccesfull()
      }
    }
  }


  onDisplay() {
    const { planWidget, addDeviceWidget, promoCodeWidget } = this.props.formValues;
    this.props.registrationBill(promoCodeWidget, planWidget, addDeviceWidget);
  }

  onChangeHandler(name, newValue) {

    const { planWidget, addDeviceWidget, promoCodeWidget } = this.props.formValues;

    if (this.state.registerStep) {
      switch (name) {
        case 'planWidget': this.props.registrationBill(promoCodeWidget, newValue, addDeviceWidget);
          break;
        case 'addDeviceWidget': this.props.registrationBill(promoCodeWidget, planWidget, newValue);
          break;
        case 'promoCodeWidget': this.props.registrationBill(newValue, planWidget, addDeviceWidget);
          break;
        default: //console.info(name);

      }
    }

  }

  // Register section switch methods
  setPage(step) {
    this.navSetActive(step)
    this.setState({ registerStep: step })
    this.state.visitedStep <= step && this.setState({ visitedStep: step })
    window && window.scrollTo(0, 0);
  }
  nextPage() {
    this.setPage(this.state.registerStep + 1)
  }
  prevPage() {
    this.setPage(this.state.registerStep - 1)
  }


  // Nav Methods
  handleNavClick(id) {
    const { visitedStep } = this.state

    switch (id) {
      case 'nav-plan':
        visitedStep > 0 && this.setPage(0)
        break
      case 'nav-payment':
        visitedStep >= 1 && this.setPage(1)

        break
      case 'nav-shipping':
        visitedStep >= 2 && this.setPage(2)
        break
      default:
        break
    }
  }
  navSetActive(key) {
    const activeNavItem = this.props.setupNav.items[key].id

    const disabledNavIndex = this.state.disabledNavItems.indexOf(activeNavItem)
    const disabledNavItems = this.state.disabledNavItems.slice(disabledNavIndex + 1)

    this.setState({
      activeNavItem,
      disabledNavItems,
    })
  }

  formatData(data) {
    const expMonth = data.cardExp.split('/')

    const formattedData = {
      shopify: {
        promo_code: data.promoCodeWidget,
        customer: {
          first_name: data.billingFirstName,
          last_name: data.billingLastName,
          email: data.email, // <- this email gets rewritten from the "sign_up" email value
          verified_email: true,
          addresses: [
            {
              address1: data.shippingAdress,
              city: data.shippingCity,
              province: data.shippingState,
              phone: null,
              zip: data.shippingZipCode,
              first_name: data.shippingFirstName,
              last_name: data.shippingLastName,
              country: 'US',
            },
          ],
          metafields: [
            {
              key: 'monthly_plan',
              value: data.planWidget,
              value_type: 'integer',
              namespace: 'global',
            },
          ],
        },
      },

      stripe: {
        object: 'card',
        exp_month: expMonth[0],
        exp_year: expMonth[1],
        number: data.cardNumber,
        cvc: data.cardCvc,
        name: data.cardName,

        address_line1: data.billingAdress,
        address_line2: data.billingAdress2 || null,
        address_zip: data.billingZipCode,
        address_city: data.billingCity,
        address_state: data.billingState,
        address_country: 'US',
      },
    }

    return formattedData
  }

  // Final register method
  // TODO get proper error codes from Marek and fix mail-already-taken issue!
  async registerCall(data) {
    //console.info(data);
    const { addDeviceWidget, promoCodeWidget } = data
    const formattedData = this.formatData(data)
    /*
    try {
      if (promoCodeWidget) await this.props.useDiscountCode(promoCodeWidget)
    } catch (error) {
      throw new SubmissionError({ _error: error.message })
    }
    */
    try {
      if (addDeviceWidget) await this.props.addDispensers(addDeviceWidget, config.deviceId0)
    } catch (error) {
      throw new SubmissionError({ _error: error.message })
    }

    try {
      await this.props.addCard(formattedData.stripe)
      await this.props.createUser(formattedData.shopify)
    } catch (error) {
      if (error.error_code !== 1337) {
        throw new SubmissionError({ _error: error.message })
      }

      await this.props.updateUser(formattedData.shopify)
    }

    //this.registerSuccesfull()
    this.openModal();
  }


  registerSuccesfull() {
    this.setState({ modalIsOpen: false });
    this.props.pushState('/shop');
  }

  formatNumber(value) {
    return parseFloat(Math.round(value * 100) / 100).toFixed(2);
  }

  get summaryTableSection() {

    const { data: bill } = this.props.signUp;

    let { planWidget: monthlyItems, addDeviceWidget: QtyDevices, promoCodeWidget } = this.props.formValues;
    let allFields = [];

    let fragrancesByDevices = QtyDevices * 2;

    if (monthlyItems < fragrancesByDevices) {
      monthlyItems = fragrancesByDevices;
    }

    let ButtonLabel = 'Continue';
    let promoCodeDiscount = 0;

    // check  for shipping stage,
    if (this.state.registerStep === 2) {
      ButtonLabel = 'Finish';
    }

    const introPlanCount = 2

    const introPlanPrice = 12
    const additionalItemPrice = 4
    const dispenserPrice = 79
    const AllDispensersPrice = dispenserPrice * QtyDevices;
    let firstMonthDiscount = introPlanPrice
    const newSubscriberPromo = 0; //30 for activate latter

    const priceForAdditionalItems = (monthlyItems - introPlanCount) * additionalItemPrice
    const monthlyPrice = introPlanPrice + priceForAdditionalItems

    if (QtyDevices === 0) {
      firstMonthDiscount = 0;
    }

    const subTotal = monthlyPrice + AllDispensersPrice - firstMonthDiscount - newSubscriberPromo

    const tax = 0
    let total = subTotal + tax;

    let discountLabel = promoCodeWidget + 'Discount 50%';

    if (this.props.formValues.promoCodeWidget && this.state.registerStep === 2) {
      // total = (subTotal + tax) / 2;
      // promoCodeDiscount = total;
      // discountLabel = promoCodeWidget + ' Discount 50%';
    }

    allFields = [
      {
        component: Note,
        className: 'form__note--info order_summery',
        name: '',
        text: '<b>ORDER SUMMARY</b>',
        // link: {
        //   text: 'Edit',
        // },
      },
      {
        component: Separator,
        className: 'ordersummary',
        name: '',
        text: '',
      },
      {
        component: AddFragranceWidget,
        modifier: 'form__item--collapse',
        name: 'planWidget',
        changeHeading: 'Select Your Plan',
      },
      {
        component: Note,
        className: 'form__note--green price-right',
        name: '',
        text: '2 FREE fragrances',
        link: null,
        price: '-' + (bill ? formattMoney(bill.two_fragrances_free) : ''),
      },
      {
        component: AddDeviceWidget,
        modifier: 'form__item--collapse',
        name: 'addDeviceWidget',
        currentPlan: '',
        changeHeading: 'Select Your Plan',
      },
      /*
      {
        component: Note,
        className: 'form__note--info note--price',
        name: '',
        text: `${monthlyItems} Fragrances / Month`,
        link: null,
        price: '$' + monthlyPrice,
      },
     
      {
        component: Note,
        className: 'form__note--info note--price',
        name: '',
        text: 'Dispenser (One Time Fee)',
        link: null,
        price: '$' + AllDispensersPrice,
      },
      */
      /*
       {
         component: Note,
         className: 'form__note--info price-right',
         name: '',
         text: 'New Subscriber Promo',
         link: null,
         price: '-$' + newSubscriberPromo,
       },
       */
      {
        component: Separator,
        className: 'ordersummary',
        name: '',
        text: '',
      },
      {
        component: Note,
        className: 'form__note--info  price-total',
        name: '',
        text: 'Sub Total',
        link: null,
        price: (bill ? formattMoney(bill.subtotal) : ''),
      },
      {
        component: Separator,
        className: 'ordersummary',
        name: '',
        text: '',
      },
      {
        component: Note,
        className: 'form__note--info note--price',
        name: '',
        text: 'Tax',
        link: null,
        price: '$' + tax,
      },
      {
        component: Note,
        className: 'form__note--green price-right',
        name: '',
        text: 'Shipping & handling',
        link: null,
        price: 'Free',
      },
      // promo code discount
      {
        component: Note,
        className: 'form__note--green price-right',
        name: 'discount',
        text: (bill ? bill.promotion_label : ''),
        link: null,
        price: '-' + (bill ? formattMoney(bill.total_promo_discount) : ''),
      },

      {
        component: Separator,
        className: 'ordersummary',
        name: '',
        text: '',
      },
      {
        component: Note,
        className: 'form__note--info price-total',
        name: '',
        text: 'Total',
        link: null,
        price: (bill ? formattMoney(bill.total) : ''),
      },
      {
        component: Note,
        className: 'form__note--info heading_info',
        name: '',
        text: 'PROMO CODE',
      },
      // {
      //   component: Input,
      //   name: 'promocode',
      //   label: 'Promo Code',
      // },
      {
        component: PromoCodeWidget,
        modifier: 'form__item--collapse',
        name: 'promoCodeWidget',
        promoCodeWidget: '',
      },
      {
        component: Note,
        className: 'form__note--info heading_error',
        name: '',
        text: (bill ? bill.message : ''),
      },
      {
        modifier: 'form__item--center',
        component: Button,
        name: 'submit-btn-final',
        className: 'btn--primary btn-final btn--shadow btn--fat',
        action: 'submit',
        text: ButtonLabel,
      },
    ];


    return {
      className: 'form__section--400 col-lg-5 col-md-5 col-sm-5',
      fields: allFields.filter(item => {

        // hide discount
        if (bill && bill.total_promo_discount == 0 && item.name === 'discount') {
          return false;
        }
        return true
        //hide promo code fields and show %50 discount
        /*
        if (this.state.registerStep === 2) {

          if (item.label === 'Promo Code' || item.text === 'Promo Code') {
            return false;
          }// hide if promo code is empty
          else if (!this.props.formValues.promocode && item.text === discountLabel) {
            return false;
          }
          else {
            return true;
          }

        }
        // hide promo code aplied
        else if (item.text === discountLabel) {
          return false;
        }
        else {
          return true;
        }*/
      }),
    }
  }

  onCloseModal() {
    this.setState({ modalIsOpen: false });
    this.props.pushState('/shop');
  }

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  catchUserInfo(data) {
    //console.info(data);
    //console.info(this.props);
    const card = data.token.card;
    const yy = String(card.exp_year).substr(String(card.exp_year).length - 2);
    const fullname = String(card.name).split(' ');
    // update card info
    this.props.dispatch(change(SETUP_FORM_NAME, 'cardName', card.name));
    this.props.dispatch(change(SETUP_FORM_NAME, 'cardExp', card.exp_month + '/' + yy));


    this.props.dispatch(change(SETUP_FORM_NAME, 'billingFirstName', fullname[0]));
    this.props.dispatch(change(SETUP_FORM_NAME, 'billingLastName', fullname[1].length > 1 ? fullname[1] : fullname[2]));

    this.props.dispatch(change(SETUP_FORM_NAME, 'billingAdress', card.address_line1));
    this.props.dispatch(change(SETUP_FORM_NAME, 'billingAdress2', card.address_line2));

    this.props.dispatch(change(SETUP_FORM_NAME, 'billingCity', card.address_city));
    this.props.dispatch(change(SETUP_FORM_NAME, 'billingZipCode', card.address_zip));
    this.props.dispatch(change(SETUP_FORM_NAME, 'billingState', card.address_state));



  }

  render() {
    const {
      error,
      handleSubmit,
      setupHeader,
      setupNav,
      submitting,
    } = this.props

    const {
      activeNavItem,
      disabledNavItems,
      registerStep,
      billing,
    } = this.state

    return (
      <div className="pura-web__container" style={{ padding: '20px 0px 10px 0px' }}>
        <Header {...setupHeader} />

        <SubNav
          {...setupNav}
          className="sub-nav--secondary"
          activeNavItem={activeNavItem}
          disabledNavItems={disabledNavItems}
          handleClick={this.handleNavClick}
        />

        {/*registerStep === 1 && this.props.signUp.data ?
          <Elements>
            <PaymentRequestForm label={'Pura - Subscription'} amount={100} catchUserInfo={this.catchUserInfo} />
          </Elements>
          : null
        */}



        {registerStep === 0 && <RegisterPlan onSubmit={handleSubmit(this.nextPage)} error={error} submitting={submitting} />}
        {registerStep === 1 && <RegisterPayment onSubmit={handleSubmit(this.nextPage)} error={error} submitting={submitting} onChange={this.onChangeHandler} onDisplay={this.onDisplay} summaryTableSection={this.summaryTableSection} />}
        {registerStep === 2 && <RegisterShipping {...billing} onSubmit={handleSubmit(this.registerCall)} error={error} onChange={this.onChangeHandler} onDisplay={this.onDisplay} submitting={submitting} summaryTableSection={this.summaryTableSection} />}

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
                textAlign: 'center',
                width: '100%',
              }}>
                <span style={{ color: '#000', fontWeight: 700 }}>
                  Thanks for signing up for the Pura Subscription!<br /> <br />
                  Time to pick your first fragrances... How exciting!  </span>
                <br />
                <br />
              </div>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}>
              <Button
                style={{ padding: '8px 14px', width: 160, }}
                className="btn--primary btn--shadow btn--no-margin"
                {...this.state.buttonYes}
                handleClick={this.registerSuccesfull}
              />


            </div>
          </div>
        </Modal>

      </div>
    )
  }
}

const selectFormValues = formValueSelector(SETUP_FORM_NAME)
const valuesToSelect = ['planWidget', 'addDeviceWidget', 'promoCodeWidget']

export default compose(
  connect(
    state => ({
      auth: state.auth,
      loading: true,
      signUp: state.signUp,
      formValues: selectFormValues(state, ...valuesToSelect)
    }),
    {
      pushState: push,
      addCard,
      createAccount,
      createUser,
      updateUser,
      useDiscountCode,
      addDispensers,
      registrationBill,
    }
  ),
  reduxForm({
    form: SETUP_FORM_NAME,
    validate: Setup.validation,
    onSubmitFail: Setup.onSubmitFailHandler,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize: false,
    initialValues: {
      planWidget: 2,
      addDeviceWidget: 1,
      promoCodeWidget: '',
    },
  })
)(Setup)
