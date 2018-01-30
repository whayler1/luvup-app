import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  render() {
    return <Template
      {...this.props}
    />;
  }
};
