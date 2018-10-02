import React from 'react'

const IconOk = (props) =>
  <object className={`inlineVector ${props.className}`}>
    <svg className="inlineVector__svg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="13px" height="9px" viewBox="0 2 13 9">
      <g className="inlineVector__shape" fill={props.fill}>
        <path d="M5.06025903,10.5570459 L11.707532,3.72417902 C12.0974893,3.32911182 12.0974893,2.69061937 11.707532,2.29555217 C11.3165747,1.90148261 10.683644,1.90148261 10.2936866,2.29555217 L4.00037496,8.77225994 L1.70706329,6.29555217 C1.31710594,5.90148261 0.684175168,5.90148261 0.293217929,6.29555217 C-0.0977393098,6.69061937 -0.0977393098,7.32911182 0.293217929,7.72417902 L2.93949099,10.5570459 C3.22345993,10.8423722 3.59841892,11 4.00037496,11 C4.4013311,11 4.77828987,10.8423722 5.06025903,10.5570459 Z"/>
      </g>
    </svg>
  </object>


IconOk.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
}

IconOk.defaultProps = {
  className: '',
  fill: '#FFFFFF',
}

export default IconOk
