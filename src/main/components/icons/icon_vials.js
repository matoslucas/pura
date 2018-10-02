import React from 'react'

const IconVials = props => (
  <object className={`inlineVector ${props.className}`}>
    <svg
      className="inlineVector__svg"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="100px"
      height="72px"
      viewBox="0 0 100 72"
    >
      <g
        id="Landing-page-(Dec-2017)"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        transform="translate(-126.000000, -1870.000000)"
      >
        <g
          transform="translate(126.000000, 1870.000000)"
          stroke={props.fill}
          strokeWidth="2"
        >
          <rect x="1.60880015" y="25" width="35" height="46" rx="8" />
          <path d="M26.6088001,25 L26.6088001,15.99923 C26.6088001,14.3438336 25.2664362,13 23.6125974,13 L15.6050029,13 C13.9502118,13 12.6088001,14.3425045 12.6088001,15.99923 L12.6088001,25 L26.6088001,25 Z" />
          <path d="M22.6088001,13 L22.6088001,2.99420208 C22.6088001,1.89505792 21.7120826,1 20.6071347,1 L18.6104656,1 C17.5014814,1 16.6088001,1.89146103 16.6088001,2.99420208 L16.6088001,13 L22.6088001,13 Z" />
          <path
            d="M8.00714513,44.4774229 L8.00714513,35.7211298 C8.00714513,35.7211298 7.61047352,31 12.7282749,31"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="translate(170.000000, 1870.000000)"
          stroke={props.fill}
          strokeWidth="2"
        >
          <rect x="1.60880015" y="25" width="35" height="46" rx="8" />
          <path d="M26.6088001,25 L26.6088001,15.99923 C26.6088001,14.3438336 25.2664362,13 23.6125974,13 L15.6050029,13 C13.9502118,13 12.6088001,14.3425045 12.6088001,15.99923 L12.6088001,25 L26.6088001,25 Z" />
          <path d="M22.6088001,13 L22.6088001,2.99420208 C22.6088001,1.89505792 21.7120826,1 20.6071347,1 L18.6104656,1 C17.5014814,1 16.6088001,1.89146103 16.6088001,2.99420208 L16.6088001,13 L22.6088001,13 Z" />
          <path
            d="M8.00714513,44.4774229 L8.00714513,35.7211298 C8.00714513,35.7211298 7.61047352,31 12.7282749,31"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  </object>
)

IconVials.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
}

IconVials.defaultProps = {
  className: '',
  fill: '#18CEA0',
}

export default IconVials
