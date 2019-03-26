import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'react-native';

import DashboardNotification, { BUTTON_STYLES } from './DashboardNotification';
import { scene } from '../../styles';
import {
  cancelLoverRequest as cancelLoverRequestAction,
  resendLoverRequestEmail as resendLoverRequestEmailAction,
} from '../../redux/loverRequest/loverRequest.actions';

class DashboardNotificationRequestSent extends PureComponent {
  static propTypes = {
    loverRequestId: PropTypes.string,
    loverRequestFirstName: PropTypes.string,
    loverRequestLastName: PropTypes.string,
    // loverRequestCreatedAt: PropTypes.string,
    cancelLoverRequest: PropTypes.func.isRequired,
    resendLoverRequestEmail: PropTypes.func.isRequired,
    isCancelLoverRequestInFlight: PropTypes.bool.isRequired,
    // cancelLoverRequestError: PropTypes.string.isRequired,
    isResendRequestEmailInFlight: PropTypes.bool.isRequired,
    resendLoverRequestEmailError: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoverRequestResent: false,
    };
  }

  handleCancelLoverRequest = () => {
    console.log('\n\n handleResendLoverRequest');
    this.props.cancelLoverRequest(this.props.loverRequestId);
  };
  handleResendLoverRequest = () => {
    this.props.resendLoverRequestEmail(this.props.loverRequestId);
  };

  getButtons = () => {
    const buttons = [
      {
        key: 'cancel',
        text: this.props.isCancelLoverRequestInFlight ? 'Canceling…' : 'Cancel',
        onPress: this.handleCancelLoverRequest,
      },
    ];
    if (!this.state.isLoverRequestResent) {
      buttons.push({
        key: 'resend',
        type: BUTTON_STYLES.PRIMARY,
        text: this.props.isResendRequestEmailInFlight ? 'Resending…' : 'Resend',
        onPress: this.handleResendLoverRequest,
      });
    } else {
      buttons.push({
        key: 'resend',
        text: 'Re-sent',
        disabled: true,
      });
    }
    return buttons;
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.isResendRequestEmailInFlight &&
      !this.props.isResendRequestEmailInFlight &&
      this.props.resendLoverRequestEmailError.length < 1
    ) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ isLoverRequestResent: true });
      /* eslint-enable react/no-did-update-set-state */
    }
  }

  render() {
    const {
      props: { loverRequestFirstName, loverRequestLastName },
      getButtons,
    } = this;

    return (
      <DashboardNotification buttons={getButtons()}>
        <Text style={[scene.bodyCopy, scene.textCenter]}>
          You sent a lover request to
        </Text>
        <Text style={[scene.largeCopy, scene.textCenter]}>
          {`${loverRequestFirstName} ${loverRequestLastName}`}
        </Text>
      </DashboardNotification>
    );
  }
}

export default connect(
  state => ({
    loverRequestId: state.loverRequest.id,
    loverRequestFirstName: state.loverRequest.firstName,
    loverRequestLastName: state.loverRequest.lastName,
    // loverRequestCreatedAt: state.loverRequest.createdAt,
    isCancelLoverRequestInFlight:
      state.loverRequest.isCancelLoverRequestInFlight,
    // cancelLoverRequestError: state.loverRequest.cancelLoverRequestError,
    isResendRequestEmailInFlight:
      state.loverRequest.isResendRequestEmailInFlight,
    resendLoverRequestEmailError:
      state.loverRequest.resendLoverRequestEmailError,
  }),
  {
    cancelLoverRequest: cancelLoverRequestAction,
    resendLoverRequestEmail: resendLoverRequestEmailAction,
  }
)(DashboardNotificationRequestSent);
