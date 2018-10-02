import React, { Component, PropTypes } from 'react'

import Icon from '../icons'
import Counter from './Counter'

export default class SummaryWidget extends Component {
  static defaultProps = {
    className: '',
    planLabel: '',

    shippingLabel: 'Shipping & handling',
    shippingPrice: 'FREE  ',

    totalLabel: 'Total',

    planCounter: {
      minCount: 2,
      maxCount: 100,
      showValue: false,
    },

    planCounter2: {
      minCount: 1,
      maxCount: 100,
      showValue: false,
    },

    input: {
      value: 2,
      QtyDevices: 1,
    },
  }

  static propTypes = {
    className: PropTypes.string,
    input: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    planCounter: PropTypes.object,
    planCounter2: PropTypes.object,
    shippingLabel: PropTypes.string,
    shippingPrice: PropTypes.string,
    totalLabel: PropTypes.string,
  }

  baseMonthlyItems = 2
  baseMonthlyPrice = 12
  priceForAdditionalItem = 4
  priceForAdditionalDevice = 79
  firstMonthDiscount = 12
  dispenserPrice = 79
  newSubscriberPromo = 0 // 30 to activate the discount
  tax = 0

  constructor(props) {
    super(props)

    const value = props.input.value
    const QtyDevices = 1;
    this.state = {
      value,
      QtyDevices,
      price: this.calculatePrice(value, QtyDevices),
      planLabel: this.constructLabel(value, QtyDevices),
      totalPrice: this.calculateTotalPrice(value, QtyDevices),
      subTotalPrice : this.caculateSubTotalPrice(value, QtyDevices),
      discount: this.calculateDiscount(value, QtyDevices),
    }

    this.setNewPlan = this.setNewPlan.bind(this)
  }

  setNewPlan(value, QtyDevices) {
    
    const price = this.calculatePrice(value, QtyDevices)
    const planLabel = this.constructLabel(value, QtyDevices)
    const totalPrice = this.calculateTotalPrice(value, QtyDevices)
    const subTotalPrice = this.caculateSubTotalPrice(value, QtyDevices)
    const discount = this.calculateDiscount(value, QtyDevices)
    
    this.setState({
      value,
      QtyDevices,
      price,
      planLabel,
      totalPrice,
      subTotalPrice,
      discount
    })
    
    return this.props.input.onChange(value);
  }

  calculatePrice(value, QtyDevices) {
    const additional =
      (value - this.baseMonthlyItems) * this.priceForAdditionalItem

    return `$${this.baseMonthlyPrice + additional}`
  }

  calculateTotalPrice(value , QtyDevices) {
    return this.caculateSubTotalPrice(value, QtyDevices) + this.tax;
  }

  caculateSubTotalPrice(value=2, QtyDevices=1) {
    const additional =  (value - this.baseMonthlyItems) * this.priceForAdditionalItem;
    const additionalDevices = QtyDevices * this.priceForAdditionalDevice;
    const discount = this.newSubscriberPromo * QtyDevices; 
    return this.baseMonthlyPrice + additional+ additionalDevices - this.firstMonthDiscount - discount;
  }

  calculateDiscount(value, QtyDevices) {
    return this.newSubscriberPromo * QtyDevices; 
  }

  constructLabel(value) {
    return `${value} Fragrances / Month`
  }

  render() {
    const {
      className,
      planCounter,
      planCounter2,
      shippingLabel,
      shippingPrice,
      totalLabel,
    } = this.props

    const { planLabel, value, QtyDevices, price, totalPrice, subTotalPrice, discount } = this.state


    return (
      <div className={`summary-widget ${className}`}>
        <div className="summary-widget__row summary-widget__row--first">
          <div className="summary-widget__column summary-widget__label">
            <span className="summary-widget__label-text">{planLabel}</span>
          </div>
          <div className="summary-widget__column summary-widget__content">
            <Counter
              {...planCounter}
              className="counter--bold"
              count={value}
              onChange={(e)=>{ this.setNewPlan(e, QtyDevices) }}
            />
          </div>
          <div className="summary-widget__column summary-widget__price">{price}</div>
        </div>

        <div className="summary-widget__row">
          <div className="summary-widget__column summary-widget__label">
            2 FREE fragrances
          </div>
          <div className="summary-widget__column summary-widget__price summary-widget__green">
            -${this.firstMonthDiscount}
          </div>
        </div>

        <div className="summary-widget__row">
          <div className="summary-widget__column summary-widget__label">
            {QtyDevices} Dispenser (One Time Fee)
          </div>
          <div className="summary-widget__column summary-widget__content">
            <Counter
              {...planCounter2}
              className="counter--bold"
              count={QtyDevices}
              onChange={(e)=>{ this.setNewPlan(value, e) }}
            />
          </div>
          <div className="summary-widget__column summary-widget__price">
            ${this.dispenserPrice * QtyDevices}
          </div>
        </div>

        {/*
        
        <div className="summary-widget__row">
          <div className="summary-widget__column summary-widget__label">
            New Subscriber Promo
          </div>
          <div className="summary-widget__column summary-widget__price summary-widget__green">
            -${discount}
          </div>
        </div>
        
        */}
        

        <div className="form__item  form__item--row">
          <fieldset className="separator ordersummary">
            <legend className="separator__container"></legend></fieldset>
        </div>

        <div className="summary-widget__row">
          <div className="summary-widget__column summary-widget__label">
            Sub Total
          </div>
          <div className="summary-widget__column summary-widget__price">
            ${subTotalPrice}
          </div>
        </div>

        <div className="form__item  form__item--row">
          <fieldset className="separator ordersummary">
            <legend className="separator__container"></legend></fieldset>
        </div>

        <div className="summary-widget__row">
          <div className="summary-widget__column summary-widget__label">
            Tax
          </div>
          <div className="summary-widget__column summary-widget__price">
            $0
          </div>
        </div>

        <div className="summary-widget__row">
          <div className="summary-widget__column summary-widget__label">
            {shippingLabel}
          </div>
          <div className="summary-widget__column summary-widget__price summary-widget__green">
            {shippingPrice}
          </div>
        </div>

        <div className="summary-widget__row summary-widget__row--total">
          <div className="summary-widget__column summary-widget__label">
            {totalLabel}
          </div>
          <div className="summary-widget__column summary-widget__price">
            ${totalPrice}
          </div>
        </div>
      </div>
    )
  }
}
