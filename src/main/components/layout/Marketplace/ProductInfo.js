import React, { Component, PropTypes } from 'react'

import { Button } from '../../forms'
import PictureBox from '../../boxes/PictureBox'
import Breadcrumbs from '../../interactive/Breadcrumbs'
import Counter from '../../interactive/Counter'
import Rating from '../../interactive/Rating'

import { getInnerHTML } from '../../../../common/utils/xmlDoc'
import { isComingSoonType } from '../../../../common/utils/utils'

export default class ProductInfo extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    orderProduct: PropTypes.func.isRequired,
    productData: PropTypes.object,
    productRating: PropTypes.object,
    rateProduct: PropTypes.func.isRequired,
  }

  static defaultProps = {
    productData: {},
    productRating: {},
  }

  constructor(props) {
    super(props);
  }

  constructData() {

    const rating = this.props.productRating.value
      ? this.props.productRating
      : this.props.productData.rating

    return {
      breadcrumbs: {
        items: [
          {
            href: '/shop',
            text: 'All scents',
          },
          {
            href: this.props.productData.href || null,
            text: this.props.productData.heading || '',
          },
        ],
      },

      heading: this.props.productData.heading || '',
      info: this.props.productData.info || '',
      description: getInnerHTML(this.props.productData.info, "description") ? getInnerHTML(this.props.productData.info, "description") : '',

      rating: {
        rating: rating && rating.value ? rating.value : 0,
        text: `${(rating && rating.count) || 0} ratings`,
        arrow: 'down',
      },

      images: {
        heading: this.props.productData.heading || '',
        image:
          this.props.productData.image ||
          require('main/assets/img/products/product-placeholder.jpg'),
        type: this.props.productData.type,
      },

      actions: {
        buy: {
          action: 'click',
          text: 'Add to my queue',
        },
      },
    }
  }


  render() {
    const { images, breadcrumbs, heading, rating, info, actions, description, details, notes } = this.constructData()
   

    return (
      <section className="product-info">
        <div className="container">
          <div className="product-info__container">
            <div className="product-info__image">
              {images &&
                <PictureBox className="product-info__image-box" {...images} />
              }
            </div>

            <div className="product-info__content">
              <Breadcrumbs
                className="product-info__breadcrumbs"
                {...breadcrumbs}
              />

              <h2 className="product-info__heading">{heading}</h2>
              <Rating
                className="rating--interactive product-info__rating"
                {...rating}
                rateProduct={this.props.rateProduct}
              />

              <div
                className="product-info__text"
                dangerouslySetInnerHTML={{ __html: description }}
              />

              <div className="product-info__action">
                <Counter
                  className="product-info__action-counter"
                  onChange={this.props.onChange}
                />

                <br />
                {isComingSoonType(this.props.productData.type) ?
                  <Button className="btn--shadow" text="Coming Soon" disabled />
                  :
                  (<Button
                    className="btn--primary btn--shadow btn--no-margin"
                    {...actions.buy}
                    handleClick={this.props.orderProduct}
                  />)
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

}