import React from 'react'

import { Button } from '../../forms'
import PuraLogo from '../../vectors/pura_logo'
import InfoBox from '../../boxes/InfoBox'
import FooterNav from '../../navigation/FooterNav'
// var FontAwesome = require('react-fontawesome');
import FontAwesome from 'react-fontawesome'
import ScrollToTop from 'react-scroll-up'

const now = new Date()
const Footer = data => (
  <footer className="pura-footer footer" role="contentinfo">
    <div className="container footer__panel">
      <div className="footer__left">
        <div className="footer__info">
          <div className="footer__info_logo">
            <PuraLogo
              className="footer__logo"
              iconFill={data.logoColor}
              fill={data.logoColor}
              height="30px"
            />
          </div>
          {data.infoText &&
            <InfoBox className="footer__info-text" text={data.infoText} />
          }
        </div>

        <div className="footer__navigation">
          <div className="footer__navigation-container">
            {data.footerMenu.map(items =>
              <FooterNav key={items.name} {...items} />
            )}
          </div>
        </div>
      </div>
      <div className="footer__right">
        <div className="footer__socialBox">
          {data.footerMenu.map(item =>
            item.socialLinks.map(socials => (
              <a href={socials.href} target="_blank">
                <FontAwesome
                  name={socials.name}
                  className={socials.className}
                />
              </a>
            ))
          )}
        </div>
      </div>
    </div>

    <div className="footer__credits">
      <div className="container">
        <div className="footer__credits-container">
          <div className="footer__credits-column footer__credits-column--left">
            <ScrollToTop
              showUnder={160}
              duration={1500}
              easing="easeOutCubic"
              style={data.topBtn}
            >
              <Button
                className="btn--link btn--link-white"
                {...data.credits.button}
              />
            </ScrollToTop>
          </div>
          <div className="footer__credits-column footer__credits-column--right">
            {data.credits.copyright}
          </div>
        </div>
      </div>
    </div>
  </footer>
)

Footer.defaultProps = {
  infoText: '',
  logoColor: '#fff',
  footerMenu: [
    {
      header: '',
      items: [
        // { text: 'About us', href: '#' },
        // { text: 'Services', href: '#' },
        // { text: 'Features', href: '#' },
        // { text: 'Pricing', href: '#' },
        {
          text: 'Tech Specs',
          href: 'http://help.trypura.com/faq/pura-device/tech-specs',
          target: '_blank',
        },
        {
          text: 'FAQs',
          href: 'http://help.trypura.com/faq',
          target: '_blank',
        },
        {
          text: 'Privacy Policy',
          href: 'http://help.trypura.com/legal/privacy-policy',
          target: '_blank',
        },
        {
          text: 'Terms of Service',
          href: 'http://help.trypura.com/legal/terms-of-service',
          target: '_blank',
        },
      ],
      socialLinks: [
        {
          name: 'twitter',
          className: 'footer__icon-small-twitter',
          href: 'https://twitter.com/purascents',
        },
        {
          name: 'instagram',
          className: 'footer__icon-small-instagram',
          href: 'https://www.instagram.com/purascents/',
        },
        {
          name: 'facebook',
          className: 'footer__icon-small-facebook',
          href: 'https://www.facebook.com/purascents/',
        },
        // {
        //   name: 'linkedin',
        //   className: 'footer__icon-small-linkedin',
        //   href: '#',
        // },
      ],
    },
  ],

  topBtn: {
    position: 'relative',
    bottom: 0,
    right: 0,
    cursor: 'pointer',
    transitionDuration: '2.0s',
    transitionTimingFunction: 'linear',
    transitionDelay: '0s',
  },
  credits: {
    copyright: `Pura © ${now.getFullYear()}. All rights reserved.`,

    button: {
      // href: '',
      icon: {
        type: 'arrow_alt',
        orientation: 'top',
      },
      text: 'Go to top',
    },
  },
}

export default Footer
