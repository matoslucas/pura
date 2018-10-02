import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'

import { Header } from '../../../components/layout/'
import Breadcrumbs from '../../../components/interactive/Breadcrumbs'
import Form from '../../forms/generators/Form'
import InfoBox from '../../../components/boxes/InfoBox'
import { createValidator, email, required } from 'common/utils/validation'
import { Button, Input, Note } from '../../../components/forms'

class CheckEmail extends Component {
  static propTypes = {
    error: PropTypes.object,
    checkEmail: PropTypes.object,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { error, checkEmail } = this.props

    return (
      <div className="pura-web__container">
        <Header />

        <section className="pura-web__section my-account__change-email">
          <div className="container">
            {/* <InfoBox className="info-box--big" {...checkEmail.info} /> */}
            <Form {...checkEmail} error={error} />
          </div>
        </section>
      </div>
    )
  }
}

CheckEmail.defaultProps = {
  checkEmail: {
    info: {
      heading: 'Check Your Email',
      text: 'We just emailed you instructions on how to reset your password.',
      icon: {
        type: 'checkmail',
      },
    },
  },
}

const CheckEmailCompose = compose(connect(() => ({}), {}))(CheckEmail)

export default CheckEmailCompose
