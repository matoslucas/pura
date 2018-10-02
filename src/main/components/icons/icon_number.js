import React from 'react'

const IconNumber = (props) => {
  return (
    <div className={`inlineIcon icon-number ${props.className}`} style={{ width: (props.value).toString().length > 2 ? (props.value).toString().length + '0px' : 30 }}>
      <span className="icon-number__value">{props.value}</span>
    </div>
  )
}

IconNumber.defaultProps = {
  className: '',
  value: 0,
}

IconNumber.propTypes = {
  className: React.PropTypes.string,
  value: React.PropTypes.integer,
}

export default IconNumber
