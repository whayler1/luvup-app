import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import superagent from 'superagent';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import config from '../../config.js';
import Template from './Root.template';
import { reauth as reauthAction } from '../../redux/user/user.actions';

class Root extends Component {
  static propTypes = {
    id: PropTypes.string,
    reauth: PropTypes.func.isRequired,
  };

  reauth = async id_token => {
    const res = await this.props.reauth(id_token);

    if (this.props.id) {
      Actions.dashboard();
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
  }),
  {
    reauth: reauthAction,
  }
)(Root);
