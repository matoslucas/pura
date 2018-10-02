import React from 'react'

import { Button } from '../../forms'
import InfoBox from '../../boxes/InfoBox'

const SectionRegister = data => (
  <section className="pura-section register">
    <div className="container">
      <InfoBox className="register__info info-box--big" {...data.info} />
    </div>

    <div className="register__offer">
      <div className="register__offer-column">
        <ul className="register__offer-benefits">
          {data.offer.benefits.map(item =>
            <li className="register__offer-benefits-item">{item}</li>
          )}
        </ul>
      </div>

      <div className="register__offer-column">
        <div className="register__offer-price">{data.offer.price}</div>
      </div>
    </div>

    <div className="register__action">
      {data.action.map(item => <Button {...item} />)}

      <div className="register__action-info">{data.actionInfo}</div>
    </div>
  </section>
)

SectionRegister.defaultProps = {
  info: {
    heading: 'These are Not Your Ordinary Grocery Store Scents',
    text:
      "<b>We've taken the hassle out of picking scents. If you ever don't like a scent, we'll send you another one for free.</b>",
  },

  offer: {
    price: '$12 / month',

    benefits: ['30 day supply', 'Designer fragrance', 'Cancel anytime'],
  },

  action: [
    
    {
      className: 'btn--facebook btn--shadow',
      icon: {
        type: 'facebook',
      },
      href: '/register',
      text: 'Sign up with Facebook',
    },
    {
      className: 'btn--google btn--shadow',
      icon: {
        type: 'google',
      },
      href: '/register',
      text: 'Sign up with Google',
    },
    {
      className: 'btn--twitter btn--shadow',
      icon: {
        type: 'twitter',
      },
      href: '/register',
      text: 'Sign up with Twitter',
    },
  ],

  actionInfo: 'You’ve made it this far down, what are you waiting for?',
}

export default SectionRegister
