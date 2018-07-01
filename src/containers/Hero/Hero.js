import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Animated, Easing, PanResponder } from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { AlertIOS } from 'react-native';

import Template from './Hero.template';
import {
  createRelationshipScore as createRelationshipScoreAction,
} from '../../redux/relationshipScore/relationshipScore.actions';
import {
  refreshSentCoinCount as refreshSentCoinCountAction,
  sendCoin as sendCoinAction,
} from '../../redux/coin/coin.actions';
import {
  refreshSentJalapenoCount as refreshSentJalapenoCountAction,
  sendJalapeno as sendJalapenoAction,
} from '../../redux/jalapeno/jalapeno.actions';
import {
  cancelLoverRequest as cancelLoverRequestAction,
  resendLoverRequestEmail as resendLoverRequestEmailAction,
} from '../../redux/loverRequest/loverRequest.actions';
import config from '../../config';

class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dragDirection: 0,
      isInRelationship: props.relationshipId.length > 0,
      loverRequestCreatedAtTimeAgo: props.loverRequestCreatedAt ?
        moment(new Date(props.loverRequestCreatedAt)).fromNow() : '',
      error: '',
      isCancelInFlight: false,
      resendIsInFlight: false,
      isResendSuccess: false,
    };

    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {

        this.scaleBGHeart.setValue(1);
        this.springScaleTouch();
        this.showDirections();
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        const { dy } = gestureState;
        this.translateY.setValue(dy);
        this.scale.setValue((-dy / 700) + 1);

        if (dy < -3) {
          this.setDragDirection(1);
          this.hideDirections();
        } else if ( dy > 3) {
          this.setDragDirection(-1);
          this.hideDirections();
        } else {
          this.setDragDirection(0);
        }

        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {

        this.springY();
        this.springScaleBack();
        this.hideDirections();

        const { dy } = gestureState;
        const { swipeThreshold } = config;

        if (dy < -swipeThreshold) {
          this.sendCoin();
        } else if (dy > swipeThreshold) {
          // this.setState({
          //   recentlySentJalapenoCount: this.state.recentlySentJalapenoCount + 1
          // }, this.sendJalapeno);
          this.sendJalapeno();
        }

        this.setDragDirection(0);
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
    });
  };

  static propTypes = {
    relationshipId: PropTypes.string,
    relationshipScore: PropTypes.number,
    refreshSentCoinCount: PropTypes.func.isRequired,
    refreshSentJalapenoCount: PropTypes.func.isRequired,
    createRelationshipScore: PropTypes.func.isRequired,
    sendCoin: PropTypes.func.isRequired,
    sendJalapeno: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    cancelLoverRequest: PropTypes.func.isRequired,
    resendLoverRequestEmail: PropTypes.func.isRequired,
    relationshipScore: PropTypes.number,
    relationshipScoreQuartile: PropTypes.number,
    sentCoins: PropTypes.array,
    sentJalapenos: PropTypes.array,
    loverRequestFirstName: PropTypes.string,
    loverRequestLastName: PropTypes.string,
    loverRequestCreatedAt: PropTypes.string,
    loverRequestId: PropTypes.string,
    recentlySentCoinCount: PropTypes.number.isRequired,
    recentlySentJalapenoCount: PropTypes.number.isRequired,
  };

  translateY = new Animated.Value(0);
  scale = new Animated.Value(1);
  scaleBGHeart = new Animated.Value(1);
  coinTranslateY = new Animated.Value(0);
  coinOpacity = new Animated.Value(0);
  jalapenoTranslateY = new Animated.Value(0);
  jalapenoOpacity = new Animated.Value(0);
  directionsOpacity = new Animated.Value(0);

  /**
   * JW: This logic could probably be simplified somehow. But works-for-now™
   */
  isMaxItemsPerHourSent = (items) => items.length < config.maxItemsPerHour || (items.length >= config.maxItemsPerHour && moment(new Date(items[config.maxItemsPerHour - 1].createdAt)).isBefore(moment().subtract(1, 'hour')));

  resendLoverRequestEmail = async () => {
    await new Promise(resolve => this.setState({
      resendIsInFlight: true,
      error: '',
    }, () => resolve()));
    const res = await this.props.resendLoverRequestEmail(this.props.loverRequestId);
    const resendLoverRequestEmailObj = _.at(res, 'body.data.resendLoverRequestEmail')[0];

    if (_.isObject(resendLoverRequestEmailObj) && resendLoverRequestEmailObj.success) {
      this.setState({
        resendIsInFlight: false,
        isResendSuccess: true,
      });
    } else {
      this.setState({
        resendIsInFlight: false,
        error: 'resend-error',
      });
    }
  }

  cancelLoverRequest = async () => {
    await new Promise(resolve => this.setState({
      isCancelInFlight: true,
      error: '',
    }, () => resolve()));
    const res = await this.props.cancelLoverRequest(this.props.loverRequestId);

    const loverRequest = _.at(res, 'body.data.cancelLoverRequest.loverRequest')[0];

    if (_.isObject(loverRequest) && 'id' in loverRequest) {
      Actions.createloverrequest();
    } else {
      this.setState({
        isCancelInFlight: false,
        error: 'cancel-error',
      });

    }
  };

  sendCoin = async () => {
    const { sentCoins } = this.props;

    if (this.isMaxItemsPerHourSent(sentCoins)) {
      this.fireCoin();
      const res = await this.props.sendCoin();
      if (_.isError(res)) {
        AlertIOS.alert('There was an error sending your Luvup. Please make sure you are connected to wifi or cellular data.');
      }
    } else {
      this.props.openModal('coin');
    }
  };

  sendJalapeno = async () => {
    const { sentJalapenos } = this.props;

    if (this.isMaxItemsPerHourSent(sentJalapenos)) {
      this.fireJalapeno();
      const res = await this.props.sendJalapeno();
      if (_.isError(res)) {
        AlertIOS.alert('There was an error sending your jalapeno. Please make sure you are connected to wifi or cellular data.');
      }
    } else {
      this.props.openModal('jalapeno');
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
      this.scaleBGHeart,
      {
        toValue: 1,
        friction: 4
      }
    ).start()
  };

  springScaleTouch() {
    Animated.spring(
      this.scaleBGHeart,
      {
        toValue: 1.05,
        friction: 3,
      }
    ).start();
  };

  fireCoin() {
    this.coinTranslateY.setValue(0);
    this.coinOpacity.setValue(1);

    Animated.sequence([
      Animated.timing(
        this.coinTranslateY,
        {
          toValue: -160,
          duration: 250,
          easing: Easing.out(Easing.ease),
        }
      ),
      Animated.parallel([
        Animated.timing(
          this.coinOpacity,
          {
            toValue: 0,
            duration: 250,
            delay: 250,
            easing: Easing.inOut(Easing.linear)
          }
        ),
        Animated.timing(
          this.coinTranslateY,
          {
            toValue: -200,
            duration: 250,
            delay: 250,
            easing: Easing.inOut(Easing.linear)
          }
        ),
      ]),
    ]).start();
  }

  fireJalapeno() {
    this.jalapenoTranslateY.setValue(0);
    this.jalapenoOpacity.setValue(1);

    Animated.sequence([
      Animated.timing(
        this.jalapenoTranslateY,
        {
          toValue: 180,
          duration: 250,
          easing: Easing.out(Easing.ease),
        }
      ),
      Animated.parallel([
        Animated.timing(
          this.jalapenoOpacity,
          {
            toValue: 0,
            duration: 250,
            delay: 250,
            easing: Easing.inOut(Easing.linear)
          }
        ),
        Animated.timing(
          this.jalapenoTranslateY,
          {
            toValue: 220,
            duration: 250,
            delay: 250,
            easing: Easing.inOut(Easing.linear)
          }
        ),
      ]),
    ]).start();
  }

  showDirections() {
    Animated.timing(
      this.directionsOpacity,
      {
        toValue: 1,
        duration: 250,
        delay: 250,
        easing: Easing.inOut(Easing.linear)
      }
    ).start();
  }
  hideDirections() {
    Animated.timing(
      this.directionsOpacity,
      {
        toValue: 0,
        duration: 250,
        easing: Easing.inOut(Easing.linear)
      }
    ).start();
  }

  setDragDirection = dragDirection => this.state.dragDirection !== dragDirection && this.setState({ dragDirection });

  setRecentlySentCount = (collection, keyStr) => {
    const anHrAgo = moment().subtract(1, 'hour');
    let count = 0;

    for (let i = 0; i < collection.length; i++) {
      if (moment(new Date(collection[i].createdAt)).isAfter(anHrAgo)) {
        count++;
      } else {
        break;
      }
    }
    this.setState({ [keyStr]: count });
  };

  componentDidMount() {
    this.props.createRelationshipScore();
    this.props.refreshSentCoinCount();
    this.props.refreshSentJalapenoCount();
  };

  render() {
    return <Template
      panResponder={this.panResponder}
      translateY={this.translateY}
      scale={this.scale}
      scaleBGHeart={this.scaleBGHeart}
      coinTranslateY={this.coinTranslateY}
      coinOpacity={this.coinOpacity}
      jalapenoTranslateY={this.jalapenoTranslateY}
      closeModal={this.closeModal}
      jalapenoOpacity={this.jalapenoOpacity}
      relationshipScoreQuartile={this.props.relationshipScoreQuartile}
      dragDirection={this.dragDirection}
      directionsOpacity={this.directionsOpacity}
      loverRequestFirstName={this.props.loverRequestFirstName}
      loverRequestLastName={this.props.loverRequestLastName}
      cancelLoverRequest={this.cancelLoverRequest}
      resendLoverRequestEmail={this.resendLoverRequestEmail}
      recentlySentCoinCount={this.props.recentlySentCoinCount}
      recentlySentJalapenoCount={this.props.recentlySentJalapenoCount}
      {...this.state}
    />;
  }
}

export default connect(
  state => ({
    relationshipId: state.relationship.id,
    relationshipScore: state.relationshipScore.score,
    relationshipScoreQuartile: state.relationshipScore.scoreQuartile,
    sentJalapenos: state.jalapeno.sentJalapenos,
    sentCoins: state.coin.sentCoins,
    loverRequestId: state.loverRequest.id,
    loverRequestFirstName: state.loverRequest.firstName,
    loverRequestLastName: state.loverRequest.lastName,
    loverRequestCreatedAt: state.loverRequest.createdAt,
    recentlySentCoinCount: state.coin.recentlySentCoinCount,
    recentlySentJalapenoCount: state.jalapeno.recentlySentJalapenoCount,
  }),
  {
    refreshSentCoinCount: refreshSentCoinCountAction,
    refreshSentJalapenoCount: refreshSentJalapenoCountAction,
    createRelationshipScore: createRelationshipScoreAction,
    sendCoin: sendCoinAction,
    sendJalapeno: sendJalapenoAction,
    cancelLoverRequest: cancelLoverRequestAction,
    resendLoverRequestEmail: resendLoverRequestEmailAction,
  }
)(Hero);
