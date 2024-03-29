import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { View, Text, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import _ from 'lodash';

import DashboardTopNavScoreUpAnimation from './DashboardTopNavScoreUpAnimation';
import DashboardTopNavScoreText from './DashboardTopNavScoreText';
import Pushdown from '../../components/Pushdown';
import NotificationDot from '../../components/NotificationDot';
import CoinArt from '../../components/CoinArt';
import { vars } from '../../styles';
import { LoverRequestType } from '../../types';
import isArrayWithLength from '../../helpers/isArrayWithLength';
import styles from './DashboardTopNav.styles';

export default class DashboardTopNav extends Component {
  static props = {
    coinCount: PropTypes.number,
    jalapenoCount: PropTypes.number,
    userFirstName: PropTypes.string,
    userLastName: PropTypes.string,
    loverFirstName: PropTypes.string,
    loverLastName: PropTypes.string,
    relationshipScore: PropTypes.number,
    unreadReceivedLoveNoteCount: PropTypes.number,
    closePushdown: PropTypes.func,
    unviewedCoinCount: PropTypes.number,
    unviewedJalapenoCount: PropTypes.number,
    receivedLoverRequests: PropTypes.arrayOf(LoverRequestType),
  };

  handleScoreClick = () => {
    Actions.timeline();
  };
  handleMenuButtonClick = () => {
    Actions.menu();
  };
  handleRelationshipScoreClick = () => {
    Actions.timelineRelationshipScore();
  };
  handleRelationshipScoreAnimationStart = ({ isScoreRising }) => {
    if (isScoreRising) {
      this.setState({ isDuringScoreAnimation: true });
    }
  };
  handleRelationshipScoreAnimationEnd = () => {
    this.setState({ isDuringScoreAnimation: false });
  };

  constructor(props) {
    super(props);
    this.state = { isDuringScoreAnimation: false };
  }

  render() {
    const {
      props: {
        coinCount,
        userFirstName,
        userLastName,
        loverFirstName,
        loverLastName,
        closePushdown,
        unviewedCoinCount,
        unviewedJalapenoCount,
        unreadReceivedLoveNoteCount,
        relationshipScore,
        receivedLoverRequests,
      },
      handleScoreClick,
      handleMenuButtonClick,
      handleRelationshipScoreClick,
      handleRelationshipScoreAnimationStart,
      handleRelationshipScoreAnimationEnd,
    } = this;
    const isPushdownVisible =
      (_.isNumber(unviewedCoinCount) && unviewedCoinCount > 0) ||
      (_.isNumber(unviewedJalapenoCount) && unviewedJalapenoCount > 0);
    return (
      <View>
        <DashboardTopNavScoreUpAnimation
          isDuringAnimation={this.state.isDuringScoreAnimation}
        />
        <BlurView
          tint={vars.blurViewTint}
          intensity={vars.blurViewIntensity}
          style={styles.containerTopArea}
        />
        <BlurView
          tint={vars.blurViewTint}
          intensity={vars.blurViewIntensity}
          style={styles.container}
        >
          {isPushdownVisible && (
            <Pushdown closeFunc={closePushdown}>
              {unviewedCoinCount > 0 && (
                <Text style={styles.pushdownText}>
                  You received {unviewedCoinCount} luvup
                  {unviewedCoinCount > 1 ? 's' : ''}!
                </Text>
              )}
              {unviewedJalapenoCount > 0 && (
                <Text style={styles.pushdownText}>
                  You received {unviewedJalapenoCount} jalapeno
                  {unviewedJalapenoCount > 1 ? 's' : ''}
                </Text>
              )}
            </Pushdown>
          )}
          <View style={styles.navUiContainer}>
            <View style={styles.navUiContainerItem}>
              {_.isNumber(coinCount) ? (
                <TouchableOpacity
                  testID="dashboard-top-nav-history-button"
                  onPress={handleScoreClick}
                  style={styles.coinCountBtn}
                >
                  {unreadReceivedLoveNoteCount > 0 && (
                    <NotificationDot style={styles.notificationDot} />
                  )}
                  <CoinArt
                    scale={0.37}
                    fill={vars.blueGrey300}
                    stroke={vars.blueGrey500}
                  />
                  <Text
                    testID="dashboard-top-nav-coin-count"
                    style={styles.coinCountText}
                  >
                    {coinCount}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.coinCountBtn} />
              )}
            </View>
            <View style={styles.navUiContainerItem}>
              {_.isNumber(relationshipScore) && (
                <TouchableOpacity
                  testID="dashboard-top-nav-relationship-score"
                  onPress={handleRelationshipScoreClick}
                  style={styles.scoreBtn}
                >
                  <Text
                    testID="relatioship-score-label"
                    style={styles.scoreTitleText}
                  >
                    Relationship Score
                  </Text>
                  <DashboardTopNavScoreText
                    relationshipScore={relationshipScore}
                    onScoreAnimationStart={
                      handleRelationshipScoreAnimationStart
                    }
                    onScoreAnimationEnd={handleRelationshipScoreAnimationEnd}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.navUiContainerItem}>
              {_.isString(userFirstName) && userFirstName.length > 1 ? (
                <TouchableOpacity
                  testID="dashboard-top-nav-menu-button"
                  onPress={handleMenuButtonClick}
                  style={styles.menuBtn}
                >
                  {isArrayWithLength(receivedLoverRequests) && (
                    <NotificationDot style={styles.menuButtonNotificationDot} />
                  )}
                  <Text style={styles.menuText}>
                    {userFirstName.substr(0, 1).toUpperCase()}
                    {userLastName.substr(0, 1).toUpperCase()}
                    {loverFirstName ? ' + ' : ''}
                    {_.isString(loverFirstName) &&
                      loverFirstName.substr(0, 1).toUpperCase()}
                    {_.isString(loverLastName) &&
                      loverLastName.substr(0, 1).toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.menuBtn} />
              )}
            </View>
          </View>
        </BlurView>
      </View>
    );
  }
}
