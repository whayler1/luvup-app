import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { SafeAreaView, View, Text } from 'react-native';

import { forms, scene, vars } from '../../styles';
import Well from '../../components/Well';
import LoveRequestArt from '../../components/LoveRequestArt';
import Button, { BUTTON_STYLES } from '../../components/Button';
import analytics from '../../services/analytics';
import { cancelLoverRequest as cancelLoverRequestAction } from '../../redux/loverRequest/loverRequest.actions';
import {
  getReceivedLoverRequests as getReceivedLoverRequestsAction,
  acceptLoverRequest as acceptLoverRequestAction,
} from '../../redux/receivedLoverRequests/receivedLoverRequests.actions';
import { getMe as getMeAction } from '../../redux/user/user.actions';

class ConfirmLoverRequest extends Component {
  static propTypes = {
    receivedLoverRequests: PropTypes.array,
    selectedLoverRequestId: PropTypes.string,
    loverRequestId: PropTypes.string,
    relationshipId: PropTypes.string,
    userId: PropTypes.string,
    cancelLoverRequest: PropTypes.func.isRequired,
    getReceivedLoverRequests: PropTypes.func.isRequired,
    acceptLoverRequest: PropTypes.func.isRequired,
    getMe: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentLoverRequestId: '',
      senderFirstName: '',
      senderLastName: '',
      isInFlight: false,
      inFlightType: '',
      error: '',
    };

    if (props.selectedLoverRequestId) {
      const loverRequest = props.receivedLoverRequests.find(
        loverRequest => loverRequest.id === props.selectedLoverRequestId
      );

      if (loverRequest) {
        this.state.currentLoverRequestId = props.selectedLoverRequestId;
        this.state.senderFirstName = loverRequest.sender.firstName;
        this.state.senderLastName = loverRequest.sender.lastName;
      }
    }
  }

  setCurrentLoverRequest = () => {
    const {
      id,
      sender: { firstName, lastName },
    } = this.props.receivedLoverRequests[0];

    this.setState({
      currentLoverRequestId: id,
      senderFirstName: firstName,
      senderLastName: lastName,
      isInFlight: false,
    });
  };

  cancelLoverRequest = async () => {
    this.setState({
      isInFlight: true,
      inFlightType: 'cancel',
      error: '',
    });
    const res = await this.props.cancelLoverRequest(
      this.state.currentLoverRequestId
    );
    if (!_.get(res, 'body.data.cancelLoverRequest.loverRequest')) {
      this.setState({
        isInFlight: false,
        inFlightType: '',
        error: 'cancel',
      });
    }
    await this.props.getReceivedLoverRequests();
    if (!_.get(res, 'body.data.getReceivedLoverRequests')) {
      this.setState({
        isInFlight: false,
        inFlightType: '',
        error: 'get-received',
      });
    }

    if (this.props.receivedLoverRequests.length > 0) {
      this.setCurrentLoverRequest();
    } else if (this.props.relationshipId || this.props.loverRequestId) {
      Actions.reset('dashboard');
    } else {
      Actions.createloverrequest();
    }
  };

  acceptLoverRequest = async () => {
    this.setState({
      isInFlight: true,
      inFlightType: 'accept',
    });
    const res = await this.props.acceptLoverRequest(
      this.state.currentLoverRequestId
    );
    await this.props.getMe();
    const loverRequest = _.get(
      res,
      'body.data.acceptLoverRequest.loverRequest'
    );

    if (_.isObject(loverRequest) && loverRequest.id) {
      Actions.reset('dashboard');
    } else {
      this.setState({
        isInFlight: false,
        inFlightType: '',
        error: 'accept-lover',
      });
    }
  };

  componentDidMount() {
    const { selectedLoverRequestId } = this.props;
    const { currentLoverRequestId } = this.state;
    if (selectedLoverRequestId !== currentLoverRequestId) {
      this.setCurrentLoverRequest();
    }
    analytics.screen({
      userId: this.props.userId,
      name: 'ConfirmLoverRequest',
    });
  }

  render() {
    const {
      props: { selectedLoverRequestId },
      state: {
        currentLoverRequestId,
        senderFirstName,
        senderLastName,
        isInFlight,
        inFlightType,
        error,
      },
      cancelLoverRequest,
      acceptLoverRequest,
    } = this;
    const isSentAndReceivedLoverRequestMatch =
      selectedLoverRequestId === currentLoverRequestId;
    return (
      <SafeAreaView style={scene.container}>
        <View style={scene.content}>
          <View style={scene.contentTop}>
            <View
              style={{
                alignItems: 'center',
                marginBottom: 32,
              }}>
              <LoveRequestArt scale={0.15} fill={vars.blueGrey100} />
            </View>
            <Text style={[scene.largeCopy, scene.textCenter]}>
              {isSentAndReceivedLoverRequestMatch
                ? 'How Convenient!'
                : 'You Received a\nLover Request from'}
            </Text>
            <Text style={[scene.titleCopy, scene.textCenter]}>
              {senderFirstName} {senderLastName}
            </Text>
            {isSentAndReceivedLoverRequestMatch && (
              <Text style={[scene.largeCopy, scene.textCenter]}>
                already sent you a lover request
              </Text>
            )}
            {error === 'accept-lover' && (
              <Well text="There was an error accepting your lover request" />
            )}
            {error === 'cancel' && (
              <Well text="There was an error cancelling your lover request" />
            )}
            {error === 'get-received' && (
              <Well text="There was an error updating your lover request" />
            )}
          </View>
          <View style={scene.contentBottom}>
            <View style={forms.buttonRow}>
              <View style={forms.buttonCell2ColLeft}>
                <Button
                  onPress={cancelLoverRequest}
                  buttonStyles={BUTTON_STYLES.SECONDARY_SKELETON}
                  disabled={isInFlight}
                  isInFlight={inFlightType === 'cancel'}
                  title="Reject"
                />
              </View>
              <View style={forms.buttonCell2ColRight}>
                <Button
                  testID="confirm-user-accept-button"
                  onPress={acceptLoverRequest}
                  disabled={isInFlight}
                  isInFlight={inFlightType === 'accept'}
                  title="Accept"
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    receivedLoverRequests: state.receivedLoverRequests.rows,
    loverRequestId: state.loverRequest.id,
    relationshipId: state.relationship.id,
    userId: state.user.id,
  }),
  {
    cancelLoverRequest: cancelLoverRequestAction,
    getReceivedLoverRequests: getReceivedLoverRequestsAction,
    acceptLoverRequest: acceptLoverRequestAction,
    getMe: getMeAction,
  }
)(ConfirmLoverRequest);
