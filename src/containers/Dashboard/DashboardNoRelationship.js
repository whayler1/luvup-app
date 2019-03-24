import React, { PureComponent, Fragment } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import { buttons, scene, vars } from '../../styles';
import styles from './DashboardNoRelationship.styles';
import HeartArt from '../../components/Art/HeartArt';

const handleLoverRequestPress = () => {
  Actions.createloverrequest();
};

class DashboardNoRelationship extends PureComponent {
  static propTypes = {
    loverRequestId: PropTypes.string,
    loverRequestFirstName: PropTypes.string,
    loverRequestLastName: PropTypes.string,
    loverRequestCreatedAt: PropTypes.string,
    cancelLoverRequest: PropTypes.func.isRequired,
    resendLoverRequestEmail: PropTypes.func.isRequired,
    isCancelLoverRequestInFlight: PropTypes.bool.isRequired,
    cancelLoverRequestError: PropTypes.string.isRequired,
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
    if (!this.isInFlight()) {
      this.props.cancelLoverRequest(this.props.loverRequestId);
    }
  };
  handleResendLoverRequest = () => {
    if (!this.isInFlight()) {
      this.props.resendLoverRequestEmail(this.props.loverRequestId);
    }
  };
  isInFlight = () =>
    this.props.isResendRequestEmailInFlight ||
    this.props.isCancelLoverRequestInFlight;

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
      props: {
        loverRequestFirstName,
        loverRequestLastName,
        loverRequestCreatedAt,
        isCancelLoverRequestInFlight,
        cancelLoverRequestError,
        isResendRequestEmailInFlight,
        resendLoverRequestEmailError,
      },
      state: { isLoverRequestResent },
      handleCancelLoverRequest,
      handleResendLoverRequest,
    } = this;
    const isLoverRequestSent =
      _.isString(loverRequestCreatedAt) && loverRequestCreatedAt.length > 0;

    return (
      <View style={scene.content}>
        <View style={[scene.contentTop, styles.contentTop]}>
          {isLoverRequestSent ? (
            <Fragment>
              <Text style={[scene.largeCopy, scene.textCenter]}>
                You sent a lover request to
              </Text>
              <Text
                style={[
                  scene.titleCopy,
                  scene.textCenter,
                  scene.gutterHalfTop,
                ]}>
                {`${loverRequestFirstName} ${loverRequestLastName}`}
              </Text>
              <Text
                style={[
                  scene.largeCopy,
                  scene.textCenter,
                  scene.gutterHalfTop,
                ]}>
                {moment(loverRequestCreatedAt).fromNow()}
              </Text>
            </Fragment>
          ) : (
            <Fragment>
              <HeartArt fill={vars.blueGrey100} scale={0.1} />
              <Text
                style={[scene.titleCopy, scene.textCenter, styles.titleCopy]}>
                Welcome to Luvup!
              </Text>
              <Text
                style={[scene.largeCopy, scene.textCenter, styles.sloganCopy]}>
                Reinvest in Your Relationship
              </Text>
              <Text
                style={[scene.largeCopy, scene.textCenter, styles.promptCopy]}>
                The first step is to connect with your lover (digitally)
              </Text>
              <Text
                style={[
                  scene.bodyCopy,
                  scene.textCenter,
                  styles.subPromptCopy,
                ]}>
                Choose an option below to get things started
              </Text>
            </Fragment>
          )}
        </View>
        <View style={scene.contentBottom}>
          {isLoverRequestSent ? (
            <Fragment>
              {isLoverRequestResent ? (
                <Text style={styles.resentText}>Resent</Text>
              ) : (
                <Button
                  onPress={handleResendLoverRequest}
                  containerViewStyle={[buttons.infoContainer, styles.button]}
                  buttonStyle={buttons.infoSkeletonButton}
                  textStyle={buttons.infoSkeletonText}
                  title={isResendRequestEmailInFlight ? 'Resending…' : 'Resend'}
                />
              )}
              <Button
                onPress={handleCancelLoverRequest}
                containerViewStyle={[buttons.infoContainer, scene.gutterTop]}
                buttonStyle={buttons.secondarySkeletonButton}
                textStyle={buttons.secondarySkeletonText}
                title={isCancelLoverRequestInFlight ? 'Canceling…' : 'Cancel'}
              />
            </Fragment>
          ) : (
            <Button
              onPress={handleLoverRequestPress}
              containerViewStyle={[buttons.infoContainer, styles.button]}
              buttonStyle={buttons.infoButton}
              textStyle={buttons.infoText}
              title="Search for Your Lover"
            />
          )}
        </View>
      </View>
    );
  }
}

export default DashboardNoRelationship;
