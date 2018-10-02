import React, { Component, PropTypes } from 'react'

import Icon from '../icons/'

class Rating extends Component {
  static propTypes = {
    arrow: PropTypes.string,
    className: PropTypes.string,
    rating: PropTypes.number,
    rateProduct: PropTypes.func,
    text: PropTypes.string,
  }

  static defaultProps = {
    arrow: '',
    className: '',
    rating: 5,
    rateProduct: () => {},
    text: '',
  }


  renderStars(rating) {
    const ratingArr = []

    // Maximum rating is 5/5
    if (rating > 5) {
      rating = 5
    }

    // Assign star graphics to the rating value. Refactor with better algorithm?
    for (let i = 4; i > -1; i--) {
      const starValue = Math.round((rating - i) * 2) / 2

      let variant = ''

      if (starValue >= 1) variant = 'full'
      if (starValue === 0.5) variant = 'half'
      if (starValue < 0.5) variant = 'empty'

      ratingArr.unshift(
        <span className="rating__star-single" onClick={() => this.props.rateProduct(i + 1)}>
          <Icon
            type="star"
            variant={variant}
          />
        </span>
      )
    }

    return ratingArr
  }

  render() {
    const { arrow, className, rating, text } = this.props

    return (
      <div className={`rating ${className}`}>
        <div className="rating__stars">
          { this.renderStars(rating) }
        </div>

        <div className="rating__info">
          {text && <span className="rating__info-text">{text}</span>}
          {arrow && <Icon className="rating__info-icon" type="arrow" orientation={arrow} />}
        </div>
      </div>
    )
  }
}


export default Rating
