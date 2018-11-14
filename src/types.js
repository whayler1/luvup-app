import PropTypes from 'prop-types';

export const QuizItemType = PropTypes.shape({
  question: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.string),
  reward: PropTypes.number,
  senderChoiceIndex: PropTypes.nnumber,
});

export default {
  QuizItemType,
};
