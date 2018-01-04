import React, { Component } from 'react';
import { View, Text } from 'react-native';
import superagent from 'superagent';

import config from '../../config.js';
import Template from './SignUp.template';


export default class SignUp extends Component {
  state = {};

  render() {
    return <Template />;
  }
};
