import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import {
  getMe as getMeAction,
} from '../../redux/user/user.actions';

class UserLoginRouteSwitch extends PureComponent {
  static propTypes = {
    relationshipId: PropTypes.string,
    loverRequestId: PropTypes.string,
    receivedLoverRequests: PropTypes.array,
    getMe: PropTypes.func.isRequired,
  }

  redirectUser = async () => {
    console.log('onReauthSuccess');
    const meRes = await this.props.getMe();

    if (!('body' in meRes)) {
      Actions.login();
    } else if (this.props.relationshipId || this.props.loverRequestId) {
      console.log('goto dashboard');
      Actions.dashboard();
    } else if (_.isArray(this.props.receivedLoverRequests) && this.props.receivedLoverRequests.length > 0) {
      //show received lover request
      Actions.confirmLoverRequest();
    } else {
      Actions.createloverrequest();
    }
  };

  componentDidMount() {
    this.redirectUser();
  }

  render() {
    return false;
  }
}

export default connect(
  state => ({
    relationshipId: state.relationship.id,
    loverRequestId: state.loverRequest.id,
    receivedLoverRequests: state.receivedLoverRequests.rows,
  }),
  {
    getMe: getMeAction,
  }
)(UserLoginRouteSwitch);
