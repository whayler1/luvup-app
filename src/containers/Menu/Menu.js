import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Template from './Menu.template';

class Menu extends PureComponent {
  static propTypes = {};

  goToDashboard = () => Actions.dashboard();

  render() {
    return <Template
      goToDashboard={this.goToDashboard}
    />;
  }
}

export default connect()(Menu);
