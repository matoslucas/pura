import React from 'react'

const IconBurger = (props) =>
  <object className={`inlineVector ${props.className}`}>
    <svg className="inlineVector__svg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="16px" viewBox="0 0 15 13">
      <g className="inlineVector__shape" fill={props.fill}>
        <polygon points="15 0 0 0 0 1 15 1"/>
        <polygon points="15 4 0 4 0 5 15 5"/>
        <polygon points="15 8 0 8 0 9 15 9"/>
        <polygon points="15 12 0 12 0 13 15 13"/>
      </g>
    </svg>
  </object>

IconBurger.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
}

IconBurger.defaultProps = {
  className: '',
  fill: '#555555',
}

export default IconBurger
