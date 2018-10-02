import React, { PropTypes } from 'react'

const IconWifi = props => (
  <object className={`inlineVector ${props.className}`}>
    <svg
      className="inlineVector__svg"
      width="71px"
      height="56px"
      viewBox="0 0 71 56"
    >
      <g
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        transform="translate(-932.000000, -1627.000000)"
      >
        <g
          transform="translate(934.000000, 1628.000000)"
          stroke={props.fill}
          strokeWidth="2"
        >
          <path d="M67.3232432,11.5675676 C66.0218919,10.5843243 53.0662162,0 33.6616216,0 C14.2281081,0 1.30135135,10.5843243 1.42108547e-14,11.5675676 L33.6327027,53.4710811 L67.3232432,11.5675676 Z" />
          <path d="M56.3375676,24.7899601 C55.4611971,24.1278135 46.7364418,17 33.6687838,17 C20.5816509,17 11.8763705,24.1278135 11,24.7899601" />
          <path d="M45.3087838,38.89498 C44.8587838,38.55498 40.3787838,34.89498 33.6687838,34.89498 C26.9487838,34.89498 22.4787838,38.55498 22.0287838,38.89498" />
        </g>
      </g>
    </svg>
  </object>
)

IconWifi.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
}

IconWifi.defaultProps = {
  className: '',
  fill: '#18CEA0',
}

export default IconWifi
