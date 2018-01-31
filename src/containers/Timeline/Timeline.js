import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import Template from './Timeline.template';

class Timeline extends Component {
  static propTypes = {}

  goToDashboard = () => Actions.dashboard();

  render() {
    return <Template
      goToDashboard={this.goToDashboard}
    />;
  }
}

export default connect()(Timeline);
