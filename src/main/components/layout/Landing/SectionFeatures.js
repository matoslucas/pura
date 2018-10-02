import React from 'react'
import classnames from 'classnames'

import Slider from 'react-slick'
import { Button } from '../../forms'

import InfoBox from '../../boxes/InfoBox'
import Icon from '../../icons'

const data = {
  info: {
    heading: 'All Controlled with a Smart Dispenser',
    text: 'Hover over each feature to learn more',
  },

  features: {
    vials: {
      icon: {
        type: 'vials',
      },
      heading: 'Holds 2 Separate Fragrances',
      text:
        'Separately control 2 fragrances and swap between them as you please. Never get tired of a scent.',
    },
    adjust: {
      icon: {
        type: 'adjust',
      },
      heading: 'Adjust the Scent Intensity',
      text:
        "Precise control of your scent intensity, whether it's a small bathroom or a large living room.",
    },
    light: {
      icon: {
        type: 'night',
      },
      heading: 'Add Some Light to Your Night',
      text:
        'The Pura dispenser comes equipped with a nightlight. You control the color and brightness.',
    },
    control: {
      icon: {
        type: 'wifi',
      },
      heading: 'Full Control from Anywhere',
      text:
        "You'll never have to worry about how your place smells, even if you're not home to freshen it up.",
    },
  },

  button: {
    href: '/register',
    text: 'Join now',
  },
}

export default class SectionFeatures extends React.Component {
  state = { activeSlideIndex: 0 }

  get nextArrow() {
    const classes = classnames('slide-arrow slide-arrow__next')

    return (
      <div>
        <p className={classes}>next</p>
      </div>
    )
  }

  get prevArrow() {
    const classes = classnames('slide-arrow slide-arrow__prev')

    return (
      <div>
        <p className={classes}>prev</p>
      </div>
    )
  }

  handleIndexChange = nextIndex => {
    this.setState({ activeSlideIndex: nextIndex })
  }

  render() {
    const settings = {
      dots: true,
      nextArrow: this.nextArrow,
      prevArrow: this.prevArrow,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 300,
    }

    return (
      <div className="pura-section features">
        <Slider {...settings} afterChange={this.handleIndexChange}>
          {Object.keys(data.features).map(name => {
            const feature = data.features[name]
            const key = `feature--${name}`

            const isInverted = true // ['light', 'control', 'adjust'].includes(name)
            const iconFill = isInverted ? '#FFF' : '#363636'

            const classes = classnames('feature', key, {
              'feature--inverted': isInverted,
            })

            return (
              <div className={classes} key={key}>
                <InfoBox
                  className="info-box--big feature__info"
                  heading={feature.heading}
                />

                <div className="feature__content">
                  <div className="feature__shim" />
                  <div className="feature__image" />

                  <div className="feature__copy">
                    <Icon
                      className="feature__icon"
                      {...feature.icon}
                      fill={iconFill}
                    />

                    <div className="feature__text">
                      <p>{feature.text}</p>
                    </div>

                    <div className="feature__actions">
                      <Button
                        style={{ width: 170.34 }}
                        className="btn--primary btn--shadow"
                        href="/register"
                        text="Join now"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }
}