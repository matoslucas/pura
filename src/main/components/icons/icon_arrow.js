import React from 'react'

const IconArrow = (props) => {
  const setRotation = () => {
    switch (props.orientation) {
      case 'top':
        return 180
      case 'left':
        return 90
      case 'right':
        return 270
      default:
        return 0
    }
  }

  return (
    <object className={`inlineVector ${props.className}`}>
      <svg className="inlineVector__svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16">
        <g className="inlineVector__shape" fill={props.fill} transform={`rotate(${setRotation()} 8 8)`}>
          <path d="M6.94,12.067c0.282,0.286,0.657,0.444,1.06,0.444c0.401,0,0.779-0.158,1.06-0.444
            l6.648-6.849c0.39-0.396,0.39-1.036,0-1.433c-0.391-0.395-1.023-0.395-1.413,0L8,10.278L1.707,3.786
            c-0.39-0.395-1.024-0.395-1.415,0c-0.391,0.396-0.391,1.036,0,1.433L6.94,12.067z"/>
        </g>
      </svg>
    </object>
  )
}

IconArrow.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
  orientation: React.PropTypes.string,
}

IconArrow.defaultProps = {
  className: '',
  fill: '#999999',
  orientation: 'bottom',
}

export default IconArrow
