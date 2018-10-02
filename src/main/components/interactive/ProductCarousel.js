import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import Slider from 'react-slick'

export default class ProductCarousel extends Component {
  static defaultProps = {
    className: '',
    settings: {},
  }

  static propTypes = {
    className: PropTypes.string,
    settings: PropTypes.object,
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      })
    ).isRequired,
  }

  defaults = {
    dots: false,
    slidesToShow: 6,
    autoplay: false,
    arrows: true,
    swipe: true,
    nextArrow: this.nextArrow,
    prevArrow: this.prevArrow,
  }

  get nextArrow() {
    return (
      <div>
        <p className="slide-arrow slide-arrow__next">next</p>
      </div>
    )
  }

  get prevArrow() {
    return (
      <div>
        <p className="slide-arrow slide-arrow__prev">prev</p>
      </div>
    )
  }

  render() {
    const { className, settings, slides, ...rest } = this.props
    const classes = classnames('product-carousel', className)

    return (
      <div className={classes} {...rest}>
        <Slider {...this.defaults} {...settings}>
          {slides.map(item => (
            <div className="product-carousel__item" key={item.id}>
              <img className="product-carousel__image" src={item.image} />
            </div>
          ))}
        </Slider>
      </div>
    )
  }
}
