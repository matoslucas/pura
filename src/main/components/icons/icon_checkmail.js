import React from 'react'

const IconCheckmail = (props) =>
  <object className={`inlineVector ${props.className}`}>
    <svg className="inlineVector__svg" width="58px" height="49px" viewBox="0 0 58 49" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g className="inlineVector__shape" fill={props.fill} id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="check-email" transform="translate(-651.000000, -128.000000)" stroke="#18CEA0" stroke-width="2">
            <g id="Group-2" transform="translate(652.000000, 129.000000)">
                <circle id="Oval" cx="41.9375" cy="32.0625" r="14.0625"></circle>
                <polyline id="Shape" points="48.6875 28.125 39.3125 37.5 34.625 32.8125"></polyline>
                <path d="M21.09375,32.8125 L3.515625,32.8125 C1.575,32.8125 0,31.2351563 0,29.296875 L0,3.515625 C0,1.57265625 1.575,0 3.515625,0 L45.703125,0 C47.64375,0 49.21875,1.57265625 49.21875,3.515625 L49.21875,14.0625" id="Shape"></path>
                <polyline id="Shape" points="48.2554687 1.16015625 24.7078125 20.0226563 1.125 1.125"></polyline>
            </g>
        </g>
    </g>
</svg>
  </object>

IconCheckmail.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
}

IconCheckmail.defaultProps = {
  className: '',
  fill: '#17CEA0',
}

export default IconCheckmail
