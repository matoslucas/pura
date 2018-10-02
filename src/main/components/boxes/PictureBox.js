import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { Button } from '../forms'
import { isComingSoonType, isDeviceType } from '../../../common/utils/utils'

export default class PictureBox extends Component {

  static propTypes = {
    button: PropTypes.object,
    className: PropTypes.string,
    handle: PropTypes.string,
    heading: PropTypes.string,
    href: PropTypes.string,
    image: PropTypes.object,
    Type: PropTypes.string,
  }

  static defaultProps = {
    button: null,
    className: '',
    heading: '',
    handle: '',
    href: null,
    image: require('main/assets/img/products/product-placeholder.jpg'),
    type: 'Scent',
  }

  render() {

    return (<div className={`picture-box ${this.props.className}`}>
      <Link className="picture-box__container" to={this.props.href} id={this.props.handle}>
        <div className="picture-box__content">
          <div className="picture-box__heading">{isDeviceType(this.props.type) ? null : this.props.heading}</div>
          {this.props.button && (
            <div className="picture-box__action">
              <Button
                className="btn--secondary btn--shadow btn--icon"
                {...this.props.button}
              />
            </div>
          )}
        </div>
        {isDeviceType(this.props.type) ? null : <div className="picture-box__mask" />}

        <img src={this.props.image} className="picture-box__img" />
      </Link>

      {isComingSoonType(this.props.type) ? <div className="picture-box__banner">Coming Soon</div> : null}
    </div>
    )
  }
}