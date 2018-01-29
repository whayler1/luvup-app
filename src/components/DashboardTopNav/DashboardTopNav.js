import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Template from './DashboardTopNav.template';

export default class DashboardTopNav extends Component {
  static props = {
    coinCount: PropTypes.number,
  };

  render() {
    return <Template
      {...this.props}
    />;
  }
};
