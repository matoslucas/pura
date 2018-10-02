import React from 'react'

const IconPaypal = (props) =>
  <img src={props.image}></img>

IconPaypal.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
}

IconPaypal.defaultProps = {
  image: require('main/assets/img/PayPal-Express@2x.svg'),  
  className: '',
  fill: ' ',
}

export default IconPaypal
