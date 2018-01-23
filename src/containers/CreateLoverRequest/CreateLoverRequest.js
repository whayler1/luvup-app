import React, { Component } from 'react';
import superagent from 'superagent';
// import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import config from '../../config.js';
import Template from './CreateLoverRequest.template';
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
  };

  getUsers = async () => {
    const { search } = this.state;
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
      // console.log('res.body.data.users.rows', res.body.data.users.rows);

      this.setState({ error: '', users: res.body.data.users.rows }, () => console.log('users', this.state.users));
    } catch (err) {
      console.log('err', err);
      this.setState({ error: 'response' });
    }
  };

  searchDebounce = _.debounce(() => {
    const { search } = this.state;
    if (search.length > 2) {
      this.getUsers()
    } else {
      this.setState({ error: '', users: []});
    }
  }, 500);

  onSearchChange = search => this.setState({ search }, this.searchDebounce);

  render() {
    return <Template
      onSearchChange={this.onSearchChange}
      {...this.state}
    />;
  };
};

export default connect(
  null,
  {

  }
)(CreateLoverRequest);
