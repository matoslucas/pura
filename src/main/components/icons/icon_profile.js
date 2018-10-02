import React from 'react'

const IconProfile = (props) =>
  <object className={`inlineVector ${props.className}`}>
    <svg className="inlineVector__svg" version="1.1" xmlns="http://www.w3.org/2000/svg"width="14px" height="16px" viewBox="0 0 14 16">
      <g className="inlineVector__shape" fill={props.fill}>
        <path d="M7,8C5.343,8,4,6.657,4,5s1.343-3,3-3s3,1.343,3,3S8.657,8,7,8z M12,5c0-2.762-2.239-5-5-5S2,2.238,2,5
          c0,1.521,0.679,2.882,1.749,3.799C1.52,9.97,0,12.308,0,15c0,0.553,0.448,1,1,1s1-0.447,1-1c0-2.762,2.239-5,5-5s5,2.238,5,5
          c0,0.553,0.448,1,1,1s1-0.447,1-1c0-2.692-1.52-5.03-3.749-6.201C11.321,7.882,12,6.521,12,5z"/>
      </g>
    </svg>
  </object>

IconProfile.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
}

IconProfile.defaultProps = {
  className: '',
  fill: '#BBBBBB',
}

export default IconProfile
