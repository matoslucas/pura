import React, { Component } from 'react'
import classnames from 'classnames'
import Slider from 'react-slick'

class CarouselLanding extends Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  static defaultProps = {
    controls: {},
    data: {},
    settings: {},
  }

  state = { activeSlideIndex: 0 }
  invertedIndexes = [1, 2, 3, 4, 6]

  handleIndexChange = nextIndex => {
    this.setState({ activeSlideIndex: nextIndex })
  }

  renderLeftButton() {
    const { activeSlideIndex } = this.state

    const classes = classnames('slide-arrow slide-arrow__prev', {
      'slide-arrow--inverted': this.invertedIndexes.includes(activeSlideIndex),
    })

    return (
      <div>
        <p className={classes}>prev</p>
      </div>
    )
  }

  renderRightButton() {
    const { activeSlideIndex } = this.state

    const classes = classnames('slide-arrow slide-arrow__next', {
      'slide-arrow--inverted': this.invertedIndexes.includes(activeSlideIndex),
    })

    return (
      <div>
        <p className={classes}>next</p>
      </div>
    )
  }

  buildFilePath = (imagesPath, imagesKey, imagesWidth) => {
    const filePath = `${imagesKey}/${imagesKey}_c_scale,w_${imagesWidth}.jpg`

    // Literal path in string must be supplied, for proper WebPack compile
    return require('main/assets/img/home-lifestyle-slider/' + filePath)
  }

  constructSrcSet = (imagesPath, imagesKey, imagesSizes) => (
    imagesSizes
      .map(srcWidth => `${this.buildFilePath(imagesPath, imagesKey, srcWidth)} ${srcWidth}w`)
      .join(', ')
  )

  render() {
    const { data } = this.props

    const settings = {
      dots: true,
      slidesToShow: 1,
      prevArrow: this.renderLeftButton(),
      nextArrow: this.renderRightButton(),
    }

    return (
      <Slider
        className="carousel__slider"
        {...settings}
        afterChange={this.handleIndexChange}
      >
        {data.slides.map(item => {
          const { imagesPath, imagesKey, imagesSizes } = item
          const biggestSize = imagesSizes[imagesSizes.length - 1]

          return (
            <div key={item.id} className="carousel__item">
              <picture>
                <img
                  className="carousel__image"
                  sizes={`(max-width: ${biggestSize}px) 100vw, ${biggestSize}px`}
                  srcSet={this.constructSrcSet(imagesPath, imagesKey, imagesSizes)}
                  src={this.buildFilePath(imagesPath, imagesKey, biggestSize)}
                  alt={imagesKey}
                />
              </picture>
            </div>
          )
        }
      )}
      </Slider>
    )
  }
}

export default CarouselLanding
