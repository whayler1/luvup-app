import React, { PureComponent } from 'react';
import { Vibration } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Notifications } from 'expo';
import Template from './InAppNotifications.template';

import _ from 'lodash';

class InAppNotifications extends PureComponent {
  state = {
    notifications: [],
    luvupReceivedNotifications: [],
    jalapenoReceivedNotifications: [],
  }

  componentDidMount() {
    Notifications.addListener(this.onNotificationReceived);

  }

  onNotificationReceived = notification => {
    const updatedNotifications = [...this.state.notifications, notification];
    const luvupReceivedNotifications = updatedNotifications.filter(notification => _.get(notification, 'data.type') === 'luvup-received');
    const jalapenoReceivedNotifications = updatedNotifications.filter(notification => _.get(notification, 'data.type') === 'jalapeno-received');

    this.setState({
      notifications: updatedNotifications,
      luvupReceivedNotifications,
      jalapenoReceivedNotifications
    });
    Vibration.vibrate();
  }

  render() {
    return (
      <Template
        children={this.props.children}
        isReady={false}
      />
    )
  }
};

// export default InAppNotifications;

export default connect(
  state => ({
    isFontLoaded: state.font.isFontLoaded
  }),
)(InAppNotifications);
