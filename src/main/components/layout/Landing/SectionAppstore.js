import React from 'react'

import InfoBox from '../../boxes/InfoBox'

const SectionAppstore = data => (
  <section className="pura-section appstore">
    <div className="container">
      <div className="appstore__layout">
        <div className="appstore__column appstore__column--left">
          <InfoBox
            className="appstore__info info-box--big"
            heading={data.info.heading}
            text={data.info.text}
          />

          <div className="appstore__action">
            {data.info.actions.map(item => (
              <a
                key={item.id}
                href={item.href}
                className="appstore__action-button"
              >
                <img src={item.image} className="appstore__action-image" />
              </a>
            ))}
          </div>
        </div>

        <div className="appstore__column appstore__column--right">
          <img src={data.image} className="appstore__image" />
        </div>
      </div>
    </div>
  </section>
)

SectionAppstore.defaultProps = {
  info: {
    heading: 'Download the App',
    text:
      'The Pura Scents app offers complete control of the dispenser. Create schedules, choose night light color, and control scent intensity from your phone.',
    actions: [
      {
        id: 'appstore-apple',
        href:
          'https://itunes.apple.com/us/app/pura-smart-fragrance-dispenser/id1215372874?mt=8',
        image: require('main/assets/img/app-store-badges/apple.png'),
      },
      {
        id: 'appstore-google',
        href:
          'https://play.google.com/store/apps/details?id=com.purascents.android&hl=en',
        image: require('main/assets/img/app-store-badges/google.png'),
      },
    ],
  },
  image: require('main/assets/img/pura-phone-screen/pura-app.png'),
}

export default SectionAppstore
