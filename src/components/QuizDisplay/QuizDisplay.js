import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import _ from 'lodash';

import { QuizItemType, QuizItemAttemptType } from '../../types';
import { quiz } from '../../styles';
import CreateQuizChoice from '../../containers/CreateQuizChoices/CreateQuizChoice';
import CoinRow from '../CoinRow';

const getHandleChoicePress = (choiceId, onChoicePress) => () => {
  if (_.isFunction(onChoicePress)) {
    onChoicePress(choiceId);
  }
};

const QuizDisplay = ({
  quizItem,
  quizItemAttempt,
  onChoicePress,
  isAnswerable,
  recipientChoiceId,
}) => {
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
        return isAnswerable ? (
          <CreateQuizChoice
            key={choice.id}
            isChecked={choice.id === recipientChoiceId}
            value={value}
            index={i}
            isReadOnly
            onSelect={getHandleChoicePress(choice.id, onChoicePress)}
          />
        ) : (
          <CreateQuizChoice
            key={i}
            isChecked={isChecked}
            value={value}
            index={i}
            isReadOnly
          />
        );
      })}
      {!isAnswerable && <CoinRow reward={reward} />}
    </Fragment>
  );
};

QuizDisplay.propTypes = {
  quizItem: QuizItemType,
  quizItemAttempt: QuizItemAttemptType,
  onChoicePress: PropTypes.func,
  isAnswerable: PropTypes.bool,
  recipientChoiceId: PropTypes.string,
};

export default QuizDisplay;
