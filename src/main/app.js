import { get } from 'lodash'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { push } from 'react-router-redux'

import Intercom from 'react-intercom'

import config from '../config'
import { asyncConnect } from 'redux-connect'
import { Footer } from 'main/components/layout'
import authLayer from './containers/HOC/AuthLayer'


import flow from 'lodash/flow'
import TagManager from 'react-gtm-module'


/*
@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const promises = []

      // if (!isAuthLoaded(getState())) {
      //   promises.push(dispatch(loadAuth()))
      // }

      return Promise.all(promises)
    },
  },
])
@connect(
  state => {
    const firstName = get(state, 'user.data.first_name', '')
    const lastName = get(state, 'user.data.lastname', '')
    const displayName = `${firstName} ${lastName}`

    return {
      notification: state.appState.notification,
      locale: state.appState.locale,
      // NOTE: additional user details for pura
      userDetails: {
        user_id: get(state, 'auth.user.uid'),
        email: get(state, 'auth.user.email'),
        name: displayName,
      },
    }
  },
  {
    pushState: push,
  }
)*/
class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    getToken: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      locale: 'en',
    }

  }

  componentDidMount() {

    /* 
    *  Global site tag (gtag.js) - Google Analytics
    *  

    if (typeof window == 'undefined') {
      return;
    }
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'UA-66715103-1');

    console.info('GA code UA-66715103-1 line 94');

    
    ReactGA.initialize('UA-66715103-1');
    ReactGA.pageview(window.location.pathname + window.location.search);

   
    */

    const page = window.location.pathname == "/"?'/home': window.location.pathname

    const tagManagerArgs = {
      gtmId: 'GTM-KP96DD9',
      dataLayer: {
        page: page +  window.location.search
      },
    }

    TagManager.initialize(tagManagerArgs)
    console.info('GA ', page,  window.location.search);

    /**
     * Add HubSpot script
     */

    const script = document.createElement("script");

    script.id = 'hs-script-loader';
    script.async = true;
    script.src = "//js.hs-scripts.com/4813713.js";

    document.body.appendChild(script);

  }


  render() {

    const { location: { pathname }, userDetails } = this.props

    return (
      <div className="page__wrapper">
        <div className="pura-web">

          <Helmet {...config.app.head} />
          {this.props.children}
          <Footer key="my_footer" />
        </div>
        {/*
        <Notification
          notification={notification}
          dispatch={this.props.dispatch}
        />
        */}


        {__INTERCOM_APP_ID__ &&
          <Intercom appID={__INTERCOM_APP_ID__} {...userDetails} />
        }

      </div>

    )
  }
}

//export default authLayer(App)

export default flow(
  asyncConnect([
    {
      promise: ({ store: { dispatch, getState } }) => {
        const promises = []

        // if (!isAuthLoaded(getState())) {
        //   promises.push(dispatch(loadAuth()))
        // }

        return Promise.all(promises)
      },
    },
  ]),
  connect(state => {
    const firstName = get(state, 'user.data.first_name', '')
    const lastName = get(state, 'user.data.lastname', '')
    const displayName = `${firstName} ${lastName}`

    return {
      locale: state.appState.locale,
      // NOTE: additional user details for pura
      userDetails: {
        user_id: get(state, 'auth.user.uid'),
        email: get(state, 'auth.user.email'),
        name: displayName,
      },
    }
  },
    {
      pushState: push,
    }),
  authLayer
)(App);
