import React, { Component } from 'react';
import superagent from 'superagent';
// import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import config from '../../config.js';
import Template from './CreateLoverRequest.template';
import TemplateSelectedUser from './CreateLoverRequest.template.selectedUser';
// import {
//   reauth as reauthAction,
//   getMe as getMeAction,
// } from '../../redux/user/user.actions';

class CreateLoverRequest extends Component {
  static propTypes = {};

  state = {
    search: '',
    error: '',
    users: [],
    selectedUser: null,
    isInFlight: false,
  };

  onListItemClick = selectedUserId => this.setState({ selectedUser: this.state.users.find(user => user.id === selectedUserId) });

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

  render() {
    if (!this.state.selectedUser) {
      return <Template
        onSearchChange={this.onSearchChange}
        onListItemClick={this.onListItemClick}
        {...this.state}
      />;
    } else {
      return <TemplateSelectedUser
        {...this.state}
      />;
    }
  };
};

export default connect(
  null,
  {

  }
)(CreateLoverRequest);
