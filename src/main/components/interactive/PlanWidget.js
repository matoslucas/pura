import React, { Component, PropTypes } from 'react'

import Icon from '../icons'
import Counter from './Counter'

import { formattMoney } from 'common/utils/Intl'

export default class PlanWidget extends Component {
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

    input: {
      value: 2,
    },
  }

  static propTypes = {
    className: PropTypes.string,
    input: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    planCounter: PropTypes.object,
    shippingLabel: PropTypes.string,
    shippingPrice: PropTypes.string,
    totalLabel: PropTypes.string,
  }

  baseMonthlyItems = 2
  baseMonthlyPrice = 12
  priceForAdditionalItem = 4

  constructor(props) {
    super(props)

    const value = props.input.value

    this.state = {
      value,
      price: this.calculatePrice(value),
      planLabel: this.constructLabel(value),
      totalPrice: this.calculateTotalPrice(value),
    }

    this.setNewPlan = this.setNewPlan.bind(this)
  }

  setNewPlan = value => {
    const price = this.calculatePrice(value)
    const planLabel = this.constructLabel(value)
    const totalPrice = this.calculateTotalPrice(value)

    this.setState({
      value,
      price,
      planLabel,
      totalPrice,
    })
  
    return this.props.input.onChange(value)
  }

  calculatePrice(value) {
    const additional =
      (value - this.baseMonthlyItems) * this.priceForAdditionalItem

    return (this.baseMonthlyPrice + additional)
  }

  calculateTotalPrice(value) {
    return this.calculatePrice(value)
  }

  constructLabel(value) {
    return `x ${value} / mo`
  }

  render() {
    const {
      className,
      planCounter,
      shippingLabel,
      shippingPrice,
      totalLabel,
    } = this.props

    const { planLabel, value, price, totalPrice } = this.state

    return (
      <div className={`plan-widget ${className}`}>
        <div className="plan-widget__row plan-widget__row--first">
          <div className="plan-widget__column plan-widget__label">
            <Icon className="plan-widget__label-icon" type="vial" />
            <span className="plan-widget__label-text">{planLabel}</span>
          </div>
          <div className="plan-widget__column plan-widget__content">
            <Counter
              {...planCounter}
              className="counter--bold"
              count={value}
              onChange={this.setNewPlan}
            />
          </div>
          <div className="plan-widget__column plan-widget__price">{formattMoney(price)}</div>
        </div>

        <div className="plan-widget__row">
          <div className="plan-widget__column plan-widget__label">
            {shippingLabel}
          </div>
          <div className="plan-widget__column plan-widget__price plan-widget__green">
            {shippingPrice}
          </div>
        </div>

        <div className="plan-widget__row plan-widget__row--total">
          <div className="plan-widget__column plan-widget__label">
            {totalLabel}
          </div>
          <div className="plan-widget__column plan-widget__price">
            {formattMoney(totalPrice)}
          </div>
        </div>
      </div>
    )
  }
}
