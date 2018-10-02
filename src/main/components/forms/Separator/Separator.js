import React, { PropTypes } from 'react'

const Separator = (props) => 
  <fieldset className={`separator ${props.className}`}>
    <legend className="separator__container">
      {props.text!='' && <span className="separator__content">{props.text}</span>}
    </legend>
  </fieldset>

Separator.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
}

Separator.defaultProps = {
  className: '',
  text: 'Or',
}

export default Separator
