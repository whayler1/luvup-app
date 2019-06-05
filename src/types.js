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

export const UserType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
});

export const LoverRequestType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  isAccepted: PropTypes.bool,
  isSenderCanceled: PropTypes.bool,
  isRecipientCanceled: PropTypes.bool,
  sender: UserType,
  recipient: UserType,
  createdAt: PropTypes.string.isRequired,
});

export default {
  QuizItemAttemptType,
};
