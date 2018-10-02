import React, { Component, PropTypes } from 'react'

import SubNav from '../../navigation/SubNav'
import { getInnerHTML } from '../../../../common/utils/xmlDoc'

export default class ProductDetail extends Component {

  static defaultProps = {
    productData: {
      tags: '',
    },
  }

  constructor(props) {
    super(props);
  }
 
  constructData() {

    let tags = [];
    if (this.props.productData.tags && this.props.productData.tags.length) {
      tags = this.props.productData.tags.split(', ');
    }


    return {
      nav: {
        items: [
          {
            text: 'SPECS',
            active: true,
          },
        ],
      },

      // keywords: {
      //   heading: 'Key words',
      //   list: ingredients,
      // },

      keywords: {
        heading: 'Key words',
        list: tags,
      },

      notes: {
        heading: 'Notes',
        text: getInnerHTML(this.props.productData.info, "notes") ? getInnerHTML(this.props.productData.info, "notes") : '',
      },
    }
  }

  render() {
    const { nav, keywords, ingredients, details, notes } = this.constructData();

    const DetailColumn = data =>
      <div className={`product-detail__column ${data.className}`} key={data.heading}>
        <h4 className="product-detail__heading">{data.heading}</h4>
        <div className="product-detail__text" dangerouslySetInnerHTML={{ __html: data.text }} />
        {data.list && <ul className="product-detail__list">
          {data.list.map(item => <li className="product-detail__list-item">{item}</li>)}
        </ul>}
      </div>

    return (
      <section className="product-detail">
        <div className="container">
          <SubNav className="sub-nav--primary" {...nav} />

          <div className="product-detail__container">
            {/* <DetailColumn className="product-detail__column--3" {...keywords} /> */}
            <DetailColumn className="product-detail__column--6" {...keywords} />
            <DetailColumn className="product-detail__column--6" {...notes} />
          </div>
        </div>
      </section>
    )
  }

}
