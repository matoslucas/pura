/* eslint-disable react/no-multi-comp */
/* eslint-disable camelcase */

import get from 'lodash/get'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, SubmissionError } from 'redux-form'

import { getUser, updateUser } from 'main/redux/modules/user'

import { Button, Note } from 'main/components/forms'
import { HeaderShop } from 'main/components/layout'
import { CircleLoader } from 'main/components/loaders'

import Breadcrumbs from 'main/components/interactive/Breadcrumbs'
import PlanWidget from 'main/components/interactive/PlanWidget'

import Form from 'main/containers/forms/generators/Form'

@reduxForm({ form: 'plan-change' })
class ChangePlanForm extends Component {
  static defaultProps = {
    breadcrumbs: {
      items: [
        { href: '/shop', text: 'Marketplace' },
        { href: '/my-account', text: 'My Account' },
        { href: null, text: 'Change My Plan' },
      ],
    },
  }

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({
      monthly_plan: PropTypes.number.isRequired,
    }).isRequired,
  }

  get sections() {
    return [
      {
        className: 'form__section--400',
        fields: [
          {
            component: PlanWidget,
            modifier: 'form__item--collapse',
            name: 'monthly_plan',
            currentPlan: '',
            changeHeading: 'Select Your Plan',
          },
          {
            component: Note,
            className: 'form__note--center form__note--info',
            name: 'social-info',
            text:
              'Subscriptions will be automatically renewed for successive monthly periods and your payment method will automatically be charged until you cancel. You may cancel your subscription at any time by following the cancellation procedures from your account.',
            link: null,
          },
        ],
      },
      {
        className: '',
        fields: [
          {
            component: Button,
            modifier: 'form__item--center',
            name: 'submit-btn-plan',
            className: 'btn--primary btn--shadow btn--fat',
            action: 'submit',
            text: 'Confirm change',
          },
          {
            modifier: 'form__item--center',
            component: Button,
            action: 'click',
            name: 'back-btn',
            className: 'header-nav__item-link--button header-nav__item-link--dark',
            text: 'Back',
          },
        ],
      },
    ]
  }


  handleClick(name) {
    switch (name) {
      case 'back-btn': window.history.back();
        break
      default:
        break
    }
  }

  render() {
    const { initialValues, handleSubmit, ...rest } = this.props

    return (
      <Form
        {...rest}
        className="form--550 form--spaced"
        info={{
          heading: 'Change My Plan',
          text:
            'Your new plan will be applied to your next billing cycle. Your monthly membership is billed on the first day of each billing period.',
        }}
        initialValues={initialValues}
        handleClick={this.handleClick}
        onSubmit={handleSubmit}
        sections={this.sections}
        successMesage="Your plan was succesfully changed"
      />
    )
  }
}

const select = state => ({ user: get(state, 'user') })
const actions = { getUser, updateUser }

@connect(select, actions)
export default class ChangePlan extends Component {
  static defaultProps = {
    breadcrumbs: {
      items: [
        { href: '/shop', text: 'Marketplace' },
        { href: '/my-account', text: 'My Account' },
        { href: null, text: 'Change My Plan' },
      ],
    },
    user: {
      loaded: false,
    },
  }

  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    breadcrumbs: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          href: PropTypes.string,
          text: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
    /* eslint-enable react/no-unused-prop-types */

    getUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,

    user: PropTypes.shape({
      data: PropTypes.shape({
        monthly_plan: PropTypes.number.isRequired,
      }),
      loaded: PropTypes.bool.isRequired,
    }),
  }

  componentWillMount() {
    this.props.getUser()
  }

  handleSubmit = data => {
    const nextPlan = {
      customer: {
        metafields: [
          {
            key: 'monthly_plan',
            value: data.monthly_plan,
            value_type: 'integer',
            namespace: 'global',
          },
        ],
      },
    }

    return this.props.updateUser(nextPlan).catch(({ message }) => {
      throw new SubmissionError({ _error: message })
    })
  }

  get loader() {
    return <CircleLoader />
  }

  get form() {
    return (
      <ChangePlanForm
        initialValues={{ monthly_plan: this.props.user.data.monthly_plan }}
        onSubmit={this.handleSubmit}
      />
    )
  }

  render() {
    const { breadcrumbs, user } = this.props
    const isLoaded = user && user.loaded

    return (
      <div className="pura-web__container">
        <HeaderShop />

        <section className="pura-web__section my-account__change-plan">
          <div className="container">
            <Breadcrumbs className="my-account__breadcrumbs" {...breadcrumbs} />

            {isLoaded ? this.form : this.loader}
          </div>
        </section>
      </div>
    )
  }
}
