import React from 'react'

const IconMail = (props) =>
  <object className={`inlineVector ${props.className}`}>
    <svg className="inlineVector__svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="16px" height="14px" viewBox="0 0 16 14">
      <g className="inlineVector__shape" fill={props.fill}>
        <path d="M12.629,2h-9.27l4.635,4.779L12.629,2z M14,12V3.471l-4.945,5.09
          c-0.282,0.282-0.664,0.44-1.062,0.44c-0.398,0-0.78-0.158-1.062-0.44L2,3.483V12H14z M13.993,14H2.007
          C0.902,13.999,0.005,13.105,0,12V2c0-0.531,0.212-1.041,0.588-1.417C0.965,0.208,1.476-0.002,2.007,0h11.986
          C15.098,0.001,15.995,0.895,16,2v10c0,0.531-0.212,1.041-0.588,1.417C15.035,13.792,14.524,14.002,13.993,14z"/>
      </g>
    </svg>
  </object>

IconMail.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
}

IconMail.defaultProps = {
  className: '',
  fill: '#BBBBBB',
}

export default IconMail
