import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom/server'
import serialize from 'serialize-javascript'
import Helmet from 'react-helmet'
import config from '../../config'

/* eslint-disable react/no-danger */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object,
  };


  cacheBuster(url) {
    return url + "?v=02";
  }


  render() {
    const { assets, component, store } = this.props
    const content = component ? ReactDOM.renderToString(component) : ''
    const head = Helmet.rewind();



    return (
      <html lang="en-us">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui" />
          <link rel="stylesheet" type="text/css" href="/dist/iconfont.css" />

          {/*
         
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
          <link rel="manifest" href="/android_manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ef0d33" />
          <meta name="theme-color" content="#111517" />
          
          */}

          <link rel="apple-touch-icon" sizes="57x57" href={this.cacheBuster("/apple-icon-57x57.png")} />
          <link rel="apple-touch-icon" sizes="60x60" href={this.cacheBuster("/apple-icon-60x60.png")} />
          <link rel="apple-touch-icon" sizes="72x72" href={this.cacheBuster("/apple-icon-72x72.png")} />
          <link rel="apple-touch-icon" sizes="76x76" href={this.cacheBuster("/apple-icon-76x76.png")} />
          <link rel="apple-touch-icon" sizes="114x114" href={this.cacheBuster("/apple-icon-114x114.png")} />
          <link rel="apple-touch-icon" sizes="120x120" href={this.cacheBuster("/apple-icon-120x120.png")} />
          <link rel="apple-touch-icon" sizes="144x144" href={this.cacheBuster("/apple-icon-144x144.png")} />
          <link rel="apple-touch-icon" sizes="152x152" href={this.cacheBuster("/apple-icon-152x152.png")} />
          <link rel="apple-touch-icon" sizes="180x180" href={this.cacheBuster("/apple-icon-180x180.png")} />

          <link rel="icon" type="image/png" sizes="192x192" href={this.cacheBuster("/android-icon-192x192.png")} />
          <link rel="icon" type="image/png" sizes="32x32" href={this.cacheBuster("/favicon-32x32.png")} />
          <link rel="icon" type="image/png" sizes="96x96" href={this.cacheBuster("/favicon-96x96.png")} />
          <link rel="icon" type="image/png" sizes="16x16" href={this.cacheBuster("/favicon-16x16.png")} />

          <link rel="manifest" href="/android_manifest.json" />

          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />

          <meta property="fb:app_id" content="1583339008349406" />
          <meta property="og:url" content="https://www.trypura.com/" />
          <meta property="og:title" content="Smart. Home Fragrance. Subscription." />
          <meta property="og:type" content="product" />
          <meta property="og:description" content="Only $12/month for two Fragrances. Always Free Shipping." />
          <meta property="og:image" content={this.cacheBuster("/bg-mobile.jpg")} />



          {Object.keys(assets.styles).map((style, key) =>
            <link
              href={assets.styles[style]}
              key={key}
              media="screen, projection"
              rel="stylesheet" type="text/css" charSet="UTF-8"
            />
          )}
          {/* Google Tag Manager 
          <script
            async
            src="https://www.googletagmanager.com/gtm.js?id=GTM-KP96DD9"
          />
           {/* End Google Tag Manager */}
         
        </head>
        <body>

          <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
          <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }} charSet="UTF-8" />
          <script dangerouslySetInnerHTML={{ __html: `window.__clientConfig=${serialize(config)};` }} charSet="UTF-8" />
          <script src={assets.javascript.main} charSet="UTF-8" />

         

        </body>
      </html>
    )
  }
}
/* eslint-enable react/no-danger */
