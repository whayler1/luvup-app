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
  };

  handleRejectLoverRequest = () => {
    // this.props.onRejectPress(this.props.loverRequest.id);
  };

  handleAcceptPress = () => {
    // this.props.onAcceptPress(this.props.loverRequest.id);
  };

  getButtons = () => [
    {
      key: 'reject',
      text: 'Reject',
      onPress: this.handleRejectPress,
    },
    {
      key: 'accept',
      type: BUTTON_STYLES.PRIMARY,
      text: 'Accept',
      onPress: this.handleAcceptPress,
    },
  ];

  getError = () => ({});

  render() {
    const {
      props: {
        loverRequest: {
          createdAt,
          sender: { firstName, lastName, email },
        },
      },
      getButtons,
      getError,
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
          {moment(createdAt).fromNow()}
        </Text>
        {error.length > 0 && <Well text={error} />}
      </DashboardNotification>
    );
  }
}

export default DashboardNotificationReceivedLoverRequest;
