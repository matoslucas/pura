import React, { Component } from 'react'
import EasyTransition from 'react-easy-transition'
import { connect } from 'react-redux'

function animate(ComposedComponent) {
  @connect(
    state => ({ location: state.routing.location.pathname }))
  class Animate extends Component {
    static propTypes = {
      location: React.PropTypes.string,
    }

    render() {
      return (
        <EasyTransition
          path={this.props.location}
          initialStyle={{ opacity: 0 }}
          transition="opacity 0.25s ease-in"
          finalStyle={{ opacity: 1 }}
        >
          <ComposedComponent {...this.props} />
        </EasyTransition>
      )
    }
  }
  return Animate
}

export default animate
