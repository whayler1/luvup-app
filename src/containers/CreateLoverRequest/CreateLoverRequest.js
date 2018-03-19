import React, { Component } from 'react';
import superagent from 'superagent';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import config from '../../config.js';
import Template from './CreateLoverRequest.template';
import TemplateSelectedUser from './CreateLoverRequest.template.selectedUser';
import { requestLover as requestLoverAction } from '../../redux/loverRequest/loverRequest.actions';

class CreateLoverRequest extends Component {
  static propTypes = {
    relationshipId: PropTypes.string,
    requestLover: PropTypes.func.isRequired,
    userFirstName: PropTypes.string,
    userLastName: PropTypes.string,
  };

  state = {
    search: '',
    error: '',
    users: [],
    selectedUser: null,
    isInFlight: false,
    requestLoverIsInFlight: false,
  };

  clearSelectedUser = () => this.setState({ selectedUser: null });

  onListItemClick = selectedUserId => this.setState({ selectedUser: this.state.users.find(user => user.id === selectedUserId) });

  requestLover = async () => {
    console.log('request lover hit', this.state.selectedUser.id);
    this.setState({ requestLoverIsInFlight: true });
    const res = await this.props.requestLover(this.state.selectedUser.id);

    if(!_.at(res, 'body.data.requestLover.id')) {
      this.setState({ requestLoverIsInFlight: false, error: 'request-lover' });
    } else {
      Actions.dashboard();
    }
  };

  getUsers = async () => {
    const { search } = this.state;
    const { onListItemClick } = this;
    try {
      const res = await superagent.post(config.graphQlUrl, {
        query: `{
          users (
            search: "${search}"
            limit: 10
          ) {
            rows {
              id username firstName lastName
            }
          }
        }`
      });

      this.setState({
        error: '',
        users: res.body.data.users.rows,
        isInFlight: false,
      });
    } catch (err) {
      console.log('err', err);
      this.setState({ error: 'response', isInFlight: false, });
    }
  };

  searchDebounce = _.debounce(() => {
    const { search } = this.state;
    if (search.length > 2) {
      this.getUsers()
    } else {
      this.setState({ error: '', users: [], isInFlight: false, });
    }
  }, 500);

  onSearchChange = search => this.setState({ search, isInFlight: true, }, this.searchDebounce);

  goToMenu = () => Actions.menu();

  render() {
    if (!this.state.selectedUser) {
      return <Template
        onSearchChange={this.onSearchChange}
        onListItemClick={this.onListItemClick}
        userFirstName={this.props.userFirstName}
        userLastName={this.props.userLastName}
        goToMenu={this.goToMenu}
        {...this.state}
      />;
    } else {
      return <TemplateSelectedUser
        clearSelectedUser={this.clearSelectedUser}
        requestLover={this.requestLover}
        {...this.state}
      />;
    }
  };
};

export default connect(
  state => ({
      relationshipId: state.relationship.id,
      userFirstName: state.user.firstName,
      userLastName: state.user.lastName,
  }),
  {
    requestLover: requestLoverAction,
  }
)(CreateLoverRequest);
