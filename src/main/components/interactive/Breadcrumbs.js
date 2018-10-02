import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import Icon from '../icons'

const Breadcrumbs = (props) => {
  const renderCrumbs = () => {
    const crumbs = []
    const linksCount = props.items.length

    props.items.map((item, i) => {
      const hasElements = i + 1 < linksCount

      crumbs.push(<Link className={hasElements ? 'breadcrumbs__link' : 'breadcrumbs__link  breadcrumbs__link--active'} to={item.href}>{item.text}</Link>)
      hasElements && crumbs.push(<Icon className="breadcrumbs__separator" type="arrow_alt" orientation="right" />)
    })

    return crumbs
  }

  return (
    <div className={`breadcrumbs ${props.className}`}>
      { renderCrumbs() }
    </div>
  )
}

Breadcrumbs.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
}

Breadcrumbs.defaultProps = {
  className: '',
  items: [],
}

export default Breadcrumbs
