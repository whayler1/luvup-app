import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Animated,
  Easing,
  PanResponder,
  Alert,
  View,
  Text,
} from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import BezierEasing from 'bezier-easing';
import { Ionicons } from '@expo/vector-icons';

import styles from './Hero.styles';
import { vars } from '../../styles';
import HeroEye from '../../components/HeroEye';
import HeroMouth from '../../components/HeroMouth';
import CoinArt from '../../components/CoinArt';
import JalapenoArt from '../../components/JalapenoArt';
import HeartArt, {
  DEFAULT_WIDTH as HEART_WIDTH,
} from '../../components/Art/HeartArt';
import TearDropArt from '../../components/Art/TearDropArt';
import { MODAL_CONTENT_TYPES } from '../../components/LimitExceededModal';

import { createRelationshipScore as createRelationshipScoreAction } from '../../redux/relationshipScore/relationshipScore.actions';
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
import { getReceivedLoverRequests as getReceivedLoverRequestsAction } from '../../redux/receivedLoverRequests/receivedLoverRequests.actions';
import config from '../../config';

const easing = BezierEasing(0, 0, 0.5, 1);

const getEasedDy = (dy, max) => {
  const absDy = Math.abs(dy);
  const fullDy = absDy > max ? max : absDy;
  const dyFract = fullDy / max;
  const easedDy = easing(dyFract) * max;
  const finalDy = dy < 0 ? -easedDy : easedDy;
  return finalDy;
};

const getHeartFillValue = (relationshipScore, easedDy) => {
  let heartFillValue = relationshipScore - easedDy / 2;
  if (heartFillValue > 100) {
    heartFillValue = 100;
  } else if (heartFillValue < 0) {
    heartFillValue = 0;
  }
  return heartFillValue;
};

const screenWidth = Math.round(Dimensions.get('window').width);
const heartWidth = screenWidth - vars.gutterDoubleAndHalf * 2;
const hearthHeight = Math.round(heartWidth * 0.9122807018);
const heartScale = heartWidth / HEART_WIDTH;

const heartArtWidthHeight = {
  width: heartWidth,
  height: hearthHeight,
  // width: 285,
  // height: 260,
};

class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dragDirection: 0,
      isInRelationship: props.relationshipId.length > 0,
      loverRequestCreatedAtTimeAgo: props.loverRequestCreatedAt
        ? moment(new Date(props.loverRequestCreatedAt)).fromNow()
        : '',
      error: '',
      isCancelInFlight: false,
      resendIsInFlight: false,
      isResendSuccess: false,
      isHeartShake: false,
      isHeartCry: false,
    };

    this.heartFill = new Animated.Value(props.relationshipScore || 0);
    this.heartTranslateY = new Animated.Value(0);
    this.tearDropATranslateY = new Animated.Value(0);
    this.tearDropAOpacity = new Animated.Value(0);
    this.tearDropBTranslateY = new Animated.Value(0);
    this.tearDropBOpacity = new Animated.Value(0);
    this.translateY = new Animated.Value(0);
    this.scale = new Animated.Value(1);
    this.scaleBGHeart = new Animated.Value(1);
    this.coinTranslateY = new Animated.Value(0);
    this.coinOpacity = new Animated.Value(0);
    this.jalapenoTranslateY = new Animated.Value(0);
    this.jalapenoOpacity = new Animated.Value(0);
    this.directionsOpacity = new Animated.Value(
      props.isNewRelationship ? 1 : 0
    );

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        this.scaleBGHeart.setValue(1);
        this.springScaleTouch();
        this.showDirections();
      },
      onPanResponderMove: (evt, gestureState) => {
        const max = 80;
        const { dy } = gestureState;
        const easedDy = getEasedDy(dy, max);
        const { isHeartShake, isHeartCry } = this.state;

        this.translateY.setValue(easedDy);
        this.scale.setValue(-easedDy / 700 + 1);
        this.heartFill.setValue(
          getHeartFillValue(this.props.relationshipScore, easedDy)
        );

        if (easedDy === -max && !isHeartShake) {
          this.setState({ isHeartShake: true }, () => {
            this.heartShake();
          });
        } else if (easedDy > -max && isHeartShake) {
          this.setState({ isHeartShake: false }, () => {
            this.heartTranslateY.stopAnimation();
            this.heartTranslateY.setValue(0);
          });
        }

        if (easedDy === max && !isHeartCry) {
          this.setState({ isHeartCry: true }, () => {
            this.heartCry();
          });
        } else if (easedDy < max && isHeartCry) {
          this.setState({ isHeartCry: false }, () => {
            this.cancelHeartCry();
          });
        }

        if (dy < -3) {
          this.setDragDirection(1);
          this.hideDirections();
        } else if (dy > 3) {
          this.setDragDirection(-1);
          this.hideDirections();
        } else {
          this.setDragDirection(0);
        }
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.springY();
        this.scaleBack();
        this.springScaleBack();
        this.hideDirections();
        this.changeHeartColor(this.props.relationshipScore);

        const { dy } = gestureState;
        const { swipeThreshold } = config;

        if (this.state.isHeartShake) {
          this.setState({ isHeartShake: false }, () => {
            this.heartTranslateY.stopAnimation();
            this.heartTranslateY.setValue(0);
          });
        }
        if (this.state.isHeartCry) {
          this.setState({ isHeartCry: false }, () => {
            this.cancelHeartCry();
          });
        }

        if (dy < -swipeThreshold) {
          this.sendCoin();
        } else if (dy > swipeThreshold) {
          this.sendJalapeno();
        }

        this.setDragDirection(0);
      },
    });
  }

  static propTypes = {
    relationshipId: PropTypes.string,
    relationshipScore: PropTypes.number,
    refreshSentCoinCount: PropTypes.func.isRequired,
    refreshSentJalapenoCount: PropTypes.func.isRequired,
    createRelationshipScore: PropTypes.func.isRequired,
    getReceivedLoverRequests: PropTypes.func.isRequired,
    sendCoin: PropTypes.func.isRequired,
    sendJalapeno: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    cancelLoverRequest: PropTypes.func.isRequired,
    resendLoverRequestEmail: PropTypes.func.isRequired,
    relationshipScoreQuartile: PropTypes.number,
    sentCoins: PropTypes.array,
    sentJalapenos: PropTypes.array,
    loverRequestFirstName: PropTypes.string,
    loverRequestLastName: PropTypes.string,
    loverRequestCreatedAt: PropTypes.string,
    loverRequestId: PropTypes.string,
    recentlySentCoinCount: PropTypes.number.isRequired,
    recentlySentJalapenoCount: PropTypes.number.isRequired,
    receivedLoverRequestsCount: PropTypes.number,
    isNewRelationship: PropTypes.bool,
  };

  /**
   * JW: This logic could probably be simplified somehow. But works-for-now™
   */
  isMaxItemsPerHourSent = items =>
    items.length < config.maxItemsPerHour ||
    (items.length >= config.maxItemsPerHour &&
      moment(new Date(items[config.maxItemsPerHour - 1].createdAt)).isBefore(
        moment().subtract(1, 'hour')
      ));

  resendLoverRequestEmail = async () => {
    await this.setState({
      resendIsInFlight: true,
      error: '',
    });
    const res = await this.props.resendLoverRequestEmail(
      this.props.loverRequestId
    );
    const resendLoverRequestEmailObj = _.at(
      res,
      'body.data.resendLoverRequestEmail'
    )[0];

    if (
      _.isObject(resendLoverRequestEmailObj) &&
      resendLoverRequestEmailObj.success
    ) {
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
  };

  cancelLoverRequest = async () => {
    await new Promise(resolve =>
      this.setState(
        {
          isCancelInFlight: true,
          error: '',
        },
        () => resolve()
      )
    );
    const res = await this.props.cancelLoverRequest(this.props.loverRequestId);

    const loverRequest = _.get(
      res,
      'body.data.cancelLoverRequest.loverRequest'
    );

    if (_.isObject(loverRequest) && 'id' in loverRequest) {
      await this.props.getReceivedLoverRequests();
      if (this.props.receivedLoverRequestsCount) {
        Actions.confirmLoverRequest();
      } else {
        Actions.createloverrequest();
      }
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
        Alert.alert(
          'There was an error sending your Luvup. Please make sure you are connected to wifi or cellular data.'
        );
      }
    } else {
      this.props.openModal(MODAL_CONTENT_TYPES.COIN);
    }
  };

  sendJalapeno = async () => {
    const { sentJalapenos } = this.props;

    if (this.isMaxItemsPerHourSent(sentJalapenos)) {
      this.fireJalapeno();
      const res = await this.props.sendJalapeno();
      if (_.isError(res)) {
        Alert.alert(
          'There was an error sending your jalapeno. Please make sure you are connected to wifi or cellular data.'
        );
      }
    } else {
      this.props.openModal(MODAL_CONTENT_TYPES.JALAPENO);
    }
  };

  eyeCry(translateY, opacity, forcedDelay) {
    const easing = Easing.in(Easing.linear);
    const duration = 400;
    const delay = forcedDelay || Math.random() * 600 + 100;

    translateY.setValue(0);

    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 0,
        delay,
        easing,
      }),
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 80,
          duration,
          easing,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 100,
          delay: 300,
          easing,
        }),
      ]),
    ]).start(o => {
      if (o.finished) {
        this.eyeCry(translateY, opacity);
      }
    });
  }

  heartCry() {
    this.eyeCry(this.tearDropATranslateY, this.tearDropAOpacity);
    this.eyeCry(this.tearDropBTranslateY, this.tearDropBOpacity, 0);
  }

  cancelHeartCry() {
    this.tearDropATranslateY.stopAnimation();
    this.tearDropBTranslateY.stopAnimation();
    this.tearDropAOpacity.stopAnimation();
    this.tearDropBOpacity.stopAnimation();
    this.tearDropAOpacity.setValue(0);
    this.tearDropBOpacity.setValue(0);
  }

  heartShake() {
    const easing = Easing.inOut(Easing.linear);
    const duration = 150;

    Animated.sequence([
      Animated.timing(this.heartTranslateY, {
        toValue: -6,
        duration,
        easing,
      }),
      Animated.timing(this.heartTranslateY, {
        toValue: 6,
        duration,
        easing,
      }),
    ]).start(o => {
      if (o.finished) {
        this.heartShake();
      }
    });
  }

  changeHeartColor(toValue) {
    Animated.timing(this.heartFill, {
      toValue,
      duration: 500,
      easing: Easing.inOut(Easing.linear),
    }).start();
  }

  springY() {
    Animated.spring(this.translateY, {
      toValue: 0,
      friction: 4,
    }).start();
  }

  scaleBack() {
    Animated.spring(this.scale, {
      toValue: 1,
      friction: 4,
    }).start();
  }

  springScaleBack() {
    Animated.spring(this.scaleBGHeart, {
      toValue: 1,
      friction: 4,
    }).start();
  }

  springScaleTouch() {
    Animated.spring(this.scaleBGHeart, {
      toValue: 1.05,
      friction: 3,
    }).start();
  }

  fireCoin() {
    this.coinTranslateY.setValue(0);
    this.coinOpacity.setValue(1);

    Animated.sequence([
      Animated.timing(this.coinTranslateY, {
        toValue: -160,
        duration: 250,
        easing: Easing.out(Easing.ease),
      }),
      Animated.parallel([
        Animated.timing(this.coinOpacity, {
          toValue: 0,
          duration: 250,
          delay: 250,
          easing: Easing.inOut(Easing.linear),
        }),
        Animated.timing(this.coinTranslateY, {
          toValue: -200,
          duration: 250,
          delay: 250,
          easing: Easing.inOut(Easing.linear),
        }),
      ]),
    ]).start();
  }

  fireJalapeno() {
    this.jalapenoTranslateY.setValue(0);
    this.jalapenoOpacity.setValue(1);

    Animated.sequence([
      Animated.timing(this.jalapenoTranslateY, {
        toValue: 180,
        duration: 250,
        easing: Easing.out(Easing.ease),
      }),
      Animated.parallel([
        Animated.timing(this.jalapenoOpacity, {
          toValue: 0,
          duration: 250,
          delay: 250,
          easing: Easing.inOut(Easing.linear),
        }),
        Animated.timing(this.jalapenoTranslateY, {
          toValue: 220,
          duration: 250,
          delay: 250,
          easing: Easing.inOut(Easing.linear),
        }),
      ]),
    ]).start();
  }

  showDirections() {
    Animated.timing(this.directionsOpacity, {
      toValue: 1,
      duration: 250,
      delay: 250,
      easing: Easing.inOut(Easing.linear),
    }).start();
  }
  hideDirections() {
    Animated.timing(this.directionsOpacity, {
      toValue: 0,
      duration: 250,
      easing: Easing.inOut(Easing.linear),
    }).start();
  }

  setDragDirection = dragDirection =>
    this.state.dragDirection !== dragDirection &&
    this.setState({ dragDirection });

  componentDidMount() {
    this.props.createRelationshipScore();
    this.props.refreshSentCoinCount();
    this.props.refreshSentJalapenoCount();
  }

  componentDidUpdate(prevProps) {
    const { relationshipScore } = this.props;
    if (prevProps.relationshipScore !== relationshipScore) {
      this.changeHeartColor(relationshipScore);
    }
  }

  render() {
    const {
      panResponder,
      heartFill,
      tearDropAOpacity,
      tearDropATranslateY,
      tearDropBOpacity,
      tearDropBTranslateY,
      translateY,
      heartTranslateY,
      scale,
      scaleBGHeart,
      coinTranslateY,
      coinOpacity,
      jalapenoTranslateY,
      // closeModal,
      jalapenoOpacity,
      directionsOpacity,
      props: {
        relationshipScoreQuartile,
        recentlySentCoinCount,
        recentlySentJalapenoCount,
      },
      state: { dragDirection },
    } = this;

    return (
      <View
        testID="hero-heart-view"
        style={styles.heartView}
        {...panResponder.panHandlers}>
        <Animated.View
          testID="hero-directions"
          style={{
            marginBottom: 32,
            opacity: directionsOpacity,
            alignItems: 'center',
          }}>
          <Ionicons name="md-arrow-round-up" size={20} color={vars.p} />
          <Text style={styles.directionsText}>Swipe up to</Text>
          <Text style={styles.directionsText}>send a Luvup</Text>
        </Animated.View>
        <Animated.View
          style={{
            ...heartArtWidthHeight,
            zIndex: 10,
            transform: [
              {
                translateY,
              },
              {
                scaleX: scale,
              },
              {
                scaleY: scale,
              },
            ],
          }}>
          <Animated.View
            style={{
              ...heartArtWidthHeight,
              transform: [
                {
                  translateY: heartTranslateY,
                },
              ],
            }}>
            <Animated.View
              style={{
                ...heartArtWidthHeight,
                backgroundColor: 'rgba(100,30,70,0.2)',
                transform: [
                  {
                    scaleX: scaleBGHeart,
                  },
                  {
                    scaleY: scaleBGHeart,
                  },
                ],
              }}>
              <HeartArt animatedFillPct={heartFill} scale={heartScale} />
            </Animated.View>
            <View
              style={{
                position: 'absolute',
                left: 38,
                top: 60,
              }}>
              <HeroEye />
            </View>
            <Animated.View
              style={{
                position: 'absolute',
                left: 105,
                top: 90,
                opacity: tearDropAOpacity,
                transform: [
                  {
                    translateY: tearDropATranslateY,
                  },
                ],
              }}>
              <TearDropArt fill="white" scale={0.2} />
            </Animated.View>
            <View
              style={{
                position: 'absolute',
                right: 42,
                top: 60,
                transform: [
                  {
                    scaleX: -1,
                  },
                ],
              }}>
              <HeroEye />
            </View>
            <Animated.View
              style={{
                position: 'absolute',
                left: 181,
                top: 90,
                opacity: tearDropBOpacity,
                transform: [
                  {
                    translateY: tearDropBTranslateY,
                  },
                ],
              }}>
              <TearDropArt fill="white" scale={0.2} />
            </Animated.View>
            <View
              style={{
                position: 'absolute',
                left: 110,
                top: 170,
              }}>
              <HeroMouth
                relationshipScoreQuartile={relationshipScoreQuartile}
                dragDirection={dragDirection}
              />
            </View>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            width: 60,
            height: 60,
            left: '50%',
            top: '50%',
            marginLeft: -40,
            marginTop: -100,
            opacity: coinOpacity,
            transform: [
              {
                translateY: coinTranslateY,
              },
            ],
          }}>
          <CoinArt recentlySentCoinCount={recentlySentCoinCount} />
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: -38,
            marginBottom: -150,
            opacity: jalapenoOpacity,
            transform: [
              {
                translateY: jalapenoTranslateY,
              },
            ],
          }}>
          <JalapenoArt recentlySentJalapenoCount={recentlySentJalapenoCount} />
        </Animated.View>
        <Animated.View
          style={{
            marginTop: 32,
            opacity: directionsOpacity,
            alignItems: 'center',
          }}>
          <Text style={styles.directionsText}>Swipe down to</Text>
          <Text style={styles.directionsText}>send a Jalapeño</Text>
          <Ionicons name="md-arrow-round-down" size={20} color={vars.p} />
        </Animated.View>
      </View>
    );
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
    receivedLoverRequestsCount: state.receivedLoverRequests.count,
  }),
  {
    refreshSentCoinCount: refreshSentCoinCountAction,
    refreshSentJalapenoCount: refreshSentJalapenoCountAction,
    createRelationshipScore: createRelationshipScoreAction,
    sendCoin: sendCoinAction,
    sendJalapeno: sendJalapenoAction,
    cancelLoverRequest: cancelLoverRequestAction,
    resendLoverRequestEmail: resendLoverRequestEmailAction,
    getReceivedLoverRequests: getReceivedLoverRequestsAction,
  }
)(Hero);
