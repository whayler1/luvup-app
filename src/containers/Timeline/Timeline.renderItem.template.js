import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Ionicons } from '@expo/vector-icons';
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
import QuizArtSent from '../../components/Art/QuizArtSent';
import QuizArtReceived from '../../components/Art/QuizArtReceived';
import QuizArtAnswered from '../../components/Art/QuizArtAnswered';
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
      return 'Password changed';
    case 'lovenote-sent':
      return `Love note${plur} sent`;
    case 'lovenote-received':
      return `Love note${plur} received`;
    case 'quiz-item-sent':
      return 'Quiz created';
    case 'quiz-item-received':
      return 'Quiz received';
    case 'quiz-item-sent-answered':
      return 'Your quiz was answered';
    case 'quiz-item-received-answered':
      return 'You answered a quiz';
    default:
      return eventName;
  }
};
const getEventImage = eventName => {
  switch (eventName) {
    case 'coin-sent':
      return (
        <Image style={styles.renderItemCoinSentImage} source={coinSentImg} />
      );
    case 'coin-received':
      return (
        <Image
          style={styles.renderItemCoinReceivedImage}
          source={coinReceivedImg}
        />
      );
    case 'jalapeno-sent':
      return (
        <Image
          style={styles.renderItemJalapenoSentImage}
          source={jalapenoSentImg}
        />
      );
    case 'jalapeno-received':
      return (
        <Image
          style={styles.renderItemJalapenoReceivedImage}
          source={jalapenoReceivedImg}
        />
      );
    case 'password-changed':
      return <Ionicons name="md-lock" size={36} color={vars.blueGrey500} />;
    case 'lovenote-sent':
      return (
        <View style={styles.renderItemLoveNoteWrapper}>
          <LoveNoteArtFlying scale={0.4} />
        </View>
      );
    case 'lovenote-received':
      return (
        <View style={styles.renderItemLoveNoteWrapper}>
          <LoveNoteArtReceived scale={0.4} />
        </View>
      );
    case 'quiz-item-sent':
      return (
        <View style={styles.renderItemQuizIconWrapper}>
          <QuizArtSent scale={0.36} />
        </View>
      );
    case 'quiz-item-received':
      return (
        <View style={styles.renderItemQuizIconWrapper}>
          <QuizArtReceived scale={0.36} />
        </View>
      );
    case 'quiz-item-sent-answered':
    case 'quiz-item-received-answered':
      return (
        <View style={styles.renderItemQuizIconWrapper}>
          <QuizArtAnswered scale={0.36} />
        </View>
      );
    default:
      return;
  }
};

const getHandleLoveNoteClick = loveNoteId => () => {
  Actions.viewLoveNote({ loveNoteId });
};

const getHandleQuizItemClick = quizItemId => () => {
  Actions.ViewQuiz({ quizItemId });
};

const getIsQuizItemNotificationDot = (eventName, quizItem) =>
  /received/.test(eventName) && !quizItem.recipientChoiceId;

const Wrapper = ({ children, eventName, loveNote = {}, quizItem = {} }) => {
  if (_.isString(loveNote.id)) {
    return (
      <TouchableOpacity onPress={getHandleLoveNoteClick(loveNote.id)}>
        {eventName === 'lovenote-received' && !loveNote.isRead && (
          <NotificationDot style={styles.renderItemNotificationDot} />
        )}
        {children}
      </TouchableOpacity>
    );
  }
  if (_.isString(quizItem.id)) {
    return (
      <TouchableOpacity onPress={getHandleQuizItemClick(quizItem.id)}>
        {getIsQuizItemNotificationDot(eventName, quizItem) && (
          <NotificationDot style={styles.renderItemNotificationDot} />
        )}
        {children}
      </TouchableOpacity>
    );
  }
  return <View>{children}</View>;
};

export default ctx => {
  const { item, index, section } = ctx;
  const isLovenoteItem = /^lovenote/.test(item.name);
  const isLovenoteItemWithNote =
    isLovenoteItem && _.isString(_.get(item, 'loveNote.id'));
  const isQuizItem = /^quiz/.test(item.name);
  let isNumLuvups = _.get(item, 'loveNote.numLuvups', 0) > 0;
  const isNumJalapenos = _.get(item, 'loveNote.numJalapenos', 0) > 0;

  if (
    isQuizItem &&
    item.name === 'quiz-item-received-answered' &&
    item.quizItem.recipientChoiceId === item.quizItem.senderChoiceId
  ) {
    isNumLuvups = true;
  }

  return (
    <View style={styles.renderItemWrapper}>
      <Wrapper
        isLink={isLovenoteItemWithNote}
        loveNote={item.loveNote}
        quizItem={item.quizItem}
        eventName={item.name}>
        <View
          style={
            index + 1 === section.data.length
              ? styles.renderItemContainerLast
              : styles.renderItemContainer
          }>
          <View style={styles.renderItemContent}>
            <View style={styles.renderItemIconContainer}>
              {getEventImage(item.name)}
            </View>
            <View style={styles.renderItemCopyContainer}>
              <Text style={styles.renderItemContentText}>
                {item.name !== 'password-changed' &&
                !isLovenoteItem &&
                !isQuizItem
                  ? item.count + ' '
                  : ''}
                {getEventDisplayName(item.name, item.count)}
              </Text>
              {isLovenoteItem && _.isString(_.get(item, 'loveNote.note')) && (
                <Text numberOfLines={1} style={styles.renderItemLoveNoteText}>
                  {decodeURI(item.loveNote.note)}
                </Text>
              )}
              {isQuizItem && _.isString(_.get(item, 'quizItem.question')) && (
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
                        +
                        {isQuizItem
                          ? item.quizItem.reward
                          : item.loveNote.numLuvups}
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
    </View>
  );
};
