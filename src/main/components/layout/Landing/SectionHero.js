import React, { Component, PropTypes } from 'react'

import Header from '../Header/Header'
import VideoModal from '../../misc/VideoModal'

import { Button } from '../../forms'
import ReactPlayer from 'react-player'

export default class SectionHero extends Component {
  static defaultProps = {
    header: {
      nav: [
        {
          className: 'header-nav__item-link--home-page',
          href: '/login',
          text: 'Login',
        },
        {
          className: 'header-nav__item-link--home-page',
          href: '/register',
          text: 'Join',
        },
      ],
    },

    heading: 'Smart. <br/> Home Fragrance.  <br/> Subscription.',

    more: {
      text: 'Learn more',
      icon: {
        className: 'hero__more-icon',
        type: 'arrow',
      },
    },
  }

  static propTypes = {
    header: PropTypes.object,
    heading: PropTypes.string,
    more: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      videoPlayer: {},
    }

    this.onPlayerReady = this.onPlayerReady.bind(this);
  }


  showModal = () => this.setState({ modalVisible: true })

  hideModal = () => this.setState({ modalVisible: false })

  onPlayerReady(event) {
  
    //  event.player.player.player.playVideo();

    //  this.setState({ videoPlayer: event.player.player.player })

    //  setTimeout(()=>{ 
    //       this.state.videoPlayer.playVideo();
    //   }, 3000);

  }


  render() {
    const { modalVisible } = this.state
    const { header, heading, more } = this.props

    return (
      <section className="pura-section hero">

        <ReactPlayer url='https://www.youtube.com/watch?v=exxdrC2MSHs&autoplay=1&mute=1&enablejsapi=1'
          config={{ playerVars: { autoplay: 1, mute: 1, enablejsapi: 1 } }}
          playing={true}
          loop={true}
          width='1920'
          height='1080'
          muted={true}
          onReady={this.onPlayerReady}
          className="hero__video" />



        <div className="hero__header">
          <Header {...header} />
        </div>

        <VideoModal
          channel="youtube"
          isOpen={modalVisible}
          videoId="I6Z_SrlchK0"
          onClose={this.hideModal}
        />

        <div className="container hero__container">
          <h1 className="hero__welcome">
            Smart.<br />
            Home Fragrance. <br />
            Subscription.
          </h1>

          <div className="hero__shim" />

          <div className="hero__text">
            <p className="hero__text1"> Only <span style={{ color: '#14af88', fontSize: 20 }}>$12/month</span> for two Fragrances.</p>

            <p className="hero__text2"> Free shipping with a one-time purchase of Smart Home Device for just $79</p>
          </div>

          <div className="hero__actions">
            <Button
              action="click"
              className="btn--outline-white btn--shadow-on-hover"
              icon={{ type: 'play' }}
              handleClick={this.showModal}
              text="Play Video"
            />
            <Button
              style={{ width: 170.34 }}
              className="btn--primary btn--shadow"
              href="/register"
              text="  Join now  "
            />
          </div>
        </div>
      </section>
    )
  }
}
