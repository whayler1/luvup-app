import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logout as logoutAction } from '../../redux/user/user.actions';
import PropTypes from 'prop-types';

import config from '../../config.js';
import Template from './Dashboard.template';

class Dashboard extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
  };

  state = {};

  logout = async () => {
    await this.props.logout();
    Actions.login();
  };

  render() {
    return <Template
      username={this.props.username}
      logout={this.logout}
      {...this.state}
    />
  }
}

export default connect(
  state => ({
    username: state.user.username,
  }),
  {
    logout: logoutAction
  }
)(Dashboard);
