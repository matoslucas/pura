import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
// {props.link && <Link to={props.link.href} className="form__note-link" onClick={props.link.handleClick}>{props.link.text}</Link>}


export default class Note extends Component {
  static propTypes = {
    className: PropTypes.string,
    link: PropTypes.object,
    text: PropTypes.string,
  }

  static defaultProps = {
    className: 'form__note--right',
    text: '',
    link: null,
  }

  constructor(props) {
    super(props);
  }

  createMarkup(value) {
    return { __html: value };
  }

  render() {
    const { link } = this.props

    const renderInternalLink = link && !link.external
    const renderExternalLink = link && Boolean(link.external)

    return (
      <div className={`form__note ${this.props.className}`}>
        {this.props.text && <span className="form__note-text" dangerouslySetInnerHTML={this.createMarkup(this.props.text)} />}

        {renderInternalLink && (
          <Link
            className="form__note-link"
            onClick={link.handleClick}
            to={link.href}
          >
            {link.text}
          </Link>
        )}

        {renderExternalLink && (
          <a
            className="form__note-link"
            href={link.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {link.text}
          </a>
        )}

        {this.props.price && <span className="form__note-price">{this.props.price}</span>}
      </div>
    )
  }
}