import React, { Component } from 'react';
import { PanResponder } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logout as logoutAction } from '../../redux/user/user.actions';
import PropTypes from 'prop-types';

import config from '../../config.js';
import Template from './Dashboard.template';

class Dashboard extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    loverUsername: PropTypes.string,
    loverRequestUsername: PropTypes.string,
    loverRequestCreatedAt: PropTypes.string,
    logout: PropTypes.func.isRequired,
  };

  state = {
    translateY: 0,
    scale: 1,
  };

  logout = async () => {
    await this.props.logout();
    Actions.login();
  };

  componentWillMount() {
    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        console.log('grant');
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log('move', gestureState);
        this.setState({
          translateY: gestureState.dy,
          scale: (-gestureState.dy / 700) + 1
        });
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        console.log('release');
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        console.log('terminate');
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        console.log('blocknative');
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  };

  render() {
    return <Template
      username={this.props.username}
      loverUsername={this.props.loverUsername}
      loverRequestUsername={this.props.loverRequestUsername}
      loverRequestCreatedAt={this.props.loverRequestCreatedAt}
      logout={this.logout}
      panResponder={this.panResponder}
      {...this.state}
    />;
  }
}

export default connect(
  state => ({
    username: state.user.username,
    loverUsername: state.lover.username,
    loverRequestUsername: state.loverRequest.username,
    loverRequestCreatedAt: state.loverRequest.createdAt,
  }),
  {
    logout: logoutAction
  }
)(Dashboard);
