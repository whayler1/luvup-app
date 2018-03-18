import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import { cancelLoverRequest as cancelLoverRequestAction } from '../../redux/loverRequest/loverRequest.actions';
import {
  getReceivedLoverRequests as getReceivedLoverRequestsAction,
  acceptLoverRequest as acceptLoverRequestAction,
} from '../../redux/receivedLoverRequests/receivedLoverRequests.actions';
import {
  getMe as getMeAction,
} from '../../redux/user/user.actions';
import Template from './ConfirmLoverRequest.template';

class ConfirmLoverRequest extends Component {
  static propTypes = {
    receivedLoverRequests: PropTypes.array,
    loverRequestId: PropTypes.string,
    relationshipId: PropTypes.string,
    cancelLoverRequest: PropTypes.func.isRequired,
    getReceivedLoverRequests: PropTypes.func.isRequired,
    acceptLoverRequest: PropTypes.func.isRequired,
    getMe: PropTypes.func.isRequired,
  };

  state = {
    currentLoverRequestId: '',
    senderFirstName: '',
    senderLastName: '',
    isInFlight: false,
    inFlightType: '',
  }

  setCurrentLoverRequest = () => {
    const { id, sender: { firstName, lastName } } = this.props.receivedLoverRequests[0];
    console.log('\n\n setCurrentLoverRequest', id, firstName, lastName);
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
    });
    const res = await this.props.cancelLoverRequest(this.state.currentLoverRequestId);
    await this.props.getReceivedLoverRequests();
    if (this.props.receivedLoverRequests.length > 0) {
      this.setCurrentLoverRequest();
    } else if (this.props.relationshipId || this.props.loverRequestId) {
      Actions.dashboard();
    } else {
      Actions.createloverrequest();
    }
  };

  acceptLoverRequest = async () => {
    this.setState({
      isInFlight: true,
      inFlightType: 'accept',
    });
    const res = await this.props.acceptLoverRequest(this.state.currentLoverRequestId);
    await this.props.getMe();
    const loverRequest = _.get(res, 'body.data.acceptLoverRequest.loverRequest');

    if (_.isObject(loverRequest) && loverRequest.id) {
      console.log('\n\n redirect to dashboard');
      Actions.dashboard();
    } else {
      this.setState({
        isInFlight: false,
        inFlightType: '',
        error: 'accept-lover',
      })
    }
  };

  componentWillMount() {
    this.setCurrentLoverRequest();
  }

  render() {
    return <Template
      {...this.state}
      cancelLoverRequest={this.cancelLoverRequest}
      acceptLoverRequest={this.acceptLoverRequest}
    />;
  }
}

export default connect(
  state => ({
    receivedLoverRequests: state.receivedLoverRequests.rows,
    loverRequestId: state.loverRequest.id,
    relationshipId: state.relationship.id,
  }),
  {
    cancelLoverRequest: cancelLoverRequestAction,
    getReceivedLoverRequests: getReceivedLoverRequestsAction,
    acceptLoverRequest: acceptLoverRequestAction,
    getMe: getMeAction,
  }
)(ConfirmLoverRequest);
