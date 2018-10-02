import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Loading from '../../components/misc/Loading'

import { firebaseAuth } from 'common/helpers/FirebaseClient'
import {
  getToken,
  getFirebaseUser,
  removeFirebaseUser,
} from 'main/redux/modules/auth'

export default function authLayer(WrappedComponent) {
  class AuthConnect extends Component {
    static propTypes = {
      auth: PropTypes.object,
      getFirebaseUser: PropTypes.func.isRequired,
      getToken: PropTypes.func.isRequired,
      removeFirebaseUser: PropTypes.func.isRequired,
      routeProps: PropTypes.object,
    }

    static defaultProps = {
      auth: {},
      routeProps: {},
    }

    constructor(props) {
      super(props)

      this.state = {
        authed: false,
        loading: true,
        mounted: false,
        requireAuth: false,
      }
    }

    // ********* REACT LIFE CYCLE METHODS *********
    // Check for page auth requirements
    componentWillMount() {
      if (this.props.routeProps) {
        this.setState({
          requireAuth: this.props.routeProps.requireAuth,
        })
      }
    }

    // Add Firebase listener
    componentDidMount() {
      this.removeFirebaseListener = firebaseAuth.onAuthStateChanged(user => {
        if (user) {
          this.setFirebaseUser(user)
        } else {
          this.props.removeFirebaseUser()
          // this.setState({ loading: false })
        }
      })
    }

    // Auth Redux state listener
    componentWillReceiveProps(nextProps) {
      // Check for requireAuth change
      if (this.props.routeProps !== nextProps.routeProps) {
        this.setState({
          requireAuth: nextProps.routeProps.requireAuth,
        })
      }

      // Check for Auth change
      if (this.props.auth !== nextProps.auth) {
        this.setState({
          authed: nextProps.auth.loaded,
          loading: nextProps.auth.loading,
        })
      }
    }

    // Remove Firebase listener
    componentWillUnmount() {
      this.removeFirebaseListener()
    }

    // ********* AUTH LAYER PRIVATE METHODS *********
    // Get Firebase user auth & set Redux state accordingly
    setFirebaseUser(user) {
      if(user){
        localStorage.setItem("firebaseUserId", user.uid);
      }
      
      return this.props.getToken().then(() => {
        // update Firebase user id if is saved on localstore
        if (!localStorage.getItem('firebaseUserId')) {
          this.props.getFirebaseUser(user.uid)
        } else {
          this.props.getFirebaseUser(localStorage.getItem('firebaseUserId'))
        }
      })
    }

    // Main crossroad switch
    enforceAuth() {
      const { authed, loading, requireAuth } = this.state

      const user = this.props.auth.user || false

      // DEBUG
      // console.log(this.state)

      if (!authed && loading) {
        return <Loading />
      }

      // Redirect logged out user to login page, if required page requires authorisation
      if (requireAuth && !authed) {
        return this.rejectAuth()
      }

      // Redirect logged in user to the setup page, if he didn't finish the account creation
      if (user) {
        if (!user.shopify_acc_ready || !user.stripe_card_set) {
          if (this.props.location.pathname !== '/setup' && requireAuth) {
            console.log('User account setup not finished!')
            this.props.router.push('/setup')
            return false
          }
        }
      }

      return <WrappedComponent {...this.state} {...this.props} />
    }

    rejectAuth() {
      console.log('Unauthorized access, redirecting to login')
      this.props.router.push('/login')
      return false
    }

    // ********* RENDER *********
    render() {
      return this.enforceAuth()
    }
  }

  return connect(
    state => ({
      auth: state.auth,
    }),
    {
      getFirebaseUser,
      getToken,
      pushState: push,
      removeFirebaseUser,
    }
  )(AuthConnect)
}
