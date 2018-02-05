import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Template from './Menu.template';
import { logout as logoutAction } from '../../redux/user/user.actions';

class Menu extends PureComponent {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  goToDashboard = () => Actions.dashboard();

  logout = async () => {
    await this.props.logout();
    Actions.login();
  };

  render() {
    return <Template
      logout={this.logout}
      goToDashboard={this.goToDashboard}
    />;
  }
}

export default connect(
  undefined,
  {
    logout: logoutAction
  }
)(Menu);
