import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Font } from 'expo';

import Template from './Root.template';
import {
  userLoginRouteSwitch,
  registerForPushNotifications,
} from '../../helpers';
import { reauth as reauthAction } from '../../redux/user/user.actions';
import { setIsFontLoaded as setIsFontLoadedAction } from '../../redux/font/font.actions';

class Root extends Component {
  static propTypes = {
    id: PropTypes.string,
    isFontLoaded: PropTypes.bool,
    reauth: PropTypes.func.isRequired,
    setIsFontLoaded: PropTypes.func.isRequired,
  };

  reauth = async id_token => {
    await this.props.reauth(id_token);

    if (this.props.id) {
      registerForPushNotifications();
      userLoginRouteSwitch();
    } else {
      Actions.reset('login');
    }
  };

  componentDidMount = async () => {
    await Font.loadAsync({
      yesteryear: require('../../fonts/yesteryear/yesteryear.ttf'),
      quicksandregular: require('../../fonts/Quicksand/Quicksand-Regular.ttf'),
      quicksandbold: require('../../fonts/Quicksand/Quicksand-Bold.ttf'),
    });

    this.props.setIsFontLoaded(true);

    const id_token = await AsyncStorage.getItem('id_token');

    if (id_token) {
      this.reauth(id_token);
    } else {
      Actions.reset('login');
    }
  };

  render() {
    return <Template isFontLoaded={this.props.isFontLoaded} />;
  }
}

export default connect(
  state => ({
    id: state.user.id,
    loverRequestId: state.loverRequest.id,
    relationshipId: state.relationship.id,
    isFontLoaded: state.font.isFontLoaded,
    receivedLoverRequests: state.receivedLoverRequests.rows,
  }),
  {
    reauth: reauthAction,
    setIsFontLoaded: setIsFontLoadedAction,
  }
)(Root);
