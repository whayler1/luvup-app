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
import HeroEye, {
  DEFAULT_WIDTH as HERO_EYE_DEFAULT_WIDTH,
} from '../../components/HeroEye';
import HeroMouth, {
  DEFAULT_WIDTH as HERO_MOUTH_DEFAULT_WIDTH,
} from '../../components/HeroMouth';
import CoinArt from '../../components/CoinArt';
import JalapenoArt from '../../components/JalapenoArt';
import HeartArt, {
  DEFAULT_WIDTH as HEART_ART_DEFAULT_WIDTH,
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
import dateFromDateStringOrIsoString from '../../helpers/dateFromDateStringOrIsoString';

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

const windowDimensions = Dimensions.get('window');
const screenWidth = Math.round(windowDimensions.width);
const screenHeight = Math.round(windowDimensions.height);
const heartMaxWidth = 320;
const heartWidth = Math.min(
  screenWidth - vars.gutterDoubleAndHalf * 2,
  heartMaxWidth,
);
const hearthHeight = Math.round(heartWidth * 0.9122807018);
const heartScale = heartWidth / HEART_ART_DEFAULT_WIDTH;

const heartArtWidthHeight = {
  width: heartWidth,
  height: hearthHeight,
};

const dragMaxDistance = 60;
const dragDistanceFromHeight = Math.round(screenHeight * 0.04);
const dragDistance = Math.min(dragMaxDistance, dragDistanceFromHeight);
const eyeAndMouthScale = screenWidth < 600 ? 0.8 : 1;
const scaledEyeWidth = HERO_EYE_DEFAULT_WIDTH * eyeAndMouthScale;
const eyeTop = Math.round(hearthHeight * 0.24);
const eyeHorizonalOffset = Math.round(heartWidth * 0.15);
const tearHorizontalOffset = Math.round(
  scaledEyeWidth - 10 + eyeHorizonalOffset,
);
const mouthLeft = Math.round(
  heartWidth / 2 - (HERO_MOUTH_DEFAULT_WIDTH * eyeAndMouthScale) / 2,
);
const mouthBottom = Math.round(hearthHeight * 0.3);

const oneHourAgo = () => moment().subtract(1, 'hour');

const isTimestampBeforeOneHourAgo = (timeStamp) =>
  moment(dateFromDateStringOrIsoString(timeStamp)).isBefore(oneHourAgo());

const getRecentlySentItemCount = (items) => {
  const count = items.filter(
    (item) => !isTimestampBeforeOneHourAgo(item.createdAt),
  ).length;
  if (count > config.maxItemsPerHour) {
    return config.maxItemsPerHour;
  }
  return count;
};

class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dragDirection: 0,
      loverRequestCreatedAtTimeAgo: props.loverRequestCreatedAt
        ? moment(new Date(+props.loverRequestCreatedAt)).fromNow()
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
      props.isNewRelationship ? 1 : 0,
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
        const { dy } = gestureState;
        const easedDy = getEasedDy(dy, dragDistance);
        const { isHeartShake, isHeartCry } = this.state;

        this.translateY.setValue(easedDy);
        this.scale.setValue(-easedDy / 700 + 1);
        this.heartFill.setValue(
          getHeartFillValue(this.props.relationshipScore, easedDy),
        );

        if (easedDy === -dragDistance && !isHeartShake) {
          this.setState({ isHeartShake: true }, () => {
            this.heartShake();
          });
        } else if (easedDy > -dragDistance && isHeartShake) {
          this.setState({ isHeartShake: false }, () => {
            this.heartTranslateY.stopAnimation();
            this.heartTranslateY.setValue(0);
          });
        }

        if (easedDy === dragDistance && !isHeartCry) {
          this.setState({ isHeartCry: true }, () => {
            this.heartCry();
          });
        } else if (easedDy < dragDistance && isHeartCry) {
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
    receivedLoverRequestsCount: PropTypes.number,
    isNewRelationship: PropTypes.bool,
  };

  isBelowMaxItemsPerHour = (items) => {
    if (items.length < config.maxItemsPerHour) {
      return true;
    }
    const lastItemIndex = config.maxItemsPerHour - 1;
    const lastItem = items[lastItemIndex];
    const lastItemCreatedAt = lastItem.createdAt;

    if (!lastItemCreatedAt) {
      return true;
    }

    if (isTimestampBeforeOneHourAgo(lastItemCreatedAt)) {
      return true;
    }

    return false;
  };

  resendLoverRequestEmail = async () => {
    await this.setState({
      resendIsInFlight: true,
      error: '',
    });
    const res = await this.props.resendLoverRequestEmail(
      this.props.loverRequestId,
    );
    const resendLoverRequestEmailObj = _.at(
      res,
      'body.data.resendLoverRequestEmail',
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
    await new Promise((resolve) =>
      this.setState(
        {
          isCancelInFlight: true,
          error: '',
        },
        () => resolve(),
      ),
    );
    const res = await this.props.cancelLoverRequest(this.props.loverRequestId);

    const loverRequest = _.get(
      res,
      'body.data.cancelLoverRequest.loverRequest',
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

    if (this.isBelowMaxItemsPerHour(sentCoins)) {
      this.fireCoin();
      const res = await this.props.sendCoin();
      if (_.isError(res)) {
        Alert.alert(
          'There was an error sending your Luvup. Please make sure you are connected to wifi or cellular data.',
        );
      }
    } else {
      this.props.openModal(MODAL_CONTENT_TYPES.COIN);
    }
  };

  sendJalapeno = async () => {
    const { sentJalapenos } = this.props;

    if (this.isBelowMaxItemsPerHour(sentJalapenos)) {
      this.fireJalapeno();
      const res = await this.props.sendJalapeno();
      if (_.isError(res)) {
        Alert.alert(
          'There was an error sending your jalapeno. Please make sure you are connected to wifi or cellular data.',
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
    ]).start((o) => {
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
    ]).start((o) => {
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

  setDragDirection = (dragDirection) =>
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
      jalapenoOpacity,
      directionsOpacity,
      props: { relationshipScoreQuartile },
      state: { dragDirection },
    } = this;

    return (
      <View
        testID="hero-heart-view"
        style={styles.heartView}
        {...panResponder.panHandlers}
      >
        <Animated.View
          testID="hero-directions"
          style={{
            marginBottom: 32,
            opacity: directionsOpacity,
            alignItems: 'center',
          }}
        >
          <Ionicons name="md-arrow-round-up" size={20} color={vars.p} />
          <Text style={styles.directionsText}>Swipe up to</Text>
          <Text style={styles.directionsText}>send a Luvup</Text>
        </Animated.View>
        <Animated.View
          style={{
            ...heartArtWidthHeight,
            zIndex: 10,
            transform: [{ translateY }, { scaleX: scale }, { scaleY: scale }],
          }}
        >
          <Animated.View
            style={{
              ...heartArtWidthHeight,
              transform: [{ translateY: heartTranslateY }],
            }}
          >
            <Animated.View
              style={{
                ...heartArtWidthHeight,
                transform: [{ scaleX: scaleBGHeart }, { scaleY: scaleBGHeart }],
              }}
            >
              <HeartArt animatedFillPct={heartFill} scale={heartScale} />
            </Animated.View>
            <View
              style={{
                position: 'absolute',
                left: eyeHorizonalOffset,
                top: eyeTop,
              }}
            >
              <HeroEye scale={eyeAndMouthScale} />
            </View>
            <Animated.View
              style={{
                position: 'absolute',
                left: tearHorizontalOffset,
                top: 90,
                opacity: tearDropAOpacity,
                transform: [{ translateY: tearDropATranslateY }],
              }}
            >
              <TearDropArt fill="white" scale={0.2} />
            </Animated.View>
            <View
              style={{
                position: 'absolute',
                right: eyeHorizonalOffset,
                top: eyeTop,
                transform: [{ scaleX: -1 }],
              }}
            >
              <HeroEye scale={eyeAndMouthScale} />
            </View>
            <Animated.View
              style={{
                position: 'absolute',
                right: tearHorizontalOffset,
                top: 90,
                opacity: tearDropBOpacity,
                transform: [{ translateY: tearDropBTranslateY }],
              }}
            >
              <TearDropArt fill="white" scale={0.2} />
            </Animated.View>
            <View
              style={{
                position: 'absolute',
                left: mouthLeft,
                bottom: mouthBottom,
              }}
            >
              <HeroMouth
                relationshipScoreQuartile={relationshipScoreQuartile}
                dragDirection={dragDirection}
                scale={eyeAndMouthScale}
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
            transform: [{ translateY: coinTranslateY }],
          }}
        >
          <CoinArt
            recentlySentCoinCount={getRecentlySentItemCount(
              this.props.sentCoins,
            )}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: -38,
            marginBottom: -150,
            opacity: jalapenoOpacity,
            transform: [{ translateY: jalapenoTranslateY }],
          }}
        >
          <JalapenoArt
            recentlySentJalapenoCount={getRecentlySentItemCount(
              this.props.sentJalapenos,
            )}
          />
        </Animated.View>
        <Animated.View
          style={{
            marginTop: 32,
            opacity: directionsOpacity,
            alignItems: 'center',
          }}
        >
          <Text style={styles.directionsText}>Swipe down to</Text>
          <Text style={styles.directionsText}>send a Jalapeño</Text>
          <Ionicons name="md-arrow-round-down" size={20} color={vars.p} />
        </Animated.View>
      </View>
    );
  }
}

export default connect(
  (state) => ({
    relationshipScore: state.relationshipScore.score,
    relationshipScoreQuartile: state.relationshipScore.scoreQuartile,
    sentJalapenos: state.jalapeno.sentJalapenos,
    sentCoins: state.coin.sentCoins,
    loverRequestId: state.loverRequest.id,
    loverRequestFirstName: state.loverRequest.firstName,
    loverRequestLastName: state.loverRequest.lastName,
    loverRequestCreatedAt: state.loverRequest.createdAt,
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
  },
)(Hero);
