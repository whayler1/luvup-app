import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import Template from './DashboardTopNav.template';

export default class DashboardTopNav extends Component {
  static props = {
    coinCount: PropTypes.number,
    jalapenoCount: PropTypes.number,
    userFirstName: PropTypes.string,
    userLastName: PropTypes.string,
    loverFirstName: PropTypes.string,
    loverLastName: PropTypes.string,
  };

  onScoreClick = () => Actions.timeline();
  onInitialsClick = () => Actions.menu();

  render() {
    return (
      <Template
        onScoreClick={this.onScoreClick}
        onInitialsClick={this.onInitialsClick}
        {...this.props}
      />
    );
  }
}
