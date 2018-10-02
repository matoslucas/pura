
import React from 'react'

const IconAmazon = (props) =>
  <img src={props.image}></img>

  IconAmazon.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
}

IconAmazon.defaultProps = {
  image: require('main/assets/img/Button_gold_Amazon.svg'),  
  className: '',
  fill: ' ',
}

export default IconAmazon