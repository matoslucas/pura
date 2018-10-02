import React from 'react'

const IconIntensity = (props) =>
  <object className={`inlineVector ${props.className}`}>
    <svg width="100px" height="80px" viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg" >
    <g id="Landing-page-(Dec-2017)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-961.000000, -1899.000000)">
        <rect id="Rectangle-8" stroke="#00CC99" stroke-width="2" x="962" y="1900" width="25" height="25" rx="8"></rect>
        <text x="970.446289" y="1917" id="3" fill="#00CC99">3</text>
        <circle id="Oval" fill="#00CC99" cx="975" cy="1939" r="8"></circle>
        <path d="M952.998879,1939.5 L1034,1939.5" id="Line-4" stroke="#00CC99" stroke-width="2"></path>
    </g>
 </svg>
  </object>

IconIntensity.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
}

IconIntensity.defaultProps = {
  className: '',
  fill: '#18CEA0',
}

export default IconIntensity
