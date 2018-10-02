import React, { PropTypes } from 'react'

const QueveItemDrop = props => {
  const { loading, message } = props

  return (
    <div className={`queve-item ${loading ? 'queve-item--loading' : 'queve-item--empty'}`}>
      <span className="queve-item__position" />
      <div className="queve-item__wrapper">{!loading && message}</div>
      <div className="queve-item__state" />
    </div>
  )
}

QueveItemDrop.propTypes = {
  loading: PropTypes.bool,
  message: PropTypes.string,
}

QueveItemDrop.defaultProps = {
  loading: false,
  message: 'Your queue is empty. Browse our scents and select some you like',
}

export default QueveItemDrop
