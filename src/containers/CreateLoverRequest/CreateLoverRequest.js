import React, { Component } from 'react';
// import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import config from '../../config.js';
import Template from './CreateLoverRequest.template';
// import {
//   reauth as reauthAction,
//   getMe as getMeAction,
// } from '../../redux/user/user.actions';

class CreateLoverRequest extends Component {
  static propTypes = {};

  state = {
    search: ''
  }

  onSearchChange = search => this.setState({ search });

  render() {
    return <Template
      onSearchChange={this.onSearchChange}
      {...this.state}
    />;
  };
};

export default connect(
  null,
  {

  }
)(CreateLoverRequest);
