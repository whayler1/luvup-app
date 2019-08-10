import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import moment from 'moment';
import { Octicons } from '@expo/vector-icons';

import { LoverRequestType } from '../../types';
import { scene, vars } from '../../styles';
import DashboardNotification, { BUTTON_STYLES } from './DashboardNotification';
import Well from '../../components/Well';

class DashboardNotificationReceivedLoverRequest extends PureComponent {
  static propTypes = {
    loverRequest: LoverRequestType,
    onRejectPress: PropTypes.func,
    onAcceptPress: PropTypes.func,
    currentLoverRequestId: PropTypes.string,
    isAcceptLoverRequestInFlight: PropTypes.bool,
    isCancelLoverRequestInFlight: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.createdAtDate = new Date(+props.loverRequest.createdAt);
  }

  handleRejectPress = () => {
    this.props.onRejectPress(this.props.loverRequest.id);
  };

  handleAcceptPress = () => {
    this.props.onAcceptPress(this.props.loverRequest.id);
  };

  getButtons = () => {
    const {
      props: {
        currentLoverRequestId,
        isAcceptLoverRequestInFlight,
        isCancelLoverRequestInFlight,
        loverRequest: { id: loverRequestId },
      },
      handleRejectPress,
      handleAcceptPress,
    } = this;
    const isInFlight =
      isAcceptLoverRequestInFlight || isCancelLoverRequestInFlight;
    const isSelectedLoverRequest = loverRequestId === currentLoverRequestId;
    return [
      {
        key: 'reject',
        text:
          isSelectedLoverRequest && isCancelLoverRequestInFlight
            ? 'Rejecting…'
            : 'Reject',
        onPress: handleRejectPress,
        disabled: isInFlight,
        testID: 'reject-lover-request-button',
      },
      {
        key: 'accept',
        type: BUTTON_STYLES.PRIMARY,
        text:
          isSelectedLoverRequest && isAcceptLoverRequestInFlight
            ? 'Accepting…'
            : 'Accept',
        onPress: handleAcceptPress,
        disabled: isInFlight,
        testID: 'accept-lover-request-button',
      },
    ];
  };

  getError = () => ({});

  render() {
    const {
      props: {
        loverRequest: {
          sender: { firstName, lastName, email },
        },
      },
      getButtons,
      getError,
      createdAtDate,
    } = this;
    const error = getError();

    return (
      <DashboardNotification
        buttons={getButtons()}
        wrapperStyles={scene.gutterDoubleTop}>
        <Octicons name="arrow-down" size={40} color={vars.blueGrey100} />
        <Text style={[scene.bodyCopy, scene.textCenter]}>
          You received a lover request from
        </Text>
        <Text
          style={[
            scene.largeCopy,
            scene.textCenter,
            { color: vars.blueGrey900 },
          ]}>
          {`${firstName} ${lastName}`}
        </Text>
        <Text
          style={[
            scene.bodyCopy,
            scene.textCenter,
            { color: vars.blueGrey900 },
          ]}>
          {email}
        </Text>
        <Text style={[scene.bodyCopy, scene.textCenter]}>
          {moment(createdAtDate).fromNow()}
        </Text>
        {error.length > 0 && <Well text={error} />}
      </DashboardNotification>
    );
  }
}

export default DashboardNotificationReceivedLoverRequest;
