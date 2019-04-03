import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import moment from 'moment';

// import DashboardNotification, { BUTTON_STYLES } from './DashboardNotification';
import DashboardNotificationReceivedLoverRequest from './DashboardNotificationReceivedLoverRequest';
// import Well from '../../components/Well';
import { vars } from '../../styles';
import { LoverRequestType } from '../../types';
// import {
//   cancelLoverRequest as cancelLoverRequestAction,
//   resendLoverRequestEmail as resendLoverRequestEmailAction,
// } from '../../redux/loverRequest/loverRequest.actions';

class DashboardNotificationReceivedLoverRequests extends PureComponent {
  static propTypes = {
    receivedLoverRequests: PropTypes.arrayOf(LoverRequestType),
  };

  getButtons = () => [
    // {
    //   key: 'resend',
    //   type: BUTTON_STYLES.PRIMARY,
    //   text: this.props.isResendRequestEmailInFlight ? 'Resending…' : 'Resend',
    //   onPress: this.handleResendLoverRequest,
    // },
  ];

  getError = () => {
    // const {
    //   props: { resendLoverRequestEmailError, cancelLoverRequestError },
    // } = this;
    //
    // if (resendLoverRequestEmailError.length > 0) {
    //   return resendLoverRequestEmailError;
    // }
    // return cancelLoverRequestError;
  };

  // componentDidUpdate(prevProps) {
  // if (
  //   prevProps.isResendRequestEmailInFlight &&
  //   !this.props.isResendRequestEmailInFlight &&
  //   this.props.resendLoverRequestEmailError.length < 1
  // ) {
  //   /* eslint-disable react/no-did-update-set-state */
  //   this.setState({ isLoverRequestResent: true });
  //   /* eslint-enable react/no-did-update-set-state */
  // }
  // }

  render() {
    const {
      props: { receivedLoverRequests },
    } = this;

    return (
      <Fragment>
        <View
          style={{
            borderTopColor: vars.blueGrey100,
            borderTopWidth: 1,
            width: 100,
            marginTop: vars.gutterDouble,
          }}
        />
        {receivedLoverRequests.map(loverRequest => (
          <DashboardNotificationReceivedLoverRequest
            key={loverRequest.id}
            loverRequest={loverRequest}
          />
        ))}
      </Fragment>
    );
  }
}

export default connect(null)(DashboardNotificationReceivedLoverRequests);
