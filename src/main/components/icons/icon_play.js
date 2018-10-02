import React from 'react'

const IconPlay = (props) =>
  <object className={`inlineVector ${props.className}`}>
    <svg width="15px" height="18px" viewBox="0 0 15 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g className="inlineVector__shape" fill={props.fill}>
        <path d="M0,2.002 C0,0.448 1.6959,-0.512 3.029,0.288 L13.029,6.286 C14.3237,7.062 14.3237,8.938 13.029,9.714 L3.029,15.712 C1.6959,16.512 0,15.552 0,13.998 L0,2.002 Z" id="path-1" />
      </g>
    </svg>
  </object>

IconPlay.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
}

IconPlay.defaultProps = {
  className: '',
  fill: '#FFFFFF',
}

export default IconPlay



