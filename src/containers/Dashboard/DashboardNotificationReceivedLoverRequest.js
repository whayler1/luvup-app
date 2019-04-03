import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { Text } from 'react-native';
import moment from 'moment';

import { LoverRequestType } from '../../types';
import { scene } from '../../styles';
import DashboardNotification from './DashboardNotification';
import Well from '../../components/Well';

class DashboardNotificationReceivedLoverRequest extends PureComponent {
  static propTypes = {
    loverRequest: LoverRequestType,
  };

  getButtons = () => [];

  getError = () => ({});

  render() {
    const {
      props: {
        loverRequest: {
          createdAt,
          sender: { firstName, lastName },
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
        <Text style={[scene.bodyCopy, scene.textCenter]}>
          You received a lover request from
        </Text>
        <Text style={[scene.largeCopy, scene.textCenter]}>
          {`${firstName} ${lastName}`}
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
