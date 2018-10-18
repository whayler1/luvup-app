import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import _ from 'lodash';

import Pushdown from '../../components/Pushdown';
import { vars } from '../../styles';

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
  relationshipScore,
}) => (
  <View
    style={{
      position: 'absolute',
      alignItems: 'center',
      top: 0,
      left: 0,
      right: 0,
      paddingTop: 16,
      marginTop: 28,
      zIndex: 10,
    }}>
    {isPushdownVisible && (
      <Pushdown closeFunc={closePushdown}>
        {unviewedCoinCount > 0 && (
          <Text
            style={{
              color: 'white',
              fontFamily: vars.fontRegular,
              fontSize: 18,
            }}>
            You received {unviewedCoinCount} luvup{unviewedCoinCount > 1
              ? 's'
              : ''}!
          </Text>
        )}
        {unviewedJalapenoCount > 0 && (
          <Text
            style={{
              color: 'white',
              fontFamily: vars.fontRegular,
              fontSize: 18,
            }}>
            You received {unviewedJalapenoCount} jalapeno{unviewedJalapenoCount >
            1
              ? 's'
              : ''}
          </Text>
        )}
      </Pushdown>
    )}
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 8,
      }}>
      {_.isNumber(coinCount) && _.isNumber(jalapenoCount) ? (
        <TouchableOpacity
          onPress={onScoreClick}
          style={{
            flex: 0.33,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../images/coin.png')}
            style={{
              width: 30,
              height: 30,
            }}
          />
          <Text
            style={{
              paddingLeft: 5,
              fontFamily: vars.fontBlack,
              fontSize: 16,
              color: vars.blueGrey500,
            }}>
            {coinCount}
          </Text>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            flex: 0.33,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        />
      )}
      <TouchableOpacity
        onPress={onRelationshipScoreClick}
        style={{
          flex: 0.33,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: vars.fontBlack,
            color: vars.blueGrey300,
            fontSize: 12,
          }}>
          Relationship Score
        </Text>
        <Text
          style={{
            fontFamily: vars.fontBlack,
            color: vars.blueGrey700,
            fontSize: 30,
          }}>
          {relationshipScore}%
        </Text>
      </TouchableOpacity>
      {_.isString(userFirstName) && userFirstName.length > 1 ? (
        <TouchableOpacity
          onPress={onInitialsClick}
          style={{
            flex: 0.33,
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              fontFamily: vars.fontBlack,
              fontSize: 16,
              color: vars.blueGrey500,
            }}>
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
        <View style={{ flex: 33 }} />
      )}
    </View>
  </View>
);
