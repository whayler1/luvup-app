import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Font } from 'expo';

import config from '../../config.js';
import Template from './Root.template';
import {
  reauth as reauthAction,
  getMe as getMeAction,
} from '../../redux/user/user.actions';
import {
  setIsFontLoaded as setIsFontLoadedAction,
} from '../../redux/font/font.actions';


class Root extends Component {
  static propTypes = {
    id: PropTypes.string,
    loverRequestId: PropTypes.string,
    relationshipId: PropTypes.string,
    isFontLoaded: PropTypes.bool,
    reauth: PropTypes.func.isRequired,
    getMe: PropTypes.func.isRequired,
    setIsFontLoaded: PropTypes.func.isRequired,
  };

  /**
   * JW: This method is identical to `onSubmitSuccess` in Login. Find a way to
   * DRY this up.
   */
  onReauthSuccess = async () => {
    console.log('onReauthSuccess');
    const meRes = await this.props.getMe();

    if (this.props.relationshipId || this.props.loverRequestId) {
      console.log('goto dashboard');
      Actions.menu();
    } else {
      Actions.createloverrequest();
    }
  };

  reauth = async id_token => {
    console.log('reauth');
    const res = await this.props.reauth(id_token);

    if (this.props.id) {
      console.log('success');
      this.onReauthSuccess();
    } else {
      console.log('fail');
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

  async componentDidMount() {
    await Font.loadAsync({
      'yesteryear': require('../../fonts/yesteryear/yesteryear.ttf'),
      'latoregular': require('../../fonts/lato/latoregular.ttf'),
      'latoblack': require('../../fonts/lato/latoblack.ttf'),
    });

    this.props.setIsFontLoaded(true);
  }

  render() {
    return <Template
      isFontLoaded={this.props.isFontLoaded}
    />;
  };
}

export default connect(
  state => ({
    id: state.user.id,
    loverRequestId: state.loverRequest.id,
    relationshipId: state.relationship.id,
    isFontLoaded: state.font.isFontLoaded,
  }),
  {
    reauth: reauthAction,
    getMe: getMeAction,
    setIsFontLoaded: setIsFontLoadedAction,
  }
)(Root);
