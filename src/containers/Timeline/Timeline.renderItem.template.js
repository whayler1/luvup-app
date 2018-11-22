import React, { Fragment } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import styles from './Timeline.styles';
import { vars } from '../../styles';

import NotificationDot from '../../components/NotificationDot';
import jalapenoSentImg from '../../images/jalapeno-sent.png';
import jalapenoReceivedImg from '../../images/jalapeno-received.png';
import coinSentImg from '../../images/coin-sent.png';
import coinReceivedImg from '../../images/coin-received.png';
import LoveNoteArtFlying from '../../components/LoveNoteArtFlying';
import LoveNoteArtReceived from '../../components/LoveNoteArtReceived';
import CoinArt from '../../components/CoinArt';
import JalapenoArt from '../../components/JalapenoArt';

const getEventDisplayName = (eventName, count) => {
  const plur = count > 1 ? 's' : '';

  switch (eventName) {
    case 'coin-sent':
      return `Luvup${plur} sent`;
    case 'coin-received':
      return `Luvup${plur} received`;
    case 'jalapeno-sent':
      return `Jalapeno${plur} sent`;
    case 'jalapeno-received':
      return `Jalapeno${plur} received`;
    case 'password-changed':
      return 'Password Changed';
    case 'lovenote-sent':
      return `Love note${plur} sent`;
    case 'lovenote-received':
      return `Love note${plur} received`;
    case 'quiz-item-sent':
      return 'Quiz Created';
    case 'quiz-item-received':
      return 'Quiz Received';
    default:
      return eventName;
  }
};
const getEventImage = eventName => {
  switch (eventName) {
    case 'coin-sent':
      return (
        <Image
          style={{
            width: 32,
            height: 25,
          }}
          source={coinSentImg}
        />
      );
    case 'coin-received':
      return (
        <Image
          style={{
            width: 31,
            height: 25,
          }}
          source={coinReceivedImg}
        />
      );
    case 'jalapeno-sent':
      return (
        <Image
          style={{
            width: 24,
            height: 25,
          }}
          source={jalapenoSentImg}
        />
      );
    case 'jalapeno-received':
      return (
        <Image
          style={{
            width: 26,
            height: 25,
          }}
          source={jalapenoReceivedImg}
        />
      );
    case 'password-changed':
      return <Icon name="md-lock" size={36} color={vars.blueGrey500} />;
    case 'lovenote-sent':
      return (
        <View style={{ paddingTop: 3 }}>
          <LoveNoteArtFlying scale={0.4} />
        </View>
      );
    case 'lovenote-received':
      return (
        <View style={{ paddingTop: 3 }}>
          <LoveNoteArtReceived scale={0.4} />
        </View>
      );
    default:
      return;
  }
};

const Wrapper = ({ children, eventName, loveNote = {} }) => {
  if (_.isString(loveNote.id)) {
    return (
      <TouchableOpacity
        onPress={() => Actions.viewLoveNote({ loveNoteId: loveNote.id })}>
        {eventName === 'lovenote-received' &&
          !loveNote.isRead && (
            <NotificationDot
              style={{
                position: 'absolute',
                left: 12,
                top: 10,
              }}
            />
          )}
        {...children}
      </TouchableOpacity>
    );
  }
  return <View>{...children}</View>;
};

export default ({ item, index, section }) => {
  const isLovenoteItem = /^lovenote/.test(item.name);
  const isLovenoteItemWithNote =
    isLovenoteItem && _.isString(_.get(item, 'loveNote.id'));
  const isQuizItem = /^quiz/.test(item.name);
  const isNumLuvups = _.get(item, 'loveNote.numLuvups', 0) > 0;
  const isNumJalapenos = _.get(item, 'loveNote.numJalapenos', 0) > 0;

  return (
    <Wrapper
      isLink={isLovenoteItemWithNote}
      loveNote={item.loveNote}
      eventName={item.name}>
      <View
        style={
          index + 1 === section.data.length
            ? styles.renderItemContainerLast
            : styles.renderItemContainer
        }>
        <View style={styles.renderItemContent}>
          <View
            style={{
              minWidth: 50,
            }}>
            {getEventImage(item.name)}
          </View>
          <View
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              flex: 1,
            }}>
            <Text style={styles.renderItemContentText}>
              {item.name !== 'password-changed' &&
              !isLovenoteItem &&
              !isQuizItem
                ? item.count + ' '
                : ''}
              {getEventDisplayName(item.name, item.count)}
            </Text>
            {isLovenoteItem &&
              _.isString(_.get(item, 'loveNote.note')) && (
                <Text numberOfLines={1} style={styles.renderItemLoveNoteText}>
                  {decodeURI(item.loveNote.note)}
                </Text>
              )}
            {isQuizItem &&
              _.isString(_.get(item, 'quizItem.question')) && (
                <Text numberOfLines={1} style={styles.renderItemLoveNoteText}>
                  {decodeURI(item.quizItem.question)}
                </Text>
              )}
            {(isNumLuvups || isNumJalapenos) && (
              <View style={styles.renderItemLoveNoteTokenRow}>
                {isNumLuvups && (
                  <View style={styles.renderItemLoveNoteTokenItem}>
                    <CoinArt
                      fill={vars.blueGrey300}
                      stroke={vars.blueGrey500}
                      scale={0.2}
                    />
                    <Text style={styles.renderItemLoveNoteTokenText}>
                      +{item.loveNote.numLuvups}
                    </Text>
                  </View>
                )}
                {isNumJalapenos && (
                  <View
                    style={[
                      styles.renderItemLoveNoteTokenItem,
                      {
                        paddingLeft: isNumLuvups && isNumJalapenos ? 8 : 0,
                      },
                    ]}>
                    <JalapenoArt fill={vars.blueGrey300} scale={0.17} />
                    <Text style={styles.renderItemLoveNoteTokenText}>
                      +{item.loveNote.numJalapenos}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
          <View>
            <Text style={styles.renderItemContentSmall}>{item.time}</Text>
          </View>
        </View>
      </View>
    </Wrapper>
  );
};
