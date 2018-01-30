import React, { Component } from 'react';
import { PanResponder, Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { logout as logoutAction } from '../../redux/user/user.actions';
import {
  sendCoin as sendCoinAction,
  getCoinCount as getCoinCountAction
} from '../../redux/coin/coin.actions';
import {
  sendJalapeno as sendJalapenoAction,
  getJalapenoCount as getJalapenoCountAction,
} from '../../redux/jalapeno/jalapeno.actions';

import config from '../../config.js';
import Template from './Dashboard.template';

class Dashboard extends Component {
  static propTypes = {
    userFirstName: PropTypes.string.isRequired,
    userLastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    loverFirstName: PropTypes.string,
    loverLastName: PropTypes.string,
    loverUsername: PropTypes.string,
    loverRequestUsername: PropTypes.string,
    loverRequestCreatedAt: PropTypes.string,
    coinCount: PropTypes.number,
    sentCoin: PropTypes.array,
    sentJalapenos: PropTypes.array,
    logout: PropTypes.func.isRequired,
    getCoinCount: PropTypes.func.isRequired,
    sendCoin: PropTypes.func.isRequired,
    sendJalapeno: PropTypes.func.isRequired,
    getJalapenoCount: PropTypes.func.isRequired,
    jalapenoCount: PropTypes.number,
  };

  state = {
    isModalOpen: false,
    modalMessage: 'luvups',
  };

  translateY = new Animated.Value(0);
  scale = new Animated.Value(1);

  logout = async () => {
    await this.props.logout();
    Actions.login();
  };

  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.setState({ isModalOpen: false });

  /**
   * JW: This logic could probably be simplified somehow. But works-for-now™
   */
  isMaxItemsPerHourSent = (items) => items.length < config.maxItemsPerHour || (items.length >= config.maxItemsPerHour && moment(new Date(items[config.maxItemsPerHour - 1].createdAt)).isBefore(moment().subtract(1, 'hour')));

  sendCoin = async () => {
    const { sentCoins } = this.props;

    if (this.isMaxItemsPerHourSent(sentCoins)) {
      const res = await this.props.sendCoin();
      console.log('sendCoin', this.props.sentCoins);
    } else {
      this.setState({
        modalMessage: 'luvups',
        isModalOpen: true,
      });
      console.log('cant send more coins', moment().subtract(1, 'hour'));
    }

  };

  sendJalapeno = async () => {
    const { sentJalapenos } = this.props;

    if (this.isMaxItemsPerHourSent(sentJalapenos)) {
      const res = await this.props.sendJalapeno();
      console.log('sendJalapeno', res.body.data);
    } else {
      this.setState({
        modalMessage: 'jalapenos',
        isModalOpen: true,
      });
      console.log('cant send more jalapenos');
    }
  }

  springY() {
    Animated.spring(
      this.translateY,
      {
        toValue: 0,
        friction: 4
      }
    ).start()
  };

  springScaleBack() {
    Animated.spring(
      this.scale,
      {
        toValue: 1,
        friction: 4
      }
    ).start()
  };

  springScaleTouch() {
    Animated.spring(
      this.scale,
      {
        toValue: 1.05,
        friction: .5,
      }
    ).start();
  }

  componentWillMount() {
    this.props.getCoinCount();
    this.props.getJalapenoCount();

    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        console.log('grant');
        this.springScaleTouch();
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // console.log('move', gestureState.vy);
        this.translateY.setValue(gestureState.dy);
        this.scale.setValue((-gestureState.dy / 700) + 1);

        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        console.log('release', gestureState.dy);
        this.springY();
        this.springScaleBack();

        const { dy } = gestureState;
        const { swipeThreshold } = config;

        if (dy < -swipeThreshold) {
          this.sendCoin();
        }
        if (dy > swipeThreshold) {
          this.sendJalapeno();
        }
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
      userFirstName={this.props.userFirstName}
      userLastName={this.props.userLastName}
      username={this.props.username}
      loverFirstName={this.props.loverFirstName}
      loverLastName={this.props.loverLastName}
      loverUsername={this.props.loverUsername}
      loverRequestUsername={this.props.loverRequestUsername}
      loverRequestCreatedAt={this.props.loverRequestCreatedAt}
      coinCount={this.props.coinCount}
      jalapenoCount={this.props.jalapenoCount}
      logout={this.logout}
      panResponder={this.panResponder}
      translateY={this.translateY}
      scale={this.scale}
      closeModal={this.closeModal}
      {...this.state}
    />;
  }
}

export default connect(
  state => ({
    userFirstName: state.user.firstName,
    userLastName: state.user.lastName,
    username: state.user.username,
    loverFirstName: state.lover.firstName,
    loverLastName: state.lover.lastName,
    loverUsername: state.lover.username,
    loverRequestUsername: state.loverRequest.username,
    loverRequestCreatedAt: state.loverRequest.createdAt,
    sentCoins: state.coin.sentCoins,
    coinCount: state.coin.count,
    sentJalapenos: state.jalapeno.sentJalapenos,
    jalapenoCount: state.jalapeno.count,
  }),
  {
    logout: logoutAction,
    getCoinCount: getCoinCountAction,
    sendCoin: sendCoinAction,
    sendJalapeno: sendJalapenoAction,
    getJalapenoCount: getJalapenoCountAction
  }
)(Dashboard);
