/*
  !!!
  Do NOT put there any confidential info like tokens etc.,
  because this config file is visible in outputted bundle.js
  For that type of data use .env file instead
  !!!
*/

require('babel-polyfill')
const ip = require('ip')

const config = process => ({
  port: process.env.PORT,
  apiURL: process.env.API_HOST || 'https://purascents.herokuapp.com',
  host: process.env.HOST || ip.address(),
  apiHost: process.env.APIHOST || ip.address(),
  apiPort: process.env.APIPORT,
  openBrowserAfterBuild: false,
  app: {
    title: 'Pura',
    description: '---',
    head: {
      titleTemplate: 'Smart. Home Fragrance. Subscription.',
      meta: [
        { name: 'description', content: 'Only $12/month for two Fragrances. Always Free Shipping.' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'Pura' },
        { property: 'og:image', content: '/bg-mobile.jpg' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'Smart. Home Fragrance. Subscription.' },
        { property: 'og:description', content: 'Only $12/month for two Fragrances. Always Free Shipping.' },
        { property: 'og:card', content: '---' },
        { property: 'og:site', content: '---' },
        { property: 'og:creator', content: '---' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' },
      ],
    },
  },
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  },
  deviceId0: process.env.DEVICE_ID_0,
  StripePublishableKey:  process.env.STRIPE_PUBLISHABLE_KEY,
})

module.exports = typeof window !== 'undefined'
  ? window.__clientConfig
  : config(process)
