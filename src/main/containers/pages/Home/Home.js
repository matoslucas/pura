import React, { Component, PropTypes } from 'react'

import SectionHero from '../../../components/layout/Landing/SectionHero'
import SectionFragrances from '../../../components/layout/Landing/SectionFragrances'
import SectionFeatures from '../../../components/layout/Landing/SectionFeatures'
import SectionCarousel from '../../../components/layout/Landing/SectionCarousel'
import SectionAppstore from '../../../components/layout/Landing/SectionAppstore'
import SectionBrands from '../../../components/layout/Landing/SectionBrands'
import SectionRegister from '../../../components/layout/Landing/SectionRegister'

import TopBanner from '../../../components/layout/Header/TopBanner'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'

class Home extends Component {
  
  constructor(props) {
    super(props);

  }

  componentDidMount(){
       
    if (localStorage.getItem('firebaseUserId')) {
      // redirect to /shop
      this.props.router.push('/shop')
    }
  }

  render() {
    return (<div className="pura-web__container">
      <TopBanner />
      <SectionHero />
      <SectionFragrances />
      <SectionFeatures />
      <SectionBrands />
      <SectionCarousel />
      <SectionAppstore />
      <SectionRegister />
    </div>);
  }

}

export default connect(
  state => ({
    pushState: push,
  }),
  {  }
)(Home)
