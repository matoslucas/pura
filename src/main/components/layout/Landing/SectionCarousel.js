import React from 'react'

import CarouselLanding from '../../interactive/CarouselLanding'

const SectionCarousel = data => (
  <section className="pura-section carousel">
    <div className="carousel__container">
      <CarouselLanding data={data.carousel} />
    </div>
  </section>
)

SectionCarousel.defaultProps = {
  carousel: {
    controls: {
      left: {
        text: '',
        icon: {
          type: 'arrow',
          orientation: 'left',
        },
      },
      right: {
        text: '',
        icon: {
          type: 'arrow',
          orientation: 'right',
        },
      },
    },

    slides: [
      {
        id: 'slide5',
        image: require('main/assets/img/home-lifestyle-slider/slide5.jpg'),
        imagesPath: 'main/assets/img/home-lifestyle-slider',
        imagesKey: 'slide5_dompya',
        imagesSizes: [320, 682, 943, 1153, 1334, 1517, 1666, 1778, 1800],
      },
      {
        id: 'slide1',
        image: require('main/assets/img/home-lifestyle-slider/slide1.jpg'),
        imagesPath: 'main/assets/img/home-lifestyle-slider',
        imagesKey: 'slide1_kpyo4d',
        imagesSizes: [320, 814, 1142, 1446, 1723, 1800],
      },
      {
        id: 'slide2',
        image: require('main/assets/img/home-lifestyle-slider/slide2.jpg'),
        imagesPath: 'main/assets/img/home-lifestyle-slider',
        imagesKey: 'slide2_o9bmds',
        imagesSizes: [320, 746, 1063, 1292, 1504, 1717, 1800],
      },
      {
        id: 'slide3',
        image: require('main/assets/img/home-lifestyle-slider/slide3.jpg'),
        imagesPath: 'main/assets/img/home-lifestyle-slider',
        imagesKey: 'slide3_o9qdl6',
        imagesSizes: [320, 1100, 1620, 1800],
      },
      {
        id: 'slide4',
        image: require('main/assets/img/home-lifestyle-slider/slide4.jpg'),
        imagesPath: 'main/assets/img/home-lifestyle-slider',
        imagesKey: 'slide4_ifxz3f',
        imagesSizes: [320, 650, 882, 1112, 1303, 1485, 1656, 1779, 1800],
      },
      {
        id: 'slide6',
        image: require('main/assets/img/home-lifestyle-slider/slide6.jpg'),
        imagesPath: 'main/assets/img/home-lifestyle-slider',
        imagesKey: 'slide6_g8kshg',
        imagesSizes: [320, 654, 893, 1110, 1284, 1434, 1597, 1745, 1800],
      },
      {
        id: 'slide7',
        image: require('main/assets/img/home-lifestyle-slider/slide7.jpg'),
        imagesPath: 'main/assets/img/home-lifestyle-slider',
        imagesKey: 'slide7_fmbgck',
        imagesSizes: [320, 780, 1122, 1362, 1590, 1774, 1800],
      },
    ],
  },
}

export default SectionCarousel
