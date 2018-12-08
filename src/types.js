import PropTypes from 'prop-types';

export const QuizItemAttemptType = PropTypes.shape({
  question: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.string),
  reward: PropTypes.number,
  senderChoiceIndex: PropTypes.number,
});

const QuizItemChoiceType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
});

export const QuizItemType = PropTypes.shape({
  question: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(QuizItemChoiceType).isRequired,
  reward: PropTypes.number.isRequired,
  senderChoiceId: PropTypes.string.isRequired,
  recipientChoiceId: PropTypes.string,
  senderId: PropTypes.string.isRequired,
  recipientId: PropTypes.string.isRequired,
});

export default {
  QuizItemAttemptType,
};
