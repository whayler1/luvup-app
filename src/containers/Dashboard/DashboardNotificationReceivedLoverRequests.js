import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import DashboardNotificationReceivedLoverRequest from './DashboardNotificationReceivedLoverRequest';
import Well from '../../components/Well';
import { vars, scene } from '../../styles';
import { LoverRequestType } from '../../types';
import { acceptLoverRequest as acceptLoverRequestAction } from '../../redux/receivedLoverRequests/receivedLoverRequests.actions';
import { cancelLoverRequest as cancelLoverRequestAction } from '../../redux/loverRequest/loverRequest.actions';

class DashboardNotificationReceivedLoverRequests extends PureComponent {
  static propTypes = {
    receivedLoverRequests: PropTypes.arrayOf(LoverRequestType),
    isAcceptLoverRequestInFlight: PropTypes.bool.isRequired,
    acceptLoverRequestError: PropTypes.string.isRequired,
    isCancelLoverRequestInFlight: PropTypes.bool.isRequired,
    cancelLoverRequestError: PropTypes.string.isRequired,
    cancelLoverRequest: PropTypes.func.isRequired,
    acceptLoverRequest: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentLoverRequestId: '',
    };
  }

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

  handleRejectPress = loverRequestId => {
    this.setState({ currentLoverRequestId: loverRequestId });
    this.props.cancelLoverRequest(loverRequestId);
  };
  handleAcceptPress = loverRequestId => {
    this.setState({ currentLoverRequestId: loverRequestId });
    this.props.acceptLoverRequest(loverRequestId);
  };

  render() {
    const {
      props: {
        receivedLoverRequests,
        isAcceptLoverRequestInFlight,
        acceptLoverRequestError,
        isCancelLoverRequestInFlight,
        cancelLoverRequestError,
      },
      state: { currentLoverRequestId },
      handleRejectPress,
      handleAcceptPress,
    } = this;
    const error = acceptLoverRequestError || cancelLoverRequestError;

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
        {error.length > 0 && (
          <Well text={error} styles={scene.gutterDoubleTop} />
        )}
        {receivedLoverRequests.map(loverRequest => (
          <DashboardNotificationReceivedLoverRequest
            key={loverRequest.id}
            loverRequest={loverRequest}
            onRejectPress={handleRejectPress}
            onAcceptPress={handleAcceptPress}
            currentLoverRequestId={currentLoverRequestId}
            isAcceptLoverRequestInFlight={isAcceptLoverRequestInFlight}
            isCancelLoverRequestInFlight={isCancelLoverRequestInFlight}
          />
        ))}
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    isAcceptLoverRequestInFlight:
      state.receivedLoverRequests.isAcceptLoverRequestInFlight,
    acceptLoverRequestError:
      state.receivedLoverRequests.acceptLoverRequestError,
    isCancelLoverRequestInFlight:
      state.loverRequest.isCancelLoverRequestInFlight,
    cancelLoverRequestError: state.loverRequest.cancelLoverRequestError,
  }),
  {
    cancelLoverRequest: cancelLoverRequestAction,
    acceptLoverRequest: acceptLoverRequestAction,
  }
)(DashboardNotificationReceivedLoverRequests);
