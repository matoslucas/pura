import React from 'react'

const Icon = (props) => {
  // Keep naming convention of svg icons to icon_icontype

  const iconPath = `./icon_${props.type}`
  const IconComponent = require(iconPath)

  return <IconComponent {...props} />
}

Icon.defaultProps = {
  type: React.PropTypes.string,
}

export default Icon
