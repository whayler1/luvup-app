import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import Template from './Menu.template';
import { logout as logoutAction } from '../../redux/user/user.actions';

class Menu extends PureComponent {
  static propTypes = {
    userFirstName: PropTypes.string,
    userLastName: PropTypes.string,
    userEmail: PropTypes.string,
    loverFirstName: PropTypes.string,
    loverLastName: PropTypes.string,
    relationshipCreatedAt: PropTypes.string,
    logout: PropTypes.func.isRequired,
  };

  state = {
    relationshipCreatedAtFormatted: undefined,
  };

  goToDashboard = () => Actions.dashboard();

  logout = async () => {
    await this.props.logout();
    Actions.login();
  };

  componentWillMount() {
    const { relationshipCreatedAt } = this.props;
    this.setState({ relationshipCreatedAtFormatted: moment(new Date(relationshipCreatedAt)).format('MMM DD, YYYY') });
  }

  render() {
    return <Template
      {...this.props}
      {...this.state}
      goToDashboard={this.goToDashboard}
    />;
  }
}

export default connect(
  state => ({
    userFirstName: state.user.firstName,
    userLastName: state.user.lastName,
    userEmail: state.user.email,
    loverFirstName: state.lover.firstName,
    loverLastName: state.lover.lastName,
    relationshipCreatedAt: state.relationship.createdAt,
  }),
  {
    logout: logoutAction
  }
)(Menu);
