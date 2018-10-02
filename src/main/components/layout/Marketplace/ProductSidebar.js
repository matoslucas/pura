import React, { Component, PropTypes } from 'react'

import Icon from '../../icons'
import { CheckBox } from '../../forms'

class ProductSidebar extends Component {
  renderHeader(heading) {
    return (
      <div className="sidebar__section-header">
        <span className="sidebar__section-heading">{heading}</span>
        <Icon className="sidebar__section-heading-icon" type="arrow" orientation="bottom" />
      </div>
    )
  }

  renderItems(items) {
    return items.map(item =>
      <div className="sidebar__item">
        {item.checkbox && <CheckBox {...item.checkbox} />}
      </div>
    )
  }

  render() {
    const { className, sections } = this.props

    return (
      <div className={`sidebar ${className}`}>
        { sections.map(item =>
          <div className={item.open ? 'sidebar__section sidebar__section--active' : 'sidebar__section'} key={item.header}>
            { this.renderHeader(item.header) }
            { item.content && <div className="sidebar__section-items">
              {this.renderItems(item.content)}
            </div>}
          </div>
        )}
      </div>
    )
  }
}

ProductSidebar.defaultProps = {
  className: '',

  sections: [
    {
      header: 'Brands',
      open: true,

      content: [
        {
          checkbox: {
            id: 'filter-sugar',
            label: 'Sugar',
            icon: { type: 'ok' },
          },
        },
        {
          checkbox: {
            id: 'filter-grape-fruit',
            label: 'Grape fruit',
            icon: { type: 'ok' },
          },
        },
        {
          checkbox: {
            id: 'filter-pine',
            label: 'Pine',
            icon: { type: 'ok' },
          },
        },
        {
          checkbox: {
            id: 'filter-honey',
            label: 'Honey',
            icon: { type: 'ok' },
          },
        },
        {
          checkbox: {
            id: 'filter-panther',
            label: 'Panther',
            icon: { type: 'ok' },
          },
        },
      ],
    },
    {
      header: 'Rating',
    },
    {
      header: 'Season',
    },
    {
      header: 'Type',
    },
  ]
}

export default ProductSidebar
