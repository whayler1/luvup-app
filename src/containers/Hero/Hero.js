import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Animated, Easing, PanResponder } from 'react-native';
import moment from 'moment';

import Template from './Hero.template';
import {
  createRelationshipScore as createRelationshipScoreAction,
} from '../../redux/relationshipScore/relationshipScore.actions';
import {
  sendCoin as sendCoinAction,
} from '../../redux/coin/coin.actions';
import {
  sendJalapeno as sendJalapenoAction,
} from '../../redux/jalapeno/jalapeno.actions';
import config from '../../config';

class Hero extends Component {
  static propTypes = {
    relationshipScore: PropTypes.number,
    createRelationshipScore: PropTypes.func.isRequired,
    sendCoin: PropTypes.func.isRequired,
    sendJalapeno: PropTypes.func.isRequired,
    relationshipScore: PropTypes.number,
    relationshipScoreQuartile: PropTypes.number,
    sentCoins: PropTypes.array,
    sentJalapenos: PropTypes.array,
  };

  state = {
    isModalOpen: false,
    modalMessage: 'luvups',
    dragDirection: 0,
  };

  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.setState({ isModalOpen: false });

  translateY = new Animated.Value(0);
  scale = new Animated.Value(1);
  coinTranslateY = new Animated.Value(0);
  coinOpacity = new Animated.Value(0);
  jalapenoTranslateY = new Animated.Value(0);
  jalapenoOpacity = new Animated.Value(0);

  /**
   * JW: This logic could probably be simplified somehow. But works-for-now™
   */
  isMaxItemsPerHourSent = (items) => items.length < config.maxItemsPerHour || (items.length >= config.maxItemsPerHour && moment(new Date(items[config.maxItemsPerHour - 1].createdAt)).isBefore(moment().subtract(1, 'hour')));

  sendCoin = async () => {
    const { sentCoins } = this.props;

    if (this.isMaxItemsPerHourSent(sentCoins)) {
      this.fireCoin();
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
      this.fireJalapeno();
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

  setDragDirection = dragDirection => this.state.dragDirection !== dragDirection && this.setState({ dragDirection });

  componentWillMount() {
    this.props.createRelationshipScore();

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
        const { dy } = gestureState;
        this.translateY.setValue(dy);
        this.scale.setValue((-dy / 700) + 1);

        if (dy < 3) {
          this.setDragDirection(1);
        } else if ( dy > 3) {
          this.setDragDirection(-1);
        } else {
          this.setDragDirection(0);
        }

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
        } else if (dy > swipeThreshold) {
          this.sendJalapeno();
        }

        this.setDragDirection(0);
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
    });
  }

  render() {
    const { relationshipScore, relationshipScoreQuartile} = this.props;
    console.log({ relationshipScore, relationshipScoreQuartile});
    return <Template
      panResponder={this.panResponder}
      translateY={this.translateY}
      scale={this.scale}
      coinTranslateY={this.coinTranslateY}
      coinOpacity={this.coinOpacity}
      jalapenoTranslateY={this.jalapenoTranslateY}
      closeModal={this.closeModal}
      jalapenoOpacity={this.jalapenoOpacity}
      relationshipScoreQuartile={this.props.relationshipScoreQuartile}
      dragDirection={this.dragDirection}
      {...this.state}
    />;
  }
}

export default connect(
  state => ({
    relationshipScore: state.relationshipScore.score,
    relationshipScoreQuartile: state.relationshipScore.scoreQuartile,
    sentJalapenos: state.jalapeno.sentJalapenos,
    sentCoins: state.coin.sentCoins,
  }),
  {
    createRelationshipScore: createRelationshipScoreAction,
    sendCoin: sendCoinAction,
    sendJalapeno: sendJalapenoAction,
  }
)(Hero);
