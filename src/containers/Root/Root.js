import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import superagent from 'superagent';
import { Actions } from 'react-native-router-flux';

import config from '../../config.js';
import Template from './Root.template';

export default class Root extends Component {

  reauth = async id_token => {
    try {
      const res = await superagent.post(`${config.baseUrl}/reauth`)
        .send({ id_token });

      const { body } = res;
      // set user and go to dashboard
      console.log('\n\n --- body', body);
    } catch (err) {
      console.log('\n\n --- reauth failed', err);
      Actions.login();
    }
  };

  componentWillMount = async () => {
    const id_token = await AsyncStorage.getItem('id_token');

    if (id_token) {
      this.reauth();
    } else {
      Actions.login();
    }
  };

  render() {
    return <Template/>
  };
}
