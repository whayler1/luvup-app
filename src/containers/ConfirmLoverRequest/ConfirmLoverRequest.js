import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import { cancelLoverRequest as cancelLoverRequestAction } from '../../redux/loverRequest/loverRequest.actions';
import { getReceivedLoverRequests as getReceivedLoverRequestsAction} from '../../redux/receivedLoverRequests/receivedLoverRequests.actions';
import Template from './ConfirmLoverRequest.template';

class ConfirmLoverRequest extends Component {
  static propTypes = {
    receivedLoverRequests: PropTypes.array,
    loverRequestId: PropTypes.string,
    relationshipId: PropTypes.string,
    cancelLoverRequest: PropTypes.func.isRequired,
    getReceivedLoverRequests: PropTypes.func.isRequired,
  };

  state = {
    currentLoverRequestId: '',
    senderFirstName: '',
    senderLastName: '',
    isInFlight: false,
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
  }

  componentWillMount() {
    this.setCurrentLoverRequest();
  }

  render() {
    return <Template
      {...this.state}
      cancelLoverRequest={this.cancelLoverRequest}
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
  }
)(ConfirmLoverRequest);
