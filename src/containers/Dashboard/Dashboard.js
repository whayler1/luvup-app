import React, { Component } from 'react';

import config from '../../config.js';
import Template from './Dashboard.template';

export default class Dashboard extends Component {
  state = {};

  render() {
    return <Template
      {...this.state}
    />
  }
}
