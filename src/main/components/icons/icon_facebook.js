import React from 'react'

const IconFacebook = (props) =>
  <object className={`inlineVector ${props.className}`}>
    <svg className="inlineVector__svg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="9px" height="16px" viewBox="1045 612 9 16" >
      <g className="inlineVector__shape" fill={props.fill}>
        <path d="M1047.66767,628 L1047.66767,620.683049 L1045,620.683049 L1045,617.884215 L1047.66831,617.884215 L1047.66831,615.771762 C1047.66831,613.339442 1049.25605,612 1051.60553,612 C1052.73045,612 1053.71781,612.073303 1054,612.106622 L1054,614.685548 L1052.32869,614.685548 C1051.05078,614.685548 1050.81166,615.245314 1050.81166,616.071637 L1050.81166,617.884215 L1053.86951,617.884215 L1053.47225,620.683049 L1050.81166,620.683049 L1050.81166,628 L1047.66188,628 L1047.66767,628 Z" />
      </g>
    </svg>
  </object>

IconFacebook.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
}

IconFacebook.defaultProps = {
  className: '',
  fill: '#FFFFFF',
}

export default IconFacebook
