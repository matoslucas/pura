import React from 'react'

const IconTop = (props) => {
  const setRotation = () => {
    switch (props.orientation) {
      case 'bottom':
        return 180
      case 'left':
        return 270
      case 'right':
        return 90
      default:
        return 0
    }
  }

  return (
    <object className={`inlineVector ${props.className}`}>
      <svg className="inlineVector__svg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="-3 0 16 16">
        <g className="inlineVector__shape" fill={props.fill} transform={`rotate(${setRotation()} 5 8)`}>
          <path d="M5.999,3.244l2.295,2.48c0.391,0.396,1.023,0.396,1.414,0
            c0.391-0.395,0.391-1.037,0-1.432l-3.647-3.85C5.777,0.158,5.402,0,5,0C4.599,0,4.222,0.158,3.94,0.443l-3.647,3.85
            c-0.391,0.395-0.391,1.037,0,1.432c0.39,0.396,1.023,0.396,1.414,0l2.292-2.479v11.748c0,0.553,0.448,1,1,1c0.552,0,1-0.447,1-1
            V3.244z"/>
        </g>
      </svg>
    </object>
  )
}

IconTop.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
  orientation: React.PropTypes.string,
}

IconTop.defaultProps = {
  className: '',
  fill: '#BBBBBB',
  orientation: 'top',
}

export default IconTop
