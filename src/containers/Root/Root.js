import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import config from '../../config.js';
import Template from './Root.template';
import {
  reauth as reauthAction,
  getMe as getMeAction,
} from '../../redux/user/user.actions';

class Root extends Component {
  static propTypes = {
    id: PropTypes.string,
    relationshipId: PropTypes.string,
    reauth: PropTypes.func.isRequired,
    getMe: PropTypes.func.isRequired,
  };

  onReauthSuccess = async () => {
    const meRes = await this.props.getMe();
    console.log('meRes', meRes.body.data.me);

    if (!this.props.relationshipId) {
      Actions.createloverrequest();
    } else {
      Actions.dashboard();
    }
  };

  reauth = async id_token => {
    const res = await this.props.reauth(id_token);

    if (this.props.id) {
      this.onReauthSuccess();
    } else {
      Actions.login();
    }
  };

  componentWillMount = async () => {
    const id_token = await AsyncStorage.getItem('id_token');

    if (id_token) {
      this.reauth();
    } else {
      Actions.login();
    }
  };

  render() {
    return <Template/>
  };
}

export default connect(
  state => ({
    id: state.user.id,
    relationshipId: state.relationship.id
  }),
  {
    reauth: reauthAction,
    getMe: getMeAction,
  }
)(Root);
