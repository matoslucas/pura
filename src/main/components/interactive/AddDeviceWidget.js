import React, { Component, PropTypes } from 'react'

import Icon from '../icons'
import Counter from './Counter'

import { formattMoney } from 'common/utils/Intl'

export default class AddDeviceWidget extends Component {
  static defaultProps = {
    className: '',
    planLabel: '',

    planCounter: {
      minCount: 0,
      maxCount: 100,
      showValue: false,
    },

    input: {
      value: 1
    },
  }

  static propTypes = {
    className: PropTypes.string,
    input: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    planCounter: PropTypes.object,
  }

  devicePrice = 79

  constructor(props) {
    super(props)

    const value = props.input.value
    this.state = {
      value,
      price: this.calculatePrice(value),
    }

    this.setNewPlan = this.setNewPlan.bind(this)
  }

  setNewPlan(value) {
    
    const price = this.calculatePrice(value)
  
        
    this.setState({
      value,
      price,
    })
    
    return this.props.input.onChange(value);
  }

  calculatePrice(value) {
    return (this.devicePrice * value)
  }

  
  render() {
    const {
      className,
      planCounter,
    } = this.props

    const { value, price, planLabel } = this.state


    return (
      <div className={`add-device-widget ${className}`}>
        <div className="add-device-widget__row add-device-widget__row--first">
          <div className="add-device-widget__column add-device-widget__label">
            <span className="add-device-widget__label-text">{value} Dispenser <br/> (One Time Purchase)</span>
          </div>
          <div className="add-device-widget__column add-device-widget__content">
            <Counter
              {...planCounter}
              className="counter--bold"
              count={value}
              onChange={(e)=>{ this.setNewPlan(e) }}
            />
          </div>
          <div className="add-device-widget__column add-device-widget__price">{formattMoney(price)}</div>
        </div>
      </div>
    )
  }
}
