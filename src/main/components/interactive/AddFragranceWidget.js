import React, { Component, PropTypes } from 'react'

import Icon from '../icons'
import Counter from './Counter'

import { formattMoney } from 'common/utils/Intl'

export default class AddFragranceWidget extends Component {
  static defaultProps = {
    className: '',
    planLabel: '',

    planCounter: {
      minCount: 2,
      maxCount: 100,
      showValue: false,
    },

    input: {
      value: 2
    },
  }

  static propTypes = {
    className: PropTypes.string,
    input: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    planCounter: PropTypes.object,
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
    }

    this.setNewPlan = this.setNewPlan.bind(this)
  }

  setNewPlan(value) {
    
    const price = this.calculatePrice(value)
    const planLabel = this.constructLabel(value)
        
    this.setState({
      value,
      price,
      planLabel,
    })
    
    return this.props.input.onChange(value);
  }

  calculatePrice(value) {
    const additional = (value - this.baseMonthlyItems) * this.priceForAdditionalItem
    return (this.baseMonthlyPrice + additional);
  }

  constructLabel(value) {
    return `${value} Fragrances / Month`
  }

  render() {
    const {
      className,
      planCounter,
    } = this.props

    const { value, price, planLabel } = this.state


    return (
      <div className={`add-fragrance-widget ${className}`}>
        <div className="add-fragrance-widget__row add-fragrance-widget__row--first">
          <div className="add-fragrance-widget__column add-fragrance-widget__label">
            <span className="add-fragrance-widget__label-text">{planLabel}</span>
          </div>
          <div className="add-fragrance-widget__column add-fragrance-widget__content">
            <Counter
              {...planCounter}
              className="counter--bold"
              count={value}
              onChange={(e)=>{ this.setNewPlan(e) }}
            />
          </div>
          <div className="add-fragrance-widget__column add-fragrance-widget__price">{formattMoney(price)}</div>
        </div>
      </div>
    )
  }
}
