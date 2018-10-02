import React from 'react'

const IconHeart = (props) =>
  <object className={`inlineVector ${props.className}`}>
    <svg className="inlineVector__svg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 -1 16 15">
      <g className="inlineVector__shape" stroke={props.stroke} strokeWidth="2" fill={props.fill}>
        <path d="M13.1482522,2.84301208 C12.0133902,1.72151264 10.1689395,1.71765498 9.03372461,2.83950321 L8.00065435,3.86040946 L6.9675841,2.83950321 C5.83948395,1.724686 3.9902324,1.71922596 2.85305648,2.84301208 C2.24860288,3.44034847 1.96498777,4.2366159 2.00344412,5.01995657 C1.96498776,7.99975312 7.66711426,13.0047607 8.00065435,12.9995474 C8.33419445,12.994334 14.0338848,7.99975312 13.9961656,5.01700428 C14.0338845,4.23530591 13.7522519,3.43989991 13.1482522,2.84301208 Z" />
      </g>
    </svg>
  </object>

IconHeart.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
  stroke: React.PropTypes.string,
}

IconHeart.defaultProps = {
  className: '',
  fill: 'transparent',
  stroke: '#BBBBBB',
}

export default IconHeart
