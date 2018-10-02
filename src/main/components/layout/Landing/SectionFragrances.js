import React, { Component } from 'react'

import { Element } from 'react-scroll'

import InfoBox from '../../boxes/InfoBox'
import { Button } from '../../forms'
import ProductCarousel from '../../interactive/ProductCarousel'

export default class SectionFragrances extends Component {
  slides = [
    {
      id: 'brand1',
      image: require('main/assets/img/fragrances_bottol/alpine_fern_vial.jpg'),
    },
    {
      id: 'brand2',
      image: require('main/assets/img/fragrances_bottol/apple_orchards_vial.jpg'),
    },
    {
      id: 'brand3',
      image: require('main/assets/img/fragrances_bottol/dragon_berry_vial.jpg'),
    },
    {
      id: 'brand4',
      image: require('main/assets/img/fragrances_bottol/green_tea_citrus_vial.jpg'),
    },
    {
      id: 'brand5',
      image: require('main/assets/img/fragrances_bottol/pacific_aqua_vial.jpg'),
    },
    {
      id: 'brand6',
      image: require('main/assets/img/fragrances_bottol/simply_lavender_vial.jpg'),
    },
    {
      id: 'brand7',
      image: require('main/assets/img/fragrances_bottol/Yuzu_citron_vial.jpg'),
    },
  ]

  carouselOverrides = {
    slidesToShow: 7,
    nextArrow: this.nextArrow,
    prevArrow: this.prevArrow,
    responsive: [
      {
        breakpoint: 400,
        settings: {
          adaptiveHeight: false,
          centerMode: true,
          centerPadding: '80px',
          focusOnSelect: true,
          infinite: true,
          nextArrow: this.nextArrowMobile,
          prevArrow: this.prevArrowMobile,
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          adaptiveHeight: false,
          centerMode: true,
          centerPadding: '100px',
          focusOnSelect: true,
          infinite: true,
          nextArrow: this.nextArrowMobile,
          prevArrow: this.prevArrowMobile,
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  }

  get nextArrow() {
    const icon = {
      type: 'more',
      orientation: 'right',
    }

    return (
      <div>
        <Button className="btn--icon icon-more" text="MORE" icon={icon} />
      </div>
    )
  }

  get nextArrowMobile() {
    return <div />
  }

  get prevArrow() {
    return <div />
  }

  get prevArrowMobile() {
    return <div />
  }

  render() {
    const info = {
      heading: 'The First Two Fragrances are ON US! Enjoy.',
      text: '<b>NEW fragrances added every month and you get to pick them.</b>',
    }

    const button = {
      href: '/register',
      text: 'Join now',
    }

    return (
      <Element name="fragrance">
        <section className="pura-section fragrance">
          <div className="container">
            <InfoBox className="fragrance__info info-box--big" {...info} />

            <ProductCarousel
              slides={this.slides}
              settings={this.carouselOverrides}
            />

            <div className="fragrance__action">
              <Button style={{ width: 170.34 }} className="btn--secondary btn--shadow" {...button} />
            </div>
          </div>
        </section>
      </Element>
    )
  }
}
