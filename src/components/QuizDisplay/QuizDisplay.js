import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
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

const getShouldShowCoinRow = (isAnswerable, quizItem) => {
  if (isAnswerable) {
    return false;
  }
  if (!quizItem.recipientChoiceId) {
    return true;
  }
  if (quizItem.recipientChoiceId === quizItem.senderChoiceId) {
    return true;
  }
  return false;
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
        const isQuizItemRecipientChoiceId =
          _.isString(_.get(quizItem, 'recipientChoiceId')) &&
          quizItem.recipientChoiceId.length > 0;
        let isChecked = isAttempt
          ? i === quizItemAttempt.senderChoiceIndex
          : isQuizItemRecipientChoiceId
          ? choice.id === quizItem.senderChoiceId
          : choice.id === recipientChoiceId;
        let isWrong = false;

        if (
          !isAttempt &&
          choice.id === quizItem.recipientChoiceId &&
          choice.id !== quizItem.senderChoiceId
        ) {
          isWrong = true;
          isChecked = false;
        }

        const value = isAttempt ? choice : choice.answer;
        return isAnswerable ? (
          <TouchableOpacity
            key={choice.id}
            onPress={getHandleChoicePress(choice.id, onChoicePress)}>
            <CreateQuizChoice
              isChecked={isChecked}
              value={value}
              index={i}
              isReadOnly
            />
          </TouchableOpacity>
        ) : (
          <CreateQuizChoice
            key={i}
            isChecked={isChecked}
            isWrong={isWrong}
            value={value}
            index={i}
            isReadOnly
          />
        );
      })}
      {getShouldShowCoinRow(
        isAnswerable,
        isAttempt ? quizItemAttempt : quizItem
      ) && <CoinRow reward={reward} />}
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
