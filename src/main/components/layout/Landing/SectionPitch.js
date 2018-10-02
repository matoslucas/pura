import React from 'react'

import { Button } from '../../forms'
import InfoBox from '../../boxes/InfoBox'

const SectionPitch = data => (
  <section className="pura-section pitch">
    <div className="container">
      <InfoBox className="info-box--big features__info" {...data.info} />

      <ul className="pitch__list">
        {data.columns.map(properties => (
          <li className="pitch__list-item">
            <InfoBox className="pitch__list-item-container" {...properties} />
          </li>
        ))}
      </ul>

      <div className="pitch__action">
        <Button className="btn--secondary btn--shadow" {...data.button} />
      </div>
    </div>
  </section>
)

SectionPitch.defaultProps = {
  info: {
    heading: 'The First Month is ON US! Enjoy.',
    text:
      'Receive 2 FREE designer home fragrance vials with the purchase of your Pura dispenser. You get 2 fragrance vials every 30 days for just $9 a month.',
  },

  columns: [
    {
      icon: {
        type: 'touch',
      },
      text:
        "Choose 2 fragrances a month, if you don't love a scent we'll replace it for free.",
    },
    {
      icon: {
        type: 'delivery',
      },
      text: 'Get your fragrances delivered right to your door.',
    },
    {
      icon: {
        type: 'switch',
      },
      text:
        "Pura's smart, it recommends fragrances custom to you, Pick any fragrances you'd like!",
    },
    {
      icon: {
        type: 'cancel',
      },
      text: 'Cancel anytime, even if it does break our heart...',
    },
  ],

  button: {
    href: '/register',
    text: 'Join now',
  },
}

export default SectionPitch
