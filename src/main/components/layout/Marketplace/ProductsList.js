import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import InfoBox from '../../boxes/InfoBox'
import PictureBox from '../../boxes/PictureBox'

export default class ProductsList extends Component {
  static defaultProps = {
    className: '',
    productList: {},
    info: {},
  }

  static propTypes = {
    className: PropTypes.string,
    info: PropTypes.object,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      })
    ).isRequired,
  }

  get filteredProducts() {
    const allowed = ['Scent', 'Scent - Coming Soon', 'Device', 'Device - Coming Soon']
    return this.props.products.filter(({ data: { type } }) =>
      allowed.includes(type)
    ).sort((a, b) => {
      // type device on top
    if (a.data.type === "Device" && b.data.type === "Scent") {
      return -1;
    }

    if (a.data.type === "Device" && b.data.type === "Scent - Coming Soon") {
      return -1;
    }

    if (a.data.type === "Device" && b.data.type === "Device - Coming Soon") {
      return -1;
    }

    //Device - Coming Soon
    if (a.data.type === "Device - Coming Soon" && b.data.type === "Device") {
      return 1;
    }
    
    if (a.data.type === "Device - Coming Soon" && b.data.type === "Scent") {
      return -1;
    }

    if (a.data.type === "Device - Coming Soon" && b.data.type === "Scent - Coming Soon") {
      return -1;
    }

    //Scent
    if (a.data.type === "Scent" && b.data.type === "Device") {
      return 1;
    }

    if (a.data.type === "Scent" && b.data.type === "Scent - Coming Soon") {
      return -1;
    }

    if (a.data.type === "Scent" && b.data.type === "Device - Coming Soon") {
      return 1;
    }

    //Scent - Coming Soon
    if (a.data.type === "Scent - Coming Soon" && b.data.type === "Device") {
      return 1;
    }
    
    if (a.data.type === "Scent - Coming Soon" && b.data.type === "Scent") {
      return 1;
    }

    if (a.data.type === "Scent - Coming Soon" && b.data.type === "Device - Coming Soon") {
      return 1;
    }


   

    //Alfabetical order
    var nameA=a.data.heading.toLowerCase(), nameB=b.data.heading.toLowerCase();
    if (nameA < nameB) //sort string ascending
      return -1;
    if (nameA > nameB)
      return 1;

    return 0

    })
  }

  productIsComingSoon(product) {
    return product.type === 'Scent - Coming Soon'
  }

  render() {
    const { className, info } = this.props
    const products = this.filteredProducts

    const classes = classnames('product-list', className)
    const listClasses = classnames('product-list__list')

    return (
      <div className={classes}>
        <InfoBox className="info-box--big product-list__info" {...info} />

        <div className={listClasses}>
          {products.map(item => {
            return (
              <PictureBox
                className="product-list__list-item"
                key={item.data.id}
                {...item.data}
              />
            )
          }

          )}
        </div>
      </div>
    )
  }
}
