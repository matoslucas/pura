import React from 'react'

const IconMore = (props) =>
  <object className={`inlineVector ${props.className}`}>
    <svg className="inlineVector__svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
      <g className="inlineVector__shape" fill={props.fill}>
        <path d="M10.5,5.7826087 L10.5,16.2173913 C10.5,16.4935337 10.7238576,16.7173913 11,16.7173913 C11.2761424,16.7173913 11.5,16.4935337 11.5,16.2173913 L11.5,5.7826087 C11.5,5.50646632 11.2761424,5.2826087 11,5.2826087 C10.7238576,5.2826087 10.5,5.50646632 10.5,5.7826087 Z" />
        <path d="M16.2173913,10.5 L5.7826087,10.5 C5.50646632,10.5 5.2826087,10.7238576 5.2826087,11 C5.2826087,11.2761424 5.50646632,11.5 5.7826087,11.5 L16.2173913,11.5 C16.4935337,11.5 16.7173913,11.2761424 16.7173913,11 C16.7173913,10.7238576 16.4935337,10.5 16.2173913,10.5 Z" />
      </g>
    </svg>
  </object>

IconMore.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
}

IconMore.defaultProps = {
  className: '',
  fill: '#8a8a8a',
}

export default IconMore
