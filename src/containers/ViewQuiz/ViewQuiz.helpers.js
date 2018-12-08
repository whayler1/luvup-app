/* eslint-disable import/prefer-default-export */
const wrongAnswerReactions = [
  'Oops! Wrong answer',
  "That wasn't it!",
  'NOPE!',
  "That's not the answer!",
  "That's wrong!",
  'Nah uh!',
  'DOH!',
];

const getRandomNumber = max => Math.floor(Math.random() * max);

export const getWrongAnswerReaction = () =>
  wrongAnswerReactions[getRandomNumber(wrongAnswerReactions.length)];

const correctAnswerReaction = [
  'Correct!',
  'Booyah!',
  'You nailed it!',
  'Got it right!',
  'Good work!',
];

export const getCorrectAnswerReaction = () =>
  correctAnswerReaction[getRandomNumber(correctAnswerReaction.length)];
