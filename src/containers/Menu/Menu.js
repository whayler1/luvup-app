import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import analytics from '../../services/analytics';
import Template from './Menu.template';
import { logout as logoutAction } from '../../redux/user/user.actions';
import { endRelationship as endRelationshipAction } from '../../redux/relationship/relationship.actions';

class Menu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      relationshipCreatedAtFormatted: moment(new Date(props.relationshipCreatedAt)).format('MMM DD, YYYY'),
      isModalVisible: false,
      modalType: '',
      isInFlight: false,
      error: '',
    };
  };

  static propTypes = {
    userFirstName: PropTypes.string,
    userLastName: PropTypes.string,
    userEmail: PropTypes.string,
    userId: PropTypes.string,
    loverFirstName: PropTypes.string,
    loverLastName: PropTypes.string,
    relationshipCreatedAt: PropTypes.string,
    logout: PropTypes.func.isRequired,
    endRelationship: PropTypes.func.isRequired,
  };

  goBack = () => {
    Actions.pop();
  }

  onChangePasswordClick = () => this.setState({
    isModalVisible: true,
    modalType: 'changePassword',
  });
  openEndRelationshipModal = () => this.setState({
    isModalVisible: true,
    modalType: 'endRelationship',
  });
  closeModal = () => this.setState({ isModalVisible: false });

  onLogout = async () => {

    await this.props.logout();

    Actions.login();
  };

  endRelationship = async () => {
    this.setState({ isInFlight: true });
    const res = await this.props.endRelationship();
    const relationship = _.at(res, 'body.data.endRelationship.relationship')[0];
    if (_.isObject(relationship) && relationship.id) {
      this.setState({
        isModalVisible: false,
      }, () => Actions.createloverrequest());
    } else {
      this.setState({
        error: 'end-relationship',
        isInFlight: false,
      });
    }
  }

  componentDidMount() {
    analytics.screen({
      userId: this.props.userId,
      name: 'Menu',
    });
  }

  render() {
    return <Template
      {...this.props}
      {...this.state}
      goBack={this.goBack}
      onChangePasswordClick={this.onChangePasswordClick}
      openEndRelationshipModal={this.openEndRelationshipModal}
      closeModal={this.closeModal}
      onLogout={this.onLogout}
      endRelationship={this.endRelationship}
    />;
  }
}

export default connect(
  state => ({
    userFirstName: state.user.firstName,
    userLastName: state.user.lastName,
    userEmail: state.user.email,
    userId: state.user.id,
    loverFirstName: state.lover.firstName,
    loverLastName: state.lover.lastName,
    relationshipCreatedAt: state.relationship.createdAt,
  }),
  {
    logout: logoutAction,
    endRelationship: endRelationshipAction,
  }
)(Menu);
