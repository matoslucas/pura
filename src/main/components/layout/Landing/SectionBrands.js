import React, { Component } from 'react'

import InfoBox from '../../boxes/InfoBox'
import ProductCarousel from '../../interactive/ProductCarousel'

export default class SectionBrands extends Component {
  slides = [
    {
      id: 'brand1',
      image: require('main/assets/img/brand_logo/Calvin_klein_logo.png'),
    },
    {
      id: 'brand2',
      image: require('main/assets/img/brand_logo/Logo_Tommy_Hilfiger.png'),
    },
    {
      id: 'brand3',
      image: require('main/assets/img/brand_logo/Dior_logo.png'),
    },
    {
      id: 'brand4',
      image: require('main/assets/img/brand_logo/Ralph_Lauren_logo_black.png'),
    },
    {
      id: 'brand5',
      image: require('main/assets/img/brand_logo/tom-logo.png'),
    },
    {
      id: 'brand6',
      image: require('main/assets/img/brand_logo/michael_kors_logo.png'),
    },
    {
      id: 'brand7',
      image: require('main/assets/img/brand_logo/Dolce_and_Gabbana_logo.png'),
    },
  ]

  carouselOverrides = {
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          adaptiveHeight: false,
          centerMode: true,
          centerPadding: '80px',
          focusOnSelect: true,
          infinite: true,
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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

  render() {
    const info = {
      heading: 'From the Brands You Know and Trust',
      text: "<b>Perfumers from top brands now bring you Pura's designer home fragrance line.</b>"
    }

    return (
      <section className="pura-section brands">
        <div className="container">
          <InfoBox className="fragrance__info info-box--big" {...info} />

          <ProductCarousel
            slides={this.slides}
            settings={this.carouselOverrides}
          />
        </div>
      </section>
    )
  }
}
