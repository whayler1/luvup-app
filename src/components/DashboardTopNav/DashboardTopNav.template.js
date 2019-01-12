import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import _ from 'lodash';

import Pushdown from '../../components/Pushdown';
import NotificationDot from '../../components/NotificationDot';
import CoinArt from '../../components/CoinArt';
import { vars } from '../../styles';
import styles from './DashboardTopNav.styles';

export default ({
  coinCount,
  jalapenoCount,
  userFirstName,
  userLastName,
  loverFirstName,
  loverLastName,
  onScoreClick,
  onInitialsClick,
  onRelationshipScoreClick,
  isPushdownVisible,
  closePushdown,
  unviewedCoinCount,
  unviewedJalapenoCount,
  unreadReceivedLoveNoteCount,
  relationshipScore,
}) => (
  <View style={styles.container}>
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
      {_.isNumber(coinCount) ? (
        <TouchableOpacity
          testID="dashboard-top-nav-history-button"
          onPress={onScoreClick}
          style={styles.coinCountBtn}>
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
            style={styles.coinCountText}>
            {coinCount}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.coinCountBtn} />
      )}
      {_.isNumber(relationshipScore) && (
        <TouchableOpacity
          testID="dashboard-top-nav-relationship-score"
          onPress={onRelationshipScoreClick}
          style={styles.scoreBtn}>
          <Text testID="relatioship-score-label" style={styles.scoreTitleText}>
            Relationship Score
          </Text>
          <Text style={styles.scoreText}>{relationshipScore}%</Text>
        </TouchableOpacity>
      )}
      {_.isString(userFirstName) && userFirstName.length > 1 ? (
        <TouchableOpacity
          testID="dashboard-top-nav-menu-button"
          onPress={onInitialsClick}
          style={styles.menuBtn}>
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
);
