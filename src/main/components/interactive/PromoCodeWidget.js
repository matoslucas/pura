import React, { Component, PropTypes } from 'react'

import Icon from '../icons'
import Counter from './Counter'

export default class PromoCodeWidget extends Component {
  static defaultProps = {
    className: '',
    planLabel: '',

    input: {
      value: ''
    },
  }

  static propTypes = {
    className: PropTypes.string,
    input: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  }


  constructor(props) {
    super(props)
    const value = props.input.value;
    this.state = {
      promoCode: ''
    }

    this.updateValue = this.updateValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  updateValue() {
    this.props.input.onChange(this.state.promoCode);
    this.setState({ promoCode: '' });
  }

  handleChange(event) {
    this.setState({ promoCode: event.target.value });
  }

  render() {
    const {
      className,
      planCounter,
    } = this.props

    const { promoCode } = this.state
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 90,
      }}>
        <div
          className="form__input-wrapper"
          style={{
            background: '#f8f8f8',
            border: '1px solid #e3e3e3',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            textAlign: 'left',
            paddingLeft: 5,
            boxShadow: '0 0 black',
            fontSize: 15,
          }}>
          <input
            style={{
              fontSize: 15,
            }}
            type="text"
            className="form__input-element"
            placeholder=""
            onChange={this.handleChange}
            value={this.state.promoCode} />
        </div>
        <div>
          {/*<span className="form__label-text">Address</span>*/}
          <input type="Button"
            className="form__label-text"
            style={{
              width: 120,
              height: 40,
              border: 'solid 0.5px #e3e3e3',
              padding: '12px 5px 12px 5px',
              margin: 0,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.16)',
            }}
            value="Redeem" onClick={(e) => { this.updateValue() }} />
        </div>
      </div>
    )
  }
}
