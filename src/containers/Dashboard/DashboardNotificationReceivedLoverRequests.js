import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import DashboardNotificationReceivedLoverRequest from './DashboardNotificationReceivedLoverRequest';
import Well from '../../components/Well';
import { vars, scene } from '../../styles';
import { LoverRequestType } from '../../types';
import {
  acceptLoverRequest as acceptLoverRequestAction,
  cancelReceivedLoverRequest as cancelReceivedLoverRequestAction,
} from '../../redux/receivedLoverRequests/receivedLoverRequests.actions';

class DashboardNotificationReceivedLoverRequests extends PureComponent {
  static propTypes = {
    receivedLoverRequests: PropTypes.arrayOf(LoverRequestType),
    isAcceptLoverRequestInFlight: PropTypes.bool.isRequired,
    acceptLoverRequestError: PropTypes.string.isRequired,
    acceptLoverRequest: PropTypes.func.isRequired,
    isCancelReceivedLoverRequestInFlight: PropTypes.bool.isRequired,
    cancelReceivedLoverRequestError: PropTypes.string.isRequired,
    cancelReceivedLoverRequest: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentLoverRequestId: '',
    };
  }

  handleRejectPress = loverRequestId => {
    this.setState({ currentLoverRequestId: loverRequestId });
    this.props.cancelReceivedLoverRequest(loverRequestId);
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
        isCancelReceivedLoverRequestInFlight,
        cancelReceivedLoverRequestError,
      },
      state: { currentLoverRequestId },
      handleRejectPress,
      handleAcceptPress,
    } = this;
    const error = acceptLoverRequestError || cancelReceivedLoverRequestError;

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
            isCancelLoverRequestInFlight={isCancelReceivedLoverRequestInFlight}
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
    isCancelReceivedLoverRequestInFlight:
      state.receivedLoverRequests.isCancelReceivedLoverRequestInFlight,
    cancelReceivedLoverRequestError:
      state.receivedLoverRequests.cancelReceivedLoverRequestError,
  }),
  {
    cancelReceivedLoverRequest: cancelReceivedLoverRequestAction,
    acceptLoverRequest: acceptLoverRequestAction,
  }
)(DashboardNotificationReceivedLoverRequests);
