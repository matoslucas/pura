import React, { Component, PropTypes } from 'react'

class Counter extends Component {
  static propTypes = {
    className: PropTypes.string,
    count: PropTypes.number,
    maxCount: PropTypes.number,
    minCount: PropTypes.number,
    onChange: PropTypes.func,
    text: PropTypes.string,
  }

  static defaultProps = {
    className: '',
    count: 1,
    onChange: () => {},
    maxCount: null,
    minCount: 1,
    showValue: true,
    text: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      count: props.count,
    }

    this.countUp = this.countUp.bind(this)
    this.countDown = this.countDown.bind(this)
  }

  setCount(count) {
    this.setState({ count })

    this.props.onChange(count)
  }

  countUp() {
    const maxCount = this.props.maxCount
    let newCount = this.state.count

    if (newCount++ > maxCount - 1 && maxCount !== null) { newCount = maxCount }

    this.setCount(newCount)
  }

  countDown() {
    const minCount = this.props.minCount
    let newCount = this.state.count

    if (newCount-- < minCount + 1) { newCount = minCount }

    this.setCount(newCount)
  }


  render() {
    const { className, showValue, text } = this.props
    const { count } = this.state

    return (
      <div className={`counter ${className}`}>
        <a className="counter__btn counter__btn--negative" onClick={this.countDown}>-</a>
        {showValue && <span className="counter__count">{count}{text}</span>}
        <a className="counter__btn counter__btn--positive" onClick={this.countUp}>+</a>
      </div>
    )
  }
}

export default Counter
