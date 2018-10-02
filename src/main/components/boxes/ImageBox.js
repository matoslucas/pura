import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import Dropzone from 'react-dropzone'

import { connect } from 'react-redux'
import { uploadAvatar } from 'main/redux/modules/user'

@connect(null, { uploadAvatar })
export default class ImageBox extends Component {
  static defaultProps = {
    fallbackAvatar: require('main/assets/img/user.svg'),
    image: null,
  }

  static propTypes = {
    fallbackAvatar: PropTypes.string,
    image: PropTypes.string,
    uploadAvatar: PropTypes.func.isRequired,
    uploadComplete: PropTypes.func.isRequired,
  }

  handleFileDrop = files => {
    const avatarFile = files[0]
    this.props.uploadAvatar(avatarFile).then(this.props.uploadComplete)
  }

  render() {
    const { fallbackAvatar, image } = this.props

    const avatarClasses = classnames('image-box__avatar', {
      'image-box__avatar--cropped': Boolean(image),
    })

    return (
      <Dropzone
        className="image-box"
        activeClassName="image-box--drag-active"
        onDrop={this.handleFileDrop}
        style={{}}
        multiple={false}
        accept="image/jpeg, image/png"
      >
        <div className={avatarClasses}>
          <img src={image || fallbackAvatar} />
        </div>

        <div className="image-box__secondary">
          <button>Upload Image</button>
        </div>
      </Dropzone>
    )
  }
}
