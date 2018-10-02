import React, { Component, PropTypes } from 'react'
import Icon from '../icons/'


export default class InfoBox extends Component {

  static propTypes = {
    className: PropTypes.string,
    heading: PropTypes.string,
    icon: PropTypes.object,
    smallText: PropTypes.string,
    text: PropTypes.string,
  }

  static defaultProps = {
    className: '',
    heading: '',
    icon: null,
    text: '',
    smallText: '',
  }

  constructor(props) {
    super(props);
  }

  createMarkup(value) {
    return { __html: value };
  }

  render() {
    const { className, icon, heading, text, smallText, ...rest } = this.props
    const shipNow = {
      action: 'click',
      text: 'Ship now',
    };
    return (
      <div {...rest} className={`info-box ${className}`}>
        {icon && <Icon className="info-box__icon" {...icon} />}
        {heading && <h4 className="info-box__heading" dangerouslySetInnerHTML={this.createMarkup(heading)} />}
        {text && <div className="info-box__text" style={{ fontWeight: 700, }} dangerouslySetInnerHTML={this.createMarkup(text)} />}
        {smallText && <div className="info-box__smallText">{smallText}</div>}
      </div>
    )
  }
}