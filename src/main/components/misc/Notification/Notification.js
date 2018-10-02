import React, { Component, PropTypes } from 'react'
import { notification } from 'main/redux/modules/appState'
import equal from 'lodash/isEqual'
import NotificationSystem from 'react-notification-system'

export default class Notification extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    notification: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.notify = null
  }

  componentDidMount() {
    this.notify = this.notificationSystem
  }

  componentWillReceiveProps(nextProps) {
    // Check if same message isn't already displayed
    if (equal(this.props.notification, nextProps.notification)) {
      return
    }

    const { message, level } = nextProps.notification

    this.notify.addNotification({
      message,
      level,
      position: 'tc',
      autoDismiss: 4,
      onRemove: this.handleRemove,
    })
  }

  handleRemove() {
    this.props.dispatch(notification('', '', false))
  }

  render() {
    return (
      <NotificationSystem ref={comp => { this.notificationSystem = comp }} />
    )
  }
}

