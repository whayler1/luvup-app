import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import _ from 'lodash';

import { QuizItemType, QuizItemAttemptType } from '../../types';
import { quiz } from '../../styles';
import CreateQuizChoice from '../../containers/CreateQuizChoices/CreateQuizChoice';
import CoinArt from '../CoinArt';

const QuizDisplay = ({ quizItem, quizItemAttempt }) => {
  const isAttempt = _.isObject(quizItemAttempt);
  const question = isAttempt ? quizItemAttempt.question : quizItem.question;
  const choices = isAttempt ? quizItemAttempt.choices : quizItem.choices;
  const reward = isAttempt ? quizItemAttempt.reward : quizItem.reward;
  return (
    <Fragment>
      <Text style={quiz.questionSmallText}>{question}</Text>
      {choices.map((choice, i) => {
        const isChecked = isAttempt
          ? i === quizItemAttempt.senderChoiceIndex
          : choice.id === quizItem.recipientChoiceId;
        const value = isAttempt ? choice : choice.answer;
        return (
          <CreateQuizChoice
            key={i}
            isChecked={isChecked}
            value={value}
            index={i}
            isReadOnly
          />
        );
      })}
      <View style={quiz.reviewRewardWrapper}>
        {_.times(reward, n => (
          <View style={quiz.reviewRewardItem} key={n}>
            <CoinArt
              scale={0.5}
              recentlySentCoinCount={n + 1 === reward ? reward : undefined}
            />
          </View>
        ))}
      </View>
    </Fragment>
  );
};

QuizDisplay.propTypes = {
  quizItem: QuizItemType,
  quizItemAttempt: QuizItemAttemptType,
};

export default QuizDisplay;
