import React, { Component } from 'react'
import { Field } from 'redux-form'

import InfoBox from '../../../components/boxes/InfoBox'

export default class Form extends Component {
  static defaultProps = {
    className: '',
    handleChange: () => {},
    handleClick: () => {},
    info: null,

    sections: [
      {
        className: '',
        heading: null,
        fields: [],
      },
    ],

    submitting: false,
  }

  renderFormItem(item) {
    
    item.modifier = item.modifier || ''
    

    let itemLayout = 'form__item--row'

    if (item.column === true) {
      itemLayout = 'form__item--column-50'
    }
    if (Number.isInteger(item.column)) {
      itemLayout = `form__item--column-${item.column}`
    }
    if(item.name === 'facebook-login' || item.name === 'google-login' ||  item.name === 'twitter-login'){
      //item['onChange']=(event, newValue, previousValue)=>{this.props.handleChange(item.name, newValue)};
    }

    return (
      <div className={`form__item ${item.modifier} ${itemLayout}`}>
        <Field
          {...item}
          name={item.name}
          ref={item.name}
          onChange={(event, newValue, previousValue)=>{this.props.handleChange(item.name, newValue)}}
          handleClick={event => this.props.handleClick(item.name, event)}
        />
      </div>
    )
  }

  render() {
    const {
      className,
      onSubmit,
      info,
      heading,
      sections,
      fields,
      error,
      submitting,
      submitSucceeded,
      successMesage,
    } = this.props

    return (
      <form
        className={`form ${className}${
          submitting == true ? ' form--submitting' : ''
        }`}
        
        onSubmit={onSubmit}
      >
        <div className="form__overlay">
          {info && <InfoBox className="form__info info-box--big" {...info} />}

          {sections.map(section => (
            <div className={`form__section ${section.className}`}>
              <div className="form__section-wrapper">
                {section.heading &&
                  <h4 className="form__section-heading">{section.heading}</h4>
                }
                {section.fields.map(item => this.renderFormItem(item))}
              </div>
            </div>
          ))}

          {error && (
            <div className="form__submit-message form__submit-message--error">
              {error}
            </div>
          )}
          {submitSucceeded && (
            <div className="form__submit-message form__submit-message--success">
              {successMesage}
            </div>
          )}
        </div>
      </form>
    )
  }
}
