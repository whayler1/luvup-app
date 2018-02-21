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
    isModalVisible: false,
    modalType: '',
  };

  goToDashboard = () => Actions.dashboard();

  onChangePasswordClick = () => this.setState({
    isModalVisible: true,
    modalType: 'changePassword',
  });
  closeModal = () => this.setState({ isModalVisible: false });

  onLogout = async () => {
    console.log('Menu logout');
    await this.props.logout();
    console.log('got here');
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
      onChangePasswordClick={this.onChangePasswordClick}
      closeModal={this.closeModal}
      onLogout={this.onLogout}
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
