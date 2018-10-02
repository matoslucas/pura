import React from 'react'

const IconDelivery = (props) =>
  <object className={`inlineVector ${props.className}`}>
    <svg className="inlineVector__svg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16">
      <g className="inlineVector__shape" fill={props.fill}>
        <path d="M15.707,14.273l-3.082-3.08c0.872-1.168,1.388-2.617,1.388-4.187C14.013,3.137,10.876,0,7.007,0C3.137,0,0,3.137,0,7.007
          s3.137,7.008,7.007,7.008c1.575,0,3.029-0.521,4.199-1.397l3.089,3.086c0.391,0.396,1.021,0.396,1.412,0
          C16.098,15.309,16.098,14.669,15.707,14.273z M7.007,12.012c-2.764,0-5.005-2.24-5.005-5.005c0-2.764,2.241-5.005,5.005-5.005
          c2.764,0,5.004,2.241,5.004,5.005C12.011,9.771,9.771,12.012,7.007,12.012z"/>
      </g>
    </svg>
  </object>

IconDelivery.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
}

IconDelivery.defaultProps = {
  className: '',
  fill: '#FFFFFF',
}

export default IconDelivery
