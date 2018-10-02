import React from 'react'

const IconGoogle = (props) =>
<object className={`inlineVector ${props.className}`}>
<svg className="inlineVector__svg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="1 1 45 45" >
  <defs>
      <clipPath id="googleLogoPath001">
        <path d="m44.5,20l-20.5,0l0,8.5l11.8,0c-1.1,5.4 -5.7,8.5 -11.8,8.5c-7.2,0 -13,-5.8 -13,-13s5.8,-13 13,-13c3.1,0 5.9,1.1 8.1,2.9l6.4,-6.4c-3.9,-3.4 -8.9,-5.5 -14.5,-5.5c-12.2,0 -22,9.8 -22,22s9.8,22 22,22c11,0 21,-8 21,-22c0,-1.3 -0.2,-2.7 -0.5,-4z" id="a" />
      </clipPath>
    </defs>
    <g className="inlineVector__shape" fill={props.fill}>
      <title>Layer 1</title>
      <path id="svg_1" d="m0,37l0,-26l17,13l-17,13z" fill="#FBBC05" clipPath="url(#googleLogoPath001)" />
      <path id="svg_2" d="m0,11l17,13l7,-6.1l24,-3.9l0,-14l-48,0l0,11z" fill="#EA4335" clipPath="url(#googleLogoPath001)" />
      <path id="svg_3" d="m0,37l30,-23l7.9,1l10.1,-15l0,48l-48,0l0,-11z" fill="#34A853" clipPath="url(#googleLogoPath001)" />
      <path id="svg_4" d="m48,48l-31,-24l-4,-3l35,-10l0,37z" fill="#4285F4" clipPath="url(#googleLogoPath001)" />
    </g>
</svg>
</object>

IconGoogle.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
}

IconGoogle.defaultProps = {
  className: '',
  fill: '#FFFFFF',
}

export default IconGoogle
